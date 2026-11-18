'use client';
// packages/mui/ui/Spinner.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { CircularProgress } from '@mui/material';
const h = React.createElement;

export const NeoSpinner = React.forwardRef(function NeoSpinner({ size = 'small', ...rest }, ref) {
  const mui = {};
  mui['aria-hidden'] = 'true';
  if (size === 'small') { mui.size = 'var(--neo-icon-size-sm-rem)'; }
  if (size === 'medium') { mui.size = 'var(--neo-icon-size-md-rem)'; }
  if (size === 'large') { mui.size = 'var(--neo-icon-size-lg-rem)'; }
  return h(CircularProgress, { ...mui, ...rest, ref });
});
