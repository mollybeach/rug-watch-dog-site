/**
 * @title Data Page
 * @fileoverview Data page component
 * @path /lib/data/page.tsx
 */

import { Coins, BarChart2, FileText, Users, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    name: "Total Transactions",
    value: "1,492,305",
    change: "+12.3%",
    icon: Coins,
  },
  {
    name: "Active Wallets",
    value: "48,921",
    change: "+23.1%",
    icon: Users,
  },
  {
    name: "Trading Volume",
    value: "489 ETH",
    change: "+5.4%",
    icon: BarChart2,
  },
  {
    name: "Smart Contracts",
    value: "2,604",
    change: "+15.8%",
    icon: FileText,
  }
];

const marketData = {
  "Meme Coins": {
    tokens: 1532,
    volume: "2.3M ETH",
    risk_score: "High",
    rugs_detected: 89
  },
  "DeFi Tokens": {
    tokens: 892,
    volume: "5.1M ETH",
    risk_score: "Medium",
    rugs_detected: 23
  },
  "NFT Projects": {
    tokens: 2341,
    volume: "1.8M ETH",
    risk_score: "Medium-High",
    rugs_detected: 156
  }
};

export default function DataPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with gradient */}
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl blur-3xl -z-10" />
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-xl">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
              Market Analytics
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Real-time insights into{" "}
              <span className="font-medium text-purple-600 dark:text-purple-400">token markets</span>
              {" "}and{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">trading activity</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <Card className="p-6 border-t-4 border-t-pink-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-6 w-6 text-pink-500" />
                <span className={`text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</h3>
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Market Segments */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
          Market Segments Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(marketData).map(([segment, data]) => (
            <div key={segment} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg 
                                        border-t-4 border-t-pink-500 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                {segment}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Active Tokens</span>
                  <span className="font-medium">{data.tokens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Trading Volume</span>
                  <span className="font-medium">{data.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Risk Score</span>
                  <span className={`font-medium px-2 py-1 rounded-full text-sm ${
                    data.risk_score === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                    data.risk_score === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  }`}>
                    {data.risk_score}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rugs Detected</span>
                  <span className="font-medium text-red-500">{data.rugs_detected}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Card className="mt-12 p-6 bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-800/50 dark:to-purple-900/10">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Data updated every 5 minutes. All figures are estimates based on on-chain analysis.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Risk scores are calculated using our proprietary AI algorithm analyzing multiple factors including:
          </p>
          <ul className="list-disc list-inside mt-2 ml-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>Token contract analysis</li>
            <li>Liquidity patterns</li>
            <li>Wallet concentration</li>
            <li>Trading patterns</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}