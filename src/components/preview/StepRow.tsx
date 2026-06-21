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
    <div className="relative border border-[#2d3348] bg-[#181c26] rounded-md p-4 pl-12 shadow-sm group">
      {/* Numeric rail keeps step order visible while scanning the preview. */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#1e2230] border-r border-[#2d3348] flex items-center justify-center text-xs text-[#555e78] font-mono rounded-l-md">
        {index + 1}
      </div>
      
      {/* The equation body is passed to KaTeX for visual rendering. */}
      <div className="text-lg text-center my-2 overflow-x-auto overflow-y-hidden custom-scrollbar pb-2">
        <MathRenderer tex={step.eq} displayMode={true} />
      </div>
      
      {step.comment && (
        // Step comments are shown as secondary right-aligned notes.
        <div className="text-xs text-[#8a93b0] mt-2 border-t border-[#2d3348] pt-2 text-right italic">
          {step.comment}
        </div>
      )}
    </div>
  );
};
