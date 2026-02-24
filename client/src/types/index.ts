export interface Doctor {
    name: string;
    specialty: string;
    description: string;
    imageUrl: string;
    rating: number;
    experience: number;
    languages: string[];
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
