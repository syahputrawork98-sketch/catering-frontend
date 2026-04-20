import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';
import { logAudit } from '$lib/server/audit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session?.user?.role !== 'ADMIN') {
		throw error(403, 'Akses Terbatas');
	}

	const allUsers = await db.query.users.findMany({
		orderBy: [desc(users.createdAt)]
	});

	return {
		allUsers
	};
};

export const actions: Actions = {
	toggleStatus: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const currentStatus = formData.get('status') as string;

		if (!id) return fail(400, { message: 'ID User tidak ditemukan' });

		const nextStatus = currentStatus === 'ACTIVE' ? 'PENDING' : 'ACTIVE';

		try {
			await db.update(users)
				.set({ status: nextStatus as any })
				.where(eq(users.id, id));
			
			const session = await locals.auth();
			await logAudit(session?.user?.id, {
				action: 'TOGGLE_USER_STATUS',
				entityType: 'USER',
				entityId: id,
				details: { newStatus: nextStatus }
			});
			
			return { success: true, message: `User berhasil di-${nextStatus === 'ACTIVE' ? 'aktifkan' : 'nonaktifkan'}` };
		} catch (e) {
			console.error('Toggle status error:', e);
			return fail(500, { message: 'Gagal mengubah status user' });
		}
	},

	updateRole: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const role = formData.get('role') as string;

		if (!id || !role) return fail(400, { message: 'Data tidak lengkap' });

		try {
			await db.update(users)
				.set({ role: role as any })
				.where(eq(users.id, id));
			
			const session = await locals.auth();
			await logAudit(session?.user?.id, {
				action: 'UPDATE_USER_ROLE',
				entityType: 'USER',
				entityId: id,
				details: { newRole: role }
			});
			
			return { success: true, message: 'Role user berhasil diperbarui' };
		} catch (e) {
			console.error('Update role error:', e);
			return fail(500, { message: 'Gagal mengubah role user' });
		}
	}
};
