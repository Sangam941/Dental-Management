import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import OPDStats from '../components/opd/OPDStats';
import OPDTable from '../components/opd/OPDTable';
import type { OPDRecord, OPDStatsData } from '../types';

const dummyRecords: OPDRecord[] = [
    {
        id: '1',
        sn: '01',
        regNo: 'HF-2023-0842',
        patientName: 'Amit Sharma',
        age: '34Y',
        address: 'Block B, City Center',
        phone: '9876543210',
        treatment: 'General Checkup',
        doctor: 'Dr. Verma (Med)',
        total: 500,
        payOption: 'CASH',
        paid: 500,
        status: 'PAID',
        date: '2023-10-24',
        department: 'Medicine'
    },
    {
        id: '2',
        sn: '02',
        regNo: 'HF-2023-0843',
        patientName: 'Priya Singh',
        age: '28Y',
        address: 'Sunrise Apts, Lane 4',
        phone: '8877665544',
        treatment: 'Thyroid Panel',
        doctor: 'Dr. Mehra (Endo)',
        total: 1250,
        payOption: 'ONLINE',
        paid: 1250,
        status: 'PAID',
        date: '2023-10-24',
        department: 'Endocrinology'
    },
    {
        id: '3',
        sn: '03',
        regNo: 'HF-2023-0844',
        patientName: 'Rakesh Gupta',
        age: '56Y',
        address: 'Old Town, Sector 12',
        phone: '9900112233',
        treatment: 'X-Ray (Chest)',
        doctor: 'Dr. Khan (Radio)',
        total: 3500,
        payOption: 'CASH',
        paid: 2000,
        status: 'PARTIAL',
        date: '2023-10-24',
        department: 'Radiology'
    },
    {
        id: '4',
        sn: '04',
        regNo: 'HF-2023-0845',
        patientName: 'Hospital Maintenance',
        age: 'N/A',
        address: 'Oxygen Cylinder Refill',
        phone: '-',
        treatment: 'Procurement',
        doctor: '-',
        total: 0,
        payOption: 'CASH',
        paid: 0,
        status: 'PAID',
        date: '2023-10-24',
        department: 'General'
    },
    {
        id: '5',
        sn: '05',
        regNo: 'HF-2023-0846',
        patientName: 'Suman Devi',
        age: '42Y',
        address: 'Railway Colony',
        phone: '7766554433',
        treatment: 'Blood Sugar Test',
        doctor: 'Dr. Verma (Med)',
        total: 150,
        payOption: 'CREDIT',
        paid: 150,
        status: 'PAID',
        date: '2023-10-24',
        department: 'Medicine'
    }
];

const dummyStats: OPDStatsData = {
    totalAmount: 45850,
    totalTrend: 12.5,
    counterCash: 28400,
    cashTrend: 8.2,
    onlinePay: 17450,
    onlineTrend: 15.1,
    totalExpenses: 5200,
    expenseTrend: -2.4
};

const DailyOPDManagement: React.FC = () => {
    return (
        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
                <div>
                    <h1 className="text-2xl lg:text-3xl admin-title">Daily OPD Management</h1>
                    <p className="text-admin-text-muted mt-1 font-medium text-xs lg:text-sm">Record for: <span className="text-admin-text font-bold">Oct 24, 2023</span></p>
                </div>
                <Link
                    to="/admin/opd-management/opd-entry"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 admin-button-primary text-sm"
                >
                    <Plus size={18} />
                    New OPD Entry
                </Link>
            </div>

            <OPDStats stats={dummyStats} />

            <OPDTable records={dummyRecords} />
        </div>
    );
};

export default DailyOPDManagement;
