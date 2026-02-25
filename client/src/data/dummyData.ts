import type {
    Patient,
    Doctor,
    Appointment,
    InventoryItem,
    Department,
    OPDRecord,
    OPDStatsData
} from '../types';

export const DUMMY_PATIENTS: Patient[] = [
    {
        id: '#PT-8832',
        name: 'Sarah Jenkins',
        email: 'sarah.j@email.com',
        phone: '+977 98510 12345',
        gender: 'Female',
        age: 34,
        bloodGroup: 'O+',
        lastVisit: 'Oct 24, 2023',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ca197ec2?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#PT-8833',
        name: 'Michael Chen',
        email: 'm.chen92@email.com',
        phone: '+977 98412 34567',
        gender: 'Male',
        age: 45,
        bloodGroup: 'A+',
        lastVisit: 'Oct 23, 2023',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#PT-8834',
        name: 'Marcus Johnson',
        email: 'marcus.j@email.com',
        phone: '+977 98033 44556',
        gender: 'Male',
        age: 29,
        bloodGroup: 'B-',
        lastVisit: 'Oct 22, 2023',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#PT-8835',
        name: 'Emily Parker',
        email: 'emily.p@email.com',
        phone: '+977 98510 99887',
        gender: 'Female',
        age: 62,
        bloodGroup: 'AB+',
        lastVisit: 'Oct 21, 2023',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#PT-8836',
        name: 'David Kim',
        email: 'david.k@email.com',
        phone: '+977 98123 45678',
        gender: 'Male',
        age: 55,
        bloodGroup: 'O-',
        lastVisit: 'Oct 20, 2023',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#PT-8837',
        name: 'Ramesh Pokharel',
        email: 'ramesh.p@leafclutch.com.np',
        phone: '+977 98415 67890',
        gender: 'Male',
        age: 42,
        bloodGroup: 'A-',
        lastVisit: 'Oct 19, 2023',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#PT-8838',
        name: 'Sita Thapa',
        email: 'sita.thapa@leafclutch.com.np',
        phone: '+977 98012 34567',
        gender: 'Female',
        age: 28,
        bloodGroup: 'B+',
        lastVisit: 'Oct 18, 2023',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100'
    }
];

export const DUMMY_DOCTORS: Doctor[] = [
    {
        id: '#DOC-082',
        name: 'Dr. Rajesh Hamal',
        role: 'Doctor',
        dept: 'Cardiology',
        contact: '+977 98510 12345',
        email: 'rajesh.hamal@leafclutch.com.np',
        status: 'On Duty',
        isActive: true,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ca197ec2?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#DOC-156',
        name: 'Dr. Sanduk Ruit',
        role: 'Doctor',
        dept: 'Ophthalmology',
        contact: '+977 98033 44556',
        email: 'sanduk.ruit@leafclutch.com.np',
        status: 'On Duty',
        isActive: true,
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#DOC-189',
        name: 'Dr. Bhagawan Koirala',
        role: 'Doctor',
        dept: 'Cardiology',
        contact: '+977 98415 67890',
        email: 'bhagawan.k@leafclutch.com.np',
        status: 'On Call',
        isActive: true,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#DOC-210',
        name: 'Dr. Shristi Shrestha',
        role: 'Doctor',
        dept: 'Pediatrics',
        contact: '+977 98011 22334',
        email: 'shristi.shrestha@leafclutch.com.np',
        status: 'On Duty',
        isActive: true,
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#DOC-233',
        name: 'Dr. Arjun Thapa',
        role: 'Doctor',
        dept: 'Neurology',
        contact: '+977 98560 77889',
        email: 'arjun.thapa@leafclutch.com.np',
        status: 'Off Duty',
        isActive: false,
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: '#DOC-247',
        name: 'Dr. Priya Adhikari',
        role: 'Doctor',
        dept: 'Radiology',
        contact: '+977 98110 55443',
        email: 'priya.adhikari@leafclutch.com.np',
        status: 'Break',
        isActive: true,
        image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=100'
    }
];

