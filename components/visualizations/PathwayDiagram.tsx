"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, ZoomIn, ZoomOut, RotateCcw, Network } from "lucide-react";
import { PathwayData } from "@/app/data/pathway_data";
import { ForceGraph2D } from 'react-force-graph';

export const PathwayDiagram: React.FC = () => {
  const [selectedPathway, setSelectedPathway] = useState('protein-processing');
  const [pathwayData, setPathwayData] = useState<PathwayData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isDragEnabled, setIsDragEnabled] = useState(false);

  useEffect(() => {
    fetchPathwayData(selectedPathway);
  }, [selectedPathway]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const fetchPathwayData = async (pathway: string) => {
    try {
      const response = await fetch(`/api/data/pathway?pathway=${pathway}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received data:', data);
      
      if (!data.nodes || !data.links) {
        console.error('Invalid data structure:', data);
        return;
      }
      
      const graphData = {
        nodes: data.nodes.map((node: { id: string; label?: string; [key: string]: unknown }) => ({
          ...node,
          id: node.id
        })),
        links: data.links.map((link: { source: string; target: string; [key: string]: unknown }) => ({
          ...link,
          source: link.source,
          target: link.target
        })),
        metadata: data.metadata || {}
      };
      
      console.log('Formatted graph data:', graphData);
      setPathwayData(graphData);
    } catch (error) {
      console.error('Error fetching pathway data:', error);
    }
  };

  return (
    <div className="p-4 border-t-4 border-t-purple-500">
      <div className="flex items-center gap-2 mb-4">
        <Network className="h-4 w-4 text-purple-500" />
        <h2 className="text-lg font-semibold">Pathway Impact Analysis</h2>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Select 
              value={selectedPathway}
              onValueChange={setSelectedPathway}
            >
              <SelectTrigger className="w-48 h-6 bg-white dark:bg-slate-900 text-xs">
                <SelectValue placeholder="Select Pathway" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 z-50">
                <SelectItem value="protein-processing">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                    Protein Processing in ER
                  </span>
                </SelectItem>
                <SelectItem value="cell-cycle">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                    CsA vs Control
                  </span>
                </SelectItem>
                <SelectItem value="membrane-trafficking">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                    Membrane Trafficking
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="bg-white dark:bg-slate-900 p-0.5 rounded-md flex items-center space-x-0.5">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-7 w-7 p-0 ${isDragEnabled ? 'bg-purple-100 text-purple-600' : ''}`}
                onClick={() => setIsDragEnabled(!isDragEnabled)}
              >
                <Network className="h-4 w-4" />
              </Button>
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
        
        <div ref={containerRef} className="relative w-full h-[400px] overflow-hidden">
          {pathwayData && 
           Array.isArray(pathwayData.nodes) && 
           Array.isArray(pathwayData.links) && 
           pathwayData.nodes.length > 0 && 
           dimensions.width > 0 ? (
            <ForceGraph2D
              graphData={pathwayData}
              width={dimensions.width}
              height={400}
              nodeColor={() => "#9333ea"}
              nodeRelSize={6}
              linkColor={() => "#cbd5e1"}
              linkWidth={1}
              nodeLabel="id"
              backgroundColor="#ffffff"
              enableNodeDrag={isDragEnabled}
              onNodeDragEnd={node => {
                if (isDragEnabled) {
                  node.fx = node.x;
                  node.fy = node.y;
                }
              }}
              onNodeClick={node => {
                if (isDragEnabled) {
                  node.fx = node.x;
                  node.fy = node.y;
                }
              }}
              cooldownTicks={100}
            />
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground">Loading pathway data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PathwayDiagram;