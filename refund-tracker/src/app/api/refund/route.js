import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createRefundSchema } from '@/lib/validators/refund'

export async function POST(req) {
  try {
   const body = await req.json()

const parsed = createRefundSchema.safeParse(body)

if (!parsed.success) {
  return NextResponse.json(
    { error: parsed.error.flatten() },
    { status: 400 }
  )
}

const { ticketId, operator, platform, amount } = parsed.data


    const refund = await prisma.refund.create({
      data: {
        ticketId,
        operator,
        platform,
        amount,
        status: "INITIATED",
        logs: {
          create: {
            action: "CREATED",
            actor: "USER"
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      refundId: refund.id
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create refund" },
      { status: 500 }
    )
  }
}
