import { shopifyApi, ApiVersion, Session } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

// Lazy initialization - build sırasında çalışmaz, sadece runtime'da
let _shopify: ReturnType<typeof shopifyApi> | null = null;

export function getShopifyApi() {
  if (!_shopify) {
    _shopify = shopifyApi({
      apiKey: process.env.SHOPIFY_CLIENT_ID!,
      apiSecretKey: process.env.SHOPIFY_CLIENT_SECRET!,
      scopes: process.env.SHOPIFY_SCOPES?.split(',') || [],
      hostName: process.env.NEXT_PUBLIC_APP_URL?.replace('https://', '') || '',
      apiVersion: ApiVersion.January25,
      isEmbeddedApp: true,
    });
  }
  return _shopify;
}

// Shopify GraphQL İstemcisi Oluşturma
export async function getShopifyClient(session: Session) {
  const shopify = getShopifyApi();
  return new shopify.clients.Graphql({ session });
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
