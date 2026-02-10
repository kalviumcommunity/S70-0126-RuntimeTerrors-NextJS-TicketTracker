import { prisma } from '@/lib/prisma'

export default async function TrackPage({ params }) {
    const refund = await prisma.refund.findUnique({
        where: { id: params.refundId },
        include: {
            logs: {
                orderBy: { createdAt: 'asc' }
            }
        }
    })

    if (!refund) {
        return (
            <div style={{ padding: 40 }}>
                <h2>Refund not found</h2>
                <p>Please check your Refund ID.</p>
            </div>
        )
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Refund Status</h1>

            <p><b>Ticket:</b> {refund.ticketId}</p>
            <p><b>Amount:</b> ₹{refund.amount}</p>
            <p><b>Status:</b> {refund.status}</p>

            <h3>Timeline</h3>
            <ul>
                {refund.logs.map(log => (
                    <li key={log.id}>
                        {log.action} by {log.actor} —{' '}
                        {new Date(log.createdAt).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    )
}
