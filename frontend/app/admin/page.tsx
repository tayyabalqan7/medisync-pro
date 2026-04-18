'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import StatCard from '@/components/StatCard';
import { Shield, Users, Pill, Activity, Server, Database, CheckCircle, AlertTriangle } from 'lucide-react';
import { medicines } from '@/lib/medicines-data';
import { symptoms } from '@/lib/data';

const mockUsers = [
  { id: '1', name: 'Ahmed Khan', email: 'ahmed@example.com', role: 'patient', joined: '2024-01-15', status: 'active' },
  { id: '2', name: 'Fatima Ali', email: 'fatima@example.com', role: 'doctor', joined: '2024-01-20', status: 'active' },
  { id: '3', name: 'Hassan Raza', email: 'hassan@example.com', role: 'patient', joined: '2024-02-01', status: 'inactive' },
  { id: '4', name: 'Zara Khan', email: 'zara@example.com', role: 'patient', joined: '2024-02-10', status: 'active' },
  { id: '5', name: 'Omar Sheikh', email: 'omar@example.com', role: 'admin', joined: '2024-01-01', status: 'active' },
];

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
  }, [user, loading, router]);

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-sky-400" /> Admin Panel
        </h1>
        <p className="text-white/50">System management and overview</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={mockUsers.length} icon={Users} color="sky" trend={8} />
        <StatCard title="Medicines DB" value={medicines.length} icon={Pill} color="teal" />
        <StatCard title="Symptoms DB" value={symptoms.length} icon={Activity} color="green" />
        <StatCard title="System Status" value="Online" icon={Server} color="purple" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Users Table */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-400" /> User Management
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-left">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium hidden md:table-cell">Joined</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockUsers.map(u => (
                  <motion.tr key={u.id} whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }} className="rounded-xl">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {u.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-white/40 text-xs hidden sm:block">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        u.role === 'admin' ? 'bg-sky-500/20 text-sky-400 border-sky-500/20' :
                        u.role === 'doctor' ? 'bg-teal-500/20 text-teal-400 border-teal-500/20' :
                        'bg-white/10 text-white/50 border-white/20'
                      }`}>{u.role}</span>
                    </td>
                    <td className="py-3 text-white/50 hidden md:table-cell">{u.joined}</td>
                    <td className="py-3">
                      {u.status === 'active' ?
                        <span className="flex items-center gap-1 text-green-400 text-xs"><CheckCircle className="w-3 h-3" /> Active</span> :
                        <span className="flex items-center gap-1 text-red-400 text-xs"><AlertTriangle className="w-3 h-3" /> Inactive</span>
                      }
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-green-400" /> System Health
            </h2>
            <div className="space-y-3">
              {[
                { name: 'API Server', status: 'online', latency: '45ms' },
                { name: 'Database', status: 'online', latency: '12ms' },
                { name: 'OCR Service', status: 'client-side', latency: 'N/A' },
                { name: 'Auth Service', status: 'online', latency: '8ms' },
              ].map(s => (
                <div key={s.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${s.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                    <span className="text-sm">{s.name}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs ${s.status === 'online' ? 'text-green-400' : 'text-yellow-400'}`}>{s.status}</span>
                    {s.latency !== 'N/A' && <span className="text-xs text-white/30 ml-2">{s.latency}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-teal-400" /> Data Overview
            </h2>
            <div className="space-y-2">
              {[
                { label: 'Medicines', count: medicines.length },
                { label: 'Symptoms', count: symptoms.length },
                { label: 'Interactions', count: 15 },
                { label: 'Categories', count: Array.from(new Set(medicines.map(m => m.category))).length },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-white/60">{item.label}</span>
                  <span className="font-semibold text-sky-400">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
