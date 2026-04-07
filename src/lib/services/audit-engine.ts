import prisma from '@/lib/db';
import { Severity, Product } from '@prisma/client';

export interface AuditInput {
  adHeadline: string;
  adBody: string;
  landingPageUrl: string;
  pageHeadline: string;
  pageContent: string;
  hasCta: boolean;
  hasSocialProof: boolean;
}

export class AuditEngine {
  constructor() {}

  async runAudit(input: AuditInput) {
    const scores = {
      promiseAlignment: 0,
      visualClarity: 0,
      ctaStrength: 0,
    };

    const findings: any[] = [];

    // Semantic Heuristics
    // 1. Hook Match (Promise Alignment)
    if (input.pageHeadline.toLowerCase().includes(input.adHeadline.toLowerCase())) {
        scores.promiseAlignment = 95;
    } else {
        scores.promiseAlignment = 45;
        findings.push({
            title: 'Promise Mismatch: Headline Divergence',
            description: `The ad hook "${input.adHeadline}" is not reflected in the page headline "${input.pageHeadline}".`,
            severity: Severity.CRITICAL,
            recommendation: 'Update landing page headline to match ad hook exactly to reduce bounce rate.'
        });
    }

    // 2. Trust Elements
    if (input.hasSocialProof) {
        scores.visualClarity += 40;
    } else {
        findings.push({
            title: 'Trust Gap: Missing Social Proof',
            description: 'No reviews or social proof detected near the primary call to action.',
            severity: Severity.MEDIUM,
            recommendation: 'Inject customer testimonials or 5-star ratings above the fold.'
        });
    }

    // Average Score
    const overallScore = (scores.promiseAlignment + scores.visualClarity + (input.hasCta ? 100 : 0)) / 3;

    return {
        overallScore,
        findings
    };
  }

  async runGlobalAudit(organizationId: string) {
    const products = await prisma.product.findMany({
      where: { shopConnection: { organizationId: organizationId } }
    });

    // Real-ish calculation based on data presence
    const productCount = products.length;
    const hasDescriptions = products.filter((p: Product) => p.description && (p.description?.length ?? 0) > 50).length;
    const hasImages = products.filter((p: Product) => p.imageUrl).length;

    // Calculation logic
    const shopifyScore = productCount > 0 ? (hasDescriptions / productCount) * 100 : 0;
    const metaScore = 85; // Placeholder until real Meta sync
    const googleScore = 78; // Placeholder until real Google sync
    const overallScore = (shopifyScore + metaScore + googleScore) / 3;

    // Create a snapshot
    const snapshot = await prisma.scoreSnapshot.create({
      data: {
        organizationId,
        overallScore: Math.round(overallScore),
        metaScore,
        googleScore,
        shopifyScore: Math.round(shopifyScore)
      }
    });

    return snapshot;
  }

  async persistAuditResult(organizationId: string, matchId: string, result: any) {
    // Logic to save to database using prisma
    return await prisma.auditResult.create({
      data: {
        matchId,
        auditRunId: 'temp_run_id', // Would be passed in
        score: result.overallScore,
        findings: {
          create: result.findings.map((f: any) => ({
            title: f.title,
            description: f.description,
            severity: f.severity,
            recommendation: f.recommendation
          }))
        }
      }
    });
  }
}
