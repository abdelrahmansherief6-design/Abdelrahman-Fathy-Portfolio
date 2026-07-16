import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase body size limit to handle large base64 profile photos or attachments
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API to save portfolio data directly to src/data.ts
  app.post("/api/save-portfolio", (req, res) => {
    try {
      const data = req.body;
      if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: "Invalid data format" });
      }

      const filePath = path.join(process.cwd(), 'src', 'data.ts');
      
      const fileContent = `/**\n * This file is automatically updated by the Admin Panel.\n */\nimport { PortfolioData } from './types';\n\nexport const defaultPortfolioData: PortfolioData = ${JSON.stringify(data, null, 2)};\n`;
      
      fs.writeFileSync(filePath, fileContent, 'utf-8');
      console.log("Successfully wrote updated portfolio data to src/data.ts");
      return res.json({ success: true, message: "Saved successfully to codebase!" });
    } catch (error: any) {
      console.error("Error writing to file", error);
      return res.status(500).json({ error: error.message });
    }
  });

  // API proxy to save portfolio data globally to api.restful-api.dev (server-side to avoid CORS)
  app.post("/api/save-cloud", async (req, res) => {
    try {
      const data = req.body;
      if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: "Invalid data format" });
      }

      console.log("Saving portfolio data to cloud server-side...");
      const response = await fetch('https://api.restful-api.dev/objects/ff8081819d82fab6019f6ad324c26ed3', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Abdelrahman Fathy Portfolio Data",
          data: data
        })
      });

      if (!response.ok) {
        throw new Error(`Cloud API responded with status ${response.status}`);
      }

      const result = await response.json();
      console.log("Successfully saved to cloud!");
      return res.json({ success: true, result });
    } catch (error: any) {
      console.error("Error proxying save to cloud:", error);
      return res.status(500).json({ error: error.message });
    }
  });

  // API proxy to load portfolio data globally from api.restful-api.dev (server-side to avoid CORS)
  app.get("/api/load-cloud", async (req, res) => {
    try {
      console.log("Loading portfolio data from cloud server-side...");
      const response = await fetch('https://api.restful-api.dev/objects/ff8081819d82fab6019f6ad324c26ed3');
      if (!response.ok) {
        throw new Error(`Cloud API responded with status ${response.status}`);
      }

      const result = await response.json();
      return res.json(result);
    } catch (error: any) {
      console.error("Error proxying load from cloud:", error);
      return res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
