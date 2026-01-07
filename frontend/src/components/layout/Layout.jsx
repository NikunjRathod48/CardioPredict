import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-background relative selection:bg-primary/20">
            {/* Aurora Mesh Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Base color */}
                <div className="absolute inset-0 bg-background transition-colors duration-300"></div>

                {/* Technical Grid Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.2]"></div>

                {/* Animated Gradient Orbs - "Aurora" */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 dark:opacity-30">
                    {/* Layer 3: Aurora Orbs (Optimized with Radial Gradients - No Blur Filters) */}
                    <div className="absolute inset-0" style={{
                        background: `
                            radial-gradient(circle at 10% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 40%),
                            radial-gradient(circle at 90% 30%, rgba(14, 165, 233, 0.15) 0%, transparent 40%),
                            radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 40%)
                        `
                    }}></div>
                    {/* Animated Pulse Overlay (Cheaper than moving blobs, but Pulse causes repaints - Static is faster) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30"></div>
                </div>

                {/* Vignette / Soft Mask to focus center */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/50"></div>
            </div>

            <Navbar />

            <main className="relative z-10 flex-1 w-full py-24 md:py-32">
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
