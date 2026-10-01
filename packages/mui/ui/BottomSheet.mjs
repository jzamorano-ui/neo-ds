'use client';
// packages/mui/ui/BottomSheet.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { withAliases } from './_alias-props.mjs';
import { BottomSheetBase } from './_sheet-base.mjs';
const h = React.createElement;

export const NeoBottomSheet = React.forwardRef(function NeoBottomSheet(rawProps, ref) {
  const { open, onClose, title, image, actions, children, ...rest } = withAliases('NeoBottomSheet', rawProps);
  return h(BottomSheetBase, {
    open, onClose, title, image, actions, closable: true,
    ...rest, ref,
  }, children);
});
