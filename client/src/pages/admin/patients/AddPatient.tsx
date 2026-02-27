import React, { useState } from 'react';
import {
    User,
    Phone,
    ChevronDown,
    Save,
    ArrowLeft,
    Stethoscope
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDoctorStore } from '../../../store/doctorStore';
import { usePatientStore } from '../../../store/patientStore';

const AddPatient: React.FC = () => {

    const { doctors } = useDoctorStore()
    // Individual form states
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    // const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [doctorName, setDoctorName] = useState('')
    const [chronicConditions, setChronicConditions] = useState('');
    const [dateOfAdmission, setDateOfAdmission] = useState('');
    const [caseType, setCaseType] = useState('');

    const [doctorId, setDoctorId] = useState<string | null>(null)

    const { addPatient } = usePatientStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const patientData = {
            entryDateBs: dateOfAdmission,
            caseType: caseType,
            patientName: fullName,
            age: parseInt(age),
            address: address,
            phoneNo: phone,
            treatment: chronicConditions,
            doctorId: doctorId,
        }

        addPatient(patientData)

        setFullName('');
        setAge('');
        setPhone('');
        setAddress('');
        setDoctorName('');
        setChronicConditions('');
        setDateOfAdmission('');
        setCaseType('');
        setDoctorId(null);

    };

    return (
        <div className="px-8 py-2 max-w-[1200px] mx-auto space-y-8 pb-12">
            <Link
                to="/admin/patients"
                className="flex items-center gap-1 group w-fit -mb-1 -ml-2"
            >
                <div className="p-2 rounded-full group-hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={16} className="text-blue-600 group-hover:text-blue-600 transition-transform group-hover:-translate-x-1" />
                </div>
                <h1 className="text-base font-bold text-blue-600 group-hover:text-blue-600 transition-colors">
                    Back to Patients
                </h1>
            </Link>

            {/* Header */}
            <div>
                <h1 className="text-3xl admin-title">Register New Patient</h1>
                <p className="text-admin-text-muted mt-1 font-medium">Enter patient details to create a new record in the system. All fields marked with * are mandatory.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="admin-card overflow-hidden">
                    <div className="admin-section-header">
                        <User size={18} className="text-admin-primary" />
                        Personal Information
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1.5">
                                <label className="admin-label">Full Name <span className='text-red-500 text-[16px]'>*</span></label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    placeholder="e.g., Ram"
                                    className="admin-input"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Age <span className='text-red-500 text-[16px]'>*</span></label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={e => setAge(e.target.value)}
                                        className="admin-input pr-10"
                                        placeholder='eg. 25'
                                        required
                                    />
                                </div>
                            </div>
                            {/* <div className="space-y-1.5">
                                <label className="admin-label">Gender</label>
                                <div className="relative">
                                    <select
                                        value={gender}
                                        onChange={e => setGender(e.target.value)}
                                        className="admin-input appearance-none cursor-pointer pr-10"
                                        
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                </div>
                            </div> */}
                            <div className="space-y-1.5">
                                <label className="admin-label">Contact Number <span className='text-red-500 text-[16px]'>*</span></label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-3 flex items-center pointer-events-none border-r border-admin-border pr-2">
                                        <Phone size={14} className="text-admin-text-faint" />
                                    </div>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="98XXXXXXXX"
                                        className="admin-input pl-12"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-1.5">
                                    <label className="admin-label">Address</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder="e.g., New Baneshwor, Ward No. 10"
                                        className="admin-input"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-1.5">
                                    <label className="admin-label">Date of Admission</label>
                                    <input
                                        type="date"
                                        value={dateOfAdmission}
                                        onChange={e => setDateOfAdmission(e.target.value)}
                                        className="admin-input"
                                        required
                                    />
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
                        </div>
                    </div>
                </div>

                {/* Medical History */}
                <div className="admin-card overflow-hidden">
                    <div className="admin-section-header">
                        <Stethoscope size={18} className="text-admin-primary" />
                        Medical Information
                    </div>
                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1.5">
                                <label className="admin-label">Doctor / Consultant</label>
                                <div className="relative">
                                    <select
                                        value={doctorName}
                                        onChange={e => {
                                            setDoctorName(e.target.value);
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

                            <div className="space-y-1.5">
                                <label className="admin-label">treatment / diagnosis</label>
                                <input
                                    type='text'
                                    value={chronicConditions}
                                    onChange={e => setChronicConditions(e.target.value)}
                                    placeholder="Brief description of treatment"
                                    className="admin-input"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Link to="/admin/patients" className="px-8 py-3 admin-button-secondary text-sm font-bold border border-admin-border rounded-xl">
                        Cancel
                    </Link>
                    <button type="submit" className="px-6 py-3 admin-button-primary flex items-center gap-3 text-sm font-bold">
                        <Save size={18} />
                        Register Patient
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPatient;
