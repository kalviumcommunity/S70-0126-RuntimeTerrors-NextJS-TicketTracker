import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                console.log('JWT Callback - User Role:', user.role);
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.role) {
                session.user.role = token.role;
                console.log('Session Callback - Token Role:', token.role);
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnOperatorDashboard = nextUrl.pathname === '/operator' || nextUrl.pathname.startsWith('/operator/');
            const isOnUserRoute = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/cancel') || nextUrl.pathname.startsWith('/track');

            console.log('Auth Check:', {
                path: nextUrl.pathname,
                isLoggedIn,
                role: auth?.user?.role,
                isOnOperatorDashboard,
                isOnUserRoute
            });

            if (isOnOperatorDashboard) {
                if (isLoggedIn && auth.user.role === 'USER') return Response.redirect(new URL('/dashboard', nextUrl));
                if (isLoggedIn) return true;
                return false;
            }

            if (isOnUserRoute) {
                if (isLoggedIn && auth.user.role === 'OPERATOR') return Response.redirect(new URL('/operator', nextUrl));
                if (isLoggedIn) return true;
                return false;
            }

            if (isLoggedIn) {
                if (nextUrl.pathname === '/login' || nextUrl.pathname === '/signup' || nextUrl.pathname === '/') {
                    if (auth.user.role === 'OPERATOR') {
                        return Response.redirect(new URL('/operator', nextUrl));
                    }
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
