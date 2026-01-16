"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    delay?: number;
}

export const Reveal = ({ children, delay = 0 }: RevealProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${isVisible ? "animate-power-reveal" : "reveal-hidden"}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};
