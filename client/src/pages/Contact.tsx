import { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, ArrowRight, Smile } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        department: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending your message...' });

        // Simulate API call
        setTimeout(() => {
            console.log('Form Submitted:', formData);
            setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
            setFormData({
                full_name: '',
                email: '',
                department: '',
                subject: '',
                message: ''
            });
        }, 1500);
    };

    return (
        <div>
            {/* Header Section */}
            <header className="bg-white py-16 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Contact Our Team</h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        We are committed to providing you with the highest standard of dental care. Reach out to us for appointments, cleanings, or dental assistance.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-x-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side: Contact Form */}
                    <div className="bg-white p-5 sm:p-6 md:p-10 rounded-xl shadow-sm border border-slate-200">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
                            <p className="text-slate-500">Fill out the form below and our administrative team will respond within 24 hours.</p>
                        </div>

                        {status.message && (
                            <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}>
                                {status.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700" htmlFor="full_name">Full Name</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                        id="full_name"
                                        placeholder="John Doe"
                                        type="text"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700" htmlFor="email">Email Address</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                        id="email"
                                        placeholder="john@example.com"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700" htmlFor="department">Select Department</label>
                                <select
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                                    id="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">General Inquiry</option>
                                    <option value="general_dentistry">General Dentistry</option>
                                    <option value="orthodontics">Orthodontics</option>
                                    <option value="pediatrics">Pediatric Dentistry</option>
                                    <option value="cosmetic">Cosmetic Dentistry</option>
                                    <option value="billing">Billing & Finance</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700" htmlFor="subject">Subject</label>
                                <input
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                    id="subject"
                                    placeholder="How can we help you?"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700" htmlFor="message">Message</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                    id="message"
                                    placeholder="Please describe your inquiry in detail..."
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button
                                className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex justify-center items-center gap-2 cursor-pointer ${status.type === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                type="submit"
                                disabled={status.type === 'loading'}
                            >
                                <Send className='w-5 h-5' />
                                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                        ```
                    </div>

                    {/* Right Side: Info Sidebar */}
                    <div className="space-y-8">
                        {/* Contact Info Cards */}
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 space-y-8 w-full">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Contact Information
                            </h2>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                                    <Phone className="text-primary w-6 h-6" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="font-bold text-slate-900 mb-1">
                                        Phone Numbers
                                    </h3>
                                    <p className="text-slate-600 break-words">
                                        Main Line: 01-4488777
                                    </p>
                                    <p className="text-red-500 font-medium break-words">
                                        Emergency: 9801234567
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                                    <Mail className="text-primary w-6 h-6" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="font-bold text-slate-900 mb-1">
                                        Email Address
                                    </h3>
                                    <p className="text-slate-600 break-all">
                                        info@chabahilmedicenter.com.np
                                    </p>
                                    <p className="text-slate-600 break-all">
                                        appointment@chabahilmedicenter.com.np
                                    </p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                                    <MapPin className="text-primary w-6 h-6" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="font-bold text-slate-900 mb-1">
                                        Physical Address
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed break-words">
                                        Prestin Dental clinic, Pashupati Road, Chabahil, Kathmandu 44600, Nepal
                                    </p>

                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Chabahil+Medical+Center+Kathmandu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline mt-2 break-words"
                                    >
                                        Get Directions <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>


                        {/* Hours of Operation */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Clock className="text-primary w-6 h-6" />
                                Facility Hours
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Emergency Dental</span>
                                    <span className="font-bold text-red-500">24 / 7 Available</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Outpatient Services</span>
                                    <span className="font-semibold text-slate-900">7:00 AM - 7:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Visiting Hours</span>
                                    <span className="font-semibold text-slate-900">10:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-slate-600">Pharmacy</span>
                                    <span className="font-semibold text-slate-900">24 Hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {/* Embedded Map Section - Full Width */}
            <div className="mt-12 group h-[500px] relative">
                <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:hidden"></div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14128.55156901136!2d85.32695251869045!3d27.71302847649566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19007f70d47d%3A0x97d3b32e4ce7c43f!2zTWl0cmFwYXJrIENob3drIOCkruCkv-CkpOCljeCksOCkquCkvuCksOCljeCklSDgpJrgpYvgpJU!5e0!3m2!1sen!2snp!4v1770894974632!5m2!1sen!2snp"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                ></iframe>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 bg-white p-4 rounded-lg shadow-xl border border-slate-100 max-w-xs z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary p-2 rounded-full">
                            <Smile className="text-white w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-900">Prestin Dental Tower</span>
                    </div>
                    <p className="text-xs text-slate-500">Entrance beside Chabahil Chowk, next to Pashupati Road, easy access to parking area.</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
