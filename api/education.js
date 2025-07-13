let sql;
if (process.env.VERCEL) {
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
      if (process.env.VERCEL && sql) {
        // Get unique education entries
        const { rows } = await sql`
          SELECT DISTINCT ON (institution, major) id, period, institution, major
          FROM education
          WHERE institution IS NOT NULL
          ORDER BY institution, major, id
          LIMIT 10;
        `;
        res.status(200).json(rows);
      } else {
        // Development - static data
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
      console.error('Error:', error);
      res.status(500).json({
        error: 'Gagal mengambil data pendidikan',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
