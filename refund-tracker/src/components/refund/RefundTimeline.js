export default function RefundTimeline({ logs }) {
  return (
    <div>
      <h3 style={{ marginBottom: 20 }}>Refund Timeline</h3>

      <ul style={{
        listStyle: 'none',
        paddingLeft: 0,
        borderLeft: '2px solid #e5e7eb'
      }}>
        {logs.map(log => (
          <li key={log.id} style={{
            position: 'relative',
            paddingLeft: 24,
            marginBottom: 24
          }}>
            <span style={{
              position: 'absolute',
              left: -6,
              top: 4,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#2563eb'
            }} />

            <strong>{log.action}</strong>
            <div style={{ fontSize: 12, color: '#555' }}>
              {log.actor} • {new Date(log.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
