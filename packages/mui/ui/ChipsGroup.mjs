'use client';
// packages/mui/ui/ChipsGroup.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { FormGroup, RadioGroup, Chip, useRadioGroup } from '@mui/material';
import { NeoChips } from './Chips.mjs';
import { warn, hasAccessibleName } from './_warn.mjs';
import { reveal } from './_reveal.mjs';
const h = React.createElement;

const one = (x) => (Array.isArray(x) ? x[0] : x);
const many = (x) => (x === undefined ? undefined : Array.isArray(x) ? x : [x]);

function RadioChip({ value, label, disabled }) {
  const group = useRadioGroup();
  const checked = group != null && String(group.value) === String(value);
  return h(Chip, {
    component: 'label', variant: checked ? 'filled' : 'outlined', disabled,
    'data-selected': checked ? 'true' : undefined,
    label: h(React.Fragment, null,
      h('input', { type: 'radio', name: group?.name, value, checked, disabled, onChange: group?.onChange }),
      label),
  });
}

export const NeoChipsGroup = React.forwardRef(function NeoChipsGroup({ selection = 'single', options = [], value, defaultValue, disabled = false, onChange, ...rest }, ref) {
  hasAccessibleName('NeoChipsGroup', undefined, rest);
  const unlabeled = options.filter((o) => o && (o.label === undefined || String(o.label).trim() === ''));
  if (unlabeled.length) warn(`NeoChipsGroup: ${unlabeled.length} option(s) without \`label\` — the chip has no accessible name.`);
  const [own, setOwn] = React.useState(many(defaultValue) || []);
  const className = ['chips-group', rest.className].filter(Boolean).join(' ');

  if (selection === 'single') {
    return h(RadioGroup, {
      row: true, value: one(value), defaultValue: one(defaultValue),
      onChange: (e, v) => { reveal(e.target, '.MuiChip-root', { inline: 'center' }); onChange?.(e, v); },
      ...rest, className, ref,
    }, options.map((o) => h(RadioChip, { key: o.value, value: o.value, label: o.label, disabled: o.disabled || disabled })));
  }

  const chosen = many(value) || own;
  const toggle = (e, v) => {
    const next = chosen.includes(v) ? chosen.filter((x) => x !== v) : [...chosen, v];
    if (value === undefined) setOwn(next);
    if (next.includes(v)) reveal(e.currentTarget, '.MuiChip-root', { inline: 'center' });
    onChange?.(e, next);
  };
  return h(FormGroup, { row: true, role: 'group', ...rest, className, ref },
    options.map((o) => h(NeoChips, {
      key: o.value, label: o.label, selected: chosen.includes(o.value),
      disabled: o.disabled || disabled, onClick: (e) => toggle(e, o.value),
      onDelete: chosen.includes(o.value) ? (e) => toggle(e, o.value) : undefined,
    })));
});
