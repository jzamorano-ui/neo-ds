// packages/foundations/tokens/stroke.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { stroke as P } from './_primitives.mjs';
import { dualPxVars } from './_util.mjs';

export const stroke = {
  none:               P[0],
  xs:                 P[25],
  sm:                 P[50],
  md:                 P[75],
  'focus-ring-width': P[50],
};

export const themeSlice = { neo: { stroke } };

export const cssVars = dualPxVars('stroke', stroke);
