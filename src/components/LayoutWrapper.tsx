"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{
                flex: 1,
                marginLeft: '260px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Header />
                <main style={{
                    padding: '40px',
                    minHeight: 'calc(100vh - 60px)',
                    background: 'var(--background)'
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
