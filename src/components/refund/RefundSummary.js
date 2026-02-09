import RefundStatusBadge from './RefundStatusBadge'

export default function RefundSummary({ refund }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 40
        }}>
            <div>
                <h2>Tracking ID</h2>
                <h1>{refund.id}</h1>
                <p>{refund.operator} • {refund.platform}</p>
            </div>

            <div style={{ textAlign: 'right' }}>
                <RefundStatusBadge status={refund.status} />
                <h2 style={{ marginTop: 12 }}>₹{refund.amount}</h2>
            </div>
        </div>
    )
}
