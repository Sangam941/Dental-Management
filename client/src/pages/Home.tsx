
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import TestimonialCard from '../components/ui/TestimonialCard';
import StatCounter from '../components/ui/StatCounter';

const features = [
    {
        title: "Expert Dentists",
        description: "Our team of highly qualified and experienced dentists is here to provide you with the best possible oral care.",
        image: "/images/home/doctors-card.avif"
    },
    {
        title: "Latest Dental Tech",
        description: "We utilize the latest dental technology and equipment to ensure accurate diagnoses and pain-free treatments.",
        image: "/images/home/technology-card.avif"
    },
    {
        title: "24/7 Dental Emergency",
        description: "Our emergency dental department is open 24 hours a day, 7 days a week, to handle any urgent dental needs.",
        image: "/images/home/available24-7-card.avif"
    }
];

const testimonials = [
    {
        rating: 5,
        testimonial: "The level of care I received was beyond my expectations. My smile has never looked better, and the dentist explained the procedure in a way that put me at ease.",
        patientName: "Sarah Jenkins",
        patientType: "Orthodontic Patient",
        patientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
        rating: 5,
        testimonial: "Clean facilities and very professional staff. I didn't have to wait long for my appointment, and the online booking system made everything seamless.",
        patientName: "David Miller",
        patientType: "Bridge & Crown Work",
        patientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
        rating: 5,
        testimonial: "They saved me during an late-night dental emergency. The response time was incredible and the team was calm, fast, and extremely effective. Highly recommended.",
        patientName: "Elena Rodriguez",
        patientType: "Emergency Care",
        patientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
];

const homeStats = [
    { value: '15k+', label: 'Smile Transformations' },
    { value: '25+', label: 'Expert Dentists' },
    { value: '99%', label: 'Patient Satisfaction' },
    { value: '24/7', label: 'Dental Emergency' }
];

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/home/home-bg-image.avif"
                        alt="Hospital Building"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                            World Class Dental Care
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
                            Your Smile is Our <span className="text-primary">Priority</span>
                        </h1>
                        <p className="text-xl text-slate-200 leading-relaxed mb-10 max-w-2xl">
                            Experience the highest standard of dental care with our state-of-the-art facilities and dedicated team of specialists.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/appointment" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg">
                                Book Appointment <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/doctors" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg">
                                Find a Dentist
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Why Choose Us</h2>
                    <h3 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Care for You</h3>
                    <p className="text-slate-600 text-lg">
                        We are committed to providing exceptional patient care with a focus on clinical excellence, safety, and compassion.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            image={feature.image}
                        />
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {homeStats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <h3 className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                                    {stat.value === '24/7' ? stat.value : <StatCounter endValue={stat.value} />}
                                </h3>
                                <p className="text-slate-600 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-slate-50 py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">Voices of Recovery</h2>
                            <p className="text-slate-600 text-lg max-w-2xl">
                                Hear directly from the patients who have experienced the care and compassion of our medical teams.
                            </p>
                        </div>
                        <div className="hidden md:flex gap-2">
                            <button className="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center hover:bg-slate-200 transition-colors">
                                <span className="text-slate-600 text-xl">‹</span>
                            </button>
                            <button className="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center hover:bg-slate-200 transition-colors">
                                <span className="text-slate-600 text-xl">›</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                rating={testimonial.rating}
                                testimonial={testimonial.testimonial}
                                patientName={testimonial.patientName}
                                patientType={testimonial.patientType}
                                patientImage={testimonial.patientImage}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
