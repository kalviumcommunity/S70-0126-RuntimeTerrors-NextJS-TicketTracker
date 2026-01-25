'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
    const [value, setValue] = useState('')
    const router = useRouter()

    function handleTrack() {
        if (!value.trim()) return
        router.push(`/track/${value}`)
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 20
        }}>
            <input
                placeholder="Enter PNR or Ticket Number"
                value={value}
                onChange={e => setValue(e.target.value)}
                style={{
                    width: 320,
                    padding: '12px 14px',
                    borderRadius: 6,
                    border: '1px solid #ccc'
                }}
            />

            <button
                onClick={handleTrack}
                style={{
                    padding: '12px 18px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#2563eb',
                    color: '#fff'
                }}
            >
                Track Refund
            </button>
        </div>
    )
}
