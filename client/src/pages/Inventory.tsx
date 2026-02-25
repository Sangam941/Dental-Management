import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    ChevronDown,
    Package,
    Stethoscope,
    AlertTriangle,
    Archive,
    RotateCcw
} from 'lucide-react';

const stats = [
    { title: 'TOTAL MEDICINES', count: '1,284', icon: Archive, color: 'blue' },
    { title: 'TOTAL SERVICES', count: '42', icon: Stethoscope, color: 'purple' },
    { title: 'LOW STOCK ITEMS', count: '12', icon: AlertTriangle, color: 'rose' }
];

const categories = ['All Categories', 'Medicine', 'Service'];
const subCategories = ['All Sub-Categories', 'Antibiotics', 'OPD', 'Radiology', 'Diabetes Care', 'Lab Test', 'Analgesic'];

import { DUMMY_INVENTORY as initialInventory } from '../data/dummyData';

const Inventory: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All Sub-Categories');
    const [inventoryList] = useState(initialInventory);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = inventoryList.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
        const matchesSubCategory = selectedSubCategory === 'All Sub-Categories' || item.subCategory === selectedSubCategory;

        return matchesSearch && matchesCategory && matchesSubCategory;
    });

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All Categories');
        setSelectedSubCategory('All Sub-Categories');
    };

    return (
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 bg-admin-bg min-h-screen">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-admin-text tracking-tight">Medicine & Services Inventory</h1>
                    <p className="text-admin-text-muted text-sm mt-1">Manage all medical supplies and service offerings in one unified view.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/inventory/add-item')}
                    className="flex items-center gap-2 px-6 py-3 bg-admin-primary text-white rounded-xl shadow-lg shadow-admin-primary/20 hover:bg-admin-primary-hover transition-all font-bold text-sm"
                >
                    <Plus size={18} strokeWidth={3} />
                    Add New Item
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm flex items-center gap-6 group hover:border-admin-primary/30 transition-all cursor-default">
                        <div className={`p-4 rounded-xl bg-admin-surface text-admin-text-muted group-hover:text-admin-primary transition-colors`}>
                            <stat.icon size={28} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-admin-text-muted tracking-widest uppercase">{stat.title}</p>
                            <h3 className="text-3xl font-black text-admin-text leading-none mt-1">{stat.count}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-3 space-y-1.5">
                        <label className="admin-label">Category</label>
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-4 pr-10 py-3 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all appearance-none cursor-pointer"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" size={16} />
                        </div>
                    </div>

                    <div className="md:col-span-3 space-y-1.5">
                        <label className="admin-label">Sub-Category</label>
                        <div className="relative">
                            <select
                                value={selectedSubCategory}
                                onChange={(e) => setSelectedSubCategory(e.target.value)}
                                className="w-full pl-4 pr-10 py-3 bg-admin-surface border border-admin-border rounded-xl text-xs font-bold text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all appearance-none cursor-pointer"
                            >
                                {subCategories.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" size={16} />
                        </div>
                    </div>

                    <div className="md:col-span-5 space-y-1.5">
                        <label className="admin-label">Search</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-text-faint" size={18} />
                            <input
                                type="text"
                                placeholder="Search by item name, code, or batch number..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-admin-surface border border-admin-border rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-admin-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <button
                            onClick={resetFilters}
                            className="w-full p-3 bg-admin-surface border border-admin-border rounded-xl text-admin-text-muted hover:bg-white hover:text-admin-primary transition-all flex items-center justify-center gap-2 group"
                        >
                            <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                            <span className="md:hidden font-bold text-xs uppercase">Reset</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-3xl border border-admin-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-white border-b border-admin-border-subtle">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Item Name</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Category</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Sub-Category</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Code/Batch</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Price</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-admin-text-faint uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border-subtle">
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-admin-surface/30 transition-colors group">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl ${item.category === 'Medicine' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'} group-hover:scale-110 transition-transform`}>
                                                {item.category === 'Medicine' ? <Package size={18} /> : <Stethoscope size={18} />}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-admin-text leading-tight">{item.name}</h4>
                                                <p className="text-[10px] font-bold text-admin-text-faint">{item.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight ${item.category === 'Medicine' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-admin-text-muted">
                                        {item.subCategory}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-admin-text-muted">
                                        {item.code}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-admin-text">
                                        Rs. {item.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full bg-${item.statusColor}-500 animate-pulse`} />
                                            <span className={`text-[11px] font-black text-${item.statusColor}-600`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-admin-text-faint hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
                                                <Pencil size={18} />
                                            </button>
                                            <button className="p-2 text-admin-text-faint hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="px-8 py-5 border-t border-admin-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-bold text-admin-text-muted">
                        Showing <span className="text-admin-text">1 to {filteredItems.length}</span> of <span className="text-admin-text">97</span> results
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button className="p-2 border border-admin-border rounded-xl text-admin-text hover:bg-admin-surface transition-all">
                            <ChevronDown className="rotate-90" size={16} />
                        </button>
                        {[1, 2, 3, '...', 10].map((page, idx) => (
                            <button
                                key={idx}
                                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${currentPage === page
                                    ? 'bg-admin-primary text-white shadow-lg shadow-admin-primary/20'
                                    : 'text-admin-text-muted hover:bg-admin-surface border border-admin-border'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button className="p-2 border border-admin-border rounded-xl text-admin-text hover:bg-admin-surface transition-all">
                            <ChevronDown className="-rotate-90" size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
