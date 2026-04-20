import { db } from '$lib/server/db';
import { orders, expenses } from '$lib/server/db/schema';
import { sql, desc, inArray } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session?.user?.role !== 'ADMIN') {
		throw error(403, 'Akses Terbatas');
	}

	// 1. Omzet Aggregation
	const [revenueData] = await db
		.select({
			total: sql<number>`COALESCE(sum(${orders.grandTotal}), 0)`,
			count: sql<number>`count(*)`
		})
		.from(orders)
		.where(inArray(orders.status, ['PAID', 'SHIPPED', 'COMPLETED']));

	// 2. Expense Aggregation
	const [expenseData] = await db
		.select({
			total: sql<number>`COALESCE(sum(${expenses.amount}), 0)`,
			count: sql<number>`count(*)`
		})
		.from(expenses);

	// 3. Detailed Expense List
	const allExpenses = await db.query.expenses.findMany({
		orderBy: [desc(expenses.expenseDate)]
	});

	return {
		stats: {
			revenue: Number(revenueData?.total) || 0,
			expense: Number(expenseData?.total) || 0,
			orderCount: revenueData?.count || 0,
			expenseCount: expenseData?.count || 0
		},
		allExpenses
	};
};
