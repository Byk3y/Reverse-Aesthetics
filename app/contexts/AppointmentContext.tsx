"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AppointmentContextType {
  isOpen: boolean;
  selectedService: string | null;
  openAppointment: (service?: string) => void;
  closeAppointment: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const openAppointment = (service?: string) => {
    if (service) setSelectedService(service);
    setIsOpen(true);
  };

  const closeAppointment = () => {
    setIsOpen(false);
    setSelectedService(null);
  };

  return (
    <AppointmentContext.Provider value={{ isOpen, selectedService, openAppointment, closeAppointment }}>
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

