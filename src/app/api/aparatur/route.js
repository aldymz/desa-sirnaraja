import { NextResponse } from 'next/server';
import { getAparaturData } from '@/lib/dataService';

/**
 * GET /api/aparatur
 * Mengambil data seluruh aparatur/pemerintahan desa
 */
export async function GET() {
  try {
    const data = await getAparaturData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
