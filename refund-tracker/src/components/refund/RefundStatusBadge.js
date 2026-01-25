export default function RefundStatusBadge({ status }) {
    const colors = {
        INITIATED: '#9ca3af',
        APPROVED: '#2563eb',
        COMPLETED: '#16a34a'
    }

    return (
        <span style={{
            padding: '6px 12px',
            borderRadius: 999,
            background: colors[status] || '#e5e7eb',
            color: '#fff',
            fontSize: 12
        }}>
            {status}
        </span>
    )
}
