import type { Step } from '../../types';
import { MathRenderer } from './MathRenderer';

interface StepRowProps {
  step: Step;
  index: number;
}

// Renders one parsed equation step and its optional explanatory note.
export const StepRow = ({ step, index }: StepRowProps) => {
  if (step.empty) return null;

  return (
    <div className="relative border border-border bg-bg-secondary rounded-md p-4 pl-12 shadow-sm group">
      {/* Numeric rail keeps step order visible while scanning the preview. */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-bg-elevated border-r border-border flex items-center justify-center text-xs text-text-muted font-mono rounded-l-md">
        {index + 1}
      </div>
      
      {/* The equation body is passed to KaTeX for visual rendering. */}
      <div className="text-lg text-center my-2 overflow-x-auto overflow-y-hidden custom-scrollbar pb-2">
        <MathRenderer tex={step.eq} displayMode={true} />
      </div>
      
      {step.comment && (
        // Step comments are shown as secondary right-aligned notes.
        <div className="text-xs text-text-secondary mt-2 border-t border-border pt-2 text-right italic">
          {step.comment}
        </div>
      )}
    </div>
  );
};
