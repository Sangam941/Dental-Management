export interface Doctor {
    id : string;
    fullName: string;
    department: Department;
    gender: string;
    phoneNumber: string;
    email: string;
    isActive: boolean;
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
    departmentName: string;
    isActive: boolean;
}

export interface NavItem {
    label: string;
    href: string;
}


export interface PatientPayload {
    id?: string;
    entryDate: string;
    entryMonth?: string;
    caseType: string;
    fullName: string;
    age: number;
    gender:string;
    address: string;
    phoneNumber: string;
    treatment: string;
    doctorId: string;
    doctor?: Doctor
}

export interface BillingPayload{
    id? : string;
    opdEntryId?: string | undefined;
    totalAmount: number;
    paymentMethod: string;
    dueAmount: number;
    paidAmount: number;
    expenseAmount: number;
    opdEntry?: PatientPayload
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
    role?: 'Admin' | 'Doctor';
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}
