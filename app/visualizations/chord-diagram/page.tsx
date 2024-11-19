/**
 * @title Chord Diagram
 * @fileoverview Chord diagram page
 * @path /app/visualizations/chord-diagram/page.tsx
 */

"use client";
import React, { useState, useEffect } from 'react';
import { PlotControls } from "@/components//PlotControls";
import { validateJson } from "@/lib/jsonValidator";
import { chordDiagramSchema } from "@/lib/schemas";
import { JSONSchemaType } from "ajv";
import { geneExpressionChordData } from "@/lib/data/chord_data";

interface ChordDiagramData {
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
}//ata = geneExpressionChordData, width = 700, height = 600

const ChordDiagramPage: React.FC = () => {
    const [data, setData] = useState<ChordDiagramData | null>(null);
    const [width] = useState(700);
    const [height] = useState(600);
    const [pathwaysCount, setPathwaysCount] = useState(18);
    const [genesPerPathway, setGenesPerPathway] = useState(10);
    const [fontSize, setFontSize] = useState(12);
    const [colorScheme, setColorScheme] = useState('tableau10');
    const [localData, setLocalData] = useState<ChordDiagramData | null>(null);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/chord');
                const jsonData = await response.json();

                const validationErrors = validateJson(jsonData, chordDiagramSchema as JSONSchemaType<any>);
                if (validationErrors) {
                    console.error('Validation errors:', validationErrors);
                    return;
                }

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

    useEffect(() => {
        // Ensure geneExpressionChordData has the required structure
        const formattedData: ChordDiagramData = {
            data: geneExpressionChordData, // Assuming geneExpressionChordData is structured correctly
            width: 700,
            height: 600
        };
        setData(formattedData);
    }, []);

    if (loading) {
        return <div>Loading chord diagram...</div>;
    }

    if (!localData?.data || !localData.data.links || !localData.data.nodes) {
        return <div>No data available</div>;
    }

    const viewBoxHeight = height;
    const halfOfWidth = width / 2;
    const centerX = halfOfWidth * 0.55;
    const centerY = height * 0.25;
    const radius = Math.min(width, height) * 0.4;

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

    // Define a color mapping for each group
    const groupColorMapping: { [key: string]: string } = {
        "upregulated": "#e30b5d", // Raspberry
        "downregulated": "#6495ed", // Cornflower Blue
        "unchanged": "#778899", // Light Slate Gray
        "tumor suppressor": "#ff7f50", // Coral
        "oncogene": "#ffa343", // Neon Carrot
        "regulator": "#4682b4", // Steel Blue
        "signaling molecule": "#32cd32", // Lime Green
        "metabolic enzyme": "#ffd700", // Gold
        "transcription factor": "#9370db", // Medium Purple
        "cell cycle regulator": "#6a5acd", // Slate Blue
        "apoptosis regulator": "#ebb0d7", // Thristle
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
                        {localData.data && localData.data.links && localData.data.links.map((link, index) => {
                            if (!localData.data) return null; // Check if localData.data is null

                            const sourceIndex = localData.data.nodes?.findIndex(n => n.id === link.source) ?? -1;
                            const targetIndex = localData.data.nodes?.findIndex(n => n.id === link.target) ?? -1;
                            
                            if (sourceIndex === -1 || targetIndex === -1) return null; // Skip if indices are invalid

                            const startAngle = (sourceIndex * 360) / localData.data.nodes.length;
                            const endAngle = (targetIndex * 360) / localData.data.nodes.length;
                            
                            return (
                                <path
                                    key={`chord-${index}`}
                                    d={calculateChordPath(startAngle, endAngle, radius)}
                                    style={{
                                        fill: localData.data.nodes.find(n => n.id === link.source)?.color || '#ccc',
                                        stroke: 'black',
                                        strokeWidth: 0.3
                                    }}
                                />
                            );
                        })}
                    </g>

                    {/* Render labels */}
                    {localData.data?.nodes.map((node: { id: string; group: string; color: string }, index: number) => {
                        const angle = (index * 360) / (localData.data?.nodes.length || 1); // Fallback to 1 to avoid division by zero
                        const labelRadius = radius + 20; // Adjust label radius as needed
                        const labelPosition = polarToCartesian(centerX, centerY, labelRadius, angle); // Calculate label position

                        return (
                            <g key={`label-${index}`} transform={`translate(${labelPosition.x}, ${labelPosition.y})`}>
                                <text
                                    className="gene-symbol-label"
                                    x="0"
                                    dy=".35em"
                                    style={{
                                        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                                        letterSpacing: '1.25px',
                                        fontWeight: 400,
                                        fontSize: `${fontSize}px`, // Use dynamic font size
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
                    {Object.entries(groupColorMapping).map(([group, color], index) => (
                        <g key={group} transform={`translate(0, ${index * 25})`}>
                            <rect width="20" height="20" fill={color} />
                            <text x="30" y="15" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '12px' }}>
                                {group}
                            </text>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default ChordDiagramPage;
