import React, { useState } from 'react';

const OPDEntryForm: React.FC = () => {
    const [formData] = useState({
        sn: 'OPD-2023-1024',
        regNo: '',
        patientName: '',
        age: '',
        address: '',
        phone: '',
        doctor: '',
        treatment: '',
        totalAmount: '0.00',
        paymentOption: 'Cash',
        paidAmount: '0.00',
        dueBalance: '0.00',
        expense: '0.00'
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl admin-title flex items-center gap-3">
                    Daily OPD Entry
                    <span className="bg-slate-100 text-admin-text-muted text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">New Entry</span>
                </h1>
                <div className="text-right">
                    <p className="text-[10px] text-admin-text-muted font-bold uppercase tracking-widest">Today's Date</p>
                    <p className="text-sm font-bold text-admin-text">October 24, 2023</p>
                </div>
            </div>

            {/* Patient Registration & Personal Details */}
            <div className="admin-card overflow-hidden">
                <div className="admin-section-header">
                    <svg className="w-4 h-4 text-admin-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Patient Registration & Personal Details
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                        <label className="admin-label">SN (Auto-Gen)</label>
                        <input
                            name="sn"
                            value={formData.sn}
                            disabled
                            className="admin-input opacity-60 cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Reg. No <span className="text-admin-danger">*</span></label>
                        <input name="regNo" placeholder="Enter Registration No." className="admin-input" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Patient Name <span className="text-admin-danger">*</span></label>
                        <input name="patientName" placeholder="Enter full patient name" className="admin-input" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Age <span className="text-admin-danger">*</span></label>
                        <input name="age" placeholder="e.g. 28" className="admin-input" />
                    </div>
                    <div className="space-y-1.5 lg:col-span-1">
                        <label className="admin-label">Address</label>
                        <input name="address" placeholder="House No, Street, City" className="admin-input" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Phone Number</label>
                        <input name="phone" placeholder="Enter phone number" className="admin-input" />
                    </div>
                </div>
            </div>

            {/* Medical Information */}
            <div className="admin-card overflow-hidden">
                <div className="admin-section-header">
                    <svg className="w-4 h-4 text-admin-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-3.568 0l-.727-2.903a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-2.14 2.14a2 2 0 01-3.412-1.414V4a2 2 0 012-2h8.94c.48 0 .937.172 1.285.483l5.06 4.547c.348.312.555.742.555 1.196v11.202c0 1.104-.896 2-2 2H4a2 2 0 01-2-2V4" />
                    </svg>
                    Medical Information
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="admin-label">Doctor / Consultant <span className="text-admin-danger">*</span></label>
                        <select name="doctor" className="admin-input cursor-pointer">
                            <option value="">Select attending doctor</option>
                            <option value="Dr. Verma (Med)">Dr. Verma (Med)</option>
                            <option value="Dr. Mehra (Endo)">Dr. Mehra (Endo)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Treatment / Diagnosis</label>
                        <input name="treatment" placeholder="Brief description of treatment" className="admin-input" />
                    </div>
                </div>
            </div>

            {/* Billing & Payment */}
            <div className="admin-card overflow-hidden">
                <div className="admin-section-header">
                    <svg className="w-4 h-4 text-admin-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M9 21h6m-3-3l-3 3m3-3l3 3m2-6a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Billing & Payment
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <div className="space-y-1.5">
                        <label className="admin-label">Total Amount (Rs.)</label>
                        <input name="totalAmount" defaultValue="0.00" className="admin-input" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Payment Option</label>
                        <select name="paymentOption" className="admin-input cursor-pointer">
                            <option>Cash</option>
                            <option>Online</option>
                            <option>Credit</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Paid Amount (Rs.)</label>
                        <input name="paidAmount" defaultValue="0.00" className="admin-input" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Due Balance (Rs.)</label>
                        <input name="dueBalance" value="0.00" readOnly className="admin-input bg-admin-surface font-bold cursor-not-allowed" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Expense (Rs.)</label>
                        <input name="expense" defaultValue="0.00" className="admin-input" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pb-8">
                <button className="px-8 py-2.5 admin-button-secondary text-sm">
                    Clear Form
                </button>
                <button className="px-8 py-2.5 admin-button-primary flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Save Entry
                </button>
            </div>
        </div>
    );
};

export default OPDEntryForm;
