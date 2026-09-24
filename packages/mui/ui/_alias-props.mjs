// packages/mui/ui/_alias-props.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.

export const ALIAS_PROPS = {
  acciones: 'actions',
  cerrar: 'closable',
  onVolver: 'onBack',
};

const alreadyWarned = new Set();

export function withAliases(component, props) {
  let result = props;
  for (const [oldName, newName] of Object.entries(ALIAS_PROPS)) {
    if (!(oldName in props)) continue;
    if (result === props) result = { ...props };
    if (!(newName in result)) result[newName] = result[oldName];
    delete result[oldName];
    const key = `${component}.${oldName}`;
    if (process.env.NODE_ENV !== 'production' && !alreadyWarned.has(key)) {
      alreadyWarned.add(key);
      console.warn(`[Neo] ${component}: the prop \`${oldName}\` is now called \`${newName}\`, since the move to English. `
        + 'It still works in this version and stops working in the next one.');
    }
  }
  return result;
}
