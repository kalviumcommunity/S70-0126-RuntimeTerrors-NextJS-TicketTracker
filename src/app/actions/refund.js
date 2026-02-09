'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function createRefund(prevState, formData) {
    const session = await auth();
    if (!session || !session.user) {
        return { error: 'You must be logged in to request a refund' };
    }

    const ticketId = formData.get('ticketId');
    const operator = formData.get('operator');
    const reason = formData.get('reason');
    const amount = parseFloat(formData.get('amount') || 0);

    if (!ticketId || !operator || !reason) {
        return { error: 'Missing required fields' };
    }

    try {
        const refund = await prisma.refund.create({
            data: {
                ticketId,
                operator,
                platform: 'RED_BUS', // Hardcoded for now, or dynamic if needed
                amount,
                reason,
                userId: session.user.id,
                logs: {
                    create: {
                        action: 'CREATED',
                        actor: 'USER'
                    }
                }
            }
        });

        return { success: true, refundId: refund.id };
    } catch (error) {
        console.error('Failed to create refund:', error);
        return { error: 'Failed to create refund request' };
    }
}
