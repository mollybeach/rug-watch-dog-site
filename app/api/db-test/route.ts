import { NextResponse } from 'next/server';
import { getClient } from '@/lib/db/config';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = await getClient();
        
        // Simple test query
        const result = await client.query('SELECT NOW() as current_time');
        
        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            timestamp: result.rows[0].current_time,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST?.split('.')[0] // Only show first part for security
        });
    } catch (error: any) {
        console.error('Database Test Error:', {
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