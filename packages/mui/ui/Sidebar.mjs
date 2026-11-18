'use client';
// packages/mui/ui/Sidebar.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { withAliases } from './_alias-props.mjs';
import { SidebarBase } from './_sidebar-base.mjs';
import { warn } from './_warn.mjs';
const h = React.createElement;

const TEXTOS = {"abrir":"Abrir menú","cerrar":"Cerrar menú","contraer":"Contraer menú","expandir":"Expandir menú"};
const GLIFOS = {"plegar":"system-sidebar-close","desplegar":"system-sidebar-open","abrir":"system-menu","cerrar":"system-close","perfil":"system-chevron-right","flecha":"system-chevron-down"};
const CONSULTAS = {"desktop":"(min-width: 992px)","mobile":"(max-width: 719px)"};

export const NeoSidebar = React.forwardRef(function NeoSidebar(rawProps, ref) {
  const { type = 'group', items = [], currentPath, expanded, defaultExpanded = true, onExpandedChange, profile, logo, notifications, actions, linkComponent, 'aria-label': ariaLabel = 'Navegación principal', ...rest } = withAliases('NeoSidebar', rawProps);
  const lista = Array.isArray(items) ? items : [];
  if (type === 'group' && lista.length > 5) warn('sidebar: groups: at most 5 — the master offers five groups: with more places, the navigation is reorganized, not stretched.');
  const opciones = type === 'group' ? lista.map((g) => g?.items?.length || 0) : [lista.length];
  if (opciones.some((n) => n > 8)) warn('sidebar: options per group: at most 8 — a group with more options no longer scans: it is split in two groups.');
  return h(SidebarBase, {
    type, items, currentPath, expanded, defaultExpanded, onExpandedChange, profile, logo, notifications, actions, linkComponent, 'aria-label': ariaLabel,
    textos: TEXTOS, glifos: GLIFOS, consultas: CONSULTAS,
    ...rest, ref,
  });
});
