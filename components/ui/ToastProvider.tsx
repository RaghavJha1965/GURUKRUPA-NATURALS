"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-forest" aria-hidden="true" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />,
    info: <Info className="w-5 h-5 text-blue-500" aria-hidden="true" />,
  };

  const bgColors = {
    success: "bg-cream-light border-forest/20",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center w-full max-w-sm px-4"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`toast-notification flex items-center gap-3 px-4 py-3 rounded-xl border shadow-product w-full ${
              bgColors[toast.type]
            }`}
          >
            {icons[toast.type]}
            <p className="font-lato text-charcoal text-sm flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-charcoal/40 hover:text-charcoal transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
