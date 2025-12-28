import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, CheckCircle, AlertOctagon } from 'lucide-react';

const featureData = [
    { name: 'Systolic BP', importance: 0.898, fill: '#ef4444' }, // ap_hi
    { name: 'Cholesterol', importance: 0.490, fill: '#f97316' },
    { name: 'Weight', importance: 0.148, fill: '#eab308' },
    { name: 'Diastolic BP', importance: 0.131, fill: '#84cc16' },
    { name: 'Age', importance: 0.049, fill: '#22c55e' },
    { name: 'Height', importance: -0.035, fill: '#06b6d4' },
    { name: 'Glucose', importance: -0.132, fill: '#3b82f6' },
    { name: 'Smoking', importance: -0.188, fill: '#6366f1' },
    { name: 'Alcohol', importance: -0.271, fill: '#8b5cf6' },
];

const AnimatedCounter = ({ value, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseFloat(value);
        if (start === end) return;

        let totalMilSec = duration * 1000;
        let incrementTime = (totalMilSec / end) * 0.1;

        let timer = setInterval(() => {
            start += Math.random() * 2;
            if (start > end) start = end;
            setCount(start.toFixed(2));
            if (start === end) clearInterval(timer);
        }, 30);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}</span>;
}

const ModelInfoPage = () => {
    // Real Data from User
    const cm = { tp: 4480, tn: 4937, fp: 1520, fn: 2158 };
    // Classification Report Data
    const accuracy = 71.91;
    const precision = 75.00; // for class 1
    const recall = 67.00;    // for class 1
    const f1 = 71.00;        // for class 1

    return (
        <div className="min-h-screen bg-slate-50 relative pb-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="container px-4 md:px-6 py-12 space-y-12 relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 mb-12"
                >
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-slate-600 text-sm font-medium mb-4">
                        <Activity className="w-4 h-4 mr-2 text-primary-500" />
                        Logistic Regression Analysis
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                        Model Performance
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-xl leading-relaxed">
                        Evaluated on a test set of <strong className="text-slate-800">13,095</strong> patient records.
                    </p>
                </motion.div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Accuracy", value: accuracy, color: "blue", icon: CheckCircle },
                        { label: "Precision (Risk)", value: precision, color: "emerald", icon: TrendingUp },
                        { label: "Recall (Risk)", value: recall, color: "violet", icon: AlertOctagon },
                        { label: "F1 Score", value: f1, color: "amber", icon: Activity },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className={`text-center bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}>
                                <div className={`absolute top-0 left-0 w-full h-1 bg-${stat.color}-500`} />
                                <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-${stat.color}-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`} />

                                <CardContent className="p-8 relative z-10">
                                    <div className={`inline-flex p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 mb-4`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">{stat.label}</div>
                                    <div className={`text-5xl font-black text-slate-900`}>
                                        <AnimatedCounter value={stat.value} />%
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Confusion Matrix */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Card className="h-full border-none shadow-xl overflow-hidden">
                                <CardHeader className="bg-slate-900 text-white p-6">
                                    <CardTitle className="flex items-center text-xl text-white">
                                        Test Set Results (n=13,095)
                                    </CardTitle>
                                    <CardDescription className="text-slate-400">
                                        Confusion Matrix breakdown
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 flex flex-col items-center justify-center bg-white">
                                    <div className="grid grid-cols-[auto_1fr_1fr] gap-4 text-center w-full">
                                        {/* Header Row */}
                                        <div className="col-start-2 text-xs font-bold text-slate-400 uppercase tracking-widest pb-2">Actual Positive <br /><span className="text-[10px] text-slate-300">(Has Disease)</span></div>
                                        <div className="col-start-3 text-xs font-bold text-slate-400 uppercase tracking-widest pb-2">Actual Negative <br /><span className="text-[10px] text-slate-300">(Healthy)</span></div>

                                        {/* Row 1 */}
                                        <div className="flex flex-col items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest pr-2">
                                            <span className="rotate-180 [writing-mode:vertical-lr]">Pred. Positive</span>
                                            <span className="text-[10px] text-slate-300 rotate-180 [writing-mode:vertical-lr] mt-1">(Risk)</span>
                                        </div>

                                        <motion.div whileHover={{ scale: 1.02 }} className="aspect-square bg-green-50 rounded-xl border border-green-100 flex flex-col items-center justify-center p-2 relative group cursor-help">
                                            <span className="text-3xl font-black text-green-700">{cm.tp}</span>
                                            <span className="text-xs font-bold text-green-700 uppercase mt-1">True Positive</span>
                                            <span className="text-[10px] text-green-600/80 leading-tight mt-1">Correctly Identified<br />Risk</span>
                                            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.02 }} className="aspect-square bg-orange-50 rounded-xl border border-orange-100 flex flex-col items-center justify-center p-2 relative group cursor-help">
                                            <span className="text-3xl font-black text-orange-700">{cm.fp}</span>
                                            <span className="text-xs font-bold text-orange-700 uppercase mt-1">False Positive</span>
                                            <span className="text-[10px] text-orange-600/80 leading-tight mt-1">Healthy but flagged<br />as Risk</span>
                                            <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                        </motion.div>

                                        {/* Row 2 */}
                                        <div className="flex flex-col items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest pr-2">
                                            <span className="rotate-180 [writing-mode:vertical-lr]">Pred. Negative</span>
                                            <span className="text-[10px] text-slate-300 rotate-180 [writing-mode:vertical-lr] mt-1">(Safe)</span>
                                        </div>

                                        <motion.div whileHover={{ scale: 1.02 }} className="aspect-square bg-red-50 rounded-xl border border-red-100 flex flex-col items-center justify-center p-2 relative group cursor-help">
                                            <span className="text-3xl font-black text-red-700">{cm.fn}</span>
                                            <span className="text-xs font-bold text-red-700 uppercase mt-1">False Negative</span>
                                            <span className="text-[10px] text-red-600/80 leading-tight mt-1">Risk missed by<br />Model</span>
                                            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.02 }} className="aspect-square bg-blue-50 rounded-xl border border-blue-100 flex flex-col items-center justify-center p-2 relative group cursor-help">
                                            <span className="text-3xl font-black text-blue-700">{cm.tn}</span>
                                            <span className="text-xs font-bold text-blue-700 uppercase mt-1">True Negative</span>
                                            <span className="text-[10px] text-blue-600/80 leading-tight mt-1">Correctly Cleared<br />Healthy</span>
                                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Feature Importance */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Card className="h-full border-none shadow-xl overflow-hidden bg-white">
                                <CardHeader className="bg-slate-900 text-white p-6">
                                    <CardTitle className="text-xl text-white">Feature Importance</CardTitle>
                                    <CardDescription className="text-slate-400">Coefficients determining risk probability</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart data={featureData} layout="vertical" margin={{ top: 10, right: 30, left: 60, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                            <XAxis type="number" hide />
                                            <YAxis
                                                type="category"
                                                dataKey="name"
                                                width={100}
                                                tick={{ fontSize: 13, fill: '#64748b', fontWeight: 600 }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <ReTooltip
                                                cursor={{ fill: '#f8fafc' }}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                            <ReferenceLine x={0} stroke="#94a3b8" />
                                            <Bar dataKey="importance" radius={[4, 4, 4, 4]} barSize={20} animationDuration={1500}>
                                                {featureData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.importance > 0 ? '#0ea5e9' : '#94a3b8'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <div className="mt-4 text-sm text-slate-500 text-center">
                                        <span className="inline-block w-3 h-3 bg-sky-500 rounded-full mr-2"></span> Positive correlation (Increases Risk)
                                        <span className="inline-block w-3 h-3 bg-slate-400 rounded-full ml-4 mr-2"></span> Negative correlation (Decreases Risk)
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {/* Model Overview Text */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
                >
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Model Analysis</h3>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                        <p>
                            The Logistic Regression model demonstrates a <strong>71.91% accuracy</strong> in predicting cardiovascular disease risk.
                            The most significant predictor is <strong>Systolic Blood Pressure (ap_hi)</strong> with a coeffecient of 0.898, indicating it is the strongest "Red Flag" for the model.
                            <strong>Cholesterol</strong> levels follow as the second most critical factor.
                        </p>
                        <p className="mt-4">
                            Interestingly, lifestyle factors such as alcohol consumption (-0.271) and smoking (-0.188) show negative coefficients in this specific dataset context.
                            While typically risk factors, their negative weight here might imply they are correlated with other variables or specific demographics in the training data (e.g., younger active smokers vs older non-smokers).
                            However, the physiological markers (BP, Cholesterol, Weight) remain the dominant, reliable indicators for prediction.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ModelInfoPage;
