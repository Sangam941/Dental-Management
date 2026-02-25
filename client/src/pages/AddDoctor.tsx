import React, { useState } from 'react';
import {
    User,
    Phone,
    Stethoscope,
    Camera,
    Save,
    ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const specialtyOptions = [
    'Cardiology',
    'Pediatrics',
    'Neurology',
    'Orthopedics',
    'General Medicine',
    'Dental',
    'Gynecology',
    'ENT'
];

const AddDoctor: React.FC = () => {
    // Individual form states
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('male');
    const [specialty, setSpecialty] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [experience, setExperience] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const doctorData = {
            fullName,
            email,
            phone,
            dob,
            gender,
            specialty,
            qualifications,
            registrationNumber,
            experience
        };
        console.log('Doctor Registration Data:', doctorData);
        // Add form submission logic here
    };

    return (
        <div className="px-8 py-2 max-w-[1200px] mx-auto space-y-8 pb-12">
            <Link
                to="/admin/manage-doctors"
                className="flex items-center gap-1 group w-fit -mb-1 -ml-2"
            >
                <div className="p-2 rounded-full group-hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={16} className="text-blue-600 group-hover:text-blue-600 transition-transform group-hover:-translate-x-1" />
                </div>
                <h1 className="text-base font-bold text-blue-600 group-hover:text-blue-600 transition-colors">
                    Back
                </h1>
            </Link>
            {/* Header */}
            <div>
                <h1 className="text-3xl admin-title">Add New Doctor</h1>
                <p className="text-admin-text-muted mt-1 font-medium">Enter professional details to register a new practitioner in the hospital system.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Photo Section */}
                <div className="admin-card overflow-hidden">
                    <div className="p-6 space-y-4">
                        <h3 className="text-sm font-bold text-admin-text flex items-center gap-2">
                            Profile Photo
                        </h3>
                        <div className="flex items-center gap-8">
                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-admin-border bg-admin-surface flex flex-col items-center justify-center gap-2 text-admin-text-faint">
                                <Camera size={32} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-3">
                                <button type="button" className="px-6 py-2 admin-button-secondary text-sm font-bold border border-admin-border rounded-xl">
                                    Select Image
                                </button>
                                <p className="text-xs text-admin-text-faint font-medium tracking-tight">JPG, GIF or PNG. Max size of 2MB.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="admin-card overflow-hidden">
                    <div className="admin-section-header">
                        <User size={18} className="text-admin-primary" />
                        Personal Information
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1.5">
                            <label className="admin-label">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                placeholder="Dr. John Doe"
                                className="admin-input"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="john.doe@hospital.com"
                                className="admin-input"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Contact Number</label>
                            <div className="relative flex items-center">
                                <div className="absolute left-3 flex items-center pointer-events-none border-r border-admin-border pr-2">
                                    <Phone size={14} className="text-admin-text-faint" />
                                </div>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="+91 98765 43210"
                                    className="admin-input pl-12"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Date of Birth</label>
                            <input
                                type="date"
                                value={dob}
                                onChange={e => setDob(e.target.value)}
                                className="admin-input"
                                required
                            />
                        </div>
                        <div className="space-y-2 col-span-full">
                            <label className="admin-label">Gender</label>
                            <div className="flex gap-6">
                                {['Male', 'Female', 'Other'].map((option) => (
                                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option.toLowerCase()}
                                                checked={gender === option.toLowerCase()}
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
                    </div>
                </div>

                {/* Professional Qualifications Section */}
                <div className="admin-card overflow-hidden">
                    <div className="admin-section-header">
                        <Stethoscope size={18} className="text-admin-primary" />
                        Professional Qualifications
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1.5">
                            <label className="admin-label">Department / Specialty</label>
                            <select
                                value={specialty}
                                onChange={e => setSpecialty(e.target.value)}
                                className="admin-input cursor-pointer"
                                required
                            >
                                <option value="">Select Specialty</option>
                                {specialtyOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Qualifications</label>
                            <input
                                type="text"
                                value={qualifications}
                                onChange={e => setQualifications(e.target.value)}
                                placeholder="MBBS, MD, MS (Cardiology)"
                                className="admin-input"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">NMC Registration Number</label>
                            <input
                                type="text"
                                value={registrationNumber}
                                onChange={e => setRegistrationNumber(e.target.value)}
                                placeholder="NMC-12345-ABC"
                                className="admin-input"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Experience (Years)</label>
                            <input
                                type="number"
                                value={experience}
                                onChange={e => setExperience(e.target.value)}
                                placeholder="5"
                                className="admin-input"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 p-4">
                    <Link to="/admin/manage-doctors" className="px-8 py-3 admin-button-secondary text-sm font-bold border border-admin-border rounded-xl">
                        Cancel
                    </Link>
                    <button type="submit" className="px-6 py-3 admin-button-primary flex items-center gap-3 text-sm font-bold">
                        <Save size={18} />
                        Save Doctor
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;
