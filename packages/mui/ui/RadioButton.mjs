'use client';
// packages/mui/ui/RadioButton.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormControlLabel, Radio } from '@mui/material';
import { hasAccessibleName } from './_warn.mjs';
const h = React.createElement;

export const NeoRadioButton = React.forwardRef(function NeoRadioButton({ label, checked, defaultChecked, disabled, onChange, id, hideLabel = false, ...rest }, ref) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  hasAccessibleName('NeoRadioButton', label, rest);
  return h(FormControlLabel, {
    ref,
    htmlFor: fieldId, label, className: hideLabel ? 'neo-label-hidden' : undefined,
    control: h(Radio, {
      id: fieldId, disabled,
      ...(checked !== undefined ? { checked } : {}),
      ...(defaultChecked !== undefined ? { defaultChecked } : {}),
      onChange,
      ...rest,
    }),
  });
});
