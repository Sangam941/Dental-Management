import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    Activity,
    AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
// import { login as loginApi } from '../api/auth';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //login api calling through zustand
        await login(email, password);
        navigate('/admin/dashboard');

    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-[120px]" />

            <div className="w-full max-w-[1100px] flex bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden relative z-10 border border-slate-100">
                {/* Left Side: Visual/Branding */}
                <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1e40af] via-[#3b82f6] to-[#6366f1] p-12 flex-col justify-between relative overflow-hidden">
                    {/* Visual Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                                <Activity className="text-white" size={28} />
                            </div>
                            <span className="text-3xl font-black text-white tracking-tight">Prestin <span className="opacity-70">Dental</span></span>
                        </div>

                        <h2 className="text-5xl font-black text-white leading-[1.1] mb-6">
                            Smart Portal for <br />
                            <span className="text-blue-200">Modern Dentistry</span>
                        </h2>
                        <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-[400px]">
                            Centralized management system designed for speed, efficiency, and clinical precision.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                            <div className="w-10 h-10 bg-emerald-400/20 rounded-full flex items-center justify-center">
                                <ShieldCheck className="text-emerald-300" size={20} />
                            </div>
                            <div>
                                <p className="text-white text-xs font-black uppercase tracking-widest">Enterprise Security</p>
                                <p className="text-blue-100 text-[10px] font-bold opacity-80 mt-0.5">End-to-end encrypted management</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-[20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-[20%] left-[-10%] w-48 h-48 bg-blue-400/20 rounded-full blur-2xl" />
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                    <div className="max-w-[400px] mx-auto w-full">
                        <div className="mb-10 text-center lg:text-left">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Welcome Back</h1>
                            <p className="text-slate-500 font-bold text-sm uppercase tracking-wide">Secure Access to HealthFirst CMS</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@healthfirst.com"
                                        className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm rounded-2xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-bold placeholder:text-slate-300 placeholder:font-bold"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2 px-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                                    <button type="button" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">Forgot?</button>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="block w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm rounded-2xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-bold placeholder:text-slate-300 placeholder:font-bold"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-blue-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Authenticate
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                Need technical support? <br />
                                <button className="text-blue-600 mt-2 hover:underline">Contact System Admin</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Text */}
            <p className="absolute bottom-8 text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">
                &copy; 2026 HealthFirst CMS &bull; All Rights Reserved
            </p>
        </div>
    );
};

export default Login;
