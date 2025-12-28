import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { predictRisk } from '@/lib/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckCircle2, AlertTriangle, ArrowRight, ClipboardList, Thermometer, User, Cigarette, Wine } from 'lucide-react';
import { cn } from '@/lib/utils';
import ErrorBoundary from '@/components/ErrorBoundary';

const PredictPage = () => {
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        weight: '',
        ap_hi: '',
        ap_lo: '',
        cholesterol: '1',
        gluc: '1',
        smoke: false,
        alco: false
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const resultRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggleCheckbox = (name) => {
        setFormData(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            if (!formData.age || !formData.height || !formData.weight || !formData.ap_hi || !formData.ap_lo) {
                throw new Error("Please fill in all numerical fields.");
            }

            const data = {
                ...formData,
                age: parseInt(formData.age),
                height: parseInt(formData.height),
                weight: parseInt(formData.weight),
                ap_hi: parseInt(formData.ap_hi),
                ap_lo: parseInt(formData.ap_lo),
                cholesterol: parseInt(formData.cholesterol),
                gluc: parseInt(formData.gluc),
                smoke: formData.smoke ? 1 : 0,
                alco: formData.alco ? 1 : 0
            };

            const prediction = await predictRisk(data);

            // Artificial delay for "Scanning" effect
            await new Promise(resolve => setTimeout(resolve, 1500));

            setResult(prediction);
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

            toast.success('Analysis Complete');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Prediction failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-slate-50 relative pb-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                {/* Header */}
                <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
                    <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[100px]" />
                    <div className="container px-4 md:px-6 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black tracking-tight mb-4"
                        >
                            Health Risk Assessment
                        </motion.h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Complete the clinical form below to generate an AI-powered cardiovascular prognostic report.
                        </p>
                    </div>
                </div>

                <div className="container px-4 md:px-6 -mt-10 relative z-20 max-w-4xl mx-auto">
                    {/* Main Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="shadow-2xl border-0 overflow-hidden ring-1 ring-slate-900/5">
                            <div className="h-2 bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500" />
                            <CardContent className="p-8 md:p-10">
                                <form onSubmit={handleSubmit} className="space-y-10">

                                    {/* Section 1: Demographics */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-2">
                                            <User className="h-5 w-5 text-primary-500" />
                                            <h3 className="font-bold text-lg">Patient Demographics</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <Input label="Age (Years)" name="age" type="number" placeholder="45" value={formData.age} onChange={handleChange} required className="bg-slate-50" />
                                            <Input label="Height (cm)" name="height" type="number" placeholder="175" value={formData.height} onChange={handleChange} required className="bg-slate-50" />
                                            <Input label="Weight (kg)" name="weight" type="number" placeholder="75" value={formData.weight} onChange={handleChange} required className="bg-slate-50" />
                                        </div>
                                    </div>

                                    {/* Section 2: Vitals */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-2">
                                            <Activity className="h-5 w-5 text-primary-500" />
                                            <h3 className="font-bold text-lg">Vitals & Labs</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <Input label="Systolic BP (mmHg)" name="ap_hi" type="number" placeholder="120" value={formData.ap_hi} onChange={handleChange} required className="bg-slate-50" />
                                                <Input label="Diastolic BP (mmHg)" name="ap_lo" type="number" placeholder="80" value={formData.ap_lo} onChange={handleChange} required className="bg-slate-50" />
                                            </div>
                                            <div className="space-y-4">
                                                <Select
                                                    label="Cholesterol"
                                                    name="cholesterol"
                                                    value={formData.cholesterol}
                                                    onChange={handleChange}
                                                    options={[{ value: '1', label: 'Normal' }, { value: '2', label: 'Above Normal' }, { value: '3', label: 'High' }]}
                                                />
                                                <Select
                                                    label="Glucose"
                                                    name="gluc"
                                                    value={formData.gluc}
                                                    onChange={handleChange}
                                                    options={[{ value: '1', label: 'Normal' }, { value: '2', label: 'Above Normal' }, { value: '3', label: 'High' }]}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Lifestyle */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-2">
                                            <ClipboardList className="h-5 w-5 text-primary-500" />
                                            <h3 className="font-bold text-lg">Lifestyle Factors</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div
                                                onClick={() => toggleCheckbox('smoke')}
                                                className={cn(
                                                    "cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4",
                                                    formData.smoke ? "border-primary-500 bg-primary-50" : "border-slate-100 hover:border-slate-200"
                                                )}
                                            >
                                                <div className={cn("p-2 rounded-lg", formData.smoke ? "bg-white text-primary-500" : "bg-slate-100 text-slate-400")}>
                                                    <Cigarette className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <span className="font-bold block text-slate-700">Smoker</span>
                                                    <span className="text-sm text-slate-500">Currently smokes tobacco</span>
                                                </div>
                                                {formData.smoke && <CheckCircle2 className="ml-auto text-primary-500 h-6 w-6" />}
                                            </div>

                                            <div
                                                onClick={() => toggleCheckbox('alco')}
                                                className={cn(
                                                    "cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4",
                                                    formData.alco ? "border-primary-500 bg-primary-50" : "border-slate-100 hover:border-slate-200"
                                                )}
                                            >
                                                <div className={cn("p-2 rounded-lg", formData.alco ? "bg-white text-primary-500" : "bg-slate-100 text-slate-400")}>
                                                    <Wine className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <span className="font-bold block text-slate-700">Alcohol Consumer</span>
                                                    <span className="text-sm text-slate-500">Regular alcohol intake</span>
                                                </div>
                                                {formData.alco && <CheckCircle2 className="ml-auto text-primary-500 h-6 w-6" />}
                                            </div>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full text-lg h-16 rounded-xl shadow-lg shadow-primary-500/25 transition-all hover:scale-[1.01]" isLoading={loading}>
                                        {loading ? 'Processing Clinical Data...' : 'Generate Prediction Report'}
                                        {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Result Dashboard */}
                    <div ref={resultRef} className="mt-12 scroll-mt-24">
                        <AnimatePresence mode="wait">
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px]" />
                                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />

                                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                            <div className="text-center md:text-left space-y-6">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-medium border border-white/10">
                                                    <Activity className="h-4 w-4 mr-2" />
                                                    Analysis Result
                                                </div>
                                                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                                    {result.risk === 1
                                                        ? <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">High Risk Detected</span>
                                                        : <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Low Risk Profile</span>
                                                    }
                                                </h2>
                                                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                                                    {result.risk === 1
                                                        ? "Our algorithms have identified multiple markers indicating a potential cardiovascular irregularity. Immediate clinical consultation is recommended."
                                                        : "Your physiological markers closely align with optimal health standards. No immediate irregularities detected by the model."
                                                    }
                                                </p>

                                                <div className={cn(
                                                    "p-6 rounded-2xl border border-white/10 flex items-start gap-4",
                                                    result.risk === 1 ? "bg-red-500/10" : "bg-emerald-500/10"
                                                )}>
                                                    {result.risk === 1
                                                        ? <AlertTriangle className="h-8 w-8 text-red-400 shrink-0" />
                                                        : <CheckCircle2 className="h-8 w-8 text-emerald-400 shrink-0" />
                                                    }
                                                    <div>
                                                        <h4 className={cn("font-bold text-lg mb-1", result.risk === 1 ? "text-red-400" : "text-emerald-400")}>
                                                            {result.risk === 1 ? "Action Required" : "Keep it up!"}
                                                        </h4>
                                                        <p className="text-white/60 text-sm">
                                                            {result.risk === 1
                                                                ? "Lifestyle modifications and a doctor's visit are strongly advised."
                                                                : "Maintain your current lifestyle and schedule regular checkups."
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Gauge Visual */}
                                            <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/10 relative">
                                                <div className="relative w-64 h-64">
                                                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                                        <circle
                                                            className="text-slate-800"
                                                            strokeWidth="8"
                                                            stroke="currentColor"
                                                            fill="transparent"
                                                            r="42"
                                                            cx="50"
                                                            cy="50"
                                                        />
                                                        <motion.circle
                                                            className={result.risk === 1 ? "text-red-500" : "text-emerald-500"}
                                                            strokeWidth="8"
                                                            strokeDasharray={264}
                                                            strokeDashoffset={264}
                                                            strokeLinecap="round"
                                                            stroke="currentColor"
                                                            fill="transparent"
                                                            r="42"
                                                            cx="50"
                                                            cy="50"
                                                            initial={{ strokeDashoffset: 264 }}
                                                            animate={{ strokeDashoffset: 264 - (264 * result.probability) / 100 }}
                                                            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                                                        />
                                                    </svg>
                                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.5 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 1 }}
                                                            className="text-5xl font-black text-white tracking-tighter"
                                                        >
                                                            {result.probability}%
                                                        </motion.div>
                                                        <div className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">Probability</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default PredictPage;
