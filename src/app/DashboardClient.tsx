"use client";

import Link from "next/link";
import styles from "./page.module.css";
import AnalyticsChart from "@/components/AnalyticsChart";

interface DashboardClientProps {
    stats: any[];
    recentAppointments: any[];
}

export default function DashboardClient({ stats, recentAppointments }: DashboardClientProps) {
    const sendWhatsApp = (phone: string, name: string) => {
        const message = `Hola ${name}, te recordamos tu cita en Clínica Valledental. ¡Te esperamos!`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const nextAppointment = recentAppointments[0] || null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Bienvenida de nuevo, Marian</h1>
                    <p>Este es el resumen de las próximas citas programadas.</p>
                </div>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Buscar paciente, registros..." />
                </div>
            </header>

            <section className={styles.statsGrid}>
                {stats.map((stat) => (
                    <div key={stat.label} className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: stat.color }}>{stat.icon}</div>
                        <div className={stat.trend ? styles.statWithTrend : ''}>
                            <p className={styles.statValue}>{stat.value}</p>
                            <p className={styles.statLabel}>{stat.label}</p>
                            {stat.trend && <p className={styles.trendText}>{stat.trend}</p>}
                        </div>
                    </div>
                ))}
            </section>

            <section className={styles.heroSection}>
                {nextAppointment ? (
                    <div className={styles.heroCard}>
                        <div className={styles.heroHeader}>
                            <span className={styles.badge}>PRÓXIMA CITA</span>
                            <span className={styles.videoTag}>📹 {nextAppointment.type}</span>
                        </div>
                        <div className={styles.heroContent}>
                            <div className={styles.doctorInfo}>
                                <div className={styles.heroAvatar}>👤</div>
                                <div>
                                    <h3>{nextAppointment.patient.name} {nextAppointment.patient.lastName}</h3>
                                    <p>{nextAppointment.type} • Revisión de Salud</p>
                                </div>
                            </div>
                            <div className={styles.heroActions}>
                                <button
                                    className={styles.primaryBtn}
                                    onClick={() => sendWhatsApp(nextAppointment.patient.phone, nextAppointment.patient.name)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={styles.btnIcon}>
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.41 0 .01 5.399.006 12.039a11.81 11.81 0 001.592 5.968l-1.598 5.835 5.974-1.566a11.751 11.751 0 005.659 1.448h.005c6.64 0 12.04-5.4 12.044-12.041a11.82 11.82 0 00-3.264-8.479" />
                                    </svg>
                                    Enviar recordatorio
                                </button>
                                <button className={styles.secondaryBtn}>Reprogramar</button>
                            </div>
                        </div>
                        <div className={styles.heroFooter}>
                            <span>📅 {new Date(nextAppointment.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                            <span>⏰ {new Date(nextAppointment.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.heroCard} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p>No hay citas próximas programadas.</p>
                    </div>
                )}
            </section>

            <section className={styles.recentSection}>
                <div className={styles.sectionHeader}>
                    <h2>Consultas Recientes</h2>
                    <button className={styles.viewAll}>Ver Todo</button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>PACIENTE</th>
                            <th>TIPO</th>
                            <th>FECHA</th>
                            <th>ESTADO</th>
                            <th>ACCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentAppointments.length > 0 ? (
                            recentAppointments.map((app) => (
                                <tr key={app.id}>
                                    <td>{app.patient.name} {app.patient.lastName}</td>
                                    <td>{app.type}</td>
                                    <td>{new Date(app.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                    <td>
                                        <span className={app.status === 'Completed' ? styles.statusCompleted : styles.statusScheduled}>
                                            {app.status === 'Completed' ? 'Completada' : 'Programada'}
                                        </span>
                                    </td>
                                    <td>
                                        <Link href={`/pacientes/${app.patientId}`} className={styles.actionBtn}>
                                            Ver
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>No hay consultas registradas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            <AnalyticsChart />
        </div>
    );
}
