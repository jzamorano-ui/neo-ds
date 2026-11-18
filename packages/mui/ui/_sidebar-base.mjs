'use client';
// packages/mui/ui/_sidebar-base.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Drawer, AppBar, useMediaQuery } from '@mui/material';
import { useId } from './_use-id.mjs';
import { renderIcon } from './_icon.mjs';
import { NeoButtonIcon } from './ButtonIcon.mjs';
import { NeoTooltip } from './Tooltip.mjs';
import { NeoMenu } from './Menu.mjs';
const h = React.createElement;

const clases = (...xs) => xs.filter(Boolean).join(' ');
const claveDe = (o, i) => o?.key ?? o?.href ?? `${o?.label ?? 'o'}-${i}`;
const clavesDe = (grupos) => {
  const usadas = new Set();
  return grupos.map((g, gi) => {
    const t = g?.title;
    const base = g?.key != null ? `k:${g.key}` : (typeof t === 'string' || typeof t === 'number') ? `t:${t}` : `i:${gi}`;
    let clave = base;
    for (let n = 1; usadas.has(clave); n += 1) clave = `${base}#${n}`;
    usadas.add(clave);
    return clave;
  });
};
const esActual = (o, ruta) => ruta != null && o?.href != null && o.href === ruta;
const contieneActual = (o, ruta) => Array.isArray(o?.items) && o.items.some((s) => esActual(s, ruta));
const logoDe = (logo, riel) => (logo && typeof logo === 'object' && !React.isValidElement(logo) && ('full' in logo || 'compact' in logo)
  ? (riel ? logo.compact ?? logo.full : logo.full ?? logo.compact)
  : logo);

