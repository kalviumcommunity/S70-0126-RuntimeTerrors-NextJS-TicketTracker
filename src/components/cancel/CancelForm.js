'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { createRefund } from '@/app/actions/refund'

export default function CancelForm() {
    const router = useRouter()
    const [state, formAction] = useFormState(createRefund, { error: null, success: false })

    // Redirect on success
    if (state?.success && state?.refundId) {
        router.push(`/track/${state.refundId}`)
    }

    return (
        <div style={{
            maxWidth: 520,
            margin: '0 auto',
            border: '1px solid #eee',
            borderRadius: 12,
            padding: 32
        }}>
            <h2 style={{ marginBottom: 8 }}>Raise New Ticket</h2>
            <p style={{ color: '#555', marginBottom: 20 }}>
                Submit a ticket to track the refund status or report an issue.
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

            <form action={formAction}>
                <label>Ticket ID</label>
                <input
                    name="ticketId"
                    placeholder="e.g. TKT-778899"
                    style={inputStyle}
                    required
                />

                <label>Operator</label>
                <select
                    name="operator"
                    style={inputStyle}
                    required
                >
                    <option value="">Select bus operator</option>
                    <option value="KSRTC">KSRTC</option>
                    <option value="APSRTC">APSRTC</option>
                    <option value="Private">Private Operator</option>
                </select>

                <label>Reason</label>
                <select
                    name="reason"
                    style={inputStyle}
                    required
                >
                    <option value="">Select a reason</option>
                    <option value="USER_CANCEL">User Cancelled</option>
                    <option value="DELAY">Bus Delayed</option>
                    <option value="OPERATOR_CANCEL">Operator Cancelled</option>
                </select>

                <input type="hidden" name="amount" value="500" />

                {state?.error && (
                    <p style={{ color: 'red', marginTop: 8 }}>{state.error}</p>
                )}

                <SubmitButton />
            </form>
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            style={{
                marginTop: 20,
                width: '100%',
                padding: 14,
                borderRadius: 8,
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                fontSize: 16,
                cursor: pending ? 'not-allowed' : 'pointer',
                opacity: pending ? 0.7 : 1
            }}
        >
            {pending ? 'Processing...' : 'Submit Ticket →'}
        </button>
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
