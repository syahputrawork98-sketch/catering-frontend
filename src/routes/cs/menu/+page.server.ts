import { db } from '$lib/server/db';
import { menus, menuTypes, menuCategories } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
    const allMenus = await db.query.menus.findMany({
        with: {
            type: true,
            category: true
        },
        orderBy: [desc(menus.createdAt)]
    });

    const types = await db.select().from(menuTypes);
    const categories = await db.select().from(menuCategories);

    return {
        menus: allMenus,
        types,
        categories
    };
};

export const actions: Actions = {
    deleteMenu: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;

        if (!id) return fail(400, { message: 'ID menu tidak valid' });

        try {
            await db.delete(menus).where(eq(menus.id, id));
            return { success: true, message: 'Menu berhasil dihapus' };
        } catch (e) {
            console.error('Delete menu error:', e);
            return fail(500, { message: 'Gagal menghapus menu' });
        }
    }
};
