import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Check if ENV variables are present (values hidden for security)
        const hasDbUrl = !!process.env.DATABASE_URL;
        const hasDirectUrl = !!process.env.DIRECT_URL;

        // 2. Try a simple query
        const start = Date.now();
        const result = await prisma.$queryRaw`SELECT 1 as connected`;
        const duration = Date.now() - start;

        return NextResponse.json({
            status: 'ok',
            database: 'connected',
            duration: `${duration}ms`,
            config: {
                hasDbUrl,
                hasDirectUrl,
                nodeEnv: process.env.NODE_ENV
            },
            result
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message,
            code: error.code,
            meta: error.meta,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
