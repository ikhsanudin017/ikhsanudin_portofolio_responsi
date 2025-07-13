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
        // Production - database
        const { rows } = await sql`SELECT * FROM projects ORDER BY id ASC;`;
        res.status(200).json(rows);
      } else {
        // Development - data static
        const projects = [
          {
            id: 1,
            title: 'PhoneKu',
            description: 'Platform toko online untuk menjual produk HP dengan fitur pencarian, keranjang belanja, dan checkout.',
            image: 'phoneku.jpg',
            tech: ['laravel'],
            repo_url: 'https://github.com/nandanazadaa/phoneku',
            live_url: '#'
          },
          {
            id: 2,
            title: 'Sistem Koperasi',
            description: 'Platform untuk mengelola Koperasi',
            image: 'sistem_koperasi.jpg',
            tech: ['C#'],
            repo_url: 'https://github.com/ikhsanudin017/KoperasiApp',
            live_url: '#'
          },
          {
            id: 3,
            title: 'UI UX Sport Venue',
            description: 'UI UX Aplikasi Pengelola Sewa Lapangan',
            image: 'https://i.imgur.com/TWPK4LX.jpeg',
            tech: ['Figma'],
            repo_url: 'https://github.com/ikhsanudin017/KoperasiApp',
            live_url: '#'
          }
        ];
        res.status(200).json(projects);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        error: 'Gagal mengambil data proyek',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
