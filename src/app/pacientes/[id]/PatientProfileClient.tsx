"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import styles from "../../page.module.css";

interface PatientProfileClientProps {
    patient: any;
}

export default function PatientProfileClient({ patient }: PatientProfileClientProps) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Link href="/pacientes" className={styles.actionBtn} style={{ padding: '8px 12px', background: '#f8f9fa' }}>
                            ← Volver
                        </Link>
                        <h1>Ficha del Paciente</h1>
                    </div>
                    <p>Historial clínico y detalles de contacto de <strong>{patient.name} {patient.lastName}</strong></p>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', marginTop: '32px' }}>
                {/* Personal Info Card */}
                <div className={styles.statsCard} style={{ padding: '24px', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Información Personal</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ fontSize: '12px', color: '#95a5a6', display: 'block' }}>Nombre Completo</label>
                            <span style={{ fontWeight: 600 }}>{patient.name} {patient.lastName}</span>
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', color: '#95a5a6', display: 'block' }}>Teléfono</label>
                            <span style={{ fontWeight: 600 }}>{patient.phone}</span>
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', color: '#95a5a6', display: 'block' }}>Email</label>
                            <span style={{ fontWeight: 600 }}>{patient.email || "No proporcionado"}</span>
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', color: '#95a5a6', display: 'block' }}>Fecha de Nacimiento</label>
                            <span style={{ fontWeight: 600 }}>
                                {patient.birthDate ? format(new Date(patient.birthDate), "PPP", { locale: es }) : "No proporcionada"}
                            </span>
                        </div>
                        <div>
                            <label style={{ fontSize: '12px', color: '#95a5a6', display: 'block' }}>Paciente desde</label>
                            <span style={{ fontWeight: 600 }}>{format(new Date(patient.createdAt), "PPP", { locale: es })}</span>
                        </div>
                    </div>
                </div>

                {/* Appointments History */}
                <div className={styles.recentSection}>
                    <h3 style={{ marginBottom: '20px' }}>Historial de Citas</h3>
                    {patient.appointments.length > 0 ? (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>FECHA</th>
                                    <th>TIPO</th>
                                    <th>ESTADO</th>
                                    <th>NOTAS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patient.appointments.map((appt: any) => (
                                    <tr key={appt.id}>
                                        <td style={{ fontWeight: 600 }}>
                                            {format(new Date(appt.date), "d MMM, yyyy - HH:mm", { locale: es })}
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                background: appt.type === 'Urgencia' ? '#fff1f0' : '#eef2ff',
                                                color: appt.type === 'Urgencia' ? '#e74c3c' : '#3498db',
                                                fontSize: '12px',
                                                fontWeight: 600
                                            }}>
                                                {appt.type}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{ color: '#2ecc71', fontWeight: 600 }}>{appt.status}</span>
                                        </td>
                                        <td style={{ color: '#7f8c8d', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {appt.notes || "Sin notas"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '16px', color: '#95a5a6' }}>
                            Este paciente aún no tiene citas registradas.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
