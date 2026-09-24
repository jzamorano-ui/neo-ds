'use client';
// packages/mui/ui/TextArea.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormControl, FormLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { helpIcon } from './_help.mjs';
import { useKeyboardFocus } from './_keyboard-focus.mjs';
import { warn, hasAccessibleName } from './_warn.mjs';
const h = React.createElement;

export const NeoTextArea = React.forwardRef(function NeoTextArea({ label, required = false, helperText, error = false, readOnly = false, disabled = false, tooltip, counter, tooltipLabel, id, inputMode, maxLength, inputProps: consumerInputProps, value, defaultValue, onChange, minRows = 3, maxRows, rows, ...rest }, ref) {
  const inputAttrs = { ...(inputMode != null ? { inputMode } : {}), ...(maxLength != null ? { maxLength } : {}), ...(consumerInputProps || {}) };
  {
    const extras = ['iconLeft', 'iconRight', 'prefix', 'suffix'].filter((k) => rest[k] != null && rest[k] !== false && rest[k] !== '');
    if (extras.length) warn(`text-field: with type=text-area the master does not draw ${extras.join(', ')} — the contract omits them`);
    delete rest.iconLeft; delete rest.iconRight; delete rest.prefix; delete rest.suffix;
  }
  if (rest.type === 'input') warn('text-field: type=input is NeoTextField, not NeoTextArea');
  if (['input', 'text-area'].includes(rest.type)) delete rest.type;
  const autoId = React.useId();
  const fieldId = id || autoId;
  const helpId = helperText ? `${fieldId}-helper` : undefined;
  const [typed, setTyped] = React.useState(String(defaultValue ?? '').length);
  const count = counter ?? (maxLength != null ? `${value != null ? String(value).length : typed}/${maxLength}` : undefined);
  hasAccessibleName('NeoTextArea', label, rest);
  const keyboardFocus = useKeyboardFocus();
  const helpNode = helpIcon({ text: tooltip, name: tooltipLabel, label, comp: 'TextArea', prefix: 'field' });
  const labelNode = label ? h(FormLabel, { htmlFor: fieldId, required }, label) : null;
  return h(FormControl, { error, disabled, fullWidth: true, variant: 'outlined', onFocus: keyboardFocus.onFocus, onBlur: keyboardFocus.onBlur, onPointerDown: keyboardFocus.onPointerDown, ref },
    label && helpNode ? h('div', { className: 'field__label-row' }, labelNode, helpNode) : labelNode,
    h(OutlinedInput, {
      id: fieldId, notched: false, readOnly,
      multiline: true, ...(rows != null ? { rows } : { minRows, ...(maxRows != null ? { maxRows } : {}) }),
      ...(Object.keys(inputAttrs).length ? { inputProps: inputAttrs } : {}),
      'aria-describedby': helpId,
      value, defaultValue, onChange: (e) => { setTyped(e.target.value.length); onChange?.(e); },
      ...rest,
      className: [keyboardFocus.active ? 'field--focus' : null, rest.className].filter(Boolean).join(' ') || undefined,
    }),
    (error ? helperText : (helperText || count))
      ? h('span', { className: 'field__footer' },
        helperText ? h(FormHelperText, { id: helpId, key: error ? 'error' : 'helper', role: error ? 'alert' : undefined }, helperText) : h('span'),
        count ? h('span', { className: 'field__counter' + (disabled ? ' Mui-disabled' : ''), 'aria-hidden': 'true' }, count) : null)
      : null,
  );
});
