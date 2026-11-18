'use client';
// packages/mui/ui/Skeleton.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Skeleton } from '@mui/material';
const h = React.createElement;

export const NeoSkeleton = React.forwardRef(function NeoSkeleton({ variant = 'text', ...rest }, ref) {
  const mui = {};
  mui['aria-hidden'] = 'true';
  mui.variant = variant;
  return h(Skeleton, { ...mui, ...rest, ref });
});
