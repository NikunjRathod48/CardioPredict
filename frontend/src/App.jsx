import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import HomePage from '@/pages/Home';
import PredictPage from '@/pages/Predict';
import ModelInfoPage from '@/pages/ModelInfo';

// Transition Wrapper for handling routes
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/predict" element={<PredictPage />} />
                <Route path="/model-info" element={<ModelInfoPage />} />
            </Routes>
        </AnimatePresence>
    );
};

// Removed ThemeProvider as we are enforcing Light Mode only for this redesign -- RE-ADDED FOR DARK MODE
import { ThemeProvider } from '@/context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <ScrollToTop />
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        className: 'glass text-slate-900 dark:text-white dark:bg-slate-800 shadow-soft dark:shadow-depth-dark rounded-xl px-6 py-4 font-medium border border-white/20 dark:border-slate-700',
                        duration: 4000,
                        success: {
                            iconTheme: {
                                primary: '#0d9488', // Teal-600
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#fb7185', // Rose-400
                                secondary: '#fff',
                            },
                        },
                    }}
                />

                <Layout>
                    <AnimatedRoutes />
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;
