'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CancelForm() {
    const router = useRouter()

    const [ticketId, setTicketId] = useState('')
    const [operator, setOperator] = useState('')
    const [reason, setReason] = useState('')
    const [amount, setAmount] = useState(500)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit() {
        if (!ticketId || !operator || !reason) return

        setLoading(true)
        setError('')

        const res = await fetch('/api/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ticketId,
                operator,
                platform: 'RED_BUS',
                amount,
                reason
            })
        })

        let data
        try {
            data = await res.json()
        } catch {
            setLoading(false)
            setError('Server returned an invalid response')
            return
        }

        setLoading(false)

        if (!res.ok) {
            setError(data.error || 'Cancellation failed')
            return
        }

        if (data.refundId) {
            router.push(`/track/${data.refundId}`)
        }
    }

    return (
        <div style={{
            maxWidth: 520,
            margin: '0 auto',
            border: '1px solid #eee',
            borderRadius: 12,
            padding: 32
        }}>
            <h2 style={{ marginBottom: 8 }}>Simulate Ticket Cancellation</h2>
            <p style={{ color: '#555', marginBottom: 20 }}>
                Submit a test cancellation to see the accountability flow in action.
            </p>

            <div style={{
                background: '#eff6ff',
                padding: 12,
                borderRadius: 6,
                fontSize: 13,
                marginBottom: 24
            }}>
                This is a simulation environment. No real tickets or payments involved.
            </div>

            <label>Ticket ID</label>
            <input
                value={ticketId}
                onChange={e => setTicketId(e.target.value)}
                placeholder="e.g. TKT-778899"
                style={inputStyle}
            />

            <label>Operator</label>
            <select
                value={operator}
                onChange={e => setOperator(e.target.value)}
                style={inputStyle}
            >
                <option value="">Select bus operator</option>
                <option value="KSRTC">KSRTC</option>
                <option value="APSRTC">APSRTC</option>
                <option value="Private">Private Operator</option>
            </select>

            <label>Reason</label>
            <select
                value={reason}
                onChange={e => setReason(e.target.value)}
                style={inputStyle}
            >
                <option value="">Select a reason</option>
                <option value="USER_CANCEL">User Cancelled</option>
                <option value="DELAY">Bus Delayed</option>
                <option value="OPERATOR_CANCEL">Operator Cancelled</option>
            </select>

            {error && (
                <p style={{ color: 'red', marginTop: 8 }}>{error}</p>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                    marginTop: 20,
                    width: '100%',
                    padding: 14,
                    borderRadius: 8,
                    border: 'none',
                    background: '#2563eb',
                    color: '#fff',
                    fontSize: 16
                }}
            >
                {loading ? 'Processing...' : 'Initiate Simulation →'}
            </button>
        </div>
    )
}

const inputStyle = {
    width: '100%',
    padding: 12,
    marginTop: 6,
    marginBottom: 16,
    borderRadius: 6,
    border: '1px solid #ccc'
}
