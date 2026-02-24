import React from 'react';
import { MoreHorizontal, Heart, Brain, User, MoreVertical } from 'lucide-react';

const departments = [
    { name: 'Cardiology', patients: 245, percentage: 35, color: 'bg-blue-500', icon: <Heart size={16} className="text-blue-500" />, iconBg: 'bg-blue-50' },
    { name: 'Neurology', patients: 180, percentage: 28, color: 'bg-emerald-500', icon: <Brain size={16} className="text-emerald-500" />, iconBg: 'bg-emerald-50' },
    { name: 'General Med', patients: 310, percentage: 22, color: 'bg-amber-500', icon: <User size={16} className="text-amber-500" />, iconBg: 'bg-amber-50' },
    { name: 'Others', patients: 105, percentage: 15, color: 'bg-slate-400', icon: <MoreHorizontal size={16} className="text-slate-500" />, iconBg: 'bg-slate-100' },
];

const DepartmentSales: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6 text-slate-300">
                <div>
                    <h3 className="text-lg admin-title">Department Sales</h3>
                    <p className="text-admin-text-muted text-[10px] font-bold mt-0.5 uppercase tracking-tight opacity-70">Specialty Breakdown</p>
                </div>
                <button className="p-2 text-admin-text-muted hover:text-admin-text transition-colors">
                    <MoreVertical size={18} />
                </button>
            </div>

            <div className="space-y-6">
                {departments.map((dept) => (
                    <div key={dept.name} className="group cursor-pointer">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                                <div className={`p-2.5 rounded-xl ${dept.iconBg} group-hover:scale-110 transition-transform`}>
                                    {dept.icon}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-admin-text leading-none">{dept.name}</h4>
                                    <p className="text-[10px] font-bold text-admin-text-muted mt-1 uppercase tracking-tight">{dept.patients} patients</p>
                                </div>
                            </div>
                            <span className="text-sm font-black text-admin-text">{dept.percentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${dept.color} transition-all duration-1000 ease-out rounded-full opacity-80`}
                                style={{ width: `${dept.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentSales;
