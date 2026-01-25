'use client'

export default function RefundTable({ refunds, onProcess }) {
    return (
        <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: 20
        }}>
            <thead>
                <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                    <th>Refund ID</th>
                    <th>Ticket</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {refunds.map(refund => (
                    <tr key={refund.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td>{refund.id.slice(0, 8)}</td>
                        <td>{refund.ticketId}</td>
                        <td>₹{refund.amount}</td>
                        <td>
                            <span style={{
                                padding: '4px 10px',
                                borderRadius: 999,
                                background: refund.status === 'INITIATED' ? '#fef3c7' : '#dcfce7',
                                color: '#111',
                                fontSize: 12
                            }}>
                                {refund.status}
                            </span>
                        </td>
                        <td>
                            {refund.status !== 'COMPLETED' && (
                                <button
                                    onClick={() => onProcess(refund.id)}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: 6,
                                        border: 'none',
                                        background: '#2563eb',
                                        color: '#fff'
                                    }}
                                >
                                    Process Refund
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
