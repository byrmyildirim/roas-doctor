import React from 'react';
import prisma from '@/lib/db';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ shop?: string }> }) {
  const { shop } = await searchParams;
  
  // DB'den gelen canlı veriler
  // Eğer shop varsa ona göre filtreliyoruz
  const shopCount = await prisma.shopConnection.count().catch(() => 0);
  
  // Ürün sayısı - Belirli mağazaya göre filtreleme
  const productCount = await prisma.product.count({
    where: shop ? { shopConnection: { domain: shop } } : {}
  }).catch(() => 0);
  
  // En son skor snapshotu
  const latestScore = await prisma.scoreSnapshot.findFirst({
    where: shop ? { organization: { shops: { some: { domain: shop } } } } : {},
    orderBy: { timestamp: 'desc' }
  }).catch(() => null);

  const stats = {
    overallScore: latestScore?.overallScore || 0,
    metaScore: latestScore?.metaScore || 0,
    googleScore: latestScore?.googleScore || 0,
    shopifyStoreCount: shopCount,
    productsCount: productCount,
    lastSync: latestScore ? latestScore.timestamp.toLocaleTimeString() : 'Bekleniyor...',
  };

  return <DashboardClient stats={stats} />;
}
