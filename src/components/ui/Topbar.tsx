import { useAppStore } from '../../store/useAppStore';

// Top navigation groups mode controls, reset action, and document counters.
export const Topbar = () => {
  const { stepMode, toggleStepMode, rawText } = useAppStore();
  // Counters are derived from the current editor contents.
  const charCount = rawText.length;
  const lineCount = rawText ? rawText.split('\n').length : 1;

  return (
    <header className="shrink-0 bg-bg-secondary border-b border-border">
      {/* First row contains the product title and primary actions. */}
      <div className="flex items-center justify-between h-10 px-4">
        <div className="flex items-center gap-2">
          <img 
           src="/favicon.svg" 
            alt="Logótipo Rubber Math" 
           className="w-10 h-10 object-contain" 
            />
          <span className="text-sm font-bold tracking-wide text-text-prime">Rubber Math</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleStepMode}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded border transition-colors cursor-pointer ${
              stepMode
                ? 'bg-bg-elevated border-success text-success'
                : 'bg-bg-elevated border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
            }`}
          >
            Passo a Passo {stepMode ? '✓' : ''}
          </button>
          <button
            onClick={() => useAppStore.getState().setRawText('')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded border border-border bg-bg-elevated text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors cursor-pointer"
          >
            × Limpar
          </button>
        </div>
      </div>

      {/* Second row contains mode tabs and live text counters. */}
      <div className="flex items-center justify-between h-7 px-4 border-t border-border">
        <div className="flex items-center gap-0">
          <button
            onClick={() => stepMode && toggleStepMode()}
            className={`px-3 h-7 text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer ${
              !stepMode ? 'text-accent border-b-2 border-accent' : 'text-text-muted hover:text-accent-hover'
            }`}
          >
            Fonte LaTeX
          </button>
          <span className="text-border text-xs">›</span>
          <button
            onClick={() => !stepMode && toggleStepMode()}
            className={`px-3 h-7 text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer ${
              stepMode ? 'text-accent border-b-2 border-accent' : 'text-text-muted hover:text-accent-hover'
            }`}
          >
            Passo a Passo
          </button>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-text-muted tracking-wider">
          <span>{charCount} CHARS</span>
          <span>·</span>
          <span>{lineCount} {lineCount === 1 ? 'LINHA' : 'LINHAS'}</span>
        </div>
      </div>
    </header>
  );
};
