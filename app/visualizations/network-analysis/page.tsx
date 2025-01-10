"use client";

import { Network } from "lucide-react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

const Plot = dynamic(
  () => import("react-plotly.js"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-pulse" />
    )
  }
);

export default function NetworkAnalysisPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sample network data
  const nodes = [
    { id: 'BAYC', group: 'collection', size: 35 },
    { id: 'Azuki', group: 'collection', size: 20 },
    { id: 'Doodles', group: 'collection', size: 15 },
    { id: 'CloneX', group: 'collection', size: 12 },
    { id: 'Moonbirds', group: 'collection', size: 8 },
    { id: 'Whale1', group: 'whale', size: 25 },
    { id: 'Whale2', group: 'whale', size: 20 },
    { id: 'Whale3', group: 'whale', size: 15 },
    { id: 'Trader1', group: 'trader', size: 10 },
    { id: 'Trader2', group: 'trader', size: 8 }
  ];

  const links = [
    { source: 'Whale1', target: 'BAYC', value: 15 },
    { source: 'Whale1', target: 'Azuki', value: 10 },
    { source: 'Whale2', target: 'BAYC', value: 12 },
    { source: 'Whale2', target: 'Doodles', value: 8 },
    { source: 'Whale3', target: 'CloneX', value: 6 },
    { source: 'Trader1', target: 'Moonbirds', value: 5 },
    { source: 'Trader1', target: 'Azuki', value: 4 },
    { source: 'Trader2', target: 'Doodles', value: 3 }
  ];

  // Transform data for network visualization
  const networkData = {
    type: 'sankey',
    orientation: 'h',
    node: {
      pad: 15,
      thickness: 20,
      line: {
        color: 'black',
        width: 0.5
      },
      label: nodes.map(n => n.id),
      color: nodes.map(n => {
        switch(n.group) {
          case 'collection':
            return 'rgba(147, 51, 234, 0.7)';
          case 'whale':
            return 'rgba(236, 72, 153, 0.7)';
          case 'trader':
            return 'rgba(59, 130, 246, 0.7)';
          default:
            return 'rgba(107, 114, 128, 0.7)';
        }
      })
    },
    link: {
      source: links.map(l => nodes.findIndex(n => n.id === l.source)),
      target: links.map(l => nodes.findIndex(n => n.id === l.target)),
      value: links.map(l => l.value),
      color: links.map(() => 'rgba(147, 51, 234, 0.2)')
    }
  } as any;

  const layout = {
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    margin: { t: 0, b: 0, l: 0, r: 0 },
    height: 600,
    autosize: true,
    showlegend: false,
    hovermode: 'closest'
  } as const;

  if (!mounted) return null;

  return (
    <div className="container py-6">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-3xl -z-10" />
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
            <Network className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Network Analysis
            </h1>
            <p className="text-muted-foreground">
              NFT ownership network and relationships
            </p>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Ownership Network</h2>
          <p className="text-sm text-muted-foreground">
            Visualization of NFT ownership connections between whales, traders, and collections
          </p>
        </div>
        <div className="relative h-[600px]">
          <Plot
            data={[networkData]}
            layout={layout}
            config={{ 
              responsive: true,
              displayModeBar: false
            }}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler={true}
          />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-sm font-medium">Collections</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500" />
            <span className="text-sm font-medium">Whales</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm font-medium">Traders</span>
          </div>
        </Card>
      </div>
    </div>
  );
} 