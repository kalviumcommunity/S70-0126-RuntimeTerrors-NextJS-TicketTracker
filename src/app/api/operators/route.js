import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const refunds = await prisma.refund.findMany({
            select: {
                id: true,
                operator: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        // 1. Calculate Summary Metrics
        const uniqueOperators = new Set(refunds.map(r => r.operator)).size;
        const totalRequests = refunds.length;
        const pendingRefunds = refunds.filter(r => ['INITIATED', 'APPROVED', 'PROCESSED'].includes(r.status)).length;

        // Calculate Global Average Refund Time (only for COMPLETED)
        const completedRefunds = refunds.filter(r => r.status === 'COMPLETED');
        const globalTotalTime = completedRefunds.reduce((acc, r) => {
            return acc + (new Date(r.updatedAt) - new Date(r.createdAt));
        }, 0);
        const globalAvgTimeMs = completedRefunds.length > 0 ? globalTotalTime / completedRefunds.length : 0;
        const globalAvgTimeHours = (globalAvgTimeMs / (1000 * 60 * 60)).toFixed(1);

        // 2. Calculate Per-Operator Metrics
        const operatorMap = {};

        refunds.forEach(r => {
            if (!operatorMap[r.operator]) {
                operatorMap[r.operator] = {
                    name: r.operator,
                    tickets: 0,
                    pending: 0,
                    completed: 0,
                    totalTime: 0
                };
            }
            const op = operatorMap[r.operator];
            op.tickets += 1;

            if (['INITIATED', 'APPROVED', 'PROCESSED'].includes(r.status)) {
                op.pending += 1;
            }

            if (r.status === 'COMPLETED') {
                op.completed += 1;
                op.totalTime += (new Date(r.updatedAt) - new Date(r.createdAt));
            }
        });

        const operatorData = Object.values(operatorMap).map(op => {
            const avgTimeMs = op.completed > 0 ? op.totalTime / op.completed : 0;
            const avgTimeHours = (avgTimeMs / (1000 * 60 * 60)).toFixed(1);
            const completionRate = op.tickets > 0 ? Math.round((op.completed / op.tickets) * 100) : 0;

            return {
                name: op.name,
                tickets: op.tickets,
                pending: op.pending,
                avgTime: `${avgTimeHours} hrs`,
                completionRate: completionRate
            };
        });

        // Sort by tickets handled (descending)
        operatorData.sort((a, b) => b.tickets - a.tickets);

        return NextResponse.json({
            summary: {
                totalOperators: uniqueOperators,
                totalRequests: totalRequests,
                avgTime: `${globalAvgTimeHours} hrs`,
                pendingRefunds: pendingRefunds
            },
            operators: operatorData
        });

    } catch (error) {
        console.error('Error fetching operator stats:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
