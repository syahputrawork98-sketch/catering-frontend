import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session?.user?.role !== 'ADMIN') {
		throw error(403, 'Akses Terbatas');
	}

	return {
		config: {
			appName: 'Gourmet Hub V1',
			version: '1.0.0-Integrity',
			environment: 'DEVELOPMENT (AUDIT MODE ACTIVE)'
		}
	};
};
