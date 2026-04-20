import { db } from './db';
import { auditLogs } from './db/schema';

export async function logAudit(
    userId: string | undefined | null,
    { 
        action, 
        entityType, 
        entityId, 
        details 
    }: { 
        action: string; 
        entityType: string; 
        entityId?: string; 
        details?: any 
    }
) {
    try {
        await db.insert(auditLogs).values({
            userId: userId || null,
            action,
            entityType,
            entityId: entityId || null,
            details: details ? JSON.stringify(details) : null,
        });
    } catch (err) {
        console.error('[AUDIT_LOG_ERROR]', err);
        // We don't throw here to avoid crashing the main action if logging fails
    }
}
