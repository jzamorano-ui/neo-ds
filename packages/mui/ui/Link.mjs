'use client';
// packages/mui/ui/Link.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Link } from '@mui/material';
const h = React.createElement;

export const NeoLink = React.forwardRef(function NeoLink({ label, disabled, ...rest }, ref) {
  const mui = {};
  if (disabled) { delete rest.href; mui.role = 'link'; mui["aria-disabled"] = 'true'; }
  return h(Link, { ...mui, ...rest, ref }, ...(label !== undefined ? [label] : []));
});
