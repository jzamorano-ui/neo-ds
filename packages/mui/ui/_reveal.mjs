// packages/mui/ui/_reveal.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
export function reveal(node, member, { inline = 'center', settle = false } = {}) {
  const item = node && node.closest ? node.closest(member) : null;
  let row = item ? item.parentElement : null;
  while (row && !/auto|scroll/.test(getComputedStyle(row).overflowX)) row = row.parentElement;
  if (!row || row.scrollWidth <= row.clientWidth) return;
  if (settle) {
    const a = item.getBoundingClientRect();
    const start = row.getBoundingClientRect().left + row.clientLeft;
    const end = start + row.clientWidth;
    if (a.right > end) row.scrollLeft += a.right - end + 1;
    else if (a.left < start) row.scrollLeft -= start - a.left + 1;
  }
  const quiet = typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  item.scrollIntoView({ inline, block: 'nearest', behavior: quiet ? 'auto' : 'smooth' });
}
