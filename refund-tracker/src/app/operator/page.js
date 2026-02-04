export const dynamic = 'force-dynamic'
export const revalidate = 0

import RefundTable from '@/components/operator/RefundTable'
import { prisma } from '@/lib/prisma'

export default async function OperatorPage() {
  const refunds = await prisma.refund.findMany({
    orderBy: { createdAt: 'desc' }
  })

  async function processRefund(id) {
    'use server'

    const refund = await prisma.refund.findUnique({
      where: { id }
    })

    if (!refund || refund.status === 'COMPLETED') {
      return
    }

    await prisma.refund.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        logs: {
          create: {
            action: 'COMPLETED',
            actor: 'OPERATOR'
          }
        }
      }
    })
  }

  const pending = refunds.filter(r => r.status !== 'COMPLETED')

  return (
    <div>
      <h1>Refund Management</h1>
      <p style={{ color: '#555' }}>
        Track and process customer refund requests
      </p>

      <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
        <StatCard label="Total Pending" value={pending.length} />
        <StatCard label="Completed" value={refunds.length - pending.length} />
      </div>

      <RefundTable refunds={refunds} onProcess={processRefund} />
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div style={{
      border: '1px solid #eee',
      borderRadius: 12,
      padding: 20,
      minWidth: 160
    }}>
      <div style={{ fontSize: 12, color: '#555' }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  )
}
