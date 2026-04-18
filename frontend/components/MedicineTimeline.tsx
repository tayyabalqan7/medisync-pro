'use client';
import { motion } from 'framer-motion';
import { Clock, Pill } from 'lucide-react';

const timeline = [
  { medicine: 'Paracetamol 500mg', time: '8:00 AM', status: 'taken', date: 'Today' },
  { medicine: 'Metformin 500mg', time: '1:00 PM', status: 'taken', date: 'Today' },
  { medicine: 'Atenolol 50mg', time: '8:00 PM', status: 'pending', date: 'Today' },
  { medicine: 'Vitamin D3 1000IU', time: '9:00 AM', status: 'taken', date: 'Yesterday' },
  { medicine: 'Omeprazole 20mg', time: '7:00 AM', status: 'taken', date: 'Yesterday' },
];

export default function MedicineTimeline() {
  return (
    <div className="space-y-3">
      {timeline.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3"
        >
          <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full border-2 ${
              item.status === 'taken'
                ? 'bg-green-400 border-green-400'
                : 'bg-transparent border-yellow-400'
            }`} />
            {i < timeline.length - 1 && <div className="w-0.5 h-8 bg-white/10 mt-1" />}
          </div>

          <div className={`flex-1 p-3 rounded-xl border transition-all ${
            item.status === 'taken'
              ? 'bg-green-500/5 border-green-500/10'
              : 'bg-yellow-500/5 border-yellow-500/20'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className={`w-4 h-4 ${item.status === 'taken' ? 'text-green-400' : 'text-yellow-400'}`} />
                <span className="text-sm font-medium text-white">{item.medicine}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                item.status === 'taken'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {item.status}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-white/30" />
              <span className="text-xs text-white/40">{item.date} at {item.time}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
