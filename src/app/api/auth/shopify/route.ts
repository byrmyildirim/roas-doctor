import { NextRequest, NextResponse } from 'next/server';
import { shopify } from '@/lib/shopify';

// Shopify OAuth Başlatma
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get('shop');

  if (!shop) {
    return NextResponse.json({ error: 'Shop parameter is missing' }, { status: 400 });
  }

  // Shopify'a yönlendirme (İzin İsteme Ekranı)
  return await shopify.auth.begin({
    shop: shopify.utils.sanitizeShop(shop)!,
    callbackPath: '/api/auth/callback/shopify',
    isOnline: false,
    rawRequest: req,
    rawResponse: new Response(), // Not strictly needed for begin in some adapters but safe to pass
  });
}
