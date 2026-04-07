import prisma from '@/lib/db';

export class MatchEngine {
  constructor() {}

  normalizeUrl(rawUrl: string): string {
    const url = new URL(rawUrl);
    // Remove UTM params
    url.searchParams.delete('utm_source');
    url.searchParams.delete('utm_medium');
    url.searchParams.delete('utm_campaign');
    url.searchParams.delete('utm_content');
    url.searchParams.delete('utm_term');
    url.searchParams.delete('fbclid');
    url.searchParams.delete('gclid');
    
    // Remove trailing slash
    return url.origin + url.pathname.replace(/\/$/, "");
  }

  async findProductByUrl(domain: string, url: string) {
    const normalized = this.normalizeUrl(url);
    const handle = normalized.split('/').pop();

    if (!handle) return null;

    // Search in DB
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { handle: handle },
          { handle: handle.replace('-', '_') }
        ]
      }
    });

    return product;
  }

  async createMatch(adId: string, provider: 'META' | 'GOOGLE', landingUrl: string, productId?: string) {
    return await prisma.adToPageMatch.create({
      data: {
        metaAdId: provider === 'META' ? adId : undefined,
        googleAdId: provider === 'GOOGLE' ? adId : undefined,
        productId: productId,
        landingUrl: landingUrl,
        confidenceScore: productId ? 100 : 0,
        matchRationale: productId ? 'Exact handle match in Shopify catalog.' : 'No direct product match found for URL.'
      }
    });
  }
}
