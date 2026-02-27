import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Department } from '../types';
import { createDepartment, deleteDepartmentApi, getDepartments, updateDepartment } from '../api/department';
import toast from 'react-hot-toast';

interface DepartmentStore {
    departments: Department[];
    isLoading: boolean;
    error: string | null;
    fetchDepartments: () => Promise<void>;
    addDepartment: (dept: string) => void;
    updateDepartment: (id: string, name: string, status: boolean) => void;
    deleteDepartment: (id: string) => void;
}

export const useDepartmentStore = create<DepartmentStore>()(
    persist(
        (set, get) => ({
            departments: [],
            isLoading: false,
            error: null,
            fetchDepartments: async () => {
                set({ isLoading: true });
                try {
                    const fetchDepartments = await getDepartments();
                    set({ departments: fetchDepartments });
                } catch (error) {
                    set({ error: 'Failed to fetch departments'});
                    toast.error("Failed to fetch departments")
                } finally {
                    set({ isLoading: false })
                }
            },
            addDepartment: async (dept) => {
                set({ isLoading: true });
                try {
                    const newDept = await createDepartment(dept);
                    set({ departments: [newDept, ...get().departments] });
                    get().fetchDepartments();
                    toast.success("Department added successfully")
                } catch (error) {
                    set({ error: 'Failed to add department'});
                    toast.error("Failed to add department")
                } finally {
                    set({ isLoading: false })
                }
            },
            updateDepartment: async (id, name, status) => {
                set({ isLoading: true });
                try {
                    const updatedDept = await updateDepartment(id, name, status);
                    set({ departments: get().departments.map((d) => d.id === id ? updatedDept : d) });
                    get().fetchDepartments();
                    toast.success("Department updated successfully")
                } catch (error) {
                    set({ error: 'Failed to update department'});
                    toast.error("Failed to update department")
                } finally {
                    set({ isLoading: false })
                }
            },
            deleteDepartment: async (id) => {
                set({ isLoading: true });
                try {
                    await deleteDepartmentApi(id);
                    set({ departments: get().departments.filter((d) => d.id !== id) });
                    get().fetchDepartments();
                    toast.success("Department deleted successfully")
                } catch (error) {
                    set({ error: 'Failed to delete department'});
                    toast.error("Failed to delete department")
                } finally {
                    set({ isLoading: false })
                }
            },
        }),
        {
            name: 'department-store', // unique name for persist storage
            partialize: (state) => ({
                departments: state.departments
            }),
        }
    )
);

