// packages/foundations/tokens/container.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { dualPxVars } from './_util.mjs';

export const container = { content: 1180, wide: 1320 };

export const themeSlice = { neo: { container: { ...container } } };

export const cssVars = dualPxVars('container', container);
