/**
 * Data statis sebagai fallback/default jika Supabase belum dikonfigurasi.
 * Nantinya seluruh data ini akan diambil dari tabel Supabase.
 */

export const desaDataFallback = {
  nama: 'Desa Sirnaraja',
  deskripsi:
    'Desa Sirnaraja adalah sebuah desa agraris yang terletak di Kecamatan Cigalontang, Kabupaten Tasikmalaya, Jawa Barat. Didirikan pada tahun 1969, desa ini memiliki bentang alam perbukitan yang indah dengan komoditas pertanian yang melimpah serta masyarakat yang menjunjung tinggi semangat gotong royong.',
  populasi: '3.215',
  luasWilayah: '602 Ha',
  kontak: {
    alamat: 'Sirnaraja, Kec. Cigalontang, Kabupaten Tasikmalaya, Jawa Barat 46463',
    email: 'pemdessirnaraja@gmail.com',
    telepon: '(0265) 1234567',
  },
};

export const potensiDataFallback = [
  {
    id: 1,
    kategori: 'Pertanian',
    judul: 'Pertanian Padi Organik',
    deskripsi:
      'Sektor utama penyokong ekonomi desa yang dikelola secara organik tanpa bahan kimia berbahaya, menghasilkan beras berkualitas tinggi di atas lahan persawahan seluas 186 Ha.',
    image_url: '/images/pertanian sawah.jpeg',
  },
  {
    id: 2,
    kategori: 'UMKM',
    judul: 'Produksi Wajit Lokal',
    deskripsi:
      'Produk UMKM unggulan desa berupa penganan manis tradisional wajit yang diproduksi oleh warga lokal dengan resep turun-temurun.',
    image_url: '/images/umkm wajit.jpeg',
  },
  {
    id: 3,
    kategori: 'Budaya',
    judul: 'Gotong Royong',
    deskripsi:
      'Budaya kebersamaan dan tolong-menolong yang menjadi jiwa dan landasan dalam setiap pembangunan dan aktivitas sosial di Desa Sirnaraja.',
    image_url: '/images/gotongroyong.jpeg',
  },
  {
    id: 4,
    kategori: 'Peternakan',
    judul: 'Peternakan Warga',
    deskripsi:
      'Sektor peternakan yang dikembangkan oleh warga desa sebagai sumber penghasilan tambahan, didukung ketersediaan pakan alami yang melimpah.',
    image_url: '/images/peternakan domba.jpeg',
  },
  {
    id: 5,
    kategori: 'Budaya',
    judul: 'Kesenian Calung',
    deskripsi:
      'Kesenian tradisional Sunda yang terbuat dari bambu, terus dilestarikan oleh masyarakat desa sebagai media hiburan dan warisan budaya leluhur.',
    image_url: '/images/budaya calung.jpeg',
  },
];

