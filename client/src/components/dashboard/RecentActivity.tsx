import React from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

const activities = [
    {
        id: 'OPD-2023-1024',
        patient: 'Amit Sharma',
        avatar: 'AS',
        dept: 'General',
        doctor: 'Dr. Verma',
        amount: 'Rs. 500',
        status: 'Completed'
    },
    {
        id: 'OPD-2023-1025',
        patient: 'Priya Singh',
        avatar: 'PS',
        dept: 'Endocrinology',
        doctor: 'Dr. Mehra',
        amount: 'Rs. 1,250',
        status: 'Completed'
    },
    {
        id: 'OPD-2023-1026',
        patient: 'Rakesh Gupta',
        avatar: 'RG',
        dept: 'Radiology',
        doctor: 'Dr. Khan',
        amount: 'Rs. 3,500',
        status: 'Pending'
    },
    {
        id: 'OPD-2023-1027',
        patient: 'Suman Devi',
        avatar: 'SD',
        dept: 'Medicine',
        doctor: 'Dr. Verma',
        amount: 'Rs. 150',
        status: 'Completed'
    }
];

const RecentActivity: React.FC = () => {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-slate-50">
                <h3 className="text-lg admin-title">Recent Activity</h3>
                <div className="flex items-center gap-4">
                    <select className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-admin-text-muted focus:outline-none appearance-none pr-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2364748b%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.8rem_0.8rem] bg-[right_0.6rem_center] bg-no-repeat cursor-pointer">
                        <option>All Dept</option>
                        <option>General</option>
                        <option>Cardiology</option>
                    </select>
                    <button className="flex items-center gap-1 text-admin-primary text-[10px] font-black uppercase tracking-widest hover:gap-1.5 transition-all">
                        View All <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 text-[10px] font-black text-admin-text-muted uppercase tracking-widest border-b border-slate-50">
                            <th className="px-8 py-4">Transaction / ID</th>
                            <th className="px-8 py-4">Patient Name</th>
                            <th className="px-8 py-4">Department</th>
                            <th className="px-8 py-4">Doctor</th>
                            <th className="px-8 py-4">Amount</th>
                            <th className="px-8 py-4">Status</th>
                            <th className="px-8 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {activities.map((activity) => (
                            <tr key={activity.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-5">
                                    <p className="text-xs font-black text-admin-text leading-none">{activity.id}</p>
                                    <p className="text-[9px] font-bold text-admin-text-muted mt-1 uppercase tracking-tight">System Ref</p>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-admin-primary flex items-center justify-center text-[10px] font-black border border-blue-100">
                                            {activity.avatar}
                                        </div>
                                        <p className="text-sm font-bold text-admin-text">{activity.patient}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="text-xs font-bold text-admin-text-muted">{activity.dept}</span>
                                </td>
                                <td className="px-8 py-5">
                                    <p className="text-xs font-bold text-admin-text">{activity.doctor}</p>
                                </td>
                                <td className="px-8 py-5 font-black text-admin-text text-sm">{activity.amount}</td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${activity.status === 'Completed'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                        {activity.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                                        <ArrowUpRight size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentActivity;
