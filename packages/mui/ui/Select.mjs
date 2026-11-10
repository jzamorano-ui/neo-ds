'use client';
// packages/mui/ui/Select.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormControl, FormLabel, Select, OutlinedInput, FormHelperText } from '@mui/material';
import { useId } from './_use-id.mjs';
import { helpIcon } from './_help.mjs';
import { selectValueProps } from './_select-value.mjs';
import { hasAccessibleName } from './_warn.mjs';
const h = React.createElement;

export const NeoSelect = React.forwardRef(function NeoSelect({ label, required = false, helperText, error = false, readOnly = false, disabled = false, tooltip, description, mark, tooltipLabel, id, placeholder, renderValue, children, ...rest }, ref) {
  const autoId = useId();
  const fieldId = id || autoId;
  const helpId = helperText && fieldId ? `${fieldId}-helper` : undefined;
  const descriptionId = description && fieldId ? `${fieldId}-description` : undefined;
  const [openOwn, setOpenOwn] = React.useState(Boolean(rest.defaultOpen));
  const open = rest.open ?? openOwn;
  const labelId = label && fieldId ? `${fieldId}-label` : undefined;
  hasAccessibleName('NeoSelect', label, rest);
  const helpNode = helpIcon({ text: tooltip, name: tooltipLabel, label, comp: 'Select', prefix: 'select' });
  const { className, style, sx, ...toControl } = rest;
  const cola = typeof label === 'string' && helpNode ? /^(?:(.*\S)\s+)?(\S+)\s*$/.exec(label) : null;
  const labelTailId = cola && labelId ? `${labelId}-tail` : undefined;
  const labelIds = labelTailId ? (cola[1] ? `${labelId} ${labelTailId}` : labelTailId) : labelId;
  const labelNode = !label ? null : cola
    ? [cola[1] ? h(FormLabel, { key: 'c', id: labelId, htmlFor: fieldId, required: false }, `${cola[1]} `) : null,
      h('span', { key: 't', className: 'select__label-tail' }, h(FormLabel, { id: labelTailId, htmlFor: fieldId }, cola[2]), helpNode)]
    : h(FormLabel, { id: labelId, htmlFor: fieldId }, label);
  const labelRow = label && helpNode ? h('div', { className: 'select__label-row' }, ...(cola ? labelNode : [labelNode, helpNode])) : labelNode;
  return h(FormControl, { error, disabled, required, fullWidth: true, variant: 'outlined', ref, className, style, sx },
    (description || mark)
      ? h('div', { className: 'select__header' + (description ? ' select__header--description' : '') },
        labelRow,
        description ? h('span', { id: descriptionId, className: 'select__description' }, description) : null,
        mark ? h('span', { className: 'select__mark' }, mark) : null)
      : labelRow,
    h(Select, {
      id: fieldId, readOnly,
      labelId: labelIds,
      SelectDisplayProps: { 'aria-invalid': error ? 'true' : undefined, 'aria-readonly': readOnly ? 'true' : undefined, 'aria-required': required ? 'true' : undefined, ...(open ? null : { 'aria-controls': undefined }) },
      ...selectValueProps({ placeholder, renderValue, children, value: rest.value, defaultValue: rest.defaultValue }),
      input: h(OutlinedInput, { notched: false }),
      ...toControl,
      'aria-describedby': [descriptionId, helpId, rest['aria-describedby']].filter(Boolean).join(' ') || undefined,
      MenuProps: { ...rest.MenuProps, MenuListProps: { disabledItemsFocusable: true, ...(rest.MenuProps || {}).MenuListProps } },
      onOpen: (e) => { setOpenOwn(true); rest.onOpen?.(e); }, onClose: (e) => { setOpenOwn(false); rest.onClose?.(e); },
    }, children),
    helperText ? h(FormHelperText, { id: helpId, key: error ? 'error' : 'helper', role: error ? 'alert' : undefined }, helperText) : null,
  );
});
