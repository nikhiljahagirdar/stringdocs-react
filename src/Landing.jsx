import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, File, Zap, ShieldCheck, LayoutDashboard, Code2, Users, MessageSquare, Bookmark, CheckCircle, Search } from 'lucide-react';
import  cn  from './utils/tailwindMerge';


// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

// Feature data
const features = [
    {
        title: 'Automated Workflows',
        description: 'Streamline your PDF processes with automated workflows.  Reduce manual effort and save time.',
        icon: Rocket,
    },
    {
        title: 'Fast Processing',
        description: 'Experience lightning-fast PDF processing. Our tools are optimized for speed and efficiency.',
        icon: Zap,
    },
    {
        title: 'Secure & Reliable',
        description: 'Your data is safe with us. We use advanced security measures to protect your documents.',
        icon: ShieldCheck,
    },
    {
        title: 'Bookmark Management',
        description: 'Easily add, edit, and manage bookmarks within your PDF documents.',
        icon: Bookmark,
    },
    {
        title: 'Spell & Grammar Check',
        description: 'Ensure your PDFs are error-free with our built-in spell and grammar checker.',
        icon: CheckCircle,
    },
    {
        title: 'OCR (Optical Character Recognition)',
        description: 'Convert scanned documents and images into searchable and editable PDFs.',
        icon: Search,
    },
];

const HeroSection = () => {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 bg-blue-600 text-white py-20 md:py-32">
            <div className="w-full text-center">
                <h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-600"
                >
                    Automate Your PDFs
                </h1>
                <p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}
                    className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                >
                    The ultimate solution for automating your PDF workflows. Convert, edit, secure, and manage your documents effortlessly.
                </p>
                <div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.6 }}
                >
                    <Link to="/register" 
                        size="lg"
                        className="bg-white text-blue-500 px-8 py-3 rounded-full
                                 hover: transition-all duration-300
                                 shadow-lg hover:shadow-xl font-semibold text-lg"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    );
};

const Header = () => {
    return (
        <header className="py-4 px-6 sm:px-8 lg:px-12  w-full border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* <img src="/wizdocx-logo.svg" alt="Wizdocx Logo" className="h-8" /> */}
                <h1 className="text-2xl font-bold text-blue-600">Wizdocx</h1>
                <a
                    variant="outline"
                    className="text-blue-600 hover:bg-blue-100 hover:border-blue-200"
                    href='/login'
                >
                    Login
                </a>
            </div>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="py-6 px-6 sm:px-8 lg:px-12 bg-blue-800 text-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto text-center text-gray-600">
                &copy; {new Date().getFullYear()} Wizdocx. All rights reserved.
            </div>
        </footer>
    );
};

const LandingPage = () => {
    return (
        <div className="w-full bg-white min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <HeroSection />

            {/* Features Section */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex-grow">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-center text-blue-600 mb-12">Key Features</h2>
                    <div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                variants={itemVariants}
                                className={cn(
                                    "p-6 rounded-xl border border-gray-200 shadow-lg",
                                    "bg-white",
                                    "transition-all duration-300",
                                    "hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/20",
                                    "flex flex-col items-start gap-4"
                                )}
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-blue-600">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
