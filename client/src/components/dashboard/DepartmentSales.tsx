import React from 'react';
import { MoreHorizontal, Heart, Brain, User, MoreVertical } from 'lucide-react';

import { DUMMY_DEPT_SALES } from '../../data/dummyData';

const departments = DUMMY_DEPT_SALES.map(dept => ({
    ...dept,
    icon: dept.iconType === 'heart' ? <Heart size={16} className="text-blue-500" /> :
        dept.iconType === 'brain' ? <Brain size={16} className="text-emerald-500" /> :
            dept.iconType === 'user' ? <User size={16} className="text-amber-500" /> :
                <MoreHorizontal size={16} className="text-slate-500" />,
    iconBg: dept.iconType === 'heart' ? 'bg-blue-50' :
        dept.iconType === 'brain' ? 'bg-emerald-50' :
            dept.iconType === 'user' ? 'bg-amber-50' : 'bg-slate-100'
}));

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
