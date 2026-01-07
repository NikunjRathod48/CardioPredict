import React from 'react';
import { motion } from 'framer-motion';

const techs = [
    "React", "Tailwind CSS", "Framer Motion", "Vite", "Scikit-Learn", "Python", "FastAPI"
];

const TechTicker = () => {
    return (
        <div className="w-full py-16 border-y border-border bg-card/50 backdrop-blur-sm overflow-hidden select-none">

            <div className="text-center mb-10">
                <span className="px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-bold tracking-wide uppercase shadow-sm">
                    Our Technology Stack
                </span>
            </div>

            <div className="relative flex overflow-hidden group">
                {/* Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-16 min-w-full pr-16"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40
                    }}
                >
                    {/* Triple the list to ensure we have enough buffer for very wide screens */}
                    {[...techs, ...techs, ...techs, ...techs, ...techs, ...techs].map((tech, index) => (
                        <div key={index} className="flex items-center gap-3 text-2xl font-bold text-muted-foreground/30 font-display whitespace-nowrap">
                            <span>{tech}</span>
                            <span className="w-2 h-2 rounded-full bg-primary/20" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TechTicker;
