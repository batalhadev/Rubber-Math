import type { Step } from '../types';

// Converts the editor text into renderable preview steps.
export const parseSteps = (raw: string, isStepMode: boolean = true): Step[] => {
  if (!raw.trim() && isStepMode) return [];

  // Step mode treats each line as a separate equation; source mode renders the full input.
  const lines = isStepMode ? raw.split('\n') : [raw];

  return lines.map((line, index) => {
    const trimmed = line.trim();
    // Inline comments after // are separated from the equation body.
    const commentIdx = trimmed.indexOf('//');
    
    let comment = '';
    let eq = trimmed;

    if (commentIdx !== -1) {
      comment = trimmed.slice(commentIdx + 2).trim();
      eq = trimmed.slice(0, commentIdx).trim();
    }

    // Stable IDs let React preserve row identity while the preview updates.
    const idHash = btoa(encodeURIComponent(line)).substring(0, 10);

    return {
      id: `step-${index}-${idHash}`, 
      eq: eq,
      comment: comment,
      empty: eq === '' && comment === ''
    };
  });
};
