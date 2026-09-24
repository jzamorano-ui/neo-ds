'use client';
// packages/mui/ui/Button.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Button } from '@mui/material';
import { NeoSpinner } from './Spinner.mjs';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

const warn = (m) => { if (process.env.NODE_ENV !== 'production') console.warn('[Neo] ' + m); };

export const NeoButton = React.forwardRef(function NeoButton({ family = 'system', variant = 'primary', surface = 'default', size = 'large', label, iconLeft, iconRight, loading = false, ...rest }, ref) {
  const mui = {};
  mui.size = size;
  if (family === 'system' && variant === 'primary') { mui.variant = 'contained'; mui.color = 'primary'; }
  if (family === 'system' && variant === 'secondary') { mui.variant = 'contained'; mui.color = 'secondary'; }
  if (family === 'system' && variant === 'tertiary') { mui.variant = 'text'; }
  if (family === 'brand' && variant === 'primary') { mui.color = 'brand'; mui["data-variant"] = 'primary'; }
  if (family === 'brand' && variant === 'secondary') { mui.color = 'brand'; mui["data-variant"] = 'secondary'; }
  if (family === 'brand' && variant === 'tertiary') { mui.color = 'brand'; mui["data-variant"] = 'tertiary'; }
  if (surface === 'inverse') { mui["data-surface"] = 'inverse'; }
  if (loading) {
    mui.startIcon = h(NeoSpinner, { size: ({ large: 'medium', medium: 'medium', small: 'small' })[size] || 'medium', 'aria-hidden': 'true' });
    mui.disabled = true; mui["aria-busy"] = 'true';
  } else {
    if (iconLeft) mui.startIcon = renderIcon(iconLeft);
    if (iconRight) mui.endIcon = renderIcon(iconRight);
  }
  if (family === 'brand' && size !== 'large') warn('button: with family=brand the master only offers size=large');
  if (family === 'brand' && surface !== 'default') warn('button: with family=brand the master only offers surface=default');
  return h(Button, { ...mui, ...rest, ref }, ...(label !== undefined ? [label] : []));
});
