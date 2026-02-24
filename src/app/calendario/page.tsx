import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import styles from '../page.module.css';
import { getAppointments } from './actions';
import { getPatients } from '../pacientes/actions';

export default async function Calendario() {
    const [appointments, patients] = await Promise.all([
        getAppointments(),
        getPatients(),
    ]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Calendario de Citas</h1>
                    <p className={styles.subtitle}>Gestiona tus pacientes y horarios de forma eficiente.</p>
                </div>
            </header>

            <main style={{ marginTop: '32px', height: 'calc(100vh - 250px)' }}>
                <Calendar initialAppointments={appointments} patients={patients} />
            </main>
        </div>
    );
}
