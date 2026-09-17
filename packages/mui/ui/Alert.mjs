'use client';
// packages/mui/ui/Alert.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { NeoButtonIcon } from './ButtonIcon.mjs';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

export const NeoAlert = React.forwardRef(function NeoAlert({ type = 'info', title, children, onClose, ...rest }, ref) {
  const role = ({ error: 'alert', warning: 'alert', info: 'status', success: 'status' })[type];
  if (!children && typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
    console.warn('[Neo] Alert: the description is missing — an alert without text communicates nothing.');
  }
  return h(Alert, {
    ref,
    severity: type,
    role,
    'aria-live': ({ alert: 'assertive', status: 'polite' })[role],
    action: onClose
      ? h(NeoButtonIcon, { variant: 'tertiary', size: 'small', onClick: onClose, 'aria-label': 'Cerrar alerta' },
          renderIcon('system-close'))
      : undefined,
    ...rest,
  },
    ...(() => {
      const kids = React.Children.toArray(children);
      const text = kids.filter((k) => !React.isValidElement(k));
      const elements = kids.filter((k) => React.isValidElement(k));
      return [
        h('div', { key: 'x', className: 'NeoAlert-text' },
          title ? h(AlertTitle, { key: 't' }, title) : null,
          text.length ? h('div', { key: 'd', className: 'NeoAlert-description' }, ...text) : null),
        ...elements.map((el, i) => React.cloneElement(el, {
          key: `l${i}`,
          className: [el.props.className, 'alert__link'].filter(Boolean).join(' '),
        })),
      ];
    })());
});
