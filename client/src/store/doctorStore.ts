import { create } from 'zustand';
import type { Doctor } from '../types';
import { getDoctors } from '../api/doctor';

interface DoctorStore {
    doctors: Doctor[];
    isLoading: boolean;
    error: string | null;
    fetchDoctors: () => Promise<void>;
    addDoctor: (doctor: Doctor) => void;
    updateDoctor: (id: string, updates: Partial<Doctor>) => void;
    deleteDoctor: (id: string) => void;
    toggleStatus: (id: string) => void;
}

export const useDoctorStore = create<DoctorStore>((set) => ({
    doctors: [],
    isLoading: false,
    error: null,
    fetchDoctors: async () => {
        set({ isLoading: true });
        try {
            const data = await getDoctors()
            set({ doctors: data });
        } catch (error) {
            set({ error: 'Failed to fetch doctors' });
        } finally{
            set({isLoading:false})
        }
    },
    addDoctor: (doctor) => set((state) => ({
        doctors: [doctor, ...state.doctors]
    })),
    updateDoctor: (id, updates) => set((state) => ({
        doctors: state.doctors.map((doc) => doc.id === id ? { ...doc, ...updates } : doc)
    })),
    deleteDoctor: (id) => set((state) => ({
        doctors: state.doctors.filter((doc) => doc.id !== id)
    })),
    toggleStatus: (id) => set((state) => ({
        doctors: state.doctors.map((doc) =>
            doc.id === id ? { ...doc, isActive: !doc.isActive, status: doc.isActive ? 'Off Duty' : 'On Duty' } : doc
        )
    })),
}));
