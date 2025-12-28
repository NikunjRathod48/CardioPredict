import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Activity, Heart, Brain, Database, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-100/40 rounded-full blur-[120px] -z-10 opacity-50" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px] -z-10 opacity-50" />

            <div className="container px-4 md:px-6 py-20 max-w-6xl mx-auto space-y-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-4">
                        <Brain className="w-4 h-4 mr-2" />
                        Academic Research Project
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight">
                        Revolutionizing <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Cardiac Care</span>
                    </h1>
                    <p className="text-slate-600 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-light">
                        Bridging the gap between Machine Learning and preventative cardiology with high-precision predictive modeling.
                    </p>
                </motion.div>

                {/* Main Info Cards - Staggered */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-0 shadow-2xl shadow-primary-500/10 overflow-hidden relative h-full">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-indigo-500" />
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-3xl font-bold">
                                    <Brain className="mr-4 h-8 w-8 text-primary-500" />
                                    The Technology
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-600 leading-relaxed text-lg space-y-6">
                                <p>
                                    At the core of CardioPredict lies a sophisticated <strong className="text-slate-900">Logistic Regression Model</strong>.
                                    Unlike simple rule-based systems, our model learns from complex relationships between
                                    risk factors.
                                </p>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-4 mb-2">
                                        <Database className="h-5 w-5 text-indigo-500" />
                                        <h4 className="font-bold text-slate-800">Data-Driven Intelligence</h4>
                                    </div>
                                    <p className="text-sm">
                                        Trained on a diverse dataset of over 70,000 patient records, enabling the system to identify subtle non-linear correlations between lifestyle and physiology.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border-0 shadow-2xl shadow-red-500/10 overflow-hidden relative h-full">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-3xl font-bold">
                                    <Heart className="mr-4 h-8 w-8 text-red-500" />
                                    Why It Matters
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-600 leading-relaxed text-lg space-y-6">
                                <p>
                                    Cardiovascular diseases (CVDs) remain the leading cause of death globally.
                                    According to the WHO, approximately <strong className="text-slate-900">17.9 million people</strong> die from CVDs each year.
                                </p>
                                <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                                    <div className="flex items-center gap-4 mb-2">
                                        <Activity className="h-5 w-5 text-red-500" />
                                        <h4 className="font-bold text-red-900">Preventative Action</h4>
                                    </div>
                                    <p className="text-sm text-red-800">
                                        <strong>Early detection is key.</strong> Many CVDs are preventable. CardioPredict serves as a "first line of defense," making risk assessment accessible to everyone.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Risk Factors Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 md:p-16 shadow-xl border border-white/50"
                >
                    <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Understanding the Risk Factors</h3>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "Blood Pressure", icon: Activity, desc: "Silent strain on arteries. We track both Systolic & Diastolic." },
                            { title: "Metabolic Health", icon: Database, desc: "Cholesterol & Glucose levels indicate plaque buildup and diabetes risks." },
                            { title: "Lifestyle Impact", icon: Brain, desc: "BMI, smoking, and alcohol intake are weighted heavily in our algorithm." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="space-y-4 text-center px-4"
                            >
                                <div className="mx-auto h-16 w-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-primary-600 mb-6">
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutPage;
