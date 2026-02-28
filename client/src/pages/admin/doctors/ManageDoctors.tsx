import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Stethoscope,
    UserCheck,
    ChevronDown,
    X
} from 'lucide-react';

import { useDoctorStore } from '../../../store/doctorStore';
import type { Doctor } from '../../../types';


const ManageDoctors: React.FC = () => {

    // zustand store 
    const { doctors, fetchDoctors, deleteDoctor, updateDoctor } = useDoctorStore();

    const [selectedDept, setSelectedDept] = useState('All Departments');
    const [selectGender, setSelectGender] = useState('All Gender')
    const [searchQuery, setSearchQuery] = useState('');
    const [gender, setGender] = useState('')

    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [Id, setId] = useState<string>('')

    const [editFullName, setEditFullName] = useState('')
    const [editIsActive, setEditIsActive] = useState(false)
    const [doctorDept, setDoctorDept] = useState('')

    // const toggleActiveStatus = (id: string) => {
    //     setDoctorList(prev => prev.map(doc =>
    //         doc.id === id ? { ...doc, isActive: !doc.isActive } : doc
    //     ));
    // };

    const filteredDoctors = doctors?.filter(doc => {
        const matchesDept = selectedDept === 'All Departments' || doc?.department?.departmentName === selectedDept;
        const matchesSearch =
            doc.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.email?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchGender = selectGender === 'All Gender' || doc.gender === selectGender
        return matchesDept && matchesSearch && matchGender;
    });

    // Dynamic stats derived from data
    const totalDoctors = doctors?.length;
    const activeDoctors = doctors?.filter(d => d.isActive).length;

    const stats = [
        { title: 'Total Doctors', count: String(totalDoctors), icon: Stethoscope, color: 'blue' },
        { title: 'Active Doctors', count: String(activeDoctors), icon: UserCheck, color: 'emerald' },
    ];

    // --- EDIT ---
    const openEditModal = (doctor:Doctor) => {
        setId(doctor.id);
        setEditFullName(doctor.fullName);
        setGender(doctor.gender)
        setEditIsActive(doctor.isActive);
        setDoctorDept(doctor?.department?.departmentName)

        setIsEditModalOpen(true);
    };

    const handleEdit = () => {
        setIsEditModalOpen(false);
        updateDoctor(Id, editFullName, gender, editIsActive);
    };

    // --- DELETE ---
    const openDeleteModal = (id: String) => {
        setId(String(id));
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(false);
        deleteDoctor(Id);
    };



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
                        <div className="flex justify-center items-center mb-4">
                            <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon size={22} />
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <p className="text-xs font-bold text-admin-text-muted mb-1">{stat.title}</p>
                            <h3 className="text-2xl font-black text-admin-text leading-none">{stat.count}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-admin-border shadow-sm">

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
                <div className="relative w-full lg:w-64">
                    <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="w-full pl-4 pr-10 py-2.5 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all appearance-none cursor-pointer"
                    >
                        <option value="All Departments">All Departments</option>
                        {doctors?.map((doctor) => (
                            <option key={doctor?.department?.id} value={doctor?.department?.departmentName}>{doctor?.department?.departmentName}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" size={16} />
                </div>
                <div className="relative w-full lg:w-64">
                    <select
                        value={selectGender}
                        onChange={(e) => setSelectGender(e.target.value)}
                        className="w-full pl-4 pr-10 py-2.5 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all appearance-none cursor-pointer"
                    >
                        <option value="All Gender">All Gender</option>
                        {/* <option key={'Male'} value={'MALE'}>MALE</option> */}
                        <option key={'female'} value={'FEMALE'}>FEMALE</option>
                        <option key={'others'} value={'OTHERS'}>OTHERS</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" size={16} />
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-3xl border border-admin-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-white border-b border-admin-border-subtle">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">S.no.</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Doctor</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Department</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Gender</th>
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
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-admin-text-muted">{idx + 1}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-admin-text-muted">{doctor.fullName}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-admin-text-muted">{doctor.department?.departmentName}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-admin-text-muted">{doctor.gender}</p>
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
                                                >
                                                    <div className={`py-1 px-2 rounded-full cursor-pointer transition-colors ${doctor.isActive ? 'bg-green-200 text-green-900 border border-green-500' : 'bg-slate-200 border border-slate-500'} text-xs font-bold text-admin-text`}>{doctor.isActive ? 'Active' : 'Inactive'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(doctor)}
                                                    className="p-2 text-admin-text-faint hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(doctor.id)}
                                                    className="p-2 text-admin-text-faint hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer">
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
                        Showing <span className="text-admin-text">1-{filteredDoctors.length}</span> of <span className="text-admin-text">{doctors.length}</span> doctors
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

            {/* ───────────────────── EDIT MODAL ───────────────────── */}
            {isEditModalOpen && selectedDept && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-admin-border animate-fade-in">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-admin-border-subtle">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-xl">
                                    <Pencil size={20} className="text-admin-primary" />
                                </div>
                                <div>
                                    <h2 className="text-base font-black text-admin-text">Edit Doctor</h2>
                                    <p className="text-[10px] font-bold text-admin-text-faint">{doctorDept}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 text-admin-text-faint hover:text-admin-text hover:bg-admin-surface rounded-xl transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="px-6 py-5 space-y-4">

                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="fullname" className="block text-xs font-bold text-admin-text mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        value={editFullName}
                                        onChange={e => setEditFullName(e.target.value)}
                                        className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 col-span-full">
                                    <label className="admin-label">Gender</label>
                                    <div className="flex gap-6">
                                        {['MALE', 'FEMALE', 'OTHER'].map((option) => (
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value={option}
                                                        checked={gender === option}
                                                        onChange={e => setGender(e.target.value)}
                                                        className="peer appearance-none w-5 h-5 border-2 border-admin-border rounded-full checked:border-admin-primary transition-all cursor-pointer"
                                                    />
                                                    <div className="absolute w-2.5 h-2.5 bg-admin-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                                                </div>
                                                <span className="text-base font-bold text-admin-text-muted group-hover:text-admin-text transition-colors">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={editIsActive}
                                        onChange={e => setEditIsActive(e.target.checked)}
                                        className="rounded border-admin-border text-admin-primary focus:ring-admin-primary"
                                    />
                                    <label htmlFor="isActive" className="text-xs font-bold text-admin-text">
                                        Is Active
                                    </label>
                                </div>
                            </form>
                        </div>

                        <div className="px-6 py-4 border-t border-admin-border-subtle flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl border border-admin-border text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEdit}
                                className="px-5 py-2.5 rounded-xl bg-admin-primary text-white text-xs font-black hover:bg-admin-primary-hover transition-all shadow-lg shadow-admin-primary/20"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ───────────────────── DELETE MODAL ───────────────────── */}
            {isDeleteModalOpen && selectedDept && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-admin-border animate-fade-in">
                        <div className="px-6 py-6 text-center space-y-3">
                            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto">
                                <Trash2 size={24} className="text-rose-500" />
                            </div>
                            <h2 className="text-base font-black text-admin-text">Delete Department?</h2>
                            <p className="text-xs font-bold text-admin-text-muted">
                                Are you sure you want to delete <span className="text-admin-text">{editFullName}</span>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="px-6 py-4 border-t border-admin-border-subtle flex justify-end gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl border border-admin-border text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-5 py-2.5 rounded-xl bg-rose-500 text-white text-xs font-black hover:bg-rose-600 transition-all"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>


    );
};

export default ManageDoctors;
