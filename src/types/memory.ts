export interface MemoryBlock {
  id: number;
  originalSize: number;
  size: number;
  isFree: boolean;
  process: number | null;
}

export interface Process {
  id: number;
  size: number;
  allocated: boolean;
  blockId: number | null;
}

export interface Comparison {
  blockId: number;
  blockSize: number;
  suitable: boolean;
  wastage: number | null;
}

export interface HistoryStep {
  blocks: MemoryBlock[];
  processes: Process[];
  step: number;
  description: string;
  currentProcess?: number;
  checkingBlock?: number;
  fillingBlock?: number;
  fillPercent?: number;
  allocatedBlock?: number;
  comparisons?: Comparison[];
  bestFitSoFar?: number;
  worstFitSoFar?: number;
  wastage?: number;
  success?: boolean;
}

export type Algorithm = 'first-fit' | 'best-fit' | 'worst-fit';

export interface AlgorithmInfo {
  name: string;
  description: string;
  strategy: string;
  timeComplexity: string;
  advantages: string[];
  disadvantages: string[];
  pseudoCode: string;
}

export interface Stats {
  totalMemory: number;
  memoryAllocated: number;
  memoryWasted: number;
  successCount: number;
  failCount: number;
  fragmentation: number;
}
