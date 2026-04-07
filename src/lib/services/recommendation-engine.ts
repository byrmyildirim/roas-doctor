import prisma from '@/lib/db';
import { Severity } from '@prisma/client';

export interface Recommendation {
    title: string;
    diagnosis: string;
    recommendation: string;
    severity: Severity;
    effort: 'Low' | 'Medium' | 'High';
    confidence: number;
    impact: string;
}

export class RecommendationEngine {
    constructor() {}

    async getPrioritizedActions(organizationId: string): Promise<Recommendation[]> {
        const findings = await prisma.finding.findMany({
            where: {
                auditResult: {
                    auditRun: {
                        organizationId: organizationId
                    }
                }
            },
            orderBy: {
                severity: 'desc'
            },
            take: 5
        });

        return findings.map((f: any) => ({
            title: f.title,
            diagnosis: f.description,
            recommendation: f.recommendation,
            severity: f.severity,
            effort: 'Low', // Heuristic in phase 4
            confidence: 90,
            impact: f.severity === 'CRITICAL' ? 'High potential recovery from wasted spend.' : 'Medium improvement to CRO.'
        }));
    }
}
