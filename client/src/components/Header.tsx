
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Smile } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'text-primary border-b-2 border-primary' : 'hover:text-primary transition-colors';
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Smile className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            Prestin <span className="text-primary">Dental</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className={`font-medium ${isActive('/')}`}>Home</Link>
                    <Link to="/about" className={`font-medium ${isActive('/about')}`}>About Us</Link>
                    <Link to="/doctors" className={`font-medium ${isActive('/doctors')}`}>Find a Doctor</Link>
                    <Link to="/services" className={`font-medium ${isActive('/services')}`}>Services</Link>
                    <Link to="/contact" className={`font-medium ${isActive('/contact')}`}>Contact</Link>
                    <Link
                        to="/appointment"
                        className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
                    >
                        Book Appointment
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900">
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-primary/10 px-6 py-4 space-y-4">
                    <Link to="/" className="block font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/about" className="block font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                    <Link to="/doctors" className="block font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Find a Doctor</Link>
                    <Link to="/services" className="block font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Services</Link>
                    <Link to="/contact" className="block font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    <Link
                        to="/appointment"
                        className="block w-full text-center bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Book Appointment
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Header;
