import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Stethoscope, Activity, FileDown, RotateCcw, ShieldCheck, CheckCircle2, TrendingUp, AlertTriangle, ArrowRight, Cigarette, Wine, User, HeartPulse, Dumbbell } from 'lucide-react';
import { IoMale, IoFemale } from "react-icons/io5";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import confetti from 'canvas-confetti';
import CountUp from 'react-countup';

import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import LoadingHeart from '@/components/ui/LoadingHeart';
import IconCheckbox from '@/components/ui/IconCheckbox';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700">
                <p className="font-bold text-slate-700 dark:text-slate-200 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm font-medium">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill }}></span>
                        <span style={{ color: entry.fill }}>
                            {entry.name}: {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};



const Predict = () => {
    const { register, handleSubmit, control, formState: { errors }, reset, getValues, watch } = useForm({
        mode: 'onChange', // Real-time validation
        defaultValues: {
            active: '0',
            smoke: '0',
            alco: '0'
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [riskFactors, setRiskFactors] = useState([]);
    const [chartData, setChartData] = useState([]);

    // Animation controls for High Risk
    const shakeControls = useAnimation();
    const pulseControls = useAnimation();

    // Effect for Results (Confetti for Low Risk, Shake/Pulse for High Risk)
    React.useEffect(() => {
        if (!result) return;

        if (result.prediction === 0) {
            // Low Risk Confetti
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);
                const particleCount = 50 * (timeLeft / duration);

                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);
        } else {
            // High Risk Animations
            const sequence = async () => {
                // Initial Attention Shake
                await shakeControls.start({
                    x: [0, -10, 10, -10, 10, 0],
                    transition: { duration: 0.4 }
                });
                // Continuous Pulse
                pulseControls.start({
                    boxShadow: [
                        "0 0 0 0 rgba(225, 29, 72, 0)",
                        "0 0 0 10px rgba(225, 29, 72, 0.1)",
                        "0 0 0 0 rgba(225, 29, 72, 0)"
                    ],
                    transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop"
                    }
                });
            };
            sequence();

            // High Risk "Embers" Particle Effect
            const duration = 4 * 1000; // Increased to 4s to match animation
            const animationEnd = Date.now() + duration;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                // Left side embers
                confetti({
                    particleCount: 3, // Increased count
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 }, // Start a bit lower
                    colors: ['#dc2626', '#ea580c', '#7f1d1d'], // Added darker red
                    shapes: ['square'], // Ashes/Embers look
                    gravity: 0.6,
                    scalar: 1.2,
                    drift: 0.5,
                    ticks: 300
                });
                // Right side embers
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.7 },
                    colors: ['#dc2626', '#ea580c', '#7f1d1d'],
                    shapes: ['square'],
                    gravity: 0.6,
                    scalar: 1.2,
                    drift: -0.5,
                    ticks: 300
                });
            }, 150); // Slightly faster emission
        }
    }, [result, shakeControls, pulseControls]);

    const calculateBMI = (weight, height) => {
        const heightM = height / 100;
        return (weight / (heightM * heightM)).toFixed(1);
    };

    const analyzeRisk = (data) => {
        const factors = [];
        const systolic = parseInt(data.ap_hi);
        const diastolic = parseInt(data.ap_lo);
        const bmi = calculateBMI(data.weight, data.height);
        const cholesterol = parseInt(data.cholesterol);
        const active = parseInt(data.active);
        const smoke = parseInt(data.smoke);
        const alco = parseInt(data.alco);

        // Logic for "Why This Decision?"
        if (systolic > 130 || diastolic > 85) {
            factors.push({
                icon: HeartPulse,
                color: "text-rose-500",
                title: "Elevated Blood Pressure",
                advice: "Significantly increases heart workload and arterial strain."
            });
        }
        if (bmi > 25) {
            factors.push({
                icon: User,
                color: "text-orange-500",
                title: `BMI Indicator (${bmi})`,
                advice: "Indicates potential metabolic stress on the cardiovascular system."
            });
        }
        if (cholesterol > 1) {
            factors.push({
                icon: Activity,
                color: "text-amber-500",
                title: "Cholesterol Levels",
                advice: "Higher levels contribute to plaque buildup and arterial narrowing."
            });
        }
        if (smoke === 1) {
            factors.push({
                icon: Cigarette,
                color: "text-gray-500",
                title: "Smoking History",
                advice: "Major vasoconstrictor that immediately impacts heart function."
            });
        }
        if (alco === 1) {
            factors.push({
                icon: Wine,
                color: "text-purple-500",
                title: "Alcohol Consumption",
                advice: "Can lead to irregular heart rhythms and increased pressure."
            });
        }
        if (active === 0) {
            factors.push({
                icon: Dumbbell,
                color: "text-blue-500",
                title: "Low Physical Activity",
                advice: "Sedentary habits are a primary driver of cardiovascular decline."
            });
        }

        if (factors.length === 0) {
            factors.push({
                icon: CheckCircle2,
                color: "text-emerald-500",
                title: "Optimal Vital Signs",
                advice: "Normal blood pressure aligns with healthy cardiovascular performance."
            });
            factors.push({
                icon: User,
                color: "text-emerald-500",
                title: "Healthy Weight Profile",
                advice: "Maintained BMI supports efficient heart function and metabolism."
            });
            factors.push({
                icon: Activity,
                color: "text-emerald-500",
                title: "Good Cholesterol Range",
                advice: "Lowers the risk of arterial blockages and stroke."
            });
        }

        return factors.slice(0, 3); // Top 3 factors
    };

    const prepareChartData = (data) => {
        return [
            {
                name: 'Systolic BP',
                User: parseInt(data.ap_hi),
                Healthy: 120,
            },
            {
                name: 'Diastolic BP',
                User: parseInt(data.ap_lo),
                Healthy: 80,
            },
            {
                name: 'BMI',
                User: parseFloat(calculateBMI(data.weight, data.height)),
                Healthy: 22,
            }
        ];
    };

    const getConfidenceLevel = (prob) => {
        if (prob >= 0.85) return { label: 'High Confidence', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400', val: 'High' };
        if (prob >= 0.60) return { label: 'Moderate Confidence', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400', val: 'Moderate' };
        return { label: 'Low Confidence', color: 'text-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-slate-400', val: 'Low' };
    };

    const generatePDF = () => {
        if (!result) return;
        const toastId = toast.loading("Generating PDF Report...");

        try {
            const doc = new jsPDF();
            const colors = {
                teal: '#0d9488',
                tealLight: '#f0fdfa',
                slate: '#334155',
                rose: '#e11d48',
                roseLight: '#fff1f2',
                text: '#1e293b',
                white: '#ffffff',
                grey: '#94a3b8'
            };

            // 1. Header
            doc.setFillColor(colors.teal);
            doc.rect(0, 0, 210, 20, 'F');

            doc.setFontSize(18);
            doc.setTextColor(colors.white);
            doc.setFont("helvetica", "bold");
            doc.text("CardioPredict", 14, 13);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text("Cardiovascular Risk Analysis Report", 200, 13, { align: "right" });

            // 2. Report Details
            const reportDate = new Date().toLocaleString();
            const reportId = "RPT-" + Math.floor(100000 + Math.random() * 900000);

            doc.setTextColor(colors.slate);
            doc.setFontSize(10);
            doc.text(`Report ID: ${reportId}`, 14, 30);
            doc.text(`Date: ${reportDate}`, 200, 30, { align: "right" });

            // 3. Patient Summary
            const isRisk = result.prediction === 1;
            const summaryColor = isRisk ? colors.roseLight : colors.tealLight;
            const summaryBorder = isRisk ? colors.rose : colors.teal;

            doc.setFillColor(summaryColor);
            doc.setDrawColor(summaryBorder);
            doc.roundedRect(14, 35, 182, 40, 3, 3, 'FD');

            doc.setFontSize(14);
            doc.setTextColor(colors.text);
            doc.setFont("helvetica", "bold");
            doc.text("Clinical Assessment Summary", 20, 48);

            doc.setFontSize(12);
            doc.setTextColor(isRisk ? colors.rose : colors.teal);
            doc.text(isRisk ? "ELEVATED RISK DETECTED" : "LOW RISK PROFILE", 20, 58);

            doc.setFontSize(10);
            doc.setTextColor(colors.text);
            doc.setFont("helvetica", "normal");
            doc.text(`Probability: ${(result.probability * 100).toFixed(1)}%`, 100, 58);
            doc.text(`Confidence: ${getConfidenceLevel(result.probability).val}`, 150, 58);

            doc.text(isRisk
                ? "Interpretation: Indicators suggest elevated cardiovascular stress. Immediate attention advised."
                : "Interpretation: Vitals align with healthy benchmarks. Maintain current lifestyle.",
                20, 68);

            // 4. Clinical Benchmarks (Table)
            doc.setFontSize(12);
            doc.setTextColor(colors.slate);
            doc.setFont("helvetica", "bold");
            doc.text("Vitals & Benchmarks", 14, 90);

            autoTable(doc, {
                startY: 95,
                head: [['Metric', 'Your Value', 'Reference', 'Status']],
                body: [
                    ['Systolic BP', chartData[0]?.User || '-', '90 - 120 mmHg', chartData[0]?.User > 120 ? 'Elevated' : 'Normal'],
                    ['Diastolic BP', chartData[1]?.User || '-', '60 - 80 mmHg', chartData[1]?.User > 80 ? 'Elevated' : 'Normal'],
                    ['BMI Index', chartData[2]?.User || '-', '18.5 - 24.9', chartData[2]?.User > 25 ? 'Overweight' : 'Healthy'],
                ],
                theme: 'grid',
                headStyles: { fillColor: colors.teal, textColor: colors.white },
                styles: { fontSize: 10, textColor: colors.text },
                alternateRowStyles: { fillColor: colors.tealLight }
            });

            // 5. Risk Factors / Contributors
            const currentY = doc.lastAutoTable.finalY + 15;
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(isRisk ? "Primary Risk Contributors" : "Health Indicators", 14, currentY);

            // Manual list drawing
            let listY = currentY + 8;
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");

            if (riskFactors.length > 0) {
                riskFactors.forEach((factor) => {
                    doc.setFillColor(isRisk ? colors.rose : colors.teal);
                    doc.circle(18, listY - 1, 1.5, 'F'); // Bullet
                    doc.text(`${factor.title}: ${factor.advice}`, 24, listY);
                    listY += 7;
                });
            } else {
                doc.text("No specific risk factors flagged.", 24, listY);
            }

            // 6. Model & Technical Info
            const modelY = listY + 10;
            doc.setDrawColor(colors.grey);
            doc.setLineWidth(0.1);
            doc.line(14, modelY, 196, modelY);

            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text("Model Analysis Details", 14, modelY + 10);

            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(colors.slate);
            doc.text([
                "Model Architecture: XGBoost Classifier",
                "Training Dataset: 13,742 Medical Records",
                "Model Accuracy: 74.0%  |  Macro F1 Score: 0.74  |  AUC: 0.804",
                "Top Predictors: Systolic BP, Age, Cholesterol"
            ], 14, modelY + 20);

            // 7. Clinical Recommendations
            const recY = modelY + 45;
            doc.setFillColor(colors.tealLight);
            doc.roundedRect(14, recY, 182, 25, 3, 3, 'F');

            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(colors.teal);
            doc.text("Clinical Recommendation:", 20, recY + 8);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(colors.text);
            doc.text(isRisk
                ? "Medical consultation is strongly advised. Consider BP monitoring, lifestyle improvement, and professional evaluation."
                : "Maintain current lifestyle, routine activity, balanced diet, and periodic health screening.",
                20, recY + 16);

            // 8. Disclaimer & Footer
            const pageHeight = doc.internal.pageSize.height;
            doc.setFontSize(8);
            doc.setTextColor(colors.grey);
            doc.text("Disclaimer: This report is generated by an AI-based risk prediction system for awareness and decision-support purposes only.", 105, pageHeight - 15, { align: "center" });
            doc.text("It is not a certified medical diagnosis. Consult a qualified healthcare professional for medical advice.", 105, pageHeight - 11, { align: "center" });

            doc.text("© 2025 CardioPredict System • Powered by Machine Learning Intelligence", 105, pageHeight - 5, { align: "center" });

            doc.save(`CardioPredict_Report_${reportId}.pdf`);
            toast.success("Report downloaded successfully", { id: toastId });

        } catch (error) {
            console.error("PDF Generation Error", error);
            toast.error("Failed to generate PDF", { id: toastId });
        }
    };

    const onSubmit = async (data) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsLoading(true);
        setResult(null);

        const payload = {
            age_years: parseInt(data.age) || 0,
            gender: parseInt(data.sex) || 1,
            height: parseInt(data.height) || 0,
            weight: parseInt(data.weight) || 0,
            ap_hi: parseInt(data.ap_hi) || 0,
            ap_lo: parseInt(data.ap_lo) || 0,
            cholesterol: parseInt(data.cholesterol) || 1,
            gluc: parseInt(data.gluc) || 1,
            smoke: parseInt(data.smoke) || 0,
            alco: parseInt(data.alco) || 0,
            active: parseInt(data.active) || 0
        };

        try {
            // Use localhost for local development, or update to your deployed URL
            const response = await fetch('https://cardiopredict-api.up.railway.app//predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Prediction service unavailable');
            const resultData = await response.json();

            // Wait for animation
            await new Promise(resolve => setTimeout(resolve, 2000));

            const safeProbability = typeof resultData.risk_probability === 'number' && !isNaN(resultData.risk_probability)
                ? resultData.risk_probability / 100 // Convert percentage to 0-1
                : 0;

            setResult({ ...resultData, probability: safeProbability });
            setRiskFactors(analyzeRisk(data));
            setChartData(prepareChartData(data));
            toast.success('Analysis Complete');

        } catch (error) {
            console.error("Prediction Error:", error);
            toast.error(`Connection Error: ${error.message}. Is backend running?`);

            await new Promise(resolve => setTimeout(resolve, 2000));
            const isHighRisk = Math.random() > 0.5;
            const mockProbability = isHighRisk ? 0.78 : 0.12;
            setResult({
                prediction: isHighRisk ? 1 : 0,
                probability: mockProbability
            });
            setRiskFactors(analyzeRisk(data));
            setChartData(prepareChartData(data));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        Enter patient vitals below. Our model analyzes key health indicators to estimate heart disease risk with 74% accuracy.
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
                        <LoadingHeart text="Processing Vitals & Analyzing Risk..." />
                    </motion.div>
                ) : !result ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card className="p-6 md:p-8 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 shadow-xl border-slate-200/50 dark:border-slate-800/50">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                {/* Section 1: Demographics & Physical */}
                                <section>
                                    <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                                        <User className="w-5 h-5 text-teal-500" /> Patient Demographics
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <Input
                                            label="Age"
                                            type="number"
                                            placeholder="50"
                                            {...register("age", {
                                                required: "Required",
                                                min: { value: 18, message: "Min age 18" },
                                                max: { value: 100, message: "Max age 100" }
                                            })}
                                            error={errors.age?.message} />
                                        <Controller
                                            name="sex"
                                            control={control}
                                            rules={{ required: "Required" }}
                                            render={({ field }) => (
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-semibold text-foreground ml-1">Gender</label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {[
                                                            { label: 'Male', value: '2', icon: IoMale },
                                                            { label: 'Female', value: '1', icon: IoFemale }
                                                        ].map((option) => {
                                                            const isSelected = field.value === option.value;
                                                            return (
                                                                <button
                                                                    key={option.value}
                                                                    type="button"
                                                                    onClick={() => field.onChange(option.value)}
                                                                    className={`
                                                                        relative w-full p-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 group
                                                                        ${isSelected
                                                                            ? 'border-primary bg-primary/10 shadow-md shadow-primary/5'
                                                                            : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-primary/50'
                                                                        }
                                                                    `}
                                                                >
                                                                    <div className={`
                                                                        absolute top-2 right-2 w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                                                                        ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-slate-300 dark:border-slate-600 bg-transparent'}
                                                                    `}>
                                                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                                    </div>

                                                                    <div className={`
                                                                        w-10 h-10 rounded-full flex items-center justify-center transition-colors
                                                                        ${isSelected
                                                                            ? 'bg-primary/20 text-primary'
                                                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary'
                                                                        }
                                                                    `}>
                                                                        <option.icon className="w-5 h-5" />
                                                                    </div>

                                                                    <span className={`
                                                                        font-bold text-xs transition-colors
                                                                        ${isSelected ? 'text-primary' : 'text-slate-600 dark:text-slate-400 group-hover:text-foreground'}
                                                                    `}>
                                                                        {option.label}
                                                                    </span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    {errors.sex && (
                                                        <p className="text-xs text-destructive font-medium ml-1 animate-fadeInUp">
                                                            {errors.sex.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                        <Input
                                            label="Height (cm)"
                                            type="number"
                                            placeholder="170"
                                            {...register("height", { required: "Required", min: 50, max: 250 })}
                                            error={errors.height?.message}
                                        />
                                        <Input
                                            label="Weight (kg)"
                                            type="number"
                                            placeholder="70"
                                            {...register("weight", {
                                                required: "Required",
                                                min: { value: 30, message: "Min 30kg" },
                                                max: { value: 200, message: "Max 200kg" }
                                            })}
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
                                            {...register("ap_hi", {
                                                required: "Required",
                                                min: { value: 60, message: "Min 60" },
                                                max: { value: 250, message: "Max 250" },
                                                validate: (value) => {
                                                    const lo = getValues("ap_lo");
                                                    if (lo && parseInt(value) <= parseInt(lo)) {
                                                        return "Systolic must be higher";
                                                    }
                                                    return true;
                                                }
                                            })}
                                            error={errors.ap_hi?.message}
                                        />
                                        <Input
                                            label="Diastolic BP (ap_lo)"
                                            type="number"
                                            placeholder="80"
                                            helperText="Normal: 60-80 mmHg"
                                            {...register("ap_lo", {
                                                required: "Required",
                                                min: { value: 40, message: "Min 40" },
                                                max: { value: 150, message: "Max 150" },
                                                validate: (value) => {
                                                    const hi = getValues("ap_hi");
                                                    if (hi && parseInt(value) >= parseInt(hi)) {
                                                        return "Diastolic must be lower";
                                                    }
                                                    return true;
                                                }
                                            })}
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
                                        <Controller
                                            name="cholesterol"
                                            control={control}
                                            rules={{ required: "Required" }}
                                            render={({ field }) => (
                                                <Select
                                                    label="Cholesterol Level"
                                                    options={[
                                                        { label: 'Normal', value: '1' },
                                                        { label: 'Above Normal', value: '2' },
                                                        { label: 'High', value: '3' },
                                                    ]}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    error={errors.cholesterol?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="gluc"
                                            control={control}
                                            rules={{ required: "Required" }}
                                            render={({ field }) => (
                                                <Select
                                                    label="Glucose Level"
                                                    options={[
                                                        { label: 'Normal', value: '1' },
                                                        { label: 'Above Normal', value: '2' },
                                                        { label: 'High', value: '3' },
                                                    ]}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    error={errors.gluc?.message}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Controller
                                            name="active"
                                            control={control}
                                            render={({ field }) => (
                                                <IconCheckbox
                                                    label="Physical Active"
                                                    icon={Dumbbell}
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
                                    <Button type="submit" size="lg" className="w-full shadow-xl shadow-teal-900/10 dark:shadow-teal-900/40 relative overflow-hidden group">
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-200%]"
                                            animate={{ translateX: ['-200%', '200%'] }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 2,
                                                repeatDelay: 1,
                                                ease: "linear"
                                            }}
                                        />
                                        <span className="relative z-10 flex items-center justify-center">
                                            Generate Risk Analysis <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                    <p className="text-center text-xs text-slate-400 mt-4">
                                        AI predictions are estimates and do not replace professional diagnosis.
                                    </p>
                                </div>
                            </form>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8 pb-12"
                    >
                        {/* Wrapper for buttons */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className={`p-2 rounded-lg ${result.prediction === 1 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    <Stethoscope className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Clinical Output</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Analysis Ready</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <Button onClick={generatePDF} variant="outline" size="sm" className="w-full md:w-auto justify-center">
                                    <FileDown className="w-4 h-4 mr-2" /> Download Report
                                </Button>
                                <Button onClick={() => { setResult(null); reset(); }} variant="secondary" size="sm" className="w-full md:w-auto justify-center">
                                    <RotateCcw className="w-4 h-4 mr-2" /> Re-Assess
                                </Button>
                            </div>
                        </div>

                        <motion.div
                            animate={result.prediction === 1 ? shakeControls : {}}
                            style={{ position: 'relative' }} // For pulse overlay
                        >
                            {/* High Risk Pulse Overlay */}
                            {result.prediction === 1 && (
                                <motion.div
                                    animate={pulseControls}
                                    className="absolute inset-0 rounded-2xl pointer-events-none"
                                />
                            )}

                            <Card
                                className={`text-center py-10 border-2 backdrop-blur-xl shadow-2xl transition-all duration-500
                                    ${result.prediction === 1
                                        ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20 shadow-rose-500/30'
                                        : 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 shadow-emerald-500/30'
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10">
                                    <div className="space-y-3 text-left max-w-lg">
                                        <p className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Diagnostic Indication</p>
                                        <h2 className={`text-4xl md:text-5xl font-display font-bold ${result.prediction === 1 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                            {result.prediction === 1 ? 'Elevated Risk Detected' : 'Low Risk Profile'}
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                            {result.prediction === 1
                                                ? "Clinical indicators suggest elevated cardiovascular stress. This warrants immediate attention to lifestyle factors and specific vitals."
                                                : "Your vitals presently align with healthy benchmarks. Maintaining your current lifestyle supports continued cardiovascular health."}
                                        </p>

                                        {/* Confidence Badge */}
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase mt-2 ${getConfidenceLevel(result.probability).color}`}>
                                            <ShieldCheck className="w-4 h-4" />
                                            Model Confidence: {getConfidenceLevel(result.probability).label}
                                        </div>
                                    </div>

                                    {/* Radial Gauge */}
                                    <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="none" className="text-slate-200 dark:text-slate-800" />
                                            <motion.circle
                                                cx="80" cy="80" r="70"
                                                stroke="currentColor" strokeWidth="10" fill="none"
                                                strokeLinecap="round"
                                                className={result.prediction === 1 ? 'text-rose-500' : 'text-emerald-500'}
                                                initial={{ strokeDasharray: 440, strokeDashoffset: 440 }}
                                                animate={{ strokeDashoffset: 440 - (440 * result.probability) }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </svg>
                                        <div className="absolute flex flex-col items-center">
                                            <span className={`text-3xl font-bold ${result.prediction === 1 ? 'text-rose-600 dark:text-white' : 'text-emerald-600 dark:text-white'}`}>
                                                <CountUp end={result.probability * 100} duration={2.5} suffix="%" />
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-bold uppercase">Probability</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Why This Decision / Risk Factors */}
                            <Card className="flex flex-col h-full">
                                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                                    <TrendingUp className="w-5 h-5 text-indigo-500" /> Why This Decision?
                                </h4>
                                <div className="space-y-4 flex-grow">
                                    {riskFactors.map((factor, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-slate-300 transition-colors"
                                        >
                                            <div className={`p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm ${factor.color}`}>
                                                <factor.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h5 className={`font-bold text-sm ${factor.color}`}>{factor.title}</h5>
                                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                                                    {factor.advice}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>

                            {/* Comparison Chart */}
                            <Card className="min-h-[400px] flex flex-col">
                                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                                    <Activity className="w-5 h-5 text-teal-500" /> Vitals vs. Healthy Benchmarks
                                </h4>
                                <div className="flex-grow w-full h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={chartData}
                                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.1} />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 12 }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 12 }}
                                            />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                            <Bar dataKey="User" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Your Value" />
                                            <Bar dataKey="Healthy" fill="#10b981" radius={[4, 4, 0, 0]} name="Healthy Benchmark" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-xs text-center text-slate-400 mt-4">
                                    Comparing your key health metrics against standard medical reference values.
                                </p>
                            </Card>
                        </div>

                        {/* Disclaimer Footer */}
                        <div className="pt-8 text-center border-t border-slate-100 dark:border-slate-800">
                            <div className="inline-flex flex-col md:flex-row items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-medium bg-slate-50 dark:bg-slate-900/50 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 max-w-full md:max-w-fit mx-auto">
                                <AlertTriangle className="w-5 h-5 shrink-0 mb-1 md:mb-0 text-amber-500/80" />
                                <span className="text-center md:text-left leading-relaxed">
                                    Disclaimer: This result is intended for awareness only and is not a certified medical diagnosis. Consult healthcare professionals for evaluation.
                                </span>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Predict;
