"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPatient(formData: {
    name: string;
    lastName: string;
    phone: string;
    email?: string;
    birthDate?: string;
}) {
    try {
        const patient = await prisma.patient.create({
            data: {
                name: formData.name,
                lastName: formData.lastName,
                phone: formData.phone,
                email: formData.email || null,
                birthDate: formData.birthDate ? new Date(formData.birthDate) : null,
            },
        });

        revalidatePath("/pacientes");
        return { success: true, patient };
    } catch (error) {
        console.error("Error creating patient:", error);
        return { success: false, error: "Error al crear el paciente" };
    }
}

export async function getPatients() {
    try {
        return await prisma.patient.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                appointments: {
                    orderBy: { date: "desc" },
                    take: 1,
                },
            },
        });
    } catch (error) {
        console.error("Error fetching patients:", error);
        return [];
    }
}

export async function getPatient(id: string) {
    try {
        return await prisma.patient.findUnique({
            where: { id },
            include: {
                appointments: {
                    orderBy: { date: "desc" },
                },
            },
        });
    } catch (error) {
        console.error("Error fetching patient:", error);
        return null;
    }
}
