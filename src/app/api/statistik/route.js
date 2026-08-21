import { NextResponse } from 'next/server';
import { getStatistikData } from '@/lib/dataService';

export async function GET() {
  try {
    const data = await getStatistikData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
