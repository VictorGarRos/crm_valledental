"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import styles from "../../page.module.css";
import { updatePatientImage } from "../actions";

interface PatientProfileClientProps {
    patient: any;
}

export default function PatientProfileClient({ patient }: PatientProfileClientProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState(patient.imageUrl);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Ensure smaller file sizes (basic check)
        if (file.size > 2 * 1024 * 1024) {
            alert('La imagen no debe superar los 2MB.');
            return;
        }

        setIsUploading(true);
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64String = reader.result as string;

                const result = await updatePatientImage(patient.id, base64String);
                if (result.success) {
                    setImageUrl(base64String);
                } else {
                    alert('Error al subir la imagen: ' + result.error);
                }
                setIsUploading(false);
            };
            reader.onerror = () => {
                alert('Error al procesar la imagen.');
                setIsUploading(false);
            };
        } catch (error) {
            alert('Error inesperado al subir la imagen.');
            setIsUploading(false);
        }
    };

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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '16px' }}>
                        <div
                            onClick={handleImageClick}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: '#f0f2f5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: isUploading ? 'not-allowed' : 'pointer',
                                overflow: 'hidden',
                                border: '2px solid #e0e0e0',
                                position: 'relative'
                            }}
                            title="Haz clic para cambiar la foto"
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '36px' }}>👤</span>
                            )}
                            {isUploading && (
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>...</span>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <div>
                            <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{patient.name} {patient.lastName}</p>
                            <p style={{ margin: 0, color: '#7f8c8d' }}>Historial clínico y detalles de contacto</p>
                        </div>
                    </div>
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
