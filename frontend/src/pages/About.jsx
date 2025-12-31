import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Globe, Award } from 'lucide-react';
import Card from '@/components/ui/Card';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-20 pb-20">
            {/* Mission Section */}
            <section className="text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                        Bridging Medical Data & <span className="text-teal-600">AI Precision</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed text-balance">
                        Cardiovascular disease remains the leading cause of death globally. Our mission is to democratize access to early risk detection through advanced machine learning.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-slate-900 flex items-center justify-center p-8 group"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-700" />
                    <div className="relative z-10 text-center text-white space-y-4">
                        <Activity className="w-12 h-12 mx-auto text-teal-400" />
                        <h2 className="text-3xl font-display font-bold">Why Prediction Matters</h2>
                        <p className="max-w-lg mx-auto text-slate-300">Early identification of risk factors like hypertension and cholesterol can prevent up to 80% of premature heart attacks.</p>
                    </div>
                </motion.div>
            </section>

            {/* Values Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Heart, title: "Patient Centric", desc: "Designed with empathy. We prioritize clarity and reduce anxiety in health reporting." },
                    { icon: Globe, title: "Global Impact", desc: "Scalable technology capable of serving diverse populations with varying health profiles." },
                    { icon: Award, title: "Clinical Excellence", desc: "Adhering to standard medical datasets ensuring our models are rigorously trained." }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="h-full space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                        </Card>
                    </motion.div>
                ))}
            </section>

            {/* Developer Story */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-none text-white p-12 text-center space-y-6">
                    <h2 className="text-3xl font-display font-bold">The Developer</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Nikunj Rathod is a Final Year Computer Science student passionate about the intersection of Healthcare and Artificial Intelligence. This project represents a culmination of research into predictive analytics.
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};

export default About;
