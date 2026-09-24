'use client';
// packages/mui/ui/Toggle.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Switch } from '@mui/material';
import { hasAccessibleName } from './_warn.mjs';
import { innerInputProps } from './_inner-input.mjs';
const h = React.createElement;

export const NeoToggle = React.forwardRef(function NeoToggle({ label, checked, defaultChecked, disabled = false, onChange, id, 'aria-label': ariaLabel, ...rest }, ref) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const labelId = `${fieldId}-label`;
  const hasText = label !== undefined && label !== null && String(label).trim() !== '';
  const inputAria = hasText ? { 'aria-labelledby': labelId } : ariaLabel ? { 'aria-label': ariaLabel } : {};
  hasAccessibleName('NeoToggle', label, { ...rest, 'aria-label': ariaLabel });
  return h('span', { className: 'neo-toggle-field', ref },
    hasText ? h('span', { id: labelId }, label) : null,
    h(Switch, {
      id: fieldId, disabled,
      ...(checked !== undefined ? { checked } : {}),
      ...(defaultChecked !== undefined ? { defaultChecked } : {}),
      ...innerInputProps({ role: 'switch', ...inputAria }),
      onChange,
      ...rest,
    }),
  );
});
