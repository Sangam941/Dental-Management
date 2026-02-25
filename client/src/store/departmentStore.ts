import { create } from 'zustand';
import type { Department } from '../types';
import { DUMMY_DEPARTMENTS } from '../data/dummyData';

interface DepartmentStore {
    departments: Department[];
    isLoading: boolean;
    error: string | null;
    fetchDepartments: () => Promise<void>;
    addDepartment: (dept: Department) => void;
    updateDepartment: (id: string, updates: Partial<Department>) => void;
    deleteDepartment: (id: string) => void;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
    departments: DUMMY_DEPARTMENTS,
    isLoading: false,
    error: null,
    fetchDepartments: async () => {
        set({ isLoading: true });
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            set({ departments: DUMMY_DEPARTMENTS, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch departments', isLoading: false });
        }
    },
    addDepartment: (dept) => set((state) => ({
        departments: [dept, ...state.departments]
    })),
    updateDepartment: (id, updates) => set((state) => ({
        departments: state.departments.map((d) => d.id === id ? { ...d, ...updates } : d)
    })),
    deleteDepartment: (id) => set((state) => ({
        departments: state.departments.filter((d) => d.id !== id)
    })),
}));
