import { Copy } from 'lucide-react';
import { useMemo } from 'react';
import { parseSteps } from '../../core/parser';
import { useAppStore } from '../../store/useAppStore';
import { StepRow } from './StepRow';

export const PreviewArea = () => {
  const { rawText, stepMode } = useAppStore();

  // Recomputes parsed steps only when the source text or mode changes.
  const steps = useMemo(() => {
    return parseSteps(rawText, stepMode);
  }, [rawText, stepMode]);

  // Copies the exact editor source so users can paste the LaTeX elsewhere.
  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-bg-primary min-w-0">
      {/* Preview header with the section label and copy command. */}
      <div className="flex items-center justify-between h-7 px-4 border-b border-border shrink-0">
        <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Renderização</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold text-text-secondary hover:text-text-primary bg-bg-elevated border border-border rounded hover:border-border-hover transition-colors cursor-pointer"
        >
          <Copy size={10} />
          copiar latex
        </button>
      </div>

      {/* Scrollable preview content for rendered equations. */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {steps.map((step, index) => (
          <StepRow key={step.id} step={step} index={index} />
        ))}

        {steps.length === 0 && (
          // Empty state keeps the preview area from feeling broken before input exists.
          <div className="flex items-center justify-center h-full text-text-muted italic text-sm">
            a equação aparecerá aqui...
          </div>
        )}
      </div>
    </div>
  );
};
