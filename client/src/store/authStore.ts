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
    loading: boolean;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,

            login: async (email, password) => {
                // Import toast here to avoid potential SSR/serialization issues with Zustand
                set({
                    loading: true
                })
                try {
                    const data = await loginApi({ email, password });

                    // Assuming data has: { user: { id, email, role }, token }
                    const authUser = {
                        id: data.admin.id,
                        email: data.admin.email,
                        token: data.token,
                    };

                    set({
                        isAuthenticated: true,
                        user: { id: data.admin.id, email: data.admin.email },
                    });
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    toast.success('Login successful!');
                } catch (error) {
                    toast.error('Invalid email or password');
                    throw new Error('Invalid credentials');
                }
                finally{
                    set({
                        loading: false
                    })
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
