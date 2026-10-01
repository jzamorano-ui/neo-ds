// packages/mui/theme/select-icon.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
const h = React.createElement;

const CHEVRON = 'M17.4 7.55017C17.6485 7.2191 18.1185 7.15239 18.4498 7.40075C18.7809 7.64934 18.8476 8.11929 18.5992 8.45056L12.5992 16.4506C12.4575 16.639 12.2353 16.7504 11.9996 16.7504C11.7638 16.7502 11.5415 16.6391 11.4 16.4506L5.39996 8.45056C5.15163 8.11944 5.21867 7.64943 5.54938 7.40075C5.88065 7.1523 6.35059 7.21907 6.59918 7.55017L11.9996 14.7504L17.4 7.55017Z';

export const SelectChevronIcon = ({ className = '', ...p }) => h('svg', { className: `MuiSvgIcon-root ${className}`.trim(), viewBox: '0 0 24 24', focusable: 'false', 'aria-hidden': true, ...p },
  h('path', { d: CHEVRON, fill: 'currentColor' }));
