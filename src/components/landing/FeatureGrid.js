export default function FeatureGrid() {
    const features = [
        {
            title: 'Direct API Access',
            desc: 'Connect directly to operator backends for verified refund data.'
        },
        {
            title: 'Policy History',
            desc: 'Snapshot operator refund rules to prevent silent changes.'
        },
        {
            title: 'Audit Logs',
            desc: 'Cryptographically verifiable refund timelines.'
        },
        {
            title: 'Instant Webhooks',
            desc: 'Real-time notifications on refund state changes.'
        }
    ]

    return (
        <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            marginTop: 80
        }}>
            {features.map(f => (
                <div key={f.title} style={{
                    padding: 24,
                    border: '1px solid #eee',
                    borderRadius: 12
                }}>
                    <h3>{f.title}</h3>
                    <p style={{ color: '#555' }}>{f.desc}</p>
                </div>
            ))}
        </section>
    )
}
