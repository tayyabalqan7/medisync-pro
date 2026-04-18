'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Settings, User, Bell, Shield, Palette, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
    if (user) { setName(user.name); setEmail(user.email); }
  }, [user, loading, router]);

  const saveProfile = () => {
    const updated = { ...user, name, email, phone, bloodGroup };
    localStorage.setItem('medisync_user', JSON.stringify(updated));
    toast.success('Profile updated!');
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const sections = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'appearance', icon: Palette, label: 'Appearance' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8 text-white/60" /> Settings
        </h1>
        <p className="text-white/50">Manage your account and preferences</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="glass-card p-3 h-fit">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition mb-1 ${
                activeSection === s.id ? 'bg-sky-500/20 text-sky-400' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}>
              <s.icon className="w-4 h-4" /> {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-3 glass-card p-6">
          {activeSection === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><User className="w-5 h-5 text-sky-400" /> Profile Information</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full flex items-center justify-center text-2xl font-bold">
                  {name[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-white/50">{email}</p>
                  <span className="text-xs bg-teal-500/20 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                    {user?.role || 'patient'}
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="input-field" type="email" />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Phone Number</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} className="input-field" placeholder="+92 300 0000000" />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Blood Group</label>
                  <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} className="input-field">
                    <option value="">Select...</option>
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={saveProfile} className="btn-primary mt-6 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><Bell className="w-5 h-5 text-yellow-400" /> Notification Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Push Notifications', desc: 'Receive in-app notifications', value: notifications, set: setNotifications },
                  { label: 'Email Alerts', desc: 'Get email reminders for medicine', value: emailAlerts, set: setEmailAlerts },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-white/40">{item.desc}</p>
                    </div>
                    <button onClick={() => item.set(!item.value)}
                      className={`w-12 h-6 rounded-full transition-all relative ${item.value ? 'bg-sky-500' : 'bg-white/20'}`}>
                      <div className={`w-5 h-5 rounded-full bg-white transition-all absolute top-0.5 ${item.value ? 'left-6' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><Shield className="w-5 h-5 text-green-400" /> Security</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="font-medium text-sm mb-1">Change Password</p>
                  <p className="text-xs text-white/40 mb-3">Update your account password</p>
                  <input className="input-field mb-2" type="password" placeholder="Current password" />
                  <input className="input-field mb-2" type="password" placeholder="New password" />
                  <input className="input-field mb-3" type="password" placeholder="Confirm new password" />
                  <button className="btn-primary text-sm py-2" onClick={() => toast.success('Password updated!')}>Update Password</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'appearance' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><Palette className="w-5 h-5 text-purple-400" /> Appearance</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-3">Color Theme</p>
                  <div className="flex gap-3">
                    {[
                      { name: 'Sky Blue', color: 'from-sky-500 to-teal-500' },
                      { name: 'Purple', color: 'from-purple-500 to-pink-500' },
                      { name: 'Green', color: 'from-green-500 to-emerald-500' },
                    ].map(theme => (
                      <button key={theme.name} className="flex flex-col items-center gap-1">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.color}`} />
                        <span className="text-xs text-white/50">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
