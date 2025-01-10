declare module 'react-force-graph' {
  import { Component } from 'react';
  import { NetworkNode, NetworkLink } from './types';

  export interface ForceGraphProps {
    graphData: {
      nodes: NetworkNode[];
      links: NetworkLink[];
    };
    nodeAutoColorBy?: string;
    nodeRelSize?: number;
    linkWidth?: number;
    linkColor?: string | ((link: any) => string);
    nodeCanvasObject?: (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => void;
    nodeCanvasObjectMode?: string | ((node: any) => string);
    width?: number;
    height?: number;
    backgroundColor?: string;
    [key: string]: any;
  }

  export class ForceGraph2D extends Component<ForceGraphProps> {}
  export class ForceGraph3D extends Component<ForceGraphProps> {}
  export class ForceGraphVR extends Component<ForceGraphProps> {}
  export class ForceGraphAR extends Component<ForceGraphProps> {}
} 