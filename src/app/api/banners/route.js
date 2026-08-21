import { NextResponse } from 'next/server';
import { getBannersData } from '@/lib/dataService';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const halaman = searchParams.get('halaman');

  try {
    const data = await getBannersData(halaman);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
