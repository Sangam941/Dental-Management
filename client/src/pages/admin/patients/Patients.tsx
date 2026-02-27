import React, { useState } from 'react';
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Eye,
    Users,
    UserPlus,
    Flame,
    Filter,
    ChevronDown,
    TrendingUp,
    TrendingDown
} from 'lucide-react';

const stats = [
    { title: 'TOTAL REGISTERED', count: '204', icon: Users },
    { title: 'NEW THIS MONTH', count: '34', icon: UserPlus },
];

const genders = ['All Genders', 'Male', 'Female', 'Other'];
const ageRanges = ['All Ages', '0-18', '19-40', '41-60', '60+'];

import { DUMMY_PATIENTS as initialPatients } from '../../../data/dummyData';

import { useNavigate } from 'react-router-dom';

const Patients: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGender, setSelectedGender] = useState('All Genders');
    const [selectedAge, setSelectedAge] = useState('All Ages');
    const [patientList] = useState(initialPatients);

    const filteredPatients = patientList.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.phone.includes(searchQuery);
        const matchesGender = selectedGender === 'All Genders' || patient.gender === selectedGender;

        let matchesAge = true;
        if (selectedAge !== 'All Ages') {
            if (selectedAge === '0-18') matchesAge = patient.age <= 18;
            else if (selectedAge === '19-40') matchesAge = patient.age >= 19 && patient.age <= 40;
            else if (selectedAge === '41-60') matchesAge = patient.age >= 41 && patient.age <= 60;
            else if (selectedAge === '60+') matchesAge = patient.age > 60;
        }

        return matchesSearch && matchesGender && matchesAge;
    });

    return (
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 bg-admin-bg min-h-screen">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-admin-text tracking-tight">Patient Directory</h1>
                    <p className="text-admin-text-muted text-sm mt-1">Manage and view all registered patient records securely.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/patients/new-patient')}
                    className="flex items-center gap-2 px-6 py-3 bg-admin-primary text-white rounded-xl shadow-lg shadow-admin-primary/20 hover:bg-admin-primary-hover transition-all font-bold text-sm"
                >
                    <Plus size={18} strokeWidth={3} />
                    Register New Patient
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-admin-border shadow-sm flex items-center gap-6 group hover:border-admin-primary/30 transition-all cursor-default">
                        <div className={`p-4 rounded-xl bg-admin-surface text-admin-text-muted`}>
                            <stat.icon size={22} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-admin-text-muted tracking-widest uppercase">{stat.title}</p>
                            <div className="flex items-end gap-3 mt-1">
                                <h3 className="text-2xl font-black text-admin-text leading-none">{stat.count}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col lg:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-admin-border shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-faint" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Name, ID, or Phone Number"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-admin-surface border border-admin-border rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all"
                    />
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-48">
                        <select
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all appearance-none cursor-pointer"
                        >
                            {genders.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" size={16} />
                    </div>
                    <div className="relative flex-1 lg:w-48">
                        <select
                            value={selectedAge}
                            onChange={(e) => setSelectedAge(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all appearance-none cursor-pointer"
                        >
                            {ageRanges.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" size={16} />
                    </div>
                    <button className="p-3 bg-admin-surface border border-admin-border rounded-xl text-admin-text-muted hover:bg-white hover:text-admin-primary transition-all">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-3xl border border-admin-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-white border-b border-admin-border-subtle">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Patient Name</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">ID</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Gender</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Age</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Phone No.</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Doctor</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Treatment</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border-subtle">
                            {filteredPatients.map((patient, idx) => (
                                <tr key={idx} className="hover:bg-admin-surface/30 transition-colors">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <h4 className="text-sm font-bold text-admin-text leading-tight">{patient.name}</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs font-bold text-admin-text-muted">{patient.id}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight ${patient.gender === 'Female' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            {patient.gender}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-admin-text-muted">
                                        {patient.age}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-admin-text">
                                        {patient.phone}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-admin-text">
                                        {patient.phone}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-admin-text">
                                        {patient.phone}
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-admin-text-faint hover:text-admin-primary hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-admin-text-faint hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
                                                <Pencil size={18} />
                                            </button>
                                            <button className="p-2 text-admin-text-faint hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="px-8 py-5 border-t border-admin-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-bold text-admin-text-muted">
                        Showing <span className="text-admin-text">1-{filteredPatients.length}</span> of <span className="text-admin-text">{patientList.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 border border-admin-border rounded-xl text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all">
                            Previous
                        </button>
                        <button className="px-4 py-2 border border-admin-border rounded-xl text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patients;
