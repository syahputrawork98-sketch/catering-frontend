import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './src/lib/server/db/schema';
import crypto from 'node:crypto';

// Configuration - Manually read from .env or use defaults
const DATABASE_URL = "postgres://catering_user:catering_password@localhost:5432/catering_hub";
const client = postgres(DATABASE_URL);
const db = drizzle(client, { schema });

async function seed() {
    console.log('🚀 Starting Master Seeding (Clean Slate)...');

    // 0. Clear Existing Data (Inverse Order of Dependencies)
    console.log('🧹 Clearing old data...');
    await db.delete(schema.orderItems);
    await db.delete(schema.orders);
    await db.delete(schema.dailySchedules);
    await db.delete(schema.expenses);
    await db.delete(schema.menus);
    await db.delete(schema.users);
    console.log('✨ Database cleared.');

    // 1. Seed Users
    console.log('👥 Seeding Users...');
    const adminId = '550e8400-e29b-41d4-a716-446655440000';
    const csId = crypto.randomUUID();
    const userId1 = crypto.randomUUID();
    const userId2 = crypto.randomUUID();

    const mockUsers = [
        {
            id: adminId,
            name: 'Gourmet Admin',
            phone: '081234567890',
            password: 'password123', 
            role: 'ADMIN' as const,
            category: 'PUBLIK' as const,
            status: 'ACTIVE' as const
        },
        {
            id: csId,
            name: 'CS Sarah',
            phone: '081234567891',
            password: 'password123',
            role: 'CUSTOMER_SERVICE' as const,
            category: 'PUBLIK' as const,
            status: 'ACTIVE' as const
        },
        {
            id: userId1,
            name: 'Budi Santoso',
            phone: '081234567892',
            password: 'password123',
            role: 'USER' as const,
            category: 'PUBLIK' as const,
            status: 'ACTIVE' as const
        },
        {
            id: userId2,
            name: 'Andi (Pegawai RSUD)',
            phone: '081234567893',
            password: 'password123',
            role: 'USER' as const,
            category: 'INSTANSI_PEGAWAI' as const,
            instansiName: 'RSUD Kota',
            status: 'ACTIVE' as const
        },
        {
            id: crypto.randomUUID(),
            name: 'Procurement Pertamina',
            phone: '081234567894',
            password: 'password123',
            role: 'USER' as const,
            category: 'INSTANSI_BISNIS' as const,
            instansiName: 'PT Pertamina',
            status: 'ACTIVE' as const
        }
    ];

    for (const u of mockUsers) {
        await db.insert(schema.users).values(u).onConflictDoNothing();
    }

    const allUserIds = mockUsers.map(u => u.id);

    // 2. Seed Menus
    console.log('🍱 Seeding Menus...');
    const menus = [
        { id: crypto.randomUUID(), name: 'Nasi Liwet Special', description: 'Nasi liwet dengan ayam goreng dan sambal terasi', basePrice: '35000', category: 'DAILY' as const },
        { id: crypto.randomUUID(), name: 'Beef Wellington Gourmet', description: 'Daging sapi premium dibalut pastry renyah', basePrice: '150000', category: 'PAKET' as const },
        { id: crypto.randomUUID(), name: 'Salmon Glazed Mustard', description: 'Salmon panggang dengan saus mustard madu', basePrice: '95000', category: 'DAILY' as const },
        { id: crypto.randomUUID(), name: 'Paket Buffet Corporate', description: 'Menu prasmanan mewah untuk acara kantor', basePrice: '5000000', category: 'PAKET' as const }
    ];

    for (const m of menus) {
        await db.insert(schema.menus).values(m).onConflictDoNothing();
    }

    // 3. Seed Schedules (Next 7 days & Last 7 days)
    console.log('📅 Seeding Daily Schedules...');
    const today = new Date();
    for (let i = -7; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];

        // Assign random menu to each date
        const randomMenu = menus[Math.floor(Math.random() * menus.length)];
        if (randomMenu.category === 'DAILY') {
            await db.insert(schema.dailySchedules).values({
                menuId: randomMenu.id,
                availableDate: dateStr,
                currentStock: 50
            }).onConflictDoNothing();
        }
    }

    // 4. Seed Expenses (Operational)
    console.log('💸 Seeding Expenses...');
    const expenseCategories = ['BELANJA', 'LOGISTIK', 'GAJI', 'PROMOSI'];
    for (let i = 0; i < 15; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - Math.floor(Math.random() * 30));
        await db.insert(schema.expenses).values({
            amount: (Math.floor(Math.random() * 500) * 1000).toString(),
            description: `Biaya operasional ${i + 1}`,
            category: expenseCategories[Math.floor(Math.random() * expenseCategories.length)],
            expenseDate: date.toISOString().split('T')[0],
            createdAt: date
        });
    }

    // 5. Seed Orders (Historical)
    console.log('🛒 Seeding Orders...');
    const statuses = ['PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED'] as const;
    for (let i = 0; i < 40; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - Math.floor(Math.random() * 30));
        
        const orderId = crypto.randomUUID();
        const randomUserId = allUserIds[Math.floor(Math.random() * allUserIds.length)];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const grandTotal = (Math.floor(Math.random() * 10) * 50000 + 100000).toString();

        await db.insert(schema.orders).values({
            id: orderId,
            userId: randomUserId,
            status: randomStatus,
            grandTotal: grandTotal,
            deliveryDate: date.toISOString().split('T')[0],
            createdAt: date
        });

        // Add 1-3 items per order
        const itemCount = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < itemCount; j++) {
            const randomMenu = menus[Math.floor(Math.random() * menus.length)];
            await db.insert(schema.orderItems).values({
                orderId: orderId,
                menuId: randomMenu.id,
                priceSnapshot: randomMenu.basePrice,
                quantity: Math.floor(Math.random() * 5) + 1
            });
        }
    }

    console.log('✅ Seeding Completed Successfully!');
    process.exit(0);
}


seed().catch(err => {
    console.error('❌ Seeding Failed:', err);
    process.exit(1);
});

