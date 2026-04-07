import { NextRequest, NextResponse } from 'next/server';
import { getShopifyApi } from '@/lib/shopify';
import { sessionStorage } from '@/lib/session-storage';
import { ShopifySyncService } from '@/lib/services/sync-service';
import prisma from '@/lib/db';

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

    // Arka planda ürün kataloğunu senkronize et
    const dbShop = await prisma.shopConnection.findFirst({
        where: { domain: session.shop }
    });

    if (dbShop) {
        const syncService = new ShopifySyncService();
        await syncService.syncCatalog(session, dbShop.id);
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?shop=${session.shop}`);
  } catch (error) {
    console.error('Shopify OAuth Callback Error:', error);
    return NextResponse.json({ error: 'OAuth Callback failed' }, { status: 500 });
  }
}
