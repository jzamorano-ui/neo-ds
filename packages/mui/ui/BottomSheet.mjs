'use client';
// packages/mui/ui/BottomSheet.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { withAliases } from './_alias-props.mjs';
import { BottomSheetBase } from './_sheet-base.mjs';
import { unaPorUna } from './_modal-base.mjs';
import { warn } from './_warn.mjs';
const h = React.createElement;

export const NeoBottomSheet = React.forwardRef(function NeoBottomSheet(rawProps, ref) {
  const { open, onClose, title, image, actions, children, ...rest } = withAliases('NeoBottomSheet', rawProps);
  if (unaPorUna(actions).length > 2) warn('bottom-sheet: actions: at most 2 — the master only exposes the primary and secondary slots: a third one cannot be expressed');
  return h(BottomSheetBase, {
    open, onClose, title, image, actions, closable: true,
    ...rest, ref,
  }, children);
});
