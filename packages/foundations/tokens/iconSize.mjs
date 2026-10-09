// packages/foundations/tokens/iconSize.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { iconSize as P } from './_primitives.mjs';
import { dualPxVars } from './_util.mjs';

export const iconSize = {
  xs:    P[200],
  sm:    P[250],
  md:    P[300],
  lg:    P[400],
  xl:    P[500],
  '2xl': P[600],
  '3xl': P[700],
  '4xl': P[800],
};

export const themeSlice = { neo: { iconSize } };

export const cssVars = dualPxVars('icon-size', iconSize);
