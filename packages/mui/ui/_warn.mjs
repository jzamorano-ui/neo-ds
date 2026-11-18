// packages/mui/ui/_warn.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.

export const warn = (m) => {
  if (process.env.NODE_ENV !== 'production') console.warn('[Neo] ' + m);
};

export const hasAccessibleName = (comp, label, rest = {}) => {
  const named = (label !== undefined && label !== null && String(label).trim() !== '')
    || !!rest['aria-label'] || !!rest['aria-labelledby'];
  if (!named) warn(`${comp}: no visible \`label\` and no \`aria-label\` — the control has NO ACCESSIBLE `
    + 'NAME. It looks the same and cannot be operated with a screen reader.');
  return named;
};
