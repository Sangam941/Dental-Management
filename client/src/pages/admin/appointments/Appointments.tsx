import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Calendar,
    User,
    Clock,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { DUMMY_APPOINTMENTS as appointmentData } from '../../../data/dummyData.ts';

const Appointments: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Completed': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case 'Urgent': return 'text-amber-600 bg-amber-50';
            case 'Emergency': return 'text-rose-600 bg-rose-50';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    return (
        <div className="px-8 py-8 space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl admin-title">Appointment Directory</h1>
                    <p className="text-admin-text-muted font-medium">Manage and schedule patient visits.</p>
                </div>
                <Link
                    to="/admin/appointment/add-appointment"
                    className="flex items-center gap-2 px-6 py-3 admin-button-primary shadow-lg shadow-blue-100 text-sm font-bold"
                >
                    <Plus size={18} strokeWidth={3} />
                    Book Appointment
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Today\'s Appointments', value: '24', icon: <Calendar className="text-blue-500" />, trend: '+4 from yesterday' },
                    { label: 'Pending Requests', value: '12', icon: <Clock className="text-amber-500" />, trend: 'Needs immediate action' },
                    { label: 'Completed Today', value: '18', icon: <User className="text-emerald-500" />, trend: '75% completion rate' },
                    { label: 'Cancelled Today', value: '02', icon: <Trash2 className="text-rose-500" />, trend: '-5% from yesterday' },
                ].map((stat, i) => (
                    <div key={i} className="admin-card p-6 flex items-start justify-between group hover:border-admin-primary/30 transition-all cursor-pointer">
                        <div className="space-y-2">
                            <p className="text-xs font-black text-admin-text-muted uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-3xl font-black text-admin-text">{stat.value}</h3>
                            <p className="text-[10px] font-bold text-admin-text-faint">{stat.trend}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-admin-surface transition-colors">
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Section */}
            <div className="admin-card overflow-hidden">
                {/* Filters Header */}
                <div className="p-6 border-b border-admin-border flex flex-col lg:flex-row justify-between gap-6 bg-slate-50/30">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative group">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-faint group-focus-within:text-admin-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by patient or doctor..."
                                className="admin-input pl-11 min-w-[320px] bg-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex bg-white p-1 rounded-xl border border-admin-border shadow-sm">
                            {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${statusFilter === status
                                        ? 'bg-admin-primary text-white'
                                        : 'text-admin-text-muted hover:bg-slate-50'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-2 border-2 border-admin-border rounded-xl text-xs font-bold text-admin-text-muted hover:bg-white hover:border-admin-primary/30 transition-all shadow-sm">
                        <Filter size={16} />
                        Advanced Filters
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-admin-text-muted uppercase tracking-widest border-b border-admin-border">Appointment ID</th>
                                <th className="px-6 py-4 text-[10px] font-black text-admin-text-muted uppercase tracking-widest border-b border-admin-border">Patient</th>
                                <th className="px-6 py-4 text-[10px] font-black text-admin-text-muted uppercase tracking-widest border-b border-admin-border">Doctor & Dept</th>
                                <th className="px-6 py-4 text-[10px] font-black text-admin-text-muted uppercase tracking-widest border-b border-admin-border">Schedule</th>
                                <th className="px-6 py-4 text-[10px] font-black text-admin-text-muted uppercase tracking-widest border-b border-admin-border">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-admin-text-muted uppercase tracking-widest border-b border-admin-border text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border">
                            {appointmentData.map((app) => (
                                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <span className="text-sm font-black text-admin-primary">{app.id}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-admin-primary font-black text-xs uppercase">
                                                {app.patient.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-admin-text">{app.patient}</p>
                                                <p className="text-[10px] font-bold text-admin-text-muted capitalize">{app.gender}, {app.age} yrs • {app.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div>
                                            <p className="text-sm font-bold text-admin-text">{app.doctor}</p>
                                            <p className="text-[10px] font-black text-admin-primary uppercase tracking-tighter">{app.department}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-admin-text">
                                                <Calendar size={12} className="text-admin-text-faint" />
                                                {app.date}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-admin-text-muted uppercase">
                                                <Clock size={12} className="text-admin-text-faint" />
                                                {app.time}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusStyle(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-admin-primary hover:bg-blue-50 rounded-lg transition-all" title="View Details">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Cancel">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-admin-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
                    <p className="text-xs font-bold text-admin-text-faint uppercase tracking-widest">
                        Showing <span className="text-admin-text">1 to 4</span> of 24 appointments
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 border border-admin-border rounded-xl text-admin-text-faint hover:text-admin-primary hover:border-admin-primary/30 hover:bg-white transition-all disabled:opacity-50" disabled>
                            <ChevronLeft size={18} />
                        </button>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4].map((page) => (
                                <button
                                    key={page}
                                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${page === 1
                                        ? 'bg-admin-primary text-white shadow-lg shadow-blue-200'
                                        : 'text-admin-text-muted hover:bg-white hover:border-admin-border'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button className="p-2 border border-admin-border rounded-xl text-admin-text-faint hover:text-admin-primary hover:border-admin-primary/30 hover:bg-white transition-all">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
