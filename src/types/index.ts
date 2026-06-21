// Shape for each insertable LaTeX shortcut.
export interface ShortcutItem {
  name: string;
  sym: string;
  key: string;
  tex: string;
}

// Sidebar groups shortcuts into named categories.
export interface ShortcutCategory {
  tag: string;
  items: ShortcutItem[];
}

// Parsed preview row generated from the editor source.
export interface Step {
  id: string;
  eq: string;
  comment: string;
  empty: boolean;
}
