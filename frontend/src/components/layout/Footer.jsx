import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-slate-100 bg-white py-6 md:py-8">
            <div className="container mx-auto px-4 text-center md:text-left md:flex md:justify-between md:items-center">
                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()} CardioPredict. All rights reserved.
                </p>
                <div className="mt-4 md:mt-0 flex justify-center space-x-6">
                    <a href="#" className="text-slate-400 hover:text-slate-600 text-sm">Privacy Policy</a>
                    <a href="#" className="text-slate-400 hover:text-slate-600 text-sm">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
