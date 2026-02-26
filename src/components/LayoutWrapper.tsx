"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
                <Sidebar />
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="mobile-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 998,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            <div style={{
                flex: 1,
                marginLeft: 'var(--sidebar-width, 260px)',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                transition: 'margin-left 0.3s ease'
            }} className="main-content">
                <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main style={{
                    padding: '40px',
                    minHeight: 'calc(100vh - 60px)',
                    background: 'var(--background)'
                }}>
                    <div className="mobile-padding-container">
                        {children}
                    </div>
                </main>
            </div>

            <style jsx global>{`
                :root {
                    --sidebar-width: 260px;
                }
                
                .sidebar-container {
                    position: fixed;
                    left: 0;
                    top: 0;
                    height: 100vh;
                    width: var(--sidebar-width);
                    z-index: 1000;
                    transition: transform 0.3s ease;
                }

                @media (max-width: 1024px) {
                    :root {
                        --sidebar-width: 0px;
                    }
                    .sidebar-container {
                        transform: translateX(-100%);
                        width: 260px;
                    }
                    .sidebar-container.open {
                        transform: translateX(0);
                    }
                    .main-content {
                        margin-left: 0 !important;
                    }
                    .mobile-padding-container {
                        padding: 0;
                    }
                }

                @media (max-width: 768px) {
                    main {
                        padding: 20px !important;
                    }
                }
            `}</style>
        </div>
    );
}
