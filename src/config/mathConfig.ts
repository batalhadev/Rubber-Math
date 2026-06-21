// Math rendering defaults shared by preview components.
export const mathConfig = {
  renderer: 'katex' as const,
  // KaTeX stays permissive so invalid input is shown instead of breaking the UI.
  katexOptions: {
    throwOnError: false,
    displayMode: true,
  },
};
