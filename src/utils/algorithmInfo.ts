import { Algorithm, AlgorithmInfo } from '@/types/memory';

export const ALGORITHM_INFO: Record<Algorithm, AlgorithmInfo> = {
  'first-fit': {
    name: 'First-Fit',
    description: 'Allocates to the FIRST block that fits - Quick but may waste space',
    strategy: 'Linear search from start, stop at first suitable block',
    timeComplexity: 'O(n) in worst case, but typically faster',
    advantages: [
      'Fast allocation - stops at first fit',
      'Simple to implement',
      'Good for fast-paced systems'
    ],
    disadvantages: [
      'Can cause external fragmentation',
      'May leave small unusable holes',
      'Not optimal memory utilization'
    ],
    pseudoCode: `function firstFit(blocks[], process):
  for i = 0 to blocks.length-1:
    if blocks[i].isFree AND blocks[i].size >= process.size:
      allocate process to blocks[i]
      blocks[i].size = blocks[i].size - process.size
      return success
  return failure`
  },
  'best-fit': {
    name: 'Best-Fit',
    description: 'Allocates to the SMALLEST block that fits - Minimizes wastage',
    strategy: 'Search entire list, find smallest suitable block',
    timeComplexity: 'O(n) - must check all blocks',
    advantages: [
      'Minimizes wasted space per allocation',
      'Better memory utilization',
      'Leaves larger blocks for future'
    ],
    disadvantages: [
      'Slower than First-Fit',
      'Creates tiny unusable fragments',
      'Must search entire list'
    ],
    pseudoCode: `function bestFit(blocks[], process):
  bestIdx = -1
  minWastage = infinity
  
  for i = 0 to blocks.length-1:
    if blocks[i].isFree AND blocks[i].size >= process.size:
      wastage = blocks[i].size - process.size
      if wastage < minWastage:
        minWastage = wastage
        bestIdx = i
  
  if bestIdx != -1:
    allocate process to blocks[bestIdx]
    blocks[bestIdx].size = minWastage
    return success
  return failure`
  },
  'worst-fit': {
    name: 'Worst-Fit',
    description: 'Allocates to the LARGEST block that fits - Leaves bigger leftover blocks',
    strategy: 'Search entire list, find largest suitable block',
    timeComplexity: 'O(n) - must check all blocks',
    advantages: [
      'Leaves larger usable holes',
      'Better for future large processes',
      'Reduces small fragment count'
    ],
    disadvantages: [
      'Poor memory utilization',
      'High fragmentation overall',
      'Wastes large blocks quickly'
    ],
    pseudoCode: `function worstFit(blocks[], process):
  worstIdx = -1
  maxBlockSize = -1
  
  for i = 0 to blocks.length-1:
    if blocks[i].isFree AND blocks[i].size >= process.size:
      if blocks[i].size > maxBlockSize:
        maxBlockSize = blocks[i].size
        worstIdx = i
  
  if worstIdx != -1:
    allocate process to blocks[worstIdx]
    blocks[worstIdx].size = blocks[worstIdx].size - process.size
    return success
  return failure`
  }
};
