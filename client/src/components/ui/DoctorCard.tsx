import { Star, Briefcase, Languages } from 'lucide-react';

interface DoctorCardProps {
    name: string;
    specialty: string;
    qualifications: string;
    image: string;
    rating: number;
    experience: string;
    languages: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
    name,
    specialty,
    qualifications,
    image,
    rating,
    experience,
    languages
}) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all group overflow-hidden">
            <div className="flex flex-col h-full">
                <div className="relative mb-5 overflow-hidden rounded-xl">
                    <img
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={name}
                        src={image}
                    />
                </div>
                <div className="flex-grow px-2">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{name}</h3>
                        <div className="flex items-center text-amber-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-xs font-bold ml-1">{rating}</span>
                        </div>
                    </div>
                    <p className="text-sm font-bold text-accent-green uppercase tracking-wide mb-2">{specialty}</p>
                    <p className="text-sm text-slate-500 font-medium mb-4 italic">{qualifications}</p>
                    <div className="flex flex-col gap-2 pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-3">
                            <Briefcase className="text-primary w-5 h-5" />
                            <span className="text-sm text-slate-600">{experience}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Languages className="text-primary w-5 h-5" />
                            <span className="text-sm text-slate-600">{languages}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
