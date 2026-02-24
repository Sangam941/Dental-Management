import React, { useState } from 'react';
import {
    Search,
    Briefcase,
    Filter,
    Download,
    ChevronDown,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import type { OPDRecord, PaymentOption } from '../../types';

interface OPDTableProps {
    records: OPDRecord[];
}

const OPDTable: React.FC<OPDTableProps> = ({ records }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('2023-10-24');
    const [selectedDept, setSelectedDept] = useState('All Departments');

    const filteredRecords = records.filter(record =>
        (record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.regNo.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedDept === 'All Departments' || record.department === selectedDept) &&
        (!selectedDate || record.date === selectedDate)
    );

    const getPayOptionColor = (option: PaymentOption) => {
        switch (option) {
            case 'CASH': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'ONLINE': return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'CREDIT': return 'bg-blue-50 text-blue-600 border-blue-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const dailyTotal = filteredRecords.reduce((sum, r) => sum + r.total, 0);
    const dailyPaid = filteredRecords.reduce((sum, r) => sum + r.paid, 0);

    return (
        <div className="admin-card overflow-hidden">
            {/* Filters Header */}
            <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4 items-center flex-1">
                    <div className="relative flex-1 min-w-[280px] max-w-md">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by Name, ID..."
                            className="admin-input pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="date"
                            className="admin-input"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <select
                            className="admin-input pl-10 cursor-pointer"
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                        >
                            <option>All Departments</option>
                            <option>Medicine</option>
                            <option>Endocrinology</option>
                            <option>Radiology</option>
                        </select>
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-admin-text-faint">
                            <Briefcase className="h-4 w-4" />
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="p-2 admin-button-secondary">
                        <Filter className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 admin-button-secondary text-sm">
                        <Download className="w-4 h-4" />
                        Export
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto overflow-y-hidden">
                <table className="w-full text-left border-collapse min-w-[1600px]">
                    <thead>
                        <tr className="admin-table-head">
                            <th className="px-6 py-5 font-black">SN</th>
                            <th className="px-6 py-5 font-black">Reg. No</th>
                            <th className="px-6 py-5 font-black">Patient Name</th>
                            <th className="px-6 py-5 font-black">Age</th>
                            <th className="px-6 py-5 font-black">Address & Ph. No</th>
                            <th className="px-6 py-5 font-black">Treatment</th>
                            <th className="px-6 py-5 font-black">Doctor</th>
                            <th className="px-6 py-5 font-black">Total</th>
                            <th className="px-6 py-5 font-black">Pay Option</th>
                            <th className="px-6 py-5 font-black">Paid</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-admin-surface/30 transition-colors text-sm text-admin-text group">
                                <td className="px-6 py-5 font-bold text-admin-text-faint">{record.sn}</td>
                                <td className="px-6 py-5 text-admin-primary font-extrabold whitespace-nowrap">{record.regNo}</td>
                                <td className="px-6 py-5">
                                    <h4 className="text-base admin-title whitespace-nowrap leading-tight">{record.patientName}</h4>
                                    <p className="text-[10px] text-admin-text-muted font-bold mt-0.5 tracking-tight uppercase">Patient Account</p>
                                </td>
                                <td className="px-6 py-5 text-admin-text-muted font-black">{record.age}</td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="text-sm font-bold text-admin-text leading-tight group-hover:text-admin-primary transition-colors">
                                            {record.address}
                                        </div>
                                        {record.phone && record.phone !== '-' && (
                                            <div className="text-[11px] font-bold text-admin-text-muted tracking-tight">
                                                Ph: {record.phone}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-admin-text-muted tracking-tight whitespace-nowrap">
                                        {record.treatment}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <h4 className="text-sm font-bold text-admin-text whitespace-nowrap">{record.doctor}</h4>
                                    <p className="text-[10px] text-admin-text-muted font-bold uppercase tracking-tight">Specialist</p>
                                </td>
                                <td className="px-6 py-5 font-black text-admin-text whitespace-nowrap">
                                    Rs. {record.total.toLocaleString('en-IN')}.00
                                </td>
                                <td className="px-6 py-5">
                                    <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider w-fit inline-flex items-center gap-1.5 ${getPayOptionColor(record.payOption)}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${record.payOption === 'CASH' ? 'bg-emerald-500' : record.payOption === 'ONLINE' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                                        {record.payOption}
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className={`font-black text-sm ${record.paid === record.total ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        Rs. {record.paid.toLocaleString('en-IN')}.00
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-admin-surface/50 font-black text-admin-text uppercase text-[11px] tracking-widest">
                            <td colSpan={7} className="px-6 py-6 text-right border-t border-admin-border-subtle">Daily Totals:</td>
                            <td className="px-6 py-6 text-admin-primary text-base border-t border-admin-border-subtle">Rs. {dailyTotal.toLocaleString('en-IN')}.00</td>
                            <td className="border-t border-admin-border-subtle"></td>
                            <td className="px-6 py-6 text-admin-success text-base border-t border-admin-border-subtle">Rs. {dailyPaid.toLocaleString('en-IN')}.00</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Pagination / Footer Info */}
            <div className="p-6 border-t border-admin-border-subtle flex items-center justify-between">
                <p className="text-sm text-admin-text-muted font-medium">
                    Showing <span className="text-admin-text">1</span> to <span className="text-admin-text">{filteredRecords.length}</span> of <span className="text-admin-text">24</span> records
                </p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-admin-border rounded-xl text-admin-text-faint cursor-not-allowed">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-2 border border-admin-border rounded-xl text-admin-text-muted hover:bg-admin-surface cursor-pointer">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OPDTable;
