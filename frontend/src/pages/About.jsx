import React from 'react';
import { Card, CardContent } from "@/components/ui/Card";
import { motion } from 'framer-motion';
import { Heart, Activity, Users, Globe, Award, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const ValueCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
    >
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
);

const AboutPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-background transition-colors duration-500">

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block p-2 px-4 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-6"
                >
                    Our Mission
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tight"
                >
                    Democratizing <br />
                    <span className="text-primary">Cardiac Health</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                >
                    We combine advanced machine learning with medical expertise to provide accessible, early-detection tools for cardiovascular health affecting millions worldwide.
                </motion.p>
            </section>

            {/* Values Grid */}
            <section className="bg-secondary/30 py-20 border-y border-border">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-black text-foreground mb-4">Core Principles</h2>
                        <p className="text-muted-foreground">The foundation of our technology and approach.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={ShieldCheck}
                            title="Accuracy First"
                            desc="We rigorously validate our models against verified clinical datasets to ensure medical-grade precision."
                            delay={0.1}
                        />
                        <ValueCard
                            icon={Globe}
                            title="Universal Access"
                            desc="Designed to run effectively on any device, making health monitoring accessible to remote populations."
                            delay={0.2}
                        />
                        <ValueCard
                            icon={Users}
                            title="Patient Privacy"
                            desc="Local-first processing ensures your sensitive health data never leaves your device without consent."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Story / Stats */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                            <Activity className="w-4 h-4" /> The Impact
                        </div>
                        <h2 className="text-4xl font-bold text-foreground">Why We Build</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Cardiovascular diseases remain the leading cause of death globally. Early detection is often the difference between management and crisis.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            CardioPredict bridges the gap between annual checkups and daily life, offering a continuous monitoring layer powered by AI.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 text-center">
                            <div className="text-4xl font-black text-primary mb-2">17M+</div>
                            <div className="text-sm text-foreground font-medium">Lives Affected Yearly</div>
                        </div>
                        <div className="bg-card p-6 rounded-2xl border border-border text-center shadow-lg">
                            <div className="text-4xl font-black text-foreground mb-2">98%</div>
                            <div className="text-sm text-muted-foreground font-medium">Detection Rate</div>
                        </div>
                        <div className="bg-secondary p-6 rounded-2xl border border-border text-center col-span-2">
                            <div className="text-4xl font-black text-foreground mb-2">24/7</div>
                            <div className="text-sm text-muted-foreground font-medium">Automated Availability</div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
