import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import { Activity, Heart, Shield, Database, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const HomePage = () => {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50">
                {/* Background Blobs */}
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary-200/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[100px] animate-pulse delay-1000" />

                <div className="container px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-sm font-medium text-slate-600 mb-4"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                            AI-Powered Health Analysis
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                            Your Heart Health, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 animate-gradient-x">
                                Decoded by AI.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-[600px] mx-auto lg:mx-0 leading-relaxed">
                            Leveraging advanced Machine Learning algorithms to predict cardiovascular risk with <strong>88% accuracy</strong>. prevention starts with prediction.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link to="/predict">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 flex items-center gap-2"
                                >
                                    Check My Risk <ChevronRight className="h-5 w-5" />
                                </motion.button>
                            </Link>
                            <Link to="/about">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg shadow-sm hover:shadow-md transition-all"
                                >
                                    Learn More
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Interactive 3D/Floating Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            className="relative z-20"
                        >
                            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 max-w-md mx-auto">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <div className="text-sm text-slate-500 font-medium">Risk Analysis</div>
                                        <div className="text-2xl font-bold text-slate-900">Low Probability</div>
                                    </div>
                                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <Activity className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "12%" }}
                                            transition={{ delay: 1, duration: 1.5 }}
                                            className="h-full bg-green-500 rounded-full"
                                        />
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-500">
                                        <span>Confidence Score</span>
                                        <span className="font-bold text-slate-900">92.4%</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 7, delay: 1 }}
                            className="absolute top-10 right-10 z-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                        >
                            <Heart className="text-red-500 fill-red-500 h-6 w-6" />
                            <span className="font-bold text-slate-700">72 bpm</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 8, delay: 0.5 }}
                            className="absolute bottom-20 left-0 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                        >
                            <Database className="text-blue-500 h-6 w-6" />
                            <span className="font-bold text-slate-700">70k+ Records</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="container px-4 md:px-6 py-20">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">How It Works</h2>
                        <p className="text-slate-500 mt-4 text-lg">Three simple steps to assess your cardiovascular health.</p>
                    </motion.div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {[
                        { step: 1, title: "Input Vitals", desc: "Enter basic health metrics securely.", icon: Activity },
                        { step: 2, title: "AI Processing", desc: "Our model analyzes typical risk patterns.", icon: Zap },
                        { step: 3, title: "Instant Result", desc: "Get actionable health insights immediately.", icon: Shield },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                            whileHover={{ y: -10 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white rounded-3xl transform rotate-3 transition-transform group-hover:rotate-0" />
                            <div className="relative bg-white p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition-all">
                                <div className="h-14 w-14 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:rotate-12 transition-transform">
                                    <item.icon className="h-7 w-7" />
                                </div>
                                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Technologies */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="container px-4 relative z-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-16"
                    >
                        Powered by Industry Standard Tech
                    </motion.h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {[
                            { name: 'React', icon: Zap, color: 'text-cyan-400', desc: 'Frontend UI' },
                            { name: 'Python', icon: Database, color: 'text-yellow-400', desc: 'Backend Logic' },
                            { name: 'Scikit-Learn', icon: Activity, color: 'text-orange-400', desc: 'ML Algorithms' },
                            { name: 'Tailwind', icon: Shield, color: 'text-teal-400', desc: 'Styling Engine' },
                            { name: 'Flask', icon: Zap, color: 'text-white', desc: 'API Server' },
                        ].map((tech, idx) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center group cursor-pointer"
                            >
                                <div className={`h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${tech.color}`}>
                                    <tech.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg">{tech.name}</h3>
                                <p className="text-white/40 text-sm mt-1">{tech.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
