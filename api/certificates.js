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
      const certificates = [
        // 🏆 SERTIFIKAT JUARA - PRIORITAS PERTAMA
        {
          id: 1,
          title: 'Juara 1 Lomba Poster Rancang Bangun IoT',
          issuer: 'Jakarta Global University',
          date: '05 Juli 2025',
          description: 'Sertifikat penghargaan Juara 1 Lomba Nasional Poster Rancang Bangun IoT dalam rangkaian acara IT\'s Day 2025. Selamat Anda menjadi bagian dari 3 Besar Lomba Nasional.',
          pdf_url: '#',
          image_url: '/lombaposter.jpg',
          credential_url: '#',
          skills: ['IoT Design', 'Poster Design', 'Innovation', 'National Competition']
        },

        // 💻 SERTIFIKAT DICODING - PROFESSIONAL SKILLS
        {
          id: 2,
          title: 'Belajar Dasar Cloud dan Gen AI di AWS',
          issuer: 'Dicoding Indonesia',
          date: '04 Juni 2025',
          description: 'Sertifikat Kompetensi Kelulusan untuk menyelesaikan kelas "Belajar Dasar Cloud dan Gen AI di AWS" dengan rating bintang 9 dari Dicoding Academy. Berlaku hingga 04 Juni 2028.',
          pdf_url: '/sertifikat_course_159_3933453_161024153836.pdf',
          image_url: '/clous aws.png',
          credential_url: 'https://dicoding.com/certificates/JMZV61N3PN9',
          skills: ['AWS Cloud', 'Generative AI', 'Cloud Computing']
        },
        {
          id: 3,
          title: 'Belajar Membuat Aplikasi Flutter untuk Pemula',
          issuer: 'Dicoding Indonesia',
          date: '16 Oktober 2024',
          description: 'Sertifikat Kompetensi Kelulusan untuk menyelesaikan kelas "Belajar Membuat Aplikasi Flutter untuk Pemula" dengan rating bintang 9 dari Dicoding Academy. Berlaku hingga 16 Oktober 2027.',
          pdf_url: '/sertifikat_ikhsanudin_dart_mobile.pdf',
          image_url: '/flutter.png',
          credential_url: 'https://dicoding.com/certificates/N9ZOYOOVYPG5',
          skills: ['Flutter Development', 'Mobile Apps', 'Cross Platform']
        },
        {
          id: 4,
          title: 'Memulai Pemrograman dengan Dart',
          issuer: 'Dicoding Indonesia',
          date: '05 Oktober 2024',
          description: 'Sertifikat Kompetensi Kelulusan untuk menyelesaikan kelas "Memulai Pemrograman dengan Dart" dengan rating bintang 9 dari Dicoding Academy. Berlaku hingga 05 Oktober 2027.',
          pdf_url: '/sertifikat_course_251_3933453_040625150622.pdf',
          image_url: '/dart.png',
          credential_url: 'https://dicoding.com/certificates/QLZ9V2YJ7X5D',
          skills: ['Dart Programming', 'Mobile Development', 'Flutter']
        },

        // 🎓 SERTIFIKAT UNIVERSITAS AMIKOM - ACADEMIC & COMMUNITY
        {
          id: 5,
          title: 'Pelatihan Member AMCC 2023/2024',
          issuer: 'AMIKOM Computer Club (AMCC)',
          date: '26 Agustus 2024',
          description: 'Sertifikat peserta Divisi Mobile Programming pada Pelatihan Member AMCC 2023/2024 yang diselenggarakan di Universitas Amikom Yogyakarta pada 23 Desember 2023 - 22 Juni 2024.',
          pdf_url: '/E Sertifikat Ikhsanudin _2.pdf',
          image_url: '/ags.png',
          credential_url: '#',
          skills: ['Mobile Programming', 'AMCC Community']
        },
        {
          id: 6,
          title: 'CODE (Competition of Developer) 2024',
          issuer: 'AMIKOM Computer Club (AMCC)',
          date: '9 September 2024',
          description: 'Sertifikat panitia pada acara CODE (Competition of Developer) 2024 yang diselenggarakan di Ruang Citra 2 AMIKOM pada 7 Agustus 2024.',
          pdf_url: '/E Sertifikat Introduction to Computer (ITC) 2023.pdf',
          image_url: '/code.png',
          credential_url: '#',
          skills: ['Programming Competition', 'Event Management']
        },
        {
          id: 7,
          title: 'AGS (AMCC Goes To School) 2024',
          issuer: 'AMIKOM Computer Club (AMCC)',
          date: '20 Mei 2024',
          description: 'Sertifikat panitia pada acara AGS (AMCC Goes To School) 2024 yang diselenggarakan di SMA Negeri 10 Yogyakarta pada 19 Februari 2024.',
          pdf_url: '/E Sertifikat Ikhsanudin AGS (AMCC Goes To School) 2024.pdf',
          image_url: '/ags.png',
          credential_url: '#',
          skills: ['Event Organization', 'Community Service']
        },
        {
          id: 8,
          title: 'Introduction to Computer (ITC) 2023',
          issuer: 'Universitas AMIKOM Yogyakarta',
          date: '12 Desember 2023',
          description: 'Sertifikat peserta Divisi Computer Graphics pada acara Introduction to Computer (ITC) 2023 yang diselenggarakan di Lab. Komputer Universitas Amikom Yogyakarta pada 9 Agustus 2023.',
          pdf_url: '/E Sertifikat Ikhsanudin .pdf',
          image_url: '/itc.png',
          credential_url: '#',
          skills: ['Computer Graphics', 'IT Fundamentals']
        }
      ];

      res.status(200).json(certificates);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        error: 'Gagal mengambil data certificates',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
