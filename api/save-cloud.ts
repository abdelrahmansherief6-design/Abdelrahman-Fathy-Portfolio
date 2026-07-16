export default async function handler(req: any, res: any) {
  // Set CORS headers so the function is accessible from local previews and production
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    console.log("Saving portfolio data to cloud from Vercel Serverless Function...");
    const response = await fetch('https://extendsclass.com/api/json-storage/bin/edafdbe', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Cloud API responded with status ${response.status}`);
    }

    const result = await response.json();
    return res.status(200).json({ success: true, result });
  } catch (error: any) {
    console.error("Error proxying save to cloud in Vercel:", error);
    return res.status(500).json({ error: error.message });
  }
}
