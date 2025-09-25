const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Endpoint API yang akan mengambil data dari Database
app.get('/api/education', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM education ORDER BY period DESC;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching education data:', error);
    res.status(500).json({ error: 'Gagal mengambil data pendidikan' });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM skills;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching skills data:', error);
    res.status(500).json({ error: 'Gagal mengambil data skill' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM projects;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching projects data:', error);
    res.status(500).json({ error: 'Gagal mengambil data proyek' });
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