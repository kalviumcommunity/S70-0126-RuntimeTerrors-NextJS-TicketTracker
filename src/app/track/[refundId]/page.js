import RefundSummary from '@/components/refund/RefundSummary'
import RefundTimeline from '@/components/refund/RefundTimeline'
import { prisma } from "@/lib/prisma"

export default async function TrackPage({ params }) {
  const { refundId } = params

  const refund = await prisma.refund.findUnique({
    where: { id: refundId },
    include: { logs: { orderBy: { createdAt: "asc" } } }
  })

  if (!refund) {
    return <div style={{ padding: 40 }}>Refund not found</div>
  }

 return (
  <div style={{ maxWidth: 900, margin: '0 auto' }}>
    <RefundSummary refund={refund} />

    <div style={{
      border: '1px solid #eee',
      borderRadius: 12,
      padding: 24,
      marginBottom: 40
    }}>
      <RefundTimeline logs={refund.logs} />
    </div>
  </div>
)
}
