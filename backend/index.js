const express = require('express');
const cors = require('cors');
const path = require('path');
const { sql } = require('@vercel/postgres');

// Load environment variables for local development without failing on Vercel
try {
  const envPath = path.resolve(__dirname, '..', '.env.development.local');
  require('dotenv').config({ path: envPath });
  require('dotenv').config();
} catch (error) {
  console.warn('Dotenv not loaded (this is expected in production):', error.message);
}

// Static fallback data when the database cannot be reached
const {
  educationHistory: fallbackEducation,
  skills: fallbackSkills,
  projects: fallbackProjects,
  certificates: fallbackCertificates
} = require('./data.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'image')));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Endpoint API yang akan mengambil data dari Database
app.get('/api/education', async (req, res) => {
  try {
    const { rows } = await sql`
      SELECT period, institution, major
      FROM education
      ORDER BY id ASC;
    `;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching education data:', error);
    res.status(200).json(fallbackEducation);
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const { rows } = await sql`
      SELECT name, icon
      FROM skills
      ORDER BY id ASC;
    `;
    // Pastikan icon tersedia agar tampilan konsisten
    const formatted = rows.map((row) => ({
      name: row.name,
      icon: row.icon
    }));
    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error fetching skills data:', error);
    res.status(200).json(fallbackSkills);
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await sql`
      SELECT id, title, description, image, tech, repo_url, live_url
      FROM projects
      ORDER BY id ASC;
    `;

    const formatted = rows.map(({ repo_url, live_url, tech, ...rest }) => ({
      ...rest,
      tech: Array.isArray(tech) ? tech : [],
      repoUrl: repo_url,
      liveUrl: live_url
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error fetching projects data:', error);
    res.status(200).json(fallbackProjects);
  }
});

app.get('/api/certificates', async (req, res) => {
  try {
    const { rows } = await sql`
      SELECT id, title, issuer, date, description, pdf_url, image_url, credential_url, skills
      FROM certificates
      ORDER BY id ASC;
    `;

    const formatted = rows.map((row) => ({
      ...row,
      skills: Array.isArray(row.skills)
        ? row.skills
        : row.skills
        ? row.skills
        : []
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error fetching certificates data:', error);
    res.status(200).json(fallbackCertificates);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3000;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Wajib ada agar Vercel bisa menjalankan backend
module.exports = app;
