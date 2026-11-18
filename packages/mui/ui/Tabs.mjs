'use client';
// packages/mui/ui/Tabs.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { useId } from './_use-id.mjs';
import { renderIcon } from './_icon.mjs';
import { reveal } from './_reveal.mjs';
import { watchOverflow } from './_overflow.mjs';
const h = React.createElement;

export const NeoTabs = React.forwardRef(function NeoTabs({ items = [], value, defaultValue, onChange, 'aria-label': ariaLabel, ...rest }, ref) {
  const auto = useId();
  const [internal, setInternal] = React.useState(defaultValue);
  const activeValue = value !== undefined ? value : (items.some((it) => it.value === internal) ? internal : items[0]?.value);
  const rowRef = React.useRef(null);
  React.useEffect(() => watchOverflow(rowRef.current, '[role="tab"]'), [items.length]);
  const setRef = React.useCallback((n) => { rowRef.current = n; if (typeof ref === 'function') ref(n); else if (ref) ref.current = n; }, [ref]);

  if (process.env.NODE_ENV !== 'production') {
    if (!ariaLabel) console.warn('[Neo] Tabs: `aria-label` is missing — without it the screen reader does not say what the list is for.');
    if (items.length < 2) console.warn('[Neo] Tabs: with fewer than two sections there is nothing to navigate between.');
  }

  const id = (i, part) => (auto ? `neo-tabs-${auto}-${part}-${i}` : undefined);
  const handleChange = (e, v) => { reveal(e.target, '[role="tab"]', { inline: 'center', settle: true }); if (value === undefined) setInternal(v); onChange?.(e, v); };

  return h(React.Fragment, null,
    h(Tabs, { value: activeValue, onChange: handleChange, 'aria-label': ariaLabel, ...rest, ref: setRef },
      ...items.map((it, i) => h(Tab, {
        key: it.value,
        value: it.value,
        label: it.label,
        icon: renderIcon(it.icon),
        disabled: it.disabled,
        id: id(i, 'tab'),
        'aria-controls': id(i, 'panel'),
      }))),
    ...items.map((it, i) => h('div', {
      key: it.value,
      role: 'tabpanel',
      id: id(i, 'panel'),
      'aria-labelledby': id(i, 'tab'),
      tabIndex: 0,
      hidden: it.value !== activeValue,
    }, it.value === activeValue ? it.content : null)),
  );
});
