"use client";

import React, { useState, useEffect } from "react";
import { LineChart } from "lucide-react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import('react-plotly.js'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-muted-foreground">Loading price data...</div>
    </div>
});

const COLORS = {
    primary: 'rgba(147, 51, 234, 0.7)',
    secondary: 'rgba(236, 72, 153, 0.7)',
    tertiary: 'rgba(59, 130, 246, 0.7)'
};

const PriceHistory: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Generate mock historical price data
        const generatePriceHistory = () => {
            const now = new Date();
            const dates = Array.from({length: 30}, (_, i) => {
                const date = new Date(now);
                date.setDate(date.getDate() - (29 - i));
                return date;
            });

            return {
                dates,
                bayc: dates.map((_, i) => 50 + Math.sin(i/3) * 10 + Math.random() * 5),
                azuki: dates.map((_, i) => 30 + Math.cos(i/4) * 8 + Math.random() * 4),
                punk: dates.map((_, i) => 80 + Math.sin(i/2) * 15 + Math.random() * 6),
            };
        };

        setData([generatePriceHistory()]);
    }, []);

    const plotData = [
        {
            x: data[0]?.dates || [],
            y: data[0]?.bayc || [],
            type: 'scatter',
            mode: 'lines',
            name: 'BAYC',
            line: { color: COLORS.primary }
        },
        {
            x: data[0]?.dates || [],
            y: data[0]?.azuki || [],
            type: 'scatter',
            mode: 'lines',
            name: 'Azuki',
            line: { color: COLORS.secondary }
        },
        {
            x: data[0]?.dates || [],
            y: data[0]?.punk || [],
            type: 'scatter',
            mode: 'lines',
            name: 'CryptoPunks',
            line: { color: COLORS.tertiary }
        }
    ] as any[];

    const layout = {
        title: '30-Day Price History (ETH)',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
            title: 'Date',
            gridcolor: '#f0f0f0'
        },
        yaxis: {
            title: 'Floor Price (ETH)',
            gridcolor: '#f0f0f0'
        },
        showlegend: true,
        height: 500
    } as any;

    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <LineChart className="h-5 w-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Historical Price Analysis</h2>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                {data.length > 0 && (
                    <Plot
                        data={plotData}
                        layout={layout}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                )}
            </div>
        </div>
    );
};

const PriceHistoryPage = PriceHistory;
export default PriceHistoryPage; 