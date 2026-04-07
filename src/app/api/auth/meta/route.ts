import { NextRequest, NextResponse } from 'next/server';

// Meta Ads OAuth Yönlendirmesi
export async function GET(req: NextRequest) {
  const metaClientId = process.env.META_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/meta`;
  
  // Meta Kurulum Adımları (Scopes)
  const scopes = [
    'ads_read',
    'read_insights',
    'business_management'
  ].join(',');

  const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${metaClientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code`;

  if (!metaClientId) {
    return NextResponse.json({ error: 'Meta Client ID is missing in .env' }, { status: 500 });
  }

  // Kullanıcıyı Meta'ya (Giriş Ekranı) yönlendir
  return NextResponse.redirect(authUrl);
}
