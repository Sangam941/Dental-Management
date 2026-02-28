import React, { useEffect, useState } from 'react';
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Users,
    UserPlus,
    Filter,
    ChevronDown,
} from 'lucide-react';

const stats = [
    { title: 'TOTAL REGISTERED', count: '204', icon: Users },
    { title: 'NEW THIS MONTH', count: '34', icon: UserPlus },
];

const ageRanges = ['All Ages', '0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+'];

import { useNavigate } from 'react-router-dom';
import { usePatientStore } from '../../../store/patientStore';
import type { PatientPayload } from '../../../types';
import { useDoctorStore } from '../../../store/doctorStore';

const Patients: React.FC = () => {

    // zustand
    const { fetchPatients, patients, updatePatient, deletePatient } = usePatientStore()
    const { doctors } = useDoctorStore()

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGender, setSelectedGender] = useState('All Gender');
    const [selectedAge, setSelectedAge] = useState('All Ages');
    const [patientList] = useState(patients);
    const [Id, setId] = useState<string>('')
    const [doctorId, setDoctorId] = useState<string>('')

    //edit states
    const [editFullName, setfullname] = useState('');
    const [editAge, setEditAge] = useState(0);
    const [editPhoneNo, setEditPhoneNo] = useState('');
    const [editTreatment, setEditTreatment] = useState('');
    const [editDoctor, setEditDoctor] = useState<any>(null);
    const [editEntryDateBs, setEditEntryDateBs] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editAddress, setEditAddress] = useState('');
    const [caseType, setCaseType] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [gender, setGender] = useState('')


    const filteredPatients = patients?.filter(patient => {
        const matchesSearch = patient?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient?.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient?.treatment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient?.phoneNumber?.includes(searchQuery);
        const matchesGender = selectedGender === 'All Gender' || patient.gender === selectedGender;

        let matchesAge = true;
        if (selectedAge !== 'All Ages') {
            // Split the range into 10-year increments where possible
            if (selectedAge === '0-9') matchesAge = patient.age >= 0 && patient.age <= 9;
            else if (selectedAge === '10-19') matchesAge = patient.age >= 10 && patient.age <= 19;
            else if (selectedAge === '20-29') matchesAge = patient.age >= 20 && patient.age <= 29;
            else if (selectedAge === '30-39') matchesAge = patient.age >= 30 && patient.age <= 39;
            else if (selectedAge === '40-49') matchesAge = patient.age >= 40 && patient.age <= 49;
            else if (selectedAge === '50-59') matchesAge = patient.age >= 50 && patient.age <= 59;
            else if (selectedAge === '60-69') matchesAge = patient.age >= 60 && patient.age <= 69;
            else if (selectedAge === '70-79') matchesAge = patient.age >= 70 && patient.age <= 79;
            else if (selectedAge === '80+') matchesAge = patient.age >= 80;
        }

        return matchesSearch && matchesGender && matchesAge;
    });



    // --- EDIT ---
    const openEditModal = (patient: PatientPayload) => {
        setId(patient?.id ?? '');
        setfullname(patient.fullName);
        setEditAddress(patient.address);
        setEditAge(patient.age);
        setGender(patient.gender)
        setEditPhoneNo(patient.phoneNumber);
        setEditTreatment(patient.treatment);
        setEditDoctor(patient?.doctor?.fullName);
        setDoctorId(patient.doctorId)
        setCaseType(patient.caseType);
        setEditEntryDateBs(patient.entryDate);

        setIsEditModalOpen(true);
    };

    const handleEdit = () => {
        setIsEditModalOpen(false);
        const updatedData: PatientPayload = {
            fullName: editFullName,
            age: editAge,
            phoneNumber: editPhoneNo,
            gender: gender,
            treatment: editTreatment,
            doctorId: doctorId,
            entryDate: editEntryDateBs,
            caseType: caseType,
            address: editAddress
        }

        updatePatient(Id, updatedData)

    };

    // --- DELETE ---
    const openDeleteModal = (id: String) => {
        setId(String(id));
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(false);
        deletePatient(Id);
    };


    useEffect(() => {
        fetchPatients()
    }, [])

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
                    <div className="relative w-full lg:w-64">
                        <select
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all appearance-none cursor-pointer"
                        >
                            <option value={"All Gender"}>All Gender</option>
                            <option key={'Male'} value={'MALE'}>MALE</option>
                            <option key={'female'} value={'FEMALE'}>FEMALE</option>
                            <option key={'others'} value={'OTHERS'}>OTHERS</option>
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
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">ID</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Patient Name</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Gender</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Age</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Phone No.</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Doctor</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Treatment</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Case Type</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Entry Date</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border-subtle">
                            {filteredPatients.map((patient, idx) => (
                                <tr key={idx} className="hover:bg-admin-surface/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="text-xs font-bold text-admin-text-muted">{idx + 1}</p>
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <h4 className="text-sm font-bold text-admin-text leading-tight">{patient.fullName}</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-admin-text-muted">
                                        {patient.gender}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-admin-text-muted">
                                        {patient.age}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-admin-text">
                                        {patient.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-admin-text">
                                        {patient?.doctor?.fullName || '---'}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-admin-text">
                                        {patient?.treatment}
                                    </td>
                                    <td>
                                        <div className={`py-2 text-center border text-xs cursor-pointer font-bold rounded-full ${patient?.caseType === 'NEW'
                                            ? 'bg-green-50 text-green-700 border-green-800'
                                            : patient?.caseType === 'OLD'
                                                ? 'bg-yellow-50 text-yellow-700 border-yellow-800'
                                                : 'text-admin-text'
                                            }`}>
                                            {patient?.caseType}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-admin-text">
                                        {patient.entryDate}
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">

                                            <button
                                                onClick={() => openEditModal(patient)}
                                                className="p-2 text-admin-text-faint hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(patient.id ?? "")}
                                                className="p-2 text-admin-text-faint hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer">
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

            {/* ───────────────────── EDIT MODAL ───────────────────── */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-admin-border animate-fade-in flex flex-col"
                        style={{ maxHeight: '80%' }}
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b border-admin-border-subtle shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-xl">
                                    <Pencil size={20} className="text-admin-primary" />
                                </div>
                                <div>
                                    <h2 className="text-base font-black text-admin-text">Edit Patient</h2>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 text-admin-text-faint hover:text-admin-text hover:bg-admin-surface rounded-xl transition-all"
                                aria-label="Close Edit Modal"
                            >
                                <span className="sr-only">Close</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4 overflow-y-auto grow">
                            <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleEdit(); }}>
                                <div>
                                    <label htmlFor="fullname" className="block text-xs font-bold text-admin-text mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        value={editFullName}
                                        onChange={e => setfullname(e.target.value)}
                                        className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-xs font-bold text-admin-text mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={editAddress}
                                        onChange={e => setEditAddress(e.target.value)}
                                        className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editAge" className="block text-xs font-bold text-admin-text mb-1">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        id="editAge"
                                        name="editAge"
                                        value={editAge}
                                        onChange={e => setEditAge(Number(e.target.value))}
                                        className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                        placeholder="Enter age"
                                        min={0}
                                        required
                                    />
                                </div>
                                <div className="flex gap-6">
                                    {['MALE', 'FEMALE', 'OTHER'].map((option) => (
                                        <label key={option} className="flex items-center gap-2 cursor-pointer group">
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
                                            <span className="text-sm font-bold text-admin-text-muted group-hover:text-admin-text transition-colors">{option}</span>
                                        </label>
                                    ))}
                                </div>
                                <div>
                                    <label htmlFor="editPhoneNo" className="block text-xs font-bold text-admin-text mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="editPhoneNo"
                                        name="editPhoneNo"
                                        value={editPhoneNo}
                                        onChange={e => setEditPhoneNo(e.target.value)}
                                        className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editTreatment" className="block text-xs font-bold text-admin-text mb-1">
                                        Treatment
                                    </label>
                                    <input
                                        type="text"
                                        id="editTreatment"
                                        name="editTreatment"
                                        value={editTreatment}
                                        onChange={e => setEditTreatment(e.target.value)}
                                        className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                        placeholder="Enter treatment"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Doctor / Consultant</label>
                                    <div className="relative">
                                        <select
                                            value={editDoctor}
                                            onChange={e => {
                                                setEditDoctor(e.target.value);
                                                // Find the department by name to get its id
                                                const selectedDoc = doctors?.find(doctor => doctor.fullName === e.target.value);
                                                if (selectedDoc) {
                                                    setDoctorId(selectedDoc?.id);
                                                }
                                            }}
                                            className="admin-input appearance-none cursor-pointer pr-10"
                                            required
                                        >
                                            <option value="">Select attending doctor</option>
                                            {doctors?.map((doctor, idx) => {
                                                return (
                                                    <option key={idx} value={doctor.fullName}>{doctor.fullName}</option>
                                                )
                                            })}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="space-y-1.5">
                                        <label className="admin-label">Case Type</label>
                                        <select
                                            value={caseType}
                                            onChange={e => setCaseType(e.target.value)}
                                            className="admin-input appearance-none cursor-pointer pr-10"
                                            required
                                        >
                                            <option value="">Select case type</option>
                                            <option value="NEW">NEW</option>
                                            <option value="OLD">OLD</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="editEntryDateBs" className="block text-xs font-bold text-admin-text mb-1">
                                        Entry Date
                                    </label>
                                    <input
                                        type="date"
                                        id="editEntryDateBs"
                                        name="editEntryDateBs"
                                        value={editEntryDateBs}
                                        onChange={e => setEditEntryDateBs(e.target.value)}
                                        className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                        placeholder="Enter entry date (BS)"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="px-6 py-4 border-t border-admin-border-subtle flex justify-end gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl border border-admin-border text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
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
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-admin-border animate-fade-in">
                        <div className="px-6 py-6 text-center space-y-3">
                            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto">
                                <Trash2 size={24} className="text-rose-500" />
                            </div>
                            <h2 className="text-base font-black text-admin-text">Delete Patient?</h2>
                            <p className="text-xs font-bold text-admin-text-muted">
                                Are you sure you want to delete this patient? This action cannot be undone.
                            </p>
                        </div>
                        <div className="px-6 py-4 border-t border-admin-border-subtle flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl border border-admin-border text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
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
    )
}


export default Patients;
