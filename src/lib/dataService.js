import { supabase } from './supabase';
import { desaDataFallback, potensiDataFallback, aparaturDataFallback } from './fallbackData';

/**
 * Mengambil data identitas/umum desa dari Supabase.
 * Fallback ke data statis jika Supabase belum terkonfigurasi.
 */
export async function getDesaData() {
  try {
    const { data, error } = await supabase
      .from('desa_info')
      .select('*')
      .single();

    if (error || !data) {
      console.warn('Menggunakan data fallback untuk desa_info:', error?.message);
      return desaDataFallback;
    }
    return data;
  } catch {
    return desaDataFallback;
  }
}

/**
 * Mengambil semua data potensi desa dari Supabase.
 * Bisa difilter berdasarkan kategori.
 */
export async function getPotensiData(kategori = null) {
  try {
    let query = supabase
      .from('potensi')
      .select('*')
      .order('created_at', { ascending: true });

    if (kategori && kategori !== 'Semua') {
      query = query.eq('kategori', kategori);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      console.warn('Menggunakan data fallback untuk potensi:', error?.message);
      return kategori && kategori !== 'Semua'
        ? potensiDataFallback.filter((p) => p.kategori === kategori)
        : potensiDataFallback;
    }
    return data;
  } catch {
    return potensiDataFallback;
  }
}

/**
 * Menambah data potensi baru ke Supabase.
 */
export async function addPotensi(potensiData) {
  const { data, error } = await supabase
    .from('potensi')
    .insert([potensiData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Menghapus data potensi dari Supabase berdasarkan ID.
 */
export async function deletePotensi(id) {
  const { error } = await supabase.from('potensi').delete().eq('id', id);
  if (error) throw error;
}

/**
 * Mengambil data aparatur/pemerintahan desa dari Supabase.
 */
export async function getAparaturData() {
  try {
    const { data, error } = await supabase
      .from('aparatur')
      .select('*')
      .order('urutan', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Menggunakan data fallback untuk aparatur:', error?.message);
      return aparaturDataFallback;
    }
    return data;
  } catch {
    return aparaturDataFallback;
  }
}

/**
 * Upload gambar ke Supabase Storage.
 * @param {File} file - File gambar yang akan diupload
 * @param {string} bucket - Nama bucket (default: 'potensi-images')
 * @returns {string} Public URL gambar
 */
export async function uploadImage(file, bucket = 'potensi-images') {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
}

/**
 * Mengambil data hero banners dari Supabase.
 * Bisa difilter berdasarkan halaman (opsional).
 */
export async function getBannersData(halaman = null) {
  try {
    let query = supabase
      .from('hero_banners')
      .select('*')
      .eq('aktif', true)
      .order('urutan', { ascending: true });

    if (halaman) {
      query = query.eq('halaman', halaman);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch {
    return [];
  }
}

/**
 * Mengambil data statistik desa dari Supabase.
 */
export async function getStatistikData() {
  try {
    const { data, error } = await supabase
      .from('statistik_desa')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}
