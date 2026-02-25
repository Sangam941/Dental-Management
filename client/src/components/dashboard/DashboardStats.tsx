import React from 'react';
import {
    Users,
    Banknote,
    Stethoscope,
    TrendingUp,
    TrendingDown,
    PlusSquare,
    CheckCircle2
} from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    subtext?: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    status?: {
        label: string;
        sublabel: string;
        type: 'success' | 'warning' | 'info';
    };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, subtext, icon, iconBg, iconColor, status }) => {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-admin-text-muted text-[10px] font-bold uppercase tracking-widest">{title}</h3>
                    <p className="text-xl admin-title mt-0.5">{value}</p>
                </div>
                <div className={`p-3 rounded-2xl ${iconBg} ${iconColor} transition-transform group-hover:scale-110 duration-300`}>
                    {icon}
                </div>
            </div>

            {trend && (
                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${trend.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {trend.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {trend.value}
                    </div>
                    <span className="text-admin-text-muted text-[10px] font-bold uppercase tracking-tight">{subtext}</span>
                </div>
            )}

            {status && (
                <div className="flex items-start gap-4">
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-slate-300 text-2xl font-light">/</span>
                        <p className="text-admin-text-muted text-xs font-bold -mt-2">142</p>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                            <CheckCircle2 size={16} className="text-emerald-500" />
                            <div>
                                <p className="text-[10px] font-black text-emerald-700 leading-none">{status.label}</p>
                                <p className="text-[9px] font-bold text-emerald-600/70 mt-0.5 tracking-tight">{status.sublabel}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

import { DUMMY_DASHBOARD_STATS } from '../../data/dummyData';

const DashboardStats: React.FC = () => {
    const getIcon = (title: string) => {
        switch (title) {
            case "Total Doctors": return <PlusSquare size={22} />;
            case "Total Revenue": return <Banknote size={22} />;
            case "Total Patients (OPD)": return <Users size={22} />;
            case "Active Doctors": return <Stethoscope size={22} />;
            default: return <PlusSquare size={22} />;
        }
    };

    const getColors = (color: string) => {
        switch (color) {
            case "blue": return { bg: "bg-blue-50", text: "text-blue-500" };
            case "emerald": return { bg: "bg-emerald-50", text: "text-emerald-500" };
            case "purple": return { bg: "bg-purple-50", text: "text-purple-500" };
            case "amber": return { bg: "bg-amber-50", text: "text-amber-500" };
            default: return { bg: "bg-blue-50", text: "text-blue-500" };
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUMMY_DASHBOARD_STATS.map((stat, idx) => {
                const colors = getColors(stat.color || 'blue');
                return (
                    <StatCard
                        key={idx}
                        title={stat.title}
                        value={stat.value}
                        trend={stat.trend}
                        subtext={stat.subtext}
                        icon={getIcon(stat.title)}
                        iconBg={colors.bg}
                        iconColor={colors.text}
                        status={stat.status as any}
                    />
                );
            })}
        </div>
    );
};

export default DashboardStats;
