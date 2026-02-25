import React, { useState } from 'react';
import {
    User,
    Stethoscope,
    Calendar,
    Clock,
    FileText,
    ChevronDown,
    Save,
    ArrowLeft,
    Phone,
    Hash,
    AlertCircle,
    Search,
    UserPlus,
    X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
    DEPARTMENTS_LIST as departments,
    DOCTORS_LIST as doctors,
    APPOINTMENT_TYPES as appointmentTypes,
    TIME_SLOTS as timeSlots,
    DUMMY_PATIENTS as registeredPatients
} from '../data/dummyData';

const AddAppointment: React.FC = () => {
    const navigate = useNavigate();

    // Individual form states
    const [department, setDepartment] = useState('');
    const [doctor, setDoctor] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [priority, setPriority] = useState<'normal' | 'urgent' | 'emergency'>('normal');
    const [notes, setNotes] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<typeof registeredPatients[0] | null>(null);
    const [showResults, setShowResults] = useState(false);

    const filteredPatients = registeredPatients.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery)
    );

    const handleSelectPatient = (patient: typeof registeredPatients[0]) => {
        setSelectedPatient(patient);
        setSearchQuery('');
        setShowResults(false);
    };

    const handleBookAppointment = () => {
        const appointmentData = {
            selectedPatient,
            department,
            doctor,
            appointmentType,
            appointmentDate,
            timeSlot,
            priority,
            notes
        };
        console.log('Booking Appointment:', appointmentData);
    };

    return (
        <div className="px-8 py-2 max-w-[1200px] mx-auto space-y-8 pb-12">
            {/* Back link */}
            <Link
                to="/admin/appointment"
                className="flex items-center gap-1 group w-fit -mb-1 -ml-2"
            >
                <div className="p-2 rounded-full group-hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={16} className="text-admin-primary transition-transform group-hover:-translate-x-1" />
                </div>
                <h1 className="text-base font-bold text-admin-primary">
                    Back to Appointments
                </h1>
            </Link>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl admin-title">Book New Appointment</h1>
                    <p className="text-admin-text-muted mt-1 font-medium">
                        Schedule a new patient appointment with a doctor.
                    </p>
                </div>

                {/* Priority Badge */}
                <div className="flex bg-admin-surface p-1 rounded-2xl border border-admin-border">
                    {(['normal', 'urgent', 'emergency'] as const).map(level => (
                        <button
                            key={level}
                            onClick={() => setPriority(level)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all capitalize ${priority === level
                                ? level === 'emergency'
                                    ? 'bg-red-500 text-white shadow-sm'
                                    : level === 'urgent'
                                        ? 'bg-amber-400 text-white shadow-sm'
                                        : 'bg-white text-admin-primary shadow-sm border border-admin-border'
                                : 'text-admin-text-faint hover:text-admin-text-muted'
                                }`}
                        >
                            {level === 'emergency' && <AlertCircle size={15} />}
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── SECTION 1: Patient Selection ── */}
            <div className="admin-card overflow-hidden">
                <div className="admin-section-header">
                    <div className="p-1.5 rounded-full bg-admin-primary/10 text-admin-primary">
                        <User size={16} />
                    </div>
                    Patient Selection
                </div>
                <div className="p-8 space-y-6">
                    {!selectedPatient ? (
                        <div className="space-y-4">
                            <label className="admin-label">Search Patient</label>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-faint" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Enter name, ID, or phone number..."
                                        className="admin-input pl-12 h-[52px]"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setShowResults(e.target.value.length > 0);
                                        }}
                                        onFocus={() => searchQuery.length > 0 && setShowResults(true)}
                                    />

                                    {/* Search Results Dropdown */}
                                    {showResults && (
                                        <div className="absolute z-50 w-full mt-2 bg-white border border-admin-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                            {filteredPatients.length > 0 ? (
                                                <div className="divide-y divide-admin-border-subtle">
                                                    {filteredPatients.map(patient => (
                                                        <button
                                                            key={patient.id}
                                                            onClick={() => handleSelectPatient(patient)}
                                                            className="w-full flex items-center gap-4 p-4 hover:bg-admin-surface transition-colors group text-left"
                                                        >
                                                            <img
                                                                src={patient.image}
                                                                alt={patient.name}
                                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                                                            />
                                                            <div className="flex-1">
                                                                <h4 className="text-sm font-bold text-admin-text group-hover:text-admin-primary transition-colors">{patient.name}</h4>
                                                                <p className="text-[11px] font-bold text-admin-text-faint">ID: {patient.id} • {patient.phone}</p>
                                                            </div>
                                                            <div className="px-2.5 py-1 rounded-lg bg-admin-surface text-[10px] font-black uppercase text-admin-text-faint group-hover:bg-admin-primary/10 group-hover:text-admin-primary transition-all">
                                                                Select
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-6 text-center">
                                                    <p className="text-sm font-bold text-admin-text-muted">No patients found</p>
                                                    <p className="text-[11px] text-admin-text-faint mt-1">Try a different search or register a new patient</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs font-black text-admin-text-faint uppercase tracking-widest hidden md:block">OR</span>
                                <button
                                    onClick={() => navigate('/admin/patients/new-patient')}
                                    className="flex items-center gap-2 px-6 h-[52px] bg-admin-primary/10 text-admin-primary rounded-xl font-bold text-sm hover:bg-admin-primary/20 transition-all whitespace-nowrap border border-admin-primary/10"
                                >
                                    <UserPlus size={18} />
                                    Quick Register
                                </button>
                            </div>
                            <p className="text-[11px] font-bold text-admin-text-faint">Search results will appear automatically</p>
                        </div>
                    ) : (
                        <div className="bg-admin-surface/50 border border-admin-border rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 animate-in zoom-in-95 duration-200 relative group">
                            <img
                                src={selectedPatient.image}
                                alt={selectedPatient.name}
                                className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-4 ring-white"
                            />
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-black text-admin-text">{selectedPatient.name}</h3>
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 mt-1">
                                    <p className="text-sm font-bold text-admin-text-muted">ID: <span className="text-admin-primary">{selectedPatient.id}</span></p>
                                    <span className="w-1 h-1 rounded-full bg-admin-border hidden sm:block"></span>
                                    <p className="text-sm font-bold text-admin-text-muted">{selectedPatient.age} Years</p>
                                    <span className="w-1 h-1 rounded-full bg-admin-border hidden sm:block"></span>
                                    <p className="text-sm font-bold text-admin-text-muted">{selectedPatient.gender}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedPatient(null)}
                                className="flex items-center gap-1.5 px-4 py-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all text-xs font-black uppercase tracking-wider border border-transparent hover:border-rose-100"
                            >
                                <X size={16} />
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── SECTION 2: Doctor & Department ── */}
            <div className="admin-card overflow-hidden">
                <div className="admin-section-header">
                    <div className="p-1.5 rounded-full bg-admin-primary/10 text-admin-primary">
                        <Stethoscope size={16} />
                    </div>
                    Doctor & Department
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Department */}
                        <div className="space-y-1.5">
                            <label className="admin-label">Department</label>
                            <div className="relative">
                                <select
                                    name="department"
                                    value={department}
                                    onChange={e => setDepartment(e.target.value)}
                                    className="admin-input appearance-none cursor-pointer pr-10"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                            </div>
                        </div>

                        {/* Doctor */}
                        <div className="space-y-1.5">
                            <label className="admin-label">Doctor</label>
                            <div className="relative">
                                <select
                                    name="doctor"
                                    value={doctor}
                                    onChange={e => setDoctor(e.target.value)}
                                    className="admin-input appearance-none cursor-pointer pr-10"
                                >
                                    <option value="">Select Doctor</option>
                                    {doctors.map(doc => (
                                        <option key={doc} value={doc}>{doc}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                            </div>
                        </div>

                        {/* Appointment Type */}
                        <div className="space-y-1.5">
                            <label className="admin-label">Appointment Type</label>
                            <div className="relative">
                                <select
                                    name="appointmentType"
                                    value={appointmentType}
                                    onChange={e => setAppointmentType(e.target.value)}
                                    className="admin-input appearance-none cursor-pointer pr-10"
                                >
                                    <option value="">Select Type</option>
                                    {appointmentTypes.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECTION 3: Schedule ── */}
            <div className="admin-card overflow-hidden">
                <div className="admin-section-header">
                    <div className="p-1.5 rounded-full bg-admin-primary/10 text-admin-primary">
                        <Calendar size={16} />
                    </div>
                    Schedule
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Appointment Date */}
                        <div className="space-y-1.5">
                            <label className="admin-label">Appointment Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="appointmentDate"
                                    value={appointmentDate}
                                    onChange={e => setAppointmentDate(e.target.value)}
                                    className="admin-input pr-10"
                                />
                                <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                            </div>
                        </div>

                        {/* Time Slot */}
                        <div className="space-y-1.5">
                            <label className="admin-label">Time Slot</label>
                            <div className="relative">
                                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                <select
                                    name="timeSlot"
                                    value={timeSlot}
                                    onChange={e => setTimeSlot(e.target.value)}
                                    className="admin-input appearance-none cursor-pointer pl-9 pr-10"
                                >
                                    <option value="">Select Time Slot</option>
                                    {timeSlots.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECTION 4: Additional Notes ── */}
            <div className="admin-card overflow-hidden">
                <div className="admin-section-header">
                    <div className="p-1.5 rounded-full bg-admin-primary/10 text-admin-primary">
                        <FileText size={16} />
                    </div>
                    Additional Notes
                </div>
                <div className="p-8">
                    <div className="space-y-1.5">
                        <label className="admin-label">Reason for Visit / Notes</label>
                        <textarea
                            name="notes"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Describe the patient's symptoms, reason for visit, or any other relevant information…"
                            className="admin-input min-h-[150px] py-4 resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={() => navigate('/admin/appointment')}
                    className="px-8 py-3 admin-button-secondary text-sm font-bold"
                >
                    Cancel
                </button>
                <button
                    onClick={handleBookAppointment}
                    className="px-8 py-3 admin-button-primary flex items-center gap-2 text-sm font-bold"
                >
                    <Save size={18} />
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default AddAppointment;
