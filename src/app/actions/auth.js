'use server';

import { signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function authenticate(prevState, formData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error.type === 'CredentialsSignin') {
            return 'Invalid credentials.';
        }
        throw error;
    }
}

export async function register(prevState, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const role = formData.get('role') || 'USER';

    if (!email || !password || !name) {
        return 'Missing required fields';
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { name, email, password: hashedPassword, role },
        });
    } catch (error) {
        if (error.code === 'P2002') {
            return 'Email already exists';
        }
        return 'Failed to create user';
    }

    redirect('/login');
}

export async function handleSignOut() {
    // Clear cache to resolve "stuck" UI states
    revalidatePath('/');

    // Force clear session cookies
    cookies().delete('authjs.session-token');
    cookies().delete('__Secure-authjs.session-token');

    await signOut({ redirectTo: '/' });
}
