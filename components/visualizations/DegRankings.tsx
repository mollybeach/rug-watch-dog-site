"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Download, ZoomIn, ZoomOut, RotateCcw, BarChart2 } from "lucide-react";

export const DegRankings: React.FC = () => {
  return (
    <div className="p-6 border-t-4 border-t-blue-500">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Differentially Expressed Genes Ranking</h2>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 h-[calc(100vh-24rem)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1.5 rounded-md shadow-sm">
              <span className="text-[10px] font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
                LOG2FC:
              </span>
              <Input
                type="number"
                placeholder="1.5"
                className="w-16 h-6 text-[10px]"
                step="0.1"
                min="0"
              />
            </div>

            <Select defaultValue="csa">
              <SelectTrigger className="w-28 h-7 bg-white dark:bg-slate-900">
                <SelectValue placeholder="Treatment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csa">CsA vs Control</SelectItem>
                <SelectItem value="voc">VOC vs Control</SelectItem>
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
        
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg h-[calc(100%-4rem)] flex items-center justify-center border border-slate-200 dark:border-slate-700">
          <div className="text-center">
            <p className="text-muted-foreground">DEG Rankings Visualization</p>
            <p className="text-sm text-muted-foreground mt-2">Top differentially expressed genes ranked by fold change</p>
            <p className="text-xs text-muted-foreground mt-1">CsA: 1,492 DEGs | VOC: 489 DEGs (FDR &lt; 0.05)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DegRankings;