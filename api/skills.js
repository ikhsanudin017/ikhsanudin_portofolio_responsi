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
        // Get unique skills only, limit to 7
        const { rows } = await sql`
          SELECT DISTINCT ON (name) id, name
          FROM skills
          WHERE name IS NOT NULL
          ORDER BY name, id
          LIMIT 7;
        `;

        const skillsWithIcons = rows.map(skill => ({
          ...skill,
          icon: getIconForSkill(skill.name)
        }));

        res.status(200).json(skillsWithIcons);
      } else {
        // Development - static data
        const skills = [
          { id: 1, name: 'Laravel', icon: getIconForSkill('Laravel') },
          { id: 2, name: 'Vue.js', icon: getIconForSkill('Vue.js') },
          { id: 3, name: 'React', icon: getIconForSkill('React') },
          { id: 4, name: 'MySQL', icon: getIconForSkill('MySQL') },
          { id: 5, name: 'Bootstrap', icon: getIconForSkill('Bootstrap') },
          { id: 6, name: 'Tailwind', icon: getIconForSkill('Tailwind') },
          { id: 7, name: 'Figma', icon: getIconForSkill('Figma') }
        ];
        res.status(200).json(skills);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        error: 'Gagal mengambil data skills',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

function getIconForSkill(skillName) {
  const iconMap = {
    'Laravel': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Laravel</title><path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 0 1-.188.326L9.93 23.949a.316.316 0 0 1-.066.02c-.01.003-.021.005-.032.005-.01 0-.021-.002-.032-.005a.316.316 0 0 1-.066-.02L.707 18.755a.378.378 0 0 1-.188-.326V5.92c0-.042.01-.084.027-.124.007-.02.018-.04.03-.058.01-.018.023-.034.037-.05.01-.012.021-.025.033-.036.014-.01.029-.018.045-.025.012-.005.025-.01.04-.013L9.93.021a.378.378 0 0 1 .374 0l9.199 5.301c.015.003.029.008.04.013.016.007.031.015.045.025.012.011.023.024.033.036.014.016.027.032.037.05.012.018.023.038.03.058.017.04.027.082.027.124v0z"/></svg>',
    'Vue.js': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Vue.js</title><path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,4.81,7.47,13.39H4.59L12,2.39l7.41,11H16.53Z"/></svg>',
    'React': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>React</title><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236z"/></svg>',
    'MySQL': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>MySQL</title><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273z"/></svg>',
    'Bootstrap': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Bootstrap</title><path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466z"/></svg>',
    'Tailwind': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Tailwind CSS</title><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8z"/></svg>',
    'Figma': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Figma</title><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49z"/></svg>'
  };

  return iconMap[skillName] || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>';
}
