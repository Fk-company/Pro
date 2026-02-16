import React from 'react';
import { useTickets, TicketStatus } from '../context/TicketContext';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

export const AdminDashboard: React.FC = () => {
  const { tickets, updateTicketStatus } = useTickets();

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(tickets.map(t => ({
      ID: t.id,
      Title: t.title,
      Description: t.description,
      Status: t.status,
      Created_At: new Date(t.createdAt).toLocaleString('ar-EG'),
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tickets");
    XLSX.writeFile(wb, "tickets_report.xlsx");
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
  };

  const statusLabels = {
    pending: 'قيد الانتظار',
    'in-progress': 'قيد التنفيذ',
    resolved: 'تم الحل',
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">لوحة التحكم</h2>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          تصدير إلى Excel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">رقم التذكرة</th>
                <th className="px-6 py-4 font-semibold text-gray-600">العنوان</th>
                <th className="px-6 py-4 font-semibold text-gray-600">الحالة</th>
                <th className="px-6 py-4 font-semibold text-gray-600">التاريخ</th>
                <th className="px-6 py-4 font-semibold text-gray-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    لا توجد تذاكر مسجلة حتى الآن
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-gray-500">#{ticket.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{ticket.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                        {statusLabels[ticket.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={ticket.status}
                        onChange={(e) => updateTicketStatus(ticket.id, e.target.value as TicketStatus)}
                        className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="in-progress">قيد التنفيذ</option>
                        <option value="resolved">تم الحل</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
