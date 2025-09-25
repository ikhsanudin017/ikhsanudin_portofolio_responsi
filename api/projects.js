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
        // Get unique projects only, limit to 3
        const { rows } = await sql`
          SELECT DISTINCT ON (title) id, title, image, description, tech, link as live_url, link as repo_url
          FROM projects
          WHERE title IS NOT NULL
          ORDER BY title, id
          LIMIT 3;
        `;

        // Fix field names untuk match template
        const fixedProjects = rows.map(project => ({
          ...project,
          repoUrl: project.repo_url || '#',
          liveUrl: project.live_url || '#'
        }));

        res.status(200).json(fixedProjects);
      } else {
        // Development - static data
        const projects = [
          {
            id: 1,
            title: 'PhoneKu',
            description: 'Platform toko online untuk menjual produk HP dengan fitur pencarian, keranjang belanja, dan checkout.',
            image: 'phoneku.jpg',
            tech: ['laravel'],
            repoUrl: 'https://github.com/nandanazadaa/phoneku',
            liveUrl: '#'
          },
          {
            id: 2,
            title: 'Sistem Koperasi',
            description: 'Platform untuk mengelola Koperasi',
            image: 'sistem_koperasi.jpg',
            tech: ['C#'],
            repoUrl: 'https://github.com/ikhsanudin017/KoperasiApp',
            liveUrl: '#'
          },
          {
            id: 3,
            title: 'UI UX Sport Venue',
            description: 'UI UX Aplikasi Pengelola Sewa Lapangan',
            image: 'https://i.imgur.com/TWPK4LX.jpeg',
            tech: ['Figma'],
            repoUrl: 'https://github.com/ikhsanudin017/KoperasiApp',
            liveUrl: '#'
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
