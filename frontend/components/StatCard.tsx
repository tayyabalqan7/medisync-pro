'use client';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: number;
  subtitle?: string;
}

export default function StatCard({ title, value, icon: Icon, color = 'sky', trend, subtitle }: StatCardProps) {
  const colorMap: Record<string, string> = {
    sky: 'from-sky-500/20 to-sky-600/10 border-sky-500/20 text-sky-400',
    teal: 'from-teal-500/20 to-teal-600/10 border-teal-500/20 text-teal-400',
    green: 'from-green-500/20 to-green-600/10 border-green-500/20 text-green-400',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400',
    orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/20 text-orange-400',
    red: 'from-red-500/20 to-red-600/10 border-red-500/20 text-red-400',
  };

  const iconBg: Record<string, string> = {
    sky: 'bg-sky-500/20 text-sky-400',
    teal: 'bg-teal-500/20 text-teal-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400',
    red: 'bg-red-500/20 text-red-400',
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`glass-card bg-gradient-to-br ${colorMap[color]} border p-6 cursor-default`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${iconBg[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/60">{title}</div>
      {subtitle && <div className="text-xs text-white/40 mt-1">{subtitle}</div>}
    </motion.div>
  );
}
