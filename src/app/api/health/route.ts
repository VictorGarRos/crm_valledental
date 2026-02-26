import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    const dbUrl = process.env.DATABASE_URL || '';
    const directUrl = process.env.DIRECT_URL || '';

    const safePreview = (url: string) => {
        if (!url) return 'missing';
        const parts = url.split('@');
        if (parts.length < 2) return 'invalid format';
        const beforeAt = parts[0].split(':');
        const protocol = beforeAt[0];
        let user = beforeAt[beforeAt.length - 1];
        if (user.startsWith('//')) user = user.substring(2);
        const domain = parts[1].split('?')[0];
        return `${protocol}//${user.substring(0, 10)}...[HIDDEN]...@${domain}`;
    };

    try {
        const start = Date.now();
        const result = await prisma.$queryRaw`SELECT 1 as connected`;
        const duration = Date.now() - start;

        return NextResponse.json({
            status: 'ok',
            database: 'connected',
            duration: `${duration}ms`,
            config: {
                dbUrlPreview: safePreview(dbUrl),
                directUrlPreview: safePreview(directUrl),
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
            config: {
                dbUrlPreview: safePreview(dbUrl),
                directUrlPreview: safePreview(directUrl),
                nodeEnv: process.env.NODE_ENV
            },
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
