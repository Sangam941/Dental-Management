import { create } from 'zustand';
import type { Doctor } from '../types';
import { createDoctor, deleteDoctorApi, getDoctors, updateDoctor } from '../api/doctor';
import toast from 'react-hot-toast';

interface DoctorStore {
    doctors: Doctor[];
    isLoading: boolean;
    error: string | null;
    fetchDoctors: () => Promise<void>;
    addDoctor: (fullname: string, phoneNumber: string, departmentId: string) => void;
    updateDoctor: (id: string, fullName:string, isActive:boolean) => void;
    deleteDoctor: (id: string) => void;
    toggleStatus: (id: string) => void;
}

import { persist } from 'zustand/middleware';

export const useDoctorStore = create<DoctorStore>()(
    persist(
        (set) => ({
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
            addDoctor: async (fullname, phoneNumber, departmentId) => {
                set({isLoading:true})
                try {
                    const data = await createDoctor(fullname, phoneNumber, departmentId);
                    set((state) => ({
                        doctors: [...state.doctors, data]
                    }));

                    toast.success("Doctor added successfully")
                } catch (error) {
                    set({ error: 'Failed to add doctor' });
                    toast.error("Failed to add doctor")
                }finally{
                    set({isLoading:false})
                }
            },
            updateDoctor: async (id, fullName, isActive) => {
                try {
                    const updates = await updateDoctor(id, fullName, isActive)
                    set((state) => ({
                        doctors: state.doctors.map((doc) => doc.id === id ? { ...doc, ...updates } : doc)
                    }))
                    toast.success("Doctor updated successfully")
                } catch (error) {
                    toast.error("Failed to update doctor")
                }
            },
            deleteDoctor: async (id) => {
                try {
                    await deleteDoctorApi(id)
                    set((state) => ({
                        doctors: state.doctors.filter((doc) => doc.id !== id)
                    }))
                    toast.success("Doctor deleted successfully")
                } catch (error) {
                    toast.error("Failed to delete doctor")
                }
            },
            toggleStatus: (id) => set((state) => ({
                doctors: state.doctors.map((doc) =>
                    doc.id === id ? { ...doc, isActive: !doc.isActive, status: doc.isActive ? 'Off Duty' : 'On Duty' } : doc
                )
            })),
        }),
        {
            name: 'doctor-store', // unique name
            partialize: (state) => ({
                doctors: state.doctors
            })
        }
    )
);

