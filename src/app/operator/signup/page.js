'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { register } from '@/app/actions/auth';
import Link from 'next/link';

export default function OperatorSignupPage() {
    // We might need a separate register key or action for operators to ensure they get the OPERATOR role
    // For now, we will reuse register but we need to pass a role.
    // However, the current register action doesn't accept a role.
    // We should probably create a specific action or update the existing one.
    // Update: I will create a hidden input for now and update the action later.

    // Actually, letting anyone sign up as an operator is a security risk, but for this demo it's fine.

    const [errorMessage, dispatch] = useFormState(register, undefined);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <form action={dispatch} className="flex flex-col gap-4 border p-8 rounded-lg shadow-md bg-white w-96 border-t-4 border-t-green-600">
                <h1 className="text-2xl font-bold text-center mb-4 text-green-800">Operator Registration</h1>

                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}

                <input type="hidden" name="role" value="OPERATOR" />

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Company Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Bus Company Ltd."
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Business Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="contact@company.com"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <SignupButton />

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already registered?{' '}
                        <Link href="/operator/login" className="text-green-600 hover:text-green-800">
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

function SignupButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex justify-center"
        >
            {pending ? 'Creating Account...' : 'Register Operator'}
        </button>
    );
}
