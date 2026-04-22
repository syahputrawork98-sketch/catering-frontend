import type { Handle } from '@sveltejs/kit';

/**
 * 🔓 THE GREAT BYPASS (DEV MODE)
 * Disables all Auth.js and RBAC logic to unlock pages for rapid development.
 * Assumes a persistent ADMIN session globally.
 */
export const handle: Handle = async ({ event, resolve }) => {
	// 🔒 TOTAL BYPASS: Force a permanent ADMIN session
	// This disables all Auth.js and RBAC logic for rapid development.
	(event.locals as any).auth = async () => ({
		user: {
			id: '550e8400-e29b-41d4-a716-446655440000',
			name: 'Gourmet Dev Master',
			email: 'dev@gourmethub.com',
			role: 'ADMIN', // Unlock everything (Admin, CS, User)
			category: 'PUBLIK',
			status: 'ACTIVE'
		},
		expires: new Date(Date.now() + 3600000 * 24).toISOString() // 24 hours
	});

	// Resolve request without any RBAC or Redirect checks
	return resolve(event);
};


