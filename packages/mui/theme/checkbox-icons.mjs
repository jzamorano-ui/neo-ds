// packages/mui/theme/checkbox-icons.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
const h = React.createElement;

const CHECK = 'M 7 14 L 2 9 L 3.41 7.59 L 7 11.17 L 14.59 3.58 L 16 5 L 7 14 Z';
const DASH = 'M 3 8 L 15 8 C 15.55 8 16 8.45 16 9 C 16 9.55 15.55 10 15 10 L 3 10 C 2.45 10 2 9.55 2 9 C 2 8.45 2.45 8 3 8 Z';

const glyph = (d) => ({ className = '', ...p }) => h('svg', { className: `MuiSvgIcon-root ${className}`.trim(), viewBox: '0 0 24 24', focusable: 'false', 'aria-hidden': true, ...p },
  h('g', { transform: 'translate(3,3)' }, h('path', { d, fill: 'currentColor' })));

export const CheckboxCheckedIcon = glyph(CHECK);
export const CheckboxIndeterminateIcon = glyph(DASH);
