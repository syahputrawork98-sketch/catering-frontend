import { db } from '$lib/server/db';
import { auditLogs, users } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth();
    if (session?.user?.role !== 'ADMIN') {
        throw error(403, 'Akses Terbatas');
    }

    const logs = await db.query.auditLogs.findMany({
        with: {
            user: true
        },
        orderBy: [desc(auditLogs.createdAt)],
        limit: 100 // Last 100 entries
    });

    return {
        logs
    };
};
