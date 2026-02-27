"use client";

import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
    onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <button className={styles.menuBtn} onClick={onMenuClick}>
                ☰
            </button>
        </header>
    );
};

export default Header;
