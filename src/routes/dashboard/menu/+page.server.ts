import { db } from '$lib/server/db';
import { menus } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// For now, we load all master menus. 
	// Future phase will filter by daily_schedules.
	const allMenus = await db.select().from(menus).orderBy(menus.createdAt);

	return {
		menus: allMenus.map(m => ({
			...m,
			// Ensure price is a number for the frontend
			basePrice: parseFloat(m.basePrice as string)
		}))
	};
};
