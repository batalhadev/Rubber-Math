import { useMemo } from 'react';
import { shortcutData } from '../../config/shortcuts';
import { getNextJumpPoint } from '../../core/navigation';
import { useAppStore } from '../../store/useAppStore';

export const Editor = () => {
  const { rawText, setRawText, stepMode, editorRef, injectText } = useAppStore();

  // Builds a lookup table from configured shortcut labels to inserted snippets.
  const keybindsMap = useMemo(() => {
    const map: Record<string, string> = {};
    shortcutData.forEach(cat => {
      cat.items.forEach(item => {
        if (item.key) {
          const parts = [];
          if (item.key.includes('⇧') || item.key.includes('Shift')) parts.push('shift');
          if (item.key.includes('⌃') || item.key.includes('Ctrl')) parts.push('ctrl');
          if (item.key.includes('⌥') || item.key.includes('Alt')) parts.push('alt');
          const char = item.key.replace(/[⇧⌃⌥]/g, '').replace(/(Shift|Ctrl|Alt)\+?/g, '').toLowerCase();
          if (char) parts.push(char);
          map[parts.join('-')] = item.tex;
        }
      });
    });
    return map;
  }, []);

  // Placeholder text mirrors the active editing mode.
  const placeholder = stepMode
    ? `Escreva uma equação por linha...\nf(x) = x^2`
    : `Digite seu LaTeX aqui...`;

  // Handles snippet shortcuts and jump navigation inside the textarea.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = editorRef.current;
      if (!el) return;

      const jump = getNextJumpPoint(el.value, el.selectionStart, el.selectionEnd, e.shiftKey);

      if (jump) {
        el.setSelectionRange(jump[0], jump[1]);
      } else {
        const insertPos = el.selectionEnd;
        const newText = el.value.slice(0, insertPos) + '  ' + el.value.slice(insertPos);
        setRawText(newText);
        requestAnimationFrame(() => {
          el.setSelectionRange(insertPos + 2, insertPos + 2);
          el.focus();
        });
      }
      return;
    }

    // Normalizes the pressed modifier keys into the same format used by shortcuts.
    const parts = [];
    if (e.shiftKey) parts.push('shift');
    if (e.ctrlKey || e.metaKey) parts.push('ctrl');
    if (e.altKey) parts.push('alt');
    
    if (!['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
      parts.push(e.key.toLowerCase());
    }

    const pressedCombo = parts.join('-');

    // Inserts the matching snippet when a configured keybind is pressed.
    if (keybindsMap[pressedCombo]) {
      e.preventDefault();
      injectText(keybindsMap[pressedCombo]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-bg-primary">
      {/* Main controlled textarea for authoring equations and comments. */}
      <textarea
        ref={editorRef}
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-full px-6 py-4 bg-transparent text-text-primary font-mono text-sm resize-none outline-none leading-relaxed placeholder:text-text-muted"
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
};
