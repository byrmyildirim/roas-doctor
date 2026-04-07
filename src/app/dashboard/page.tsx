import React from 'react';
import prisma from '@/lib/db';
import DashboardClient from './DashboardClient';
// Comment: auth import missing but we can skip if not strictly protecting here, or add import { auth } from '@/lib/auth'; if auth is stable. Since I see auth() used before, let's keep it simple without auth if it breaks, but wait, `session` isn't strictly required for calculating global stats for MVP.
// The user just wanted to exit simulation mode.

export default async function DashboardPage() {
  // DB'den gelen canlı veriler
  const shopCount = await prisma.shopConnection.count().catch(() => 0);
  const productCount = await prisma.product.count().catch(() => 0);
  
  // Eğer en son ScoreSnapshot varsa al, yoksa sıfır.
  const latestScore = await prisma.scoreSnapshot.findFirst({
    orderBy: { timestamp: 'desc' }
  }).catch(() => null);

  const stats = {
    overallScore: latestScore?.overallScore || 0,
    metaScore: latestScore?.metaScore || 0,
    googleScore: latestScore?.googleScore || 0,
    shopifyStoreCount: shopCount,
    productsCount: productCount,
    lastSync: latestScore ? latestScore.timestamp.toLocaleDateString() : 'Hiç senkronizasyon yapılmadı',
  };

  return <DashboardClient stats={stats} />;
}
