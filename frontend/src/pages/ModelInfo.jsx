import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Database, Binary, BarChart3, TrendingUp, Cpu, Layers, BrainCircuit } from 'lucide-react';
import Card from '@/components/ui/Card';

const CountUp = ({ value, suffix = '', duration = 1.5 }) => {
    const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
    const display = useTransform(spring, (current) =>
        Math.floor(current).toLocaleString() + suffix
    );

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
};

const ModelInfo = () => {

    const metricsData = [
        { name: 'Class 0 (Healthy)', Precision: 0.70, Recall: 0.76, F1: 0.73 },
        { name: 'Class 1 (At Risk)', Precision: 0.75, Recall: 0.68, F1: 0.71 },
    ];

    const featureImportance = [
        { name: 'Sys. BP', value: 0.35 },
        { name: 'Age', value: 0.25 },
        { name: 'Cholest.', value: 0.15 },
        { name: 'BMI', value: 0.12 },
        { name: 'Glucose', value: 0.08 },
        { name: 'Activity', value: 0.05 },
    ];

    const confusionMatrix = [
        { type: 'TN', value: 4926, label: 'True Negative', desc: 'Correctly identified healthy', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' },
        { type: 'FP', value: 1531, label: 'False Positive', desc: 'Incorrectly flagged risk', color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-800' },
        { type: 'FN', value: 2148, label: 'False Negative', desc: 'Missed disease case', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-800' },
        { type: 'TP', value: 4490, label: 'True Positive', desc: 'Correctly identified risk', color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 border-teal-100 dark:border-teal-800' },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-16 pb-20">
            {/* Header */}
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider"
                >
                    <BrainCircuit className="w-4 h-4" /> Technical Documentation
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
                    Model Architecture & Performance
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                    Transparent evaluation of our Logistic Regression algorithm trained on 13,000+ clinical samples for cardiovascular risk stratification.
                </p>
            </div>

            {/* Top Level Stats (Animated) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { icon: TrendingUp, val: 71.9, label: 'Accuracy', suffix: '%', color: 'teal' },
                    { icon: Database, val: 13095, label: 'Dataset Samples', suffix: '', color: 'slate' },
                    { icon: Binary, val: 2, label: 'Output Classes', suffix: '', color: 'sky' },
                    { icon: BarChart3, val: 0.72, label: 'Macro F1', suffix: '', color: 'indigo' }
                ].map((item, i) => (
                    <Card key={i} className={`flex flex-col items-center justify-center text-center space-y-2 border-t-4 border-t-${item.color}-500 dark:bg-slate-900`}>
                        <span className={`p-3 bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-full text-${item.color}-600 dark:text-${item.color}-400 mb-2`}>
                            <item.icon className="w-6 h-6" />
                        </span>
                        <span className="text-4xl font-bold text-slate-900 dark:text-white">
                            <CountUp value={item.val} suffix={item.suffix} />
                        </span>
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item.label}</span>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Confusion Matrix Visualization */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Layers className="w-6 h-6 text-teal-500" /> Confusion Matrix
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {confusionMatrix.map((item, i) => (
                            <Card key={i} className={`text-center space-y-1 border ${item.color} dark:bg-transparent`}>
                                <div className="text-3xl font-bold"><CountUp value={item.value} /></div>
                                <div className="font-bold text-sm uppercase opacity-90">{item.type}</div>
                                <div className="text-xs opacity-75">{item.desc}</div>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Metric Charts */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-indigo-500" /> Classification Metrics
                    </h2>
                    <Card className="h-[300px] flex items-center justify-center p-0 overflow-hidden dark:bg-slate-900">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={metricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 1]} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                                <Bar dataKey="Precision" fill="#0ea5e9" radius={[4, 4, 0, 0]} animationDuration={1500} />
                                <Bar dataKey="Recall" fill="#14b8a6" radius={[4, 4, 0, 0]} animationDuration={1500} />
                                <Bar dataKey="F1" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={1500} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </motion.div>
            </div>

            {/* Feature Importance & Methodology */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Cpu className="w-6 h-6 text-rose-500" /> Feature Importance
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Which factors contribute most to the risk prediction?
                    </p>
                    <div className="space-y-4">
                        {featureImportance.map((item, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-slate-700 dark:text-slate-300">{item.name}</span>
                                    <span className="text-slate-500">{(item.value * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.value * 100}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Database className="w-6 h-6 text-sky-500" /> Training Methodology
                    </h2>
                    <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400">
                        <p>
                            The model utilizes <strong>Logistic Regression</strong>, a statistical method for analyzing a dataset in which there are one or more independent variables that determine an outcome.
                        </p>
                        <ul className="space-y-2 list-disc pl-5 mt-4">
                            <li>
                                <strong>Data Preprocessing:</strong> Outliers in height/weight were capped using IQR method. Blood pressure values were normalized.
                            </li>
                            <li>
                                <strong>Validation:</strong> We used 80/20 Train-Test split with k-fold cross-validation to ensure robustness.
                            </li>
                            <li>
                                <strong>Bias Mitigation:</strong> The dataset was balanced to prevent class dominance, ensuring the model is equally sensitive to positive and negative cases.
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ModelInfo;
