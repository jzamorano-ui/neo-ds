// packages/foundations/tokens/component-tokens.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { rem } from './_util.mjs';
import { P } from './_brand.mjs';

export const component = {
  button: { height: { sm: 32, md: 40, lg: 48 } },
  switch: { width: 48, height: 44, trackHeight: 24, thumbTravel: 24 },
  input: { height: 44 },
  radio: { dot: 10 },
  menu: { minWidth: 200 },
  menuItem: { minHeight: 40 },
};

export const themeSlice = { neo: { component } };

const kebab = (s) => s.replace(/([A-Z])/g, '-$1').toLowerCase();
const flat = [];
const walk = (obj, path) => { for (const [k, v] of Object.entries(obj)) { const p = [...path, kebab(k)]; typeof v === 'object' ? walk(v, p) : flat.push([p.join('-'), v]); } };
walk(component, []);

export const cssVars = Object.fromEntries(flat.flatMap(([name, v]) => [
  [`--${P}-${name}`, `${v}px`],
  [`--${P}-${name}-rem`, rem(v)],
]));
