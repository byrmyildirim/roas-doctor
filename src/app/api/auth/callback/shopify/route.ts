import { NextRequest, NextResponse } from 'next/server';
import { shopify } from '@/lib/shopify';
import { sessionStorage } from '@/lib/session-storage';
import prisma from '@/lib/db';

// Shopify OAuth Callback
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get('shop');

    if (!shop) {
      return NextResponse.json({ error: 'Shop parameter is missing' }, { status: 400 });
    }

    // Shopify'dan gelen veriyi işle ve Session oluştur
    const callbackResponse = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: new Response(), 
    });

    // Session'ı veritabanına kaydet
    const { session } = callbackResponse;
    const isStored = await sessionStorage.storeSession(session);

    if (!isStored) {
      return NextResponse.json({ error: 'Failed to store shop session' }, { status: 500 });
    }

    // Kurulum sonrası panele yönlendir
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
  } catch (error) {
    console.error('Shopify OAuth Callback Error:', error);
    return NextResponse.json({ error: 'OAuth Callback failed' }, { status: 500 });
  }
}
