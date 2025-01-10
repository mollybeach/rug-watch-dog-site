"use client";

import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";

// Create a separate component for the charts
function NFTMarketAnalyticsContent() {
  const Plot = dynamic(
    () => import("react-plotly.js"),
    { 
      ssr: false,
      loading: () => (
        <div className="w-full h-[300px] bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-pulse" />
      )
    }
  );

  return (
    <div className="flex flex-col space-y-8 w-full">
      {/* Trading Volume Chart */}
      <Card className="w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">24h Trading Volume (ETH)</h3>
          <div className="w-full h-[300px]">
            <Plot
              data={[
                {
                  type: 'bar',
                  x: ['BAYC', 'Azuki', 'Doodles', 'CloneX', 'Moonbirds'],
                  y: [1200, 800, 500, 450, 350],
                  marker: {
                    color: 'rgb(59, 130, 246)'
                  }
                }
              ]}
              layout={{
                autosize: true,
                margin: { t: 10, r: 10, b: 40, l: 40 },
                paper_bgcolor: 'transparent',
                plot_bgcolor: 'transparent',
                font: {
                  color: '#666'
                }
              }}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        </div>
      </Card>

      {/* Floor Price Chart */}
      <Card className="w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Floor Price (ETH)</h3>
          <div className="w-full h-[300px]">
            <Plot
              data={[
                {
                  type: 'scatter',
                  mode: 'lines+markers',
                  x: ['BAYC', 'Azuki', 'Doodles', 'CloneX', 'Moonbirds'],
                  y: [35, 20, 15, 12, 8],
                  marker: {
                    color: 'rgb(59, 130, 246)'
                  }
                }
              ]}
              layout={{
                autosize: true,
                margin: { t: 10, r: 10, b: 40, l: 40 },
                paper_bgcolor: 'transparent',
                plot_bgcolor: 'transparent',
                font: {
                  color: '#666'
                }
              }}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        </div>
      </Card>

      {/* Holder Distribution Chart */}
      <Card className="w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Holder Distribution</h3>
          <div className="w-full h-[300px]">
            <Plot
              data={[
                {
                  type: 'pie',
                  labels: ['BAYC', 'Azuki', 'Doodles', 'CloneX', 'Moonbirds'],
                  values: [25, 21.7, 20, 17.5, 15.8],
                  marker: {
                    colors: [
                      'rgb(66, 153, 225)',
                      'rgb(72, 187, 120)',
                      'rgb(159, 122, 234)',
                      'rgb(246, 173, 85)',
                      'rgb(245, 101, 101)'
                    ]
                  }
                }
              ]}
              layout={{
                autosize: true,
                margin: { t: 10, r: 10, b: 10, l: 10 },
                paper_bgcolor: 'transparent',
                showlegend: true,
                legend: {
                  x: 1,
                  y: 0.5
                }
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
}

// Export the dynamically imported component
export const NFTMarketAnalytics = dynamic(
  () => Promise.resolve(NFTMarketAnalyticsContent),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col space-y-8 w-full">
        <Card className="w-full">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Loading...</h3>
            <div className="w-full h-[300px] bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-pulse" />
          </div>
        </Card>
      </div>
    )
  }
); 