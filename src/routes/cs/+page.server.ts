import { db } from '$lib/server/db';
import { menus } from '$lib/server/db/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'CUSTOMER_SERVICE')) {
		throw redirect(303, '/login');
	}

	const allMenus = await db.select().from(menus).orderBy(menus.createdAt);

	return {
		menus: allMenus
	};
};

export const actions: Actions = {
	createMenu: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const category = formData.get('category') as string;
		const price = formData.get('price') as string;

		if (!name || !category || !price) {
			return fail(400, { message: 'Missing required fields' });
		}

		try {
			await db.insert(menus).values({
				name,
				category,
				basePrice: price,
				image: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop` // Default dummy image for now
			});
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'Gagal menyimpan menu' });
		}

		return { success: true };
	}
};
