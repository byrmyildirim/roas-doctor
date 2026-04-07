import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const hmac = req.headers.get('x-shopify-hmac-sha256');
    const topic = req.headers.get('x-shopify-topic');
    const shopDomain = req.headers.get('x-shopify-shop-domain');

    // HMAC Doğrulama (Gelen mesajın gerçekten Shopify'dan geldiğini garanti eder)
    const generatedHash = crypto
      .createHmac('sha256', process.env.SHOPIFY_CLIENT_SECRET!)
      .update(rawBody, 'utf8')
      .digest('base64');

    if (generatedHash !== hmac) {
      return NextResponse.json({ error: 'Unauthorized HMAC mismatch' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Gelen Webhook Tipine Göre İşlem Yap (Buraları genişleteceğiz)
    switch (topic) {
        case 'products/update':
            // Ürün güncelleme mantığı
            await prisma.product.update({
                where: { id: `gid://shopify/Product/${payload.id}` },
                data: {
                    title: payload.title,
                    handle: payload.handle,
                    description: payload.body_html,
                    imageUrl: payload.image?.src || '',
                }
            });
            break;
        case 'app/uninstalled':
            // Uygulama silinme mantığı
            await prisma.shopConnection.update({
                where: { domain: shopDomain! },
                data: { status: 'DISCONNECTED' }
            });
            break;
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
