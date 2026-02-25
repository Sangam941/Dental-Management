import React from 'react';
import { Plus, Download } from 'lucide-react';
import DashboardStats from '../../../components/dashboard/DashboardStats';
import RevenueTrends from '../../../components/dashboard/RevenueTrends';
import DepartmentSales from '../../../components/dashboard/DepartmentSales';
import RecentActivity from '../../../components/dashboard/RecentActivity';

const AdminDashboard: React.FC = () => {
    
    return (
        <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
            {/* Overview Statistics Section */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 px-2">
                    <div>
                        <h2 className="text-lg lg:text-2xl admin-title">Overview Statistics</h2>
                        <p className="text-admin-text-muted text-[9px] font-bold uppercase tracking-widest mt-0.5">Key Performance Values</p>
                    </div>
                    <div className="flex gap-2 lg:gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm uppercase tracking-wider">
                            <Download size={14} />
                            <span>Export</span>
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 admin-button-primary uppercase tracking-wider text-sm">
                            <Plus size={14} />
                            New Record
                        </button>
                    </div>
                </div>
                <DashboardStats />
            </div>

            {/* Middle Grid: Revenue Trends & Department Sales */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <RevenueTrends />
                <DepartmentSales />
            </div>

            {/* Bottom: Recent Activity */}
            <RecentActivity />
        </div>
    );
};

export default AdminDashboard;
