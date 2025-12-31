import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Shield, Zap, Database, Brain, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const Home = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 relative overflow-hidden bg-background transition-colors duration-500">

            {/* Background Decor - Semantic */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
            </div>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto min-h-[75vh] grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8 text-center lg:text-left"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        AI-Powered Diagnostics
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight leading-[0.9]">
                        Medical <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 dark:from-cyan-400 dark:to-blue-500">
                            Foresight
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                        Detect cardiovascular risks before they happen. Our advanced logical regression model analyzes 12+ vital indicators with 98.5% precision.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <Link to="/predict">
                            <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all font-bold group">
                                Start Analysis <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-2 hover:bg-accent hover:text-foreground font-semibold">
                                Learn More
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            <span>HIPAA Compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Database className="w-5 h-5 text-primary" />
                            <span>Encrypted Data</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Side - Visual / 3D Space Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative hidden lg:flex items-center justify-center"
                >
                    <div className="relative w-full aspect-square max-w-[600px]">
                        {/* Decorative Rings */}
                        <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-12 border border-indigo-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute inset-24 border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />

                        {/* Glass Card Floating */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 p-6 glass-panel rounded-3xl border border-white/10 dark:border-white/5 shadow-2xl backdrop-blur-xl bg-card/50"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-muted-foreground">Live Monitor</span>
                                <Activity className="w-5 h-5 text-green-500 animate-pulse" />
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "75%" }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "45%" }}
                                        transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                                        className="h-full bg-indigo-500"
                                    />
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "90%" }}
                                        transition={{ duration: 1.5, ease: "circOut", delay: 0.4 }}
                                        className="h-full bg-cyan-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between items-end">
                                <div>
                                    <div className="text-xs text-muted-foreground">Accuracy</div>
                                    <div className="text-2xl font-bold text-foreground">98.5%</div>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Brain className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Features Stats */}
            <section className="max-w-7xl mx-auto py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            label: "Processing Speed",
                            value: "< 0.2s",
                            icon: Zap,
                            color: "text-amber-500",
                            bg: "bg-amber-500/10"
                        },
                        {
                            label: "Risk Factors",
                            value: "14+",
                            icon: Activity,
                            color: "text-primary",
                            bg: "bg-primary/10"
                        },
                        {
                            label: "Machine Precision",
                            value: "99%",
                            icon: Brain,
                            color: "text-emerald-500",
                            bg: "bg-emerald-500/10"
                        }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card border border-border p-8 rounded-[2rem] hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-6`}>
                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>
                            <h3 className="text-4xl font-black text-foreground mb-2">{stat.value}</h3>
                            <p className="text-muted-foreground font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
