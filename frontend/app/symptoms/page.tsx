'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Plus, X, Search, AlertCircle, Home, Pill, ChevronRight } from 'lucide-react';
import { symptoms } from '@/lib/data';
import { medicines as allMedicines } from '@/lib/medicines-data';

export default function SymptomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<typeof symptoms>([]);
  const [analyzed, setAnalyzed] = useState(false);

  const filteredSymptoms = symptoms.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addSymptom = (name: string) => {
    if (!selectedSymptoms.includes(name)) {
      setSelectedSymptoms(prev => [...prev, name]);
    }
    setSearchTerm('');
    setAnalyzed(false);
  };

  const removeSymptom = (name: string) => {
    setSelectedSymptoms(prev => prev.filter(s => s !== name));
    setAnalyzed(false);
  };

  const analyze = () => {
    if (!selectedSymptoms.length) return;
    const found = symptoms.filter(s =>
      selectedSymptoms.some(sel =>
        s.name.toLowerCase().includes(sel.toLowerCase()) ||
        sel.toLowerCase().includes(s.name.toLowerCase())
      )
    );
    setResults(found);
    setAnalyzed(true);
  };

  const severityColor = (s: string) =>
    s === 'critical' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
    s === 'high' ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' :
    s === 'moderate' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
    'text-green-400 bg-green-500/10 border-green-500/20';

  const relatedMeds = results.flatMap(r => r.recommended_medicines)
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 8);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Stethoscope className="w-8 h-8 text-teal-400" />
          Symptom Analyzer
        </h1>
        <p className="text-white/50">Select your symptoms to get personalized health guidance</p>
      </motion.div>

      {/* Symptom Input */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-6 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field pl-10"
            placeholder="Search symptoms (e.g., Fever, Headache, Cough)..."
          />
        </div>

        {/* Search results */}
        {searchTerm && (
          <div className="border border-white/10 rounded-xl overflow-hidden mb-4">
            {filteredSymptoms.slice(0, 6).map(s => (
              <button key={s.id} onClick={() => addSymptom(s.name)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/10 transition text-left border-b border-white/5 last:border-0">
                <span className="text-sm">{s.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColor(s.severity)}`}>{s.severity}</span>
                  <Plus className="w-4 h-4 text-sky-400" />
                </div>
              </button>
            ))}
            {filteredSymptoms.length === 0 && (
              <div className="px-4 py-3 text-sm text-white/40">No symptoms found</div>
            )}
          </div>
        )}

        {/* Selected symptoms */}
        {selectedSymptoms.length > 0 && (
          <div>
            <p className="text-sm text-white/50 mb-2">Selected symptoms:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSymptoms.map(s => (
                <span key={s} className="flex items-center gap-1.5 bg-teal-500/20 text-teal-400 border border-teal-500/30 px-3 py-1 rounded-full text-sm">
                  {s}
                  <button onClick={() => removeSymptom(s)} className="hover:text-teal-200 transition">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <button onClick={analyze} className="btn-primary flex items-center gap-2">
              <Stethoscope className="w-4 h-4" /> Analyze Symptoms
            </button>
          </div>
        )}

        {!selectedSymptoms.length && (
          <div>
            <p className="text-sm text-white/50 mb-3">Quick select common symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {['Fever', 'Headache', 'Cough', 'Nausea', 'Back Pain', 'Diarrhea', 'Allergy', 'Fatigue'].map(s => (
                <button key={s} onClick={() => addSymptom(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition flex items-center gap-1">
                  <Plus className="w-3 h-3" /> {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {analyzed && results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {results.map((result, i) => (
              <motion.div key={result.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-teal-400" />
                    {result.name}
                  </h3>
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium ${severityColor(result.severity)}`}>
                    {result.severity.toUpperCase()}
                  </span>
                </div>

                <p className="text-white/60 text-sm mb-5">{result.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white/60 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-orange-400" /> Possible Conditions
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {result.possible_conditions.map(c => (
                        <span key={c} className="text-xs bg-orange-500/10 text-orange-300 border border-orange-500/20 px-2 py-0.5 rounded-full">{c}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white/60 mb-2 flex items-center gap-1.5">
                      <Pill className="w-4 h-4 text-sky-400" /> Recommended Medicines
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {result.recommended_medicines.map(m => (
                        <span key={m} className="text-xs bg-sky-500/10 text-sky-300 border border-sky-500/20 px-2 py-0.5 rounded-full">{m}</span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h4 className="text-sm font-semibold text-white/60 mb-2 flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-green-400" /> Home Remedies
                    </h4>
                    <ul className="space-y-1">
                      {result.home_remedies.map((r, j) => (
                        <li key={j} className="text-sm text-white/60 flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 mt-0.5 text-green-400 shrink-0" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`mt-4 p-3 rounded-xl border text-sm flex items-start gap-2 ${
                  result.severity === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-300' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300'
                }`}>
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span><strong>When to see a doctor:</strong> {result.when_to_see_doctor}</span>
                </div>
              </motion.div>
            ))}

            {relatedMeds.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-sky-400" /> All Recommended Medicines
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedMeds.map(m => {
                    const med = allMedicines.find(a => a.name.toLowerCase().includes(m.toLowerCase()));
                    return (
                      <div key={m} className="glass-card px-3 py-2 text-sm">
                        <span className="font-medium">{m}</span>
                        {med && <span className="text-white/40 ml-1">— {med.category}</span>}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
        {analyzed && results.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 text-center text-white/40">
            <Stethoscope className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No matching symptoms found. Try different symptom names.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
