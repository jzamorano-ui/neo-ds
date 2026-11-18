'use client';
// packages/mui/ui/Snackbar.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Snackbar, SnackbarContent, styled } from '@mui/material';
import { NeoButtonIcon } from './ButtonIcon.mjs';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

const ACCION = { variant: 'secondary', size: 'small', surface: 'inverse' };
const conVariante = (node) => (React.isValidElement(node) && typeof node.type !== 'string'
  ? React.cloneElement(node, Object.fromEntries(Object.entries(ACCION).filter(([k]) => node.props[k] === undefined)))
  : node);

const Anuncio = styled('span')({ border: 0, clip: 'rect(0 0 0 0)', height: '1px', margin: '-1px', overflow: 'hidden', padding: 0, position: 'absolute', whiteSpace: 'nowrap', width: '1px' });

export const NeoSnackbar = React.forwardRef(function NeoSnackbar({ open, onClose, message, actions, closable = true, ...resto }, ref) {
  const { action: _action, ContentProps: _ContentProps, children: _children, ...rest } = resto;
  const texto = React.useRef(null);
  const [anuncio, setAnuncio] = React.useState('');
  React.useEffect(() => { setAnuncio(open && texto.current ? texto.current.textContent : ''); }, [open, message]);
  if (!message && process.env.NODE_ENV !== 'production') {
    console.warn('[Neo] Snackbar: the message is missing — a snackbar without text communicates nothing.');
  }
  if (closable && !onClose && process.env.NODE_ENV !== 'production') {
    console.warn('[Neo] Snackbar: the ✕ is drawn and there is no `onClose`: clicking it does nothing. Pass `onClose`, or turn the ✕ off.');
  }
  const acciones = actions ? h('span', { className: 'NeoSnackbar-action', key: 'a' }, React.Children.map(actions, conVariante)) : null;
  const equis = closable ? h(NeoButtonIcon, { variant: 'tertiary', size: 'small', surface: 'inverse', className: 'NeoSnackbar-close', key: 'c', onClick: (e) => onClose && onClose(e, 'closeButton'), 'aria-label': 'Cerrar aviso' }, renderIcon('system-close')) : null;
  return h(React.Fragment, null,
    h(Snackbar, { ref, open, onClose, ...rest },
      h(SnackbarContent, {
        role: 'status',
        'aria-live': 'off',
        message: h('span', { className: 'NeoSnackbar-message' },
          h('span', { className: 'NeoSnackbar-icon', key: 'i' }, renderIcon('semantic-info-inverse')),
          h('span', { className: 'NeoSnackbar-text', key: 't', ref: texto }, message)),
        action: acciones || equis ? [acciones, equis] : undefined,
      })),
    h(Anuncio, { className: 'NeoSnackbar-status', role: 'status', 'aria-live': 'polite' }, anuncio));
});
