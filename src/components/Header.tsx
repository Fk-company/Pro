import React from 'react';
import { ClipboardList, Search, PlusCircle, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'search' | 'admin';
  setView: (view: 'home' | 'search' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">منصة البلاغات</h1>
          </div>
          
          <nav className="flex items-center gap-1 sm:gap-4">
            <button
              onClick={() => setView('home')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'home' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <PlusCircle className="h-4 w-4" />
              <span>بلاغ جديد</span>
            </button>
            
            <button
              onClick={() => setView('search')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'search' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>متابعة طلب</span>
            </button>

             <button
              onClick={() => setView('admin')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'admin' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>الإدارة</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
