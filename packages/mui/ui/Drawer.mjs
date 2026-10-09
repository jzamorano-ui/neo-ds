'use client';
// packages/mui/ui/Drawer.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { withAliases } from './_alias-props.mjs';
import { DrawerBase } from './_sheet-base.mjs';
const h = React.createElement;

export const NeoDrawer = React.forwardRef(function NeoDrawer(rawProps, ref) {
  const { open, onClose, title, image, actions, children, ...rest } = withAliases('NeoDrawer', rawProps);
  return h(DrawerBase, {
    open, onClose, title, image, actions, closable: true,
    ...rest, ref,
  }, children);
});
