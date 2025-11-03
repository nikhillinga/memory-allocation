import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

interface SimulationControlsProps {
  isPlaying: boolean;
  canPlay: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

const speedLabels = ['Slow', 'Medium', 'Fast'];

export const SimulationControls = ({
  isPlaying,
  canPlay,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onStepBack,
  onReset,
  onSpeedChange
}: SimulationControlsProps) => {
  return (
    <Card className="p-6 shadow-glow-primary">
      <h2 className="mb-4 border-b-2 border-primary pb-3 text-2xl font-bold text-primary">
        Animation Controls
      </h2>
      <div className="flex flex-wrap gap-3">
        {isPlaying ? (
          <Button onClick={onPause} disabled={!canPlay} variant="secondary">
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
        ) : (
          <Button onClick={onPlay} disabled={!canPlay}>
            <Play className="mr-2 h-4 w-4" />
            Play
          </Button>
        )}
        <Button onClick={onStepBack} disabled={!canPlay} variant="outline">
          <SkipBack className="mr-2 h-4 w-4" />
          Step Back
        </Button>
        <Button onClick={onStepForward} disabled={!canPlay} variant="outline">
          <SkipForward className="mr-2 h-4 w-4" />
          Step Forward
        </Button>
        <Button onClick={onReset} disabled={!canPlay} variant="destructive">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Sim
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Speed:</span>
        <Slider
          value={[speed]}
          onValueChange={(values) => onSpeedChange(values[0])}
          min={1}
          max={3}
          step={1}
          className="flex-1"
          disabled={!canPlay}
        />
        <span className="min-w-[60px] text-sm text-muted-foreground">
          {speedLabels[speed - 1]}
        </span>
      </div>
      <div className="mt-4 text-xs text-muted-foreground">
        <p>Keyboard shortcuts:</p>
        <p className="mt-1">Space: Play/Pause • ← →: Step Back/Forward • R: Reset</p>
      </div>
    </Card>
  );
};
