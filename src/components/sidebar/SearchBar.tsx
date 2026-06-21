import React from 'react';

// Reusable search field for filtering shortcut collections.
const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Buscar atalho..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    // Inline styles keep this standalone component independent from Tailwind classes.
    style={{
      width: '100%', padding: '0.4rem 0.6rem',
      background: 'var(--bg)', border: '1px solid var(--border)',
      borderRadius: '4px', color: 'var(--text)', fontSize: '0.85rem',
    }}
  />
);

export default SearchBar;
