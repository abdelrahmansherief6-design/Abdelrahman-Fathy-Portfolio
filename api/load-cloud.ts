export default async function handler(req: any, res: any) {
  // Set CORS headers
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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log("Loading portfolio data from cloud from Vercel Serverless Function...");
    const response = await fetch('https://extendsclass.com/api/json-storage/bin/edafdbe');
    if (!response.ok) {
      throw new Error(`Cloud API responded with status ${response.status}`);
    }

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Error proxying load from cloud in Vercel:", error);
    return res.status(500).json({ error: error.message });
  }
}
