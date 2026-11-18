'use client';
// packages/mui/ui/_keyboard-focus.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';

let keyboard = true;
let listening = false;
const listen = () => {
  if (listening || typeof document === 'undefined') return;
  listening = true;
  document.addEventListener('keydown', (e) => { if (!e.metaKey && !e.altKey && !e.ctrlKey) keyboard = true; }, true);
  for (const type of ['pointerdown', 'mousedown', 'touchstart']) document.addEventListener(type, () => { keyboard = false; }, true);
};
const isText = (el) => Boolean(el) && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA');

export function useKeyboardFocus() {
  const [active, setActive] = React.useState(false);
  React.useEffect(listen, []);
  return {
    active,
    onFocus: (e) => { if (isText(e.target)) setActive(keyboard); },
    onBlur: (e) => { if (isText(e.target)) setActive(false); },
    onPointerDown: () => setActive(false),
  };
}
