'use client';
// packages/mui/ui/ModalDialog.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { withAliases } from './_alias-props.mjs';
import { ModalDialogBase } from './_modal-base.mjs';
import { warn } from './_warn.mjs';
const h = React.createElement;

export const NeoModalDialog = React.forwardRef(function NeoModalDialog(rawProps, ref) {
  const { open, onClose, title, description, size = 'xs', type = 'default', closable = true, actions, children, ...rest } = withAliases('NeoModalDialog', rawProps);
  if (['md', 'lg'].includes(size) && type !== 'default') warn(`modal-dialog: with size=${size} the master only offers type=default`);
  return h(ModalDialogBase, {
    open, onClose, title, description, size, type, closable, actions,
    ...rest, ref,
  }, children);
});
