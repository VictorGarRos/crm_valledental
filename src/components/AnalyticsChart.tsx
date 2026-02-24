"use client";

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import styles from './AnalyticsChart.module.css';

const data = [
    { name: 'Lun', citas: 4 },
    { name: 'Mar', citas: 7 },
    { name: 'Mié', citas: 5 },
    { name: 'Jue', citas: 9 },
    { name: 'Vie', citas: 6 },
    { name: 'Sáb', citas: 3 },
    { name: 'Dom', citas: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltipLabel}>{label}</p>
                <p className={styles.tooltipValue}>{`${payload[0].value} citas`}</p>
            </div>
        );
    }
    return null;
};

const AnalyticsChart = () => {
    return (
        <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Comparación de Citas</h3>
                <div className={styles.legend}>
                    <div className={styles.legendItem}>
                        <span className={styles.dot} style={{ background: '#2ecc71' }}></span>
                        Citas esta semana
                    </div>
                </div>
            </div>

            <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorCitas" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f2f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#95a5a6', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#95a5a6', fontSize: 12, fontWeight: 600 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="citas"
                            stroke="#2ecc71"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorCitas)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsChart;
