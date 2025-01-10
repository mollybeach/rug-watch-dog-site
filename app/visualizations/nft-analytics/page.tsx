"use client";

import { BarChart3 } from "lucide-react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import type { Layout } from 'plotly.js-dist-min';

const Plot = dynamic(
  () => import("react-plotly.js"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-pulse" />
    )
  }
);

export default function NFTAnalytics() {
  const volumeData = {
    x: ['BAYC', 'Azuki', 'Doodles', 'CloneX', 'Moonbirds'],
    y: [1200, 800, 500, 450, 350],
    type: 'bar',
    marker: {
      color: 'rgba(147, 51, 234, 0.7)',
      line: {
        color: 'rgba(147, 51, 234, 1)',
        width: 1
      }
    },
    hovertemplate: '%{y} ETH<extra></extra>'
  } as any;

  const priceData = {
    x: ['BAYC', 'Azuki', 'Doodles', 'CloneX', 'Moonbirds'],
    y: [35, 20, 15, 12, 8],
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      color: 'rgba(236, 72, 153, 0.7)',
      width: 3
    },
    marker: {
      color: 'rgba(236, 72, 153, 1)',
      size: 8
    },
    hovertemplate: '%{y} ETH<extra></extra>'
  } as any;

  const holderData = {
    values: [25, 21.7, 20, 17.5, 15.8],
    labels: ['BAYC', 'Azuki', 'Doodles', 'CloneX', 'Moonbirds'],
    type: 'pie',
    hole: 0.6,
    marker: {
      colors: [
        'rgba(147, 51, 234, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(16, 185, 129, 0.7)'
      ]
    },
    textinfo: 'label+percent',
    textposition: 'outside',
    hovertemplate: '%{label}: %{value}%<extra></extra>'
  } as any;

  const commonLayout: Partial<Layout> = {
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: {
      color: '#666',
      size: 12
    },
    margin: { t: 30, b: 40, l: 40, r: 20 },
    height: 400,
    autosize: true,
    showlegend: false,
    xaxis: {
      gridcolor: 'rgba(147, 51, 234, 0.1)'
    },
    yaxis: {
      gridcolor: 'rgba(147, 51, 234, 0.1)'
    }
  };

  return (
    <div className="container py-6">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-3xl -z-10" />
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              NFT Analytics
            </h1>
            <p className="text-muted-foreground">
              Detailed analysis of top NFT collections
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">24h Trading Volume</h3>
          <div className="relative">
            <Plot
              data={[volumeData]}
              layout={{
                ...commonLayout,
                yaxis: {
                  title: 'Volume (ETH)',
                  gridcolor: 'rgba(147, 51, 234, 0.1)',
                  zerolinecolor: 'rgba(147, 51, 234, 0.2)'
                },
                xaxis: {
                  gridcolor: 'rgba(147, 51, 234, 0.1)',
                  zerolinecolor: 'rgba(147, 51, 234, 0.2)'
                }
              }}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Floor Price Trends</h3>
          <div className="relative">
            <Plot
              data={[priceData]}
              layout={{
                ...commonLayout,
                yaxis: {
                  title: 'Price (ETH)',
                  gridcolor: 'rgba(236, 72, 153, 0.1)',
                  zerolinecolor: 'rgba(236, 72, 153, 0.2)'
                },
                xaxis: {
                  gridcolor: 'rgba(236, 72, 153, 0.1)',
                  zerolinecolor: 'rgba(236, 72, 153, 0.2)'
                }
              }}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Holder Distribution</h3>
          <div className="relative">
            <Plot
              data={[holderData]}
              layout={{
                ...commonLayout,
                height: 500
              }}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        </Card>
      </div>
    </div>
  );
} 