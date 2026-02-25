import { create } from 'zustand';
import type { Appointment } from '../types';
import { DUMMY_APPOINTMENTS } from '../data/dummyData';

interface AppointmentStore {
    appointments: Appointment[];
    isLoading: boolean;
    error: string | null;
    fetchAppointments: () => Promise<void>;
    addAppointment: (appointment: Appointment) => void;
    updateAppointment: (id: string, updates: Partial<Appointment>) => void;
    cancelAppointment: (id: string) => void;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
    appointments: DUMMY_APPOINTMENTS,
    isLoading: false,
    error: null,
    fetchAppointments: async () => {
        set({ isLoading: true });
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            set({ appointments: DUMMY_APPOINTMENTS, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch appointments', isLoading: false });
        }
    },
    addAppointment: (appointment) => set((state) => ({
        appointments: [appointment, ...state.appointments]
    })),
    updateAppointment: (id, updates) => set((state) => ({
        appointments: state.appointments.map((app) => app.id === id ? { ...app, ...updates } : app)
    })),
    cancelAppointment: (id) => set((state) => ({
        appointments: state.appointments.map((app) =>
            app.id === id ? { ...app, status: 'Cancelled' } : app
        )
    })),
}));
