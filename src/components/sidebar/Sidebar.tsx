import { useState } from 'react';
import { shortcutData } from '../../config/shortcuts';
import { useAppStore } from '../../store/useAppStore';

export const Sidebar = () => {
  const [query, setQuery] = useState('');
  const { injectText } = useAppStore();

  // Filters every shortcut category while preserving category labels.
  const filtered = shortcutData.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      !query || item.name.toLowerCase().includes(query.toLowerCase()) || item.sym.includes(query)
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <aside className="w-200px flex flex-col bg-[#181c26] border-r border-[#2d3348] shrink-0 h-full">
      {/* Search input controls which shortcuts remain visible. */}
      <div className="p-2 border-b border-[#2d3348]">
        <input
          type="text"
          placeholder="Buscar atalho ou símbolo..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-[#0f1117] border border-[#2d3348] rounded px-2 py-1 text-[11px] text-[#8a93b0] placeholder-[#3d4560] outline-none focus:border-[#555e78] transition-colors"
        />
      </div>

      {/* Shortcut list grouped by mathematical category. */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filtered.map((cat) => (
          <div key={cat.tag}>
            {/* Category heading labels each group of related snippets. */}
            <div className="px-3 pt-3 pb-1 text-[9px] font-bold text-[#e2791a] uppercase tracking-widest">
              {cat.tag}
            </div>
            {cat.items.map((item) => (
              <button
                key={item.name}
                title={item.name}
                onClick={() => injectText(item.tex)} // Inserts the snippet at the cursor.
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#1e2230] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-mono text-[#e2e6f0] w-5 text-center">{item.sym}</span>
                  <span className="text-[11px] text-[#8a93b0] group-hover:text-[#e2e6f0] transition-colors">{item.name}</span>
                </div>
                {item.key && (
                  <span className="text-[9px] text-[#3d4560] font-mono bg-[#0f1117] px-1.5 py-0.5 rounded border border-[#2d3348]">
                    {item.key}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};
