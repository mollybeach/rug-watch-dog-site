"use client";

//import { Card } from "@/components/ui/card";
//import dynamic from "next/dynamic";
//import type { PlotData } from 'plotly.js-dist-min';
/*
const Plot = dynamic(
  () => import("react-plotly.js"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-pulse" />
    )
  }
);

const NFTMarketAnalytics: React.FC = () => {
  const volumeData = {
    type: 'bar',
    x: ['BAYC', 'Azuki', 'Doodles', 'CloneX', 'Moonbirds'] as const,
    y: [1200, 800, 500, 450, 350] as const,
    marker: {
      color: 'rgb(147, 51, 234)'
    }
  } as any;

  const priceData = {
    type: 'scatter',
    mode: 'lines+markers',
    x: ['BAYC', 'Azuki', 'Doodles', 'CloneX', 'Moonbirds'] as const,
    y: [35, 20, 15, 12, 8] as const,
    line: { color: 'rgb(236, 72, 153)' }
  } as any;

  const holderData = {
    type: 'pie',
    labels: ['BAYC', 'Azuki', 'Doodles', 'CloneX', 'Moonbirds'] as const,
    values: [25, 21.7, 20, 17.5, 15.8] as const,
    hole: 0.4,
    marker: {
      colors: [
        'rgb(147, 51, 234)',
        'rgb(236, 72, 153)',
        'rgb(59, 130, 246)',
        'rgb(245, 158, 11)',
        'rgb(16, 185, 129)'
      ]
    }
  } as any;

  const commonLayout = {
    autosize: true,
    margin: { t: 10, r: 10, b: 40, l: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#666' }
  } as const;

  return (
    <div className="flex flex-col space-y-8 w-full">
      <Card className="w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">24h Trading Volume (ETH)</h3>
          <div className="w-full h-[300px]">
            <Plot
              data={[volumeData]}
              layout={commonLayout}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        </div>
      </Card>

      <Card className="w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Floor Price (ETH)</h3>
          <div className="w-full h-[300px]">
            <Plot
              data={[priceData]}
              layout={commonLayout}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        </div>
      </Card>

      <Card className="w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Holder Distribution</h3>
          <div className="w-full h-[300px]">
            <Plot
              data={[holderData]}
              layout={{
                ...commonLayout,
                showlegend: true,
                legend: { x: 1, y: 0.5 }
              }}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NFTMarketAnalytics; */