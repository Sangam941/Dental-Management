import { create } from 'zustand';
import type { PatientPayload } from '../types';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { createOPDEntry, deletePatient, getAllEntry, updateOPDEntry } from '../api/patient';

interface PatientStore {
    patients: PatientPayload[];
    isLoading: boolean;
    error: string | null;
    fetchPatients: () => Promise<void>;
    addPatient: (patient: PatientPayload) => void;
    updatePatient: (id: string, updates: PatientPayload) => void;
    deletePatient: (id: string) => void;
}


export const usePatientStore = create<PatientStore>()(
    persist(
        (set, get) => ({
            patients: [],
            isLoading: false,
            error: null,
            fetchPatients: async () => {
                set({ isLoading: true });
                try {
                    const allPatients = await getAllEntry()
                    set({ patients: allPatients });
                } catch (error) {
                    set({ error: 'Failed to fetch patients' });
                } finally {
                    set({ isLoading: false })
                }
            },
            addPatient: async (patient: PatientPayload) => {
                set({ isLoading: true })
                try {
                    const newPatient = await createOPDEntry(patient);
                    set({ patients: [...get().patients, newPatient] });
                    get().fetchPatients()
                    toast.success("Patient added successfully")
                } catch (error) {
                    set({ error: 'Failed to add patient' });
                    toast.error("Failed to add patient")
                } finally {
                    set({ isLoading: false })
                }
            },
            updatePatient: async (id: string, updates: PatientPayload) => {
                set({ isLoading: true });
                try {
                    const update = await updateOPDEntry(id, updates);
                    set((state) => ({
                        patients: state.patients.map((p) => p.id === id ? { ...p, ...update } : p)
                    }))
                    await get().fetchPatients();
                    toast.success("Patient updated successfully");
                } catch (error) {
                    set({ error: 'Failed to update patient' });
                    toast.error("Failed to update patient");
                } finally {
                    set({ isLoading: false });
                }
            },
            deletePatient: async (id) => {
                try {
                    await deletePatient(id)
                    set((state) => ({
                        patients: state.patients.filter((p) => p.id !== id)
                    }))
                    get().fetchPatients()
                    toast.success("Patient deleted successfully")
                } catch (error) {
                    toast.error("Failed to delete patient")
                }
            },
        }),
        {
            name: 'patient-storage', // unique name for persistence key
        }
    )
);
