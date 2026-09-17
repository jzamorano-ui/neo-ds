// packages/mui/theme/baseline.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { cssVars as breakpoints } from '@neo/foundations/tokens/breakpoints.mjs';
import { cssVars as container } from '@neo/foundations/tokens/container.mjs';
import { cssVars as spacing } from '@neo/foundations/tokens/spacing.mjs';
import { cssVars as radius } from '@neo/foundations/tokens/radius.mjs';
import { cssVars as stroke } from '@neo/foundations/tokens/stroke.mjs';
import { cssVars as iconSize } from '@neo/foundations/tokens/iconSize.mjs';
import { cssVars as elevation } from '@neo/foundations/tokens/shadows.mjs';
import { cssVars as type } from '@neo/foundations/tokens/typography.mjs';
import { cssVars as color } from '@neo/foundations/tokens/color-semantic.mjs';
import { cssVars as component } from '@neo/foundations/tokens/component-tokens.mjs';

export const rootVars = { ...breakpoints, ...container, ...spacing, ...radius, ...stroke, ...iconSize, ...elevation, ...type, ...color, ...component };

export const themeSlice = {
  components: { MuiCssBaseline: { styleOverrides: { ':root': rootVars } } },
};
