import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	// Pengecekan aman jika sistem login sedang dinonaktifkan
	const session = typeof event.locals.auth === 'function' 
		? await event.locals.auth() 
		: null;

	return {
		session
	};
};