export const aparaturDataFallback = [
  {
    id: 'kades',
    nama: 'ASEP YUYUN YULIANA',
    jabatan: 'Kepala Desa Sirnaraja',
    kategori: 'pimpinan',
    kategori_label: 'Pimpinan Utama',
    pendidikan: 'S1 (Sarjana)',
    jk: 'Laki-laki',
    avatar_color: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
    badge_color: '#1b4332',
    deskripsi:
      'Memimpin penyelenggaraan Pemerintahan Desa Sirnaraja, membina kehidupan masyarakat, serta memelihara ketenteraman dan ketertiban desa berdasar pada prinsip tata kelola yang bersih dan melayani.',
  },
  {
    id: 'sekdes',
    nama: 'APEP',
    jabatan: 'Sekretaris Desa',
    kategori: 'pimpinan',
    kategori_label: 'Pimpinan Eksekutif',
    pendidikan: 'SMA / Sederajat',
    jk: 'Laki-laki',
    avatar_color: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)',
    badge_color: '#1d3557',
    deskripsi:
      'Pemimpin Sekretariat Desa yang membantu Kepala Desa dalam bidang administrasi pemerintahan, pengelolaan keuangan desa, perumusan kebijakan, serta koordinasi seluruh urusan kaur.',
  },
  {
    id: 'kaur-umum',
    nama: 'FITRI YULIA',
    jabatan: 'Kaur Tata Usaha & Umum',
    kategori: 'kaur',
    kategori_label: 'Staf TU & Umum',
    pendidikan: 'SMA / Sederajat',
    jk: 'Perempuan',
    avatar_color: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    badge_color: '#0284c7',
    deskripsi:
      'Melaksanakan tata naskah dinas, administrasi surat-menyurat, pengarsipan, penyediaan sarana kantor desa, serta pemeliharaan aset desa.',
  },
  {
    id: 'kaur-keuangan',
    nama: 'NURUL KHOTIMAH',
    jabatan: 'Kaur Keuangan',
    kategori: 'kaur',
    kategori_label: 'Staf Urusan Keuangan',
    pendidikan: 'SMA / Sederajat',
    jk: 'Perempuan',
    avatar_color: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    badge_color: '#0284c7',
    deskripsi:
      'Melaksanakan urusan keuangan desa seperti menerima, menyimpan, menyetorkan, membayar, dan mempertanggungjawabkan pengeluaran APBDes.',
  },
  {
    id: 'kaur-perencanaan',
    nama: 'AEP SAEPUDIN',
    jabatan: 'Kaur Perencanaan',
    kategori: 'kaur',
    kategori_label: 'Staf Perencanaan',
    pendidikan: 'SMA / Sederajat',
    jk: 'Laki-laki',
    avatar_color: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    badge_color: '#0284c7',
    deskripsi:
      'Menyusun rencana pembangunan jangka menengah (RPJMDes), Rencana Kerja Pemerintah Desa (RKPDes), serta laporan evaluasi penyelenggaraan pemerintahan.',
  },
  {
    id: 'kasi-pem',
    nama: 'YAYAT HIDAYAT',
    jabatan: 'Kasi Pemerintahan',
    kategori: 'kasi',
    kategori_label: 'Pelaksana Tata Praja',
    pendidikan: 'SMA / Sederajat',
    jk: 'Laki-laki',
    avatar_color: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
    badge_color: '#059669',
    deskripsi:
      'Melaksanakan manajemen tata praja pemerintahan, tata keagrariaan, pembinaan ketentraman dan ketertiban masyarakat.',
  },
  {
    id: 'kasi-pelayanan',
    nama: 'UDAN TARYANA',
    jabatan: 'Kasi Pelayanan',
    kategori: 'kasi',
    kategori_label: 'Pelaksana Pelayanan Publik',
    pendidikan: 'SMA / Sederajat',
    jk: 'Laki-laki',
    avatar_color: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
    badge_color: '#059669',
    deskripsi:
      'Melaksanakan penyuluhan sosial kemasyarakatan, pelayanan kependudukan (KTP, KK, Surat Pengantar), serta koordinasi bantuan sosial.',
  },
  {
    id: 'kasi-kesra',
    nama: 'DADAN NURJAMAN',
    jabatan: 'Kasi Kesejahteraan',
    kategori: 'kasi',
    kategori_label: 'Pelaksana Pembangunan & Kesra',
    pendidikan: 'SMA / Sederajat',
    jk: 'Laki-laki',
    avatar_color: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
    badge_color: '#059669',
    deskripsi:
      'Melaksanakan pembangunan sarana prasarana fisik desa, sosialisasi serta pembinaan dalam bidang pendidikan dan kesehatan.',
  },
  {
    id: 'kadus-1',
    nama: 'KARTINI',
    jabatan: 'Kepala Wilayah 1 (Saungjaya)',
    kategori: 'kadus',
    kategori_label: 'Pelaksana Kewilayahan 1',
    pendidikan: 'SD / SMP',
    jk: 'Perempuan',
    avatar_color: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
    badge_color: '#d97706',
    deskripsi:
      'Melaksanakan kegiatan pemerintahan, pembangunan, dan pelayanan kemasyarakatan di Wilayah 1 (Saungjaya).',
  },
  {
    id: 'kadus-2',
    nama: 'WAWAN HERMAWAN',
    jabatan: 'Kepala Wilayah 2 (Cisurian)',
    kategori: 'kadus',
    kategori_label: 'Pelaksana Kewilayahan 2',
    pendidikan: 'SD / SMP',
    jk: 'Laki-laki',
    avatar_color: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
    badge_color: '#d97706',
    deskripsi:
      'Melaksanakan kegiatan pemerintahan, pembangunan, dan pelayanan kemasyarakatan di Wilayah 2 (Cisurian).',
  },
  {
    id: 'kadus-3',
    nama: 'A YUDI AKHIRIANA',
    jabatan: 'Kepala Wilayah 3 (Mayangcinde)',
    kategori: 'kadus',
    kategori_label: 'Pelaksana Kewilayahan 3',
    pendidikan: 'SD / SMP',
    jk: 'Laki-laki',
    avatar_color: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
    badge_color: '#d97706',
    deskripsi:
      'Melaksanakan kegiatan pemerintahan, pembangunan, dan pelayanan kemasyarakatan di Wilayah 3 (Mayangcinde).',
  },
  {
    id: 'kadus-4',
    nama: '(Coming Soon)',
    jabatan: 'Kepala Wilayah 4 (Sirnaraja)',
    kategori: 'kadus',
    kategori_label: 'Pelaksana Kewilayahan 4',
    pendidikan: '-',
    jk: '-',
    avatar_color: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
    badge_color: '#64748b',
    deskripsi:
      'Jabatan Pelaksana Kewilayahan 4 (Sirnaraja) saat ini sedang dalam proses pengisian / lowong.',
  },
];
