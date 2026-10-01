// packages/mui/theme/slices.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { themeSlice as breakpoints } from '@neo-design/foundations/tokens/breakpoints.mjs';
import { themeSlice as container } from '@neo-design/foundations/tokens/container.mjs';
import { themeSlice as spacing } from '@neo-design/foundations/tokens/spacing.mjs';
import { themeSlice as radius } from '@neo-design/foundations/tokens/radius.mjs';
import { themeSlice as stroke } from '@neo-design/foundations/tokens/stroke.mjs';
import { themeSlice as iconSize } from '@neo-design/foundations/tokens/iconSize.mjs';
import { themeSlice as shadows } from '@neo-design/foundations/tokens/shadows.mjs';
import { themeSlice as typography } from '@neo-design/foundations/tokens/typography.mjs';
import { themeSlice as color } from '@neo-design/foundations/tokens/color.mjs';
import { themeSlice as componentTokens } from '@neo-design/foundations/tokens/component-tokens.mjs';
import { components } from './components.mjs';
import { themeSlice as baseline } from './baseline.mjs';
import { themeSlice as customCss, HOJAS_PLANAS } from './custom-css.mjs';
import { themeSlice as locale } from './locale.mjs';

export const slices = [breakpoints, container, spacing, radius, stroke, iconSize, shadows, typography, color, componentTokens, locale, { components }, baseline, customCss];

const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
const deepMerge = (a, b) => {
  const out = { ...a };
  for (const k of Object.keys(b)) out[k] = isObj(a[k]) && isObj(b[k]) ? deepMerge(a[k], b[k]) : b[k];
  return out;
};

const fusionado = slices.reduce((acc, s) => deepMerge(acc, s), {});

export const themeOptions = {
  ...fusionado,
  components: {
    ...fusionado.components,
    MuiCssBaseline: {
      ...fusionado.components?.MuiCssBaseline,
      styleOverrides: [fusionado.components?.MuiCssBaseline?.styleOverrides || {}, HOJAS_PLANAS],
    },
  },
};
