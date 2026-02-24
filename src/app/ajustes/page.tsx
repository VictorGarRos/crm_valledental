"use client";

import styles from "../page.module.css";

export default function Ajustes() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Ajustes</h1>
                    <p>Configuración básica de la aplicación.</p>
                </div>
            </header>

            <section style={{
                background: 'white',
                padding: '32px',
                borderRadius: '24px',
                marginTop: '24px',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ marginBottom: '16px' }}>Preferencias de Notificación</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <input type="checkbox" id="whatsapp" defaultChecked />
                        <label htmlFor="whatsapp">Recordatorios de WhatsApp automáticos</label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input type="checkbox" id="email" />
                        <label htmlFor="email">Notificaciones por Email</label>
                    </div>
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px' }}>Información de la Clínica</h3>
                    <p style={{ color: '#7f8c8d', fontSize: '14px' }}>Clínica Valledental Lucena</p>
                    <p style={{ color: '#7f8c8d', fontSize: '14px' }}>Dirección: Calle Ejemplo, 1, Lucena</p>
                </div>
            </section>
        </div>
    );
}
