import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req, { params }) {
  try {
    const { refundId } = params
    const body = await req.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Status is required" },
        { status: 400 }
      )
    }

    const refund = await prisma.refund.update({
      where: { id: refundId },
      data: {
        status,
        logs: {
          create: {
            action: "STATUS_UPDATED",
            actor: "OPERATOR"
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      refund
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update refund" },
      { status: 500 }
    )
  }
}
