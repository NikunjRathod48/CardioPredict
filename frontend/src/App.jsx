import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import PredictPage from '@/pages/Predict';
import ModelInfoPage from '@/pages/ModelInfo';
import ContactPage from '@/pages/Contact';

// 3D Background (Lazy load if heavy, but standard import is fine for now)
import BackgroundScene from '@/components/3d/BackgroundScene';

// Transition Wrapper for handling routes
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/predict" element={<PredictPage />} />
                <Route path="/model-info" element={<ModelInfoPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </AnimatePresence>
    );
};

import { ThemeProvider } from "@/context/ThemeContext"

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
                <ScrollToTop />
                <Toaster position="top-right" toastOptions={{
                    className: 'glass-panel text-foreground border-border',
                    style: {
                        background: 'hsl(var(--background))',
                        color: 'hsl(var(--foreground))',
                        border: '1px solid hsl(var(--border))',
                    },
                }} />

                {/* Persistent 3D Background */}
                <Suspense fallback={<div className="fixed inset-0 bg-background" />}>
                    <BackgroundScene />
                </Suspense>

                <Layout>
                    <AnimatedRoutes />
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;