export const SidebarBase = React.forwardRef(function SidebarBase({
  type = 'group', items = [], currentPath, expanded: expandedProp, defaultExpanded = true, onExpandedChange,
  logo, profile, actions, notifications, linkComponent, 'aria-label': ariaLabel,
  textos, glifos, consultas, className, PaperProps,
  variant: _variant, anchor: _anchor, open: _open, onClose: _onClose,
  ...rest
}, ref) {
  const auto = useId();
  const ids = (s) => (auto ? `neo-sidebar-${auto}-${s}` : undefined);
  const desktop = useMediaQuery(consultas.desktop);
  const mobile = useMediaQuery(consultas.mobile);

  const barraRef = React.useRef(null);
  const refBarra = React.useCallback((n) => {
    barraRef.current = n;
    if (typeof ref === 'function') ref(n); else if (ref) ref.current = n;
  }, [ref]);

  const controlado = expandedProp !== undefined;
  const [ancho, setAncho] = React.useState(Boolean(defaultExpanded));
  const [abierto, setAbierto] = React.useState(false);
  const expanded = controlado ? Boolean(expandedProp) : (desktop ? ancho : abierto);
  const fijar = (v) => {
    if (!controlado) (desktop ? setAncho : setAbierto)(v);
    onExpandedChange?.(v);
  };

  const bloquear = !desktop && expanded;
  React.useEffect(() => {
    const doc = bloquear ? barraRef.current?.ownerDocument : null;
    if (!doc) return undefined;
    const { body } = doc;
    const antes = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const barraDeScroll = doc.defaultView.innerWidth - doc.documentElement.clientWidth;
    if (barraDeScroll > 0) body.style.paddingRight = `calc(${doc.defaultView.getComputedStyle(body).paddingRight} + ${barraDeScroll}px)`;
    body.style.overflow = 'hidden';
    return () => { body.style.overflow = antes.overflow; body.style.paddingRight = antes.paddingRight; };
  }, [bloquear]);
  const riel = desktop && !expanded;

  const lista = Array.isArray(items) ? items : [];
  const grupos = type === 'group' ? lista : [{ items: lista }];
  const claves = clavesDe(grupos);

  const [abiertos, setAbiertos] = React.useState(() => new Map());
  const abiertoDe = (g, cg) => (abiertos.has(cg) ? abiertos.get(cg) : g?.defaultOpen !== false);
  const [padres, setPadres] = React.useState(() => new Set(grupos.flatMap((g, gi) => (g?.items || [])
    .map((o, i) => (contieneActual(o, currentPath) ? `${claves[gi]} › ${claveDe(o, i)}` : null)).filter(Boolean))));
  React.useEffect(() => { if (riel) setPadres(new Set()); }, [riel]);
  React.useEffect(() => { if (desktop && !controlado) setAbierto(false); }, [desktop, controlado]);

  const Enlace = linkComponent || 'a';
  const alElegir = (o) => (e) => {
    if (o?.disabled) { e.preventDefault(); return; }
    o?.onClick?.(e);
    if (!desktop) fijar(false);
  };

  const opcion = (o, i, gi, cg, sub) => {
    const actual = esActual(o, currentPath);
    const claseParte = sub ? 'sidebar__sub-item' : 'sidebar__item';
    const icono = !sub && o?.icon ? renderIcon(o.icon, 'sidebar__item-icon') : null;
    const texto = h('span', null, o?.label);
    const tieneSub = !sub && Array.isArray(o?.items) && o.items.length > 0;
    let nodo, subLista = null;
    if (tieneSub) {
      const clave = `${cg} › ${claveDe(o, i)}`;
      const open = padres.has(clave) && !riel;
      const subId = ids(`sub-${gi}-${i}`);
      nodo = h('button', {
          type: 'button', className: claseParte, disabled: o.disabled || undefined,
          'aria-expanded': open ? 'true' : 'false', 'aria-controls': open ? subId : undefined,
          onClick: () => {
            if (riel) { setPadres(new Set([clave])); fijar(true); return; }
            setPadres((p) => { const n = new Set(p); if (n.has(clave)) n.delete(clave); else n.add(clave); return n; });
          },
        }, icono, texto, renderIcon(glifos.flecha, 'sidebar__item-arrow'));
      subLista = open ? h('ul', { id: subId, className: 'sidebar__sub-items' },
        o.items.map((s, si) => h('li', { key: claveDe(s, si) }, opcion(s, si, gi, cg, true)))) : null;
    } else if (o?.href == null && !o?.disabled) {
      nodo = h('button', { type: 'button', className: claseParte, onClick: alElegir(o) }, icono, texto);
    } else {
      nodo = h(Enlace, {
        className: claseParte,
        href: o?.disabled ? undefined : o?.href,
        role: o?.disabled ? 'link' : undefined,
        'aria-disabled': o?.disabled ? 'true' : undefined,
        'aria-current': actual ? 'page' : undefined,
        onClick: alElegir(o),
      }, icono, texto);
    }
    const envuelto = sub ? nodo : h(NeoTooltip, riel
      ? { label: o?.label, placement: 'right' }
      : { label: '', placement: 'right', disableHoverListener: true, disableFocusListener: true, disableTouchListener: true }, nodo);
    return h(React.Fragment, null, envuelto, subLista);
  };

  const navegacion = h('div', { key: 'nav', className: 'sidebar__navigation' },
    grupos.map((g, gi) => {
      const cg = claves[gi];
      const opciones = h('ul', { id: ids(`g-${gi}`), className: 'sidebar__list' },
        (g?.items || []).map((o, i) => h('li', { key: claveDe(o, i) }, opcion(o, i, gi, cg, false))));
      if (type !== 'group') return h(React.Fragment, { key: 'lista' }, opciones);
      const abiertoG = riel || abiertoDe(g, cg);
      const tituloId = ids(`t-${gi}`);
      return h('div', { key: cg, className: 'sidebar__group' },
        h('div', { className: 'sidebar__group-title', 'aria-hidden': riel ? 'true' : undefined },
          h('span', { id: tituloId }, g?.title),
          h(NeoButtonIcon, {
            className: 'sidebar__group-toggle', variant: 'tertiary', size: 'small', tabIndex: riel ? -1 : undefined,
            'aria-labelledby': tituloId, 'aria-expanded': abiertoG ? 'true' : 'false', 'aria-controls': abiertoG ? ids(`g-${gi}`) : undefined,
            onClick: riel ? undefined : () => setAbiertos((m) => new Map(m).set(cg, !(m.has(cg) ? m.get(cg) : g?.defaultOpen !== false))),
          }, renderIcon(glifos.flecha))),
        abiertoG ? opciones : null);
    }));

  const perfil = profile && !mobile ? (() => {
    const boton = h('button', { type: 'button', className: 'sidebar__profile', 'aria-label': riel ? profile.name : undefined },
      h('span', { className: 'sidebar__avatar', 'aria-hidden': 'true' }, profile.initials),
      h('span', { 'aria-hidden': riel ? 'true' : undefined },
        h('span', { className: 'sidebar__name' }, profile.name),
        profile.role ? h('span', { className: 'sidebar__role' }, profile.role) : null),
      profile.menu ? renderIcon(glifos.perfil) : null);
    return Array.isArray(profile.menu) && profile.menu.length
      ? h(NeoMenu, { trigger: boton, items: profile.menu, 'aria-label': profile.name, className: 'sidebar__profile-menu' })
      : boton;
  })() : null;

  const acciones = mobile && Array.isArray(actions) && actions.length
    ? h('div', { className: 'sidebar__actions' },
        h('ul', { className: 'sidebar__list' }, actions.map((o, i) => h('li', { key: claveDe(o, i) }, opcion(o, i, 'acc', 'acc', false)))))
    : null;

  const pie = (perfil || acciones)
    ? h('div', { key: 'pie', className: 'sidebar__footer' }, mobile ? h('hr', { className: 'sidebar__divider' }) : null, perfil, acciones)
    : null;

  if (desktop) {
    const toggle = h('button', {
      type: 'button', className: 'sidebar__toggle', 'aria-label': riel ? textos.expandir : textos.contraer,
      'aria-expanded': riel ? 'false' : 'true', onClick: () => fijar(riel),
    }, riel
      ? [h('span', { key: 'l', className: 'sidebar__logo' }, logoDe(logo, true)), h(React.Fragment, { key: 'g' }, renderIcon(glifos.desplegar))]
      : renderIcon(glifos.plegar));
    const cabecera = h('div', { key: 'cab', className: 'sidebar__header' },
      h('div', { className: 'sidebar__brand' },
        riel ? null : h('span', { className: 'sidebar__logo' }, logoDe(logo, false)),
        h(NeoTooltip, riel
          ? { label: textos.expandir, placement: 'right' }
          : { label: '', placement: 'right', disableHoverListener: true, disableFocusListener: true, disableTouchListener: true }, toggle)),
      h('hr', { className: 'sidebar__divider' }));
    return h(Drawer, {
      variant: 'permanent', anchor: 'left', className, ...rest, ref,
      PaperProps: {
        ...PaperProps, component: 'nav', 'aria-label': ariaLabel,
        className: clases('sidebar', riel && 'sidebar--rail', PaperProps?.className),
      },
    }, cabecera, navegacion, pie);
  }

  const menuId = ids('menu');
  const { style, sx, ...restoDelMenu } = rest;
  return h(AppBar, {
      component: 'nav', 'aria-label': ariaLabel, position: 'sticky', elevation: 0, color: 'inherit',
      style, sx, className: clases('sidebar__bar', className), ref: refBarra,
    },
    h('button', {
      type: 'button', className: 'sidebar__menu-toggle', 'aria-label': expanded ? textos.cerrar : textos.abrir,
      'aria-expanded': expanded ? 'true' : 'false', 'aria-controls': expanded ? menuId : undefined,
      onClick: () => fijar(!expanded),
    }, renderIcon(expanded ? glifos.cerrar : glifos.abrir)),
    h('span', { className: 'sidebar__logo' }, logoDe(logo, true)),
    h('span', { className: 'sidebar__notifications' }, notifications),
    h(Drawer, {
      keepMounted: true, ...restoDelMenu, variant: 'temporary', anchor: 'left', open: expanded, onClose: () => fijar(false), disablePortal: true,
      container: () => barraRef.current, disableScrollLock: true,
      BackdropProps: { className: 'sidebar__scrim' },
      PaperProps: {
        ...PaperProps, id: menuId, role: 'dialog', 'aria-modal': 'true', 'aria-label': PaperProps?.['aria-label'] ?? ariaLabel,
        className: clases('sidebar', 'sidebar__card', PaperProps?.className),
      },
    },
    h('button', { type: 'button', className: 'sidebar__menu-close', 'aria-label': textos.cerrar, onClick: () => fijar(false) }),
    navegacion, pie));
});
