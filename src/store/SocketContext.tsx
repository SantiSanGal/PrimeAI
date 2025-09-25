import React, { createContext, useContext, useMemo } from 'react';
import { useAuth as useKC } from 'src/store/KeycloakProvider';
import type { Socket } from 'socket.io-client';
import { useSocket } from '@/hooks/useSocket';

type SocketContextValue = {
  socket: Socket | null;
  online: boolean;
  reconnect: () => void;
  disconnect: () => void;
  emitAck: <Req = any, Res = any>(event: string, data?: Req, timeoutMs?: number) => Promise<Res>;
};

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authenticated, initializing, token } = useKC();

  // Solo habilitamos el socket si:
  // - ya terminó el init de KC
  // - hay sesión
  // - existe token vigente
  const enabled = !initializing && authenticated && !!token;

  const { socket, online, reconnect, disconnect, emitAck } = useSocket({
    enabled,
    token: token ?? null,
    withCredentials: true,
    // transports: ['websocket'], // opcional
    debug: import.meta.env.DEV,
    // url: import.meta.env.VITE_SOCKET_URL // opcional
  });

  const value = useMemo<SocketContextValue>(
    () => ({ socket, online, reconnect, disconnect, emitAck }),
    [socket, online, reconnect, disconnect, emitAck]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocketContext must be used within <SocketProvider>');
  return ctx;
};
