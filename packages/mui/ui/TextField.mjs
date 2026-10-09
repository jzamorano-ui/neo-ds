'use client';
// packages/mui/ui/TextField.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormControl, FormLabel, OutlinedInput, FormHelperText, InputAdornment } from '@mui/material';
import { renderIcon } from './_icon.mjs';
import { helpIcon } from './_help.mjs';
import { useKeyboardFocus } from './_keyboard-focus.mjs';
import { warn, hasAccessibleName } from './_warn.mjs';
const h = React.createElement;

export const NeoTextField = React.forwardRef(function NeoTextField({ label, required = false, helperText, error = false, readOnly = false, disabled = false, prefix, suffix, tooltip, iconLeft, iconRight, counter, tooltipLabel, startAdornment, endAdornment, id, inputMode, maxLength, inputProps: consumerInputProps, value, defaultValue, onChange, ...rest }, ref) {
  const enterArmed = React.useRef(false);
  const inputAttrs = { ...(inputMode != null ? { inputMode } : {}), ...(maxLength != null ? { maxLength } : {}), ...(consumerInputProps || {}), onKeyDown: (e) => { rest.onKeyDown?.(e); consumerInputProps?.onKeyDown?.(e); enterArmed.current = e.key === 'Enter' && !e.defaultPrevented && !e.nativeEvent.isComposing && e.keyCode !== 229; }, onKeyUp: (e) => { rest.onKeyUp?.(e); consumerInputProps?.onKeyUp?.(e); if (enterArmed.current && e.key === 'Enter') { enterArmed.current = false; e.currentTarget.blur(); } } };
  if (rest.type === 'text-area') warn('text-field: type=text-area is NeoTextArea, not NeoTextField');
  if (['input', 'text-area'].includes(rest.type)) delete rest.type;
  const autoId = React.useId();
  const fieldId = id || autoId;
  const helpId = helperText ? `${fieldId}-helper` : undefined;
  const [typed, setTyped] = React.useState(String(defaultValue ?? '').length);
  const count = counter ?? (maxLength != null ? `${value != null ? String(value).length : typed}/${maxLength}` : undefined);
  hasAccessibleName('NeoTextField', label, rest);
  const keyboardFocus = useKeyboardFocus();
  const helpNode = helpIcon({ text: tooltip, name: tooltipLabel, label, comp: 'TextField', prefix: 'field' });
  const { className, style, sx, ...toControl } = rest;
  const adornment = (pos, ...pieces) => {
    const present = pieces.filter(([, n]) => n).map(([k, n]) => h(InputAdornment, { key: k, position: pos }, n));
    if (!present.length) return undefined;
    return present.length === 1 ? present[0] : h(React.Fragment, null, ...present);
  };
  const cola = typeof label === 'string' && helpNode ? /^(?:(.*\S)\s+)?(\S+)\s*$/.exec(label) : null;
  const labelNode = !label ? null : cola
    ? [cola[1] ? h(FormLabel, { key: 'c', htmlFor: fieldId, required: false }, `${cola[1]} `) : null,
      h('span', { key: 't', className: 'field__label-tail' }, h(FormLabel, { htmlFor: fieldId }, cola[2]), helpNode)]
    : h(FormLabel, { htmlFor: fieldId }, label);
  return h(FormControl, { error, disabled, required, fullWidth: true, variant: 'outlined', onFocus: keyboardFocus.onFocus, onBlur: keyboardFocus.onBlur, onPointerDown: keyboardFocus.onPointerDown, ref, className, style, sx },
    label && helpNode ? h('div', { className: 'field__label-row' }, ...(cola ? labelNode : [labelNode, helpNode])) : labelNode,
    h(OutlinedInput, {
      id: fieldId, notched: false, readOnly,
      startAdornment: startAdornment ?? adornment('start', ['i', iconLeft ? renderIcon(iconLeft, 'field__icon') : null], ['t', prefix ? h('span', { className: 'field__prefix' }, prefix) : null]),
      endAdornment: endAdornment ?? adornment('end', ['t', suffix ? h('span', { className: 'field__suffix' }, suffix) : null], ['i', iconRight ? renderIcon(iconRight, 'field__icon') : null]),
      ...(Object.keys(inputAttrs).length ? { inputProps: inputAttrs } : {}),
      value, defaultValue, onChange: (e) => { setTyped(e.target.value.length); onChange?.(e); },
      ...toControl,
      'aria-describedby': [helpId, rest['aria-describedby']].filter(Boolean).join(' ') || undefined,
      className: keyboardFocus.active ? 'field--focus' : undefined,
    }),
    (error ? helperText : (helperText || count))
      ? h('span', { className: 'field__footer' },
        helperText ? h(FormHelperText, { id: helpId, key: error ? 'error' : 'helper', role: error ? 'alert' : undefined }, helperText) : h('span'),
        count ? h('span', { className: 'field__counter' + (disabled ? ' Mui-disabled' : ''), 'aria-hidden': 'true' }, count) : null)
      : null,
  );
});
