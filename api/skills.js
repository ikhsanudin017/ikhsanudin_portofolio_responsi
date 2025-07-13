const { sql } = require('@vercel/postgres');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { rows } = await sql`SELECT * FROM skills ORDER BY name;`;
      res.status(200).json(rows);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({
        error: 'Gagal mengambil data skills',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
