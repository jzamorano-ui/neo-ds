'use client';
// packages/mui/ui/ModalFullscreen.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { withAliases } from './_alias-props.mjs';
import { NeoButtonIcon } from './ButtonIcon.mjs';
import { renderIcon } from './_icon.mjs';
import { ModalDialogBase } from './_modal-base.mjs';
const h = React.createElement;

export const NeoModalFullscreen = React.forwardRef(function NeoModalFullscreen(rawProps, ref) {
  const { open, onClose, onBack, title, actions, children, ...rest } = withAliases('NeoModalFullscreen', rawProps);
  return h(ModalDialogBase, {
    open, onClose, title, actions, fullScreen: true, closable: true,
    back: onBack
        ? h(NeoButtonIcon, { onClick: onBack, 'aria-label': 'Volver', variant: 'tertiary', className: 'NeoModalFullscreen-back' },
            renderIcon('system-nav-left'))
        : null,
    ...rest, ref,
  }, children);
});
