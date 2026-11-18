// packages/mui/ui/_aria.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.

export const splitAria = (props, ...kept) => {
  const aria = {}, others = {};
  for (const [k, v] of Object.entries(props)) {
    if (k.startsWith('aria-') && !kept.includes(k)) { if (v !== undefined) aria[k] = v; }
    else others[k] = v;
  }
  return [aria, others];
};
