// packages/foundations/tokens/api-js.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
export { tokens as color, cssVar } from './color-semantic.mjs';

import { tokens as _tokens, cssVar as _cssVar } from './color-semantic.mjs';
import { space } from './spacing.mjs';
import { radius } from './radius.mjs';
import { stroke } from './stroke.mjs';
import { iconSize } from './iconSize.mjs';

export const colorVars = Object.fromEntries(Object.keys(_tokens).map((k) => [k, `var(${_cssVar(k)})`]));
export const scale = { space, radius, stroke, iconSize };
