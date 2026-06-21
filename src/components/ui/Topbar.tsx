import { useAppStore } from '../../store/useAppStore';

// Top navigation groups mode controls, reset action, and document counters.
export const Topbar = () => {
  const { stepMode, toggleStepMode, rawText } = useAppStore();
  // Counters are derived from the current editor contents.
  const charCount = rawText.length;
  const lineCount = rawText ? rawText.split('\n').length : 1;

  return (
    <header className="shrink-0 bg-[#181c26] border-b border-[#2d3348]">
      {/* First row contains the product title and primary actions. */}
      <div className="flex items-center justify-between h-10 px-4">
        <span className="text-sm font-bold tracking-wide text-[#e2e6f0]">Rubber Math</span>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleStepMode}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded border transition-colors cursor-pointer ${
              stepMode
                ? 'bg-[#1e2230] border-[#5dcaa5] text-[#5dcaa5]'
                : 'bg-[#1e2230] border-[#2d3348] text-[#8a93b0] hover:border-[#555e78]'
            }`}
          >
            passo a passo {stepMode ? '✓' : ''}
          </button>
          <button
            onClick={() => useAppStore.getState().setRawText('')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded border border-[#2d3348] bg-[#1e2230] text-[#8a93b0] hover:border-[#555e78] transition-colors cursor-pointer"
          >
            × claro
          </button>
        </div>
      </div>

      {/* Second row contains mode tabs and live text counters. */}
      <div className="flex items-center justify-between h-7 px-4 border-t border-[#2d3348]">
        <div className="flex items-center gap-0">
          <button
            onClick={() => stepMode && toggleStepMode()}
            className={`px-3 h-7 text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer ${
              !stepMode ? 'text-[#e2e6f0] border-b-2 border-[#e2e6f0]' : 'text-[#555e78] hover:text-[#8a93b0]'
            }`}
          >
            Fonte LaTeX
          </button>
          <span className="text-[#2d3348] text-xs">›</span>
          <button
            onClick={() => !stepMode && toggleStepMode()}
            className={`px-3 h-7 text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer ${
              stepMode ? 'text-[#e2e6f0] border-b-2 border-[#e2e6f0]' : 'text-[#555e78] hover:text-[#8a93b0]'
            }`}
          >
            Passo a Passo
          </button>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#555e78] tracking-wider">
          <span>{charCount} CHARS</span>
          <span>·</span>
          <span>{lineCount} {lineCount === 1 ? 'LINHA' : 'LINHAS'}</span>
        </div>
      </div>
    </header>
  );
};
