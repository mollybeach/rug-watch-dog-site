"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface PriceData {
    price: number;
    volume24h: number;
    marketCap: number;
    liquidity: number;
    timestamp: string;
}

export default function PriceHistoryPage() {
    const [address, setAddress] = useState('');
    const [priceData, setPriceData] = useState<PriceData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPriceHistory = async () => {
        if (!address) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/price-history?address=${address}`);
            const data = await response.json();

            if (data.success) {
                setPriceData(data.data);
            } else {
                setError(data.error || 'Failed to fetch price history');
            }
        } catch (err) {
            setError('Failed to fetch price history');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const preparePriceChart = () => {
        const sortedData = [...priceData].sort((a, b) => 
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        return [{
            type: 'scatter',
            mode: 'lines',
            name: 'Price',
            x: sortedData.map(d => d.timestamp),
            y: sortedData.map(d => d.price),
            line: { color: '#2E7D32' }
        }];
    };

    const prepareVolumeChart = () => {
        const sortedData = [...priceData].sort((a, b) => 
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        return [{
            type: 'bar',
            name: 'Volume',
            x: sortedData.map(d => d.timestamp),
            y: sortedData.map(d => d.volume24h),
            marker: { color: '#1976D2' }
        }];
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Token Price History</h1>

            <div className="flex gap-4 mb-6">
                <Input
                    type="text"
                    placeholder="Enter token address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="max-w-md"
                />
                <Button 
                    onClick={fetchPriceHistory}
                    disabled={!address || loading}
                >
                    {loading ? 'Loading...' : 'Fetch Data'}
                </Button>
            </div>

            {error && (
                <div className="text-red-500 mb-4">
                    Error: {error}
                </div>
            )}

            {priceData.length > 0 && (
                <div className="grid grid-cols-1 gap-6">
                    <Card className="p-4">
                        <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
                        <Plot
                            data={preparePriceChart()}
                            layout={{
                                title: 'Token Price Over Time',
                                xaxis: { title: 'Date' },
                                yaxis: { title: 'Price (USD)' },
                                height: 400
                            }}
                            useResizeHandler
                            style={{ width: '100%' }}
                        />
                    </Card>

                    <Card className="p-4">
                        <h2 className="text-xl font-semibold mb-4">Volume Chart</h2>
                        <Plot
                            data={prepareVolumeChart()}
                            layout={{
                                title: '24h Trading Volume',
                                xaxis: { title: 'Date' },
                                yaxis: { title: 'Volume (USD)' },
                                height: 400
                            }}
                            useResizeHandler
                            style={{ width: '100%' }}
                        />
                    </Card>
                </div>
            )}
        </div>
    );
} 