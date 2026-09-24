'use client';
// packages/mui/ui/RadioGroup.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormControl, FormLabel, RadioGroup } from '@mui/material';
import { warn, hasAccessibleName } from './_warn.mjs';
const h = React.createElement;

export const NeoRadioGroup = React.forwardRef(function NeoRadioGroup({ name, legend, value, defaultValue, direction = 'vertical', disabled = false, onChange, children, ...rest }, ref) {
  hasAccessibleName('NeoRadioGroup', legend, rest);
  if (!name) warn("NeoRadioGroup: without a `name`, two radios do NOT exclude each other even when they look like one group.");
  const legendId = `neo-radio-${React.useId()}-legend`;
  return h(FormControl, { component: 'fieldset', disabled, ref },
    h(FormLabel, { component: 'legend', id: legendId }, legend),
    h(RadioGroup, { 'aria-labelledby': legendId, name, value, defaultValue, row: direction === 'horizontal', onChange, ...rest }, children),
  );
});
