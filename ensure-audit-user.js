import { db } from './src/lib/server/db/index.js';
import { users } from './src/lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

async function seed() {
    const mockId = '550e8400-e29b-41d4-a716-446655440000';
    
    // Check if exists
    const existing = await db.select().from(users).where(eq(users.id, mockId));
    
    if (existing.length === 0) {
        console.log('Creating mock audit user...');
        await db.insert(users).values({
            id: mockId,
            name: 'Gourmet Audit Lead',
            phone: '0000000000',
            password: 'mock-password',
            role: 'ADMIN',
            category: 'PUBLIK',
            status: 'ACTIVE'
        });
        console.log('Mock user created.');
    } else {
        console.log('Mock user already exists.');
    }
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
