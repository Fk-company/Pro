import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Problem } from './types';

interface StoreContextType {
  problems: Problem[];
  addProblem: (problem: Omit<Problem, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'status' | 'adminNotes' | 'maintenanceNotes' | 'assignedTo'>) => string;
  updateProblem: (id: string, updates: Partial<Problem>) => void;
  deleteProblem: (id: string) => void;
  getProblemByTicket: (ticket: string) => Problem | undefined;
  searchProblems: (query: string) => Problem[];
  notifications: Notification[];
  addNotification: (msg: string, type: 'success' | 'info' | 'warning') => void;
  clearNotification: (id: string) => void;
}

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  timestamp: number;
}

const StoreContext = createContext<StoreContextType | null>(null);

function generateTicketNumber(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = (now.getMonth() + 1).toString().padStart(2, '0');
  const d = now.getDate().toString().padStart(2, '0');
  const r = Math.floor(1000 + Math.random() * 9000);
  return `TK-${y}${m}${d}-${r}`;
}

const sampleProblems: Problem[] = [
  {
    id: '1',
    ticketNumber: 'TK-250115-1001',
    title: 'عطل في نظام التكييف المركزي',
    description: 'نظام التكييف في الطابق الثالث لا يعمل منذ أمس، درجة الحرارة مرتفعة جداً والموظفون يعانون.',
    category: 'صيانة',
    priority: 'A',
    status: 'in-progress',
    location: 'المبنى الرئيسي - الطابق الثالث',
    reportedBy: 'أحمد محمد العلي',
    phone: '0501234567',
    email: 'ahmed@example.com',
    images: [],
    createdAt: '2025-01-15T08:30:00',
    updatedAt: '2025-01-15T10:00:00',
    adminNotes: 'تم تحويل الطلب لفريق الصيانة بشكل عاجل',
    maintenanceNotes: 'جاري فحص الوحدة الخارجية',
    assignedTo: 'فريق الصيانة العامة',
  },
  {
    id: '2',
    ticketNumber: 'TK-250114-1002',
    title: 'تسرب مياه في دورة المياه',
    description: 'يوجد تسرب مياه كبير في دورة المياه بالطابق الأول، المياه تتسرب من السقف',
    category: 'سباكة',
    priority: 'A',
    status: 'transferred',
    location: 'المبنى الفرعي - الطابق الأول',
    reportedBy: 'سارة عبدالله',
    phone: '0559876543',
    email: 'sara@example.com',
    images: [],
    createdAt: '2025-01-14T14:20:00',
    updatedAt: '2025-01-14T16:00:00',
    adminNotes: 'حالة طارئة - تم التحويل فوراً',
    maintenanceNotes: '',
    assignedTo: 'فريق السباكة',
  },
  {
    id: '3',
    ticketNumber: 'TK-250113-1003',
    title: 'أعطال في الإضاءة',
    description: 'عدة مصابيح لا تعمل في الممر الرئيسي',
    category: 'كهرباء',
    priority: 'B',
    status: 'completed',
    location: 'المبنى الرئيسي - الممر الرئيسي',
    reportedBy: 'خالد الجهني',
    phone: '0541112233',
    email: 'khaled@example.com',
    images: [],
    createdAt: '2025-01-13T09:00:00',
    updatedAt: '2025-01-14T11:30:00',
    adminNotes: 'تم المعالجة بنجاح',
    maintenanceNotes: 'تم استبدال 5 مصابيح LED',
    assignedTo: 'فريق الكهرباء',
  },
  {
    id: '4',
    ticketNumber: 'TK-250112-1004',
    title: 'باب المكتب لا يغلق بشكل صحيح',
    description: 'باب المكتب رقم 205 لا يغلق بإحكام، المفصلة تحتاج صيانة',
    category: 'نجارة',
    priority: 'C',
    status: 'new',
    location: 'المبنى الرئيسي - مكتب 205',
    reportedBy: 'نورة السليم',
    phone: '0567778899',
    email: 'noura@example.com',
    images: [],
    createdAt: '2025-01-12T11:45:00',
    updatedAt: '2025-01-12T11:45:00',
    adminNotes: '',
    maintenanceNotes: '',
    assignedTo: '',
  },
  {
    id: '5',
    ticketNumber: 'TK-250110-1005',
    title: 'مشكلة في شبكة الإنترنت',
    description: 'الإنترنت بطيء جداً في قسم المحاسبة والأنظمة لا تعمل بشكل صحيح',
    category: 'شبكات',
    priority: 'A',
    status: 'fixed',
    location: 'المبنى الرئيسي - قسم المحاسبة',
    reportedBy: 'عبدالرحمن القحطاني',
    phone: '0533334455',
    email: 'abdulrahman@example.com',
    images: [],
    createdAt: '2025-01-10T07:30:00',
    updatedAt: '2025-01-11T14:00:00',
    adminNotes: 'تم الحل',
    maintenanceNotes: 'تم استبدال السويتش الرئيسي وإعادة تهيئة الشبكة',
    assignedTo: 'فريق تقنية المعلومات',
  },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>(sampleProblems);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: 'success' | 'info' | 'warning') => {
    const n: Notification = { id: Date.now().toString(), message, type, timestamp: Date.now() };
    setNotifications(prev => [n, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(x => x.id !== n.id));
    }, 5000);
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(x => x.id !== id));
  }, []);

  const addProblem = useCallback((data: Omit<Problem, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'status' | 'adminNotes' | 'maintenanceNotes' | 'assignedTo'>) => {
    const ticket = generateTicketNumber();
    const now = new Date().toISOString();
    const newProblem: Problem = {
      ...data,
      id: Date.now().toString(),
      ticketNumber: ticket,
      status: 'new',
      createdAt: now,
      updatedAt: now,
      adminNotes: '',
      maintenanceNotes: '',
      assignedTo: '',
    };
    setProblems(prev => [newProblem, ...prev]);
    addNotification(`تم استلام البلاغ رقم ${ticket}`, 'success');
    return ticket;
  }, [addNotification]);

  const updateProblem = useCallback((id: string, updates: Partial<Problem>) => {
    setProblems(prev => prev.map(p =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    ));
  }, []);

  const deleteProblem = useCallback((id: string) => {
    setProblems(prev => prev.filter(p => p.id !== id));
  }, []);

  const getProblemByTicket = useCallback((ticket: string) => {
    return problems.find(p => p.ticketNumber.toLowerCase() === ticket.toLowerCase());
  }, [problems]);

  const searchProblems = useCallback((query: string) => {
    if (!query.trim()) return problems;
    const q = query.toLowerCase();
    return problems.filter(p =>
      p.ticketNumber.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.reportedBy.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      p.location.toLowerCase().includes(q)
    );
  }, [problems]);

  return (
    <StoreContext.Provider value={{
      problems, addProblem, updateProblem, deleteProblem,
      getProblemByTicket, searchProblems,
      notifications, addNotification, clearNotification,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
