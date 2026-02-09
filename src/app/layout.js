import Navbar from '@/components/layout/Navbar'
import Container from '@/components/layout/Container'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  )
}
