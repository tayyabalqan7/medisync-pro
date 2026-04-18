'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import StatCard from '@/components/StatCard';
import MedicineTimeline from '@/components/MedicineTimeline';
import {
  Pill, FileText, Calendar, Heart, ScanLine,
  Stethoscope, Plus, AlertTriangle, Bell, TrendingUp, Activity
} from 'lucide-react';

const alerts = [
  { type: 'warning', message: 'Metformin refill due in 3 days', icon: Bell },
  { type: 'info', message: 'Annual checkup reminder — 2 weeks overdue', icon: Calendar },
  { type: 'danger', message: 'Drug interaction detected: Check your medicines', icon: AlertTriangle },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
  }, [user, loading, router]);

  if (loading || !user) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{greeting}, <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">{user.name}</span> 👋</h1>
            <p className="text-white/50 mt-1">Here&apos;s your health overview for today</p>
          </div>
          <div className="hidden md:flex items-center gap-2 glass-card px-4 py-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">Health Status: Good</span>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <StatCard title="Total Medicines" value="8" icon={Pill} color="sky" trend={12} subtitle="In your profile" />
        <StatCard title="Active Prescriptions" value="3" icon={FileText} color="teal" subtitle="2 expiring soon" />
        <StatCard title="Doctor Visits" value="12" icon={Calendar} color="purple" trend={-5} subtitle="This year" />
        <StatCard title="Health Score" value="87/100" icon={Heart} color="green" trend={3} subtitle="Excellent range" />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Medicine Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold flex items-center gap-2">
                <Pill className="w-5 h-5 text-sky-400" /> Medicine Schedule
              </h2>
              <Link href="/records" className="text-xs text-sky-400 hover:text-sky-300 transition flex items-center gap-1">
                View all <TrendingUp className="w-3 h-3" />
              </Link>
            </div>
            <MedicineTimeline />
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="glass-card p-6">
              <h2 className="font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { href: '/scanner', icon: ScanLine, label: 'Scan Prescription', color: 'sky' },
                  { href: '/symptoms', icon: Stethoscope, label: 'Check Symptoms', color: 'teal' },
                  { href: '/records', icon: Plus, label: 'Add Record', color: 'green' },
                  { href: '/interactions', icon: AlertTriangle, label: 'Check Drug Interactions', color: 'orange' },
                ].map((action, i) => (
                  <Link key={i} href={action.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
                    >
                      <div className={`p-2 bg-${action.color}-500/20 rounded-lg`}>
                        <action.icon className={`w-4 h-4 text-${action.color}-400`} />
                      </div>
                      <span className="text-sm font-medium">{action.label}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="glass-card p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-yellow-400" /> Health Alerts
              </h2>
              <div className="space-y-3">
                {alerts.map((alert, i) => (
                  <div key={i} className={`p-3 rounded-xl border text-sm flex items-start gap-2 ${
                    alert.type === 'danger' ? 'bg-red-500/10 border-red-500/20 text-red-300'
                    : alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300'
                    : 'bg-sky-500/10 border-sky-500/20 text-sky-300'
                  }`}>
                    <alert.icon className="w-4 h-4 shrink-0 mt-0.5" />
                    {alert.message}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
