import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD;
    const secret    = process.env.ADMIN_SECRET;

    if (username === validUser && password === validPass) {
      const response = NextResponse.json({ success: true });
      // Set cookie HTTP-only agar tidak bisa diakses JavaScript (lebih aman)
      response.cookies.set('admin_token', secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 jam
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ success: false, message: 'Username atau password salah.' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan.' }, { status: 500 });
  }
}
