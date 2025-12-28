import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Message sent successfully! We'll get back to you soon.");
        e.target.reset();
        setLoading(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50 flex items-center justify-center py-20 px-4">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-primary-600 skew-y-3 origin-top-left -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-200/20 rounded-full blur-[100px]" />

            <div className="container max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-12 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]"
                >
                    {/* Info Side */}
                    <div className="md:col-span-5 bg-slate-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[80px] opacity-20" />

                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Have questions about the model's accuracy, data sources, or research methodology? We're here to help.
                            </p>
                        </div>

                        <div className="space-y-8 relative z-10 py-12">
                            <div className="flex items-start space-x-6 group cursor-pointer">
                                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                                    <Mail className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Email Us</div>
                                    <div className="text-lg font-medium">support@cardiopredict.edu</div>
                                    <div className="text-sm text-slate-400">research@ml-health.org</div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group cursor-pointer">
                                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                                    <Phone className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Call Us</div>
                                    <div className="text-lg font-medium">+1 (555) 123-4567</div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group cursor-pointer">
                                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                                    <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Visit Lab</div>
                                    <div className="text-lg font-medium">123 University Ave, Block A</div>
                                    <div className="text-sm text-slate-400">New York, NY 10012</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 flex gap-4 text-slate-400 text-sm">
                            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                            <span>•</span>
                            <span className="hover:text-white cursor-pointer">Terms of Service</span>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="md:col-span-7 p-12">
                        <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col justify-center">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Send a Message</h3>
                                <p className="text-slate-500">We usually respond within 24 hours.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">First Name</label>
                                    <Input placeholder="John" required className="bg-slate-50 border-0 focus:ring-2 ring-primary-100" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                                    <Input placeholder="Doe" required className="bg-slate-50 border-0 focus:ring-2 ring-primary-100" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                <Input type="email" placeholder="john@example.com" required className="bg-slate-50 border-0 focus:ring-2 ring-primary-100" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Message</label>
                                <textarea
                                    className="flex min-h-[150px] w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full text-lg h-14 rounded-xl shadow-lg shadow-primary-500/20" isLoading={loading}>
                                Send Message
                                <Send className="ml-2 h-5 w-5" />
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
