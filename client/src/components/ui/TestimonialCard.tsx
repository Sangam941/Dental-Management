
interface TestimonialCardProps {
    rating: number;
    testimonial: string;
    patientName: string;
    patientType: string;
    patientImage: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    rating,
    testimonial,
    patientName,
    patientType,
    patientImage
}) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex gap-1 mb-4">
                {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
            </div>
            <p className="text-slate-700 italic mb-6 leading-relaxed">
                "{testimonial}"
            </p>
            <div className="flex items-center gap-3">
                <img
                    src={patientImage}
                    alt={patientName}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p className="font-bold text-slate-900">{patientName}</p>
                    <p className="text-sm text-slate-500">{patientType}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
