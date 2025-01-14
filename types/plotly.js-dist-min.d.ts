declare module 'plotly.js-dist-min' {
    export interface Layout {
        title?: string | { text: string };
        xaxis?: {
            title?: string | { text: string };
            type?: 'linear' | 'log' | 'date' | 'category';
            gridcolor?: string;
            showgrid?: boolean;
        };
        yaxis?: {
            title?: string | { text: string };
            gridcolor?: string;
            showgrid?: boolean;
        };
        paper_bgcolor?: string;
        plot_bgcolor?: string;
        showlegend?: boolean;
        height?: number;
        width?: number;
        margin?: {
            l?: number;
            r?: number;
            t?: number;
            b?: number;
            pad?: number;
        };
    }
} 