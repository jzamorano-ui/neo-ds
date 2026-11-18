// packages/foundations/tokens/radius.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { radius as P } from './_primitives.mjs';
import { dualPxVars } from './_util.mjs';

export const radius = {
  none:  P[0],
  xs:    P[50],
  sm:    P[100],
  md:    P[150],
  lg:    P[200],
  xl:    P[300],
  '2xl': P[400],
  pill:  P.full,
};

export const themeSlice = { shape: { borderRadius: radius.sm }, neo: { radius } };

export const cssVars = dualPxVars('radius', radius);
