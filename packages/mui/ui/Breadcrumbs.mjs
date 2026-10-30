'use client';
// packages/mui/ui/Breadcrumbs.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Breadcrumbs } from '@mui/material';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

const Ellipsis = () => renderIcon('system-ellipsis');
const conClase = (x, clase, extra) => (React.isValidElement(x)
  ? React.cloneElement(x, { ...extra, className: [x.props.className, clase].filter(Boolean).join(' ') })
  : h('span', { ...extra, className: clase }, x));

export const NeoBreadcrumbs = React.forwardRef(function NeoBreadcrumbs({ children, className, onClick, 'aria-label': ariaLabel = 'Breadcrumb', ...rest }, ref) {
  const raiz = React.useRef(null);
  const setRef = React.useCallback((n) => { raiz.current = n; if (typeof ref === 'function') ref(n); else if (ref) ref.current = n; }, [ref]);
  const [revelada, setRevelada] = React.useState(false);
  const hijos = React.Children.toArray(children).filter((x) => x !== null && x !== false && x !== '');
  const colapsada = !revelada && hijos.length > 4;
  const ultimo = hijos.length - 1;
  const lugares = hijos.map((x, i) => (i === ultimo
    ? conClase(x, 'NeoBreadcrumbs-current', { 'aria-current': 'page', key: x.key ?? 'actual' })
    : conClase(x, 'NeoBreadcrumbs-level', { key: x.key ?? `n${i}` })));
  React.useEffect(() => {
    if (!revelada) return;
    const li = raiz.current?.querySelectorAll('.MuiBreadcrumbs-li')[1];
    li?.querySelector('a[href],button,[tabindex]')?.focus();
  }, [revelada]);
  return h(Breadcrumbs, {
    ref: setRef,
    'aria-label': ariaLabel,
    className: ['breadcrumbs', className].filter(Boolean).join(' '),
    maxItems: 4, itemsBeforeCollapse: 1, itemsAfterCollapse: 2,
    separator: renderIcon('system-chevron-right'),
    slots: { CollapsedIcon: Ellipsis },
    onClick: (e) => {
      const li = e.target.closest?.('li');
      if (colapsada && li && !li.matches('.MuiBreadcrumbs-li, .MuiBreadcrumbs-separator')) setRevelada(true);
      onClick?.(e);
    },
    ...rest,
  }, lugares);
});
