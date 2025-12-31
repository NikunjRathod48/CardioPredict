import React from 'react';
import { motion } from 'framer-motion';

const techs = [
    "React", "Tailwind CSS", "Framer Motion", "Vite", "TensorFlow.js", "Scikit-Learn", "Python", "FastAPI"
];

const TechTicker = () => {
    return (
        <div className="w-full py-10 overflow-hidden border-y border-border bg-card/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 relative">
                {/* Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-12 whitespace-nowrap"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20
                        }}
                    >
                        {[...techs, ...techs, ...techs, ...techs].map((tech, index) => (
                            <div key={index} className="flex items-center gap-2 text-2xl font-bold text-muted-foreground/40 font-display">
                                <span>{tech}</span>
                                <span className="w-2 h-2 rounded-full bg-primary/20" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TechTicker;
