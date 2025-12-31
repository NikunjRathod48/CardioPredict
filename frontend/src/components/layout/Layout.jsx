import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-background relative selection:bg-primary/20">
            {/* Ambient Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-background to-muted/20"></div>

                {/* Soft glow blobs - using opacity to blend in both modes */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-60 animate-float" />
                <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-60 animate-float" style={{ animationDelay: '3s' }} />
            </div>

            <Navbar />

            <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
