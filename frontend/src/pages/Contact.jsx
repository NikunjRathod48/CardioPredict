import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageSquare, ExternalLink } from 'lucide-react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

const Contact = () => {
    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start pb-20">

            {/* Left Column: Info */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8 md:sticky md:top-32"
            >
                <div>
                    <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Interested in the model architecture or want to collaborate? Reach out directly via the form or my social channels.
                    </p>
                </div>

                <div className="space-y-4">
                    <Card className="flex items-center gap-4 hover:border-teal-200 transition-colors cursor-pointer" hoverEffect onClick={() => window.open('https://github.com/NikunjRathod48', '_blank')}>
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-700">
                            <Github className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900">GitHub Profile</h3>
                            <p className="text-sm text-slate-500">Explore the source code</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                    </Card>

                    <Card className="flex items-center gap-4 hover:border-blue-200 transition-colors cursor-pointer" hoverEffect onClick={() => window.open('https://linkedin.com/in/NikunjRathod48', '_blank')}>
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Linkedin className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900">LinkedIn</h3>
                            <p className="text-sm text-slate-500">Professional network</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                    </Card>
                </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Card className="p-8 shadow-xl shadow-slate-200/50">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">Send a Message</h2>
                        <p className="text-slate-500">I usually respond within 24 hours.</p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-5">
                            <Input label="First Name" placeholder="Jane" />
                            <Input label="Last Name" placeholder="Doe" />
                        </div>
                        <Input label="Email Address" type="email" placeholder="jane@example.com" />
                        <Input label="Subject" placeholder="Collaboration / Inquiry" />
                        <Textarea label="Message" placeholder="How can I help you?" className="min-h-[150px]" />

                        <Button className="w-full text-lg h-12 shadow-lg shadow-teal-500/20">
                            Send Message
                        </Button>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default Contact;
