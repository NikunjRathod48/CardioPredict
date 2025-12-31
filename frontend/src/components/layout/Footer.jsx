import React from 'react';
import { HeartPulse, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand */}
                    <div className="flex items-center gap-2.5">
                        <div className="bg-teal-500 p-1.5 rounded-lg">
                            <HeartPulse className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-display font-bold text-slate-900 dark:text-white">
                            Cardio<span className="text-teal-600 dark:text-teal-400">Predict</span>
                        </span>
                    </div>

                    {/* Social Links (Added from deleted Contact page) */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/NikunjRathod48"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com/in/NikunjRathod48"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        Made with <span className="text-rose-500 animate-pulse">❤</span> by Nikunj Rathod
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
