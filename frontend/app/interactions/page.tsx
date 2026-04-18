'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Plus, X, Search, CheckCircle, Info } from 'lucide-react';
import { interactions } from '@/lib/data';
import { medicines } from '@/lib/medicines-data';

export default function InteractionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [results, setResults] = useState<typeof interactions>([]);
  const [checked, setChecked] = useState(false);

  const filteredMeds = medicines.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.length > 0
  ).slice(0, 8);

  const addDrug = (name: string) => {
    if (!selectedDrugs.includes(name)) setSelectedDrugs(p => [...p, name]);
    setSearchTerm('');
    setChecked(false);
  };

  const removeDrug = (name: string) => {
    setSelectedDrugs(p => p.filter(d => d !== name));
    setChecked(false);
  };

  const checkInteractions = () => {
    if (selectedDrugs.length < 2) return;
    const found: typeof interactions = [];
    for (let i = 0; i < selectedDrugs.length; i++) {
      for (let j = i + 1; j < selectedDrugs.length; j++) {
        const d1 = selectedDrugs[i].toLowerCase();
        const d2 = selectedDrugs[j].toLowerCase();
        const interaction = interactions.find(it => {
          const id1 = it.drug1.toLowerCase();
          const id2 = it.drug2.toLowerCase();
          return (d1.includes(id1) || id1.includes(d1)) && (d2.includes(id2) || id2.includes(d2)) ||
                 (d1.includes(id2) || id2.includes(d1)) && (d2.includes(id1) || id1.includes(d2));
        });
        if (interaction) found.push(interaction);
      }
    }
    setResults(found);
    setChecked(true);
  };

  const severityConfig = {
    MAJOR: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', badge: 'badge-major', icon: AlertTriangle },
    MODERATE: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', badge: 'badge-moderate', icon: Info },
    MINOR: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', badge: 'badge-minor', icon: CheckCircle },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-orange-400" />
          Drug Interaction Checker
        </h1>
        <p className="text-white/50">Check for dangerous interactions between your medicines</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-6 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field pl-10"
            placeholder="Search and add medicines (e.g., Warfarin, Aspirin)..."
          />
        </div>

        {filteredMeds.length > 0 && (
          <div className="border border-white/10 rounded-xl overflow-hidden mb-4">
            {filteredMeds.map(m => (
              <button key={m.id} onClick={() => addDrug(m.name)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/10 transition text-left border-b border-white/5 last:border-0">
                <div>
                  <span className="text-sm font-medium">{m.name}</span>
                  <span className="text-xs text-white/40 ml-2">{m.generic_name}</span>
                </div>
                <Plus className="w-4 h-4 text-sky-400" />
              </button>
            ))}
          </div>
        )}

        {selectedDrugs.length > 0 && (
          <div>
            <p className="text-sm text-white/50 mb-2">Selected medicines ({selectedDrugs.length}):</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedDrugs.map(d => (
                <span key={d} className="flex items-center gap-1.5 bg-sky-500/20 text-sky-400 border border-sky-500/30 px-3 py-1 rounded-full text-sm">
                  {d}
                  <button onClick={() => removeDrug(d)} className="hover:text-sky-200"><X className="w-3.5 h-3.5" /></button>
                </span>
              ))}
            </div>
            {selectedDrugs.length >= 2 ? (
              <button onClick={checkInteractions} className="btn-primary flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Check Interactions
              </button>
            ) : (
              <p className="text-sm text-white/40">Add at least 2 medicines to check interactions</p>
            )}
          </div>
        )}

        {!selectedDrugs.length && (
          <div>
            <p className="text-sm text-white/50 mb-3">Try these common combinations:</p>
            <div className="flex flex-wrap gap-2">
              {[['Warfarin', 'Aspirin'], ['Metformin', 'Alcohol'], ['Simvastatin', 'Clarithromycin']].map(combo => (
                <button key={combo[0]} onClick={() => { setSelectedDrugs(combo); setChecked(false); }}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition">
                  {combo.join(' + ')}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {results.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  Found <span className="text-orange-400 font-medium">{results.length}</span> interaction{results.length > 1 ? 's' : ''}
                </div>
                {results.map((result, i) => {
                  const config = severityConfig[result.severity as keyof typeof severityConfig] || severityConfig.MINOR;
                  const Icon = config.icon;
                  return (
                    <motion.div key={result.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className={`glass-card p-5 border ${config.border}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${config.color}`} />
                          <span className="font-semibold">{result.drug1} + {result.drug2}</span>
                        </div>
                        <span className={config.badge}>{result.severity}</span>
                      </div>
                      <p className="text-sm text-white/70 mb-3">{result.description}</p>
                      <div className={`p-3 rounded-xl ${config.bg} border ${config.border}`}>
                        <p className="text-xs font-semibold mb-1 text-white/50">MANAGEMENT</p>
                        <p className="text-sm text-white/80">{result.management}</p>
                      </div>
                      <p className="text-xs text-white/30 mt-2">Mechanism: {result.mechanism}</p>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-green-400 mb-2">No Known Interactions Found</h3>
                <p className="text-white/50 text-sm">No interactions detected between the selected medicines in our database. Always consult your pharmacist or doctor for complete drug safety assessment.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info panel */}
      {!checked && (
        <div className="glass-card p-6 text-sm text-white/50 space-y-2">
          <h3 className="font-semibold text-white flex items-center gap-2"><Info className="w-4 h-4 text-sky-400" /> About Drug Interactions</h3>
          <p>Drug interactions can cause harmful effects or reduce the effectiveness of your medicines. Always inform your doctor and pharmacist about all medications you take.</p>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5"><span className="badge-major">MAJOR</span><span>Life-threatening, avoid combination</span></div>
            <div className="flex items-center gap-1.5"><span className="badge-moderate">MODERATE</span><span>Use with caution, monitor</span></div>
            <div className="flex items-center gap-1.5"><span className="badge-minor">MINOR</span><span>Minor effect, usually safe</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
