'use client';
// packages/mui/ui/Tag.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Chip } from '@mui/material';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

export const NeoTag = React.forwardRef(function NeoTag({ tone = 'soft', label, icon, iconRight, ...rest }, ref) {
  const mui = {};
  mui.variant = 'tag';
  mui.clickable = false;
  if (tone === 'solid') { mui["data-tone"] = 'solid'; }
  mui.label = iconRight ? [h(React.Fragment, { key: 'l' }, label), h(React.Fragment, { key: 'i' }, renderIcon(iconRight))] : label;
  if (icon) mui.icon = renderIcon(icon);
  return h(Chip, { ...mui, ...rest, ref });
});
