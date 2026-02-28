import React, { useState, useRef } from 'react';
import {
    User,
    Phone,
    ChevronDown,
    Save,
    ArrowLeft,
    Stethoscope,
    X,
    Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDoctorStore } from '../../../store/doctorStore';
import { usePatientStore } from '../../../store/patientStore';
import type { PatientPayload } from '../../../types';

const AddPatient: React.FC = () => {
    const { doctors } = useDoctorStore()
    // Form and dialog states
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [doctorName, setDoctorName] = useState('')
    const [chronicConditions, setChronicConditions] = useState('');
    const [dateOfAdmission, setDateOfAdmission] = useState('');
    const [caseType, setCaseType] = useState('');
    const [gender, setGender] = useState('')
    const [doctorId, setDoctorId] = useState<string>('')
    const [showTicket, setShowTicket] = useState(false);
    const [createdPatientInfo, setCreatedPatientInfo] = useState<{
        fullName: string;
        phone: string;
        date: string;
        doctorName: string;
        treatment: string;
    } | null>(null);

    // For printable ticket
    const ticketRef = useRef<HTMLDivElement>(null);

    const { addPatient } = usePatientStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Find selected doctor object to get latest fullName (in case not picked via dropdown)
        const selectedDoc =
            doctors?.find(doctor => doctor.id === doctorId) ||
            doctors?.find(doctor => doctor.fullName === doctorName);

        const patientData: PatientPayload = {
            entryDate: dateOfAdmission,
            gender: gender,
            caseType: caseType,
            fullName: fullName,
            age: parseInt(age),
            address: address,
            phoneNumber: phone,
            treatment: chronicConditions,
            doctorId: doctorId,
        }

        addPatient(patientData);

        // After patient created, show OPD ticket info
        setCreatedPatientInfo({
            fullName,
            phone,
            date: dateOfAdmission,
            doctorName: selectedDoc?.fullName || doctorName,
            treatment: chronicConditions,
        });
        setShowTicket(true);

        // Clear form states
        setFullName('');
        setAge('');
        setPhone('');
        setAddress('');
        setDoctorName('');
        setChronicConditions('');
        setDateOfAdmission('');
        setCaseType('');
        setDoctorId('');
        setGender('');
    };

    const handleCloseTicket = () => {
        setShowTicket(false);
        setCreatedPatientInfo(null);
    };

    // Print only the ticket content
    const handlePrint = () => {
        if (ticketRef.current) {
            const printContents = ticketRef.current.innerHTML;
            const win = window.open('', '', 'width=600,height=600');
            if (win) {
                win.document.write(`
                    <html>
                        <head>
                            <title>OPD Ticket</title>
                            <style>
                                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                                .opd-ticket { border: 1px dashed #2159d6; border-radius: 10px; margin: 18px; padding: 32px 24px; max-width: 350px; }
                                .opd-title { color: #2159d6; font-size: 2rem; font-weight: bold; text-align: center; margin-bottom: 1.5rem; }
                                .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
                                .label { font-weight: bold; }
                                .value { font-weight: 500; }
                                .line { border-bottom: 1px solid #D1D5DB; margin: 8px 0; }
                            </style>
                        </head>
                        <body>
                            <div class="opd-ticket">
                                ${printContents}
                            </div>
                            <script>
                                setTimeout(function() { window.print(); window.close(); }, 200);
                            </script>
                        </body>
                    </html>
                `);
                win.document.close();
            }
        }
    };

    return (
        <div className="px-8 py-2 max-w-[1200px] mx-auto space-y-8 pb-12">
            {/* OPD Ticket Modal */}
            {showTicket && createdPatientInfo && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-[400px] w-full p-8 text-center relative animate-fade-in">
                        <button
                            onClick={handleCloseTicket}
                            className="absolute top-2 right-2 text-admin-text-muted hover:text-admin-primary"
                            aria-label="Close Ticket"
                        >
                            <X size={22} />
                        </button>
                        <div ref={ticketRef}>
                            <div className="opd-title text-2xl font-bold text-admin-primary mb-4">OPD Ticket</div>
                            <div className="text-left text-[1rem]">
                                <div className="row flex justify-between mb-2 border-b pb-2">
                                    <span className="label font-semibold text-admin-text">Patient:</span>
                                    <span className="value font-medium">{createdPatientInfo.fullName}</span>
                                </div>
                                <div className="row flex justify-between mb-2 border-b pb-2">
                                    <span className="label font-semibold text-admin-text">Phone:</span>
                                    <span className="value font-medium">{createdPatientInfo.phone}</span>
                                </div>
                                <div className="row flex justify-between mb-2 border-b pb-2">
                                    <span className="label font-semibold text-admin-text">Date:</span>
                                    <span className="value font-medium">{createdPatientInfo.date}</span>
                                </div>
                                <div className="row flex justify-between mb-2 border-b pb-2">
                                    <span className="label font-semibold text-admin-text">Doctor:</span>
                                    <span className="value font-medium">{createdPatientInfo.doctorName}</span>
                                </div>
                                <div className="row flex justify-between mb-2">
                                    <span className="label font-semibold text-admin-text">Treatment:</span>
                                    <span className="value font-medium">{createdPatientInfo.treatment}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-center mt-6">
                            <button
                                className="px-8 py-2 rounded-xl bg-admin-primary text-white font-bold hover:bg-admin-primary-hover transition flex gap-2 items-center"
                                onClick={handlePrint}
                                type="button"
                            >
                                <Printer size={18} />
                                Print Ticket
                            </button>
                            <button
                                className="px-6 py-2 rounded-xl border border-admin-border font-bold text-admin-text-muted hover:bg-admin-surface transition"
                                onClick={handleCloseTicket}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                <p className="text-admin-text-muted mt-1 font-medium">Enter patient details to create a new record in the system. All fields marked with <span className='text-red-500 text-md'>*</span> are mandatory.</p>
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
                                            const selectedDoc = doctors?.find(doctor => doctor.fullName === e.target.value);
                                            if (selectedDoc) {
                                                setDoctorId(selectedDoc?.id);
                                            }
                                        }}
                                        className="admin-input appearance-none cursor-pointer pr-10"
                                        required
                                    >
                                        <option value="">Select attending doctor</option>
                                        {doctors?.filter(doctor => doctor.isActive).map((doctor, idx) => (
                                            <option key={idx} value={doctor.fullName}>{doctor.fullName}</option>
                                        ))}
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
