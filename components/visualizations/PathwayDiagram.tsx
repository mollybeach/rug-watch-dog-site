"use client";

import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Download, ZoomIn, ZoomOut, RotateCcw, Network } from "lucide-react";

export const PathwayDiagram: React.FC = () => {
  return (
    <div className="p-6 border-t-4 border-t-purple-500">
      <div className="flex items-center gap-2 mb-6">
        <Network className="h-5 w-5 text-purple-500" />
        <h2 className="text-xl font-semibold">Pathway Impact Analysis</h2>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 h-[calc(100vh-24rem)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Pathway Selection */}
            <div className="flex items-center space-x-2">
              <Select defaultValue="cell-cycle">
                <SelectTrigger className="w-48 h-7 bg-white dark:bg-slate-900">
                  <SelectValue className="font-semibold">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                      Select Pathway
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cell-cycle">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                      Cell Cycle
                    </span>
                  </SelectItem>
                  <SelectItem value="protein-processing">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                      Protein Processing in ER
                    </span>
                  </SelectItem>
                  <SelectItem value="metabolism">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                      Metabolic Pathways
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Visualization Controls */}
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
          <div className="text-center">
            <p className="text-muted-foreground">Pathway Visualization</p>
            <p className="text-sm text-muted-foreground mt-2">Showing gene interactions and pathway impacts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PathwayDiagram;