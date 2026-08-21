-- ============================================================
-- TAMBAHAN SCHEMA -- Desa Sirnaraja
-- Jalankan di Supabase SQL Editor setelah supabase_schema.sql
-- ============================================================


-- 1. Tambah kolom yang kurang di tabel desa_info
ALTER TABLE desa_info
  ADD COLUMN IF NOT EXISTS sosial_media  JSONB DEFAULT '{"instagram":"","facebook":"","youtube":""}',
  ADD COLUMN IF NOT EXISTS logo_url      TEXT DEFAULT '/images/logo-desa.png',
  ADD COLUMN IF NOT EXISTS visi          TEXT DEFAULT 'Terwujudnya Desa Sirnaraja yang Agamis, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Gotong Royong pada Tahun 2028.',
  ADD COLUMN IF NOT EXISTS misi          JSONB DEFAULT '[{"nomor":"01","teks":"Meningkatkan kualitas sumber daya manusia melalui pendidikan dan keagamaan yang inklusif."},{"nomor":"02","teks":"Membangun kemandirian ekonomi desa berbasis pertanian terpadu dan digitalisasi UMKM."},{"nomor":"03","teks":"Meningkatkan tata kelola pemerintahan desa yang bersih, transparan, cepat, dan melayani."},{"nomor":"04","teks":"Menjaga kelestarian lingkungan hidup dan kearifan budaya lokal sebagai warisan anak cucu."}]',
  ADD COLUMN IF NOT EXISTS sejarah       TEXT DEFAULT 'Desa Sirnaraja dibentuk secara resmi pada tahun 1969 dan tumbuh menjadi kawasan yang mandiri berbasis pertanian, perkebunan, dan UMKM.',
  ADD COLUMN IF NOT EXISTS slogan        TEXT DEFAULT 'Desa Bersih, Transparan, dan Melayani';


-- 2. Tabel hero_banners — Slider & Hero Image tiap halaman
CREATE TABLE IF NOT EXISTS hero_banners (
  id         SERIAL PRIMARY KEY,
  halaman    TEXT NOT NULL CHECK (halaman IN ('beranda','profil','potensi','data')),
  image_url  TEXT NOT NULL,
  judul      TEXT,
  subjudul   TEXT,
  urutan     INTEGER DEFAULT 0,
  aktif      BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO hero_banners (halaman, image_url, judul, subjudul, urutan) VALUES
('beranda', '/images/slider1.jpeg', 'Selamat Datang di Desa Sirnaraja', 'Desa yang Agamis, Mandiri, dan Berbudaya', 1),
('beranda', '/images/slider2.jpeg', 'Potensi Pertanian Unggulan', 'Padi organik berkualitas dari lahan subur Sirnaraja', 2),
('beranda', '/images/slider3.jpeg', 'Gotong Royong adalah Jiwa Kami', 'Bersama membangun desa yang lebih baik', 3),
('profil',  '/images/gerbang desa.jpeg', 'Profil Desa Sirnaraja', 'Mengenal lebih dekat Pemerintahan Desa Sirnaraja', 1),
('potensi', '/images/pertanian sawah.jpeg', 'Potensi Unggulan Desa', 'Kekayaan alam dan budaya Desa Sirnaraja', 1),
('data',    '/images/slider1.jpeg', 'Data & Statistik Desa', 'Informasi kependudukan dan demografi terkini', 1);


-- 3. Tabel statistik_desa — Data Kependudukan & Demografi
CREATE TABLE IF NOT EXISTS statistik_desa (
  id              SERIAL PRIMARY KEY,
  total_penduduk  INTEGER DEFAULT 3215,
  total_kk        INTEGER DEFAULT 1259,
  laki_laki       INTEGER DEFAULT 1620,
  perempuan       INTEGER DEFAULT 1595,
  luas_wilayah    TEXT DEFAULT '602 Ha',
  distribusi_usia JSONB DEFAULT '[
    {"label":"Anak-anak (0-14 thn)","jumlah":642,"persen":20,"color":"#10b981"},
    {"label":"Remaja (15-24 thn)","jumlah":580,"persen":18,"color":"#3b82f6"},
    {"label":"Dewasa Produktif (25-54 thn)","jumlah":1287,"persen":40,"color":"#8b5cf6"},
    {"label":"Pra Lansia (55-64 thn)","jumlah":386,"persen":12,"color":"#f59e0b"},
    {"label":"Lansia (65+ thn)","jumlah":320,"persen":10,"color":"#ef4444"}
  ]',
  tingkat_pendidikan JSONB DEFAULT '[
    {"label":"Belum / Tidak Sekolah","jumlah":385,"persen":"12%"},
    {"label":"SD / Sederajat","jumlah":963,"persen":"30%"},
    {"label":"SMP / Sederajat","jumlah":770,"persen":"24%"},
    {"label":"SMA / Sederajat","jumlah":706,"persen":"22%"},
    {"label":"D1 / D2 / D3","jumlah":128,"persen":"4%"},
    {"label":"S1 / Sarjana","jumlah":257,"persen":"8%"}
  ]',
  mata_pencaharian JSONB DEFAULT '[
    {"label":"Petani","jumlah":890,"color":"#10b981"},
    {"label":"Pedagang / Wiraswasta","jumlah":420,"color":"#3b82f6"},
    {"label":"PNS / TNI / Polri","jumlah":85,"color":"#8b5cf6"},
    {"label":"Buruh Tani","jumlah":560,"color":"#f59e0b"},
    {"label":"Lainnya","jumlah":420,"color":"#64748b"}
  ]',
  sarana_prasarana JSONB DEFAULT '[
    {"label":"Masjid / Mushola","jumlah":12},
    {"label":"Sekolah (SD/MI)","jumlah":3},
    {"label":"Posyandu","jumlah":5},
    {"label":"Balai Warga / RW","jumlah":8}
  ]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO statistik_desa DEFAULT VALUES;


-- 4. Enable RLS untuk tabel baru
ALTER TABLE hero_banners   ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistik_desa ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read hero_banners"   ON hero_banners   FOR SELECT USING (true);
CREATE POLICY "Allow public read statistik_desa" ON statistik_desa FOR SELECT USING (true);

CREATE POLICY "Allow insert hero_banners" ON hero_banners FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update hero_banners" ON hero_banners FOR UPDATE USING (true);
CREATE POLICY "Allow delete hero_banners" ON hero_banners FOR DELETE USING (true);

CREATE POLICY "Allow update statistik_desa" ON statistik_desa FOR UPDATE USING (true);
