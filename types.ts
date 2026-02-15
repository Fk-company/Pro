export type ProblemStatus = 'new' | 'in-progress' | 'transferred' | 'completed' | 'fixed' | 'needs-followup' | 'cannot-fix';
export type PriorityLevel = 'A' | 'B' | 'C';

export interface Problem {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: string;
  priority: PriorityLevel;
  status: ProblemStatus;
  location: string;
  reportedBy: string;
  phone: string;
  email: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  adminNotes: string;
  maintenanceNotes: string;
  assignedTo: string;
}

export type ActiveView = 'submit' | 'search' | 'admin-login' | 'admin' | 'maintenance';
