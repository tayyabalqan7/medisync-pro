'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Pill, X } from 'lucide-react';
import MedicineCard from '@/components/MedicineCard';
import { medicines } from '@/lib/medicines-data';

const categories = Array.from(new Set(medicines.map(m => m.category)));

export default function MedicinesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showRxOnly, setShowRxOnly] = useState<boolean | null>(null);

  const filtered = useMemo(() => {
    return medicines.filter(m => {
      const q = search.toLowerCase();
      const matchSearch = !search || m.name.toLowerCase().includes(q) ||
        m.generic_name?.toLowerCase().includes(q) ||
        m.brand_names?.some(b => b.toLowerCase().includes(q)) ||
        m.category.toLowerCase().includes(q);
      const matchCategory = !selectedCategory || m.category === selectedCategory;
      const matchRx = showRxOnly === null || m.requires_prescription === showRxOnly;
      return matchSearch && matchCategory && matchRx;
    });
  }, [search, selectedCategory, showRxOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Pill className="w-8 h-8 text-sky-400" />
          Medicine Database
        </h1>
        <p className="text-white/50">Browse 60+ Pakistani medicines with complete information</p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-4 mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-10 text-base"
            placeholder="Search by name, generic name, brand, or category..."
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-white/40" />
          <button
            onClick={() => setSelectedCategory('')}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${!selectedCategory ? 'bg-sky-500/20 border-sky-500/30 text-sky-400' : 'border-white/20 text-white/50 hover:text-white hover:border-white/40'}`}
          >
            All Categories
          </button>
          {categories.slice(0, 10).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${selectedCategory === cat ? 'bg-sky-500/20 border-sky-500/30 text-sky-400' : 'border-white/20 text-white/50 hover:text-white hover:border-white/40'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowRxOnly(showRxOnly === null ? false : null)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${showRxOnly === false ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'border-white/20 text-white/50 hover:text-white hover:border-white/40'}`}
          >
            OTC Only
          </button>
          <button
            onClick={() => setShowRxOnly(showRxOnly === null ? true : null)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${showRxOnly === true ? 'bg-orange-500/20 border-orange-500/30 text-orange-400' : 'border-white/20 text-white/50 hover:text-white hover:border-white/40'}`}
          >
            Prescription Only
          </button>
        </div>
      </motion.div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-white/50 text-sm">
          Showing <span className="text-sky-400 font-medium">{filtered.length}</span> of {medicines.length} medicines
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {filtered.map((medicine, i) => (
          <motion.div
            key={medicine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <MedicineCard medicine={medicine} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/40">
          <Pill className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg">No medicines found</p>
          <p className="text-sm">Try different search terms or filters</p>
        </div>
      )}
    </div>
  );
}
