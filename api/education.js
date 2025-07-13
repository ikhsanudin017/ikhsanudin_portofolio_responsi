// Import hanya jika di production
let sql;
if (process.env.VERCEL) {
  // Hanya import @vercel/postgres jika di Vercel
  const { sql: vercelSql } = await import('@vercel/postgres');
  sql = vercelSql;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      // Cek jika di Vercel (production) atau local (development)
      if (process.env.VERCEL && sql) {
        // Production - pakai database
        const { rows } = await sql`SELECT * FROM education ORDER BY id ASC;`;
        res.status(200).json(rows);
      } else {
        // Development - pakai data static
        const educationData = [
          {
            id: 1,
            period: '2023 - Sekarang',
            institution: 'Universitas Amikom Yogyakarta',
            major: 'S1 - Informatika'
          },
          {
            id: 2,
            period: '2018 - 2021',
            institution: 'SMK IT Smart Informatika',
            major: 'Teknik Komputer & Jaringan'
          }
        ];
        res.status(200).json(educationData);
      }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({
        error: 'Gagal mengambil data pendidikan',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
