import type { ShortcutItem } from '../../types';

interface ShortcutBtnProps {
  item: ShortcutItem;
}

// Compact button that displays a shortcut symbol.
export const ShortcutBtn = ({ item }: ShortcutBtnProps) => {
  return (
    <button 
      title={`${item.name} (${item.key || 'Sem atalho'})`}
      className="bg-[#1e2230] border border-[#2d3348] text-[#e2e6f0] rounded py-2 text-sm hover:bg-[#2d3348] hover:border-[#555e78] transition-colors cursor-pointer flex items-center justify-center font-mono"
    >
      {item.sym}
    </button>
  );
};
