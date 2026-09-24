'use client';
// packages/mui/ui/_modal-base.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery } from '@mui/material';
import { NeoButtonIcon } from './ButtonIcon.mjs';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

const ICON_BY_TYPE = {
  info: 'semantic-info', success: 'semantic-success', warning: 'semantic-warning',
  error: 'semantic-error', brand: 'brand-sparkles',
};


const unaPorUna = (acciones) => {
  const lista = React.Children.toArray(acciones);
  return lista.length === 1 && lista[0].type === React.Fragment ? React.Children.toArray(lista[0].props.children) : lista;
};

export const ModalDialogBase = React.forwardRef(function ModalDialogBase({
  open, onClose, title, description, size = 'xs', type = 'default', closable = true,
  actions, children, back, fullScreen = false, ...rest
}, ref) {
  const auto = React.useId();

  const angosto = useMediaQuery('(max-width: 719px)');
  const apiladas = fullScreen ? angosto : size === 'xs';
  const accionesEnOrden = apiladas && actions ? unaPorUna(actions).reverse() : actions;

  const contentRef = React.useRef(null);
  const [contentNode, setContentNode] = React.useState(null);
  const setContent = React.useCallback((node) => { contentRef.current = node; setContentNode(node); }, []);
  const [scroll, setScroll] = React.useState('none');
  const [overflows, setOverflows] = React.useState(false);
  const watchScroll = React.useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const extra = el.scrollHeight - el.clientHeight;
    setOverflows(extra > 1);
    if (extra <= 1) return setScroll('none');
    if (el.scrollTop <= 1) return setScroll('top');
    if (el.scrollTop >= extra - 1) return setScroll('bottom');
    setScroll('mid');
  }, []);
  React.useEffect(() => {
    const el = contentNode;
    if (!el) return undefined;
    watchScroll();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(watchScroll);
    ro.observe(el);
    for (const h of el.children) ro.observe(h);
    return () => ro.disconnect();
  }, [watchScroll, open, children, contentNode]);
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
