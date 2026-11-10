'use client';
// packages/mui/ui/Snackbar.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';
import { NeoButtonIcon } from './ButtonIcon.mjs';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

const ACCION = { variant: 'secondary', size: 'small', surface: 'inverse' };
const conVariante = (node) => (React.isValidElement(node) && typeof node.type !== 'string'
  ? React.cloneElement(node, Object.fromEntries(Object.entries(ACCION).filter(([k]) => node.props[k] === undefined)))
  : node);

export const NeoSnackbar = React.forwardRef(function NeoSnackbar({ open, onClose, message, actions, closable = true, ...rest }, ref) {
  if (!message && process.env.NODE_ENV !== 'production') {
    console.warn('[Neo] Snackbar: the message is missing — a snackbar without text communicates nothing.');
  }
  const acciones = actions ? h('span', { className: 'NeoSnackbar-action', key: 'a' }, React.Children.map(actions, conVariante)) : null;
  const equis = closable ? h(NeoButtonIcon, { variant: 'tertiary', size: 'small', surface: 'inverse', className: 'NeoSnackbar-close', key: 'c', onClick: (e) => onClose && onClose(e, 'closeButton'), 'aria-label': 'Cerrar aviso' }, renderIcon('system-close')) : null;
  return h(Snackbar, { ref, open, onClose, ...rest },
    h(SnackbarContent, {
      role: 'status',
      'aria-live': 'polite',
      message: h('span', { className: 'NeoSnackbar-message' },
        h('span', { className: 'NeoSnackbar-icon', key: 'i' }, renderIcon('semantic-info-inverse')),
        h('span', { className: 'NeoSnackbar-text', key: 't' }, message)),
      action: acciones || equis ? [acciones, equis] : undefined,
    }));
});
