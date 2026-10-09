// packages/mui/theme/chip-icon.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
const h = React.createElement;

const CLOSE = 'M4.92893 18.0844L11.0538 11.9595L4.9694 5.87511C4.69696 5.60267 4.69701 5.16091 4.9694 4.88845C5.24186 4.61599 5.6836 4.61599 5.95606 4.88845L12.0405 10.9729L18.0844 4.92892C18.3569 4.65646 18.7986 4.65646 19.0711 4.92892C19.3435 5.20138 19.3435 5.64312 19.0711 5.91558L13.0271 11.9595L19.1115 18.0439C19.384 18.3164 19.384 18.7581 19.1115 19.0306C18.8391 19.303 18.3973 19.303 18.1249 19.0306L12.0405 12.9462L5.91559 19.0711C5.64314 19.3435 5.20139 19.3435 4.92893 19.0711C4.65647 18.7986 4.65647 18.3569 4.92893 18.0844Z';

export const ChipCloseIcon = ({ className = '', ...p }) => h('svg', { className: `MuiSvgIcon-root ${className}`.trim(), viewBox: '0 0 24 24', focusable: 'false', 'aria-hidden': true, ...p },
  h('path', { d: CLOSE, fill: 'currentColor' }));
