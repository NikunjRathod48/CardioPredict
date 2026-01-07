import React from 'react';
import { HeartPulse, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-border bg-card/50 backdrop-blur-xl mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <HeartPulse className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-display font-bold text-foreground">
                                Cardio<span className="text-primary">Predict</span>
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Advanced AI-powered cardiovascular risk assessment for early detection and prevention.
                        </p>
                    </div>

                    {/* Links & Social */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/NikunjRathod48"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/nikunj-rathod-a2176327b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} CardioPredict. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
