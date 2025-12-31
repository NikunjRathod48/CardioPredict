import React, { useState } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden transition-colors duration-500">

            {/* Split Layout */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Side: Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                            <MessageSquare className="w-4 h-4" /> Get in Touch
                        </div>
                        <h1 className="text-5xl font-black text-foreground mb-4">
                            We'd love to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">hear from you.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                            Have questions about the model? Want to contribute to the research? Drop us a line.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                            <div className="p-3 bg-secondary rounded-lg text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">Email Us</h3>
                                <p className="text-muted-foreground">research@cardiopredict.edu</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                            <div className="p-3 bg-secondary rounded-lg text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">Campus Lab</h3>
                                <p className="text-muted-foreground">Engineering Block C, Room 404</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-card border-border shadow-xl p-8 md:p-10 relative overflow-hidden">
                        {/* Decorative Gradient Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-indigo-500" />

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">First Name</label>
                                    <Input placeholder="Jane" className="bg-background border-input text-foreground h-12" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Last Name</label>
                                    <Input placeholder="Doe" className="bg-background border-input text-foreground h-12" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Email Address</label>
                                <Input type="email" placeholder="jane@example.com" className="bg-background border-input text-foreground h-12" required />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Message</label>
                                <Textarea
                                    placeholder="Tell us what you think..."
                                    className="bg-background border-input text-foreground min-h-[150px] resize-none"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 text-lg font-bold rounded-xl"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : (
                                    <span className="flex items-center gap-2">Send Message <Send className="w-4 h-4" /></span>
                                )}
                            </Button>
                        </form>
                    </Card>
                </motion.div>

            </div>
        </div>
    );
};

export default ContactPage;
