import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  try {
    const body = await req.json()
    const { ticketId, operator, platform, amount } = body

    if (!ticketId || !operator || !platform || !amount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      )
    }

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
