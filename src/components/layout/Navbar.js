'use client'

import Link from 'next/link'

export default function Navbar() {
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
        <Link href="/">Documentation</Link>
        <Link href="/operator">Operators</Link>
        <Link href="/status">Status</Link>
      </div>

      <button style={{
        padding: '8px 14px',
        borderRadius: 6,
        border: 'none',
        background: '#111',
        color: '#fff'
      }}>
        Sign In
      </button>
    </nav>
  )
}
