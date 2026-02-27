"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = React.useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('username', username);
        router.push('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.overlay}></div>


            <div className={styles.loginContent}>
                <div className={styles.logoCircle}>V</div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <span className={styles.inputIcon}>👤</span>
                        <input
                            type="text"
                            placeholder="Usuario"
                            required
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputWrapper}>
                        <span className={styles.inputIcon}>🔒</span>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            required
                            className={styles.input}
                        />
                    </div>

                    <button type="submit" className={styles.loginBtn}>
                        Log In
                    </button>

                    <a href="#" className={styles.forgotPass}>¿Olvidaste tu contraseña?</a>
                </form>

                <footer className={styles.footer}>
                    <div className={styles.developedBy}>
                        <span className={styles.devText}>DEVELOPED WITH</span>
                        <span className={styles.heartIcon}>⚡️</span>
                        <span className={styles.hulkesText}>BY HULKES</span>
                    </div>
                    <div className={styles.copyright}>
                        © 2026 Hulkes. All rights reserved.
                    </div>
                </footer>
            </div>
        </div>
    );
}
