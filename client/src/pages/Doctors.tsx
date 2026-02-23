
import { ChevronRight, ChevronLeft, Phone, Stethoscope } from 'lucide-react';
import DoctorCard from '../components/ui/DoctorCard';

const doctors = [
    {
        name: 'Dr. Marcus Thorne',
        specialty: 'Senior Orthodontist',
        qualifications: 'BDS, MDS - Orthodontics',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeRHvXr9LMXNwXQuEGAN_P45eCPXeJvjdAi4WomS2uAuuDZmWJgBARpZpf1z6IFxwRsQU_UuuM0KdNqXY4oij6pf1jaJQ3uq2eMGTYMWpsPdJccnlpWT39S2NJdQUUKP-hLOEjVkcUtdL7VCK3_R2O3r-CW7EP5qGD7JPLU2og5FG03HaMD9bBHdbzj7UiQkpUFdnsBGiRVV36Zzavv6fxmIRre9AC-bfqUd4WCmDYYK5XKGhX0dvN3TnZHx9zqoEFTpVh7U6kUcE',
        rating: 4.9,
        experience: '12+ Years Experience',
        languages: 'English, Spanish'
    },
    {
        name: 'Dr. Sarah Jenkins',
        specialty: 'Pediatric Dentist',
        qualifications: 'BDS, MDS - Pediatric Dentistry',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Zb8Y7rarQ6v63Z6uX3p5lECgFxkDMnPKIz1rft5SO6vQFqQRmbjqY9FABv5fDruNXfm0zSJEf26t_PsugHTPMLHHRNATKlB-fMjt9pUeH74Rwici91HzMLaBYHkqkN0fsaGltnHHgXo5kGXXfqeEMI_TicmsbJYhlD0mGSxPud6poO0Go2t1BGv87xs8yGeP5Xv5iVmSFgr-ll7Zh1zeqhtiNyjVfIRMAzy5cGCvSsDC6yI2zA9JcNFSapCPIcO9mMKRR67i098',
        rating: 5.0,
        experience: '8 Years Experience',
        languages: 'English, French'
    },
    {
        name: 'Dr. Alan Varga',
        specialty: 'Oral & Maxillofacial Surgeon',
        qualifications: 'BDS, MDS, FACS',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj-v1XgbGfu-gLquPL3Vy4bqKmM-BFzJ6BvBsXHvR_P8dOd-BcTWE8n2HcyKjtrTotADhJMCC5L5srTZQnEBK5K9GBsYO8aizkd97ivPVXba-GDFtBAuhFsncvWlhAkD775IHy9Dz13ZWnfROspD2KsolzNGo5YtrEpFUpPQlyigR-4B0XrR_dhT62hTds1Ly25a94RunP3fmneVtVHZQx6Ja6f_NlhyXbaKKifE0Nq9M1YwQmG-epyjIvzPtC11RP92IUsnj10Sk',
        rating: 4.8,
        experience: '15+ Years Experience',
        languages: 'English, German'
    },
    {
        name: 'Dr. Elena Rodriguez',
        specialty: 'Cosmetic Dentist',
        qualifications: 'BDS, MD - Restorative Dentistry',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrAFgj8NMZmGvcAAjB5XcpMADPA395O3il2Tfz0n_z4NipVbswgNbJcYr2-e5iIlMr9IeAI_uPAKfndJj8UhY5bOlb_m3YoRAKseLUyYuFqulaHOI-7wgZDQXrGIwhb2BL_16EccNaXuLepWfwMAn39O1_dhZXqevsuqtmf8Ew-gtdx2fRYtQ09vi0tVZnXlSjwgKdHDHxBk5MhsEjkw7o2y45Mk4Wvs1pCKSJwP7tXr-gPPdMm4t6UBFqWIq6tJDJ3G2HSbe8qic',
        rating: 4.7,
        experience: '10 Years Experience',
        languages: 'Spanish, English'
    }
];

const Doctors = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero-bg py-20 px-4 mb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <nav className="flex items-center justify-center text-xs text-white/70 mb-4 uppercase tracking-widest font-semibold">
                        <a className="hover:text-white" href="/">Home</a>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white">Our Specialists</span>
                    </nav>
                    <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">Meet Our Dental Specialists</h1>
                    <p className="text-blue-50 text-lg max-w-3xl mx-auto leading-relaxed">
                        Connect with our world-class dental professionals dedicated to providing exceptional oral care across multiple specialized procedures.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
                    <p className="text-slate-500 font-medium">Showing <span className="text-slate-900 font-bold">Expert Dental Specialists</span></p>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400">Sort by:</span>
                        <select className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer text-slate-900">
                            <option>Most Recommended</option>
                            <option>Years of Experience</option>
                            <option>Alphabetical</option>
                        </select>
                    </div>
                </div>


                {/* doctor card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {doctors.map((doctor, index) => (
                        <DoctorCard
                            key={index}
                            name={doctor.name}
                            specialty={doctor.specialty}
                            qualifications={doctor.qualifications}
                            image={doctor.image}
                            rating={doctor.rating}
                            experience={doctor.experience}
                            languages={doctor.languages}
                        />
                    ))}
                </div>

                <div className="mt-16 flex items-center justify-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all">3</button>
                    <span className="px-2 text-slate-400">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all">12</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Help Section */}
                <div className="mt-16 bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl text-center md:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">Can't find the right specialist?</h2>
                        <p className="text-slate-600 text-lg">
                            Our dental care coordinators are ready to help you find the best match for your needs.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <button className="cursor-pointer px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                            <Phone className="w-5 h-5" />
                            Call Helpline
                        </button>
                        <button className="cursor-pointer px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                            <Stethoscope className="w-5 h-5" />
                            Free Consultation
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Doctors;
