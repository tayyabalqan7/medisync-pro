'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Pill, Stethoscope, FileText,
  AlertTriangle, ScanLine, Settings, Shield, X
} from 'lucide-react';

const links = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/medicines', icon: Pill, label: 'Medicines' },
  { href: '/symptoms', icon: Stethoscope, label: 'Symptoms' },
  { href: '/records', icon: FileText, label: 'My Records' },
  { href: '/interactions', icon: AlertTriangle, label: 'Drug Interactions' },
  { href: '/scanner', icon: ScanLine, label: 'OCR Scanner' },
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/admin', icon: Shield, label: 'Admin Panel' },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">Navigation</span>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} onClick={onClose}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/20 to-teal-500/20 text-sky-400 border border-sky-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : ''}`} />
                <span className="text-sm font-medium">{link.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-sky-400 rounded-full" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="glass-card p-3 text-center">
          <p className="text-xs text-white/50 mb-1">MediSync Pro</p>
          <p className="text-xs text-sky-400 font-medium">v1.0.0 — Pakistan Edition</p>
        </div>
      </div>
    </div>
  );
}
