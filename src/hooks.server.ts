import { handle as authHandle } from './auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// SET TO 'true' TO ENABLE UI AUDIT WITHOUT LOGIN
const AUDIT_MODE = true; 

// RBAC Middleware Logic
const rbacHandle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();
	const { pathname } = event.url;

	// BYPASS ALL AUTH FOR UI AUDIT PHASE (V1)
	if (AUDIT_MODE && (pathname.startsWith('/admin') || pathname.startsWith('/cs') || pathname.startsWith('/dashboard'))) {
		// Inject Mock Session if none exists to prevent Layout Crashes
		if (!session) {
			(event.locals as any).auth = async () => ({
				user: {
					id: 'mock-audit-id',
					name: 'Gourmet Audit Lead',
					email: 'audit@gourmethub.com',
					role: pathname.startsWith('/admin') ? 'ADMIN' : (pathname.startsWith('/cs') ? 'CUSTOMER_SERVICE' : 'USER'),
					status: 'ACTIVE'
				},
				expires: new Date(Date.now() + 3600000).toISOString()
			});
		}
		return resolve(event);
	}

	// Proteksi Rute Admin
	if (pathname.startsWith('/admin')) {
		if (!session || (session.user as any).role !== 'ADMIN') {
			return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
		}
	}

	// Proteksi Rute Customer Service (CS)
	if (pathname.startsWith('/cs')) {
		if (!session || (session.user as any).role !== 'CUSTOMER_SERVICE') {
			if ((session?.user as any).role !== 'ADMIN') {
				return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
			}
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

export const handle = sequence(authHandle, rbacHandle);
