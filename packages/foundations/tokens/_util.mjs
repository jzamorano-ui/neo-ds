// packages/foundations/tokens/_util.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { P } from './_brand.mjs';

export const REM_BASE = 16;

export const rem = (px) => `${+(px / REM_BASE).toFixed(4)}rem`;

export const dualPxVars = (group, scale) =>
  Object.fromEntries(Object.entries(scale).flatMap(([k, v]) => [
    [`--${P}-${group}-${k}`, `${v}px`],
    [`--${P}-${group}-${k}-rem`, rem(v)],
  ]));
