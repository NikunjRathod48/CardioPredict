import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Activity, Brain } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const FeatureBlock = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
    >
        <Card className="h-full flex flex-col items-center text-center p-8 border-t-4 border-t-white hover:border-t-teal-400 transition-colors" hoverEffect>
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 text-teal-600">
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-500 leading-relaxed text-balance">{desc}</p>
        </Card>
    </motion.div>
);

const Home = () => {
    return (
        <div className="space-y-32 pb-20">
            {/* Hero Section */}
            <section className="relative text-center max-w-5xl mx-auto space-y-8 pt-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-600 font-medium text-sm mb-4"
                >
                    <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
                    AI Model v1.0 Live
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-5xl md:text-7xl font-display font-bold text-slate-900 tracking-tight leading-[1.1]"
                >
                    Advanced Cardiac Risk <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-sky-600">
                        Prediction Intelligence
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                >
                    Empowering healthcare decisions with machine learning. Early detection of cardiovascular risk factors using clinical data analysis.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <Link to="/predict">
                        <Button size="lg" className="w-full sm:w-auto px-10 h-14 text-lg shadow-xl shadow-teal-500/20">
                            Start Assessment <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto h-14 text-lg bg-white">
                            View Methodology
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Feature Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureBlock
                    icon={Brain}
                    title="Logistic Regression Core"
                    desc="Powered by a proven statistical model trained on over 13,000 patient records for reliable binary classification."
                    delay={0.1}
                />
                <FeatureBlock
                    icon={ShieldCheck}
                    title="Privacy Focused"
                    desc="Patient data is processed ephemerally. No personal identifiers are stored, ensuring complete confidentiality."
                    delay={0.2}
                />
                <FeatureBlock
                    icon={Activity}
                    title="Instant Analysis"
                    desc="Real-time processing of vitals, blood pressure, and lifestyle markers to generate immediate risk profiles."
                    delay={0.3}
                />
            </section>
        </div>
    );
};

export default Home;
