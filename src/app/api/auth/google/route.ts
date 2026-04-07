import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Google Ads OAuth Başlangıç Noktası
export async function GET(req: NextRequest) {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;
  const scope = 'https://www.googleapis.com/auth/adwords';

  if (!googleClientId) {
    return NextResponse.json({ error: 'GOOGLE_CLIENT_ID not configured' }, { status: 500 });
  }

  // Google OAuth 2.0 Auth URL Oluştur (Google Ads API için)
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline&prompt=consent`;

  return NextResponse.redirect(authUrl);
}
