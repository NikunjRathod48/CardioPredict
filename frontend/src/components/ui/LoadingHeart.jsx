import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoadingHeart = ({ text = "Analyzing Vitals..." }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="relative">
                {/* Ping Effect */}
                <motion.div
                    className="absolute inset-0 bg-rose-400 rounded-full opacity-20"
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />

                {/* Main Heart */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="relative z-10 bg-gradient-to-br from-rose-500 to-rose-600 p-4 rounded-full shadow-lg shadow-rose-200"
                >
                    <Heart className="w-8 h-8 text-white fill-white" />
                </motion.div>
            </div>

            <div className="text-center space-y-1">
                <h3 className="text-lg font-display font-semibold text-slate-800 dark:text-white">{text}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Processing medical data</p>
            </div>

            {/* ECG Line Animation */}
            <div className="w-48 h-12 overflow-hidden relative">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                    <path
                        d="M0 20 H80 L90 5 L100 35 L110 20 H200"
                        fill="none"
                        stroke="#fb7185"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <motion.rect
                        width="100%"
                        height="100%"
                        className="fill-white dark:fill-slate-950"
                        initial={{ x: "0%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
            </div>
        </div>
    );
};

export default LoadingHeart;
