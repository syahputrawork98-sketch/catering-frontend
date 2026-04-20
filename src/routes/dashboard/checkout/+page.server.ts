import { db } from '$lib/server/db';
import { orders, orderItems } from '$lib/server/db/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	checkout: async ({ request, locals }) => {
		const session = await locals.auth();
		if (!session?.user?.id) {
			throw error(401, 'Silakan login terlebih dahulu');
		}

		const formData = await request.formData();
		const cartJson = formData.get('cartData') as string;
		const grandTotal = formData.get('grandTotal') as string;

		if (!cartJson || !grandTotal) {
			return fail(400, { message: 'Keranjang belanja kosong' });
		}

		const cartItems = JSON.parse(cartJson);

		try {
			// Jalankan Transaksi Database secara Atomik
			const result = await db.transaction(async (tx) => {
				// 1. Buat Header Pesanan (Order)
				const [newOrder] = await tx.insert(orders).values({
					userId: session.user.id,
					grandTotal: grandTotal,
					status: 'PENDING'
				}).returning();

				// 2. Buat Detail Pesanan (Order Items)
				const itemsToInsert = cartItems.map((item: any) => ({
					orderId: newOrder.id,
					menuId: item.id,
					priceSnapshot: item.price.toString(),
					quantity: item.quantity
				}));

				await tx.insert(orderItems).values(itemsToInsert);

				return newOrder;
			});

			return { success: true, orderId: result.id };
		} catch (e) {
			console.error('Checkout error:', e);
			return fail(500, { message: 'Gagal memproses pesanan silakan urulangi' });
		}
	}
};
