'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react';
import type { Medicine } from '@/lib/medicines-data';

export default function MedicineCard({ medicine }: { medicine: Medicine }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className="glass-card p-5 cursor-pointer hover:border-sky-500/30 transition-all duration-200"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 bg-sky-500/20 rounded-xl shrink-0">
            <Pill className="w-5 h-5 text-sky-400" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate">{medicine.name}</h3>
            <p className="text-sm text-white/50 truncate">{medicine.generic_name}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs bg-teal-500/20 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-full">
                {medicine.category}
              </span>
              {medicine.requires_prescription ? (
                <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Rx
                </span>
              ) : (
                <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> OTC
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0 ml-2">
          <span className="text-sm font-bold text-green-400">₨{medicine.price_pkr}</span>
          {expanded ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/10 space-y-3"
          >
            <p className="text-sm text-white/70">{medicine.description}</p>

            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Brand Names</h4>
              <div className="flex flex-wrap gap-1">
                {medicine.brand_names.map(b => (
                  <span key={b} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">{b}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Uses</h4>
              <div className="flex flex-wrap gap-1">
                {medicine.uses.map(u => (
                  <span key={u} className="text-xs bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-full">{u}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Dosage</h4>
              <p className="text-sm text-white/70">{medicine.dosage}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Side Effects</h4>
              <div className="flex flex-wrap gap-1">
                {medicine.side_effects.slice(0, 4).map(s => (
                  <span key={s} className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Manufacturer</h4>
              <p className="text-sm text-white/60">{medicine.manufacturer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
