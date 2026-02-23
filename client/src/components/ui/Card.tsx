
import React from 'react';

interface CardProps {
    image?: string;
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({
    image,
    title,
    description,
}) => {
    return (
        <div className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300`}>
            {image && (
                <div className="h-68 w-full overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 hover:scale-110"
                    />
                </div>
            ) }
            <div className='p-8'>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{title}</h4>
            <p className="text-slate-600 leading-relaxed">
                {description}
            </p>
            </div>
        </div>
    );
};

export default Card;
