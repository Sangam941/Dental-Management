export interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    age: number;
    bloodGroup: string;
    lastVisit: string;
    image: string;
}

export interface Doctor {
    id: string;
    name: string;
    role: string;
    dept: string;
    contact: string;
    email: string;
    status: string;
    isActive: boolean;
    image: string;
    specialty?: string;
    description?: string;
    rating?: number;
    experience?: number;
    languages?: string[];
}

export interface Appointment {
    id: string;
    patient: string;
    age: number;
    gender: string;
    phone: string;
    doctor: string;
    department: string;
    date: string;
    time: string;
    type: string;
    status: string;
    priority: string;
}

export interface InventoryItem {
    id: number;
    name: string;
    type: string;
    category: string;
    subCategory: string;
    code: string;
    price: string;
    status: string;
    statusColor: string;
}

export interface Department {
    id: string;
    name: string;
    head: string;
    totalStaff: number;
    activeStaff: number;
    location: string;
    status: 'Active' | 'Inactive' | 'Under Maintenance';
    established: string;
}

export interface NavItem {
    label: string;
    href: string;
}

export type PaymentOption = 'CASH' | 'ONLINE' | 'CREDIT';
export type PaymentStatus = 'PAID' | 'PARTIAL' | 'DUE';

export interface OPDRecord {
    id: string;
    sn: string;
    regNo: string;
    patientName: string;
    age: string;
    address: string;
    phone: string;
    treatment: string;
    doctor: string;
    total: number;
    payOption: PaymentOption;
    paid: number;
    status: PaymentStatus;
    date: string;
    department: string;
}

export interface OPDStatsData {
    totalAmount: number;
    totalTrend: number;
    counterCash: number;
    cashTrend: number;
    onlinePay: number;
    onlineTrend: number;
    totalExpenses: number;
    expenseTrend: number;
}

export interface User {
    id: string;
    name?: string;
    email: string;
    role: 'Admin' | 'Doctor' ;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}
