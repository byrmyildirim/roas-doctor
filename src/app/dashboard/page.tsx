import React from 'react';
import prisma from '@/lib/db';
import DashboardClient from './DashboardClient';
import { AuditEngine } from '@/lib/services/audit-engine';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ shop?: string }> }) {
  const { shop } = await searchParams;
  const auditEngine = new AuditEngine();
  
  // Mağaza bağlantısını bul
  const shopConnection = shop ? await prisma.shopConnection.findUnique({
    where: { domain: shop }
  }) : null;

  // DB'den gelen canlı veriler
  const shopCount = await prisma.shopConnection.count().catch(() => 0);
  
  // Ürün sayısı - Belirli mağazaya göre filtreleme
  const productCount = await prisma.product.count({
    where: shop ? { shopConnection: { domain: shop } } : {}
  }).catch(() => 0);
  
  // Eğer shopConnection varsa ve daha önce hiç snapshot yoksa bir tane oluştur (İlk Analiz)
  let latestScore = await prisma.scoreSnapshot.findFirst({
    where: shop ? { organizationId: shopConnection?.organizationId } : {},
    orderBy: { timestamp: 'desc' }
  }).catch(() => null);

  if (!latestScore && shopConnection && productCount > 0) {
    // İlk analiz için tetikle
    latestScore = await auditEngine.runGlobalAudit(shopConnection.organizationId);
  }

  const stats = {
    overallScore: latestScore?.overallScore || 0,
    metaScore: latestScore?.metaScore || 0,
    googleScore: latestScore?.googleScore || 0,
    shopifyStoreCount: shopCount,
    productsCount: productCount,
    lastSync: latestScore ? latestScore.timestamp.toLocaleTimeString() : 'Henüz senkronizasyon tamamlanmadı.',
  };

  return <DashboardClient stats={stats} />;
}
