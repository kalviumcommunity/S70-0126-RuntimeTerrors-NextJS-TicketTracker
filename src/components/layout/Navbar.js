'use client'

import Link from 'next/link'
import { handleSignOut } from '@/app/actions/auth'

export default function Navbar({ session }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 32px',
      borderBottom: '1px solid #eee'
    }}>
      <div style={{ fontWeight: 700 }}>
        RefundClear
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {!session?.user && (
          <>
            <Link href="/">Documentation</Link>
            <Link href="/status">Status</Link>
          </>
        )}
        {session?.user?.role === 'OPERATOR' && (
          <>
            <Link href="/operator">Operator Dashboard</Link>
          </>
        )}
        {session?.user?.role === 'USER' && (
          <>
            <Link href="/dashboard">My Tickets</Link>
            <Link href="/cancel">Raise Ticket</Link>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {session?.user ? (
          <>
            <span style={{ fontSize: '0.9rem' }}>{session.user.email}</span>
            <form action={handleSignOut}>
              <button style={{
                padding: '8px 14px',
                borderRadius: 6,
                border: 'none',
                background: '#333',
                color: '#fff',
                cursor: 'pointer'
              }}>
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/operator/login">
              <button style={{
                padding: '8px 14px',
                borderRadius: 6,
                border: '1px solid #333',
                background: 'transparent',
                color: '#333',
                cursor: 'pointer'
              }}>
                Operator Login
              </button>
            </Link>
            <Link href="/login">
              <button style={{
                padding: '8px 14px',
                borderRadius: 6,
                border: 'none',
                background: '#111',
                color: '#fff',
                cursor: 'pointer'
              }}>
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
