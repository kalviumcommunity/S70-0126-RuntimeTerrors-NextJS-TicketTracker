'use client';

import { useFormStatus } from 'react-dom';

export function SignOutButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            style={{
                padding: '8px 14px',
                borderRadius: 6,
                border: 'none',
                background: pending ? '#666' : '#333',
                color: '#fff',
                cursor: pending ? 'not-allowed' : 'pointer',
                opacity: pending ? 0.7 : 1
            }}
        >
            {pending ? 'Signing Out...' : 'Sign Out'}
        </button>
    );
}
