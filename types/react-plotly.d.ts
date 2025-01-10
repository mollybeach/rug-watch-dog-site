declare module 'react-plotly.js' {
  import { Component } from 'react';
  
  export interface PlotParams {
    data: Array<{
      x: Array<number | string>;
      y: Array<number | string>;
      mode?: string;
      type?: string;
      name?: string;
      marker?: {
        color?: string | string[] | ((d: any) => string);
        size?: number | number[];
        symbol?: string | string[];
      };
      text?: Array<string | number>;
      textposition?: string;
      textfont?: {
        size: number;
      };
      hovertext?: string[];
      hoverinfo?: string;
      hovertemplate?: string;
      showlegend?: boolean;
    }>;
    layout: {
      title?: string | { text: string };
      xaxis?: {
        title?: string | { text: string };
        type?: 'linear' | 'log' | 'date' | 'category';
        gridcolor?: string;
        showgrid?: boolean;
      };
      yaxis?: {
        title?: string | { text: string };
        gridcolor?: string;
        showgrid?: boolean;
      };
      paper_bgcolor?: string;
      plot_bgcolor?: string;
      showlegend?: boolean;
      height?: number;
      width?: number;
      margin?: {
        l?: number;
        r?: number;
        t?: number;
        b?: number;
        pad?: number;
      };
    };
    useResizeHandler?: boolean;
    style?: {
      width?: string | number;
      height?: string | number;
    };
    config?: {
      responsive?: boolean;
      displayModeBar?: boolean;
      [key: string]: any;
    };
    [key: string]: any;
  }

  class Plot extends Component<Partial<PlotParams>> {}
  export default Plot;
} 