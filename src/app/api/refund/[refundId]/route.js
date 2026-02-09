export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { updateRefundStatusSchema } from '@/lib/validators/refund'
export const revalidate = 0

export async function PATCH(req, { params }) {
  try {
    const body = await req.json()

const parsed = updateRefundStatusSchema.safeParse(body)

if (!parsed.success) {
  return NextResponse.json(
    { error: parsed.error.flatten() },
    { status: 400 }
  )
}

const { status } = parsed.data


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
