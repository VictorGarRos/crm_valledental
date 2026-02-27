"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const pathname = usePathname();
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setUserName(storedName.charAt(0).toUpperCase() + storedName.slice(1));
    }
  }, []);

  const menuItems = [
    { name: 'Panel', icon: '📊', path: '/' },
    { name: 'Calendario', icon: '📅', path: '/calendario' },
    { name: 'Pacientes', icon: '👤', path: '/pacientes' },
    { name: 'Ajustes', icon: '⚙️', path: '/ajustes' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Image
          src="/logo.png"
          alt="Valledental Logo"
          width={180}
          height={60}
          className={styles.logoImage}
          priority
        />
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <p className={styles.sectionTitle}>PRINCIPAL</p>
          <ul>
            {menuItems.slice(0, 2).map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.navSection}>
          <p className={styles.sectionTitle}>GESTIÓN</p>
          <ul>
            {menuItems.slice(2, 3).map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.navSection}>
          <p className={styles.sectionTitle}>SISTEMA</p>
          <ul>
            {menuItems.slice(3).map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className={styles.userProfile}>
        <div className={styles.avatar}>👤</div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{userName}</p>
          <p className={styles.userRole}>Usuario</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
