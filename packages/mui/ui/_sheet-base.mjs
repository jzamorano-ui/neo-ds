'use client';
// packages/mui/ui/_sheet-base.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { SwipeableDrawer, Drawer } from '@mui/material';
import { NeoButtonIcon } from './ButtonIcon.mjs';
import { renderIcon } from './_icon.mjs';
import { useScrollState } from './_scroll-state.mjs';
import { unaPorUna } from './_modal-base.mjs';
const h = React.createElement;


export const BottomSheetBase = React.forwardRef(function BottomSheetBase({
  open, onClose, onOpen, title, image, actions, children, closable = true,
  'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, className, ...rest
}, ref) {
  const auto = React.useId();
  const titleId = title && !image ? `neo-sheet-${auto}-title` : undefined;

  if (process.env.NODE_ENV !== 'production') {
    if (!title && !ariaLabel && !ariaLabelledBy) {
      console.warn('[Neo] BottomSheet: NeoBottomSheet needs a name: pass `title`, or —when you pass `image`— give the content a heading and point `aria-labelledby` at it.');
    }
    if (!onClose) {
      console.warn('[Neo] BottomSheet: NeoBottomSheet needs `onClose`: without it the sheet has no ✕, no swipe and no way out.');
    }
    if (title && image) {
      console.warn('[Neo] BottomSheet: with `image` the header has no title slot — the master draws one or the other. The `title` will not be shown.');
    }
  }

  const { setRegion, watchScroll, scroll, overflows } = useScrollState([open, children]);

  const accionesEnOrden = actions ? unaPorUna(actions).reverse() : actions;

  const close = closable && onClose
    ? h(NeoButtonIcon, { key: 'x', onClick: onClose, 'aria-label': 'Cerrar',
                         variant: image ? 'primary' : 'tertiary', surface: image ? 'inverse' : 'default',
                         size: 'medium', className: 'NeoBottomSheet-close' },
        renderIcon('system-close'))
    : null;

  const handle = h('div', { key: 'h', className: 'NeoBottomSheet-handle', 'aria-hidden': 'true' });

  const header = image
    ? h('div', { key: 'hdr', className: 'NeoBottomSheet-headerImage' }, image, handle, close)
    : h('header', { key: 'hdr', className: 'NeoBottomSheet-header' },
        handle,
        h('div', { className: 'NeoBottomSheet-headerRow' },
          title ? h('h2', { id: titleId, className: 'NeoBottomSheet-title' }, title) : null,
          close));

  return h(SwipeableDrawer, {
    ref,
    anchor: 'bottom',
    open: !!open,
    onClose,
    onOpen: onOpen || (() => {}),
    disableSwipeToOpen: true,
    slotProps: { backdrop: { 'aria-hidden': 'true' } },
    className,
    ...rest,
    PaperProps: {
      ...rest.PaperProps,
      className: ['NeoBottomSheet', rest.PaperProps?.className].filter(Boolean).join(' '),
      'data-image': image ? 'true' : 'false',
      'data-scroll': scroll,
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': ariaLabelledBy || titleId,
      'aria-label': (ariaLabelledBy || titleId) ? undefined : ariaLabel,
      tabIndex: -1,
    },
    ...(rest.slotProps ? { slotProps: { backdrop: { 'aria-hidden': 'true' }, ...rest.slotProps } } : {}),
  },
    header,
    h('div', { key: 'c', className: 'NeoBottomSheet-content', ref: setRegion, onScroll: watchScroll,
               'data-scroll': scroll,
               ...(overflows ? { tabIndex: 0, role: 'region', 'aria-labelledby': ariaLabelledBy || titleId } : null) },
      children),
    actions ? h('footer', { key: 'a', className: 'NeoBottomSheet-actions', 'data-scroll': scroll }, accionesEnOrden) : null,
  );
});


export const DrawerBase = React.forwardRef(function DrawerBase({
  open, onClose, title, image, actions, children, closable = true,
  'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, className, ...rest
}, ref) {
  const auto = React.useId();
  const titleId = title ? `neo-drawer-${auto}-title` : undefined;

  if (process.env.NODE_ENV !== 'production') {
    if (!title) console.warn('[Neo] Drawer: NeoDrawer needs `title`: it is the drawer\'s name for a screen reader, and the header always shows it.');
    if (!onClose) console.warn('[Neo] Drawer: NeoDrawer needs `onClose`: without it the drawer has no ✕ and no way out.');
  }

  const { setRegion, watchScroll, scroll, overflows } = useScrollState([open, children]);
  const accionesEnOrden = actions ? unaPorUna(actions).reverse() : actions;

  const close = closable && onClose
    ? h(NeoButtonIcon, { key: 'x', onClick: onClose, 'aria-label': 'Cerrar', variant: 'tertiary', surface: 'default',
                         size: 'large', className: 'NeoDrawer-close' },
        renderIcon('system-close'))
    : null;

  const header = h('header', { key: 'hdr', className: 'NeoDrawer-header' },
    h('div', { className: 'NeoDrawer-headerRow' },
      title ? h('h2', { id: titleId, className: 'NeoDrawer-title' }, title) : null,
      close));

  return h(Drawer, {
    ref,
    anchor: 'right',
    open: !!open,
    onClose,
    slotProps: { backdrop: { 'aria-hidden': 'true' } },
    className,
    ...rest,
    PaperProps: {
      ...rest.PaperProps,
      className: ['NeoDrawer', rest.PaperProps?.className].filter(Boolean).join(' '),
      'data-scroll': scroll,
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': ariaLabelledBy || titleId,
      'aria-label': (ariaLabelledBy || titleId) ? undefined : ariaLabel,
      tabIndex: -1,
    },
    ...(rest.slotProps ? { slotProps: { backdrop: { 'aria-hidden': 'true' }, ...rest.slotProps } } : {}),
  },
    header,
    h('div', { key: 'c', className: 'NeoDrawer-content', ref: setRegion, onScroll: watchScroll,
               'data-scroll': scroll,
               ...(overflows ? { tabIndex: 0, role: 'region', 'aria-labelledby': ariaLabelledBy || titleId } : null) },
      image ? h('div', { key: 'img', className: 'NeoDrawer-image' }, image) : null,
      children),
    actions ? h('footer', { key: 'a', className: 'NeoDrawer-actions', 'data-scroll': scroll }, accionesEnOrden) : null,
  );
});
