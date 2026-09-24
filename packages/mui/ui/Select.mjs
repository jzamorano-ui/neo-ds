'use client';
// packages/mui/ui/Select.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormControl, FormLabel, Select, OutlinedInput, FormHelperText } from '@mui/material';
import { helpIcon } from './_help.mjs';
import { selectValueProps } from './_select-value.mjs';
import { hasAccessibleName } from './_warn.mjs';
const h = React.createElement;

export const NeoSelect = React.forwardRef(function NeoSelect({ label, required = false, helperText, error = false, readOnly = false, disabled = false, tooltip, tooltipLabel, id, placeholder, renderValue, children, ...rest }, ref) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const helpId = helperText ? `${fieldId}-helper` : undefined;
  const [openOwn, setOpenOwn] = React.useState(Boolean(rest.defaultOpen));
  const open = rest.open ?? openOwn;
  const labelId = label ? `${fieldId}-label` : undefined;
  hasAccessibleName('NeoSelect', label, rest);
  const helpNode = helpIcon({ text: tooltip, name: tooltipLabel, label, comp: 'Select', prefix: 'select' });
  const labelNode = label ? h(FormLabel, { id: labelId, htmlFor: fieldId, required }, label) : null;
  return h(FormControl, { error, disabled, fullWidth: true, variant: 'outlined', ref },
    label && helpNode ? h('div', { className: 'select__label-row' }, labelNode, helpNode) : labelNode,
    h(Select, {
      id: fieldId, readOnly,
      labelId,
      SelectDisplayProps: { 'aria-invalid': error ? 'true' : undefined, 'aria-readonly': readOnly ? 'true' : undefined, ...(open ? null : { 'aria-controls': undefined }) },
      ...selectValueProps({ placeholder, renderValue, children, value: rest.value, defaultValue: rest.defaultValue }),
      input: h(OutlinedInput, { notched: false }),
      'aria-describedby': helpId,
      ...rest,
      MenuProps: { ...rest.MenuProps, MenuListProps: { disabledItemsFocusable: true, ...(rest.MenuProps || {}).MenuListProps } },
      onOpen: (e) => { setOpenOwn(true); rest.onOpen?.(e); }, onClose: (e) => { setOpenOwn(false); rest.onClose?.(e); },
    }, children),
    helperText ? h(FormHelperText, { id: helpId, key: error ? 'error' : 'helper', role: error ? 'alert' : undefined }, helperText) : null,
  );
});
