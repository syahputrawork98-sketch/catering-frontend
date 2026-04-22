import { db } from '$lib/server/db';
import { menuTypes, menuCategories } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	// --- DATABASE AUTO-CORRECTION (Gourmet Hub Self-Healing) ---
	// Kami pastikan tabel dan kolom yang diperlukan ada sebelum halaman dimuat.
	try {
		await db.execute(sql`
			CREATE TABLE IF NOT EXISTS menu_types (
				id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
				name TEXT NOT NULL,
				slug TEXT NOT NULL UNIQUE,
				created_at TIMESTAMP DEFAULT NOW() NOT NULL
			);
			CREATE TABLE IF NOT EXISTS menu_categories (
				id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
				name TEXT NOT NULL,
				slug TEXT NOT NULL UNIQUE,
				created_at TIMESTAMP DEFAULT NOW() NOT NULL
			);
			ALTER TABLE menu ADD COLUMN IF NOT EXISTS type_id UUID REFERENCES menu_types(id) ON DELETE SET NULL;
			ALTER TABLE menu ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL;
			ALTER TABLE menu ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES "user"(id) ON DELETE SET NULL;

			-- Clean up old broken external placeholders

			UPDATE menu SET image = '/images/placeholder-menu.jpg' 
			WHERE image LIKE 'https://images.unsplash.com%';
		`);


		// Inisialisasi Tipe jika kosong
		const existingTypes = await db.select().from(menuTypes);
		if (existingTypes.length === 0) {
			await db.insert(menuTypes).values([
				{ name: 'Menu Daily', slug: 'daily' },
				{ name: 'Menu Paket', slug: 'paket' },
				{ name: 'Menu Tambahan', slug: 'tambahan' }
			]);
		}

		// Inisialisasi Kategori jika kosong
		const existingCats = await db.select().from(menuCategories);
		if (existingCats.length === 0) {
			await db.insert(menuCategories).values([
				{ name: 'Nasi Kotak', slug: 'nasi-kotak' },
				{ name: 'Bento Box', slug: 'bento' },
				{ name: 'Snack & Drink', slug: 'snack' },
				{ name: 'Healthy Salad', slug: 'salad' }
			]);
		}
	} catch (err) {
		console.error('[DATABASE_LAYOUT_INIT_ERROR]:', err);
	}

	return {};
};
