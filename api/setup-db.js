const { sql } = require('@vercel/postgres');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Buat tabel skills
    await sql`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        icon TEXT
      );
    `;

    // Buat tabel education
    await sql`
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        period VARCHAR(50) NOT NULL,
        institution VARCHAR(200) NOT NULL,
        major VARCHAR(200) NOT NULL
      );
    `;

    // Buat tabel projects
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        image VARCHAR(500),
        tech TEXT[],
        repo_url VARCHAR(500),
        live_url VARCHAR(500)
      );
    `;

    res.status(200).json({ message: 'Database setup complete' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
