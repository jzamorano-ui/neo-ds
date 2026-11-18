'use client';
// packages/mui/ui/AnnouncementBar.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Alert } from '@mui/material';
import { NeoButtonIcon } from './ButtonIcon.mjs';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

const ICONS = { info: 'semantic-info-inverse', success: 'semantic-success-inverse', warning: 'semantic-warning-inverse', error: 'semantic-error-inverse', alert: 'semantic-alert-inverse' };

export const NeoAnnouncementBar = React.forwardRef(function NeoAnnouncementBar({ icon = 'warning', actions, onClose, children, className, 'aria-label': ariaLabel = 'Aviso', ...rest }, ref) {
  if (process.env.NODE_ENV !== 'production') {
    if (!children) console.warn('[Neo] AnnouncementBar: the description is missing — an announcement bar without text communicates nothing.');
    if (!ICONS[icon]) console.warn(`[Neo] AnnouncementBar: icon '${icon}' is not in the system. Available: ${Object.keys(ICONS).join(', ')}`);
  }
  const acciones = actions ? h('span', { className: 'NeoAnnouncementBar-action', key: 'a' }, actions) : null;
  const equis = onClose ? h(NeoButtonIcon, { variant: 'tertiary', size: 'medium', surface: 'inverse', className: 'NeoAnnouncementBar-close', key: 'c', onClick: onClose, 'aria-label': 'Cerrar aviso' }, renderIcon('system-close')) : null;
  return h(Alert, {
    ref,
    variant: 'announcement',
    role: 'region',
    'aria-label': ariaLabel,
    className: ['announcement-bar', className].filter(Boolean).join(' '),
    icon: renderIcon(ICONS[icon] || ICONS['warning']),
    action: acciones || equis ? h(React.Fragment, null, acciones, equis) : undefined,
    ...rest,
  }, h('span', { className: 'NeoAnnouncementBar-text' }, children));
});
