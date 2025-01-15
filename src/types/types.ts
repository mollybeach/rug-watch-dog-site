import { ComponentType } from 'react';

export interface NavItem {
    id: string;
    title: string;
    href: string;
    icon: ComponentType;
    label: string;
    description?: string;
    path: string;
}

export interface ButtonProps {
    className?: string;
    // ... other button props
}

export interface HeaderProps {
    title: string;
    description?: string;
    className?: string;
}

export interface SideBarProps {
    items: NavItem[];
    activeItem?: string;
    className?: string;
}

export interface HeaderNavItemsType {
    label: string;
    value: string;
    icon: ComponentType;
}

export interface VisualizationType {
    id: string;
    label: string;
    path: string;
    icon: ComponentType;
    description: string;
} 