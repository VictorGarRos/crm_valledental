"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import AddPatientModal from "@/components/AddPatientModal";
import { getPatients, deletePatient } from "./actions";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface PacientesClientProps {
    initialPatients: any[];
}

export default function PacientesClient({ initialPatients }: PacientesClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patients, setPatients] = useState(initialPatients);
    const [loading, setLoading] = useState(false);

    const refreshPatients = async () => {
        setLoading(true);
        const data = await getPatients();
        setPatients(data);
        setLoading(false);
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`¿Estás seguro de que quieres borrar al paciente ${name}? Esta acción no se puede deshacer.`)) {
            const result = await deletePatient(id);
            if (result.success) {
                refreshPatients();
            } else {
                alert(result.error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Gestión de Pacientes</h1>
                    <p>Consulta, crea y edita la información de tus pacientes.</p>
                </div>
                <button
                    className={styles.primaryBtn}
                    style={{ width: 'auto', padding: '12px 24px' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    + Nuevo Paciente
                </button>
            </header>

            <section className={styles.recentSection} style={{ marginTop: '24px' }}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>PACIENTE</th>
                            <th>TELÉFONO</th>
                            <th>ÚLTIMA CITA</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && patients.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>
                                    Cargando pacientes...
                                </td>
                            </tr>
                        ) : patients.length > 0 ? (
                            patients.map((patient) => (
                                <tr key={patient.id}>
                                    <td data-label="PACIENTE">
                                        <div style={{ fontWeight: 600, color: '#2c3e50' }}>
                                            {patient.name} {patient.lastName}
                                        </div>
                                        {patient.email && <div style={{ fontSize: '12px', color: '#95a5a6' }}>{patient.email}</div>}
                                    </td>
                                    <td data-label="TELÉFONO" style={{ color: '#7f8c8d' }}>{patient.phone}</td>
                                    <td data-label="ÚLTIMA CITA" style={{ color: '#7f8c8d' }}>
                                        {patient.appointments?.[0]
                                            ? format(new Date(patient.appointments[0].date), "d MMM, yyyy", { locale: es })
                                            : "Sin citas"}
                                    </td>
                                    <td data-label="ACCIONES">
                                        <div className={styles.actionGroup}>
                                            <Link href={`/pacientes/${patient.id}`} className={styles.actionBtn}>
                                                Ver Ficha
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(patient.id, `${patient.name} ${patient.lastName}`)}
                                                className={styles.deleteBtn}
                                            >
                                                <span>🗑️</span> Borrar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr style={{ color: '#95a5a6' }}>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '40px' }}>
                                    No hay pacientes registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            <AddPatientModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    refreshPatients();
                }}
            />
        </div>
    );
}
