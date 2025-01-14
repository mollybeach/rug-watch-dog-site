"use client";

import { LineChart } from "lucide-react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";

const Plot = dynamic(
  () => import("react-plotly.js"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-pulse" />
    )
  }
);

export default function MarketRiskRadar() {
  const data = [{
    type: 'scatterpolar',
    r: [85, 75, 90, 65, 80, 70],
    theta: ['Liquidity', 'Volume', 'Holders', 'Age', 'Transactions', 'Liquidity'],
    fill: 'toself',
    name: 'Risk Score',
    line: {
      color: 'rgba(147, 51, 234, 0.7)'
    },
    fillcolor: 'rgba(147, 51, 234, 0.2)'
  }] as any[];

  const layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 100],
        tickfont: { size: 10 },
        gridcolor: 'rgba(147, 51, 234, 0.1)',
        linecolor: 'rgba(147, 51, 234, 0.2)'
      },
      angularaxis: {
        tickfont: { size: 12 },
        gridcolor: 'rgba(147, 51, 234, 0.1)',
        linecolor: 'rgba(147, 51, 234, 0.2)'
      },
      bgcolor: 'transparent'
    },
    showlegend: false,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    margin: { t: 50, b: 50, l: 50, r: 50 },
    font: {
      color: '#666'
    },
    height: 500,
    width: undefined,
    autosize: true
  };

  return (
    <div className="container py-6">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-3xl -z-10" />
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
            <LineChart className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Market Risk Analysis
            </h1>
            <p className="text-muted-foreground">
              Real-time risk assessment radar for NFT collections
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Risk Radar</h2>
            <p className="text-sm text-muted-foreground">
              Comprehensive risk analysis across key metrics
            </p>
          </div>
          <div className="relative">
            <Plot
              data={data}
              layout={layout}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.name} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{metric.name}</p>
                  <p className={`text-lg font-semibold ${metric.valueColor}`}>
                    {metric.value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const metrics = [
  {
    name: 'Overall Risk Score',
    value: '78/100',
    icon: LineChart,
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-500',
    valueColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    name: 'Liquidity Health',
    value: '85%',
    icon: LineChart,
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
    iconColor: 'text-pink-500',
    valueColor: 'text-pink-600 dark:text-pink-400'
  },
  {
    name: 'Holder Distribution',
    value: '90/100',
    icon: LineChart,
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-500',
    valueColor: 'text-blue-600 dark:text-blue-400'
  }
]; 