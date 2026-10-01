'use client';
// packages/mui/ui/Menu.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { withAliases } from './_alias-props.mjs';
import { Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

function mergeRefs(a, b) {
  return React.useMemo(() => {
    if (a == null && b == null) return null;
    return (node) => {
      for (const r of [a, b]) {
        if (typeof r === 'function') r(node);
        else if (r) r.current = node;
      }
    };
  }, [a, b]);
}

export const NeoMenu = React.forwardRef(function NeoMenu(rawProps, ref) {
  const { trigger, items = [], 'aria-label': ariaLabel, defaultOpen = false, open: openProp, onClose: onCloseProp, ...rest } = withAliases('NeoMenu', rawProps);
  const role = 'menu';
  const auto = React.useId();
  const [anchor, setAnchor] = React.useState(null);
  const controlado = openProp !== undefined;
  const isOpen = controlado ? Boolean(openProp) : Boolean(anchor);
  const cerrar = (e, reason) => { if (!controlado) setAnchor(null); onCloseProp?.(e, reason); };
  const panelId = `neo-menu-${auto}`;
  const idTrigger = trigger?.props?.id ?? `neo-menu-${auto}-trigger`;

  if (process.env.NODE_ENV !== 'production') {
    if (!trigger) console.warn('[Neo] Menu: `trigger` is missing — without a trigger the panel does not open.');
    if (!ariaLabel) console.warn('[Neo] Menu: `aria-label` is missing — the screen reader does not say what the menu is for.');
  }

  const r19 = Number(String(React.version).split('.')[0]) >= 19;
  const triggerRef = mergeRefs(trigger ? (r19 ? trigger.props.ref : trigger.ref) ?? null : null, ref);
  const triggerNode = React.useRef(null);
  const [nodoAncla, setNodoAncla] = React.useState(null);
  const storeNode = React.useCallback((n) => {
    triggerNode.current = n;
    if (controlado) setNodoAncla(n);
    if (typeof triggerRef === 'function') triggerRef(n);
    else if (triggerRef) triggerRef.current = n;
  }, [triggerRef, controlado]);
  React.useEffect(() => {
    if (defaultOpen && triggerNode.current) setAnchor(triggerNode.current);
  }, [defaultOpen]);

  const triggerElement = trigger && React.cloneElement(trigger, {
    ref: storeNode,
    id: idTrigger,
    'aria-haspopup': role,
    'aria-expanded': isOpen ? 'true' : undefined,
    'aria-controls': isOpen ? panelId : undefined,
    onClick: (e) => { if (!controlado) setAnchor(e.currentTarget); trigger.props.onClick?.(e); },
  });

  return h(React.Fragment, null,
    triggerElement,
    h(Menu, {
      id: panelId, anchorEl: anchor || (controlado ? nodoAncla : null), open: isOpen, onClose: cerrar,
      ...rest,
      MenuListProps: { ...rest.MenuListProps, role, ...(ariaLabel ? { 'aria-label': ariaLabel } : { 'aria-labelledby': idTrigger }), disabledItemsFocusable: true },
    }, ...items.flatMap((it, i) => (
      it.divider
        ? [h(Divider, { key: `d${i}` })]
        : [h(MenuItem, {
            key: it.value ?? i,
            disabled: it.disabled,
            onClick: () => { if (!controlado) setAnchor(null); it.onSelect?.(it.value); },
          },
          it.icon ? h(ListItemIcon, { key: 'i', 'aria-hidden': 'true' }, renderIcon(it.icon, 'menu-item__icon')) : null,
          h('span', { key: 'l', className: 'NeoMenu-label' }, it.label))]
    ))),
  );
});
