// packages/foundations/tokens/spacing.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { space as P } from './_primitives.mjs';
import { dualPxVars } from './_util.mjs';

export const space = {
  none:  P.none,
  xs:    P[50],
  sm:    P[100],
  md:    P[150],
  lg:    P[200],
  xl:    P[300],
  '2xl': P[400],
  '3xl': P[600],
  '4xl': P[800],
  '5xl': P[900],
  '6xl': P[1000],
};

export const themeSlice = { spacing: 8, neo: { space } };

export const cssVars = dualPxVars('space', space);
