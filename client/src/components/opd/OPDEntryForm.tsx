import React, { useState, useEffect } from 'react';

const OPDEntryForm: React.FC = () => {
    // Individual form states
    const [sn] = useState('OPD-2023-1024');
    const [regNo, setRegNo] = useState('');
    const [patientName, setPatientName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [doctor, setDoctor] = useState('');
    const [treatment, setTreatment] = useState('');
    const [totalAmount, setTotalAmount] = useState('0.00');
    const [paymentOption, setPaymentOption] = useState('Cash');
    const [paidAmount, setPaidAmount] = useState('0.00');
    const [dueBalance, setDueBalance] = useState('0.00');
    const [expense, setExpense] = useState('0.00');

    // Automatically calculate due balance
    useEffect(() => {
        const total = parseFloat(totalAmount) || 0;
        const paid = parseFloat(paidAmount) || 0;
        setDueBalance((total - paid).toFixed(2));
    }, [totalAmount, paidAmount]);

    const clearForm = () => {
        setRegNo('');
        setPatientName('');
        setAge('');
        setAddress('');
        setPhone('');
        setDoctor('');
        setTreatment('');
        setTotalAmount('0.00');
        setPaymentOption('Cash');
        setPaidAmount('0.00');
        setDueBalance('0.00');
        setExpense('0.00');
    };

    const handleSave = () => {
        const entryData = {
            sn,
            regNo,
            patientName,
            age,
            address,
            phone,
            doctor,
            treatment,
            totalAmount,
            paymentOption,
            paidAmount,
            dueBalance,
            expense
        };
        console.log('Daily OPD Entry Saved:', entryData);
        // Add submission logic here
    };

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
                            value={sn}
                            disabled
                            className="admin-input opacity-60 cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Reg. No <span className="text-admin-danger">*</span></label>
                        <input
                            value={regNo}
                            onChange={(e) => setRegNo(e.target.value)}
                            placeholder="Enter Registration No."
                            className="admin-input"
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Patient Name <span className="text-admin-danger">*</span></label>
                        <input
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder="Enter full patient name"
                            className="admin-input"
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Age <span className="text-admin-danger">*</span></label>
                        <input
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g. 28"
                            className="admin-input"
                            required
                        />
                    </div>
                    <div className="space-y-1.5 lg:col-span-1">
                        <label className="admin-label">Address</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="House No, Street, City"
                            className="admin-input"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Phone Number</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone number"
                            className="admin-input"
                        />
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
                        <select
                            value={doctor}
                            onChange={(e) => setDoctor(e.target.value)}
                            className="admin-input cursor-pointer"
                            required
                        >
                            <option value="">Select attending doctor</option>
                            <option value="Dr. Verma (Med)">Dr. Verma (Med)</option>
                            <option value="Dr. Mehra (Endo)">Dr. Mehra (Endo)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Treatment / Diagnosis</label>
                        <input
                            value={treatment}
                            onChange={(e) => setTreatment(e.target.value)}
                            placeholder="Brief description of treatment"
                            className="admin-input"
                        />
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
                        <input
                            type="number"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                            className="admin-input"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Payment Option</label>
                        <select
                            value={paymentOption}
                            onChange={(e) => setPaymentOption(e.target.value)}
                            className="admin-input cursor-pointer"
                        >
                            <option>Cash</option>
                            <option>Online</option>
                            <option>Credit</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Paid Amount (Rs.)</label>
                        <input
                            type="number"
                            value={paidAmount}
                            onChange={(e) => setPaidAmount(e.target.value)}
                            className="admin-input"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Due Balance (Rs.)</label>
                        <input
                            value={dueBalance}
                            readOnly
                            className="admin-input bg-admin-surface font-bold cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="admin-label">Expense (Rs.)</label>
                        <input
                            type="number"
                            value={expense}
                            onChange={(e) => setExpense(e.target.value)}
                            className="admin-input"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pb-8">
                <button
                    onClick={clearForm}
                    className="px-8 py-2.5 admin-button-secondary text-sm font-bold border border-admin-border rounded-xl"
                >
                    Clear Form
                </button>
                <button
                    onClick={handleSave}
                    className="px-8 py-2.5 admin-button-primary flex items-center gap-2 text-sm font-bold"
                >
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
