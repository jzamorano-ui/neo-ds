// packages/foundations/tokens/shadows.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { shadow as P } from './_primitives.mjs';
import { P as PFX } from './_brand.mjs';

export const elevation = { none: P[0], sm: P[1], md: P[2], lg: P[3], 'top-md': P[4] };

const fill = (n, v) => Array(n).fill(v);
export const shadows = ['none', ...fill(4, P[1]), ...fill(8, P[2]), ...fill(12, P[3])];

export const themeSlice = { shadows, neo: { elevation } };

export const cssVars = Object.fromEntries(
  Object.entries(elevation).map(([k, v]) => [`--${PFX}-elevation-${k}`, v]),
);
