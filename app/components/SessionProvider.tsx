// app/components/SessionProvider.tsx
'use client';
import { createContext, useContext } from 'react';

interface SessionContextType {
  username?: string;
  userId?: number;
}

const SessionContext = createContext<SessionContextType>({});

export function SessionProvider({
  children,
  username,
  userId,
}: SessionContextType & { children: React.ReactNode }) {
  return (
    <SessionContext.Provider value={{ username, userId }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
