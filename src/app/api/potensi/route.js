import { NextResponse } from 'next/server';
import { getPotensiData, addPotensi } from '@/lib/dataService';
import { uploadImage } from '@/lib/dataService';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/potensi
 * Mengambil semua data potensi, bisa difilter dengan query ?kategori=Pertanian
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const kategori = searchParams.get('kategori');

  try {
    const data = await getPotensiData(kategori);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/potensi
 * Menambah data potensi baru (menerima FormData untuk upload gambar)
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const judul = formData.get('judul');
    const kategori = formData.get('kategori');
    const deskripsi = formData.get('deskripsi');
    const imageFile = formData.get('image');

    if (!judul || !deskripsi) {
      return NextResponse.json(
        { success: false, error: 'Judul dan deskripsi wajib diisi.' },
        { status: 400 }
      );
    }

    let image_url = '/images/placeholder_potensi.jpg';

    // Upload gambar ke Supabase Storage jika ada
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('potensi-images')
        .upload(fileName, buffer, {
          contentType: imageFile.type,
          cacheControl: '3600',
        });

      if (!uploadError) {
        const { data } = supabase.storage
          .from('potensi-images')
          .getPublicUrl(fileName);
        image_url = data.publicUrl;
      }
    }

    const newPotensi = await addPotensi({
      judul,
      kategori: kategori || 'Pertanian',
      deskripsi,
      image_url,
    });

    return NextResponse.json({ success: true, data: newPotensi }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
