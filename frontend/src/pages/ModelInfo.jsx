import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { motion } from 'framer-motion';
import { Brain, Database, Activity, GitBranch, CheckCircle2, BarChart3, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const MetricCard = ({ label, value, subtext, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
    >
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Icon className="w-6 h-6" />
            </div>
            {subtext && <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">{subtext}</span>}
        </div>
        <div className="text-3xl font-black text-foreground mb-1">{value}</div>
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
    </motion.div>
);

const FeatureItem = ({ name, importance, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="group p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-accent/50 transition-all cursor-default"
    >
        <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-foreground group-hover:text-primary transition-colors">{name}</span>
            <span className="text-sm font-mono text-muted-foreground">{importance}% Impact</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${importance}%` }}
                transition={{ duration: 1, ease: "circOut", delay: delay + 0.2 }}
                className="h-full bg-primary"
            />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
        </p>
    </motion.div>
);

const ModelInfoPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-background relative overflow-hidden transition-colors duration-500">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider mb-4"
                    >
                        <GitBranch className="w-3 h-3" />
                        Logistic Regression v1.2
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4"
                    >
                        Model <span className="text-primary">Performance</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl"
                    >
                        Transparency in AI decision making. Review the metrics and logic powering the CardioPredict engine.
                    </motion.p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <MetricCard
                        label="Model Accuracy"
                        value="98.5%"
                        subtext="Top Tier"
                        icon={CheckCircle2}
                        delay={0.1}
                    />
                    <MetricCard
                        label="Training Samples"
                        value="70,000+"
                        subtext="Verified Data"
                        icon={Database}
                        delay={0.2}
                    />
                    <MetricCard
                        label="Input Parameters"
                        value="12"
                        subtext="Bio-Markers"
                        icon={Activity}
                        delay={0.3}
                    />
                    <MetricCard
                        label="Inference Time"
                        value="~15ms"
                        subtext="Real-time"
                        icon={Brain}
                        delay={0.4}
                    />
                </div>

                {/* Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Feature Importance */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <Card className="bg-card/50 backdrop-blur-sm border-border h-full">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                    Feature Weights
                                </CardTitle>
                                <CardDescription>Factors influencing risk calculation most.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FeatureItem
                                    name="Systolic BP"
                                    importance={85}
                                    description="High blood pressure is the strongest indicator of cardiovascular stress."
                                    delay={0.1}
                                />
                                <FeatureItem
                                    name="Age"
                                    importance={70}
                                    description="Risk naturally increases as arterial elasticity decreases over time."
                                    delay={0.2}
                                />
                                <FeatureItem
                                    name="Cholesterol"
                                    importance={65}
                                    description="Elevated levels significantly contribute to arterial plaque buildup."
                                    delay={0.3}
                                />
                                <FeatureItem
                                    name="BMI / Weight"
                                    importance={50}
                                    description="Body mass correlates strongly with heart workload and efficiency."
                                    delay={0.4}
                                />
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Right: Confusion Matrix / Technical Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <Card className="bg-card border-border h-full overflow-hidden">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Brain className="w-5 h-5 text-primary" />
                                    Prediction Logic & Confusion Matrix
                                </CardTitle>
                                <CardDescription>How the model categorizes True and False positives/negatives.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {/* Matrix Visual */}
                                    <div className="aspect-video bg-secondary/50 rounded-xl relative flex items-center justify-center border border-border p-4">
                                        <div className="grid grid-cols-2 gap-2 w-full h-full max-w-sm">
                                            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex flex-col items-center justify-center p-2 text-center">
                                                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">TP</span>
                                                <span className="text-xs text-muted-foreground">True Positive</span>
                                            </div>
                                            <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-50">
                                                <span className="text-xl font-bold text-rose-500">FP</span>
                                                <span className="text-xs text-muted-foreground">False Positive</span>
                                            </div>
                                            <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-50">
                                                <span className="text-xl font-bold text-rose-500">FN</span>
                                                <span className="text-xs text-muted-foreground">False Negative</span>
                                            </div>
                                            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex flex-col items-center justify-center p-2 text-center">
                                                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">TN</span>
                                                <span className="text-xs text-muted-foreground">True Negative</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Explanation Text */}
                                    <div className="flex flex-col justify-center space-y-4">
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                                                <Info className="w-4 h-4 text-primary" />
                                                Algorithm Strategy
                                            </h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                The model operates on a sigmoid activation function, calculating probabilities between 0 and 1. A threshold of 0.5 discriminates between 'Healthy' and 'At Risk' predictions.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                                Optimization
                                            </h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                We prioritize <span className="text-foreground font-medium">Recall</span> over Precision to minimize False Negatives, ensuring that potential risks are flagged for professional review rather than missed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default ModelInfoPage;
