/**
 * @title Chord Diagram
 * @fileoverview Chord diagram component
 * @path /components/visualizations/ChordDiagram.tsx
 */

import React, { useState, useEffect } from 'react';
import { PlotControls } from "@/components/visualizations/PlotControls";

interface ChordDiagramProps {
  width?: number;
  height?: number;
  data: {
    nodes: Array<{
      id: string;
      group: string;
      color: string;
    }>;
    links: Array<{
      source: string;
      target: string;
      value: number;
    }>;
  } | null;
}

export const ChordDiagram: React.FC<ChordDiagramProps> = ({ data, width = 900, height = 1000 }) => {
  const [localData, setLocalData] = useState<ChordDiagramProps['data'] | null>(data);
  const [loading, setLoading] = useState(true);
  const [pathwaysCount, setPathwaysCount] = useState(18);
  const [genesPerPathway, setGenesPerPathway] = useState(10);
  const [fontSize, setFontSize] = useState(12);
  const [colorScheme, setColorScheme] = useState('tableau10');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data/chord');
        const jsonData = await response.json();
        setLocalData(jsonData);
      } catch (error) {
        console.error('Error fetching chord data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!data) {
      fetchData();
    } else {
      setLocalData(data);
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <div>Loading chord diagram...</div>;
  }

  if (!localData || !localData.links || !localData.nodes) {
    return <div>No data available</div>;
  }

  const viewBoxHeight = 450;
  const centerX = width / 2;
  const centerY = height * 0.67;
  const radius = 330;

  // Calculate paths and angles based on data
  const calculateChordPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(centerX, centerY, radius, startAngle);
    const end = polarToCartesian(centerX, centerY, radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div>
      <PlotControls
        type="chord"
        pathwaysCount={pathwaysCount}
        genesPerPathway={genesPerPathway}
        fontSize={fontSize}
        shrinkFactor={0}
        colorScheme={colorScheme}
        onPathwaysCountChange={setPathwaysCount}
        onGenesPerPathwayChange={setGenesPerPathway}
        onFontSizeChange={setFontSize}
        onShrinkFactorChange={() => {}}
        onColorSchemeChange={setColorScheme}
      />
      <svg 
        width={width} 
        height={height} 
        preserveAspectRatio="xMidYMin"
        viewBox={`0 0 ${width} ${viewBoxHeight}`}
        style={{ maxWidth: '100%' }}
      >
        <g transform={`translate(${centerX},${centerY})`}>
          {/* Render chord paths */}
          <g className="chord-chart-chords">
            {localData.links.map((link, index) => {
              const sourceIndex = localData.nodes.findIndex(n => n.id === link.source);
              const targetIndex = localData.nodes.findIndex(n => n.id === link.target);
              const startAngle = (sourceIndex * 360) / localData.nodes.length;
              const endAngle = (targetIndex * 360) / localData.nodes.length;
              
              return (
                <path
                  key={`chord-${index}`}
                  d={calculateChordPath(startAngle, endAngle, radius)}
                  style={{
                    fill: localData.nodes.find(n => n.id === link.source)?.color || '#ccc',
                    stroke: 'black',
                    strokeWidth: 0.3
                  }}
                />
              );
            })}
          </g>

          {/* Render labels */}
          {localData.nodes.map((node, index) => {
            const angle = (index * 360) / localData.nodes.length;
            return (
              <g
                key={`label-${index}`}
                transform={`rotate(${angle}) translate(${radius + 20},0)`}
              >
                <text
                  className="gene-symbol-label"
                  x="8"
                  dy=".35em"
                  style={{
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    letterSpacing: '1.25px',
                    fontWeight: 400,
                    fontSize: '12px',
                    cursor: 'pointer',
                    textAnchor: angle > 180 ? 'end' : 'start'
                  }}
                  transform={angle > 180 ? 'rotate(180) translate(-16)' : ''}
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </g>

        {/* Legend */}
        <g className="legend" transform="translate(20, 955)">
          {/* Add legend items here */}
        </g>
      </svg>
    </div>
  );
};