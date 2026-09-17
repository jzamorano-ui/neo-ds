'use client';
// packages/mui/ui/Checkbox.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { hasAccessibleName } from './_warn.mjs';
const h = React.createElement;

export const NeoCheckbox = React.forwardRef(function NeoCheckbox({ label, checked, defaultChecked, indeterminate = false, disabled = false, onChange, id, ...props }, ref) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const { inputRef, ...rest } = props;
  hasAccessibleName('NeoCheckbox', label, rest);
  const nodo = React.useRef(null);
  React.useEffect(() => { if (nodo.current) nodo.current.indeterminate = indeterminate; }, [indeterminate]);
  const alNodo = React.useCallback((n) => {
    nodo.current = n;
    if (typeof inputRef === 'function') inputRef(n); else if (inputRef) inputRef.current = n;
  }, [inputRef]);
  return h(FormControlLabel, {
    ref,
    htmlFor: fieldId, label,
    control: h(Checkbox, {
      id: fieldId, indeterminate, disabled, inputRef: alNodo,
      ...(checked !== undefined ? { checked } : {}),
      ...(defaultChecked !== undefined ? { defaultChecked } : {}),
      onChange,
      ...rest,
    }),
  });
});
