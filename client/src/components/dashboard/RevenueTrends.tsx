import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import {
    DUMMY_WEEKLY_REVENUE as weeklyData,
    DUMMY_MONTHLY_REVENUE as monthlyData
} from '../../data/dummyData';

/* ─── Custom Tooltip ─────────────────────────────────── */
interface TooltipProps {
    active?: boolean;
    payload?: Array<{ value: number; dataKey: string; color: string }>;
    label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-admin-border rounded-xl shadow-xl p-3 min-w-[160px]">
            <p className="text-[10px] font-black text-admin-text-muted uppercase tracking-widest mb-2">{label}</p>
            {payload.map((entry) => (
                <div key={entry.dataKey} className="flex items-center justify-between gap-4 mb-1">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-admin-text-muted capitalize">
                        <span
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ backgroundColor: entry.color }}
                        />
                        {entry.dataKey}
                    </span>
                    <span className="text-xs font-black text-admin-text">
                        Rs. {entry.value.toLocaleString('en-IN')}
                    </span>
                </div>
            ))}
        </div>
    );
};

/* ─── Component ──────────────────────────────────────── */
const RevenueTrends: React.FC = () => {
    const [period, setPeriod] = useState<'7days' | 'monthly'>('7days');
    const data = period === '7days' ? weeklyData : monthlyData;

    return (
        <div className="admin-card p-6 col-span-1 lg:col-span-2">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg admin-title">Revenue Trends</h3>
                    <p className="text-admin-text-muted text-[10px] font-bold mt-0.5 uppercase tracking-tight opacity-70">
                        Revenue vs Expenses
                    </p>
                </div>

                {/* Period Toggle */}
                <div className="flex gap-1.5 bg-admin-surface p-1 rounded-xl border border-admin-border">
                    {(['7days', 'monthly'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${period === p
                                ? 'bg-white text-admin-primary shadow-sm border border-admin-border'
                                : 'text-admin-text-muted hover:text-admin-text'
                                }`}
                        >
                            {p === '7days' ? '7 Days' : 'Monthly'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex gap-5 mb-4">
                {[
                    { label: 'Revenue', color: '#137fec' },
                    { label: 'Expenses', color: '#f59e0b' },
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-black text-admin-text-muted uppercase tracking-widest">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#137fec" stopOpacity={0.18} />
                            <stop offset="95%" stopColor="#137fec" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="#f1f5f9"
                    />

                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8', letterSpacing: '0.05em' }}
                        dy={8}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                        tickFormatter={(v) =>
                            v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
                        }
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />

                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#137fec"
                        strokeWidth={2.5}
                        fill="url(#gradRevenue)"
                        dot={false}
                        activeDot={{ r: 5, fill: '#137fec', stroke: 'white', strokeWidth: 2 }}
                    />

                    <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        fill="url(#gradExpenses)"
                        dot={false}
                        activeDot={{ r: 5, fill: '#f59e0b', stroke: 'white', strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueTrends;
