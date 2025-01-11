"use client";

import { useState, useEffect } from "react";
import { LineChart } from "lucide-react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px]">
      <div className="animate-pulse text-muted-foreground">Loading price data...</div>
    </div>
  )
});

const COLORS = {
  primary: '#8b5cf6',    // Purple
  secondary: '#ec4899',  // Pink
  tertiary: '#3b82f6',   // Blue
  background: 'rgba(0, 0, 0, 0)',
  grid: 'rgba(148, 163, 184, 0.1)'
};

export default function PriceHistory() {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    generateMockData();
  }, []);

  const generateMockData = () => {
    const now = new Date();
    const dates = Array.from({length: 30}, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (29 - i));
      return date;
    });

    setData([{
      dates,
      bayc: dates.map((_, i) => 50 + Math.sin(i/3) * 10 + Math.random() * 5),
      azuki: dates.map((_, i) => 30 + Math.cos(i/4) * 8 + Math.random() * 4),
      punk: dates.map((_, i) => 80 + Math.sin(i/2) * 15 + Math.random() * 6),
    }]);
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  const plotData = [
    {
      x: data[0]?.dates,
      y: data[0]?.bayc,
      type: 'scatter',
      mode: 'lines',
      name: 'BAYC',
      line: {
        color: COLORS.primary,
        width: 3,
        shape: 'spline'
      },
      hovertemplate: '%{y:.2f} ETH<br>%{x|%b %d}'
    },
    {
      x: data[0]?.dates,
      y: data[0]?.azuki,
      type: 'scatter',
      mode: 'lines',
      name: 'Azuki',
      line: {
        color: COLORS.secondary,
        width: 3,
        shape: 'spline'
      },
      hovertemplate: '%{y:.2f} ETH<br>%{x|%b %d}'
    },
    {
      x: data[0]?.dates,
      y: data[0]?.punk,
      type: 'scatter',
      mode: 'lines',
      name: 'CryptoPunks',
      line: {
        color: COLORS.tertiary,
        width: 3,
        shape: 'spline'
      },
      hovertemplate: '%{y:.2f} ETH<br>%{x|%b %d}'
    }
  ];

  const layout = {
    title: {
      text: '30-Day Price History',
      font: {
        size: 24,
        color: '#64748b'
      }
    },
    paper_bgcolor: COLORS.background,
    plot_bgcolor: COLORS.background,
    xaxis: {
      title: 'Date',
      gridcolor: COLORS.grid,
      zeroline: false,
      showline: true,
      linecolor: COLORS.grid,
      tickformat: '%b %d'
    },
    yaxis: {
      title: 'Floor Price (ETH)',
      gridcolor: COLORS.grid,
      zeroline: false,
      showline: true,
      linecolor: COLORS.grid
    },
    showlegend: true,
    legend: {
      bgcolor: COLORS.background,
      bordercolor: COLORS.grid,
      borderwidth: 1
    },
    hovermode: 'x unified',
    hoverlabel: {
      bgcolor: '#1e293b',
      font: { color: '#ffffff' }
    },
    margin: { t: 60, r: 20, b: 40, l: 60 },
    height: 500,
    autosize: true
  };

  const config = {
    responsive: true,
    displayModeBar: false
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <LineChart className="h-5 w-5 text-purple-500" />
        <h2 className="text-xl font-semibold">Historical Price Analysis</h2>
      </div>

      <Card className="p-4">
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          className="w-full"
        />
      </Card>
    </div>
  );
} 