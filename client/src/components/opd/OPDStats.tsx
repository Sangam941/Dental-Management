import React from 'react';
import { BarChart3, Banknote, Smartphone, MinusCircle } from 'lucide-react';
import type { OPDStatsData } from '../../types';

interface StatCardProps {
    title: string;
    value: string;
    trend: number;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon }) => {
    const isPositive = trend >= 0;

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
            <div className="flex justify-between items-start">
                <div className={`p-2.5 rounded-xl bg-opacity-10 shrink-0`}>
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'} bg-opacity-10 px-2 py-0.5 rounded-lg border border-current opacity-70`}>
                    {isPositive ? '+' : ''}{trend}%
                </div>
            </div>
            <div>
                <p className="text-admin-text-muted text-[10px] font-bold uppercase tracking-widest">{title}</p>
                <h3 className="text-xl admin-title mt-1">{value}</h3>
            </div>
        </div>
    );
};

interface OPDStatsProps {
    stats: OPDStatsData;
}

const OPDStats: React.FC<OPDStatsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Total Amount"
                value={`Rs. ${stats.totalAmount.toLocaleString('en-IN')}.00`}
                trend={stats.totalTrend}
                icon={<BarChart3 className="w-6 h-6 text-blue-500" />}
            />
            <StatCard
                title="Counter Amt (Cash)"
                value={`Rs. ${stats.counterCash.toLocaleString('en-IN')}.00`}
                trend={stats.cashTrend}
                icon={<Banknote className="w-6 h-6 text-emerald-500" />}
            />
            <StatCard
                title="Online Pay"
                value={`Rs. ${stats.onlinePay.toLocaleString('en-IN')}.00`}
                trend={stats.onlineTrend}
                icon={<Smartphone className="w-6 h-6 text-purple-500" />}
            />
            <StatCard
                title="Total Expenses"
                value={`Rs. ${stats.totalExpenses.toLocaleString('en-IN')}.00`}
                trend={stats.expenseTrend}
                icon={<MinusCircle className="w-6 h-6 text-rose-500" />}
            />
        </div>
    );
};

export default OPDStats;

