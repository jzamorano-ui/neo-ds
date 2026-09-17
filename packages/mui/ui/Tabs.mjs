'use client';
// packages/mui/ui/Tabs.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { renderIcon } from './_icon.mjs';
import { reveal } from './_reveal.mjs';
import { watchOverflow } from './_overflow.mjs';
const h = React.createElement;

export const NeoTabs = React.forwardRef(function NeoTabs({ items = [], value, defaultValue, onChange, 'aria-label': ariaLabel, ...rest }, ref) {
  const auto = React.useId();
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const activeValue = value !== undefined ? value : internal;
  const rowRef = React.useRef(null);
  React.useEffect(() => watchOverflow(rowRef.current, '[role="tab"]'), [items.length]);
  const setRef = React.useCallback((n) => { rowRef.current = n; if (typeof ref === 'function') ref(n); else if (ref) ref.current = n; }, [ref]);

  if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
    if (!ariaLabel) console.warn('[Neo] Tabs: `aria-label` is missing — without it the screen reader does not say what the list is for.');
    if (items.length < 2) console.warn('[Neo] Tabs: with fewer than two sections there is nothing to navigate between.');
  }

  const id = (v, part) => `neo-tabs-${auto}-${part}-${v}`;
  const handleChange = (e, v) => { reveal(e.target, '[role="tab"]', { inline: 'center', settle: true }); if (value === undefined) setInternal(v); onChange?.(e, v); };

  return h(React.Fragment, null,
    h(Tabs, { value: activeValue, onChange: handleChange, 'aria-label': ariaLabel, ...rest, ref: setRef },
      ...items.map((it) => h(Tab, {
        key: it.value,
        value: it.value,
        label: it.label,
        icon: renderIcon(it.icon),
        disabled: it.disabled,
        id: id(it.value, 'tab'),
        'aria-controls': id(it.value, 'panel'),
      }))),
    ...items.map((it) => h('div', {
      key: it.value,
      role: 'tabpanel',
      id: id(it.value, 'panel'),
      'aria-labelledby': id(it.value, 'tab'),
      tabIndex: 0,
      hidden: it.value !== activeValue,
    }, it.value === activeValue ? it.content : null)),
  );
});
