import { PrismaClient } from "@prisma/client";

// Prisma automatically uses DATABASE_URL from process.env in Next.js

const prismaClientSingleton = () => {
    // Standard constructor. Prisma automatically uses DATABASE_URL from process.env
    return new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
