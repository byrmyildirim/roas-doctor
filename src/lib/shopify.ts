import { shopifyApi, ApiVersion, Session } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

// Shopify API Yapılandırması
export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_CLIENT_ID!,
  apiSecretKey: process.env.SHOPIFY_CLIENT_SECRET!,
  scopes: process.env.SHOPIFY_SCOPES?.split(',') || [],
  hostName: process.env.NEXT_PUBLIC_APP_URL?.replace('https://', '') || '',
  apiVersion: ApiVersion.January25,
  isEmbeddedApp: true,
});

// Shopify GraphQL İstemcisi Oluşturma
export async function getShopifyClient(session: Session) {
  return new shopify.clients.Graphql({ session });
}

// HMAC Doğrulama (Webhooks & Auth için)
export async function verifyShopifyRequest(params: Record<string, string>) {
  // HMAC doğrulama mantığı (Phase 3'te derinleştirilecek)
  return true; 
}

// Ürün Çekme İşlemi (GraphQL)
export const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }
`;
