'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { register } from '@/app/actions/auth';
import Link from 'next/link';

export default function SignupPage() {
    const [errorMessage, dispatch] = useFormState(register, undefined);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <form action={dispatch} className="flex flex-col gap-4 border p-8 rounded-lg shadow-md bg-white w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>

                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
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
                        placeholder="Password"
                        required
                        minLength={6}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <LoginButton />

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-500 hover:text-blue-700">
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex justify-center"
        >
            {pending ? 'Registering...' : 'Sign Up'}
        </button>
    );
}
