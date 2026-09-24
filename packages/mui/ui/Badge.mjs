'use client';
// packages/mui/ui/Badge.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Badge, Chip } from '@mui/material';
const h = React.createElement;

const INDICATORS = ['dot', 'number'];
const STATUSES = ['neutral', 'info', 'success', 'warning', 'error'];

export const NeoBadge = React.forwardRef(function NeoBadge({ type = 'dot', label, count, children, ...rest }, ref) {
  const warn = (m) => {
    if (process.env.NODE_ENV !== 'production') console.warn(`[Neo] Badge: ${m}`);
  };

  if (INDICATORS.includes(type)) {
    if (!children) warn('an indicator anchors to something — the element it anchors to is missing.');
    if (!rest['aria-label']) warn('an indicator has no text: it needs an `aria-label` that says what it announces.');
    const { 'aria-label': ariaLabel, slotProps: consumerSlots, ...others } = rest;
    return h(Badge, {
      ref,
      variant: type === 'dot' ? 'dot' : 'standard',
      badgeContent: type === 'number' ? count : undefined,
      ...others,
      slotProps: {
        ...consumerSlots,
        badge: { ...(consumerSlots?.badge), role: 'status', 'aria-label': ariaLabel },
      },
    }, children);
  }

  if (!STATUSES.includes(type)) {
    warn(`type '${type}' is not in the system. Available: ${[...INDICATORS, ...STATUSES].join(', ')}`);
    return null;
  }
  if (!label) warn('a status badge needs a `label`: color alone does not communicate the status.');
  const others = { ...rest };
  delete others['aria-label'];
  return h(Chip, { variant: 'status', color: ({ info: 'info', success: 'success', warning: 'warning', error: 'error' })[type], label, ...others, ref });
});
