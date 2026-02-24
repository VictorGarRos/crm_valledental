import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import path from "path";

// Explicitly load .env file as a safeguard for early module evaluation in Next.js/Turbopack
if (typeof window === "undefined") {
    config({ path: path.resolve(process.cwd(), ".env") });
    console.log("[Prisma] Initializing client. DATABASE_URL from process.env:", !!process.env.DATABASE_URL);
}

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
