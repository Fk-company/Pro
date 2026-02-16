import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TicketStatus = 'pending' | 'in-progress' | 'resolved';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  status: TicketStatus;
  createdAt: string;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'status'>) => string;
  getTicket: (id: string) => Ticket | undefined;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

export const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'status'>) => {
    const id = Math.random().toString(36).substring(2, 9).toUpperCase();
    const newTicket: Ticket = {
      ...ticketData,
      id,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setTickets((prev) => [newTicket, ...prev]);
    return id;
  };

  const getTicket = (id: string) => {
    return tickets.find((t) => t.id === id);
  };

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, getTicket, updateTicketStatus }}>
      {children}
    </TicketContext.Provider>
  );
};
