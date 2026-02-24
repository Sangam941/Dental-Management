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

const DashboardStats: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Total Doctors"
                value="142"
                trend={{ value: "+5.2%", isPositive: true }}
                subtext="vs last month"
                icon={<PlusSquare size={22} />}
                iconBg="bg-blue-50"
                iconColor="text-blue-500"
            />
            <StatCard
                title="Total Revenue"
                value="Rs. 24,58,400"
                trend={{ value: "+12.5%", isPositive: true }}
                subtext="vs last month"
                icon={<Banknote size={22} />}
                iconBg="bg-emerald-50"
                iconColor="text-emerald-500"
            />
            <StatCard
                title="Total Patients (OPD)"
                value="3,845"
                trend={{ value: "-2.4%", isPositive: false }}
                subtext="vs last month"
                icon={<Users size={22} />}
                iconBg="bg-purple-50"
                iconColor="text-purple-500"
            />
            <StatCard
                title="Active Doctors"
                value="86"
                icon={<Stethoscope size={22} />}
                iconBg="bg-amber-50"
                iconColor="text-amber-500"
                status={{
                    label: "High Avail.",
                    sublabel: "Currently On-Duty",
                    type: 'success'
                }}
            />
        </div>
    );
};

export default DashboardStats;
