import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs font-medium text-white shadow-2xl transition-all dark:border-neutral-700 dark:bg-neutral-900">
      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="rounded p-1 text-neutral-400 hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
