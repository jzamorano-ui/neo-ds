'use client';
// packages/mui/ui/Drawer.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { withAliases } from './_alias-props.mjs';
import { DrawerBase } from './_sheet-base.mjs';
import { unaPorUna } from './_modal-base.mjs';
import { warn } from './_warn.mjs';
const h = React.createElement;

export const NeoDrawer = React.forwardRef(function NeoDrawer(rawProps, ref) {
  const { open, onClose, title, image, actions, children, ...rest } = withAliases('NeoDrawer', rawProps);
  if (unaPorUna(actions).length > 2) warn('drawer: actions: at most 2 — the master only exposes the primary and secondary slots: a third one cannot be expressed — change the secondary\'s variant instead');
  return h(DrawerBase, {
    open, onClose, title, image, actions, closable: true,
    ...rest, ref,
  }, children);
});
