import React, { useState } from 'react';
import {
    User,
    MapPin,
    Phone,
    Mail,
    ChevronDown,
    Save,
    ArrowLeft,
    Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const provinces = [
    'Koshi Province',
    'Madhesh Province',
    'Bagmati Province',
    'Gandaki Province',
    'Lumbini Province',
    'Karnali Province',
    'Sudurpashchim Province'
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const AddPatient: React.FC = () => {
    // Individual form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('Nepal');
    const [bloodGroup, setBloodGroup] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [allergies, setAllergies] = useState('');
    const [chronicConditions, setChronicConditions] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const patientData = {
            firstName,
            lastName,
            dob,
            gender,
            phone,
            email,
            streetAddress,
            city,
            province,
            postalCode,
            country,
            bloodGroup,
            maritalStatus,
            allergies,
            chronicConditions
        };
        console.log('Patient Registration Data:', patientData);
        // Add form submission logic here
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
                                <label className="admin-label">First Name *</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    placeholder="e.g., Ram"
                                    className="admin-input"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Last Name *</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    placeholder="e.g., Sharma"
                                    className="admin-input"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Date of Birth *</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={dob}
                                        onChange={e => setDob(e.target.value)}
                                        className="admin-input pr-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Gender *</label>
                                <div className="relative">
                                    <select
                                        value={gender}
                                        onChange={e => setGender(e.target.value)}
                                        className="admin-input appearance-none cursor-pointer pr-10"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Contact Number *</label>
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
                            <div className="space-y-1.5">
                                <label className="admin-label">Email Address</label>
                                <div className="relative flex items-center">
                                    <div className="absolute left-3 flex items-center pointer-events-none border-r border-admin-border pr-2">
                                        <Mail size={14} className="text-admin-text-faint" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="example@email.com"
                                        className="admin-input pl-12"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Details */}
                <div className="admin-card overflow-hidden">
                    <div className="admin-section-header">
                        <MapPin size={18} className="text-admin-primary" />
                        Address Details
                    </div>
                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-1.5">
                                <label className="admin-label">Street Address</label>
                                <input
                                    type="text"
                                    value={streetAddress}
                                    onChange={e => setStreetAddress(e.target.value)}
                                    placeholder="e.g., New Baneshwor, Ward No. 10"
                                    className="admin-input"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1.5">
                                <label className="admin-label">City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                    placeholder="e.g., Kathmandu"
                                    className="admin-input"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">State / Province</label>
                                <div className="relative">
                                    <select
                                        value={province}
                                        onChange={e => setProvince(e.target.value)}
                                        className="admin-input appearance-none cursor-pointer pr-10"
                                    >
                                        <option value="">Select Province</option>
                                        {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Postal Code</label>
                                <input
                                    type="text"
                                    value={postalCode}
                                    onChange={e => setPostalCode(e.target.value)}
                                    placeholder="e.g., 44600"
                                    className="admin-input"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Country</label>
                                <div className="relative">
                                    <select
                                        value={country}
                                        onChange={e => setCountry(e.target.value)}
                                        className="admin-input appearance-none cursor-pointer pr-10"
                                    >
                                        <option value="Nepal">Nepal</option>
                                        <option value="Other">Other</option>
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
                        <Activity size={18} className="text-admin-primary" />
                        Medical History
                    </div>
                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1.5">
                                <label className="admin-label">Blood Group</label>
                                <div className="relative">
                                    <select
                                        value={bloodGroup}
                                        onChange={e => setBloodGroup(e.target.value)}
                                        className="admin-input appearance-none cursor-pointer pr-10"
                                    >
                                        <option value="">Select Blood Group</option>
                                        {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="admin-label">Marital Status</label>
                                <div className="relative">
                                    <select
                                        value={maritalStatus}
                                        onChange={e => setMaritalStatus(e.target.value)}
                                        className="admin-input appearance-none cursor-pointer pr-10"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="widowed">Widowed</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5 col-span-full">
                                <label className="admin-label">Allergies</label>
                                <textarea
                                    value={allergies}
                                    onChange={e => setAllergies(e.target.value)}
                                    placeholder="List any known allergies (e.g., Penicillin, Peanuts)"
                                    className="admin-input min-h-[100px] py-4 resize-none"
                                ></textarea>
                            </div>
                            <div className="space-y-1.5 col-span-full">
                                <label className="admin-label">Chronic Conditions</label>
                                <textarea
                                    value={chronicConditions}
                                    onChange={e => setChronicConditions(e.target.value)}
                                    placeholder="List any chronic conditions (e.g., Diabetes, Hypertension)"
                                    className="admin-input min-h-[100px] py-4 resize-none"
                                ></textarea>
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
