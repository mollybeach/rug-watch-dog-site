import { ReactNode } from 'react';
import { VisualizationType } from '@/types/types';

declare module '@/components/Header' {
    interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
        className?: string;
        children?: ReactNode;
    }
}

declare module '@/components/SideBar' {
    interface SideBarProps extends React.HTMLAttributes<HTMLElement> {
        className?: string;
        children?: ReactNode;
        visualizations: VisualizationType[];
        currentViz: string;
    }
} 