import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import PredictPage from '@/pages/Predict';
import ModelInfoPage from '@/pages/ModelInfo';
import ContactPage from '@/pages/Contact';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/predict" element={<PredictPage />} />
                    <Route path="/model-info" element={<ModelInfoPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
