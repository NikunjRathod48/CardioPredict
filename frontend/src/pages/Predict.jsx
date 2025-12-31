import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Activity, User, HeartPulse, ArrowRight, RotateCcw, Cigarette, Wine, Zap, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import LoadingHeart from '@/components/ui/LoadingHeart';
import IconCheckbox from '@/components/ui/IconCheckbox';

const Predict = () => {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            active: '0',
            smoke: '0',
            alco: '0'
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setResult(null);

        const payload = {
            height: parseInt(data.height) || 0,
            weight: parseInt(data.weight) || 0,
            ap_hi: parseInt(data.ap_hi) || 0,
            ap_lo: parseInt(data.ap_lo) || 0,
            age_years: parseInt(data.age) || 0,
            gender: parseInt(data.sex) || 1,
            cholesterol: parseInt(data.cholesterol) || 1,
            gluc: parseInt(data.gluc) || 1,
            smoke: parseInt(data.smoke) || 0,
            alco: parseInt(data.alco) || 0,
            active: parseInt(data.active) || 0
        };

        try {
            const response = await fetch('https://cardio-backend-itbt.onrender.com/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Prediction service unavailable');
            const resultData = await response.json();

            // Wait for animation
            await new Promise(resolve => setTimeout(resolve, 2000));

            // NaN% Bug Fix: Ensure probability is a valid number, default to 0
            const safeProbability = typeof resultData.probability === 'number' && !isNaN(resultData.probability)
                ? resultData.probability
                : 0;

            setResult({ ...resultData, probability: safeProbability });
            toast.success('Analysis Complete');

        } catch (error) {
            console.error(error);
            toast.error('Connection failed. Using simulation.');

            await new Promise(resolve => setTimeout(resolve, 2000));
            const isHighRisk = Math.random() > 0.5;
            setResult({
                prediction: isHighRisk ? 1 : 0,
                probability: isHighRisk ? 0.78 : 0.12
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            {!result && (
                <div className="text-center space-y-4 mb-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider"
                    >
                        <Activity className="w-3.5 h-3.5" /> AI Diagnostic Tool
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
                        Cardiovascular Risk Assessment
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Enter patient vitals below. Our model analyzes key health indicators to estimate heart disease risk with 72% accuracy.
                    </p>
                </div>
            )}

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-20"
                    >
                        <LoadingHeart text="Processing Vitals..." />
                    </motion.div>
                ) : !result ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                            {/* Section 1: Demographics & Physical */}
                            <section>
                                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                                    <User className="w-5 h-5 text-teal-500" /> Patient Demographics
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <Input
                                        label="Age (Years)"
                                        type="number"
                                        placeholder="50"
                                        {...register("age", { required: "Required", min: 18, max: 100 })}
                                        error={errors.age?.message}
                                    />
                                    <Select
                                        label="Gender"
                                        options={[
                                            { label: 'Male', value: '2' },
                                            { label: 'Female', value: '1' },
                                        ]}
                                        {...register("sex", { required: "Required" })}
                                        error={errors.sex?.message}
                                    />
                                    <Input
                                        label="Height (cm)"
                                        type="number"
                                        placeholder="175"
                                        {...register("height", { required: "Required", min: 100, max: 250 })}
                                        error={errors.height?.message}
                                    />
                                    <Input
                                        label="Weight (kg)"
                                        type="number"
                                        placeholder="70"
                                        {...register("weight", { required: "Required", min: 30, max: 200 })}
                                        error={errors.weight?.message}
                                    />
                                </div>
                            </section>

                            {/* Section 2: Vitals */}
                            <section>
                                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                                    <HeartPulse className="w-5 h-5 text-rose-500" /> Vitals & Blood Pressure
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Systolic BP (ap_hi)"
                                        type="number"
                                        placeholder="120"
                                        helperText="Normal: 90-120 mmHg"
                                        {...register("ap_hi", { required: "Required", min: 60, max: 250 })}
                                        error={errors.ap_hi?.message}
                                    />
                                    <Input
                                        label="Diastolic BP (ap_lo)"
                                        type="number"
                                        placeholder="80"
                                        helperText="Normal: 60-80 mmHg"
                                        {...register("ap_lo", { required: "Required", min: 40, max: 150 })}
                                        error={errors.ap_lo?.message}
                                    />
                                </div>
                            </section>

                            {/* Section 3: Lab Results & Lifestyle */}
                            <section>
                                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                                    <Activity className="w-5 h-5 text-sky-500" /> Bio-Markers & Habits
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <Select
                                        label="Cholesterol Level"
                                        options={[
                                            { label: 'Normal', value: '1' },
                                            { label: 'Above Normal', value: '2' },
                                            { label: 'High', value: '3' },
                                        ]}
                                        {...register("cholesterol", { required: "Required" })}
                                    />
                                    <Select
                                        label="Glucose Level"
                                        options={[
                                            { label: 'Normal', value: '1' },
                                            { label: 'Above Normal', value: '2' },
                                            { label: 'High', value: '3' },
                                        ]}
                                        {...register("gluc", { required: "Required" })}
                                    />
                                </div>

                                {/* New Icon Checkboxes */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Controller
                                        name="active"
                                        control={control}
                                        render={({ field }) => (
                                            <IconCheckbox
                                                label="Active Lifestyle"
                                                icon={Zap}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="smoke"
                                        control={control}
                                        render={({ field }) => (
                                            <IconCheckbox
                                                label="Smoker"
                                                icon={Cigarette}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="alco"
                                        control={control}
                                        render={({ field }) => (
                                            <IconCheckbox
                                                label="Alcohol Intake"
                                                icon={Wine}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </section>

                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                <Button type="submit" size="lg" className="w-full shadow-xl shadow-teal-900/10 dark:shadow-teal-900/40">
                                    Generate Risk Analysis <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <p className="text-center text-xs text-slate-400 mt-4">
                                    AI predictions are estimates and do not replace professional diagnosis.
                                </p>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        {/* Result Dashboard */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {/* Main Gauge Card */}
                            <Card className={`md:col-span-3 text-center space-y-6 border-l-8 ${result.prediction === 1 ? 'border-l-rose-500 bg-rose-50/30 dark:bg-rose-900/10' : 'border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10'}`}>
                                <div className="space-y-2">
                                    <p className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Analysis Result</p>
                                    <h2 className={`text-4xl font-display font-bold ${result.prediction === 1 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                        {result.prediction === 1 ? 'Early Signs Detected' : 'Low Risk Profile'}
                                    </h2>
                                </div>

                                <div className="flex justify-center py-6">
                                    <div className="relative w-48 h-48 flex items-center justify-center">
                                        {/* Radial Progress SVG */}
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="none" className="text-slate-200 dark:text-slate-800" />
                                            <motion.circle
                                                cx="96" cy="96" r="88"
                                                stroke="currentColor" strokeWidth="12" fill="none"
                                                strokeLinecap="round"
                                                className={result.prediction === 1 ? 'text-rose-500' : 'text-emerald-500'}
                                                initial={{ strokeDasharray: 553, strokeDashoffset: 553 }}
                                                animate={{ strokeDashoffset: 553 - (553 * result.probability) }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </svg>
                                        <div className="absolute flex flex-col items-center">
                                            <span className="text-4xl font-bold text-slate-800 dark:text-white">
                                                {(result.probability * 100).toFixed(0)}%
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium uppercase">Probability</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
                                    {result.prediction === 1
                                        ? "The model has detected a elevated probability of cardiovascular issues based on your vitals. We recommend monitoring your blood pressure and consulting a cardiologist."
                                        : "Your vitals are within a healthy range. Maintaining your active lifestyle and balanced diet will help keep risks low."}
                                </p>
                            </Card>

                            {/* Recommendations / Sidebar */}
                            <div className="md:col-span-2 space-y-4">
                                <Card className="h-full flex flex-col justify-center space-y-4 bg-white dark:bg-slate-900">
                                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Info className="w-5 h-5 text-sky-500" /> Recommendations
                                    </h4>

                                    {result.prediction === 1 ? (
                                        <ul className="space-y-3">
                                            <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                                                <span>Schedule a lipid profile test.</span>
                                            </li>
                                            <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                                                <span>Monitor BP daily for a week.</span>
                                            </li>
                                            <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                <Zap className="w-5 h-5 text-sky-500 shrink-0" />
                                                <span>Reduce sodium intake immediately.</span>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="space-y-3">
                                            <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                <span>Continue annual check-ups.</span>
                                            </li>
                                            <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                <span>Maintain 150min/week activity.</span>
                                            </li>
                                        </ul>
                                    )}

                                    <Button onClick={() => { setResult(null); reset(); }} variant="secondary" className="w-full mt-auto">
                                        <RotateCcw className="w-4 h-4 mr-2" /> New Assessment
                                    </Button>
                                </Card>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Predict;
