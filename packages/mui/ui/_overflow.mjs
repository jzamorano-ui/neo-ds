// packages/mui/ui/_overflow.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
export function watchOverflow(root, member) {
  if (!root || typeof window === 'undefined') return () => {};
  const item = member ? root.querySelector(member) : null;
  const recorta = (n) => getComputedStyle(n).overflowX !== 'visible';
  let row = item ? item.parentElement : null;
  while (row && row !== root && !recorta(row)) row = row.parentElement;
  if (!row || !recorta(row)) return () => {};
  const mark = () => {
    const start = row.scrollLeft > 1;
    const end = row.scrollLeft + row.clientWidth < row.scrollWidth - 1;
    const sides = [start && 'start', end && 'end'].filter(Boolean).join(' ');
    if (sides) root.setAttribute('data-overflow', sides);
    else root.removeAttribute('data-overflow');
  };
  mark();
  row.addEventListener('scroll', mark, { passive: true });
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(mark) : null;
  if (ro) { ro.observe(row); if (item.parentElement !== row) ro.observe(item.parentElement); }
  return () => { row.removeEventListener('scroll', mark); if (ro) ro.disconnect(); };
}
