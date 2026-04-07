import { NextRequest, NextResponse } from 'next/server';
import { getShopifyApi } from '@/lib/shopify';

// Build sırasında statik derlemeyi engelle
export const dynamic = 'force-dynamic';

// Shopify OAuth Başlatma
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get('shop');

  if (!shop) {
    return NextResponse.json({ error: 'Shop parameter is missing' }, { status: 400 });
  }

  const shopify = getShopifyApi();

  return await shopify.auth.begin({
    shop: shopify.utils.sanitizeShop(shop)!,
    callbackPath: '/api/auth/callback/shopify',
    isOnline: false,
    rawRequest: req,
    rawResponse: new Response(),
  });
}
