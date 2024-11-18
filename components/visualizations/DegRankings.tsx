"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Download, ZoomIn, ZoomOut, RotateCcw, BarChart2, ArrowUp, ArrowDown } from "lucide-react";

interface RankingData {
  id: string;
  geneName: string;
  logFC: number;
  pValue: number;
  fdr: number;
  significant: boolean;
  treatment: 'CsA' | 'VOC';
  rank: number;
}

export const DegRankings: React.FC = () => {
  const [rankingsData, setRankingsData] = useState<RankingData[]>([]);

  useEffect(() => {
    fetchRankingsData();
  }, []);

  const fetchRankingsData = async () => {
    try {
      const response = await fetch('/api/data/deg-rankings');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRankingsData(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="h-4 w-4 text-blue-500" />
        <h2 className="text-lg font-semibold">DEG Rankings</h2>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 p-1 rounded-md shadow-sm">
              <span className="text-[9px] font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
                LOG2FC:
              </span>
              <Input
                type="number"
                placeholder="1.5"
                className="w-14 h-6 text-[9px]"
                step="0.1"
                min="0"
              />
            </div>

            <Select defaultValue="csa">
              <SelectTrigger className="w-48 h-6 bg-white dark:bg-slate-900 text-xs">
                <SelectValue placeholder="Treatment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csa">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                    CsA vs Control
                  </span>
                </SelectItem>
                <SelectItem value="voc">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                    VOC vs Control
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="bg-white dark:bg-slate-900 p-0.5 rounded-md flex items-center space-x-0.5">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg h-[calc(100%-3rem)] overflow-y-auto">
          {rankingsData.length > 0 ? (
            <div className="w-full space-y-1 p-2">
              {rankingsData.slice(0, 10).map((item, index) => (
                <div 
                  key={item.id}
                  className="relative flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-all group"
                >
                  <div className="absolute -left-1 -top-1 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold">
                    {index + 1}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
                        {item.geneName}
                      </span>
                      <span className="text-[9px] text-slate-500">
                        {item.treatment} treatment
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <div className={`flex items-center px-2 py-0.5 rounded-full ${
                      item.logFC > 0 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {item.logFC > 0 ? (
                        <ArrowUp className="w-2 h-2 mr-1" />
                      ) : (
                        <ArrowDown className="w-2 h-2 mr-1" />
                      )}
                      <span className="font-mono text-[10px] font-medium">
                        {Math.abs(item.logFC).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-[8px] text-slate-500">
                      p={item.pValue.toExponential(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground">DEG Rankings Visualization</p>
              <p className="text-sm text-muted-foreground mt-2">Top differentially expressed genes ranked by fold change</p>
              <p className="text-xs text-muted-foreground mt-1">CsA: 1,492 DEGs | VOC: 489 DEGs (FDR &lt; 0.05)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DegRankings;