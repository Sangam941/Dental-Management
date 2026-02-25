import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '../types';
import toast from 'react-hot-toast';
import { loginApi } from '../api/auth';

interface AuthStore extends AuthState {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (email, password) => {
                // Import toast here to avoid potential SSR/serialization issues with Zustand
                try {
                    const data = await loginApi({ email, password });

                    // Assuming data has: { user: { id, email, role }, token }
                    const authUser = {
                        id: data.user.id,
                        email: data.user.email,
                        role: data.user.role,
                        token: data.token,
                    };

                    set({
                        isAuthenticated: true,
                        user: { id: data.user.id, email: data.user.email, role: data.user.role },
                    });
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    toast.success('Login successful!');
                } catch (error) {
                    toast.error('Invalid email or password');
                    throw new Error('Invalid credentials');
                }
            },
            logout: () => {
                set({ isAuthenticated: false, user: null });
                localStorage.removeItem('authUser');
                toast.success('Logged out successfully!');
            },

            checkAuth: () => {
                const stored = localStorage.getItem('authUser');
                if (stored) {
                    const user = JSON.parse(stored);
                    set({ isAuthenticated: true, user });
                    return true;
                }
                set({ isAuthenticated: false, user: null });
                return false;
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
