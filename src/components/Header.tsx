"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

const Header = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Simulated logout
        router.push('/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles.userInfo}>
                <span className={styles.avatar}>👤</span>
                <span className={styles.name}>Dra. Elena</span>
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>
                <span className={styles.icon}>🚪</span>
                Salir
            </button>
        </header>
    );
};

export default Header;
