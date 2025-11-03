import { Algorithm } from '@/types/memory';
import { ALGORITHM_INFO } from '@/utils/algorithmInfo';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface AlgorithmInfoProps {
  algorithm: Algorithm;
}

export const AlgorithmInfo = ({ algorithm }: AlgorithmInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const info = ALGORITHM_INFO[algorithm];

  return (
    <Card className="p-6 shadow-glow-primary">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Algorithm Info</h2>
          <ChevronDown
            className={`h-5 w-5 text-primary transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          <div className="rounded-xl border-2 border-primary/30 bg-primary/10 p-5">
            <h3 className="mb-3 text-xl font-bold text-primary">{info.name} Algorithm</h3>
            <p className="mb-2 text-foreground">
              <strong>Description:</strong> {info.description}
            </p>
            <p className="mb-2 text-foreground">
              <strong>Strategy:</strong> {info.strategy}
            </p>
            <p className="mb-4 text-foreground">
              <strong>Time Complexity:</strong> {info.timeComplexity}
            </p>
            <h4 className="mb-2 font-bold text-primary">Advantages:</h4>
            <ul className="mb-4 list-inside list-disc space-y-1 text-foreground">
              {info.advantages.map((adv, i) => (
                <li key={i}>{adv}</li>
              ))}
            </ul>
            <h4 className="mb-2 font-bold text-primary">Disadvantages:</h4>
            <ul className="list-inside list-disc space-y-1 text-foreground">
              {info.disadvantages.map((dis, i) => (
                <li key={i}>{dis}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 border-primary bg-black p-5 font-mono text-sm text-accent shadow-glow-primary">
            <pre className="whitespace-pre-wrap">{info.pseudoCode}</pre>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
