import { NextRequest, NextResponse } from 'next/server';
import { sessionStorage } from '@/lib/session-storage';
import { ShopifySyncService } from '@/lib/services/sync-service';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get('shop');

    if (!shop) {
      return NextResponse.json({ error: 'Shop parameter is missing' }, { status: 400 });
    }

    // DB'den shop connection bul
    const dbShop = await prisma.shopConnection.findUnique({
      where: { domain: shop }
    });

    if (!dbShop || !dbShop.shopId) {
      return NextResponse.json({ error: 'Shop connection not found in database' }, { status: 404 });
    }

    // Session yükle
    const session = await sessionStorage.loadSession(dbShop.shopId);

    if (!session) {
      return NextResponse.json({ error: 'Active session not found' }, { status: 401 });
    }

    // Senkronizasyonu başlat
    const syncService = new ShopifySyncService();
    const result = await syncService.syncCatalog(session, dbShop.id);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Shopify Sync API Error:', error);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
