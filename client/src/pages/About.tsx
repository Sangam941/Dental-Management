
import { ArrowRight, Smile, Heart, BadgeCheck, Scale } from 'lucide-react';
import StatCounter from '../components/ui/StatCounter';

const stats = [
    { value: '50+', label: 'Years of Smiles' },
    { value: '25+', label: 'Expert Dentists' },
    { value: '15k+', label: 'Annual Patient Smiles' },
    { value: '24/7', label: 'Emergency Dental' }
];

const missionVision = [
    {
        icon: Smile,
        title: 'Our Mission',
        description: 'To provide compassionate, accessible, and high-quality dental care to our community. We strive to improve oral health outcomes through evidence-based practices and a patient-centered approach that honors the dignity of every individual.',
        bgColor: 'bg-primary/5',
        iconBgColor: 'bg-primary/10',
        iconColor: 'text-primary',
        hoverBgColor: 'group-hover:bg-primary/10'
    },
    {
        icon: Smile,
        title: 'Our Vision',
        description: 'To be the leading choice for dental excellence in the region, recognized for our clinical outcomes, advanced technology, and innovative oral health research, while maintaining the warmth of a community-focused institution.',
        bgColor: 'bg-accent-green/5',
        iconBgColor: 'bg-accent-green/10',
        iconColor: 'text-accent-green',
        hoverBgColor: 'group-hover:bg-accent-green/10'
    }
];

const coreValues = [
    {
        icon: Heart,
        title: 'Compassion',
        description: 'We treat every patient with the same kindness and empathy we would want for our own families. Caring is at the core of our practice.',
        iconColor: 'text-primary',
        iconBgColor: 'bg-primary/10'
    },
    {
        icon: BadgeCheck,
        title: 'Excellence',
        description: 'We never settle for "good enough." We pursue the highest standards in clinical care, safety, and operational efficiency through continuous learning.',
        iconColor: 'text-primary',
        iconBgColor: 'bg-primary/10'
    },
    {
        icon: Scale,
        title: 'Integrity',
        description: 'We act with honesty, transparency, and ethical conviction. Trust is the foundation of the doctor-patient relationship, and we guard it fiercely.',
        iconColor: 'text-primary',
        iconBgColor: 'bg-primary/10'
    }
];


const About = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Hospital Interior"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvQwY1Up9WVMVNatmcUvQfop7HlEEwC31XSikTtz7ccAAVx9ElDrApskoS9ysisnYEknFqTKwhH2lxxDeVt1kLgKhaJWYFjOK9SOllIUgHgiKdVaxiOMdQFlJo8Q1taHUBYPY47AWdI9-bnDnq14Zmd0gs5Fa-7ZaCjSt2oc2R0Q5d6M4Jmu8rIH3CUwWiH6SP6MbD97ZRJXNUEX1dJbqu6TtkF_if96Cdfdd4k5JWY8zC1eLorkxGRTeGYKIm6U9xdMtt9MiB_nw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="max-w-2xl">
                        <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                            Established 1974
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            Dedicated to Your <span className="text-primary">Smile</span> and Wellbeing
                        </h1>
                        <p className="text-xl text-slate-200 leading-relaxed mb-8">
                            Providing world-class dental care with a human touch for over 50 years. We combine clinical excellence with genuine compassion for your smile.
                        </p>
                        <div className="flex gap-4">
                            <button className="cursor-pointer bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2">
                                Our Services <ArrowRight className='w-5 h-5' />
                            </button>
                            <button className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold transition-all">
                                View Gallery
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative z-20 -mt-15 max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 border border-slate-100">
                    {stats.map((stat, index) => (
                        <div key={index} className={`text-center ${index > 0 ? 'border-l border-slate-100' : ''}`}>
                            <div className="text-4xl font-extrabold text-primary mb-1">
                                {stat.value === '24/7' ? stat.value : <StatCounter endValue={stat.value} />}
                            </div>
                            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* History Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-green/10 rounded-full -z-10"></div>
                        <img
                            alt="Vintage Medical Building"
                            className="rounded-3xl shadow-2xl object-cover w-full aspect-[4/3]"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA92YLZd1mpmv2IV6QRANjmTZytePZqkVfEZ6NXgtmv1JZS0JrTnl9Wx9eE5mRRYTdmLfksbXhsQvysgtAg2JPed7X7BltBEtfRubvSwKm2z5FHCbrLNxXFYCgpwpVsDRZfA_6DjEys9cWDuMm3Atg93lGcOMuAg3qgDkh6AKp9ZfO0aBt-IU1aop3or3yQpuG7xEly6SXsOQUNyjHiF1exAXeGMTHLolAgD4tN42P7E4xLQQBjm3S51zx8NpyYAKlZup7BxVhYSE"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-slate-100">
                            <p className="text-slate-600 italic">"Our journey began with a single mission: to serve the community when they need it most."</p>
                            <p className="font-bold text-slate-900 mt-4">— Dr. Arthur Sterling, Founder</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Our History</h2>
                        <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Legacy of Care and Dental Innovation</h3>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                Founded in 1974, Prestin Dental clinic began as a small community dental clinic dedicated to rural oral health. Over the decades, we have evolved into a state-of-the-art multi-specialty dental center, consistently pushing the boundaries of dental science.
                            </p>
                            <p>
                                Today, we stand as a beacon of oral health and healing, equipped with the latest diagnostic technology and staffed by some of the world's leading dental experts. Our growth has been fueled by one constant: an unwavering commitment to the people we serve.
                            </p>
                        </div>
                        <div className="mt-10 flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-sm text-slate-400">Accredited by</span>
                                <div className="flex gap-4 mt-2 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
                                    <span className="font-bold border-2 border-slate-400 px-2 py-1 rounded text-xs uppercase">JCI Accredited</span>
                                    <span className="font-bold border-2 border-slate-400 px-2 py-1 rounded text-xs uppercase">ISO 9001:2015</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-primary/5 py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {missionVision.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 relative group overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-32 h-32 ${item.bgColor} rounded-bl-full ${item.hoverBgColor} transition-colors`}></div>
                                    <div className={`w-16 h-16 ${item.iconBgColor} rounded-2xl flex items-center justify-center mb-8`}>
                                        <Icon className={`${item.iconColor} text-3xl`} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-6">{item.title}</h3>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Core Values</h2>
                    <h3 className="text-4xl font-bold text-slate-900 mb-6">The Principles That Guide Us</h3>
                    <p className="text-slate-600 text-lg">
                        Our values are the heartbeat of our dental clinic. They define how we treat our patients, our partners, and each other every single day.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {coreValues.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className={`w-16 h-16 ${value.iconBgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                                    <Icon className={`${value.iconColor} w-8 h-8`} />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default About;
