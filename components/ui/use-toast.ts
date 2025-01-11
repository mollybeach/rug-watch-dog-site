/*import { useState } from "react";

interface Toast {
  id: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (props: Omit<Toast, "id">) => {
    const id = Math.random().toString();
    setToasts(prev => [...prev, { ...props, id }]);
  };

  return { toasts, toast };
}
*/