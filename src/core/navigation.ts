export interface JumpRegion {
  start: number;
  end: number;
}

/**
 * Maps all editable regions (□ or content inside braces/brackets)
 * and organizes them in depth-first reading order.
 */
export function findJumpRegions(text: string): JumpRegion[] {
  const regions: JumpRegion[] = [];
  const stack: { type: string; index: number }[] = [];

  // Find every possible jump region in the current editor text.
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (char === '□') {
      regions.push({ start: i, end: i + 1 });
    } else if (char === '{' || char === '[') {
      stack.push({ type: char, index: i });
    } else if (char === '}' || char === ']') {
      // Tolerates small user mistakes by looking for the latest matching opener.
      const matchType = char === '}' ? '{' : '[';
      const topIndex = stack.map(s => s.type).lastIndexOf(matchType);
      
      if (topIndex !== -1) {
        const top = stack.splice(topIndex, 1)[0];
        // Adds the content inside the delimiters as a jump region.
        regions.push({ start: top.index + 1, end: i });
      }
    }
  }

  // Removes exact duplicates, such as {□} producing the same region twice.
  const uniqueRegions = regions.filter((r, index, self) =>
    index === self.findIndex((t) => t.start === r.start && t.end === r.end)
  );

  // Sorts regions hierarchically so outer ranges come before nested ranges.
  uniqueRegions.sort((a, b) => {
    if (a.start === b.start) {
      // If two regions start together, the larger outer region comes first.
      return b.end - a.end; 
    }
    // Otherwise regions follow normal left-to-right reading order.
    return a.start - b.start;
  });

  return uniqueRegions;
}

/**
 * Navigates the region tree based on the current selection.
 */
export function getNextJumpPoint(text: string, cursorStart: number, cursorEnd: number, isShift: boolean): [number, number] | null {
  const regions = findJumpRegions(text);
  if (regions.length === 0) return null;

  // Checks whether the current selection exactly matches a known region.
  const currentIndex = regions.findIndex(r => r.start === cursorStart && r.end === cursorEnd);

  if (currentIndex !== -1) {
    if (!isShift) {
      // TAB moves to the next region in the tree.
      const next = regions[(currentIndex + 1) % regions.length];
      return [next.start, next.end];
    } else {
      // SHIFT + TAB moves back to the previous region.
      const prev = regions[(currentIndex - 1 + regions.length) % regions.length];
      return [prev.start, prev.end];
    }
  }

  // Handles a collapsed cursor that is not already selecting a region.
  if (!isShift) {
    // TAB jumps to the first region ahead of the cursor.
    for (const r of regions) {
      if (r.start >= cursorStart) {
        return [r.start, r.end];
      }
    }
    return [regions[0].start, regions[0].end];
  } else {
    // SHIFT + TAB jumps to the nearest region behind the cursor.
    for (let i = regions.length - 1; i >= 0; i--) {
      const r = regions[i];
      if (r.end <= cursorEnd) {
        return [r.start, r.end];
      }
    }
    return [regions[regions.length - 1].start, regions[regions.length - 1].end];
  }
}
