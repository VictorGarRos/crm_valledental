"use client";

import React, { useState, useEffect } from 'react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    eachDayOfInterval
} from 'date-fns';
import { es } from 'date-fns/locale';
import styles from './Calendar.module.css';
import { createAppointment } from '@/app/calendario/actions';

interface Patient {
    id: string;
    name: string;
    lastName: string;
    phone: string;
}

interface Appointment {
    id: string;
    date: Date;
    patient: Patient;
    type: string;
    status: string;
}

interface CalendarProps {
    initialAppointments: any[];
    patients: any[];
}

const Calendar = ({ initialAppointments, patients }: CalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newAppt, setNewAppt] = useState({
        patientId: '',
        type: 'Consulta General',
        time: '09:00'
    });

    // Initialize/Sync appointments
    useEffect(() => {
        setAppointments(initialAppointments.map(a => ({
            ...a,
            date: new Date(a.date)
        })));
    }, [initialAppointments]);

    const renderHeader = () => {
        return (
            <div className={styles.header}>
                <div className={styles.currentMonth}>
                    {format(currentMonth, 'MMMM yyyy', { locale: es }).toUpperCase()}
                </div>
                <div className={styles.navButtons}>
                    <button className={styles.navBtn} onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                        ‹
                    </button>
                    <button className={styles.navBtn} onClick={() => setCurrentMonth(new Date())}>
                        Hoy
                    </button>
                    <button className={styles.navBtn} onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                        ›
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        return (
            <div className={styles.daysHeader}>
                {days.map((day, i) => (
                    <div key={i} className={styles.dayName}>{day}</div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const daysInterval = eachDayOfInterval({ start: startDate, end: endDate });

        return (
            <div className={styles.daysGrid}>
                {daysInterval.map((d, i) => {
                    const isToday = isSameDay(d, new Date());
                    const isCurrentMonth = isSameMonth(d, monthStart);

                    const dayAppointments = appointments.filter(appt => isSameDay(appt.date, d));

                    return (
                        <div
                            key={i}
                            className={`${styles.dayCell} ${!isCurrentMonth ? styles.otherMonth : ''} ${isToday ? styles.today : ''}`}
                            onClick={() => {
                                setSelectedDate(d);
                                setShowModal(true);
                            }}
                        >
                            <span className={styles.dayNumber}>{format(d, dateFormat)}</span>
                            <div className={styles.appointmentsList}>
                                {dayAppointments.slice(0, 3).map(appt => (
                                    <div key={appt.id} className={`${styles.appointmentItem} ${appt.type === 'Urgencia' ? styles.urgent : ''}`}>
                                        {format(appt.date, 'HH:mm')} {appt.patient.name}
                                    </div>
                                ))}
                                {dayAppointments.length > 3 && (
                                    <div style={{ fontSize: '10px', color: '#95a5a6', paddingLeft: '8px' }}>
                                        + {dayAppointments.length - 3} más
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const handleAddAppointment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newAppt.patientId) {
            alert("Por favor selecciona un paciente.");
            return;
        }

        const [hours, minutes] = newAppt.time.split(':');
        const appointmentDate = new Date(selectedDate);
        appointmentDate.setHours(parseInt(hours), parseInt(minutes));

        const result = await createAppointment({
            date: appointmentDate,
            type: newAppt.type,
            patientId: newAppt.patientId,
        });

        if (result.success) {
            setShowModal(false);
            setNewAppt({ patientId: '', type: 'Consulta General', time: '09:00' });
        } else {
            alert("Error al crear la cita: " + result.error);
        }
    };

    return (
        <div className={styles.calendarContainer}>
            {renderHeader()}
            {renderDays()}
            {renderCells()}

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3 className={styles.modalTitle}>Nueva Cita - {format(selectedDate, 'PPP', { locale: es })}</h3>
                        <form onSubmit={handleAddAppointment}>
                            <div className={styles.formField}>
                                <label className={styles.label}>Paciente</label>
                                <select
                                    className={styles.select}
                                    required
                                    value={newAppt.patientId}
                                    onChange={e => setNewAppt({ ...newAppt, patientId: e.target.value })}
                                >
                                    <option value="">Seleccionar paciente...</option>
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{p.name} {p.lastName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formField} style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: 1 }}>
                                    <label className={styles.label}>Hora</label>
                                    <input
                                        type="time"
                                        className={styles.input}
                                        required
                                        value={newAppt.time}
                                        onChange={e => setNewAppt({ ...newAppt, time: e.target.value })}
                                    />
                                </div>
                                <div style={{ flex: 2 }}>
                                    <label className={styles.label}>Tipo de Cita</label>
                                    <select
                                        className={styles.select}
                                        value={newAppt.type}
                                        onChange={e => setNewAppt({ ...newAppt, type: e.target.value })}
                                    >
                                        <option>Consulta General</option>
                                        <option>Limpieza</option>
                                        <option>Ortodoncia</option>
                                        <option>Urgencia</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.btnRow}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.saveBtn}>
                                    Guardar Cita
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
