import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    const databaseUrl = process.env.DATABASE_URL;

    // Standard constructor. Explicitly pass the URL to ensure it's loaded in all environments.
    // connection_limit=1 is recommended for serverless to prevent pool exhaustion.
    return new PrismaClient({
        datasources: databaseUrl ? {
            db: {
                url: databaseUrl.includes("connection_limit") ? databaseUrl : `${databaseUrl}${databaseUrl.includes("?") ? "&" : "?"}connection_limit=1`
            }
        } : undefined,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
