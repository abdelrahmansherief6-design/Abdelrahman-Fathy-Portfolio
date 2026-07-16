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
