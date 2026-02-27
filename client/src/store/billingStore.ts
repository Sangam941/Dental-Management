import { create } from 'zustand';
import type { PatientPayload } from '../types';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
// In a real billing store, this would import billing-specific API functions.
import { createOPDEntry, deletePatient, getAllEntry, updateOPDEntry } from '../api/patient';

interface BillingRecord extends PatientPayload {}

interface BillingStore {
    billingRecords: BillingRecord[];
    isLoading: boolean;
    error: string | null;
    fetchBillingRecords: () => Promise<void>;
    addBillingRecord: (record: BillingRecord) => void;
    updateBillingRecord: (id: string, updates: BillingRecord) => void;
    deleteBillingRecord: (id: string) => void;
}

export const useBillingStore = create<BillingStore>()(
    persist(
        (set, get) => ({
            billingRecords: [],
            isLoading: false,
            error: null,
            fetchBillingRecords: async () => {
                set({ isLoading: true });
                try {
                    const allBillingRecords = await getAllEntry(); // Should point to billing API in real usage
                    set({ billingRecords: allBillingRecords });
                } catch (error) {
                    set({ error: 'Failed to fetch billing records' });
                } finally {
                    set({ isLoading: false });
                }
            },
            addBillingRecord: async (record: BillingRecord) => {
                set({ isLoading: true });
                try {
                    const newRecord = await createOPDEntry(record); // Should call billing creation API
                    set({ billingRecords: [...get().billingRecords, newRecord] });
                    get().fetchBillingRecords();
                    toast.success("Billing record added successfully");
                } catch (error) {
                    set({ error: 'Failed to add billing record' });
                    toast.error("Failed to add billing record");
                } finally {
                    set({ isLoading: false });
                }
            },
            updateBillingRecord: async (id: string, updates: BillingRecord) => {
                set({ isLoading: true });
                try {
                    const update = await updateOPDEntry(id, updates); // Should use billing update API
                    set((state) => ({
                        billingRecords: state.billingRecords.map((r) =>
                            r.id === id ? { ...r, ...update } : r
                        )
                    }));
                    await get().fetchBillingRecords();
                    toast.success("Billing record updated successfully");
                } catch (error) {
                    set({ error: 'Failed to update billing record' });
                    toast.error("Failed to update billing record");
                } finally {
                    set({ isLoading: false });
                }
            },
            deleteBillingRecord: async (id) => {
                try {
                    await deletePatient(id); // Should use billing delete API
                    set((state) => ({
                        billingRecords: state.billingRecords.filter((r) => r.id !== id)
                    }));
                    get().fetchBillingRecords();
                    toast.success("Billing record deleted successfully");
                } catch (error) {
                    toast.error("Failed to delete billing record");
                }
            },
        }),
        {
            name: 'billing-storage', // unique name for persistence key
        }
    )
);
