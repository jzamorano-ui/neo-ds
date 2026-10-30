'use client';
// packages/mui/ui/TextArea.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormControl, FormLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { helpIcon } from './_help.mjs';
import { useKeyboardFocus } from './_keyboard-focus.mjs';
import { hasAccessibleName } from './_warn.mjs';
const h = React.createElement;

export const NeoTextArea = React.forwardRef(function NeoTextArea({ label, required = false, helperText, error = false, readOnly = false, disabled = false, tooltip, description, mark, counter, tooltipLabel, id, inputMode, maxLength, inputProps: consumerInputProps, value, defaultValue, onChange, minRows = 3, maxRows, rows, ...rest }, ref) {
  const inputAttrs = { ...(inputMode != null ? { inputMode } : {}), ...(maxLength != null ? { maxLength } : {}), ...(consumerInputProps || {}) };
  const autoId = React.useId();
  const fieldId = id || autoId;
  const helpId = helperText ? `${fieldId}-helper` : undefined;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const [typed, setTyped] = React.useState(String(defaultValue ?? '').length);
  const count = counter ?? (maxLength != null ? `${value != null ? String(value).length : typed}/${maxLength}` : undefined);
  hasAccessibleName('NeoTextArea', label, rest);
  const keyboardFocus = useKeyboardFocus();
  const helpNode = helpIcon({ text: tooltip, name: tooltipLabel, label, comp: 'TextArea', prefix: 'field' });
  const { className, style, sx, ...toControl } = rest;
  const cola = typeof label === 'string' && helpNode ? /^(?:(.*\S)\s+)?(\S+)\s*$/.exec(label) : null;
  const labelNode = !label ? null : cola
    ? [cola[1] ? h(FormLabel, { key: 'c', htmlFor: fieldId, required: false }, `${cola[1]} `) : null,
      h('span', { key: 't', className: 'field__label-tail' }, h(FormLabel, { htmlFor: fieldId }, cola[2]), helpNode)]
    : h(FormLabel, { htmlFor: fieldId }, label);
  const labelRow = label && helpNode ? h('div', { className: 'field__label-row' }, ...(cola ? labelNode : [labelNode, helpNode])) : labelNode;
  return h(FormControl, { error, disabled, required, fullWidth: true, variant: 'outlined', onFocus: keyboardFocus.onFocus, onBlur: keyboardFocus.onBlur, onPointerDown: keyboardFocus.onPointerDown, ref, className, style, sx },
    (description || mark)
      ? h('div', { className: 'field__header' + (description ? ' field__header--description' : '') },
        labelRow,
        description ? h('span', { id: descriptionId, className: 'field__description' }, description) : null,
        mark ? h('span', { className: 'field__mark' }, mark) : null)
      : labelRow,
    h(OutlinedInput, {
      id: fieldId, notched: false, readOnly,
      multiline: true, ...(rows != null ? { rows } : { minRows, ...(maxRows != null ? { maxRows } : {}) }),
      ...(Object.keys(inputAttrs).length ? { inputProps: inputAttrs } : {}),
      value, defaultValue, onChange: (e) => { setTyped(e.target.value.length); onChange?.(e); },
      ...toControl,
      'aria-describedby': [descriptionId, helpId, rest['aria-describedby']].filter(Boolean).join(' ') || undefined,
      className: keyboardFocus.active ? 'field--focus' : undefined,
    }),
    (error ? helperText : (helperText || count))
      ? h('span', { className: 'field__footer' },
        helperText ? h(FormHelperText, { id: helpId, key: error ? 'error' : 'helper', role: error ? 'alert' : undefined }, helperText) : h('span'),
        count ? h('span', { className: 'field__counter' + (disabled ? ' Mui-disabled' : ''), 'aria-hidden': 'true' }, count) : null)
      : null,
  );
});
