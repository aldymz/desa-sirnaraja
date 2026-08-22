-- Jalankan ini di Supabase SQL Editor agar bisa menyimpan data Kependudukan dan Jenis Kelamin secara dinamis
ALTER TABLE statistik_desa ADD COLUMN IF NOT EXISTS data_kependudukan JSONB DEFAULT '[]'::jsonb;
ALTER TABLE statistik_desa ADD COLUMN IF NOT EXISTS jenis_kelamin JSONB DEFAULT '[]'::jsonb;
