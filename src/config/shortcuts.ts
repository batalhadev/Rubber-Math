// Shared shortcut catalog used by the editor keybinds and the sidebar.

import type { ShortcutCategory } from '../types';

// Each category groups related LaTeX snippets with optional keyboard shortcuts.
export const shortcutData: ShortcutCategory[] = [
  {
    tag: "Funções Algébricas",
    items: [
      { name: "Fração", sym: "a/b", key: "⇧F", tex: "\\frac{□}{□}" },
      { name: "Raiz quadrada", sym: "√x", key: "⇧S", tex: "\\sqrt[2]{□}" },
      { name: "Expoente", sym: "xⁿ", key: "Ctrl↑", tex: "^{□}" },
      { name: "Subscrito", sym: "xₙ", key: "Ctrl↓", tex: "_{□}" },
      { name: "Limite", sym: "lim", key: "⇧O", tex: "\\lim_{□ \\to □} f(□) = □" },
      { name: "Derivada Parcial", sym: "∂", key: "⇧D", tex: "\\frac{\\partial f}{\\partial □}" }
    ]
  },
  {
    tag: "Letras Gregas",
    items: [
      { name: "Alpha", sym: "α", key: "Alt+A", tex: "\\alpha" },
      { name: "Beta", sym: "β", key: "Alt+B", tex: "\\beta" },
      { name: "Gamma", sym: "γ", key: "Alt+G", tex: "\\gamma" },
      { name: "Delta", sym: "δ", key: "Alt+D", tex: "\\delta" },
      { name: "Pi", sym: "π", key: "Alt+P", tex: "\\pi" },
      { name: "Omega", sym: "ω", key: "Alt+W", tex: "\\omega" }
    ]
  },
  {
    tag: "Operadores",
    items: [
      { name: "Infinito", sym: "∞", key: "⇧A", tex: "\\infty" },
      { name: "Somatório", sym: "Σ", key: "⇧M", tex: "\\sum_{□}^{□}" },
      { name: "Integral", sym: "∫", key: "⇧I", tex: "\\int_{□}^{□} □ \\, d□" },
      { name: "Aproximado", sym: "≈", key: "", tex: "\\approx" },
      { name: "Diferente", sym: "≠", key: "", tex: "\\neq" }
    ]
  },
  {
    tag: "Conjuntos",
    items: [
      { name: "Reais", sym: "ℝ", key: "⇧R", tex: "\\mathbb{R}" },
      { name: "Inteiros", sym: "ℤ", key: "⇧Z", tex: "\\mathbb{Z}" },
      { name: "Complexos", sym: "ℂ", key: "⇧C", tex: "\\mathbb{C}" },
      { name: "Pertence", sym: "∈", key: "", tex: "\\in" },
      { name: "União", sym: "∪", key: "", tex: "\\cup" }
    ]
  },
  {
    tag: "Navegação",
    items: [
      { name: "Nova linha", sym: "↵", key: "Enter", tex: "" },
      { name: "Jump", sym: "⇥", key: "Tab", tex: "" },
      { name: "Comentário", sym: "//", key: "//", tex: "" }
    ]
  }
];
