"use client";

import React, { useState } from 'react';
import styles from './AddPatientModal.module.css';
import { createPatient } from '@/app/pacientes/actions';

interface AddPatientModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddPatientModal = ({ isOpen, onClose }: AddPatientModalProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        birthDate: '',
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await createPatient(formData);

        setLoading(false);
        if (result.success) {
            onClose();
            setFormData({
                name: '',
                lastName: '',
                phone: '',
                email: '',
                birthDate: '',
            });
        } else {
            alert(result.error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>Ficha de Nuevo Paciente</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>NOMBRE</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nombre del paciente"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>APELLIDOS</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Apellidos"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>TELÉFONO</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="600 000 000"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>EMAIL (OPCIONAL)</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ejemplo@correo.com"
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>FECHA DE NACIMIENTO</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Guardando...' : 'Crear Paciente'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPatientModal;
