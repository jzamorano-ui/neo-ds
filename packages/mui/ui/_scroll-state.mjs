'use client';
// packages/mui/ui/_scroll-state.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';

export function useScrollState(deps = []) {
  const ref = React.useRef(null);
  const [node, setNode] = React.useState(null);
  const setRegion = React.useCallback((n) => { ref.current = n; setNode(n); }, []);
  const [scroll, setScroll] = React.useState('none');
  const [overflows, setOverflows] = React.useState(false);

  const watchScroll = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const extra = el.scrollHeight - el.clientHeight;
    setOverflows(extra > 1);
    if (extra <= 1) return setScroll('none');
    if (el.scrollTop <= 1) return setScroll('top');
    if (el.scrollTop >= extra - 1) return setScroll('bottom');
    setScroll('mid');
  }, []);

  React.useEffect(() => {
    const el = node;
    if (!el) return undefined;
    watchScroll();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(watchScroll);
    ro.observe(el);
    for (const hijo of el.children) ro.observe(hijo);
    return () => ro.disconnect();
  }, [watchScroll, node, ...deps]);

  return { setRegion, watchScroll, scroll, overflows };
}
