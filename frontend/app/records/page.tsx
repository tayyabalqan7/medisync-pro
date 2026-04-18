'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { FileText, Plus, X, Calendar, Stethoscope, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface MedicalRecord {
  id: string;
  title: string;
  type: string;
  doctor?: string;
  hospital?: string;
  date: string;
  diagnosis?: string;
  medicines?: { name: string; dosage: string; frequency: string }[];
  notes?: string;
}

const mockRecords: MedicalRecord[] = [
  { id: '1', title: 'Annual Health Checkup', type: 'diagnosis', doctor: 'Dr. Ahmed Khan', hospital: 'Aga Khan Hospital, Karachi', date: '2024-01-15', diagnosis: 'Generally healthy. Vitamin D deficiency noted.', medicines: [{ name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily' }], notes: 'Follow up in 3 months' },
  { id: '2', title: 'Diabetes Follow-up', type: 'prescription', doctor: 'Dr. Fatima Ali', hospital: 'JPMC Karachi', date: '2024-02-20', diagnosis: 'Type 2 Diabetes — controlled', medicines: [{ name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }, { name: 'Glibenclamide', dosage: '5mg', frequency: 'Once daily' }] },
  { id: '3', title: 'Blood Test Results', type: 'lab_report', doctor: 'Dr. Hassan Raza', hospital: 'Shaukat Khanum', date: '2024-03-05', diagnosis: 'HbA1c: 7.2%, CBC normal, Lipid profile borderline', notes: 'Dietary changes recommended' },
  { id: '4', title: 'COVID-19 Vaccination', type: 'vaccination', hospital: 'NICVD Karachi', date: '2023-12-01', notes: 'Moderna booster dose administered' },
];

const typeColors: Record<string, string> = {
  prescription: 'bg-sky-500/20 text-sky-400 border-sky-500/20',
  lab_report: 'bg-teal-500/20 text-teal-400 border-teal-500/20',
  diagnosis: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
  vaccination: 'bg-green-500/20 text-green-400 border-green-500/20',
  surgery: 'bg-red-500/20 text-red-400 border-red-500/20',
  other: 'bg-gray-500/20 text-gray-400 border-gray-500/20',
};

export default function RecordsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [records, setRecords] = useState<MedicalRecord[]>(mockRecords);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newRecord, setNewRecord] = useState({ title: '', type: 'diagnosis', doctor: '', hospital: '', date: '', diagnosis: '', notes: '' });

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
  }, [user, loading, router]);

  const addRecord = () => {
    if (!newRecord.title) return toast.error('Title is required');
    const record: MedicalRecord = { ...newRecord, id: Date.now().toString() };
    setRecords(prev => [record, ...prev]);
    setShowForm(false);
    setNewRecord({ title: '', type: 'diagnosis', doctor: '', hospital: '', date: '', diagnosis: '', notes: '' });
    toast.success('Record added!');
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    toast.success('Record deleted');
  };

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-400" /> My Records
          </h1>
          <p className="text-white/50">Your complete medical history</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Record'}
        </button>
      </motion.div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-card p-6 mb-6">
            <h3 className="font-semibold mb-4">New Medical Record</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm text-white/60 mb-1 block">Title *</label>
                <input value={newRecord.title} onChange={e => setNewRecord(p => ({ ...p, title: e.target.value }))} className="input-field" placeholder="e.g., Annual Checkup" />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Type</label>
                <select value={newRecord.type} onChange={e => setNewRecord(p => ({ ...p, type: e.target.value }))} className="input-field">
                  {['prescription', 'lab_report', 'diagnosis', 'vaccination', 'surgery', 'other'].map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Date</label>
                <input type="date" value={newRecord.date} onChange={e => setNewRecord(p => ({ ...p, date: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Doctor</label>
                <input value={newRecord.doctor} onChange={e => setNewRecord(p => ({ ...p, doctor: e.target.value }))} className="input-field" placeholder="Dr. Name" />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Hospital/Clinic</label>
                <input value={newRecord.hospital} onChange={e => setNewRecord(p => ({ ...p, hospital: e.target.value }))} className="input-field" placeholder="Hospital name" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/60 mb-1 block">Diagnosis/Findings</label>
                <textarea value={newRecord.diagnosis} onChange={e => setNewRecord(p => ({ ...p, diagnosis: e.target.value }))} className="input-field resize-none" rows={2} placeholder="Enter diagnosis..." />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/60 mb-1 block">Notes</label>
                <textarea value={newRecord.notes} onChange={e => setNewRecord(p => ({ ...p, notes: e.target.value }))} className="input-field resize-none" rows={2} placeholder="Additional notes..." />
              </div>
            </div>
            <button onClick={addRecord} className="btn-primary mt-4">Save Record</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {records.map((record, i) => (
          <motion.div key={record.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card overflow-hidden">
            <div className="p-5 cursor-pointer flex items-start justify-between" onClick={() => setExpanded(expanded === record.id ? null : record.id)}>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/20 rounded-xl"><FileText className="w-5 h-5 text-purple-400" /></div>
                <div>
                  <h3 className="font-semibold">{record.title}</h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className={`text-xs border px-2 py-0.5 rounded-full ${typeColors[record.type]}`}>{record.type.replace('_', ' ')}</span>
                    {record.date && <span className="text-xs text-white/40 flex items-center gap-1"><Calendar className="w-3 h-3" />{record.date}</span>}
                    {record.doctor && <span className="text-xs text-white/40 flex items-center gap-1"><Stethoscope className="w-3 h-3" />{record.doctor}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <button onClick={e => { e.stopPropagation(); deleteRecord(record.id); }}
                  className="p-1.5 hover:bg-red-500/20 rounded-lg transition text-white/30 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
                {expanded === record.id ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
              </div>
            </div>
            <AnimatePresence>
              {expanded === record.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-5 pt-0 border-t border-white/10 space-y-3">
                  {record.hospital && <p className="text-sm text-white/60"><span className="text-white/40">Hospital:</span> {record.hospital}</p>}
                  {record.diagnosis && <p className="text-sm text-white/70"><span className="text-white/40">Diagnosis:</span> {record.diagnosis}</p>}
                  {record.medicines && record.medicines.length > 0 && (
                    <div>
                      <p className="text-xs text-white/40 mb-2">Prescribed medicines:</p>
                      <div className="space-y-1">
                        {record.medicines.map((m, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm bg-sky-500/5 border border-sky-500/10 rounded-lg px-3 py-2">
                            <span className="font-medium text-sky-400">{m.name}</span>
                            <span className="text-white/50">{m.dosage}</span>
                            <span className="text-white/30">—</span>
                            <span className="text-white/50">{m.frequency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {record.notes && <p className="text-sm text-white/60"><span className="text-white/40">Notes:</span> {record.notes}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
