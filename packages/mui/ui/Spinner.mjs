'use client';
// packages/mui/ui/Spinner.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { CircularProgress } from '@mui/material';
const h = React.createElement;

export const NeoSpinner = React.forwardRef(function NeoSpinner({ size = 'small', ...rest }, ref) {
  const mui = {};
  if (size === 'small') { mui.size = 'sm'; }
  if (size === 'large') { mui.size = 'lg'; }
  return h(CircularProgress, { ...mui, ...rest, ref });
});
