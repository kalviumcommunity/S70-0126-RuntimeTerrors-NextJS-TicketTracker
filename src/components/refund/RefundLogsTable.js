export default function RefundLogsTable({ logs }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3>Activity Logs</h3>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: 12
      }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
            <th>Date</th>
            <th>Action</th>
            <th>Actor</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
              <td>{log.action}</td>
              <td>{log.actor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
