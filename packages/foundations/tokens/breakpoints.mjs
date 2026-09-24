// packages/foundations/tokens/breakpoints.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { dualPxVars } from './_util.mjs';

export const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1536 };

export const themeSlice = { breakpoints: { values: { ...breakpoints } } };

export const cssVars = dualPxVars('breakpoint', breakpoints);
