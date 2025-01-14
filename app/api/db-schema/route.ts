import { NextResponse } from 'next/server';
import { getClient } from '@/lib/db/config';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = await getClient();
        
        const result = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        
        return NextResponse.json({
            success: true,
            tables: result.rows.map(row => row.table_name)
        });
    } catch (error: any) {
        console.error('Schema Check Error:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });

        return NextResponse.json({
            success: false,
            error: error.message,
            code: error.code
        }, { status: 500 });
    }
} 