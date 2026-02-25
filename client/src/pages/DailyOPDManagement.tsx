import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import OPDStats from '../components/opd/OPDStats';
import OPDTable from '../components/opd/OPDTable';


import { DUMMY_OPD_RECORDS as dummyRecords, DUMMY_OPD_STATS as dummyStats } from '../data/dummyData';

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
