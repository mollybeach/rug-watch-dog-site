/**
 * @title Plot Controls
 * @fileoverview Plot controls component
 * @path /components//PlotControls.tsx
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface BaseControlsProps {
  type: 'market' | 'network' | 'price';
}

interface MarketControlsProps extends BaseControlsProps {
  type: 'market';
  riskThreshold: number;
  volumeThreshold: number;
  onRiskChange: (value: number) => void;
  onVolumeChange: (value: number) => void;
}

interface NetworkControlsProps extends BaseControlsProps {
  type: 'network';
  selectedCollection: string;
  onCollectionChange: (value: string) => void;
  isDragEnabled: boolean;
  onDragToggle: () => void;
}

interface PriceControlsProps extends BaseControlsProps {
  type: 'price';
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}

type PlotControlsProps = MarketControlsProps | NetworkControlsProps | PriceControlsProps;

const collections = [
  'BAYC',
  'Azuki',
  'Doodles',
  'CloneX',
  'Moonbirds'
];

export const PlotControls: React.FC<PlotControlsProps> = (props) => {
  const renderControls = () => {
    if (props.type === 'market') {
      return (
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1.5 rounded-md shadow-sm">
            <span className="text-[10px] font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              RISK:
            </span>
            <Input
              type="number"
              placeholder="50"
              className="w-16 h-6 text-[10px]"
              step="1"
              min="0"
              max="100"
              value={props.riskThreshold}
              onChange={(e) => props.onRiskChange(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1.5 rounded-md shadow-sm">
            <span className="text-[10px] font-bold text-pink-500">VOLUME:</span>
            <Input
              type="number"
              placeholder="100"
              className="w-16 h-6 text-[10px]"
              step="10"
              min="0"
              value={props.volumeThreshold}
              onChange={(e) => props.onVolumeChange(Number(e.target.value))}
            />
          </div>
        </div>
      );
    } else if (props.type === 'network') {
      return (
        <div className="flex items-center space-x-2">
          <Select value={props.selectedCollection} onValueChange={props.onCollectionChange}>
            <SelectTrigger className="w-48 h-6 bg-white dark:bg-slate-900 text-xs">
              <SelectValue placeholder="Select Collection" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900">
              {collections.map((collection) => (
                <SelectItem value={collection} key={collection}>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                    {collection}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    } else if (props.type === 'price') {
      return (
        <div className="flex items-center space-x-2">
          <Select value={props.timeRange} onValueChange={props.onTimeRangeChange}>
            <SelectTrigger className="w-32 h-6 bg-white dark:bg-slate-900 text-xs">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900">
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        {renderControls()}
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
  );
};
