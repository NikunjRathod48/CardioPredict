import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, HeartPulse, Sun, Moon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Predict Risk', path: '/predict', isPrimary: true },
    { name: 'Model Info', path: '/model-info' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => setIsOpen(false), [location]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className={`
                        relative flex items-center justify-between px-6 py-3 transition-all duration-500
                        ${scrolled
                            ? 'glass rounded-2xl'
                            : 'bg-transparent border-transparent'
                        }
                    `}>
                        {/* Logo */}
                        <NavLink to="/" className="flex items-center gap-2.5 group">
                            <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 rounded-xl shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/30 transition-all duration-300">
                                <HeartPulse className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-foreground tracking-tight">
                                Cardio<span className="text-primary">Predict</span>
                                <span className="ml-1 text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full align-top">AI</span>
                            </span>
                        </NavLink>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1.5">
                            {navItems.map((item) => (
                                item.isPrimary ? (
                                    <NavLink key={item.path} to={item.path}>
                                        <Button
                                            size="sm"
                                            className="ml-2 !bg-primary !text-primary-foreground !border-none hover:!bg-teal-600 shadow-lg shadow-primary/30 rounded-full px-6"
                                        >
                                            {item.name}
                                        </Button>
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) => `
                                            px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                                            ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                            }
                                        `}
                                    >
                                        {item.name}
                                    </NavLink>
                                )
                            ))}

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="ml-2 p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-muted-foreground bg-card border border-border shadow-sm rounded-xl hover:bg-muted transition-colors"
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: 'auto', scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        className="md:hidden fixed top-[90px] left-4 right-4 z-40 bg-card/95 backdrop-blur-2xl border border-border shadow-depth dark:shadow-depth-dark rounded-3xl overflow-hidden origin-top"
                    >
                        <div className="flex flex-col p-4 gap-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `
                                        p-4 rounded-2xl text-center font-medium transition-all
                                        ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }
                                        ${item.isPrimary ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : ''}
                                    `}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                            <button
                                onClick={toggleTheme}
                                className="p-4 rounded-2xl text-center font-medium text-muted-foreground hover:bg-muted flex items-center justify-center gap-2"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                <span>Switch Theme</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
