
import { Phone, MessageSquare } from 'lucide-react';
import Card from '../components/ui/Card';

const services = [
    {
        title: 'General Dentistry',
        description: 'Comprehensive oral care including cleanings, fillings, and prevention.',
        image: '/images/services/cardiology.avif'
    },
    {
        title: 'Orthodontics',
        description: 'Advanced teeth straightening with braces and clear aligners.',
        image: '/images/services/neuralogy.avif'
    },
    {
        title: 'Pediatric Dentistry',
        description: 'Specialized dental care for infants, children, and adolescents.',
        image: '/images/services/Pediatrics.avif'
    },
    {
        title: 'Cosmetic Dentistry',
        description: 'Enhance your smile with whitening, veneers, and bonding.',
        image: '/images/services/Orthopedics.avif'
    },
    {
        title: 'Oral Surgery',
        description: 'Expert wisdom teeth removal and dental implant procedures.',
        image: '/images/services/Ophthalmology.avif'
    },
    {
        title: 'Emergency Dental',
        description: '24/7 rapid response for urgent dental pain and trauma.',
        image: '/images/services/Emergency-Care.avif'
    },
];

const Services = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Hospital background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6">
                        Our Specialized <span className="text-primary">Dental Services</span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                        Delivering world-class dental care with a personal touch. Our dedicated team of specialists utilizes advanced technology to provide comprehensive oral health care for you and your family.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <div className="py-16 px-6 max-w-7xl mx-auto">

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            title={service.title}
                            description={service.description}
                            image={service.image}
                        />
                    ))}
                </div>
            </div>

            {/* Need Help Choosing Section */}
            <section className="bg-slate-50 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Need Help Choosing?</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                If you are unsure which dental procedure fits your needs, our consultants are here to guide you. Contact us for a preliminary assessment.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="cursor-pointer px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                                <Phone className="w-5 h-5" />
                                Call Now
                            </button>
                            <button className="cursor-pointer px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Online Inquiry
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
