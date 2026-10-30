'use client';
// packages/mui/ui/_archivo.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { NeoButtonIcon } from './ButtonIcon.mjs';
import { NeoSpinner } from './Spinner.mjs';
import { renderIcon } from './_icon.mjs';

const h = React.createElement;

const decimal = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 1 });
export const formatFileSize = (size) => {
  if (typeof size !== 'number' || !Number.isFinite(size)) return size;
  if (size < 1024) return `${decimal.format(size)} B`;
  if (size < 1024 * 1024) return `${decimal.format(size / 1024)} KB`;
  return `${decimal.format(size / (1024 * 1024))} MB`;
};

export const FileBox = React.forwardRef(function FileBox({
  className, id, placeholder, fileName, fileSize, loading = false, loadingText, removeLabel, onRemove,
  readOnly, disabled, onChange, onFocus, onBlur, 'aria-describedby': describedBy,
  value, defaultValue, rows, type, autoComplete, onAnimationStart, ownerState,
  ...input
}, ref) {
  const nodeRef = React.useRef(null);
  const setRef = React.useCallback((node) => {
    nodeRef.current = node;
    if (typeof ref === 'function') ref(node); else if (ref) ref.current = node;
  }, [ref]);
  const [own, setOwn] = React.useState(null);
  const [drag, setDrag] = React.useState(false);

  const name = fileName !== undefined ? fileName : own?.name;
  const size = fileSize !== undefined ? fileSize : own?.size;
  const blocked = Boolean(readOnly || loading || disabled);
  const nameId = name && id ? `${id}-name` : undefined;
  const hasSize = size != null && size !== '';

  const take = (e) => {
    const f = e.target.files?.[0];
    setOwn(f ? { name: f.name, size: f.size } : null);
    onChange?.(e);
  };
  const remove = () => {
    if (nodeRef.current) nodeRef.current.value = '';
    setOwn(null);
    onRemove?.();
    nodeRef.current?.focus();
  };
  const drop = (e) => {
    setDrag(false);
    if (blocked) { e.preventDefault(); return; }
    const files = e.dataTransfer?.files;
    if (files && files.length > 1 && typeof DataTransfer !== 'undefined' && nodeRef.current) {
      e.preventDefault();
      const one = new DataTransfer();
      one.items.add(files[0]);
      nodeRef.current.files = one.files;
      nodeRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  const shown = loading
    ? [h('span', { key: 'l', className: 'NeoInputFile-loadingText', role: 'status' }, loadingText ?? 'Cargando archivo'),
      h(NeoSpinner, { key: 's', size: 'small', className: 'NeoInputFile-spinner' })]
    : name
      ? [h('span', { key: 'n', id: nameId, className: 'NeoInputFile-fileName' }, name),
        (hasSize || !readOnly) ? h('span', { key: 'e', className: 'NeoInputFile-fileEnd' },
          hasSize ? h('span', { className: 'NeoInputFile-fileSize' }, formatFileSize(size)) : null,
          readOnly ? null : h(NeoButtonIcon, {
            variant: 'tertiary', size: 'small', className: 'NeoInputFile-remove', disabled,
            'aria-label': removeLabel ?? `Quitar ${name}`, onClick: remove,
          }, renderIcon('system-trash', 'icon--sm'))) : null]
      : [h('span', { key: 'p', className: 'NeoInputFile-placeholder' }, placeholder ?? 'Selecciona un archivo')];

  return h('span', { className: [className, 'NeoInputFile-value'].filter(Boolean).join(' '), 'data-drag': drag ? '' : undefined, 'data-loading': loading ? '' : undefined },
    renderIcon('system-paperclip', 'field__icon'),
    h('input', {
      ...input,
      ref: setRef, id, type: 'file', className: 'NeoInputFile-nativeInput', disabled,
      'aria-describedby': [nameId, describedBy].filter(Boolean).join(' ') || undefined,
      'aria-busy': loading ? 'true' : undefined,
      'aria-disabled': readOnly && !disabled ? 'true' : undefined,
      title: name || '',
      onChange: take, onFocus, onBlur,
      onClick: (e) => { if (blocked) e.preventDefault(); input.onClick?.(e); },
      onDragEnter: () => { if (!blocked) setDrag(true); },
      onDragLeave: () => setDrag(false),
      onDragOver: (e) => { if (blocked) e.preventDefault(); },
      onDrop: drop,
    }),
    ...shown);
});
