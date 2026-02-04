'use client'

export default function RefundTable({ refunds, onProcess }) {
    return (
        <table style={{ width: '100%', marginTop: 20 }}>
            <thead>
                <tr>
                    <th>Refund ID</th>
                    <th>Ticket</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {refunds.map(refund => (
                    <tr key={refund.id}>
                        <td>
                            <a
                                href={`/track/${refund.id}`}
                                style={{ color: '#2563eb', textDecoration: 'underline' }}
                            >
                                {refund.id.slice(0, 8)}
                            </a>
                        </td>
                        <td>{refund.ticketId}</td>
                        <td>₹{refund.amount}</td>
                        <td>{refund.status}</td>
                        <td>
                            {refund.status !== 'COMPLETED' && (
                                <form action={onProcess.bind(null, refund.id)}>
                                    <button type="submit">Process Refund</button>
                                </form>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
