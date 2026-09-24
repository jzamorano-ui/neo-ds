'use client';
// packages/mui/ui/Combobox.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormControl, FormLabel, Autocomplete, TextField, FormHelperText, InputAdornment } from '@mui/material';
import { renderIcon } from './_icon.mjs';
import { helpIcon } from './_help.mjs';
import { useKeyboardFocus } from './_keyboard-focus.mjs';
import { hasAccessibleName } from './_warn.mjs';
const h = React.createElement;

export const NeoCombobox = React.forwardRef(function NeoCombobox({ label, required = false, helperText, error = false, readOnly = false, disabled = false, tooltip, iconLeft, iconRight, tooltipLabel, id, placeholder, options = [], onChange, ...rest }, ref) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const helpId = helperText ? `${fieldId}-helper` : undefined;
  const labelId = label ? `${fieldId}-label` : undefined;
  hasAccessibleName('NeoCombobox', label, rest);
  const keyboardFocus = useKeyboardFocus();
  const helpNode = helpIcon({ text: tooltip, name: tooltipLabel, label, comp: 'Combobox', prefix: 'combobox' });
  const labelNode = label ? h(FormLabel, { id: labelId, htmlFor: fieldId, required }, label) : null;
  return h(FormControl, { error, disabled, fullWidth: true, variant: 'outlined', onFocus: keyboardFocus.onFocus, onBlur: keyboardFocus.onBlur, onPointerDown: keyboardFocus.onPointerDown, ref },
    label && helpNode ? h('div', { className: 'combobox__label-row' }, labelNode, helpNode) : labelNode,
    h(Autocomplete, {
      id: fieldId, fullWidth: true, blurOnSelect: true, options, disabled, readOnly,
      clearIcon: renderIcon('system-error'),
      onChange,
      renderInput: (params) => h(TextField, {
        ...params, placeholder, error, disabled,
        inputProps: { ...params.inputProps, 'aria-describedby': helpId },
        InputProps: {
          ...params.InputProps,
          className: [params.InputProps.className, keyboardFocus.active ? 'field--focus' : null].filter(Boolean).join(' '),
          readOnly,
          startAdornment: iconLeft ? h(React.Fragment, null, h(InputAdornment, { position: 'start' }, renderIcon(iconLeft, 'combobox__icon')), params.InputProps.startAdornment) : params.InputProps.startAdornment,
          endAdornment: iconRight ? h(React.Fragment, null, h(InputAdornment, { position: 'end' }, renderIcon(iconRight, 'combobox__icon')), params.InputProps.endAdornment) : params.InputProps.endAdornment,
        },
      }),
      ...rest,
    }),
    helperText ? h(FormHelperText, { id: helpId, key: error ? 'error' : 'helper', role: error ? 'alert' : undefined }, helperText) : null,
  );
});
