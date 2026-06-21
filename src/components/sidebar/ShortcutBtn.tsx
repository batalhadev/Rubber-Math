import type { ShortcutItem } from '../../types';

interface ShortcutBtnProps {
  item: ShortcutItem;
}

// Compact button that displays a shortcut symbol.
export const ShortcutBtn = ({ item }: ShortcutBtnProps) => {
  return (
    <button 
      title={`${item.name} (${item.key || 'Sem atalho'})`}
      className="bg-bg-elevated border border-border text-text-primary rounded py-2 text-sm hover:bg-border hover:border-border-hover transition-colors cursor-pointer flex items-center justify-center font-mono"
    >
      {item.sym}
    </button>
  );
};
