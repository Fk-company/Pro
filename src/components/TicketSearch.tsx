import React, { useState } from 'react';
import { Search, AlertCircle, Clock, CheckCircle2, CircleDashed } from 'lucide-react';
import { useTickets, Ticket } from '../context/TicketContext';

export const TicketSearch: React.FC = () => {
  const { getTicket } = useTickets();
  const [searchId, setSearchId] = useState('');
  const [ticket, setTicket] = useState<Ticket | null | undefined>(undefined);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    const result = getTicket(searchId.trim().toUpperCase());
    setTicket(result || null); // null means not found
    setHasSearched(true);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: Clock,
          label: 'قيد الانتظار',
          description: 'طلبك قيد المراجعة من قبل الفريق المختص'
        };
      case 'in-progress':
        return {
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: CircleDashed,
          label: 'قيد التنفيذ',
          description: 'جاري العمل على حل مشكلتك حالياً'
        };
      case 'resolved':
        return {
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: CheckCircle2,
          label: 'تم الحل',
          description: 'تم حل المشكلة وإغلاق التذكرة بنجاح'
        };
      default:
        return {
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          icon: AlertCircle,
          label: 'غير معروف',
          description: 'حالة غير معروفة'
        };
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">متابعة حالة الطلب</h2>
        <p className="text-slate-500">أدخل رقم التذكرة للتحقق من حالة طلبك وتفاصيله</p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-8">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="مثال: X7K9L2M"
          className="w-full px-6 py-4 pl-14 rounded-full border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg transition-all"
        />
        <button
          type="submit"
          className="absolute left-2 top-2 bottom-2 bg-blue-600 text-white rounded-full px-6 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        >
          <Search className="w-4 h-4" />
          بحث
        </button>
      </form>

      {hasSearched && !ticket && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center animate-fade-in">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-red-800 mb-1">لم يتم العثور على التذكرة</h3>
          <p className="text-red-600 text-sm">تأكد من إدخال رقم التذكرة الصحيح والمحاولة مرة أخرى</p>
        </div>
      )}

      {ticket && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden animate-fade-in">
          {(() => {
            const status = getStatusConfig(ticket.status);
            const StatusIcon = status.icon;
            
            return (
              <>
                <div className={`px-6 py-4 border-b ${status.border} ${status.bg} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`w-5 h-5 ${status.color}`} />
                    <span className={`font-bold ${status.color}`}>{status.label}</span>
                  </div>
                  <span className="font-mono text-slate-500 font-medium text-sm">#{ticket.id}</span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{ticket.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{ticket.description}</p>
                  
                  {ticket.imageUrl && (
                    <div className="mb-6 rounded-lg overflow-hidden border border-slate-200">
                      <img src={ticket.imageUrl} alt="Ticket attachment" className="w-full h-auto object-cover max-h-64" />
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-slate-400 border-t border-slate-100 pt-4">
                    <Clock className="w-4 h-4" />
                    <span>تاريخ الطلب: {new Date(ticket.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-sm text-slate-500">
                  {status.description}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
