
import { Link } from 'react-router-dom';
import { Smile, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-16 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Smile className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">Prestin Dental</span>
                    </div>
                    <p className="leading-relaxed">
                        Perfecting your smile with excellence since 1974. Trust us with your family's dental health and wellness journey.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link to="/doctors" className="hover:text-primary transition-colors">Our Doctors</Link></li>
                        <li><Link to="/" className="hover:text-primary transition-colors">Patient Portal</Link></li>
                        <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Our Services</h4>
                    <ul className="space-y-4">
                        <li><Link to="/services" className="hover:text-primary transition-colors">General Dentistry</Link></li>
                        <li><Link to="/services" className="hover:text-primary transition-colors">Orthodontics</Link></li>
                        <li><Link to="/services" className="hover:text-primary transition-colors">Pediatric Dentistry</Link></li>
                        <li><Link to="/services" className="hover:text-primary transition-colors">Emergency Dental</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Newsletter</h4>
                    <p className="mb-4">Get health tips and news directly in your inbox.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-slate-800 border-none rounded-lg px-4 py-2 w-full text-white focus:ring-2 focus:ring-primary outline-none"
                        />
                        <button className="bg-primary text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© 2026 Prestin Dental clinic. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
