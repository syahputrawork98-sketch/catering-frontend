import { db } from '$lib/server/db';
import { users, orders, expenses } from '$lib/server/db/schema';
import { sql, desc, eq, inArray } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';
import argon2 from 'argon2';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session?.user?.role !== 'ADMIN') {
		throw error(403, 'Akses Terbatas');
	}

	// 1. Database Stats
	const [userStats] = await db
		.select({
			total: sql<number>`count(*)`,
			instansi: sql<number>`count(*) filter (where ${users.category} = 'INSTANSI')`,
			personal: sql<number>`count(*) filter (where ${users.category} = 'PUBLIK')`,
		})
		.from(users);

	// Calculate Omzet (Gross Revenue from confirmed orders)
	const [revenueData] = await db
		.select({
			total: sql<number>`COALESCE(sum(${orders.grandTotal}), 0)`,
			count: sql<number>`count(*)`
		})
		.from(orders)
		.where(inArray(orders.status, ['PAID', 'SHIPPED', 'COMPLETED']));

	// Calculate Total Belanja (Expenses)
	const [expenseData] = await db
		.select({
			total: sql<number>`COALESCE(sum(${expenses.amount}), 0)`,
			count: sql<number>`count(*)`
		})
		.from(expenses);

	// 2. Recent Users
	const recentUsers = await db.query.users.findMany({
		limit: 5,
		orderBy: [desc(users.id)]
	});

	// 3. Recent Expenses
	const recentExpenses = await db.query.expenses.findMany({
		limit: 5,
		orderBy: [desc(expenses.createdAt)]
	});

	return {
		stats: {
			totalUsers: userStats?.total || 0,
			instansiCount: userStats?.instansi || 0,
			personalCount: userStats?.personal || 0,
			revenue: Number(revenueData?.total) || 0,
			expense: Number(expenseData?.total) || 0,
			totalOrders: revenueData?.count || 0
		},
		recentUsers,
		recentExpenses
	};
};

export const actions: Actions = {
	logExpense: async ({ request }) => {
		const formData = await request.formData();
		const amount = formData.get('amount') as string;
		const description = formData.get('description') as string;
		const dateStr = formData.get('date') as string;

		if (!amount || !description || !dateStr) {
			return fail(400, { message: 'Data belanja tidak lengkap' });
		}

		try {
			await db.insert(expenses).values({
				amount: amount,
				description,
				expenseDate: dateStr,
				category: 'BELANJA'
			});
			return { success: true, message: 'Pengeluaran berhasil dicatat' };
		} catch (e) {
			console.error('Failed to log expense:', e);
			return fail(500, { message: 'Gagal mencatat pengeluaran' });
		}
	},

	createInstansi: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const phone = formData.get('phone') as string;
		const instansiName = formData.get('instansiName') as string;
		const password = formData.get('password') as string;

		if (!name || !phone || !instansiName || !password) {
			return fail(400, { message: 'Data tidak lengkap' });
		}

		try {
			const hashedPassword = await argon2.hash(password);
			await db.insert(users).values({
				name,
				phone,
				password: hashedPassword,
				category: 'INSTANSI',
				instansiName,
				status: 'ACTIVE',
				role: 'USER'
			});
			return { success: true, message: 'Akun instansi berhasil dibuat' };
		} catch (e) {
			console.error('Failed to create instansi account:', e);
			return fail(500, { message: 'Gagal membuat akun instansi' });
		}
	}
};
