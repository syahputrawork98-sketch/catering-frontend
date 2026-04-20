import { db } from '$lib/server/db';
import { orders } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (!session?.user?.id) {
		throw error(401, 'Silakan login terlebih dahulu');
	}

	// Fetch orders with related items and menus for the current user
	const userOrders = await db.query.orders.findMany({
		where: eq(orders.userId, session.user.id),
		with: {
			orderItems: {
				with: {
					menu: true
				}
			}
		},
		orderBy: [desc(orders.createdAt)]
	});

	return {
		orders: userOrders
	};
};
