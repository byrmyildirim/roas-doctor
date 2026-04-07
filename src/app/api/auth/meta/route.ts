import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Meta Ads (Facebook) OAuth Başlangıç Noktası
export async function GET(req: NextRequest) {
  const metaClientId = process.env.META_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/meta/callback`;
  const scope = 'ads_read,ads_management,ads_report_read'; // Minimum gerekli izinler

  if (!metaClientId) {
    return NextResponse.json({ error: 'META_CLIENT_ID not configured' }, { status: 500 });
  }

  // Kullanıcıyı Meta OAuth ekranına yönlendir
  const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${metaClientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;

  return NextResponse.redirect(authUrl);
}
