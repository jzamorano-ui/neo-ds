'use client';
// packages/mui/ui/ButtonIcon.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { IconButton } from '@mui/material';
const h = React.createElement;

const warn = (m) => { if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') console.warn('[Neo] ' + m); };

export const NeoButtonIcon = React.forwardRef(function NeoButtonIcon({ family = 'system', variant = 'primary', size = 'large', surface = 'default', ...rest }, ref) {
  const mui = {};
  mui.size = size;
  if (family === 'system' && variant === 'primary') { mui["data-variant"] = 'primary'; }
  if (family === 'system' && variant === 'secondary') { mui["data-variant"] = 'secondary'; }
  if (family === 'system' && variant === 'tertiary') { mui["data-variant"] = 'tertiary'; }
  if (family === 'brand' && variant === 'primary') { mui.color = 'brand'; mui["data-variant"] = 'primary'; }
  if (family === 'brand' && variant === 'secondary') { mui.color = 'brand'; mui["data-variant"] = 'secondary'; }
  if (family === 'brand' && variant === 'tertiary') { mui.color = 'brand'; mui["data-variant"] = 'tertiary'; }
  if (surface === 'inverse') { mui["data-surface"] = 'inverse'; }
  if (family === 'brand' && surface !== 'default') warn('button-icon: with family=brand the master only offers surface=default');
  if (!(rest['aria-label'] || rest['aria-labelledby'])) warn('button-icon: the accessible name is missing (`aria-label` or `aria-labelledby`) — an icon button has no visible text, and without it the screen reader announces a nameless button.');
  return h(IconButton, { ...mui, ...rest, ref });
});
