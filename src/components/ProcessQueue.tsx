import { Process } from '@/types/memory';
import { cn } from '@/lib/utils';

interface ProcessQueueProps {
  processes: Process[];
  currentProcessId?: number;
}

export const ProcessQueue = ({ processes, currentProcessId }: ProcessQueueProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-glow-primary">
      <h3 className="mb-4 text-lg font-bold text-primary">Process Queue</h3>
      <div className="space-y-2">
        {processes.map((process) => (
          <div
            key={process.id}
            className={cn(
              "rounded-lg border-2 border-border bg-input p-3 text-center transition-all duration-300",
              currentProcessId === process.id &&
                "scale-105 border-primary bg-primary text-primary-foreground shadow-glow-strong",
              process.allocated && "opacity-40 line-through"
            )}
          >
            <div className="text-sm font-bold">P{process.id}</div>
            <div className="text-xs">{process.size} KB</div>
            {process.allocated && process.blockId && (
              <div className="mt-1 text-xs opacity-70">→ B{process.blockId}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
