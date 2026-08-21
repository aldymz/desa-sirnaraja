import { NextResponse } from 'next/server';
import { deletePotensi } from '@/lib/dataService';

/**
 * DELETE /api/potensi/[id]
 * Menghapus data potensi berdasarkan ID
 */
export async function DELETE(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'ID potensi diperlukan.' },
      { status: 400 }
    );
  }

  try {
    await deletePotensi(id);
    return NextResponse.json({ success: true, message: `Potensi dengan ID ${id} berhasil dihapus.` });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
