import { NextRequest, NextResponse } from 'next/server';
import { getShopifyApi } from '@/lib/shopify';
import { sessionStorage } from '@/lib/session-storage';

export const dynamic = 'force-dynamic';

// Shopify OAuth Callback
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get('shop');

    if (!shop) {
      return NextResponse.json({ error: 'Shop parameter is missing' }, { status: 400 });
    }

    const shopify = getShopifyApi();

    const callbackResponse = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: new Response(),
    });

    const { session } = callbackResponse;
    const isStored = await sessionStorage.storeSession(session);

    if (!isStored) {
      return NextResponse.json({ error: 'Failed to store shop session' }, { status: 500 });
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
  } catch (error) {
    console.error('Shopify OAuth Callback Error:', error);
    return NextResponse.json({ error: 'OAuth Callback failed' }, { status: 500 });
  }
}
