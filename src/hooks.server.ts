import { handle as authHandle } from './auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// RBAC Middleware Logic
const rbacHandle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();

	const { pathname } = event.url;

	// Proteksi Rute Admin
	if (pathname.startsWith('/admin')) {
		if (!session || (session.user as any).role !== 'ADMIN') {
			return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
		}
	}

	// Proteksi Rute Customer Service (CS)
	if (pathname.startsWith('/cs')) {
		if (!session || (session.user as any).role !== 'CUSTOMER_SERVICE') {
			return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
		}
	}

	// Proteksi Rute User Dashboard
	if (pathname.startsWith('/dashboard')) {
		if (!session) {
			return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
		}
	}

	// Redirect authenticated users away from Login/Register
	if (pathname === '/login' || pathname === '/register') {
		if (session) {
			if ((session.user as any).role === 'ADMIN') return new Response('Redirect', { status: 303, headers: { Location: '/admin' } });
			if ((session.user as any).role === 'CUSTOMER_SERVICE') return new Response('Redirect', { status: 303, headers: { Location: '/cs' } });
			return new Response('Redirect', { status: 303, headers: { Location: '/dashboard' } });
		}
	}

	return resolve(event);
};

/* 
// Autentikasi dinonaktifkan sementara untuk pengecekan Front-End sesuai permintaan user
export const handle = sequence(authHandle, rbacHandle);
*/

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};
