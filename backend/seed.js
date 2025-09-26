// File: backend/seed.js
const path = require('path');

try {
  const dotenv = require('dotenv');
  const envPath = path.resolve(__dirname, '..', '.env.development.local');
  dotenv.config({ path: envPath });
  dotenv.config();
} catch (error) {
  console.warn('Dotenv tidak ditemukan, lanjut menggunakan environment bawaan.');
}

const { sql } = require('@vercel/postgres');
const { educationHistory, skills, projects } = require('./data.js');

async function seed() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS education (
      id SERIAL PRIMARY KEY,
      period VARCHAR(255) NOT NULL,
      institution VARCHAR(255) NOT NULL,
      major VARCHAR(255) NOT NULL
    );`;

    await sql`CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      icon TEXT NOT NULL
    );`;

    await sql`CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(255),
      tech JSONB DEFAULT '[]'::jsonb,
      repo_url TEXT,
      live_url TEXT
    );`;

    await sql`ALTER TABLE skills ADD COLUMN IF NOT EXISTS icon TEXT;`;
    await sql`ALTER TABLE skills DROP COLUMN IF EXISTS level;`;

    await sql`ALTER TABLE projects DROP COLUMN IF EXISTS tech;`;
    await sql`ALTER TABLE projects ADD COLUMN tech JSONB DEFAULT '[]'::jsonb;`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS repo_url TEXT;`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url TEXT;`;

    await sql`TRUNCATE TABLE education RESTART IDENTITY CASCADE;`;
    await sql`TRUNCATE TABLE skills RESTART IDENTITY CASCADE;`;
    await sql`TRUNCATE TABLE projects RESTART IDENTITY CASCADE;`;

    for (const item of educationHistory) {
      await sql`
        INSERT INTO education (period, institution, major)
        VALUES (${item.period}, ${item.institution}, ${item.major});
      `;
    }

    for (const skill of skills) {
      await sql`
        INSERT INTO skills (name, icon)
        VALUES (${skill.name}, ${skill.icon});
      `;
    }

    for (const project of projects) {
      const techJson = JSON.stringify(project.tech || []);
      await sql`
        INSERT INTO projects (title, description, image, tech, repo_url, live_url)
        VALUES (
          ${project.title},
          ${project.description},
          ${project.image},
          ${techJson}::jsonb,
          ${project.repoUrl},
          ${project.liveUrl}
        );
      `;
    }

    console.log('Proses seeding data berhasil!');
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
}

seed();
