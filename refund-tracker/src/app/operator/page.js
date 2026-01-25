"use client"

import { useState } from "react"

export default function OperatorPage() {
    const [refundId, setRefundId] = useState("")
    const [status, setStatus] = useState("APPROVED")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("Updating...")

        const res = await fetch(`/api/refund/${refundId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        })

        const data = await res.json()

        if (data.success) {
            setMessage("Status updated successfully")
        } else {
            setMessage("Failed to update status")
        }
    }

    return (
        <div style={{ padding: 40 }}>
            <h2>Operator Dashboard</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Refund ID"
                    value={refundId}
                    onChange={(e) => setRefundId(e.target.value)}
                    required
                />
                <br /><br />

                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="APPROVED">APPROVED</option>
                    <option value="PROCESSED">PROCESSED</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
                <br /><br />

                <button type="submit">Update Status</button>
            </form>

            <p>{message}</p>
        </div>
    )
}
