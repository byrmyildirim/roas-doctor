import prisma from '@/lib/db';
import { Severity } from '@prisma/client';

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
            severity: 'CRITICAL',
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
            severity: 'MEDIUM',
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
