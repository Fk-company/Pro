import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
        <p>© {new Date().getFullYear()} منصة استقبال المشاكل. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};
