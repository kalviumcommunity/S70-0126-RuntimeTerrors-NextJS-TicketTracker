import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const refunds = await prisma.refund.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return Response.json(refunds)
  } catch (e) {
    console.error(e)
    return Response.json(
      { error: 'Failed to fetch refunds' },
      { status: 500 }
    )
  }
}
