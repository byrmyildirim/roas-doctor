import { NextRequest, NextResponse } from 'next/server';

// Google Ads OAuth 2.0 Yönlendirmesi
export async function GET(req: NextRequest) {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`;
  
  // Google Ads Scopes (Erişim İzinleri)
  const scopes = [
    'https://www.googleapis.com/auth/adwords',
    'openid',
    'email',
    'profile'
  ].join(' ');

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}&access_type=offline&prompt=consent`;

  if (!googleClientId) {
    return NextResponse.json({ error: 'Google Client ID is missing in .env' }, { status: 500 });
  }

  // Kullanıcıyı Google Giriş Ekranına yönlendir
  return NextResponse.redirect(authUrl);
}
