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
    <aside className="w-200px flex flex-col bg-bg-secondary border-r border-border shrink-0 h-full">
      {/* Search input controls which shortcuts remain visible. */}
      <div className="p-2 border-b border-border">
        <input
          type="text"
          placeholder="Buscar atalho ou símbolo..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-bg-primary border border-border rounded px-2 py-1 text-[11px] text-text-secondary placeholder:text-text-muted outline-none focus:border-border-hover transition-colors"
        />
      </div>

      {/* Shortcut list grouped by mathematical category. */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filtered.map((cat) => (
          <div key={cat.tag}>
            {/* Category heading labels each group of related snippets. */}
            <div className="px-3 pt-3 pb-1 text-[9px] font-bold text-accent uppercase tracking-widest">
              {cat.tag}
            </div>
            {cat.items.map((item) => (
              <button
                key={item.name}
                title={item.name}
                onClick={() => injectText(item.tex)} // Inserts the snippet at the cursor.
                className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-bg-elevated transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-mono text-text-primary w-5 text-center">{item.sym}</span>
                  <span className="text-[11px] text-text-secondary group-hover:text-text-primary transition-colors">{item.name}</span>
                </div>
                {item.key && (
                  <span className="text-[9px] text-text-muted font-mono bg-bg-primary px-1.5 py-0.5 rounded border border-border">
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
