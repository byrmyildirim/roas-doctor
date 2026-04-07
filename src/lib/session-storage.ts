import { Session } from '@shopify/shopify-api';
import prisma from '@/lib/db';

// Shopify Sessions'ı Veritabanında (Prisma) Saklama
export class PrismaSessionStorage {
  async storeSession(session: Session): Promise<boolean> {
    try {
      // Önce Organization veya ShopConnection var mı kontrol edebiliriz
      // Phase 2: Basit saklama (Access Token ve Shop Bilgisi)
      await prisma.shopConnection.upsert({
        where: { domain: session.shop },
        update: {
          accessToken: session.accessToken!,
          shopId: session.id, // Veya gerçek Shopify Shop ID
          status: 'CONNECTED',
        },
        create: {
          domain: session.shop,
          accessToken: session.accessToken!,
          shopId: session.id,
          organizationId: 'default_org_id', // Onboarding akışında organizasyon oluşturulacak
        },
      });
      return true;
    } catch (error) {
      console.error('Session storage error:', error);
      return false;
    }
  }

  async loadSession(id: string): Promise<Session | undefined> {
    const dbSession = await prisma.shopConnection.findFirst({
        where: { shopId: id }
    });

    if (!dbSession) return undefined;

    const session = new Session({
        id: dbSession.shopId!,
        shop: dbSession.domain,
        state: 'temp_state',
        isOnline: false,
        accessToken: dbSession.accessToken,
    });
    
    return session;
  }

  async deleteSession(id: string): Promise<boolean> {
    await prisma.shopConnection.deleteMany({
      where: { shopId: id }
    });
    return true;
  }
}

export const sessionStorage = new PrismaSessionStorage();
