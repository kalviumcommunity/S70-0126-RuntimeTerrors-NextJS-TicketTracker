import SearchBar from './SearchBar'

export default function HeroSection() {
    return (
        <section style={{ textAlign: 'center', marginTop: 40 }}>
            <span style={{
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: 999,
                background: '#e8f5e9',
                color: '#2e7d32',
                fontSize: 12,
                marginBottom: 16
            }}>
                VERIFIED ACCOUNTABILITY PLATFORM
            </span>

            <h1 style={{ fontSize: 44, margin: '20px 0' }}>
                Intercity Bus Refund Tracking
            </h1>

            <p style={{ fontSize: 18, color: '#555', maxWidth: 600, margin: '0 auto 40px' }}>
                A developer-friendly transparency platform to track, verify,
                and simulate bus ticket refunds in real-time.
            </p>

            <SearchBar />
        </section>
    )
}
