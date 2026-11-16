// Proyek lama tetap tersedia ketika API tidak dapat dijangkau.
export const fallbackProjects = [
  {
    id: 1,
    title: 'PhoneKu',
    description: 'Platform toko online untuk menjual produk HP dengan fitur pencarian, keranjang belanja, dan checkout.',
    image: '/phoneku.jpg',
    tech: ['Laravel'],
    repoUrl: 'https://github.com/nandanazadaa/phoneku'
  },
  {
    id: 2,
    title: 'Sistem Koperasi',
    description: 'Platform untuk mengelola koperasi.',
    image: '/sistem_koperasi.jpg',
    tech: ['C#'],
    repoUrl: 'https://github.com/ikhsanudin017/KoperasiApp'
  },
  {
    id: 3,
    title: 'UI UX Sport Venue',
    description: 'Desain antarmuka aplikasi pengelolaan sewa lapangan.',
    image: 'https://i.imgur.com/TWPK4LX.jpeg',
    tech: ['Figma']
  }
]

export const featuredProjects = [
  {
    id: 'murabahahku',
    title: 'Murabahahku',
    description: 'Sistem administrasi pembiayaan syariah untuk mengelola anggota, pengajuan, angsuran, dan laporan.',
    image: '/projects/murabahahku.png',
    tech: ['Next.js', 'React', 'Prisma', 'MySQL']
  },
  {
    id: 'twinuvo',
    title: 'Twinuvo',
    description: 'Digital twin bangunan dengan visualisasi 3D, pemantauan sensor IoT, dan analisis energi.',
    image: '/projects/twinuvo.png',
    tech: ['Vue.js', 'Three.js', 'Cesium', 'IoT']
  },
  {
    id: 'presensi-kajian',
    title: 'Presensi Kajian',
    description: 'Aplikasi presensi jamaah untuk mencatat kehadiran, melihat peringkat, dan memindai foto daftar hadir.',
    image: '/projects/presensi-kajian.png',
    tech: ['Next.js', 'React', 'Prisma']
  },
  {
    id: 'voucher-makanan',
    title: 'Voucher Makanan',
    description: 'Sistem voucher konsumsi GEN-Q Islamic Fair untuk pengelolaan peserta, pemindaian QR, dan penukaran voucher.',
    image: '/projects/voucher-makanan.png',
    tech: ['Next.js', 'React', 'Supabase']
  }
]

export function mergeProjects(apiProjects) {
  const projects = Array.isArray(apiProjects) && apiProjects.length ? apiProjects : fallbackProjects
  const byTitle = new Map()

  for (const project of [...projects, ...featuredProjects]) {
    if (project?.title) byTitle.set(project.title.trim().toLocaleLowerCase('id'), project)
  }

  return [...byTitle.values()]
}
