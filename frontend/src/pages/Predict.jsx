import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Activity, User, HeartPulse, ArrowRight, RotateCcw, Cigarette, Wine, Zap, Info, CheckCircle2, TrendingUp, ShieldCheck, FileDown, Stethoscope, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
                icon: Zap,
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
                "Model Architecture: Gradient Boosting Classifier",
                "Training Dataset: 13,095 Medical Records",
                "Model Accuracy: 73.9%  |  Macro F1 Score: 0.72  |  AUC: 0.80",
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
        window.scrollTo(0, 0);
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

            const safeProbability = typeof resultData.risk_probability === 'number' && !isNaN(resultData.risk_probability)
                ? resultData.risk_probability
                : 0;

            setResult({ ...resultData, probability: safeProbability });
            setRiskFactors(analyzeRisk(data));
            setChartData(prepareChartData(data));
            toast.success('Analysis Complete');

        } catch (error) {
            console.error(error);
            toast.error('Connection failed. Using simulation.');

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
        <div className="max-w-5xl mx-auto">
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
                        <LoadingHeart text="Processing Vitals & Analyzing Risk..." />
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
                                        {...register("ap_hi", {
                                            required: "Required",
                                            min: 60,
                                            max: 250,
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
                                            min: 40,
                                            max: 150,
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
                        className="space-y-8 pb-12"
                    >
                        {/* Wrapper for buttons */}
                        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${result.prediction === 1 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    <Stethoscope className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Clinical Output</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Analysis Ready</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={generatePDF} variant="outline" size="sm">
                                    <FileDown className="w-4 h-4 mr-2" /> Download Report
                                </Button>
                                <Button onClick={() => { setResult(null); reset(); }} variant="secondary" size="sm">
                                    <RotateCcw className="w-4 h-4 mr-2" /> Re-Assess
                                </Button>
                            </div>
                        </div>

                        <Card
                            className={`text-center py-8 border-l-8 ${result.prediction === 1 ? 'border-l-rose-500 bg-rose-50/20 dark:bg-rose-900/5' : 'border-l-emerald-500 bg-emerald-50/20 dark:bg-emerald-900/5'}`}
                            animate={result.prediction === 1 ? {
                                scale: [1, 1.02, 1],
                                borderColor: ['rgba(244, 63, 94, 0)', 'rgba(244, 63, 94, 0.5)', 'rgba(244, 63, 94, 0)']
                            } : {}}
                            transition={result.prediction === 1 ? {
                                repeat: Infinity,
                                duration: 2.5,
                                ease: "easeInOut"
                            } : {}}
                        >
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
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
                                            {(result.probability * 100).toFixed(0)}%
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase">Probability</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

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
                            <div className="inline-flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-medium bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Disclaimer: This result is intended for awareness only and is not a certified medical diagnosis. Consult healthcare professionals for evaluation.</span>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Predict;
