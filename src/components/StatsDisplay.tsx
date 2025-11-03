import { Stats } from '@/types/memory';
import { Card } from '@/components/ui/card';

interface StatsDisplayProps {
  stats: Stats;
}

export const StatsDisplay = ({ stats }: StatsDisplayProps) => {
  const statItems = [
    { label: 'Total Memory', value: `${stats.totalMemory} KB` },
    { label: 'Allocated', value: `${stats.memoryAllocated} KB` },
    { label: 'Wasted', value: `${stats.memoryWasted} KB` },
    { label: 'Success', value: stats.successCount },
    { label: 'Failed', value: stats.failCount },
    { label: 'Fragmentation', value: `${stats.fragmentation}%` }
  ];

  return (
    <Card className="p-4 shadow-glow-primary">
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-border/50 bg-background/50 p-3 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background/80"
          >
            <div className="text-xs font-medium text-muted-foreground">
              {item.label}
            </div>
            <div className="mt-0.5 text-xl font-bold text-foreground">{item.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
