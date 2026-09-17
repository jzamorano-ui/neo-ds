'use client';
// packages/mui/ui/AspectRatio.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
const h = React.createElement;

const RATIO_CLASS = {
  '1/1': 'aspect-ratio--1-1',
  '16/9': 'aspect-ratio--16-9',
  '4/3': 'aspect-ratio--4-3',
  '3/4': 'aspect-ratio--3-4',
  '21/9': 'aspect-ratio--21-9',
};

export const NeoAspectRatio = React.forwardRef(function NeoAspectRatio({ ratio = '16/9', contain = false, src, alt, className, children, ...rest }, ref) {
  const ratioClass = RATIO_CLASS[ratio];
  if (!ratioClass && typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
    console.warn(`[Neo] AspectRatio: ratio '${ratio}' is not in the system — using 16/9. ` +
      `Available: ${Object.keys(RATIO_CLASS).join(', ')}`);
  }
  return h('div', {
    ref,
    className: ['aspect-ratio', ratioClass || RATIO_CLASS['16/9'], contain && 'aspect-ratio--contain', className]
      .filter(Boolean).join(' '),
    ...rest,
  }, src ? h('img', { src, alt: alt ?? '' }) : children);
});
