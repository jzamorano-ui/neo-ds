'use client';
// packages/mui/ui/Chips.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Chip } from '@mui/material';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

export const NeoChips = React.forwardRef(function NeoChips({ label, icon, selected, ...rest }, ref) {
  const mui = {};
  mui.variant = 'outlined'; mui.clickable = true; mui["aria-pressed"] = 'false';
  if (selected) { mui.variant = 'filled'; mui["data-selected"] = 'true'; mui["aria-pressed"] = 'true'; }
  mui.label = label;
  if (icon) mui.icon = renderIcon(icon);
  if (rest.onDelete) { mui.onClick = rest.onDelete; mui["aria-keyshortcuts"] = 'Delete Backspace'; }
  return h(Chip, { ...mui, ...rest, ref });
});
