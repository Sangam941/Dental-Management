import { useState, useEffect, useRef } from 'react';

interface StatCounterProps {
    endValue: string;
    duration?: number;
}

const StatCounter = ({ endValue, duration = 2000 }: StatCounterProps) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    // Extract the numeric part and the suffix
    const numericPart = parseInt(endValue.replace(/[^0-9]/g, ''), 10);
    const suffix = endValue.replace(/[0-9]/g, '');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    startAnimation();
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current);
            }
        };
    }, [numericPart]);

    const startAnimation = () => {
        let startTime: number | null = null;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const currentCount = Math.floor(progress * numericPart);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(numericPart);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <div ref={countRef}>
            {count}{suffix}
        </div>
    );
};

export default StatCounter;
