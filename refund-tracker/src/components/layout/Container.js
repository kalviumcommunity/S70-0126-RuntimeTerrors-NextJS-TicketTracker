export default function Container({ children }) {
    return (
        <main style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '40px 24px'
        }}>
            {children}
        </main>
    )
}
