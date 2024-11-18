import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Download, ZoomIn, ZoomOut, RotateCcw, Network } from "lucide-react";

interface BaseControlsProps {
  type: 'volcano' | 'pathway' | 'degrankings' | 'chord';
}

interface VolcanoControlsProps extends BaseControlsProps {
  type: 'volcano';
  pValueThreshold: number;
  fcThreshold: number;
  onPValueChange: (value: number) => void;
  onFcChange: (value: number) => void;
}

interface PathwayControlsProps extends BaseControlsProps {
  type: 'pathway';
  selectedPathway: string;
  onPathwayChange: (value: string) => void;
  isDragEnabled: boolean;
  onDragToggle: () => void;
}

interface DegRankingsControlsProps extends BaseControlsProps {
  type: 'degrankings';
  logFcThreshold: number;
  onLogFcChange: (value: number) => void;
  selectedTreatment: string;
  onTreatmentChange: (value: string) => void;
}

interface ChordControlsProps extends BaseControlsProps {
  type: 'chord';
  pathwaysCount: number;
  genesPerPathway: number;
  fontSize: number;
  shrinkFactor: number;
  colorScheme: string;
  onPathwaysCountChange: (value: number) => void;
  onGenesPerPathwayChange: (value: number) => void;
  onFontSizeChange: (value: number) => void;
  onShrinkFactorChange: (value: number) => void;
  onColorSchemeChange: (value: string) => void;
}

type PlotControlsProps = VolcanoControlsProps | PathwayControlsProps | DegRankingsControlsProps | ChordControlsProps;

export const PlotControls: React.FC<PlotControlsProps> = (props) => {
  const renderControls = () => {
    if (props.type === 'volcano') {
      return (
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1.5 rounded-md shadow-sm">
            <span className="text-[10px] font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              P-VALUE:
            </span>
            <Input
              type="number"
              placeholder="0.05"
              className="w-16 h-6 text-[10px]"
              step="0.01"
              min="0"
              max="1"
              value={props.pValueThreshold}
              onChange={(e) => props.onPValueChange(Number(e.target.value))}
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
              value={props.fcThreshold}
              onChange={(e) => props.onFcChange(Number(e.target.value))}
            />
          </div>
        </div>
      );
    } else if (props.type === 'pathway') {
      return (
        <div className="flex items-center space-x-2">
          <Select value={props.selectedPathway} onValueChange={props.onPathwayChange}>
            <SelectTrigger className="w-48 h-6 bg-white dark:bg-slate-900 text-xs">
              <SelectValue placeholder="Select Pathway" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900">
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
        </div>
      );
    } else if (props.type === 'degrankings') {
      return (
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 p-1 rounded-md shadow-sm">
            <span className="text-[9px] font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
              LOG2FC:
            </span>
            <Input
              type="number"
              placeholder="1.5"
              className="w-14 h-6 text-[9px]"
              step="0.1"
              min="0"
              value={props.logFcThreshold}
              onChange={(e) => props.onLogFcChange(Number(e.target.value))}
            />
          </div>

          <Select value={props.selectedTreatment} onValueChange={props.onTreatmentChange}>
            <SelectTrigger className="w-48 h-6 bg-white dark:bg-slate-900 text-xs">
              <SelectValue>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                  {props.selectedTreatment === 'csa' ? 'CsA vs Control' : 'VOC vs Control'}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900">
              <SelectItem value="csa">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                  CsA vs Control
                </span>
              </SelectItem>
              <SelectItem value="voc">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-semibold">
                  VOC vs Control
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    } else if (props.type === 'chord') {
      return (
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex flex-col space-y-1 flex-1">
              <span className="text-[10px] font-bold">
                Pathways: {props.pathwaysCount}
              </span>
              <Input
                type="range"
                min={3}
                max={26}
                value={props.pathwaysCount}
                onChange={(e) => props.onPathwaysCountChange(Number(e.target.value))}
                className="h-1.5"
              />
            </div>
            
            <div className="flex flex-col space-y-1 flex-1">
              <span className="text-[10px] font-bold">
                Genes per Pathway: {props.genesPerPathway}
              </span>
              <Input
                type="range"
                min={10}
                max={100}
                value={props.genesPerPathway}
                onChange={(e) => props.onGenesPerPathwayChange(Number(e.target.value))}
                className="h-1.5"
              />
            </div>
            
            <div className="flex flex-col space-y-1 flex-1">
              <span className="text-[10px] font-bold">
                Font Size: {props.fontSize}
              </span>
              <Input
                type="range"
                min={10}
                max={50}
                value={props.fontSize}
                onChange={(e) => props.onFontSizeChange(Number(e.target.value))}
                className="h-1.5"
              />
            </div>
            
            <div className="flex flex-col space-y-1 flex-1">
              <span className="text-[10px] font-bold">
                Shrink Factor: {props.shrinkFactor}
              </span>
              <Input
                type="range"
                min={0.1}
                max={1}
                value={props.shrinkFactor}
                onChange={(e) => props.onShrinkFactorChange(Number(e.target.value))}
                className="h-1.5"
              />
            </div>
            
            <div className="flex flex-col space-y-1 flex-1">
              <span className="text-[10px] font-bold">
                Color Scheme: {props.colorScheme}
              </span>
              <Input
                type="text"
                placeholder="Enter color scheme"
                value={props.colorScheme}
                onChange={(e) => props.onColorSchemeChange(e.target.value)}
                className="h-1.5"
              />
            </div>
          </div>
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
          {props.type === 'pathway' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-7 w-7 p-0 ${props.isDragEnabled ? 'bg-purple-100 text-purple-600' : ''}`}
              onClick={props.onDragToggle}
            >
              <Network className="h-4 w-4" />
            </Button>
          )}
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
