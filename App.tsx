import { useState } from 'react';
import { AlertTriangle, Search, Shield, Wrench, Send, Lock, Eye, EyeOff } from 'lucide-react';
import { StoreProvider } from './store';
import type { ActiveView } from './types';
import SubmitProblem from './components/SubmitProblem';
import SearchProblem from './components/SearchProblem';
import AdminDashboard from './components/AdminDashboard';
import MaintenancePanel from './components/MaintenancePanel';
import Notifications from './components/Notifications';
import { cn } from './utils/cn';

const ADMIN_CODE = '1234';

function AppContent() {
  const [activeView, setActiveView] = useState<ActiveView>('submit');
  const [adminCode, setAdminCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleAdminLogin = () => {
    if (adminCode === ADMIN_CODE) {
      setActiveView('admin');
      setCodeError(false);
      setAdminCode('');
    } else {
      setCodeError(true);
    }
  };

  const navItems: { id: ActiveView; label: string; icon: typeof AlertTriangle; gradient: string }[] = [
    { id: 'submit', label: 'تقديم بلاغ', icon: Send, gradient: 'from-blue-600 to-indigo-600' },
    { id: 'search', label: 'تتبع الطلب', icon: Search, gradient: 'from-emerald-500 to-teal-600' },
    { id: 'admin-login', label: 'الإدارة', icon: Shield, gradient: 'from-purple-600 to-indigo-700' },
    { id: 'maintenance', label: 'الصيانة', icon: Wrench, gradient: 'from-orange-500 to-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30" dir="rtl">
      <Notifications />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">منصة إدارة البلاغات</h1>
                <p className="text-xs text-gray-500">نظام استقبال ومتابعة المشاكل</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex gap-2 flex-wrap">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeView === item.id || (item.id === 'admin-login' && activeView === 'admin');
                return (
                  <button key={item.id}
                    onClick={() => {
                      if (item.id === 'admin-login' && activeView === 'admin') return;
                      setActiveView(item.id);
                      setCodeError(false);
                      setAdminCode('');
                    }}
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all",
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}>
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Submit Problem */}
        {activeView === 'submit' && <SubmitProblem />}

        {/* Search */}
        {activeView === 'search' && <SearchProblem />}

        {/* Admin Login */}
        {activeView === 'admin-login' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-200">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">لوحة الإدارة</h2>
                <p className="text-gray-500 mt-1">أدخل رمز الدخول للوصول</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type={showCode ? 'text' : 'password'}
                    value={adminCode}
                    onChange={e => { setAdminCode(e.target.value); setCodeError(false); }}
                    onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
                    className={cn(
                      "w-full px-5 py-4 border-2 rounded-xl text-center text-2xl font-bold tracking-[0.5em] focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all",
                      codeError ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    )}
                    placeholder="● ● ● ●"
                    maxLength={4}
                    dir="ltr"
                  />
                  <button onClick={() => setShowCode(!showCode)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {codeError && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl text-center border border-red-100 font-medium">
                    ❌ رمز الدخول غير صحيح
                  </div>
                )}

                <button onClick={handleAdminLogin}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-200 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" /> دخول
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Dashboard */}
        {activeView === 'admin' && (
          <AdminDashboard onLogout={() => setActiveView('admin-login')} />
        )}

        {/* Maintenance */}
        {activeView === 'maintenance' && <MaintenancePanel />}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2025 منصة إدارة البلاغات — جميع الحقوق محفوظة</p>
          <p className="text-gray-400 text-xs mt-1">نسخة 2.0.0 | نظام متكامل لاستقبال ومعالجة البلاغات</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
