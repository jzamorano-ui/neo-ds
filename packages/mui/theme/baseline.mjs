// packages/mui/theme/baseline.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { cssVars as breakpoints } from '@neo-design/foundations/tokens/breakpoints.mjs';
import { cssVars as container } from '@neo-design/foundations/tokens/container.mjs';
import { cssVars as spacing } from '@neo-design/foundations/tokens/spacing.mjs';
import { cssVars as radius } from '@neo-design/foundations/tokens/radius.mjs';
import { cssVars as stroke } from '@neo-design/foundations/tokens/stroke.mjs';
import { cssVars as iconSize } from '@neo-design/foundations/tokens/iconSize.mjs';
import { cssVars as elevation } from '@neo-design/foundations/tokens/shadows.mjs';
import { cssVars as type } from '@neo-design/foundations/tokens/typography.mjs';
import { cssVars as color } from '@neo-design/foundations/tokens/color-semantic.mjs';
import { cssVars as component } from '@neo-design/foundations/tokens/component-tokens.mjs';

export const rootVars = { ...breakpoints, ...container, ...spacing, ...radius, ...stroke, ...iconSize, ...elevation, ...type, ...color, ...component };

export const themeSlice = {
  components: { MuiCssBaseline: { styleOverrides: { ':root': rootVars } } },
};
