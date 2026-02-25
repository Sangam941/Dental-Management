import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Stethoscope,
    UserCheck,
    Activity,

    TrendingUp,
    ChevronDown
} from 'lucide-react';

import { DUMMY_DOCTORS as initialDoctors, DEPARTMENTS_LIST } from '../../../data/dummyData';
import { useDoctorStore } from '../../../store/doctorStore';


const departments = ['All Departments', ...DEPARTMENTS_LIST];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'On Duty': return 'bg-emerald-500';
        case 'Off Duty': return 'bg-slate-400';
        case 'Break': return 'bg-amber-500';
        case 'On Call': return 'bg-purple-500';
        default: return 'bg-slate-300';
    }
};

const ManageDoctors: React.FC = () => {

    // zustand store 
    const { doctors, isLoading, fetchDoctors } = useDoctorStore();
    const [selectedDept, setSelectedDept] = useState('All Departments');
    const [searchQuery, setSearchQuery] = useState('');
    const [doctorList, setDoctorList] = useState(initialDoctors);

    const toggleActiveStatus = (id: string) => {
        setDoctorList(prev => prev.map(doc =>
            doc.id === id ? { ...doc, isActive: !doc.isActive } : doc
        ));
    };

    const filteredDoctors = doctors?.filter(doc => {
        const matchesDept = selectedDept === 'All Departments' || doc.dept === selectedDept;
        const matchesSearch =
            doc.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.email?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDept && matchesSearch;
    });

    // Dynamic stats derived from data
    const totalDoctors = doctors?.length;
    const activeDoctors = doctors?.filter(d => d.isActive).length;
    const uniqueDepts = new Set(doctors?.map(d => d.dept)).size;

    const stats = [
        { title: 'Total Doctors', count: String(totalDoctors), icon: Stethoscope, trend: '+5%', color: 'blue' },
        { title: 'Active Doctors', count: String(activeDoctors), icon: UserCheck, trend: '+3%', color: 'emerald' },
        { title: 'Departments', count: String(uniqueDepts), icon: Activity, trend: '+2%', color: 'amber' }
    ];


    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 bg-admin-bg min-h-screen">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black text-admin-text tracking-tight">Manage Doctors</h1>
                    <p className="text-admin-text-muted text-sm mt-1">Overview of all registered doctors and their specializations</p>
                </div>
                <Link
                    to="/admin/manage-doctors/add-doctor"
                    className="flex items-center gap-2 px-5 py-2.5 bg-admin-primary text-white rounded-xl shadow-lg shadow-admin-primary/20 hover:bg-admin-primary-hover transition-all font-bold text-sm"
                >
                    <Plus size={18} strokeWidth={3} />
                    Add New Doctor
                </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm flex flex-col justify-between group hover:border-admin-primary/30 transition-all cursor-default relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon size={22} />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                <TrendingUp size={10} />
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-admin-text-muted mb-1">{stat.title}</p>
                            <h3 className="text-2xl font-black text-admin-text leading-none">{stat.count}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-admin-border shadow-sm">
                <div className="relative w-full lg:w-64">
                    <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="w-full pl-4 pr-10 py-2.5 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all appearance-none cursor-pointer"
                    >
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" size={16} />
                </div>
                <div className="relative w-full lg:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-faint" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, ID, specialization..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-3xl border border-admin-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-white border-b border-admin-border-subtle">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Doctor</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Department</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Contact</th>
                                <th className="px-6 py-5 text-center text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Active</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border-subtle">
                            {filteredDoctors.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2 text-admin-text-faint">
                                            <Stethoscope size={32} className="opacity-30" />
                                            <p className="text-sm font-bold">No doctors found</p>
                                            <p className="text-xs">Try adjusting your filters or search query</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredDoctors.map((doctor, idx) => (
                                    <tr key={idx} className="hover:bg-admin-surface/30 transition-colors">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={'/images/admin/default-profile.webp'}
                                                    alt={doctor.name}
                                                    className="w-10 cursor-pointer h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                                                />
                                                <div>
                                                    <h4 className="text-sm font-bold text-admin-text">{doctor.fullName}</h4>
                                                    <p className="text-[10px] font-bold text-admin-text-faint">ID: {doctor.id}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-admin-text-muted">{doctor.department?.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-xs font-bold text-admin-text">{doctor.phoneNumber}</p>
                                                <p className="text-[10px] font-bold text-admin-text-faint">{doctor.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <div
                                                    onClick={() => toggleActiveStatus(doctor.id)}
                                                     >
                                                    <div className={`py-1 px-2 rounded-full cursor-pointer transition-colors ${doctor.isActive ? 'bg-green-200 text-green-900 border border-green-500' : 'bg-slate-200 border border-slate-500'} text-xs font-bold text-admin-text`}>{doctor.isActive ? 'Active' : 'Inactive'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-admin-text-faint hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
                                                    <Pencil size={16} />
                                                </button>
                                                <button className="p-2 text-admin-text-faint hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="px-8 py-5 border-t border-admin-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-bold text-admin-text-muted">
                        Showing <span className="text-admin-text">1-{filteredDoctors.length}</span> of <span className="text-admin-text">{doctorList.length}</span> doctors
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button className="px-3 py-1.5 border border-admin-border rounded-lg text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all">
                            Previous
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-admin-primary text-white rounded-lg text-xs font-black shadow-sm shadow-admin-primary/20">
                            1
                        </button>
                        <button className="px-3 py-1.5 border border-admin-border rounded-lg text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageDoctors;
