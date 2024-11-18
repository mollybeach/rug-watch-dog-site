/**
 * @title Pathway Diagram
 * @fileoverview Pathway diagram component
 * @path /components/visualizations/PathwayDiagram.tsx
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Network } from "lucide-react";
import { PathwayData } from "@/lib/data/pathway_data";
import { ForceGraph2D } from 'react-force-graph';
import { PlotControls } from "@/components/visualizations/PlotControls";

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
      const response = await fetch(`/api/routes/pathway?pathway=${pathway}`);
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
        nodes: data.nodes.map((node: { id: string; label?: string; group: string; [key: string]: unknown }) => ({
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
        <PlotControls
          type="pathway"
          selectedPathway={selectedPathway}
          onPathwayChange={setSelectedPathway}
          isDragEnabled={isDragEnabled}
          onDragToggle={() => setIsDragEnabled(!isDragEnabled)}
        />
        
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
              nodeColor={node => {
                // Get the color based on the node's group from metadata
                return pathwayData.metadata.groups[node.group]?.color || "#9333ea"; // Default to purple if group not found
              }}
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