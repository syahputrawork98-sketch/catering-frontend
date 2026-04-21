import postgres from 'postgres';

const DATABASE_URL = "postgres://catering_user:catering_password@localhost:5432/catering_hub";
const sql = postgres(DATABASE_URL);

async function migrate() {
    console.log('🔄 Starting manual enum migration...');
    
    try {
        // 1. Add new values to the enum
        // Note: Postgres doesn't support IF NOT EXISTS for ADD VALUE before v12, 
        // and we might get errors if they exist. We'll catch them.
        await sql.unsafe('ALTER TYPE category ADD VALUE IF NOT EXISTS \'INSTANSI_PEGAWAI\'').catch(() => {});
        await sql.unsafe('ALTER TYPE category ADD VALUE IF NOT EXISTS \'INSTANSI_BISNIS\'').catch(() => {});
        console.log('✅ Enum values added (or already existed).');

        // 2. Map existing 'INSTANSI' to 'INSTANSI_PEGAWAI'
        await sql.unsafe('UPDATE "user" SET category = \'INSTANSI_PEGAWAI\' WHERE category::text = \'INSTANSI\'');
        console.log('✅ Existing data mapped to INSTANSI_PEGAWAI.');

        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
}

migrate();
