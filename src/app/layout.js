import { auth } from '@/auth'
import Navbar from '@/components/layout/Navbar'
import Container from '@/components/layout/Container'
import './globals.css'

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        <Navbar session={session} />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  )
}
