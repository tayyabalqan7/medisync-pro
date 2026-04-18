'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Activity, Menu, X, User, LogOut, Bell, Settings,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/medicines', label: 'Medicines' },
    { href: '/symptoms', label: 'Symptoms' },
    { href: '/interactions', label: 'Interactions' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-dark border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
              MediSync Pro
            </span>
          </Link>

          {/* Desktop Nav */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'bg-sky-500/20 text-sky-400'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button className="relative p-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-sky-500 rounded-full" />
                </button>

                {/* User dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
                  >
                    <div className="w-7 h-7 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  </button>

                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 glass-card-dark border border-white/10 rounded-xl shadow-xl overflow-hidden"
                    >
                      <Link href="/settings" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-white/10 transition text-sm">
                        <Settings className="w-4 h-4 text-sky-400" /> Settings
                      </Link>
                      {user.role === 'admin' && (
                        <Link href="/admin" onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-3 hover:bg-white/10 transition text-sm">
                          <User className="w-4 h-4 text-teal-400" /> Admin Panel
                        </Link>
                      )}
                      <button onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-red-500/10 transition text-sm text-red-400 w-full text-left">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="btn-secondary text-sm px-4 py-2">Sign In</Link>
                <Link href="/auth/signup" className="btn-primary text-sm px-4 py-2">Get Started</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && user && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 flex flex-col gap-1"
          >
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === link.href ? 'bg-sky-500/20 text-sky-400' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}>
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
