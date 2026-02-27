import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import OPDEntryForm from '../../../components/opd/OPDEntryForm';

const DailyOPDEntry: React.FC = () => {
    return (
        <div className="px-8 py-2 max-w-6xl mx-auto space-y-6">
            <Link
                to="/admin/opd-management"
                className="flex items-center gap-1 group w-fit -mb-1 -ml-2"
            >
                <div className="p-2 rounded-full group-hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={16} className="text-blue-600 group-hover:text-blue-600 transition-transform group-hover:-translate-x-1" />
                </div>
                <h1 className="text-base font-bold text-blue-600 group-hover:text-blue-600 transition-colors">
                    Back
                </h1>
            </Link>

            <OPDEntryForm />

            <div className="mt-8 text-center pt-8 border-t border-slate-100">
                <p className="text-[10px] text-admin-text-muted font-bold uppercase tracking-widest leading-loose">
                    HealthFirst v2.4.0 — Secured Administrative Access
                </p>
            </div>
        </div>
    );
};

export default DailyOPDEntry;
