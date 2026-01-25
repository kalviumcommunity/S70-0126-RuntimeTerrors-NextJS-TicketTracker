'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CancelPage() {
    const router = useRouter()
    const [ticketId, setTicketId] = useState('')
    const [operator, setOperator] = useState('')
    const [platform, setPlatform] = useState('')
    const [amount, setAmount] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        const res = await fetch('/api/refund', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ticketId,
                operator,
                platform,
                amount: Number(amount),
            }),
        })

        const data = await res.json()
        router.push(`/track/${data.id}`)
    }

    return (
        <div style={{ maxWidth: 500, margin: '40px auto' }}>
            <h2>Simulate Ticket Cancellation</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Ticket ID"
                    value={ticketId}
                    onChange={e => setTicketId(e.target.value)}
                />
                <input
                    placeholder="Operator"
                    value={operator}
                    onChange={e => setOperator(e.target.value)}
                />
                <input
                    placeholder="Platform"
                    value={platform}
                    onChange={e => setPlatform(e.target.value)}
                />
                <input
                    placeholder="Amount"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />

                <button type="submit">Initiate Refund</button>
            </form>
        </div>
    )
}
