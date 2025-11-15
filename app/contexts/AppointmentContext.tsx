"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AppointmentContextType {
  isOpen: boolean;
  openAppointment: () => void;
  closeAppointment: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAppointment = () => {
    setIsOpen(true);
  };

  const closeAppointment = () => {
    setIsOpen(false);
  };

  return (
    <AppointmentContext.Provider value={{ isOpen, openAppointment, closeAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointment must be used within an AppointmentProvider");
  }
  return context;
}

