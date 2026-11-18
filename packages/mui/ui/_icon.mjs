'use client';
// packages/mui/ui/_icon.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { ALIASES as ICON_ALIASES } from '@neo-design/foundations/icon-aliases.mjs';

const warned = new Set();
const check = (id) => {
  if (process.env.NODE_ENV === 'production') return;
  if (typeof document === 'undefined' || warned.has(id)) return;
  queueMicrotask(() => {
    if (warned.has(id) || document.getElementById(id)) return;
    warned.add(id);
    const hasSprite = !!document.querySelector('symbol[id], svg > defs symbol');
    console.warn(hasSprite
      ? `[Neo] icon: '#${id}' is not in the sprite. The ids are in @neo-design/foundations/icons.json — an id is <family>-<name>, e.g. #system-mail.`
      : `[Neo] icon: '#${id}' does not draw and the sprite is not in the document. Inject it once, as high in the tree as possible — see section 3, "The icons", of the integration guide: docs/dev/INTEGRATION.md at github.com/jzamorano-ui/neo-ds.`);
  });
};

const warnedAliases = new Set();
const translate = (id) => {
  const newName = ICON_ALIASES[id];
  if (!newName || newName === id) return id;
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedAliases.has(id)) {
      warnedAliases.add(id);
      console.warn(`[Neo] icon: '#${id}' is now called '#${newName}', since the move to English. It keeps drawing throughout 1.x and is removed in 2.0.0.`);
    }
  }
  return newName;
};

export const renderIcon = (x, extraClass) => {
  if (typeof x === 'string' && x) {
    const id = translate(x.startsWith('#') ? x.slice(1) : x);
    check(id);
    return React.createElement('svg', { className: extraClass ? `icon ${extraClass}` : 'icon', 'aria-hidden': 'true' },
      React.createElement('use', { href: `#${id}` }));
  }
  return extraClass && React.isValidElement(x)
    ? React.cloneElement(x, { className: [x.props.className, extraClass].filter(Boolean).join(' ') })
    : x;
};