export const DUMMY_APPOINTMENTS: Appointment[] = [
    {
        id: 'APP-001',
        patient: 'Ram Bahadur Thapa',
        age: 45,
        gender: 'Male',
        phone: '9841234567',
        doctor: 'Dr. Rajesh Kumar',
        department: 'General Medicine',
        date: '2023-11-20',
        time: '10:30 AM',
        type: 'Walk-in',
        status: 'Confirmed',
        priority: 'Normal'
    },
    {
        id: 'APP-002',
        patient: 'Sita Maya Rai',
        age: 28,
        gender: 'Female',
        phone: '9801234568',
        doctor: 'Dr. Anita Sharma',
        department: 'Dental',
        date: '2023-11-20',
        time: '11:00 AM',
        type: 'Online',
        status: 'Pending',
        priority: 'Urgent'
    },
    {
        id: 'APP-003',
        patient: 'Krishna Prasad Ohli',
        age: 62,
        gender: 'Male',
        phone: '9811234569',
        doctor: 'Dr. Binod Thapa',
        department: 'Orthopedics',
        date: '2023-11-20',
        time: '02:30 PM',
        type: 'Follow-up',
        status: 'Completed',
        priority: 'Normal'
    },
    {
        id: 'APP-004',
        patient: 'Maya Devi Tamang',
        age: 12,
        gender: 'Female',
        phone: '9841234570',
        doctor: 'Dr. Kiran Poudel',
        department: 'Pediatrics',
        date: '2023-11-21',
        time: '09:00 AM',
        type: 'Walk-in',
        status: 'Cancelled',
        priority: 'Normal'
    }
];

export const DUMMY_DEPARTMENTS: Department[] = [
    {
        id: '#DEPT-001',
        name: 'Cardiology',
        head: 'Dr. Rajesh Hamal',
        totalStaff: 18,
        activeStaff: 16,
        location: 'Block A, Floor 2',
        status: 'Active',
        established: '2015'
    },
    {
        id: '#DEPT-002',
        name: 'Ophthalmology',
        head: 'Dr. Sanduk Ruit',
        totalStaff: 12,
        activeStaff: 12,
        location: 'Block B, Floor 1',
        status: 'Active',
        established: '2016'
    },
    {
        id: '#DEPT-003',
        name: 'Pediatrics',
        head: 'Dr. Shristi Shrestha',
        totalStaff: 22,
        activeStaff: 20,
        location: 'Block C, Floor 3',
        status: 'Active',
        established: '2014'
    },
    {
        id: '#DEPT-004',
        name: 'Neurology',
        head: 'Dr. Arjun Thapa',
        totalStaff: 15,
        activeStaff: 13,
        location: 'Block A, Floor 4',
        status: 'Active',
        established: '2018'
    },
    {
        id: '#DEPT-005',
        name: 'Radiology',
        head: 'Dr. Priya Adhikari',
        totalStaff: 10,
        activeStaff: 9,
        location: 'Block D, Floor 1',
        status: 'Active',
        established: '2017'
    },
    {
        id: '#DEPT-006',
        name: 'Emergency',
        head: 'Dr. Bikash Karki',
        totalStaff: 30,
        activeStaff: 28,
        location: 'Block E, Ground Floor',
        status: 'Active',
        established: '2013'
    },
    {
        id: '#DEPT-007',
        name: 'Orthopedics',
        head: 'Dr. Suresh Basnet',
        totalStaff: 14,
        activeStaff: 10,
        location: 'Block B, Floor 3',
        status: 'Under Maintenance',
        established: '2019'
    },
    {
        id: '#DEPT-008',
        name: 'Dermatology',
        head: 'Dr. Anita Tamang',
        totalStaff: 8,
        activeStaff: 0,
        location: 'Block F, Floor 2',
        status: 'Inactive',
        established: '2020'
    },
];

export const DUMMY_INVENTORY: InventoryItem[] = [
    {
        id: 1,
        name: 'Amoxicillin 500mg',
        type: 'Capsule',
        category: 'Medicine',
        subCategory: 'Antibiotics',
        code: 'BT-2023-X9',
        price: '12.00',
        status: 'In Stock',
        statusColor: 'emerald'
    },
    {
        id: 2,
        name: 'General OPD Consult',
        type: 'Dr. Smith',
        category: 'Service',
        subCategory: 'OPD',
        code: 'SRV-001',
        price: '50.00',
        status: 'Active',
        statusColor: 'emerald'
    },
    {
        id: 3,
        name: 'Chest X-Ray',
        type: 'Standard View',
        category: 'Service',
        subCategory: 'Radiology',
        code: 'RAD-XRAY-05',
        price: '85.00',
        status: 'Active',
        statusColor: 'emerald'
    },
    {
        id: 4,
        name: 'Insulin Glargine',
        type: 'Injectable',
        category: 'Medicine',
        subCategory: 'Diabetes Care',
        code: 'INS-GL-99',
        price: '120.00',
        status: 'Low Stock',
        statusColor: 'amber'
    },
    {
        id: 5,
        name: 'CBC Blood Test',
        type: 'Pathology',
        category: 'Service',
        subCategory: 'Lab Test',
        code: 'LAB-BLD-02',
        price: '25.00',
        status: 'Active',
        statusColor: 'emerald'
    },
    {
        id: 6,
        name: 'Paracetamol 500mg',
        type: 'Tablet',
        category: 'Medicine',
        subCategory: 'Analgesic',
        code: 'PARA-500-T',
        price: '2.50',
        status: 'Out of Stock',
        statusColor: 'rose'
    }
];

