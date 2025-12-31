import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { predictRisk } from '@/lib/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckCircle2, AlertTriangle, ArrowRight, ClipboardList, Thermometer, User, Cigarette, Wine, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';
import ErrorBoundary from '@/components/ErrorBoundary';

const PredictPage = () => {
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        weight: '',
        gender: '1',
        ap_hi: '',
        ap_lo: '',
        cholesterol: '1',
        gluc: '1',
        smoke: false,
        alco: false,
        active: false
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
                gender: parseInt(formData.gender),
                ap_hi: parseInt(formData.ap_hi),
                ap_lo: parseInt(formData.ap_lo),
                cholesterol: parseInt(formData.cholesterol),
                gluc: parseInt(formData.gluc),
                smoke: formData.smoke ? 1 : 0,
                alco: formData.alco ? 1 : 0,
                active: formData.active ? 1 : 0
            };

            const response = await predictRisk(data);
            setResult(response);

            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

        } catch (error) {
            console.error("Prediction error:", error);
            toast.error(error.message || "Failed to generate prediction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 relative overflow-hidden bg-background transition-colors duration-500">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shadow-sm mb-4">
                            <Activity className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">AI-Powered Assessment</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
                            Personal Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500 text-glow">Scanner</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Input your biometric data below. Our advanced neural network will analyze risk factors in real-time.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <Card className="glass-panel border-border relative overflow-hidden bg-card/50">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-indigo-600" />
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-foreground">
                                            <ClipboardList className="w-6 h-6 text-primary" />
                                            Patient Data
                                        </CardTitle>
                                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                                            Secured & Encrypted
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-8 p-6 md:p-8">
                                    <form onSubmit={handleSubmit} className="space-y-10">

                                        {/* Section 1: Vitals */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
                                                    <Thermometer className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-xl font-bold text-foreground">Physical Vitals</h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">Gender</label>
                                                    <Select
                                                        name="gender"
                                                        value={formData.gender}
                                                        onChange={handleChange}
                                                        options={[
                                                            { value: '1', label: 'Female' },
                                                            { value: '2', label: 'Male' }
                                                        ]}
                                                        className="bg-background border-input text-foreground h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">Age (Years)</label>
                                                    <Input
                                                        type="number"
                                                        name="age"
                                                        placeholder="e.g. 45"
                                                        value={formData.age}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-background border-input text-foreground h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">Height (cm)</label>
                                                    <Input
                                                        type="number"
                                                        name="height"
                                                        placeholder="e.g. 175"
                                                        value={formData.height}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-background border-input text-foreground h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">Weight (kg)</label>
                                                    <Input
                                                        type="number"
                                                        name="weight"
                                                        placeholder="e.g. 70"
                                                        value={formData.weight}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-background border-input text-foreground h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">Systolic BP</label>
                                                    <Input
                                                        type="number"
                                                        name="ap_hi"
                                                        placeholder="e.g. 120"
                                                        value={formData.ap_hi}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-background border-input text-foreground h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">Diastolic BP</label>
                                                    <Input
                                                        type="number"
                                                        name="ap_lo"
                                                        placeholder="e.g. 80"
                                                        value={formData.ap_lo}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-background border-input text-foreground h-12"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 2: Lab Results */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 border border-purple-500/20">
                                                    <Activity className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-xl font-bold text-foreground">Lab Results</h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-sm font-semibold text-muted-foreground">Cholesterol Level</label>
                                                    <Select
                                                        name="cholesterol"
                                                        value={formData.cholesterol}
                                                        onChange={handleChange}
                                                        options={[
                                                            { value: '1', label: 'Normal' },
                                                            { value: '2', label: 'Above Normal' },
                                                            { value: '3', label: 'Well Above Normal' }
                                                        ]}
                                                        className="bg-background border-input text-foreground h-12"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-sm font-semibold text-muted-foreground">Glucose Level</label>
                                                    <Select
                                                        name="gluc"
                                                        value={formData.gluc}
                                                        onChange={handleChange}
                                                        options={[
                                                            { value: '1', label: 'Normal' },
                                                            { value: '2', label: 'Above Normal' },
                                                            { value: '3', label: 'Well Above Normal' }
                                                        ]}
                                                        className="bg-background border-input text-foreground h-12"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 3: Lifestyle */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 border border-emerald-500/20">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-xl font-bold text-foreground">Lifestyle Factors</h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <motion.button
                                                    whileTap={{ scale: 0.98 }}
                                                    type="button"
                                                    onClick={() => toggleCheckbox('smoke')}
                                                    className={cn(
                                                        "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all h-32",
                                                        formData.smoke
                                                            ? "bg-rose-500/10 border-rose-500/50 text-rose-500 shadow-sm"
                                                            : "bg-background border-border text-muted-foreground hover:border-primary/50"
                                                    )}
                                                >
                                                    <Cigarette className="w-8 h-8 mb-2" />
                                                    <span className="font-semibold">Smoker</span>
                                                </motion.button>

                                                <motion.button
                                                    whileTap={{ scale: 0.98 }}
                                                    type="button"
                                                    onClick={() => toggleCheckbox('alco')}
                                                    className={cn(
                                                        "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all h-32",
                                                        formData.alco
                                                            ? "bg-amber-500/10 border-amber-500/50 text-amber-500 shadow-sm"
                                                            : "bg-background border-border text-muted-foreground hover:border-primary/50"
                                                    )}
                                                >
                                                    <Wine className="w-8 h-8 mb-2" />
                                                    <span className="font-semibold">Alcohol</span>
                                                </motion.button>

                                                <motion.button
                                                    whileTap={{ scale: 0.98 }}
                                                    type="button"
                                                    onClick={() => toggleCheckbox('active')}
                                                    className={cn(
                                                        "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all h-32",
                                                        formData.active
                                                            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-500 shadow-sm"
                                                            : "bg-background border-border text-muted-foreground hover:border-primary/50"
                                                    )}
                                                >
                                                    <Dumbbell className="w-8 h-8 mb-2" />
                                                    <span className="font-semibold">Physically Active</span>
                                                </motion.button>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className={cn(
                                                "w-full h-16 text-lg font-bold rounded-xl transition-all relative overflow-hidden",
                                                loading
                                                    ? "bg-muted cursor-not-allowed text-muted-foreground"
                                                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/30"
                                            )}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {loading ? (
                                                    <><Activity className="w-5 h-5 animate-spin" /> Analyzing...</>
                                                ) : (
                                                    <>Start Analysis <ArrowRight className="w-5 h-5" /></>
                                                )}
                                            </span>
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Results Section - Conditionally Rendered */}
                        <motion.div
                            className="lg:col-span-1"
                            animate={{ opacity: result ? 1 : 0.5, filter: result ? 'blur(0px)' : 'blur(2px)' }}
                        >
                            <div ref={resultRef}>
                                {result ? (
                                    <div className="sticky top-24 space-y-6">
                                        <Card className={cn(
                                            "border-0 overflow-hidden relative shadow-2xl glass-panel",
                                            result.risk ? "bg-rose-500/10 border-rose-500/30" : "bg-emerald-500/10 border-emerald-500/30"
                                        )}>
                                            <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-transparent pointer-events-none" />
                                            <CardHeader className="text-center pb-2">
                                                <div className={cn(
                                                    "w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 shadow-lg",
                                                    result.risk
                                                        ? "bg-rose-500/20 text-rose-500 ring-2 ring-rose-500/50 animate-pulse-glow"
                                                        : "bg-emerald-500/20 text-emerald-500 ring-2 ring-emerald-500/50"
                                                )}>
                                                    {result.risk ? <AlertTriangle className="w-10 h-10" /> : <CheckCircle2 className="w-10 h-10" />}
                                                </div>
                                                <CardTitle className={cn("text-3xl font-black", result.risk ? "text-rose-500" : "text-emerald-500")}>
                                                    {result.risk ? "High Risk Detected" : "Low Risk Detected"}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="text-center space-y-6">
                                                <div className="space-y-2">
                                                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Confidence Score</div>
                                                    <div className="text-6xl font-black text-foreground tracking-tight">
                                                        {(result.probability * 100).toFixed(1)}%
                                                    </div>
                                                </div>

                                                <div className="p-4 rounded-xl bg-card border border-border text-left text-sm text-foreground">
                                                    <h4 className="font-bold mb-2 flex items-center gap-2">
                                                        <Activity className="w-4 h-4" /> Recommendation:
                                                    </h4>
                                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                                        {result.risk ? (
                                                            <>
                                                                <li>Consult a cardiologist immediately.</li>
                                                                <li>Monitor blood pressure daily.</li>
                                                                <li>Review lifestyle factors (Diet/Exercise).</li>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <li>Maintain current healthy lifestyle.</li>
                                                                <li>Regular annual checkups.</li>
                                                                <li>Stay hydrated and active.</li>
                                                            </>
                                                        )}
                                                    </ul>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ) : (
                                    <div className="sticky top-24">
                                        <div className="glass-panel p-8 rounded-3xl border border-white/5 text-center py-20 bg-card/50">
                                            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                                                <Activity className="w-8 h-8 text-muted-foreground" />
                                            </div>
                                            <h3 className="text-xl font-bold text-muted-foreground mb-2">Awaiting Data</h3>
                                            <p className="text-muted-foreground">Complete the form to initiate the analysis engine.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default PredictPage;
