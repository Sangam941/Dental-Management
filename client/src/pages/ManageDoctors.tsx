import React from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Filter,
    Phone,
    Mail,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const doctors = [
    {
        name: 'Dr. Sarah Johnson',
        joined: 'Jan 2023',
        specialty: 'Cardiology',
        dept: 'Heart Center',
        contact: '+91 98765 12345',
        email: 'sarah.j@healthfirst.com',
        nmc: 'NMC-8821-AZ',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ca197ec2?auto=format&fit=crop&q=80&w=100'
    },
    {
        name: 'Dr. Amit Patel',
        joined: 'Mar 2022',
        specialty: 'Neurology',
        dept: 'Neurosciences Dept',
        contact: '+91 99887 76655',
        email: 'amit.patel@healthfirst.com',
        nmc: 'NMC-1092-BB',
        status: 'On Leave',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100'
    },
    {
        name: 'Dr. Emily Chen',
        joined: 'Dec 2021',
        specialty: 'Pediatrics',
        dept: 'Child Care Unit',
        contact: '+91 88776 65544',
        email: 'emily.c@healthfirst.com',
        nmc: 'NMC-3341-XY',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100'
    },
    {
        name: 'Dr. Robert Fox',
        joined: 'Aug 2020',
        specialty: 'Orthopedics',
        dept: 'Surgery Dept',
        contact: '+91 77665 54433',
        email: 'robert.fox@healthfirst.com',
        nmc: 'NMC-5592-OP',
        status: 'Inactive',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100'
    }
];

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'Active':
            return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        case 'On Leave':
            return 'bg-amber-50 text-amber-600 border-amber-100';
        case 'Inactive':
            return 'bg-slate-100 text-slate-500 border-slate-200';
        default:
            return 'bg-slate-50 text-slate-500 border-slate-100';
    }
};

const ManageDoctors: React.FC = () => {
    return (
        <div className="p-4 lg:p-8 max-w-[1400px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
                <div>
                    <h1 className="text-2xl lg:text-3xl admin-title">Manage Doctors</h1>
                    <p className="text-admin-text-muted mt-1 font-medium text-xs lg:text-sm">View and manage the list of registered medical practitioners.</p>
                </div>
                <Link
                    to="/admin/manage-doctors/add-doctor"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 admin-button-primary text-sm"
                >
                    <Plus size={18} />
                    Add New Doctor
                </Link>
            </div>

            {/* Filter Bar */}
            <div className="admin-card p-4 flex flex-col xl:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-faint group-focus-within:text-admin-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search name, NMC, or email..."
                        className="admin-input pl-11"
                    />
                </div>
                <div className="flex flex-wrap lg:flex-nowrap gap-3 w-full xl:w-auto">
                    <select className="flex-1 min-w-[140px] xl:w-56 px-4 py-3 border border-admin-border bg-admin-surface rounded-xl text-xs sm:text-sm font-bold text-admin-text-muted focus:outline-none focus:ring-2 focus:ring-admin-primary/20 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat">
                        <option>All Departments</option>
                        <option>Cardiology</option>
                        <option>Neurology</option>
                    </select>
                    <select className="flex-1 min-w-[120px] xl:w-48 px-4 py-3 border border-admin-border bg-admin-surface rounded-xl text-xs sm:text-sm font-bold text-admin-text-muted focus:outline-none focus:ring-2 focus:ring-admin-primary/20 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat">
                        <option>All Statuses</option>
                        <option>Active</option>
                        <option>On Leave</option>
                    </select>
                    <button className="p-3 admin-button-secondary rounded-xl text-admin-text-muted hover:text-admin-primary hover:border-admin-primary/30">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="admin-card overflow-hidden">
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full border-collapse min-w-[1300px]">
                        <thead>
                            <tr className="admin-table-head">
                                <th className="px-8 py-5 text-left font-black">Profile</th>
                                <th className="px-6 py-5 text-left font-black">Specialty & Dept</th>
                                <th className="px-6 py-5 text-left font-black">Contact Info</th>
                                <th className="px-6 py-5 text-left font-black">NMC Number</th>
                                <th className="px-6 py-5 text-left font-black">Status</th>
                                <th className="px-8 py-5 text-right font-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {doctors.map((doctor, index) => (
                                <tr key={index} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                                                />
                                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${doctor.status === 'Active' ? 'bg-emerald-500' : doctor.status === 'On Leave' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-admin-text leading-tight whitespace-nowrap">{doctor.name}</h4>
                                                <p className="text-[11px] text-admin-text-faint font-bold mt-0.5 tracking-tight uppercase">Joined {doctor.joined}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <h4 className="text-sm font-bold text-admin-text whitespace-nowrap">{doctor.specialty}</h4>
                                        <p className="text-[11px] text-admin-text-faint font-bold uppercase tracking-tight">{doctor.dept}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold whitespace-nowrap">
                                                <Phone size={12} className="text-slate-400" />
                                                {doctor.contact}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold whitespace-nowrap">
                                                <Mail size={12} className="text-slate-400" />
                                                {doctor.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-600 tracking-tight">
                                            {doctor.nmc}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider w-fit inline-flex items-center gap-1.5 ${getStatusStyles(doctor.status)}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${doctor.status === 'Active' ? 'bg-emerald-500' : doctor.status === 'On Leave' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                                            {doctor.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
                                                <Pencil size={18} />
                                            </button>
                                            <button className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-4 bg-admin-surface/30 border-t border-admin-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-admin-text-muted font-bold">
                        Showing <span className="text-admin-text">1 to 4</span> of <span className="text-admin-text">48</span> results
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button className="p-2 border border-admin-border rounded-xl text-admin-text-muted hover:bg-white hover:text-admin-primary hover:border-admin-primary/30 disabled:opacity-50 transition-all cursor-pointer mr-2">
                            <ChevronLeft size={18} />
                        </button>
                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer border ${page === 1 ? 'bg-admin-primary text-white border-admin-primary shadow-md shadow-admin-primary/20' : 'text-admin-text-muted hover:bg-white hover:border-admin-border border-transparent'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <span className="text-slate-300 font-black px-1.5 text-xs">...</span>
                        <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer ml-2">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageDoctors;