export const DUMMY_OPD_RECORDS: OPDRecord[] = [
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

export const DUMMY_OPD_STATS: OPDStatsData = {
    totalAmount: 45850,
    totalTrend: 12.5,
    counterCash: 28400,
    cashTrend: 8.2,
    onlinePay: 17450,
    onlineTrend: 15.1,
    totalExpenses: 5200,
    expenseTrend: -2.4
};

// Derived or generic lists
export const DEPARTMENTS_LIST = [
    'General Medicine',
    'Dental',
    'Orthopedics',
    'Cardiology',
    'Pediatrics',
    'Gynecology',
    'ENT',
    'Radiology',
    'Pathology',
    'Physiotherapy',
    'Neurology',
    'Ophthalmology',
    'Dermatology',
    'Emergency',
    'Pharmacy'
];

export const DOCTORS_LIST = DUMMY_DOCTORS.map(d => `${d.name} (${d.dept})`);

export const APPOINTMENT_TYPES = [
    'Walk-in',
    'Online',
    'Follow-up',
    'Emergency',
    'Referred',
];

export const TIME_SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM',
]; export const DUMMY_DASHBOARD_STATS = [
    {
        title: "Total Doctors",
        value: "142",
        trend: { value: "+5.2%", isPositive: true },
        subtext: "vs last month",
        color: "blue"
    },
    {
        title: "Total Revenue",
        value: "Rs. 24,58,400",
        trend: { value: "+12.5%", isPositive: true },
        subtext: "vs last month",
        color: "emerald"
    },
    {
        title: "Total Patients (OPD)",
        value: "3,845",
        trend: { value: "-2.4%", isPositive: false },
        subtext: "vs last month",
        color: "purple"
    },
    {
        title: "Active Doctors",
        value: "86",
        color: "amber",
        status: {
            label: "High Avail.",
            sublabel: "Currently On-Duty",
            type: 'success'
        }
    }
];

export const DUMMY_WEEKLY_REVENUE = [
    { day: 'Mon', revenue: 12400, expenses: 3200 },
    { day: 'Tue', revenue: 18200, expenses: 4100 },
    { day: 'Wed', revenue: 15800, expenses: 3600 },
    { day: 'Thu', revenue: 24500, expenses: 5200 },
    { day: 'Fri', revenue: 21000, expenses: 4800 },
    { day: 'Sat', revenue: 28400, expenses: 6100 },
    { day: 'Sun', revenue: 19700, expenses: 4400 },
];

export const DUMMY_MONTHLY_REVENUE = [
    { day: 'Week 1', revenue: 84200, expenses: 22000 },
    { day: 'Week 2', revenue: 96500, expenses: 25400 },
    { day: 'Week 3', revenue: 110300, expenses: 28600 },
    { day: 'Week 4', revenue: 128700, expenses: 31200 },
];

export const DUMMY_DEPT_SALES = [
    { name: 'Cardiology', patients: 245, percentage: 35, color: 'bg-blue-500', iconType: 'heart' },
    { name: 'Neurology', patients: 180, percentage: 28, color: 'bg-emerald-500', iconType: 'brain' },
    { name: 'General Med', patients: 310, percentage: 22, color: 'bg-amber-500', iconType: 'user' },
    { name: 'Others', patients: 105, percentage: 15, color: 'bg-slate-400', iconType: 'more' },
];

export const DUMMY_ACTIVITIES = [
    {
        id: 'OPD-2023-1024',
        patient: 'Amit Sharma',
        avatar: 'AS',
        dept: 'General',
        doctor: 'Dr. Verma',
        amount: 'Rs. 500',
        status: 'Completed'
    },
    {
        id: 'OPD-2023-1025',
        patient: 'Priya Singh',
        avatar: 'PS',
        dept: 'Endocrinology',
        doctor: 'Dr. Mehra',
        amount: 'Rs. 1,250',
        status: 'Completed'
    },
    {
        id: 'OPD-2023-1026',
        patient: 'Rakesh Gupta',
        avatar: 'RG',
        dept: 'Radiology',
        doctor: 'Dr. Khan',
        amount: 'Rs. 3,500',
        status: 'Pending'
    },
    {
        id: 'OPD-2023-1027',
        patient: 'Suman Devi',
        avatar: 'SD',
        dept: 'Medicine',
        doctor: 'Dr. Verma',
        amount: 'Rs. 150',
        status: 'Completed'
    }
];
