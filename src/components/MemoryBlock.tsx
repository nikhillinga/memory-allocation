import { MemoryBlock as MemoryBlockType } from '@/types/memory';
import { cn } from '@/lib/utils';

interface MemoryBlockProps {
  block: MemoryBlockType;
  isChecking?: boolean;
  isBestFit?: boolean;
  isFilling?: boolean;
  fillPercent?: number;
}

export const MemoryBlock = ({
  block,
  isChecking,
  isBestFit,
  isFilling,
  fillPercent = 0
}: MemoryBlockProps) => {
  const allocatedSize = block.originalSize - block.size;
  const fillHeight = block.originalSize > 0 ? (allocatedSize / block.originalSize) * 100 : 0;
  const freeHeight = 100 - fillHeight;

  return (
    <div className="relative flex flex-col items-center">
      {/* Block Header Info */}
      <div className="mb-3 text-center">
        <div className="text-lg font-bold text-primary">
          B{block.id}
        </div>
        <div className="text-xs text-muted-foreground">
          {block.originalSize} KB
        </div>
        {!block.isFree && block.process && (
          <div className="mt-1 rounded bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
            P{block.process}
          </div>
        )}
      </div>

      {/* Memory Block Visualization */}
      <div
        className={cn(
          "relative flex min-h-[200px] w-28 flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300",
          block.isFree
            ? "border-border bg-memory-free"
            : "border-primary bg-memory-free shadow-[0_0_25px_hsl(var(--primary)/0.6)]",
          isChecking && "border-memory-checking shadow-glow-strong animate-[flash_0.8s_ease-in-out]",
          isBestFit && "border-memory-best shadow-glow-active",
          isFilling && "animate-pulse"
        )}
        style={{
          height: `${Math.max(180, block.originalSize * 1.5)}px`
        }}
      >
        {/* Free space at top (for allocated blocks) */}
        {!block.isFree && block.size > 0 && (
          <div 
            className="flex items-center justify-center border-b border-dashed border-border/30 bg-memory-free p-2 text-center text-[10px] text-muted-foreground"
            style={{
              height: `${freeHeight}%`,
              minHeight: '30px'
            }}
          >
            {block.size} KB Free
          </div>
        )}

        {/* Free block label (when fully free) */}
        {block.isFree && (
          <div className="flex flex-1 items-center justify-center p-2 text-center text-xs text-muted-foreground">
            {block.size} KB Free
          </div>
        )}

        {/* Filled portion */}
        {!block.isFree && (
          <div
            className="flex flex-col items-center justify-center bg-gradient-to-t from-primary to-secondary text-sm font-bold text-primary-foreground transition-all duration-1000"
            style={{
              height: `${isFilling ? fillPercent : fillHeight}%`,
              minHeight: '40px'
            }}
          >
            <span className="drop-shadow-md">
              P{block.process}
            </span>
            <span className="mt-1 text-[10px] drop-shadow-md">
              {allocatedSize} KB
            </span>
          </div>
        )}

        {/* Status indicator */}
        {isChecking && !isBestFit && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-memory-checking px-3 py-1 text-xs font-bold text-white shadow-glow-strong">
            Checking...
          </div>
        )}

        {isBestFit && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-memory-best px-3 py-1 text-xs font-bold text-white shadow-glow-active">
            Best Fit!
          </div>
        )}
      </div>
    </div>
  );
};
