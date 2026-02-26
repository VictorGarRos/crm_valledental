import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Check if ENV variables are present (values hidden for security)
        const dbUrl = process.env.DATABASE_URL || '';
        const directUrl = process.env.DIRECT_URL || '';

        const safePreview = (url: string) => {
            if (!url) return 'missing';
            // Show protocol, first 5 chars of user, and domain (hiding password and rest of user)
            const parts = url.split('@');
            if (parts.length < 2) return 'invalid format';
            const beforeAt = parts[0].split(':');
            const protocol = beforeAt[0]; // e.g., postgresql:
            let user = beforeAt[beforeAt.length - 1]; // Handles postgresql://...
            if (user.startsWith('//')) user = user.substring(2);
            const domain = parts[1].split('?')[0];
            return `${protocol}//${user.substring(0, 10)}...[HIDDEN]...@${domain}`;
        };

        // 2. Try a simple query
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
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
