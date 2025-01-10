"use client";

import React, { useState, useEffect } from "react";
import { LineChart } from "lucide-react";
import dynamic from "next/dynamic";
import { colorData } from "@/lib/data/color_data";

const Plot = dynamic(() => import('react-plotly.js'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-muted-foreground">Loading price data...</div>
    </div>
});

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

    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <LineChart className="h-5 w-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Historical Price Analysis</h2>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                {data.length > 0 && (
                    <Plot
                        data={[
                            {
                                x: data[0].dates,
                                y: data[0].bayc,
                                type: 'scatter',
                                mode: 'lines',
                                name: 'BAYC',
                                line: { color: colorData.significant }
                            },
                            {
                                x: data[0].dates,
                                y: data[0].azuki,
                                type: 'scatter',
                                mode: 'lines',
                                name: 'Azuki',
                                line: { color: colorData.default }
                            },
                            {
                                x: data[0].dates,
                                y: data[0].punk,
                                type: 'scatter',
                                mode: 'lines',
                                name: 'CryptoPunks',
                                line: { color: colorData['non-significant'] }
                            }
                        ]}
                        layout={{
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
                            legend: {
                                x: 0,
                                y: 1,
                                bgcolor: 'rgba(255,255,255,0.8)'
                            },
                            height: 500
                        }}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                )}
            </div>
        </div>
    );
};

export default PriceHistory; 