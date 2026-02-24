"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAppointments() {
    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                patient: true,
            },
            orderBy: {
                date: 'asc',
            },
        });
        return appointments;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return [];
    }
}

export async function createAppointment(data: {
    date: string | Date;
    type: string;
    patientId: string;
    notes?: string;
}) {
    try {
        const appointment = await prisma.appointment.create({
            data: {
                date: new Date(data.date),
                type: data.type,
                patientId: data.patientId,
                notes: data.notes || null,
                status: 'Scheduled',
            },
        });

        revalidatePath("/calendario");
        revalidatePath("/");
        return { success: true, appointment };
    } catch (error) {
        console.error("Error creating appointment:", error);
        return { success: false, error: "Error al crear la cita" };
    }
}
