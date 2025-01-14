"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Rename dynamic import to avoid conflict
const DynamicPlot = dynamic(() => import('react-plotly.js'), { ssr: false });

// Add config object for page behavior
export const config = {
    runtime: 'edge',
    dynamic: 'force-dynamic'
};

interface RiskMetrics {
    address: string;
    name: string;
    symbol: string;
    holders: number;
    total_supply: number;
    marketCap: string;
    volume_24h: string;
    current_price: string;
    volumeAnomaly: number;
    holderConcentration: number;
    liquidityScore: number;
    priceVolatility: number;
    sellPressure: number;
    is_honeypot: boolean;
    isRugPull: boolean;
    riskScore: string;
    riskCategory: 'High' | 'Medium' | 'Low';
}

interface MetricsResponse {
    success: boolean;
    data: RiskMetrics[];
    error?: string;
    metadata: {
        totalTokens: number;
        highRiskCount: number;
        mediumRiskCount: number;
        lowRiskCount: number;
        timestamp: string;
        is_stale?: boolean;
    };
}

function formatPrice(price: string | number | null | undefined): string {
    if (price === null || price === undefined) {
        return '0.0000';
    }
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toFixed(4);
}

function formatLargeNumber(num: string | number | null | undefined): string {
    if (num === null || num === undefined) {
        return '0';
    }
    const value = typeof num === 'string' ? parseFloat(num) : num;
    
    if (value >= 1e9) {
        return (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M';
    } else if (value >= 1e3) {
        return (value / 1e3).toFixed(2) + 'K';
    }
    return value.toFixed(2);
}

export default function RiskMetricsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<RiskMetrics[]>([]);
    const [metadata, setMetadata] = useState<MetricsResponse['metadata'] | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                // Set up AbortController for client-side timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

                const response = await fetch('/api/risk-metrics', {
                    signal: controller.signal,
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                });
                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorText = await response.text();
                    let errorMessage;
                    try {
                        const errorData = JSON.parse(errorText);
                        errorMessage = errorData.error || errorData.message || 'Failed to fetch risk metrics';
                    } catch {
                        errorMessage = errorText || 'Failed to fetch risk metrics';
                    }
                    throw new Error(errorMessage);
                }

                const result: MetricsResponse = await response.json();
                
                if (!result.success) {
                    throw new Error(result.error || 'Failed to fetch risk metrics');
                }

                setData(result.data);
                setMetadata(result.metadata);
            } catch (err) {
                console.error('Error fetching risk metrics:', err);
                let errorMessage = 'An unexpected error occurred';
                if (err instanceof Error) {
                    if (err.name === 'AbortError') {
                        errorMessage = 'Request timed out. The server is taking too long to respond.';
                    } else {
                        errorMessage = err.message;
                    }
                }
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                    <p>Loading risk metrics...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-600">
                    <h2 className="text-xl font-bold mb-2">Error</h2>
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Prepare data for radar chart
    const highRiskAvg = calculateAverageMetrics(data.filter(m => m.riskCategory === 'High'));
    const mediumRiskAvg = calculateAverageMetrics(data.filter(m => m.riskCategory === 'Medium'));
    const lowRiskAvg = calculateAverageMetrics(data.filter(m => m.riskCategory === 'Low'));

    const radarData = [
        {
            type: 'scatterpolar',
            r: Object.values(highRiskAvg),
            theta: getMetricLabels(),
            fill: 'toself',
            name: 'High Risk',
            line: { color: 'rgba(239, 68, 68, 0.8)' }
        },
        {
            type: 'scatterpolar',
            r: Object.values(mediumRiskAvg),
            theta: getMetricLabels(),
            fill: 'toself',
            name: 'Medium Risk',
            line: { color: 'rgba(234, 179, 8, 0.8)' }
        },
        {
            type: 'scatterpolar',
            r: Object.values(lowRiskAvg),
            theta: getMetricLabels(),
            fill: 'toself',
            name: 'Low Risk',
            line: { color: 'rgba(34, 197, 94, 0.8)' }
        }
    ] as any;

    const layout = {
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 1]
            }
        },
        showlegend: true,
        title: 'Risk Metrics by Category',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: { t: 50, r: 50, b: 50, l: 50 }
    } as any;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Risk Metrics Dashboard</h1>
            
            {metadata && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="p-4">
                        <h3 className="text-sm font-medium text-gray-500">Total Tokens</h3>
                        <p className="text-2xl font-bold">{metadata.totalTokens}</p>
                    </Card>
                    <Card className="p-4 bg-red-50">
                        <h3 className="text-sm font-medium text-red-500">High Risk</h3>
                        <p className="text-2xl font-bold text-red-600">{metadata.highRiskCount}</p>
                    </Card>
                    <Card className="p-4 bg-yellow-50">
                        <h3 className="text-sm font-medium text-yellow-500">Medium Risk</h3>
                        <p className="text-2xl font-bold text-yellow-600">{metadata.mediumRiskCount}</p>
                    </Card>
                    <Card className="p-4 bg-green-50">
                        <h3 className="text-sm font-medium text-green-500">Low Risk</h3>
                        <p className="text-2xl font-bold text-green-600">{metadata.lowRiskCount}</p>
                    </Card>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                    <DynamicPlot
                        data={radarData}
                        layout={layout}
                        useResizeHandler
                        style={{ width: '100%', height: '500px' }}
                    />
                </Card>

                <Card className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Recent Token Analysis</h2>
                    <div className="overflow-auto max-h-[500px]">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400 bg-transparent">
                                        Token
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400 bg-transparent">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400 bg-transparent">
                                        Volume (24h)
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400 bg-transparent">
                                        Market Cap
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400 bg-transparent">
                                        Risk Score
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400 bg-transparent">
                                        Category
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {data.map((token) => (
                                    <tr key={token.address} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            <div>
                                                <div className="font-medium">{token.symbol}</div>
                                                <div className="text-sm text-gray-500">{token.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2">
                                            ${formatPrice(token.current_price)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {formatLargeNumber(token.volume_24h)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {formatLargeNumber(token.marketCap)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {token.riskScore}
                                        </td>
                                        <td className="px-4 py-2">
                                            <Badge className={
                                                token.riskCategory === 'High' ? 'bg-red-100 text-red-800' :
                                                token.riskCategory === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }>
                                                {token.riskCategory}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function calculateAverageMetrics(tokens: RiskMetrics[]) {
    if (!tokens.length) return {
        volumeAnomaly: 0,
        holderConcentration: 0,
        liquidityScore: 0,
        priceVolatility: 0,
        sellPressure: 0
    };

    return {
        volumeAnomaly: tokens.reduce((sum, t) => sum + t.volumeAnomaly, 0) / tokens.length,
        holderConcentration: tokens.reduce((sum, t) => sum + t.holderConcentration, 0) / tokens.length,
        liquidityScore: tokens.reduce((sum, t) => sum + t.liquidityScore, 0) / tokens.length,
        priceVolatility: tokens.reduce((sum, t) => sum + t.priceVolatility, 0) / tokens.length,
        sellPressure: tokens.reduce((sum, t) => sum + t.sellPressure, 0) / tokens.length
    };
}

function getMetricLabels() {
    return [
        'Volume Anomaly',
        'Holder Concentration',
        'Liquidity Score',
        'Price Volatility',
        'Sell Pressure'
    ];
} 