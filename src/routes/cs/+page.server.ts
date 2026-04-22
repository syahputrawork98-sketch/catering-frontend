import { db } from '$lib/server/db';
import { orders, dailySchedules, menus, users, menuTypes, menuCategories } from '$lib/server/db/schema';
import { eq, sql, desc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import sharp from 'sharp';
import { join } from 'path';


export const load: PageServerLoad = async ({ locals }) => {
	const today = new Date().toISOString().split('T')[0];


	// 1. Fetch Stats
	const [orderStats] = await db
		.select({
			totalToday: sql<number>`count(*) filter (where date(${orders.createdAt}) = current_date)`,
			pending: sql<number>`count(*) filter (where ${orders.status} = 'PENDING')`,
		})
		.from(orders);

	const [clientStats] = await db
		.select({
			totalInstansi: sql<number>`count(*) filter (where ${users.category} IN ('INSTANSI_PEGAWAI', 'INSTANSI_BISNIS'))`,
		})
		.from(users);

	const [menuStats] = await db
		.select({
			lowStock: sql<number>`count(*) filter (where ${dailySchedules.currentStock} < 10 and ${dailySchedules.availableDate} = ${today})`,
		})
		.from(dailySchedules);

	// 2. Fetch Lists for Dropdowns
	const types = await db.select().from(menuTypes);
	const categories = await db.select().from(menuCategories);

	// 3. Fetch Recent Master Menus (with Relations)
	const masterMenus = await db.query.menus.findMany({
		limit: 5,
		with: {
			type: true,
			category: true
		},
		orderBy: [desc(menus.id)]
	});

	return {
		stats: {
			ordersToday: orderStats?.totalToday || 0,
			pendingOrders: orderStats?.pending || 0,
			lowStockItems: menuStats?.lowStock || 0,
			totalInstansi: clientStats?.totalInstansi || 0
		},
		types,
		categories,
		menus: masterMenus
	};
};

export const actions: Actions = {
	createMenu: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const typeId = formData.get('typeId') as string;
		const categoryId = formData.get('categoryId') as string;
		const price = formData.get('price') as string;
		const description = formData.get('description') as string;
		const imageFile = formData.get('image') as File;

		if (!name || !typeId || !categoryId || !price) {
			return fail(400, { message: 'Data tidak lengkap' });
		}

		let imageUrl = '/images/placeholder-menu.jpg';

		// Handle Image Upload & Resize
		if (imageFile && imageFile.size > 0) {
			try {
				const buffer = Buffer.from(await imageFile.arrayBuffer());
				const filename = `${Date.now()}-${name.toLowerCase().replace(/\s+/g, '-')}.webp`;
				const uploadPath = join(process.cwd(), 'static', 'uploads', 'menus', filename);

				// Resize to max width 800px, high quality webp
				await sharp(buffer)
					.resize(800, null, { withoutEnlargement: true })
					.webp({ quality: 80 })
					.toFile(uploadPath);

				imageUrl = `/uploads/menus/${filename}`;
			} catch (e) {
				console.error('Image processing error:', e);
				// Fallback to placeholder if processing fails but continue
			}
		}

		try {
			await db.insert(menus).values({
				name,
				typeId,
				categoryId,
				basePrice: price,
				description,
				image: imageUrl
			});

			return { success: true, message: 'Menu berhasil ditambahkan' };
		} catch (e) {
			console.error('Create menu error:', e);
			return fail(500, { message: 'Gagal menambahkan menu' });
		}
	}
};


