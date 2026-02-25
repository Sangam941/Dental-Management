import React, { useState } from 'react';
import {
    Info,
    Package,
    Wallet,
    FileText,
    Calendar,
    ChevronDown,
    Save,
    ArrowLeft,
    Pill,
    Briefcase,
    Hash
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const medCategories = ['Medicine', 'Vaccine', 'Surgical', 'Equipment', 'Other'];
const medSubCategories = ['Antibiotics', 'Analgesic', 'Antihistamine', 'Antacid', 'Vitamins', 'General'];

const svcCategories = ['Consultation', 'Laboratory', 'Radiology', 'Procedure', 'Nursing', 'Other'];
const svcSubCategories = ['OPD', 'IPD', 'Emergency', 'ICU', 'Pathology', 'Imaging'];
const departments = ['General Medicine', 'Dental', 'Orthopedics', 'Cardiology', 'Pediatrics', 'Gynecology', 'ENT', 'Radiology', 'Pathology', 'Physiotherapy'];

const AddItem: React.FC = () => {
    const navigate = useNavigate();
    const [itemType, setItemType] = useState<'medicine' | 'service'>('medicine');

    // Medicine individual states
    const [medName, setMedName] = useState('');
    const [medGenericName, setMedGenericName] = useState('');
    const [medCategory, setMedCategory] = useState('');
    const [medSubCategory, setMedSubCategory] = useState('');
    const [medUnitType, setMedUnitType] = useState('');
    const [medRackNo, setMedRackNo] = useState('');
    const [medInitialStock, setMedInitialStock] = useState('');
    const [medExpiryDate, setMedExpiryDate] = useState('');
    const [medPurchasePrice, setMedPurchasePrice] = useState('');
    const [medSalePrice, setMedSalePrice] = useState('');
    const [medTaxRate, setMedTaxRate] = useState('');
    const [medNotes, setMedNotes] = useState('');

    // Service individual states
    const [svcName, setSvcName] = useState('');
    const [svcCode, setSvcCode] = useState('');
    const [svcDepartment, setSvcDepartment] = useState('');
    const [svcCategory, setSvcCategory] = useState('');
    const [svcSubCategory, setSvcSubCategory] = useState('');
    const [svcBasePrice, setSvcBasePrice] = useState('');
    const [svcTaxRate, setSvcTaxRate] = useState('');
    const [svcDescription, setSvcDescription] = useState('');

    const totalServiceFee = (() => {
        const base = parseFloat(svcBasePrice) || 0;
        const tax = parseFloat(svcTaxRate) || 0;
        return (base + (base * tax) / 100).toFixed(2);
    })();

    const handleSave = () => {
        if (itemType === 'medicine') {
            const medicineData = {
                name: medName,
                genericName: medGenericName,
                category: medCategory,
                subCategory: medSubCategory,
                unitType: medUnitType,
                rackNo: medRackNo,
                initialStock: medInitialStock,
                expiryDate: medExpiryDate,
                purchasePrice: medPurchasePrice,
                salePrice: medSalePrice,
                taxRate: medTaxRate,
                notes: medNotes
            };
            console.log('Saving Medicine:', medicineData);
        } else {
            const serviceData = {
                name: svcName,
                code: svcCode,
                department: svcDepartment,
                category: svcCategory,
                subCategory: svcSubCategory,
                basePrice: svcBasePrice,
                taxRate: svcTaxRate,
                totalFee: totalServiceFee,
                description: svcDescription
            };
            console.log('Saving Service:', serviceData);
        }
        // navigate('/admin/inventory');
    };

    return (
        <div className="px-8 py-2 max-w-[1200px] mx-auto space-y-8 pb-12">
            <Link
                to="/admin/inventory"
                className="flex items-center gap-1 group w-fit -mb-1 -ml-2"
            >
                <div className="p-2 rounded-full group-hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={16} className="text-admin-primary transition-transform group-hover:-translate-x-1" />
                </div>
                <h1 className="text-base font-bold text-admin-primary">
                    Back to Inventory
                </h1>
            </Link>

            {/* Header with Toggle */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl admin-title">Add New Item</h1>
                    <p className="text-admin-text-muted mt-1 font-medium">
                        {itemType === 'medicine'
                            ? 'Create a new medicine or product entry in the inventory.'
                            : 'Create a new service entry in the hospital catalog.'}
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex bg-admin-surface p-1 rounded-2xl border border-admin-border">
                    <button
                        onClick={() => setItemType('medicine')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${itemType === 'medicine'
                            ? 'bg-white text-admin-primary shadow-sm border border-admin-border'
                            : 'text-admin-text-faint hover:text-admin-text-muted'
                            }`}
                    >
                        <Pill size={16} />
                        Medicine
                    </button>
                    <button
                        onClick={() => setItemType('service')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${itemType === 'service'
                            ? 'bg-white text-admin-primary shadow-sm border border-admin-border'
                            : 'text-admin-text-faint hover:text-admin-text-muted'
                            }`}
                    >
                        <Briefcase size={16} />
                        Service
                    </button>
                </div>
            </div>

            {/* ── MEDICINE FORM ───────────────────────────────────── */}
            {itemType === 'medicine' && (
                <>
                    {/* Basic Information */}
                    <div className="admin-card overflow-hidden">
                        <div className="admin-section-header">
                            <Info size={18} className="text-admin-primary" />
                            Basic Information
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-1.5">
                                    <label className="admin-label">Item Name</label>
                                    <input
                                        type="text"
                                        value={medName}
                                        onChange={e => setMedName(e.target.value)}
                                        placeholder="e.g. Paracetamol 500mg"
                                        className="admin-input"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Generic Name / Code</label>
                                    <input
                                        type="text"
                                        value={medGenericName}
                                        onChange={e => setMedGenericName(e.target.value)}
                                        placeholder="e.g. Acetaminophen"
                                        className="admin-input"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Category</label>
                                    <div className="relative">
                                        <select
                                            value={medCategory}
                                            onChange={e => setMedCategory(e.target.value)}
                                            className="admin-input appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="">Select Category</option>
                                            {medCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Sub-Category</label>
                                    <div className="relative">
                                        <select
                                            value={medSubCategory}
                                            onChange={e => setMedSubCategory(e.target.value)}
                                            className="admin-input appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="">Select Sub-Category</option>
                                            {medSubCategories.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Details */}
                    <div className="admin-card overflow-hidden">
                        <div className="admin-section-header">
                            <Package size={18} className="text-admin-primary" />
                            Inventory Details
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-1.5">
                                    <label className="admin-label">Unit Type</label>
                                    <input
                                        type="text"
                                        value={medUnitType}
                                        onChange={e => setMedUnitType(e.target.value)}
                                        placeholder="e.g. Box, Strip, Bottle"
                                        className="admin-input"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Rack No / Location</label>
                                    <input
                                        type="text"
                                        value={medRackNo}
                                        onChange={e => setMedRackNo(e.target.value)}
                                        placeholder="e.g. A-12"
                                        className="admin-input"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Initial Stock</label>
                                    <input
                                        type="number"
                                        value={medInitialStock}
                                        onChange={e => setMedInitialStock(e.target.value)}
                                        placeholder="0"
                                        className="admin-input"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Expiry Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={medExpiryDate}
                                            onChange={e => setMedExpiryDate(e.target.value)}
                                            className="admin-input pr-10"
                                        />
                                        <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Tax */}
                    <div className="admin-card overflow-hidden">
                        <div className="admin-section-header">
                            <Wallet size={18} className="text-admin-primary" />
                            Pricing & Tax
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-1.5">
                                    <label className="admin-label">Purchase Price (Rs.)</label>
                                    <input
                                        type="text"
                                        value={medPurchasePrice}
                                        onChange={e => setMedPurchasePrice(e.target.value)}
                                        placeholder="0.00"
                                        className="admin-input"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Sale Price (Rs.)</label>
                                    <input
                                        type="text"
                                        value={medSalePrice}
                                        onChange={e => setMedSalePrice(e.target.value)}
                                        placeholder="0.00"
                                        className="admin-input"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Tax Rate (%)</label>
                                    <input
                                        type="text"
                                        value={medTaxRate}
                                        onChange={e => setMedTaxRate(e.target.value)}
                                        placeholder="0"
                                        className="admin-input"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description / Notes */}
                    <div className="admin-card overflow-hidden">
                        <div className="admin-section-header">
                            <FileText size={18} className="text-admin-primary" />
                            Description / Notes
                        </div>
                        <div className="p-8">
                            <textarea
                                value={medNotes}
                                onChange={e => setMedNotes(e.target.value)}
                                placeholder="Add any additional details about the medicine..."
                                className="admin-input min-h-[150px] py-4 resize-none"
                            />
                        </div>
                    </div>
                </>
            )}

            {/* ── SERVICE FORM ────────────────────────────────────── */}
            {itemType === 'service' && (
                <>
                    {/* Service Details */}
                    <div className="admin-card overflow-hidden">
                        <div className="admin-section-header">
                            <FileText size={18} className="text-admin-primary" />
                            Service Details
                        </div>
                        <div className="p-8 space-y-8">
                            {/* Service Name - full width */}
                            <div className="space-y-1.5">
                                <label className="admin-label">Service Name</label>
                                <input
                                    type="text"
                                    value={svcName}
                                    onChange={e => setSvcName(e.target.value)}
                                    placeholder="e.g. Complete Blood Count (CBC)"
                                    className="admin-input"
                                />
                            </div>

                            {/* Service Code + Department */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-1.5">
                                    <label className="admin-label">Service Code (Unique ID)</label>
                                    <div className="relative">
                                        <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                        <input
                                            type="text"
                                            value={svcCode}
                                            onChange={e => setSvcCode(e.target.value)}
                                            placeholder="e.g. SVC-90210"
                                            className="admin-input pl-9"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Department</label>
                                    <div className="relative">
                                        <select
                                            value={svcDepartment}
                                            onChange={e => setSvcDepartment(e.target.value)}
                                            className="admin-input appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                    </div>
                                </div>

                                {/* Category + Sub-Category */}
                                <div className="space-y-1.5">
                                    <label className="admin-label">Category</label>
                                    <div className="relative">
                                        <select
                                            value={svcCategory}
                                            onChange={e => setSvcCategory(e.target.value)}
                                            className="admin-input appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="">Select Category</option>
                                            {svcCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="admin-label">Sub-Category</label>
                                    <div className="relative">
                                        <select
                                            value={svcSubCategory}
                                            onChange={e => setSvcSubCategory(e.target.value)}
                                            className="admin-input appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="">Select Sub-Category</option>
                                            {svcSubCategories.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Information */}
                    <div className="admin-card overflow-hidden">
                        <div className="admin-section-header">
                            <Wallet size={18} className="text-admin-primary" />
                            Pricing Information
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                                {/* Base Price */}
                                <div className="space-y-1.5">
                                    <label className="admin-label">Base Price (Rs.)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-muted font-bold text-sm pointer-events-none">Rs.</span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={svcBasePrice}
                                            onChange={e => setSvcBasePrice(e.target.value)}
                                            className="admin-input pl-12"
                                        />
                                    </div>
                                </div>

                                {/* Tax / VAT */}
                                <div className="space-y-1.5">
                                    <label className="admin-label">Tax / VAT (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={svcTaxRate}
                                            onChange={e => setSvcTaxRate(e.target.value)}
                                            className="admin-input pr-10"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-text-faint font-bold text-sm pointer-events-none">%</span>
                                    </div>
                                </div>

                                {/* Total Service Fee - auto-calculated */}
                                <div className="space-y-1.5">
                                    <label className="admin-label">Total Service Fee</label>
                                    <div className="relative bg-admin-surface border border-admin-border rounded-xl px-4 py-2.5 flex items-center justify-between">
                                        <span className="text-admin-text-muted font-bold text-sm">Rs.</span>
                                        <span className="text-admin-text font-black text-lg">{totalServiceFee}</span>
                                    </div>
                                    <p className="text-[10px] text-admin-text-faint font-bold text-right">Auto-calculated</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="admin-card overflow-hidden">
                        <div className="admin-section-header">
                            <Info size={18} className="text-admin-primary" />
                            Additional Information
                        </div>
                        <div className="p-8">
                            <div className="space-y-1.5">
                                <label className="admin-label">Service Description</label>
                                <textarea
                                    value={svcDescription}
                                    onChange={e => setSvcDescription(e.target.value)}
                                    placeholder="Describe the service, preparation required for patient, etc."
                                    className="admin-input min-h-[150px] py-4 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={() => navigate('/admin/inventory')}
                    className="px-8 py-3 admin-button-secondary text-sm font-bold"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-8 py-3 admin-button-primary flex items-center gap-2 text-sm font-bold"
                >
                    <Save size={18} />
                    Save Item
                </button>
            </div>
        </div>
    );
};

export default AddItem;
