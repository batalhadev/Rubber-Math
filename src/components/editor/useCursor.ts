import { useRef } from 'react';

// Provides textarea cursor helpers for components that need local cursor control.
export function useCursor(setRawText: (text: string) => void) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Inserts snippets into the current selection and restores focus afterward.
  const injectAtCursor = (snippet: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newText = el.value.slice(0, start) + snippet + el.value.slice(end);
    setRawText(newText);
    requestAnimationFrame(() => {
      // Selects the placeholder square when snippets include an editable slot.
      const cursorPos = start + snippet.indexOf('□');
      el.setSelectionRange(
        cursorPos >= 0 ? cursorPos : start + snippet.length,
        cursorPos >= 0 ? cursorPos + 1 : start + snippet.length
      );
      el.focus();
    });
  };

  // Keeps Tab inside the editor instead of moving focus away.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') { e.preventDefault(); injectAtCursor('  '); }
  };

  return { textareaRef, handleKeyDown, injectAtCursor };
}
