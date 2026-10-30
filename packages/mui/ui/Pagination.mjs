'use client';
// packages/mui/ui/Pagination.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { PaginationItem, usePagination, useMediaQuery, paginationClasses, styled, useThemeProps } from '@mui/material';
import { renderIcon } from './_icon.mjs';
const h = React.createElement;

const Raiz = styled('nav', { name: 'MuiPagination', slot: 'Root', overridesResolver: (p, s) => s.root })({});
const Lista = styled('ul', { name: 'MuiPagination', slot: 'Ul', overridesResolver: (p, s) => s.ul })({
  display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: 0, margin: 0, listStyle: 'none',
});
const Anterior = () => renderIcon('system-chevron-left');
const Siguiente = () => renderIcon('system-chevron-right');
const CLASE = { previous: 'NeoPagination-previous', next: 'NeoPagination-next' };
const nombreDeMui = (type, page, selected) => (type === 'page' ? `${selected ? '' : 'Go to '}page ${page}` : `Go to ${type} page`);

export const NeoPagination = React.forwardRef(function NeoPagination(inProps, ref) {
  const { 'aria-label': ariaLabel = 'Paginador', boundaryCount = 1, className, classes, color, count = 1, defaultPage,
    disabled, getItemAriaLabel = nombreDeMui, hideNextButton, hidePrevButton, onChange, page, renderItem = (item) => h(PaginationItem, item),
    shape, showFirstButton, showLastButton, siblingCount, size, variant, ...rest } = useThemeProps({ props: inProps, name: 'MuiPagination' });
  const angosto = useMediaQuery('(max-width: 575px)');
  const { items } = usePagination({ boundaryCount, count, defaultPage, disabled, hideNextButton, hidePrevButton, onChange, page,
    showFirstButton, showLastButton, siblingCount: siblingCount ?? (angosto ? 0 : 1), componentName: 'Pagination' });
  if (count <= 1) return null;
  return h(Raiz, { ref, 'aria-label': ariaLabel, className: [paginationClasses.root, 'pagination', classes?.root, className].filter(Boolean).join(' '), ...rest },
    h(Lista, { className: [paginationClasses.ul, 'pagination__list', classes?.ul].filter(Boolean).join(' ') },
      items.map((item) => h('li', { key: item.type === 'page' ? `p${item.page}` : item.type },
        renderItem({
          ...item, 'aria-current': item.selected ? 'page' : undefined,
          'aria-label': getItemAriaLabel(item.type, item.page, item.selected),
          className: CLASE[item.type], slots: { previous: Anterior, next: Siguiente },
          color, shape, size, variant,
        })))));
});
