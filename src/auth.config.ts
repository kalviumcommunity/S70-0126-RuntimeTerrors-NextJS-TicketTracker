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

            // 1. Redirect loged-in users away from auth pages
            if (isLoggedIn) {
                if (
                    nextUrl.pathname === '/login' ||
                    nextUrl.pathname === '/signup' ||
                    nextUrl.pathname.startsWith('/operator/login') ||
                    nextUrl.pathname.startsWith('/operator/signup')
                ) {
                    if (auth.user.role === 'OPERATOR') {
                        return Response.redirect(new URL('/operator', nextUrl));
                    }
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
            }

            // 2. Protect Operator Routes
            if (isOnOperatorDashboard) {
                // Allow public access to auth pages (only if NOT logged in, handled above)
                if (nextUrl.pathname.startsWith('/operator/login') || nextUrl.pathname.startsWith('/operator/signup')) {
                    return true;
                }
                if (isLoggedIn && auth.user.role === 'USER') return Response.redirect(new URL('/dashboard', nextUrl));
                if (isLoggedIn) return true;
                return false;
            }

            // 3. Protect User Routes
            if (isOnUserRoute) {
                if (isLoggedIn && auth.user.role === 'OPERATOR') return Response.redirect(new URL('/operator', nextUrl));
                if (isLoggedIn) return true;
                return false;
            }

            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
