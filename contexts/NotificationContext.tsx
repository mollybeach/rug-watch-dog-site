/*import React, { createContext, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationContextType {
    showNotification: (type: NotificationType, title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const getVariant = (type: NotificationType): 'default' | 'destructive' => {
    switch (type) {
        case 'error':
            return 'destructive';
        default:
            return 'default';
    }
};

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();

    const showNotification = (type: NotificationType, title: string, message: string) => {
        toast({
            variant: getVariant(type),
            title: title,
            description: message,
        });
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
} */