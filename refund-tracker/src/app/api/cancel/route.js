import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const { ticketId, operator, platform, amount } = await req.json()

        if (!ticketId || !operator || !platform || !amount) {
            return NextResponse.json(
                { error: 'Missing fields' },
                { status: 400 }
            )
        }

        const refund = await prisma.refund.create({
            data: {
                ticketId,
                operator,
                platform,
                amount,
                status: 'INITIATED',
                logs: {
                    create: {
                        action: 'CREATED',
                        actor: 'SYSTEM'
                    }
                }
            }
        })

        return NextResponse.json({ refundId: refund.id })
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        )
    }
}
