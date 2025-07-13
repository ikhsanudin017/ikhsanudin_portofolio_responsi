// File: backend/index.js (Versi Final yang Benar)

const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');

const app = express();
app.use(cors());

// Perhatikan: semua '/api' di sini sudah dihapus
app.get('/education', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM education ORDER BY id ASC;`;
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pendidikan', details: error.message });
  }
});

app.get('/skills', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM skills;`;
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data skill', details: error.message });
  }
});

app.get('/projects', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM projects ORDER BY id ASC;`;
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data proyek', details: error.message });
  }
});

// Anda bisa tambahkan endpoint lain seperti /certificates di sini jika perlu

// Bagian app.listen ini sudah benar, hanya berjalan di lokal dan tidak di produksi
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Wajib ada agar bisa berjalan di Vercel
module.exports = app;
