"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CancelPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    ticketId: "",
    operator: "",
    platform: "",
    amount: ""
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/refund", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: form.ticketId,
        operator: form.operator,
        platform: form.platform,
        amount: Number(form.amount)
      })
    })

    const data = await res.json()
    setLoading(false)

    if (data.success) {
      router.push(`/track/${data.refundId}`)
    } else {
      alert("Failed to create refund")
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Cancel Ticket</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="ticketId"
          placeholder="Ticket ID"
          value={form.ticketId}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="operator"
          placeholder="Operator"
          value={form.operator}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="platform"
          placeholder="Platform"
          value={form.platform}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Cancel Ticket"}
        </button>
      </form>
    </div>
  )
}
