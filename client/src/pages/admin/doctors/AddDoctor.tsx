import React, { useState } from 'react';
import {
    User,
    Phone,
    Save,
    ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDoctorStore } from '../../../store/doctorStore';
import { useDepartmentStore } from '../../../store/departmentStore';

const AddDoctor: React.FC = () => {

    const { departments } = useDepartmentStore()

    const { addDoctor } = useDoctorStore();
    // Individual form states
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('MALE');
    const [specialty, setSpecialty] = useState('');
    const [deptId, setDeptId] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addDoctor(fullName, phone, gender, deptId);
        setFullName('');
        setPhone('');
        setSpecialty('');
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
                            <label className="admin-label">Contact Number</label>
                            <div className="relative flex items-center">
                                <div className="absolute left-3 flex items-center pointer-events-none border-r border-admin-border pr-2">
                                    <Phone size={14} className="text-admin-text-faint" />
                                </div>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="+977 98765 43210"
                                    className="admin-input pl-12"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="admin-label">Department / Specialty</label>
                            <select
                                value={specialty}
                                onChange={e => {
                                    setSpecialty(e.target.value);
                                    // Find the department by name to get its id
                                    const selectedDept = departments.find(dept => dept.departmentName === e.target.value);
                                    if (selectedDept) {
                                        setDeptId(selectedDept.id)
                                    }
                                }}
                                className="admin-input cursor-pointer"
                                required
                            >
                                <option value="">Select Specialty</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.departmentName}>{dept.departmentName}</option>
                                ))}
                            </select>
                            </div>
                        <div className="space-y-2 col-span-full">
                            <label className="admin-label">Gender</label>
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
                                        <span className="text-base font-bold text-admin-text-muted group-hover:text-admin-text transition-colors">{option}</span>
                                    </label>
                                ))}
                            </div>
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
