import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    ClipboardList,
    Settings,
    Hospital,
    LogOut,
    Menu,
    X,
    Archive,
    Building2
} from 'lucide-react';

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        {
            name: 'Dashboard',
            icon: <LayoutDashboard size={20} />,
            path: '/admin/dashboard'
        },
        {
            name: 'Manage Doctors',
            icon: <Stethoscope size={20} />,
            path: '/admin/manage-doctors'
        },
        {
            name: 'Appointments',
            icon: <ClipboardList size={20} />,
            path: '/admin/appointment'
        },
        {
            name: 'Patient Records',
            icon: <Users size={20} />,
            path: '/admin/patients'
        },
        {
            name: 'Inventory',
            icon: <Archive size={20} />,
            path: '/admin/inventory'
        },
        {
            name: 'Departments',
            icon: <Building2 size={20} />,
            path: '/admin/departments'
        },
        {
            name: 'Settings',
            icon: <Settings size={20} />,
            path: '/admin/settings'
        },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen bg-admin-bg font-display relative">
            {/* Mobile Backdrop Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] lg:hidden transition-all duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-72 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 shadow-sm z-[70] transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo Section */}
                <div className="p-8 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-admin-primary rounded-xl shadow-lg shadow-blue-200">
                            <Hospital size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl admin-title">HealthFirst</h2>
                            <p className="text-[10px] font-bold text-admin-text-muted uppercase tracking-widest">Hospital Management</p>
                        </div>
                    </div>
                    {/* Close button - Mobile only */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 text-slate-400 hover:text-slate-600 lg:hidden"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group
                                ${isActive
                                    ? 'bg-admin-primary text-white shadow-lg shadow-blue-200'
                                    : 'text-admin-text-muted hover:bg-slate-50 hover:text-admin-text'}
                            `}
                        >
                            <span className="transition-transform group-hover:scale-110">
                                {item.icon}
                            </span>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Profile & Logout Section */}
                <div className="border-t border-slate-100 bg-slate-100 flex flex-col items-start justify-center pb-5">
                    {/* User Profile Summary */}
                    <div className="p-4 rounded-2xl flex items-center gap-3 w-full">
                        <img
                            src="/images/admin/default-profile.webp"
                            alt="User"
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-admin-text truncate">Dr. Rajesh Kumar</h4>
                            <p className="text-[10px] font-bold text-admin-text-muted uppercase tracking-tight">Administrator</p>
                        </div>
                    </div>
                    <button className="flex mx-4 items-center justify-center border border-red-200 gap-3 w-[calc(100%-32px)] py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all cursor-pointer">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-72 overflow-x-hidden min-h-screen">
                {/* Global Search Header */}
                <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 px-4 lg:px-8 flex items-center justify-between gap-4">
                    {/* Hamburger Toggle - Mobile only */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl lg:hidden"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Global Search placeholder (Removied as per request) */}
                    <div className="flex-1" />

                    {/* Desktop Date Display (Hidden on very small mobile) */}
                    <div className="hidden sm:block text-right">
                        <p className="text-[10px] font-black text-admin-text-muted uppercase tracking-widest leading-none">Today's Date</p>
                        <p className="text-sm font-black text-admin-text mt-1 uppercase">October 24, 2023</p>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-0">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
