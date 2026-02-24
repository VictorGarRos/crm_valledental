import prisma from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function Home() {
  // Fetch real data from the database
  const totalPatients = await prisma.patient.count();

  // Get today's start and end for "Today's Appointments"
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const appointmentsToday = await prisma.appointment.count({
    where: {
      date: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  // Fetch recent appointments with patient details
  const recentAppointments = await prisma.appointment.findMany({
    take: 5,
    orderBy: {
      date: 'desc',
    },
    include: {
      patient: true,
    },
  });

  const stats = [
    { label: 'Pacientes Totales', value: totalPatients.toString().padStart(2, '0'), icon: '👤', color: 'var(--primary-light)' },
    { label: 'Citas de hoy', value: appointmentsToday.toString().padStart(2, '0'), icon: '📅', color: '#fff9e6', trend: '+12% desde ayer' },
    { label: 'Mensajes sin leer', value: '03', icon: '💬', color: '#eef2ff' },
    { label: 'Recetas activas', value: '05', icon: '💊', color: '#fff1f0' },
  ];

  return <DashboardClient stats={stats} recentAppointments={recentAppointments} />;
}
