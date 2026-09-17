// packages/foundations/tokens/color-semantic.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { ramp, global } from './_primitives.mjs';

const W = global.white, TR = global.transparent, WA8 = global.whiteAlpha8, WA16 = global.whiteAlpha16, OV = global.overlay;
const s = ramp.slate, g = ramp.gray, co = ramp.brand, cr = ramp.red, gr = ramp.green, y = ramp.yellow, b = ramp.blue;

export const tokens = {
  'surface/base/default': W, 'surface/base/secondary': s[50], 'surface/base/inverse': s[900], 'surface/base/overlay': OV,

  'fill/base/default': W, 'fill/base/light': g[50], 'fill/base/medium': g[100], 'fill/base/strong': g[500], 'fill/base/disabled': g[50], 'fill/base/transparent': TR, 'fill/base/inverse': s[900],
  'fill/primary/default': s[800], 'fill/primary/hover': s[700], 'fill/primary/active': s[900],
  'fill/primary/inverse/default': W, 'fill/primary/inverse/hover': s[50], 'fill/primary/inverse/active': s[100],
  'fill/secondary/default': s[100], 'fill/secondary/hover': s[200], 'fill/secondary/active': s[300],
  'fill/secondary/inverse/default': TR, 'fill/secondary/inverse/hover': WA8, 'fill/secondary/inverse/active': WA16,
  'fill/tertiary/default': TR, 'fill/tertiary/hover': s[50], 'fill/tertiary/active': s[100],
  'fill/tertiary/inverse/default': TR, 'fill/tertiary/inverse/hover': WA8, 'fill/tertiary/inverse/active': WA16,
  'fill/brand/primary/default': co[500], 'fill/brand/primary/hover': co[600], 'fill/brand/primary/active': co[700],
  'fill/brand/secondary/default': co[100], 'fill/brand/secondary/hover': co[200], 'fill/brand/secondary/active': co[300],
  'fill/brand/tertiary/default': TR, 'fill/brand/tertiary/hover': co[50], 'fill/brand/tertiary/active': co[100],
  'fill/semantic/info/soft': b[50], 'fill/semantic/info/solid': b[500],
  'fill/semantic/success/soft': gr[50], 'fill/semantic/success/solid': gr[500],
  'fill/semantic/warning/soft': y[50], 'fill/semantic/warning/solid': y[600],
  'fill/semantic/error/soft': cr[50], 'fill/semantic/error/solid': cr[500],
  'fill/deco/1/soft': ramp.aqua[100],   'fill/deco/1/solid': ramp.aqua[600],
  'fill/deco/2/soft': ramp.purple[100], 'fill/deco/2/solid': ramp.purple[600],
  'fill/deco/3/soft': s[100],           'fill/deco/3/solid': s[600],
  'fill/deco/4/soft': ramp.pink[100],   'fill/deco/4/solid': ramp.pink[500],
  'fill/deco/5/soft': ramp.sky[100],    'fill/deco/5/solid': ramp.sky[500],
  'fill/deco/6/soft': co[100],          'fill/deco/6/solid': co[500],

  'text/base/default': s[900], 'text/base/secondary': g[600], 'text/base/disabled': g[300], 'text/base/contrast': W,
  'text/base/brand': co[500], 'text/base/brand-strong': co[700],
  'text/semantic/info': b[700], 'text/semantic/success': gr[700], 'text/semantic/warning': y[700], 'text/semantic/error': cr[700],

  'icon/base/default': s[900], 'icon/base/secondary': g[500], 'icon/base/disabled': g[200], 'icon/base/contrast': W,
  'icon/base/brand-solid': co[500], 'icon/base/brand-soft': co[200], 'icon/base/brand-strong': co[700],
  'icon/semantic/info': b[600], 'icon/semantic/success': gr[600], 'icon/semantic/warning': y[600], 'icon/semantic/error': cr[600],

  'border/base/default': g[400], 'border/base/secondary': g[100], 'border/base/disabled': g[100], 'border/base/contrast': W, 'border/base/focus': s[900],
  'border/base/brand': co[500],
  'border/semantic/info': b[200], 'border/semantic/success': gr[200], 'border/semantic/warning': y[200], 'border/semantic/error-soft': cr[200], 'border/semantic/error-solid': cr[700],

  'focus/ring/default': b[500], 'focus/ring/inverse': W, 'focus/gap/default': b[50], 'focus/gap/inverse': s[800],
};

export const cssVar = (name) => '--' + name.split('/').join('--');
export const cssVars = Object.fromEntries(Object.entries(tokens).map(([n, v]) => [cssVar(n), v]));
