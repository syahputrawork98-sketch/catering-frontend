import { db } from '$lib/server/db';
import { orders, expenses, auditLogs, users } from '$lib/server/db/schema';
import { eq, desc, inArray } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const GET: RequestHandler = async ({ url, locals }) => {
    const session = await locals.auth();
    if (session?.user?.role !== 'ADMIN') {
        throw error(403, 'Akses Terbatas');
    }

    const type = url.searchParams.get('type') || 'reports';
    const format = url.searchParams.get('format') || 'csv';

    let data: any[] = [];
    let filename = `export-${type}-${new Date().toISOString().split('T')[0]}`;
    let headers: string[] = [];

    if (type === 'reports') {
        const rawExpenses = await db.query.expenses.findMany({
            orderBy: [desc(expenses.expenseDate)]
        });
        headers = ['Tanggal', 'Keterangan', 'Kategori', 'Nominal'];
        data = rawExpenses.map(e => [
            e.expenseDate,
            e.description,
            e.category,
            Number(e.amount)
        ]);
        filename = `Laporan-Keuangan-${new Date().toISOString().split('T')[0]}`;
    } else if (type === 'audit') {
        const rawLogs = await db.query.auditLogs.findMany({
            with: { user: true },
            orderBy: [desc(auditLogs.createdAt)]
        });
        headers = ['Waktu', 'Admin', 'Aksi', 'Entitas', 'Detail'];
        data = rawLogs.map(l => [
            l.createdAt.toISOString(),
            l.user?.name || 'Admin',
            l.action,
            l.entityType,
            l.details || '-'
        ]);
        filename = `Audit-Trail-${new Date().toISOString().split('T')[0]}`;
    }

    // --- Format Handlers ---

    if (format === 'csv' || format === 'excel') {
        // We use Tab-Separated for "Excel" compatibility and simplicity
        const delimiter = format === 'csv' ? ',' : '\t';
        const csvContent = [
            headers.join(delimiter),
            ...data.map(row => row.map((cell: any) => `"${String(cell).replace(/"/g, '""')}"`).join(delimiter))
        ].join('\n');

        const extension = format === 'csv' ? 'csv' : 'xls';
        const contentType = format === 'csv' ? 'text/csv' : 'application/vnd.ms-excel';

        return new Response(csvContent, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${filename}.${extension}"`
            }
        });
    }

    if (format === 'pdf') {
        const doc: any = new jsPDF({ orientation: 'landscape' });
        doc.text(filename.replace(/-/g, ' '), 14, 15);
        
        // @ts-ignore - jspdf-autotable adds autoTable to jsPDF instance
        doc.autoTable({
            head: [headers],
            body: data,
            startY: 20,
            theme: 'striped',
            headStyles: { fillColor: [249, 115, 22] } // Brand Primary Color (approx)
        });

        const pdfOutput = doc.output('arraybuffer');
        return new Response(pdfOutput, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}.pdf"`
            }
        });
    }

    throw error(400, 'Format tidak didukung');
};
