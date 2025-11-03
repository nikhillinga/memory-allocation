import { useEffect, useCallback, useRef } from 'react';
import { useMemorySimulator } from '@/hooks/useMemorySimulator';
import { AlgorithmSelector } from '@/components/AlgorithmSelector';
import { InputConfig } from '@/components/InputConfig';
import { SimulationControls } from '@/components/SimulationControls';
import { StatsDisplay } from '@/components/StatsDisplay';
import { AlgorithmInfo } from '@/components/AlgorithmInfo';
import { MemoryBlock } from '@/components/MemoryBlock';
import { ProcessQueue } from '@/components/ProcessQueue';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { MemoryBlock as MemoryBlockType, Process } from '@/types/memory';

const Index = () => {
  const {
    algorithm,
    setAlgorithm,
    history,
    setHistory,
    currentStep,
    setCurrentStep,
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    generateAllSteps,
    calculateStats
  } = useMemorySimulator();

  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isSimulationActive = history.length > 0;
  const currentState = history[currentStep] || null;
  const stats = currentState ? calculateStats(currentState) : {
    totalMemory: 0,
    memoryAllocated: 0,
    memoryWasted: 0,
    successCount: 0,
    failCount: 0,
    fragmentation: 0
  };

  const handleStart = useCallback((blockSizes: number[], processSizes: number[]) => {
    const blocks: MemoryBlockType[] = blockSizes.map((size, i) => ({
      id: i + 1,
      originalSize: size,
      size,
      isFree: true,
      process: null
    }));

    const processes: Process[] = processSizes.map((size, i) => ({
      id: i + 1,
      size,
      allocated: false,
      blockId: null
    }));

    const newHistory = generateAllSteps(blocks, processes, algorithm);
    setHistory(newHistory);
    setCurrentStep(0);
    setIsPlaying(false);
    toast.success('Simulation initialized!');
  }, [algorithm, generateAllSteps, setHistory, setCurrentStep, setIsPlaying]);

  const handleReset = useCallback(() => {
    setHistory([]);
    setCurrentStep(0);
    setIsPlaying(false);
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }
    toast.info('Simulation reset');
  }, [setHistory, setCurrentStep, setIsPlaying]);

  const handlePlay = useCallback(() => {
    if (currentStep >= history.length - 1) {
      toast.info('Simulation complete');
      return;
    }
    setIsPlaying(true);
    toast.success('Playing simulation');
  }, [currentStep, history.length, setIsPlaying]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    toast.info('Simulation paused');
  }, [setIsPlaying]);

  const handleStepForward = useCallback(() => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.info('End of simulation reached');
    }
  }, [currentStep, history.length, setCurrentStep]);

  const handleStepBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);

  const handleResetSim = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    toast.info('Simulation reset to beginning');
  }, [setCurrentStep, setIsPlaying]);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
      const delays = [1500, 1000, 500]; // Slow, Medium, Fast
      playIntervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= history.length - 1) {
            setIsPlaying(false);
            toast.success('Simulation complete!');
            return prev;
          }
          return prev + 1;
        });
      }, delays[speed - 1]);
    } else if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, speed, history.length, setCurrentStep, setIsPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isSimulationActive) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (isPlaying) {
            handlePause();
          } else {
            handlePlay();
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleStepForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleStepBack();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          handleResetSim();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSimulationActive, isPlaying, handlePlay, handlePause, handleStepForward, handleStepBack, handleResetSim]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 p-6">
      <div className="container mx-auto max-w-[1600px]">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-5xl font-bold text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.6)]">
            Memory Allocation Simulator
          </h1>
          <p className="mb-4 text-lg text-muted-foreground">
            Interactive visualization of First-Fit, Best-Fit, and Worst-Fit algorithms
          </p>
          <AlgorithmSelector
            selected={algorithm}
            onChange={setAlgorithm}
            disabled={isSimulationActive}
          />
        </header>

        <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <InputConfig
              onStart={handleStart}
              onReset={handleReset}
              disabled={isSimulationActive}
            />
            <StatsDisplay stats={stats} />
          </div>

          {/* Right Panel - Visualization */}
          <div className="space-y-6">
            {/* Animation Controls */}
            <SimulationControls
              isPlaying={isPlaying}
              canPlay={isSimulationActive}
              speed={speed}
              onPlay={handlePlay}
              onPause={handlePause}
              onStepForward={handleStepForward}
              onStepBack={handleStepBack}
              onReset={handleResetSim}
              onSpeedChange={setSpeed}
            />

            {/* Visualization Area */}
            <Card className="min-h-[600px] p-6 shadow-glow-primary">
              <h2 className="mb-6 border-b-2 border-primary pb-3 text-2xl font-bold text-primary">
                Memory Visualization
              </h2>

              {isSimulationActive && currentState ? (
                <div className="flex gap-6">
                  {/* Process Queue */}
                  <ProcessQueue
                    processes={currentState.processes}
                    currentProcessId={currentState.currentProcess}
                  />

                  {/* Memory Blocks */}
                  <div className="flex flex-1 items-end justify-center gap-4 overflow-x-auto rounded-xl bg-black/30 p-6">
                    {currentState.blocks.map((block) => (
                      <MemoryBlock
                        key={block.id}
                        block={block}
                        isChecking={currentState.checkingBlock === block.id}
                        isBestFit={
                          currentState.bestFitSoFar === block.id ||
                          currentState.worstFitSoFar === block.id
                        }
                        isFilling={currentState.fillingBlock === block.id}
                        fillPercent={currentState.fillPercent}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-[500px] items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl text-muted-foreground">
                      Configure your simulation and click "Start Simulation" to begin
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Timeline */}
            {isSimulationActive && (
              <Card className="p-5 shadow-glow-primary">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step {currentStep + 1} of {history.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(((currentStep + 1) / history.length) * 100)}%
                  </span>
                </div>
                <Progress value={((currentStep + 1) / history.length) * 100} className="h-3" />
                <p className="mt-3 text-center text-sm font-medium text-primary">
                  {currentState?.description || 'Ready to start'}
                </p>
              </Card>
            )}

            {/* Algorithm Info */}
            <AlgorithmInfo algorithm={algorithm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
