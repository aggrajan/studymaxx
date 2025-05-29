// context/QRProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { RehydrationContext } from "@/app/StoreProvider";
import { useAppSelector } from "@/lib/hooks";

export interface QRCode {
  _id: string;
  code: string;
  url: string;
  createdAt: string;
}

interface QRContextType {
  qrCodes: QRCode[] | null;
  loading: boolean;
  error: string | null;
  refreshQRCodes: () => void;
}

const QRContext = createContext<QRContextType | undefined>(undefined);

export const QRProvider = ({ children }: { children: React.ReactNode }) => {
  const [qrCodes, setQrCodes] = useState<QRCode[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { rehydrated } = useContext(RehydrationContext);
  const userPresent = useAppSelector(state => state.auth.userPresent);

  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr`);
      if (!res.ok) throw new Error("Failed to fetch QR Codes");
      const json = await res.json();
      setQrCodes(json.response);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setQrCodes(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!rehydrated) return ;
    fetchQRCodes();
  }, [rehydrated, userPresent]);

  return (
    <QRContext.Provider value={{ qrCodes, loading, error, refreshQRCodes: fetchQRCodes }}>
      {children}
    </QRContext.Provider>
  );
};

export const useQRContext = () => {
  const context = useContext(QRContext);
  if (!context) throw new Error("useQRContext must be used within a QRProvider");
  return context;
};
