"use client";

import { AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import type { TokenAnalysis } from "@/types/types";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-pulse" />
  ),
});

export default function RiskMetricsPage() {
  const [data, setData] = useState<TokenAnalysis[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    fetch('/api/risk-metrics')
      .then(res => res.json())
      .then(setData);
  }, []);

  const radarData = [{
    type: 'scatterpolar',
    r: data.length ? [
      data[0].volumeAnomaly * 100,
      data[0].holderConcentration * 100,
      data[0].liquidityScore * 100,
      data[0].priceVolatility * 100,
      data[0].sellPressure * 100,
      data[0].marketCapRisk * 100,
    ] : [],
    theta: [
      'Volume Anomaly',
      'Holder Concentration',
      'Liquidity Score',
      'Price Volatility',
      'Sell Pressure',
      'Market Cap Risk'
    ],
    fill: 'toself',
    name: 'Risk Metrics'
  }] as any;

  // Rest of the component...
} 