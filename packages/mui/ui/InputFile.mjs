'use client';
// packages/mui/ui/InputFile.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormControl, FormLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { useId } from './_use-id.mjs';
import { helpIcon } from './_help.mjs';
import { useKeyboardFocus } from './_keyboard-focus.mjs';
import { FileBox } from './_archivo.mjs';
import { hasAccessibleName } from './_warn.mjs';
const h = React.createElement;

export const NeoInputFile = React.forwardRef(function NeoInputFile({ label, required = false, helperText, loading = false, readOnly = false, disabled = false, error = false, tooltip, description, mark, tooltipLabel, id, accept, fileName, fileSize, loadingText, removeLabel, onRemove, inputProps: consumerInputProps, ...rest }, ref) {
  const inputAttrs = { ...(accept != null ? { accept } : {}), ...(fileName != null ? { fileName } : {}), ...(fileSize != null ? { fileSize } : {}), ...(loadingText != null ? { loadingText } : {}), ...(removeLabel != null ? { removeLabel } : {}), ...(onRemove != null ? { onRemove } : {}), ...(loading != null ? { loading } : {}), ...(consumerInputProps || {}) };
  const autoId = useId();
  const fieldId = id || autoId;
  const helpId = helperText && fieldId ? `${fieldId}-helper` : undefined;
  const descriptionId = description && fieldId ? `${fieldId}-description` : undefined;
  hasAccessibleName('NeoInputFile', label, rest);
  const keyboardFocus = useKeyboardFocus();
  const helpNode = helpIcon({ text: tooltip, name: tooltipLabel, label, comp: 'InputFile', prefix: 'field' });
  const { className, style, sx, ...toControl } = rest;
  const cola = typeof label === 'string' && helpNode ? /^(?:(.*\S)\s+)?(\S+)\s*$/.exec(label) : null;
  const labelNode = !label ? null : cola
    ? [cola[1] ? h(FormLabel, { key: 'c', htmlFor: fieldId, required: false }, `${cola[1]} `) : null,
      h('span', { key: 't', className: 'field__label-tail' }, h(FormLabel, { htmlFor: fieldId }, cola[2]), helpNode)]
    : h(FormLabel, { htmlFor: fieldId }, label);
  const labelRow = label && helpNode ? h('div', { className: 'field__label-row' }, ...(cola ? labelNode : [labelNode, helpNode])) : labelNode;
  return h(FormControl, { disabled, error, required, fullWidth: true, variant: 'outlined', 'data-description': description ? 'true' : 'false', onFocus: keyboardFocus.onFocus, onBlur: keyboardFocus.onBlur, onPointerDown: keyboardFocus.onPointerDown, ref, className, style, sx },
    (description || mark)
      ? h('div', { className: 'field__header' + (description ? ' field__header--description' : '') },
        labelRow,
        description ? h('span', { id: descriptionId, className: 'field__description' }, description) : null,
        mark ? h('span', { className: 'field__mark' }, mark) : null)
      : labelRow,
    h(OutlinedInput, {
      id: fieldId, notched: false, readOnly,
      inputComponent: FileBox,
      ...(Object.keys(inputAttrs).length ? { inputProps: inputAttrs } : {}),
      ...toControl,
      'aria-describedby': [descriptionId, helpId, rest['aria-describedby']].filter(Boolean).join(' ') || undefined,
      className: keyboardFocus.active ? 'field--focus' : undefined,
    }),
    helperText ? h(FormHelperText, { id: helpId, key: error ? 'error' : 'helper', role: error ? 'alert' : undefined }, helperText) : null,
  );
});
