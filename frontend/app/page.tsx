'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ScanLine, Stethoscope, AlertTriangle, FileText, Pill,
  Bell, ArrowRight, Shield, Zap, Activity, Star, Users,
  ChevronRight, Heart, Brain, Clock
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const features = [
  { icon: ScanLine, title: 'Medicine Scanner', description: 'Upload prescriptions and instantly extract medicine names using OCR technology', color: 'sky', gradient: 'from-sky-500 to-blue-600' },
  { icon: Stethoscope, title: 'Symptom Analyzer', description: 'Describe your symptoms and get intelligent recommendations for treatment', color: 'teal', gradient: 'from-teal-500 to-cyan-600' },
  { icon: AlertTriangle, title: 'Drug Interactions', description: 'Check for dangerous interactions between multiple medicines you take', color: 'orange', gradient: 'from-orange-500 to-red-500' },
  { icon: FileText, title: 'Patient Records', description: 'Securely store and organize your complete medical history in one place', color: 'purple', gradient: 'from-purple-500 to-violet-600' },
  { icon: Pill, title: 'Medicine Database', description: 'Access comprehensive database of 60+ Pakistani medicines with full details', color: 'green', gradient: 'from-green-500 to-emerald-600' },
  { icon: Bell, title: 'Refill Reminders', description: 'Never miss a dose with smart medication reminders and refill alerts', color: 'pink', gradient: 'from-pink-500 to-rose-600' },
];

const stats = [
  { value: '60+', label: 'Medicines', icon: Pill },
  { value: '30+', label: 'Symptoms', icon: Stethoscope },
  { value: '25+', label: 'Drug Interactions', icon: AlertTriangle },
  { value: '100%', label: 'Secure & Private', icon: Shield },
];

const steps = [
  { step: '01', title: 'Create Your Profile', description: 'Sign up and set up your health profile with your medical history, allergies, and current medications.', icon: Users },
  { step: '02', title: 'Scan & Add Records', description: 'Upload your prescriptions using OCR scanner or manually add your medicines and health records.', icon: ScanLine },
  { step: '03', title: 'Get Smart Insights', description: 'Receive personalized medicine recommendations, interaction checks, and symptom analysis.', icon: Brain },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        {/* Background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 border border-sky-500/30 rounded-full text-sky-400 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Pakistan&apos;s Most Advanced Healthcare Platform
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Your Health,{' '}
            <span className="bg-gradient-to-r from-sky-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
              Intelligently
            </span>
            <br />Managed
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-10"
          >
            MediSync Pro brings together medicine scanning, symptom analysis, drug interaction checking, and patient record management — all in one powerful platform.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="btn-primary text-base px-8 py-3 flex items-center gap-2 justify-center">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/medicines" className="btn-secondary text-base px-8 py-3 flex items-center gap-2 justify-center">
              Browse Medicines <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 relative"
          >
            <div className="glass-card p-1 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Health Score', value: '87/100', color: 'text-green-400', icon: Heart },
                    { label: 'Active Meds', value: '3', color: 'text-sky-400', icon: Pill },
                    { label: 'Records', value: '12', color: 'text-teal-400', icon: FileText },
                  ].map(item => (
                    <div key={item.label} className="glass-card p-4 text-center">
                      <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-1`} />
                      <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                      <div className="text-xs text-white/50">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {['Paracetamol 500mg — 8:00 AM ✓', 'Metformin 500mg — 2:00 PM ✓', 'Atenolol 50mg — 8:00 PM ⏰'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${i < 2 ? 'bg-green-400' : 'bg-yellow-400'}`} />
                      <span className="text-sm text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-sky-400 mx-auto mb-2" />
              <div className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need for <br />
              <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">Smart Health Management</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Built specifically for Pakistani healthcare needs, with local medicines and Pakistani pharma data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 group cursor-default"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-white/2">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">Works</span></h2>
            <p className="text-white/50">Get started in 3 simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-2/3 w-full h-0.5 bg-gradient-to-r from-sky-500/50 to-transparent" />
                )}
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="text-sky-400 text-sm font-semibold mb-2">STEP {step.step}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center glass-card p-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Start Managing Your Health Today</h2>
          <p className="text-white/50 mb-8">
            Join thousands of Pakistanis using MediSync Pro for smarter healthcare management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="btn-primary text-base px-8 py-3 flex items-center gap-2 justify-center">
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/medicines" className="btn-secondary text-base px-8 py-3 flex items-center gap-2 justify-center">
              <Star className="w-5 h-5" /> Explore Features
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
                MediSync Pro
              </span>
            </div>
            <div className="flex gap-6 text-sm text-white/40">
              <Link href="/medicines" className="hover:text-white/70 transition">Medicines</Link>
              <Link href="/symptoms" className="hover:text-white/70 transition">Symptoms</Link>
              <Link href="/interactions" className="hover:text-white/70 transition">Interactions</Link>
              <Link href="/auth/signup" className="hover:text-white/70 transition">Sign Up</Link>
            </div>
            <div className="flex items-center gap-1 text-sm text-white/30">
              <Clock className="w-4 h-4" />
              <span>Made with <Heart className="w-3 h-3 inline text-red-400" /> for Pakistan</span>
            </div>
          </div>
          <div className="text-center text-xs text-white/20 mt-6">
            © 2024 MediSync Pro. For informational purposes only. Always consult a qualified healthcare professional.
          </div>
        </div>
      </footer>
    </div>
  );
}
