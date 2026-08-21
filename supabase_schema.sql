-- ============================================================
-- SCHEMA DATABASE SUPABASE -- Desa Sirnaraja
-- Jalankan seluruh file ini di Supabase SQL Editor
-- ============================================================


-- 1. Tabel desa_info
CREATE TABLE IF NOT EXISTS desa_info (
  id           SERIAL PRIMARY KEY,
  nama         TEXT NOT NULL DEFAULT 'Desa Sirnaraja',
  deskripsi    TEXT,
  populasi     TEXT DEFAULT '3.215',
  luas_wilayah TEXT DEFAULT '602 Ha',
  kontak       JSONB DEFAULT '{"alamat":"Sirnaraja, Kec. Cigalontang, Kab. Tasikmalaya, Jawa Barat 46463","email":"pemdessirnaraja@gmail.com","telepon":"(0265) 1234567"}',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO desa_info (nama, deskripsi, populasi, luas_wilayah)
VALUES (
  'Desa Sirnaraja',
  'Desa Sirnaraja adalah sebuah desa agraris yang terletak di Kecamatan Cigalontang, Kabupaten Tasikmalaya, Jawa Barat. Didirikan pada tahun 1969, desa ini memiliki bentang alam perbukitan yang indah dengan komoditas pertanian yang melimpah serta masyarakat yang menjunjung tinggi semangat gotong royong.',
  '3.215',
  '602 Ha'
);


-- 2. Tabel potensi
CREATE TABLE IF NOT EXISTS potensi (
  id          SERIAL PRIMARY KEY,
  judul       TEXT NOT NULL,
  kategori    TEXT NOT NULL CHECK (kategori IN ('Pertanian','Peternakan','UMKM','Budaya','Pariwisata')),
  deskripsi   TEXT,
  image_url   TEXT DEFAULT '/images/placeholder_potensi.jpg',
  is_tambahan BOOLEAN DEFAULT FALSE,
  urutan      INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO potensi (judul, kategori, deskripsi, image_url, urutan) VALUES
('Pertanian Padi Organik', 'Pertanian', 'Sektor utama penyokong ekonomi desa yang dikelola secara organik tanpa bahan kimia berbahaya, menghasilkan beras berkualitas tinggi di atas lahan persawahan seluas 186 Ha.', '/images/pertanian sawah.jpeg', 1),
('Produksi Wajit Lokal', 'UMKM', 'Produk UMKM unggulan desa berupa penganan manis tradisional wajit yang diproduksi oleh warga lokal dengan resep turun-temurun.', '/images/umkm wajit.jpeg', 2),
('Gotong Royong', 'Budaya', 'Budaya kebersamaan dan tolong-menolong yang menjadi jiwa dan landasan dalam setiap pembangunan dan aktivitas sosial di Desa Sirnaraja.', '/images/gotongroyong.jpeg', 3),
('Peternakan Warga', 'Peternakan', 'Sektor peternakan yang dikembangkan oleh warga desa sebagai sumber penghasilan tambahan, didukung ketersediaan pakan alami yang melimpah.', '/images/peternakan domba.jpeg', 4),
('Kesenian Calung', 'Budaya', 'Kesenian tradisional Sunda yang terbuat dari bambu, terus dilestarikan oleh masyarakat desa sebagai media hiburan dan warisan budaya leluhur.', '/images/budaya calung.jpeg', 5);


-- 3. Tabel aparatur
CREATE TABLE IF NOT EXISTS aparatur (
  id             TEXT PRIMARY KEY,
  nama           TEXT NOT NULL,
  jabatan        TEXT NOT NULL,
  kategori       TEXT NOT NULL CHECK (kategori IN ('pimpinan','kaur','kasi','kadus')),
  kategori_label TEXT,
  pendidikan     TEXT,
  jk             TEXT CHECK (jk IN ('Laki-laki','Perempuan','-')),
  avatar_color   TEXT,
  badge_color    TEXT,
  deskripsi      TEXT,
  foto_url       TEXT,
  urutan         INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO aparatur (id, nama, jabatan, kategori, kategori_label, pendidikan, jk, avatar_color, badge_color, deskripsi, urutan) VALUES
('kades', 'ASEP YUYUN YULIANA', 'Kepala Desa Sirnaraja', 'pimpinan', 'Pimpinan Utama', 'S1 (Sarjana)', 'Laki-laki', 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)', '#1b4332', 'Memimpin penyelenggaraan Pemerintahan Desa Sirnaraja, membina kehidupan masyarakat, serta memelihara ketenteraman dan ketertiban desa berdasar pada prinsip tata kelola yang bersih dan melayani.', 1),
('sekdes', 'APEP', 'Sekretaris Desa', 'pimpinan', 'Pimpinan Eksekutif', 'SMA / Sederajat', 'Laki-laki', 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)', '#1d3557', 'Pemimpin Sekretariat Desa yang membantu Kepala Desa dalam bidang administrasi pemerintahan, pengelolaan keuangan desa, perumusan kebijakan, serta koordinasi seluruh urusan kaur.', 2),
('kaur-umum', 'FITRI YULIA', 'Kaur Tata Usaha & Umum', 'kaur', 'Staf TU & Umum', 'SMA / Sederajat', 'Perempuan', 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', '#0284c7', 'Melaksanakan tata naskah dinas, administrasi surat-menyurat, pengarsipan, penyediaan sarana kantor desa, serta pemeliharaan aset desa.', 3),
('kaur-keuangan', 'NURUL KHOTIMAH', 'Kaur Keuangan', 'kaur', 'Staf Urusan Keuangan', 'SMA / Sederajat', 'Perempuan', 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', '#0284c7', 'Melaksanakan urusan keuangan desa seperti menerima, menyimpan, menyetorkan, membayar, dan mempertanggungjawabkan pengeluaran APBDes.', 4),
('kaur-perencanaan', 'AEP SAEPUDIN', 'Kaur Perencanaan', 'kaur', 'Staf Perencanaan', 'SMA / Sederajat', 'Laki-laki', 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', '#0284c7', 'Menyusun rencana pembangunan jangka menengah (RPJMDes), Rencana Kerja Pemerintah Desa (RKPDes), serta laporan evaluasi penyelenggaraan pemerintahan.', 5),
('kasi-pem', 'YAYAT HIDAYAT', 'Kasi Pemerintahan', 'kasi', 'Pelaksana Tata Praja', 'SMA / Sederajat', 'Laki-laki', 'linear-gradient(135deg, #059669 0%, #34d399 100%)', '#059669', 'Melaksanakan manajemen tata praja pemerintahan, tata keagrariaan, pembinaan ketentraman dan ketertiban masyarakat.', 6),
('kasi-pelayanan', 'UDAN TARYANA', 'Kasi Pelayanan', 'kasi', 'Pelaksana Pelayanan Publik', 'SMA / Sederajat', 'Laki-laki', 'linear-gradient(135deg, #059669 0%, #34d399 100%)', '#059669', 'Melaksanakan penyuluhan sosial kemasyarakatan, pelayanan kependudukan (KTP, KK, Surat Pengantar), serta koordinasi bantuan sosial.', 7),
('kasi-kesra', 'DADAN NURJAMAN', 'Kasi Kesejahteraan', 'kasi', 'Pelaksana Pembangunan & Kesra', 'SMA / Sederajat', 'Laki-laki', 'linear-gradient(135deg, #059669 0%, #34d399 100%)', '#059669', 'Melaksanakan pembangunan sarana prasarana fisik desa, sosialisasi serta pembinaan dalam bidang pendidikan dan kesehatan.', 8),
('kadus-1', 'KARTINI', 'Kepala Wilayah 1 (Saungjaya)', 'kadus', 'Pelaksana Kewilayahan 1', 'SD / SMP', 'Perempuan', 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)', '#d97706', 'Melaksanakan kegiatan pemerintahan, pembangunan, dan pelayanan kemasyarakatan di Wilayah 1 (Saungjaya).', 9),
('kadus-2', 'WAWAN HERMAWAN', 'Kepala Wilayah 2 (Cisurian)', 'kadus', 'Pelaksana Kewilayahan 2', 'SD / SMP', 'Laki-laki', 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)', '#d97706', 'Melaksanakan kegiatan pemerintahan, pembangunan, dan pelayanan kemasyarakatan di Wilayah 2 (Cisurian).', 10),
('kadus-3', 'A YUDI AKHIRIANA', 'Kepala Wilayah 3 (Mayangcinde)', 'kadus', 'Pelaksana Kewilayahan 3', 'SD / SMP', 'Laki-laki', 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)', '#d97706', 'Melaksanakan kegiatan pemerintahan, pembangunan, dan pelayanan kemasyarakatan di Wilayah 3 (Mayangcinde).', 11),
('kadus-4', '(Coming Soon)', 'Kepala Wilayah 4 (Sirnaraja)', 'kadus', 'Pelaksana Kewilayahan 4', '-', '-', 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)', '#64748b', 'Jabatan Pelaksana Kewilayahan 4 (Sirnaraja) saat ini sedang dalam proses pengisian / lowong.', 12);


-- 4. Enable Row Level Security
ALTER TABLE desa_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE potensi    ENABLE ROW LEVEL SECURITY;
ALTER TABLE aparatur   ENABLE ROW LEVEL SECURITY;

-- Allow public read-only access
CREATE POLICY "Allow public read desa_info" ON desa_info FOR SELECT USING (true);
CREATE POLICY "Allow public read potensi"   ON potensi   FOR SELECT USING (true);
CREATE POLICY "Allow public read aparatur"  ON aparatur  FOR SELECT USING (true);

-- Allow insert/update/delete for potensi
CREATE POLICY "Allow insert potensi" ON potensi FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update potensi" ON potensi FOR UPDATE USING (true);
CREATE POLICY "Allow delete potensi" ON potensi FOR DELETE USING (true);
