'use client';
// packages/mui/ui/_help.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { NeoTooltip } from './Tooltip.mjs';
import { renderIcon } from './_icon.mjs';
import { warn } from './_warn.mjs';

const h = React.createElement;

export const HELP_ICON = 'semantic-info';

export const helpIcon = ({ text, name, label, comp, prefix }) => {
  if (!text) return null;
  const derived = typeof label === 'string' && label.trim() ? `Ayuda sobre ${label.trim()}` : null;
  const accessible = name || derived;
  if (!accessible) {
    warn(`${comp}: the help ⓘ has no accessible name — its \`label\` is not text and no `
      + '`tooltipLabel` was passed. The button has no name for a screen reader.');
  }
  return h(NeoTooltip, { label: text, describeChild: true },
    h('button', {
      type: 'button', className: `${prefix}__icon--tooltip`,
      'aria-label': accessible || undefined, title: undefined,
    }, renderIcon(HELP_ICON)));
};
