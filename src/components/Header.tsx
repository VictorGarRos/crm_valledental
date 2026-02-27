"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

interface HeaderProps {
    onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const router = useRouter();
    const [userName, setUserName] = useState('Usuario');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedName = localStorage.getItem('username');
        if (storedName) {
            setUserName(storedName.charAt(0).toUpperCase() + storedName.slice(1));
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        router.push('/login');
    };

    return (
        <header className={styles.header}>
            <button className={styles.menuBtn} onClick={onMenuClick}>
                ☰
            </button>
            <div className={styles.userContainer} ref={dropdownRef}>
                <button
                    className={styles.userProfileBtn}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>{userName}</p>
                        <p className={styles.userRole}>Usuario</p>
                    </div>
                    <div className={styles.avatar}>👤</div>
                </button>

                {isDropdownOpen && (
                    <div className={styles.dropdown}>
                        <button className={styles.logoutBtn} onClick={handleLogout}>
                            <span className={styles.icon}>🚪</span>
                            Salir
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
