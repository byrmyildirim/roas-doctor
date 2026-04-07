import prisma from '@/lib/db';
import { getShopifyClient, GET_PRODUCTS_QUERY } from '@/lib/shopify';
import { Session } from '@shopify/shopify-api';

export class ShopifySyncService {
  async syncCatalog(session: Session, shopConnectionId: string) {
    try {
      const client = await getShopifyClient(session);
      
      // Shopify'dan ürünleri çek (GraphQL)
      const response: any = await client.request(GET_PRODUCTS_QUERY, {
        variables: { first: 50 }
      });

      const productEdges = response.data.products.edges;

      // Verileri Prisma'ya kaydet
      for (const edge of productEdges) {
        const node = edge.node;
        
        await prisma.product.upsert({
          where: { id: node.id },
          update: {
            title: node.title,
            handle: node.handle,
            description: node.descriptionHtml,
            imageUrl: node.images.edges[0]?.node?.url || '',
          },
          create: {
            id: node.id,
            title: node.title,
            handle: node.handle,
            description: node.descriptionHtml,
            imageUrl: node.images.edges[0]?.node?.url || '',
            shopConnectionId: shopConnectionId,
          }
        });
      }

      // Senkronizasyon tarihini güncelle
      await prisma.shopConnection.update({
        where: { id: shopConnectionId },
        data: { lastSyncAt: new Date() }
      });

      return { success: true, count: productEdges.length };
    } catch (error) {
      console.error('Shopify Sync Error:', error);
      return { success: false, error };
    }
  }
}
