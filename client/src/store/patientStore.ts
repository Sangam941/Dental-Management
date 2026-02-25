import { create } from 'zustand';
import type { Patient } from '../types';
import { DUMMY_PATIENTS } from '../data/dummyData';

interface PatientStore {
    patients: Patient[];
    isLoading: boolean;
    error: string | null;
    fetchPatients: () => Promise<void>;
    addPatient: (patient: Patient) => void;
    updatePatient: (id: string, updates: Partial<Patient>) => void;
    deletePatient: (id: string) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
    patients: DUMMY_PATIENTS,
    isLoading: false,
    error: null,
    fetchPatients: async () => {
        set({ isLoading: true });
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            set({ patients: DUMMY_PATIENTS, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch patients', isLoading: false });
        }
    },
    addPatient: (patient) => set((state) => ({
        patients: [patient, ...state.patients]
    })),
    updatePatient: (id, updates) => set((state) => ({
        patients: state.patients.map((p) => p.id === id ? { ...p, ...updates } : p)
    })),
    deletePatient: (id) => set((state) => ({
        patients: state.patients.filter((p) => p.id !== id)
    })),
}));
