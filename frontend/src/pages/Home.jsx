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
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-balance">{desc}</p>
        </Card>
    </motion.div>
);

const Home = () => {
    return (
        <div className="space-y-32 pb-20">
            {/* Hero Section */}
            <section className="relative text-center max-w-5xl mx-auto space-y-8 pt-10">

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]"
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
                    className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
                >
                    Empowering healthcare decisions with data-driven machine learning. Evidence-backed early detection of cardiovascular risk factors using 13,000+ validated test records.
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
                    <Link to="/model-info">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto h-14 text-lg bg-white dark:bg-slate-800 dark:text-white">
                            View Methodology
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Feature Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureBlock
                    icon={Brain}
                    title="Gradient Boosting Intelligence"
                    desc="Powered by an advanced ensemble model trained on 13,000+ patient records. Optimized for high precision using AUC and Precision-Recall metrics."
                    delay={0.1}
                />
                <FeatureBlock
                    icon={ShieldCheck}
                    title="Privacy & Ethics First"
                    desc="Patient data is processed in real-time ephemeral compute sessions. No personal identifiers are stored, ensuring complete confidentiality."
                    delay={0.2}
                />
                <FeatureBlock
                    icon={Activity}
                    title="Instant Decision Support"
                    desc="Medical-grade responsiveness providing immediate risk stratification based on vitals, facilitating timely clinical interventions."
                    delay={0.3}
                />
            </section>
        </div>
    );
};

export default Home;
