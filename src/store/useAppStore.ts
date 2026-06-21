import { create } from 'zustand';

interface AppState {
  rawText: string;
  stepMode: boolean;
  isDark: boolean;
  // Reference that points to the real textarea element.
  editorRef: { current: HTMLTextAreaElement | null };
  
  setRawText: (text: string) => void;
  toggleStepMode: () => void;
  toggleTheme: () => void;
  // Inserts a LaTeX snippet at the current cursor position.
  injectText: (snippet: string) => void;
}

// Central store for editor content, display mode, and snippet insertion.
export const useAppStore = create<AppState>((set, get) => ({
  rawText: 'f(x) = x^2 - 4x + 4   // definição\nf(x) = (x-2)^2        // fatorando',
  stepMode: true,
  isDark: true,
  editorRef: { current: null },
  
  setRawText: (text) => set({ rawText: text }),
  toggleStepMode: () => set((state) => ({ stepMode: !state.stepMode })),
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  
  injectText: (snippet) => {
    // Reads the real textarea element before changing the text.
    const el = get().editorRef.current;
    if (!el) return;
    
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const currentText = el.value;
    
    // Splices the snippet into the current selection range.
    const newText = currentText.slice(0, start) + snippet + currentText.slice(end);
    
    // Stores the updated editor text.
    set({ rawText: newText });
    
    // Moves the cursor after React has rendered the new textarea value.
    requestAnimationFrame(() => {
      // Selects the placeholder square when the snippet provides one.
      const cursorPos = start + snippet.indexOf('□');
      el.setSelectionRange(
        cursorPos >= 0 ? cursorPos : start + snippet.length,
        cursorPos >= 0 ? cursorPos + 1 : start + snippet.length
      );
      el.focus();
    });
  }
}));
