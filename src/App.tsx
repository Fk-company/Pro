import { useState } from 'react';
import { TicketProvider } from './context/TicketContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProblemForm } from './components/ProblemForm';
import { TicketSearch } from './components/TicketSearch';
import { AdminDashboard } from './components/AdminDashboard';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'admin'>('home');

  return (
    <TicketProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Header currentView={currentView} setView={setCurrentView} />
        
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'home' && (
            <div className="animate-fade-in">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">أهلاً بك في منصة الدعم</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  نحن هنا لمساعدتك. يمكنك تسجيل بلاغ جديد بسهولة أو متابعة حالة طلباتك السابقة.
                </p>
              </div>
              <ProblemForm />
            </div>
          )}
          
          {currentView === 'search' && <TicketSearch />}
          
          {currentView === 'admin' && <AdminDashboard />}
        </main>
        
        <Footer />
      </div>
    </TicketProvider>
  );
}
