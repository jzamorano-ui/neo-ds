'use client';
// packages/mui/ui/_modal-base.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery } from '@mui/material';
import { NeoButtonIcon } from './ButtonIcon.mjs';
import { renderIcon } from './_icon.mjs';
import { useScrollState } from './_scroll-state.mjs';
const h = React.createElement;

const ICON_BY_TYPE = {
  info: 'semantic-info', success: 'semantic-success', warning: 'semantic-warning',
  error: 'semantic-error', brand: 'brand-sparkles',
};


export const unaPorUna = (acciones) => {
  const lista = React.Children.toArray(acciones);
  if (lista.length !== 1 || !React.isValidElement(lista[0])) return lista;
  const [unico] = lista;
  const pelado = unico.type === 'div' && !unico.props.className && !unico.props.style;
  return unico.type === React.Fragment || pelado ? React.Children.toArray(unico.props.children) : lista;
};

export const ModalDialogBase = React.forwardRef(function ModalDialogBase({
  open, onClose, title, description, size = 'xs', type = 'default', closable = true,
  actions, children, back, fullScreen = false, ...rest
}, ref) {
  const auto = React.useId();

  const angosto = useMediaQuery('(max-width: 719px)');
  const apiladas = fullScreen ? angosto : size === 'xs';
  const accionesEnOrden = apiladas && actions ? unaPorUna(actions).reverse() : actions;

  const { setRegion: setContent, watchScroll, scroll, overflows } = useScrollState([open, children]);
  const titleId = `neo-modal-${auto}-title`;
  const descriptionId = description ? `neo-modal-${auto}-description` : undefined;
  const rowId = `neo-modal-${auto}-row`;

  if (process.env.NODE_ENV !== 'production') {
    if (!title) console.warn('[Neo] Modal: the title is required — it is the accessible name of the dialog.');
  }

  const iconNode = ICON_BY_TYPE[type];

  const close = closable && onClose
    ? h(NeoButtonIcon, { key: 'x', onClick: onClose, 'aria-label': 'Cerrar', variant: 'tertiary',
                         className: fullScreen ? 'NeoModalFullscreen-close' : 'NeoModalDialog-close',
                         size: fullScreen ? 'large' : 'medium' },
        renderIcon('system-close'))
    : null;

  return h(Dialog, {
    ref,
    open: !!open, onClose, fullScreen,
    PaperProps: { 'data-type': type },
    maxWidth: fullScreen ? false : size,
    fullWidth: !fullScreen,
    slotProps: { backdrop: { 'aria-hidden': 'true' } },
    'aria-labelledby': titleId,
    'aria-describedby': descriptionId,

    ...rest,
    PaperProps: { tabIndex: -1, ...rest.PaperProps, 'data-type': type },
    ...(rest.slotProps ? { slotProps: { backdrop: { 'aria-hidden': 'true' }, ...rest.slotProps,
      ...(rest.slotProps.paper ? { paper: { ...rest.slotProps.paper, 'data-type': type } } : {}) } } : {}),
    TransitionProps: { ...rest.TransitionProps, onEnter: (node, appearing) => {
      const dialogo = node && node.querySelector ? node.querySelector('[role="dialog"]') : null;
      if (dialogo && !dialogo.contains(node.ownerDocument.activeElement)) dialogo.focus({ preventScroll: true });
      rest.TransitionProps?.onEnter?.(node, appearing);
    } },
  },
    h(DialogTitle, { key: 't', id: rowId }, iconNode ? renderIcon(iconNode) : null,
      back || null,
      h('span', { id: titleId, className: fullScreen ? 'NeoModalFullscreen-title' : 'NeoModalDialog-title' }, title),
      fullScreen ? close : null),
    fullScreen ? null : close,
    h(DialogContent, { key: 'c', ref: setContent, onScroll: watchScroll, 'data-scroll': scroll,
      ...(overflows ? { tabIndex: 0, role: 'region', 'aria-labelledby': titleId } : null) },
      description ? h(DialogContentText, { id: descriptionId, key: 'd' }, description) : null,
      children),
    actions ? h(DialogActions, { key: 'a', 'data-scroll': scroll }, accionesEnOrden) : null,
  );
});
