import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'MediSync Pro — Patient Record Management & Medicine Intelligence',
  description: 'Intelligent healthcare management platform for Pakistan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <AuthProvider>
          <Navbar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
