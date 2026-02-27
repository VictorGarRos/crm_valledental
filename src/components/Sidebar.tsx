"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const pathname = usePathname();
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

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling the dropdown when clicking logout
    localStorage.removeItem('username');
    router.push('/login');
  };

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

      <div style={{ position: 'relative' }} ref={dropdownRef}>
        <button
          className={styles.userProfile}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className={styles.avatar}>👤</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{userName}</p>
            <p className={styles.userRole}>Usuario</p>
          </div>
        </button>

        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <span className={styles.icon}>←</span>
              Salir
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
