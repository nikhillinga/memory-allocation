import { useState, useCallback } from 'react';
import { Algorithm, MemoryBlock, Process, HistoryStep, Stats, Comparison } from '@/types/memory';

export const useMemorySimulator = (initialAlgorithm: Algorithm = 'best-fit') => {
  const [algorithm, setAlgorithm] = useState<Algorithm>(initialAlgorithm);
  const [blocks, setBlocks] = useState<MemoryBlock[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [history, setHistory] = useState<HistoryStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);

  const generateAllSteps = useCallback((
    initialBlocks: MemoryBlock[],
    initialProcesses: Process[],
    selectedAlgorithm: Algorithm
  ) => {
    const blocks = JSON.parse(JSON.stringify(initialBlocks));
    const processes = JSON.parse(JSON.stringify(initialProcesses));
    const newHistory: HistoryStep[] = [{
      blocks: JSON.parse(JSON.stringify(blocks)),
      processes: JSON.parse(JSON.stringify(processes)),
      step: 0,
      description: 'Initial state - Ready to begin allocation',
      comparisons: []
    }];

    const allocateProcess = (
      selectedIdx: number,
      process: Process,
      processIndex: number,
      comparisons: Comparison[]
    ) => {
      if (selectedIdx !== -1) {
        const wastage = blocks[selectedIdx].size - process.size;

        // Add filling animation step
        newHistory.push({
          blocks: JSON.parse(JSON.stringify(blocks)),
          processes: JSON.parse(JSON.stringify(processes)),
          step: newHistory.length,
          description: `🎬 Allocating Process P${process.id} to Block ${blocks[selectedIdx].id}...`,
          currentProcess: process.id,
          fillingBlock: blocks[selectedIdx].id,
          fillPercent: 0,
          comparisons
        });

        blocks[selectedIdx].isFree = false;
        blocks[selectedIdx].process = process.id;
        blocks[selectedIdx].size = wastage;
        processes[processIndex].allocated = true;
        processes[processIndex].blockId = blocks[selectedIdx].id;

        newHistory.push({
          blocks: JSON.parse(JSON.stringify(blocks)),
          processes: JSON.parse(JSON.stringify(processes)),
          step: newHistory.length,
          description: `✓ Process P${process.id} allocated to Block ${blocks[selectedIdx].id} (Wastage: ${wastage} KB)`,
          currentProcess: process.id,
          allocatedBlock: blocks[selectedIdx].id,
          comparisons,
          wastage,
          success: true
        });
      } else {
        newHistory.push({
          blocks: JSON.parse(JSON.stringify(blocks)),
          processes: JSON.parse(JSON.stringify(processes)),
          step: newHistory.length,
          description: `✗ Process P${process.id} could not be allocated - No suitable block found`,
          currentProcess: process.id,
          comparisons,
          success: false
        });
      }
    };

    for (let i = 0; i < processes.length; i++) {
      const process = processes[i];
      const comparisons: Comparison[] = [];
      let selectedIdx = -1;

      if (selectedAlgorithm === 'first-fit') {
        for (let j = 0; j < blocks.length; j++) {
          const block = blocks[j];
          const suitable = block.isFree && block.size >= process.size;
          const wastage = suitable ? block.size - process.size : null;

          comparisons.push({ blockId: block.id, blockSize: block.size, suitable, wastage });

          newHistory.push({
            blocks: JSON.parse(JSON.stringify(blocks)),
            processes: JSON.parse(JSON.stringify(processes)),
            step: newHistory.length,
            description: `Checking Block ${block.id} for Process P${process.id} (${process.size} KB)`,
            currentProcess: process.id,
            checkingBlock: block.id,
            comparisons: JSON.parse(JSON.stringify(comparisons))
          });

          if (suitable && selectedIdx === -1) {
            selectedIdx = j;
            break;
          }
        }
      } else if (selectedAlgorithm === 'best-fit') {
        let minWastage = Infinity;
        for (let j = 0; j < blocks.length; j++) {
          const block = blocks[j];
          const suitable = block.isFree && block.size >= process.size;
          const wastage = suitable ? block.size - process.size : null;

          comparisons.push({ blockId: block.id, blockSize: block.size, suitable, wastage });

          if (suitable && wastage! < minWastage) {
            minWastage = wastage!;
            selectedIdx = j;
          }

          newHistory.push({
            blocks: JSON.parse(JSON.stringify(blocks)),
            processes: JSON.parse(JSON.stringify(processes)),
            step: newHistory.length,
            description: `Checking Block ${block.id} for Process P${process.id} (${process.size} KB)`,
            currentProcess: process.id,
            checkingBlock: block.id,
            comparisons: JSON.parse(JSON.stringify(comparisons)),
            bestFitSoFar: selectedIdx !== -1 ? blocks[selectedIdx].id : undefined
          });
        }
      } else if (selectedAlgorithm === 'worst-fit') {
        let maxBlockSize = -1;
        for (let j = 0; j < blocks.length; j++) {
          const block = blocks[j];
          const suitable = block.isFree && block.size >= process.size;
          const wastage = suitable ? block.size - process.size : null;

          comparisons.push({ blockId: block.id, blockSize: block.size, suitable, wastage });

          if (suitable && block.size > maxBlockSize) {
            maxBlockSize = block.size;
            selectedIdx = j;
          }

          newHistory.push({
            blocks: JSON.parse(JSON.stringify(blocks)),
            processes: JSON.parse(JSON.stringify(processes)),
            step: newHistory.length,
            description: `Checking Block ${block.id} for Process P${process.id} (${process.size} KB)`,
            currentProcess: process.id,
            checkingBlock: block.id,
            comparisons: JSON.parse(JSON.stringify(comparisons)),
            worstFitSoFar: selectedIdx !== -1 ? blocks[selectedIdx].id : undefined
          });
        }
      }

      allocateProcess(selectedIdx, process, i, comparisons);
    }

    return newHistory;
  }, []);

  const calculateStats = useCallback((currentState: HistoryStep): Stats => {
    const totalMemory = currentState.blocks.reduce((sum, block) => sum + block.originalSize, 0);
    const allocatedBlocks = currentState.blocks.filter(b => !b.isFree);
    const memoryAllocated = allocatedBlocks.reduce((sum, block) => 
      sum + (block.originalSize - block.size), 0
    );
    const memoryWasted = allocatedBlocks.reduce((sum, block) => sum + block.size, 0);
    const successCount = currentState.processes.filter(p => p.allocated).length;
    const failCount = currentState.processes.length - successCount;
    const fragmentation = totalMemory > 0 
      ? Math.round((memoryWasted / totalMemory) * 100) 
      : 0;

    return {
      totalMemory,
      memoryAllocated,
      memoryWasted,
      successCount,
      failCount,
      fragmentation
    };
  }, []);

  return {
    algorithm,
    setAlgorithm,
    blocks,
    setBlocks,
    processes,
    setProcesses,
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
  };
};
