import { NextResponse } from 'next/server';
import { getDesaData } from '@/lib/dataService';

/**
 * GET /api/desa
 * Mengambil informasi umum desa
 */
export async function GET() {
  try {
    const data = await getDesaData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
