'use server';

import { signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

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

    if (!email || !password || !name) {
        return 'Missing required fields';
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { name, email, password: hashedPassword },
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
    await signOut({ redirectTo: '/login' });
}
