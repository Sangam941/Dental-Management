import React from 'react';

const DoctorProfessionalForm: React.FC = () => {
    return (
        <div className="admin-card overflow-hidden">
            <div className="admin-section-header">
                <svg className="w-4 h-4 text-admin-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Professional Qualifications
            </div>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="admin-label">Department / Specialty</label>
                        <select className="admin-input cursor-pointer">
                            <option>Select Specialty</option>
                            <option>Cardiology</option>
                            <option>Medicine</option>
                            <option>Radiology</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Qualifications</label>
                        <input placeholder="MBBS, MD, MS (Cardiology)" className="admin-input" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Experience (Years)</label>
                        <input placeholder="e.g. 5" className="admin-input" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Work Schedule (Default)</label>
                        <select className="admin-input cursor-pointer">
                            <option>Morning Shift (08:00 - 14:00)</option>
                            <option>Evening Shift (14:00 - 20:00)</option>
                            <option>Night Shift (20:00 - 08:00)</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="admin-label">Bio / Description</label>
                    <textarea
                        rows={4}
                        placeholder="Brief professional background, achievements, and area of expertise..."
                        className="admin-input resize-none"
                    ></textarea>
                </div>
            </div>

            <div className="p-6 border-t border-admin-border-subtle flex justify-end gap-3 bg-admin-surface/30">
                <button className="px-6 py-2 admin-button-secondary text-sm">
                    Cancel
                </button>
                <button className="px-6 py-2 admin-button-primary flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Save Doctor
                </button>
            </div>
        </div>
    );
};

export default DoctorProfessionalForm;
