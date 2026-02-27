import React, { useEffect, useState } from 'react';
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Building2,
    Activity,
    TrendingUp,
    X,
    AlertTriangle
} from 'lucide-react';

import type { Department } from '../../../types';
import { useDepartmentStore } from '../../../store/departmentStore';

const Departments: React.FC = () => {
    const { departments, updateDepartment, deleteDepartment, addDepartment, fetchDepartments } = useDepartmentStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedDept, setSelectedDept] = useState<Department | null>(null);
    const [deptId, setDeptId] = useState<string>('');
    const [deptName, setDeptName] = useState<string>('');
    const [deptStatus, setDeptStatus] = useState<boolean>(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    // Stats
    const totalDepts = departments.length;
    const activeDepts = departments.filter(d => d.isActive).length;

    const stats = [
        { title: 'Total Departments', count: totalDepts, icon: Building2, color: 'blue', trend: '+2%' },
        { title: 'Active Departments', count: activeDepts, icon: Activity, color: 'emerald', trend: '+5%' }
    ];

    // Filtering
    const filtered = departments.filter(d => {
        const matchSearch =
            d.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.id?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === 'All'
            || (statusFilter === 'Active' && d.isActive)
            || (statusFilter === 'Inactive' && !d.isActive);
        return matchSearch && matchStatus;
    });

    // --- RESET FORM ---
    const resetForm = () => {
        setDeptName('');
        setDeptStatus(false);
        setFormError('');
    };

    // --- ADD ---
    const openAddModal = () => {
        resetForm();
        setIsAddModalOpen(true);
    };

    const handleAdd = () => {
        if (!deptName.trim()) {
            setFormError('Department Name is required.');
            return;
        }
        addDepartment(deptName);
        setIsAddModalOpen(false);
        resetForm();
    };

    // --- EDIT ---
    const openEditModal = (dept: Department) => {
        setSelectedDept(dept);
        setDeptId(dept.id);
        setDeptName(dept.name);
        setDeptStatus(dept.isActive);
        setFormError('');
        setIsEditModalOpen(true);
    };

    const handleEdit = () => {
        if (!deptName.trim()) {
            setFormError('Department Name is required.');
            return;
        }
        setIsEditModalOpen(false);
        updateDepartment(deptId, deptName, deptStatus);
        setSelectedDept(null);
        resetForm();
    };

    // --- DELETE ---
    const openDeleteModal = (dept: Department) => {
        setSelectedDept(dept);
        setDeptId(dept.id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(false);
        deleteDepartment(deptId);
        setSelectedDept(null);
    };

    return (
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 bg-admin-bg min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black text-admin-text tracking-tight">Departments</h1>
                    <p className="text-admin-text-muted text-sm mt-1">Manage all hospital departments, staff, and locations</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-admin-primary text-white rounded-xl shadow-lg shadow-admin-primary/20 hover:bg-admin-primary-hover transition-all font-bold text-sm"
                >
                    <Plus size={18} strokeWidth={3} />
                    Add Department
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm flex flex-col justify-between group hover:border-admin-primary/30 transition-all cursor-default">
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

            {/* Search & Filter */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-admin-border shadow-sm">
                <div className="relative w-full lg:w-48">
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="w-full pl-4 pr-8 py-2.5 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all appearance-none cursor-pointer"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className="relative w-full lg:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-faint" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, ID..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-admin-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-white border-b border-admin-border-subtle">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Department</th>
                                <th className="px-6 py-5 text-center text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border-subtle">
                            {departments.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-8 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2 text-admin-text-faint">
                                            <Building2 size={32} className="opacity-30" />
                                            <p className="text-sm font-bold">No departments found</p>
                                            <p className="text-xs">Try adjusting your search or filter</p>
                                        </div>~
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((dept, idx) => (
                                    <tr key={idx} className="hover:bg-admin-surface/30 transition-colors">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                    <Building2 size={18} className="text-admin-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-admin-text">{dept.name}</h4>
                                                    <p className="text-[10px] font-bold text-admin-text-faint">ID: {dept.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <div>
                                                    <div className={`py-1 px-2 rounded-full cursor-pointer transition-colors ${dept.isActive ? 'bg-green-200 text-green-900 border border-green-500' : 'bg-slate-200 border border-slate-500'} text-xs font-bold text-admin-text`}>
                                                        {dept.isActive ? 'Active' : 'Inactive'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(dept)}
                                                    className="p-2 text-admin-text-faint hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                                                    title="Edit Department"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(dept)}
                                                    className="p-2 text-admin-text-faint hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                                                    title="Delete Department"
                                                >
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
                <div className="px-8 py-5 border-t border-admin-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-bold text-admin-text-muted">
                        Showing <span className="text-admin-text">{filtered.length}</span> of <span className="text-admin-text">{departments.length}</span> departments
                    </p>
                </div>
            </div>

            {/* ───────────────────── ADD MODAL ───────────────────── */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-admin-border animate-fade-in">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-admin-border-subtle">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-xl">
                                    <Building2 size={20} className="text-admin-primary" />
                                </div>
                                <div>
                                    <h2 className="text-base font-black text-admin-text">Add Department</h2>
                                    <p className="text-[10px] font-bold text-admin-text-faint">Fill in department details below</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-2 text-admin-text-faint hover:text-admin-text hover:bg-admin-surface rounded-xl transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            {formError && (
                                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600">
                                    <AlertTriangle size={14} />
                                    {formError}
                                </div>
                            )}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-admin-text-muted uppercase tracking-wider">
                                    Department Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    value={deptName}
                                    onChange={e => setDeptName(e.target.value)}
                                    placeholder="e.g. Cardiology"
                                    className="w-full px-4 py-2.5 border border-admin-border rounded-xl text-admin-text text-sm font-medium focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary focus:outline-none transition-all placeholder:text-admin-text-faint bg-white"
                                    required
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-admin-border-subtle flex justify-end gap-3">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl border border-admin-border text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAdd}
                                className="px-5 py-2.5 rounded-xl bg-admin-primary text-white text-xs font-black hover:bg-admin-primary-hover transition-all shadow-lg shadow-admin-primary/20"
                            >
                                Add Department
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                    <h2 className="text-base font-black text-admin-text">Edit Department</h2>
                                    <p className="text-[10px] font-bold text-admin-text-faint">{selectedDept.id}</p>
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
                            {formError && (
                                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600">
                                    <AlertTriangle size={14} />
                                    {formError}
                                </div>
                            )}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-admin-text-muted uppercase tracking-wider">
                                    Department Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    value={deptName}
                                    onChange={e => setDeptName(e.target.value)}
                                    placeholder="e.g. Cardiology"
                                    className="w-full px-4 py-2.5 border border-admin-border rounded-xl text-admin-text text-sm font-medium focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary focus:outline-none transition-all placeholder:text-admin-text-faint bg-white"
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={deptStatus}
                                    onChange={e => setDeptStatus(e.target.checked)}
                                    className="rounded border-admin-border text-admin-primary focus:ring-admin-primary"
                                />
                                <label htmlFor="isActive" className="text-xs font-bold text-admin-text">
                                    Is Active
                                </label>
                            </div>
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
                                Are you sure you want to delete <span className="text-admin-text">{selectedDept.name}</span>? This action cannot be undone.
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

export default Departments