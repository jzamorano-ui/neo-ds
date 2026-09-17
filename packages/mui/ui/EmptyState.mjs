'use client';
// packages/mui/ui/EmptyState.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
const h = React.createElement;

const LEVELS = ['h2', 'h3', 'h4'];

export const NeoEmptyState = React.forwardRef(function NeoEmptyState({
  icon, title, description, actions, headingLevel = 'h2', className, ...rest
}, ref) {
  const warn = (m) => {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') console.warn(`[Neo] EmptyState: ${m}`);
  };
  if (!title) warn('without a title the block does not say what is missing.');
  if (!description) warn('the description is required: a title only says WHAT is missing, not what to do.');
  if (!LEVELS.includes(headingLevel)) warn(`headingLevel '${headingLevel}' is not in the system: ${LEVELS.join(', ')}`);

  return h('div', { className: 'empty-state-shell', ref }, h('div', {
    className: ['empty-state', className].filter(Boolean).join(' '),
    role: 'status',
    'aria-live': 'polite',
    ...rest,
  },
    h('div', { className: 'empty-state__body' },
      icon ? h('div', { className: 'empty-state__icon-box' },
        h('div', { className: 'empty-state__icon', 'aria-hidden': 'true' }, icon)) : null,
      h('div', { className: 'empty-state__content' },
        title ? h(LEVELS.includes(headingLevel) ? headingLevel : 'h2', { className: 'empty-state__title' }, title) : null,
        description ? h('p', { className: 'empty-state__description' }, description) : null)),
    actions ? h('div', { className: 'empty-state__actions' }, actions) : null));
});
