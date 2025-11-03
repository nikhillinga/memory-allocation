import { Algorithm } from '@/types/memory';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface AlgorithmSelectorProps {
  selected: Algorithm;
  onChange: (algorithm: Algorithm) => void;
  disabled?: boolean;
}

const algorithms: { value: Algorithm; label: string; description: string }[] = [
  {
    value: 'first-fit',
    label: 'First-Fit',
    description: 'First available block'
  },
  {
    value: 'best-fit',
    label: 'Best-Fit',
    description: 'Smallest suitable block'
  },
  {
    value: 'worst-fit',
    label: 'Worst-Fit',
    description: 'Largest available block'
  }
];

export const AlgorithmSelector = ({ selected, onChange, disabled }: AlgorithmSelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <RadioGroup
        value={selected}
        onValueChange={(value) => onChange(value as Algorithm)}
        disabled={disabled}
        className="flex gap-3"
      >
        {algorithms.map((algo) => (
          <div
            key={algo.value}
            className={cn(
              "flex cursor-pointer items-center space-x-2 rounded-lg border-2 border-transparent bg-input px-4 py-2 transition-all hover:border-primary hover:shadow-glow-primary",
              selected === algo.value && "border-primary bg-primary/20 shadow-glow-active"
            )}
            onClick={() => !disabled && onChange(algo.value)}
          >
            <RadioGroupItem value={algo.value} id={algo.value} disabled={disabled} />
            <Label
              htmlFor={algo.value}
              className="cursor-pointer"
            >
              <div className="text-sm font-semibold text-foreground">{algo.label}</div>
              <div className="text-xs text-muted-foreground">{algo.description}</div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
