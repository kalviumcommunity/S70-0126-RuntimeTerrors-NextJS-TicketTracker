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
    <div style={{ padding: 40 }}>
      <h2>Refund Tracking</h2>

      <p><strong>Refund ID:</strong> {refund.id}</p>
      <p><strong>Status:</strong> {refund.status}</p>
      <p><strong>Amount:</strong> ₹{refund.amount}</p>
      <p><strong>Operator:</strong> {refund.operator}</p>
      <p><strong>Platform:</strong> {refund.platform}</p>

      <h3>Timeline</h3>
      <ul>
        {refund.logs.map(log => (
          <li key={log.id}>
            [{new Date(log.createdAt).toLocaleString()}] {log.actor} — {log.action}
          </li>
        ))}
      </ul>
    </div>
  )
}
