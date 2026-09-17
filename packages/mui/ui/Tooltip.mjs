'use client';
// packages/mui/ui/Tooltip.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Tooltip } from '@mui/material';
const h = React.createElement;

export const NeoTooltip = React.forwardRef(function NeoTooltip({ placement = 'top', label, ...rest }, ref) {
  const mui = {};
  if (placement === 'none') { mui.arrow = false; }
  if (placement === 'top') { mui.placement = 'top'; }
  if (placement === 'bottom') { mui.placement = 'bottom'; }
  if (placement === 'left') { mui.placement = 'left'; }
  if (placement === 'right') { mui.placement = 'right'; }
  if (placement === 'top-start') { mui.placement = 'top-start'; }
  if (placement === 'top-end') { mui.placement = 'top-end'; }
  if (placement === 'bottom-start') { mui.placement = 'bottom-start'; }
  if (placement === 'bottom-end') { mui.placement = 'bottom-end'; }
  mui.title = label;
  return h(Tooltip, { ...mui, ...rest, ref });
});
