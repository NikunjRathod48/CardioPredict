import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, Home, Info, Stethoscope, Phone, FileText, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import { ThemeToggle } from '../ui/ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Predict', path: '/predict', icon: Stethoscope },
        { name: 'Model Info', path: '/model-info', icon: FileText },
        { name: 'Contact', path: '/contact', icon: Phone },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Desktop Floating Pill Navbar */}
            <div className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
                <nav className={cn(
                    "pointer-events-auto transition-all duration-500 ease-out",
                    "glass-panel rounded-full border border-border/40 shadow-xl",
                    "flex items-center justify-between gap-8",
                    scrolled
                        ? "px-3 py-2 w-auto min-w-[200px] bg-background/80"
                        : "px-6 py-4 w-[95%] max-w-5xl bg-background/50"
                )}>
                    <Link to="/" className="flex items-center gap-2 group shrink-0">
                        <div className={cn(
                            "relative flex items-center justify-center rounded-xl transition-all duration-300",
                            scrolled ? "p-1.5" : "p-2",
                            "bg-primary/10 border border-primary/20 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(var(--primary),0.4)]"
                        )}>
                            <Activity className={cn("text-primary transition-all group-hover:animate-pulse", scrolled ? "h-4 w-4" : "h-5 w-5")} />
                        </div>
                        <span className={cn(
                            "font-bold text-foreground tracking-wide hidden md:block transition-all duration-500 overflow-hidden whitespace-nowrap",
                            scrolled ? "w-0 opacity-0" : "w-auto opacity-100 text-lg"
                        )}>
                            Cardio<span className="text-primary text-glow">Predict</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const active = isActive(link.path);
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative px-4 py-2 rounded-full transition-all duration-300 group"
                                >
                                    {active && (
                                        <motion.div
                                            layoutId="pill-nav"
                                            className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full shadow-sm"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={cn(
                                        "relative z-10 text-sm font-medium transition-colors flex items-center gap-2",
                                        active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}>
                                        {link.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden md:flex items-center gap-4 shrink-0">
                        <ThemeToggle />
                        <Link to="/predict">
                            <button className={cn(
                                "relative overflow-hidden px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                                "bg-primary/10 text-primary border border-primary/20",
                                "hover:bg-primary/20 hover:border-primary hover:shadow-lg",
                                "active:scale-95 group"
                            )}>
                                <span className="relative z-10 flex items-center gap-2">
                                    Analyze <Zap className="w-4 h-4" />
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-full transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-24 left-4 right-4 z-40 md:hidden glass-panel bg-background/95 border-border rounded-3xl p-4 overflow-hidden origin-top"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-4 p-4 rounded-2xl transition-all border border-transparent",
                                        isActive(link.path)
                                            ? "bg-primary/10 border-primary/20 text-primary"
                                            : "hover:bg-accent text-muted-foreground"
                                    )}
                                >
                                    <div className={cn(
                                        "p-2 rounded-xl",
                                        isActive(link.path) ? "bg-primary/20 text-primary" : "bg-accent/50"
                                    )}>
                                        <link.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-semibold text-lg">{link.name}</span>
                                    {isActive(link.path) && <Activity className="ml-auto h-5 w-5 text-primary animate-pulse" />}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2" />
                            <Link to="/predict" onClick={() => setIsOpen(false)}>
                                <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 active:scale-95 transition-all">
                                    Start Analysis
                                    <Stethoscope className="h-5 w-5" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
