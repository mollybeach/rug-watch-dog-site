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
import { Download, ZoomIn, ZoomOut, RotateCcw, BarChart } from "lucide-react";

export const VolcanoPlot: React.FC = () => {
  return (
    <div className="p-6 border-t-4 border-t-purple-500">
      <div className="flex items-center gap-2 mb-6">
        <BarChart className="h-5 w-5 text-purple-500" />
        <h2 className="text-xl font-semibold">Differential Expression Analysis</h2>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 h-[calc(100vh-24rem)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Thresholds */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1.5 rounded-md shadow-sm">
                <span className="text-[10px] font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">P-VALUE:</span>
                <Input
                  type="number"
                  placeholder="0.05"
                  className="w-16 h-6 text-[10px]"
                  step="0.01"
                  min="0"
                  max="1"
                />
              </div>

              <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1.5 rounded-md shadow-sm">
                <span className="text-[10px] font-bold text-pink-500">FC:</span>
                <Input
                  type="number"
                  placeholder="1.5"
                  className="w-16 h-6 text-[10px]"
                  step="0.1"
                  min="0"
                />
              </div>
            </div>

            {/* Plot controls */}
            <div className="flex items-center space-x-2">
              <Select defaultValue="standard">
                <SelectTrigger className="w-28 h-7 bg-white dark:bg-slate-900">
                  <SelectValue className="font-semibold">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                      Plot Type
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                      Standard
                    </span>
                  </SelectItem>
                  <SelectItem value="interactive">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                      Interactive
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
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg h-[calc(100%-4rem)] flex items-center justify-center border border-slate-200 dark:border-slate-700">
          <p className="text-muted-foreground">Volcano Plot Visualization</p>
        </div>
      </div>
    </div>
  );
};

export default VolcanoPlot;

