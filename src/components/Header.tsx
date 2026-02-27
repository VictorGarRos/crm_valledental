"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

interface HeaderProps {
    onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('username');
        router.push('/login');
    };

    return (
        <header className={styles.header}>
            <button className={styles.menuBtn} onClick={onMenuClick}>
                ☰
            </button>
            <button className={styles.logoutBtn} onClick={handleLogout}>
                <span className={styles.icon}>←</span>
                Salir
            </button>
        </header>
    );
};

export default Header;
