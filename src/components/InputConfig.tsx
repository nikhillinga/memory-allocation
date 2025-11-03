import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RotateCcw, Play } from 'lucide-react';

interface InputConfigProps {
  onStart: (blocks: number[], processes: number[]) => void;
  onReset: () => void;
  disabled?: boolean;
}

const DEFAULT_BLOCKS = [200, 150, 100, 250, 180];
const DEFAULT_PROCESSES = [130, 60, 170, 90];

export const InputConfig = ({ onStart, onReset, disabled }: InputConfigProps) => {
  const [numBlocks, setNumBlocks] = useState(5);
  const [numProcesses, setNumProcesses] = useState(4);
  const [blockSizes, setBlockSizes] = useState<string[]>(
    DEFAULT_BLOCKS.slice(0, 5).map(String)
  );
  const [processSizes, setProcessSizes] = useState<string[]>(
    DEFAULT_PROCESSES.slice(0, 4).map(String)
  );

  useEffect(() => {
    const newBlocks = Array(numBlocks)
      .fill(0)
      .map((_, i) => (blockSizes[i] !== undefined ? blockSizes[i] : (DEFAULT_BLOCKS[i] || 100).toString()));
    setBlockSizes(newBlocks);
  }, [numBlocks]);

  useEffect(() => {
    const newProcesses = Array(numProcesses)
      .fill(0)
      .map((_, i) => (processSizes[i] !== undefined ? processSizes[i] : (DEFAULT_PROCESSES[i] || 50).toString()));
    setProcessSizes(newProcesses);
  }, [numProcesses]);

  const handleStart = () => {
    const blocks = blockSizes.map(s => parseInt(s) || 100);
    const processes = processSizes.map(s => parseInt(s) || 50);
    onStart(blocks, processes);
  };

  return (
    <Card className="p-6 shadow-glow-primary">
      <h2 className="mb-4 border-b-2 border-primary pb-3 text-2xl font-bold text-primary">
        Input Configuration
      </h2>
      <div className="space-y-6">
        {/* Number of Blocks and Processes */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="numBlocks" className="text-primary font-semibold">
              Memory Blocks (1-10)
            </Label>
            <Input
              id="numBlocks"
              type="number"
              min={1}
              max={10}
              value={numBlocks}
              onChange={(e) => setNumBlocks(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              disabled={disabled}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="numProcesses" className="text-primary font-semibold">
              Processes (1-10)
            </Label>
            <Input
              id="numProcesses"
              type="number"
              min={1}
              max={10}
              value={numProcesses}
              onChange={(e) => setNumProcesses(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              disabled={disabled}
              className="mt-2"
            />
          </div>
        </div>

        {/* Block Sizes */}
        <div>
          <Label className="mb-3 block text-primary font-semibold">Memory Block Sizes (KB)</Label>
          <div className="grid grid-cols-5 gap-2">
            {blockSizes.map((size, i) => (
              <Input
                key={i}
                type="number"
                min={1}
                value={size}
                onChange={(e) => {
                  const newSizes = [...blockSizes];
                  newSizes[i] = e.target.value;
                  setBlockSizes(newSizes);
                }}
                disabled={disabled}
                className="text-center"
                placeholder={`B${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Process Sizes */}
        <div>
          <Label className="mb-3 block text-primary font-semibold">Process Sizes (KB)</Label>
          <div className="grid grid-cols-5 gap-2">
            {processSizes.map((size, i) => (
              <Input
                key={i}
                type="number"
                min={1}
                value={size}
                onChange={(e) => {
                  const newSizes = [...processSizes];
                  newSizes[i] = e.target.value;
                  setProcessSizes(newSizes);
                }}
                disabled={disabled}
                className="text-center"
                placeholder={`P${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={handleStart} disabled={disabled} className="flex-1 min-w-[140px]">
          <Play className="mr-2 h-4 w-4" />
          Start Simulation
        </Button>
        <Button onClick={onReset} variant="destructive" className="min-w-[140px]">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset All
        </Button>
      </div>
    </Card>
  );
};
