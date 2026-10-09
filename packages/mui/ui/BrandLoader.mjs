'use client';
// packages/mui/ui/BrandLoader.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
const h = React.createElement;

const MAX_MESSAGES = 5;

const isotype = (uid) => h('svg', { className: 'brand-loader__isotype', viewBox: '0 0 100 100', fill: 'none', 'aria-hidden': 'true' },
  h('g', { className: 'brand-loader__base' },
    h('path', { d: 'M61.2162 33.8086L63.4343 31.7485C70.841 24.87 71.2686 13.2494 64.3876 5.84546C57.506 -1.55914 45.8814 -1.98665 38.4748 4.89194C31.0682 11.7705 30.6406 23.391 37.5222 30.7956L49.9775 44.1976L56.471 38.1671L44.0157 24.7651C40.4603 20.9395 40.6811 14.9367 44.5075 11.3831C48.3338 7.82958 54.3387 8.05037 57.8941 11.876C61.4489 15.701 61.2281 21.7038 57.4017 25.2574L55.1835 27.3174L61.2162 33.8086Z' }),
    h('path', { d: 'M65.4132 60.0921L67.474 62.3095C74.3551 69.7135 85.9796 70.141 93.3862 63.2624C100.793 56.3832 101.221 44.7628 94.3401 37.3588C87.459 29.9548 75.8344 29.5273 68.4272 36.4064L55.0205 48.8574L61.0532 55.3486L74.4599 42.8976C78.2869 39.3435 84.2918 39.5643 87.8466 43.3893C91.4014 47.2143 91.1805 53.2171 87.3535 56.7712C83.5272 60.3248 77.5222 60.104 73.9674 56.2789L71.9067 54.0616L65.4132 60.0921Z' }),
    h('path', { d: 'M39.4001 66.1914L37.1819 68.2515C29.7754 75.1301 29.3477 86.7505 36.2287 94.1545C43.1103 101.559 54.7349 101.987 62.1415 95.108C69.5481 88.2294 69.9757 76.6089 63.0941 69.2043L50.6388 55.8023L44.1453 61.8329L56.6007 75.2349C60.156 79.0605 59.9351 85.0633 56.1088 88.6168C52.2825 92.1704 46.2776 91.9496 42.7222 88.124C39.1674 84.299 39.3883 78.2961 43.2146 74.7426L45.4328 72.6826L39.4001 66.1914Z' }),
    h('path', { d: 'M12.2173 40.7111C15.6027 37.8539 20.4199 37.7945 23.8618 40.2746L9.84844 52.145C7.95973 48.3319 8.82216 43.5765 12.2173 40.7111ZM38.4205 43.3797L24.4378 55.1807C21.4219 57.726 17.2676 58.0561 13.963 56.346L34.6325 38.8335L34.2905 38.4347L32.3374 36.1221C31.8473 35.5419 31.3206 35.0126 30.7772 34.5088L30.7163 34.4555L30.7235 34.4621C24.0317 28.3079 13.6252 27.9272 6.49954 33.9411C-1.22586 40.4611 -2.20468 52.0482 4.31712 59.7703C10.8389 67.4923 22.4301 68.4708 30.1555 61.9507L44.1382 50.1498L38.4205 43.3797Z' })),
  h('g', { className: 'brand-loader__fill' },
    h('mask', { id: `${uid}-lobe-top`, style: { maskType: 'alpha' }, maskUnits: 'userSpaceOnUse', x: '32', y: '0', width: '38', height: '45' },
      h('path', { fill: 'black', d: 'M61.2162 33.8086L63.4343 31.7485C70.841 24.87 71.2686 13.2494 64.3876 5.84546C57.506 -1.55914 45.8814 -1.98665 38.4748 4.89194C31.0682 11.7705 30.6406 23.391 37.5222 30.7956L49.9775 44.1976L56.471 38.1671L44.0157 24.7651C40.4603 20.9395 40.6811 14.9367 44.5075 11.3831C48.3338 7.82958 54.3387 8.05037 57.8941 11.876C61.4489 15.701 61.2281 21.7038 57.4017 25.2574L55.1835 27.3174L61.2162 33.8086Z' })),
    h('g', { mask: `url(#${uid}-lobe-top)` },
      h('path', { className: 'brand-loader__load', pathLength: '1', d: 'M53.224 41.182L40.769 27.784C36.756 23.467 35.902 17.088 38.638 11.867C41.375 6.64697 47.106 3.71897 52.939 4.56297C58.773 5.40697 63.44 9.83797 64.585 15.62C65.73 21.402 63.104 27.277 58.032 30.28L56.311 31.299' })),
    h('mask', { id: `${uid}-lobe-right`, style: { maskType: 'alpha' }, maskUnits: 'userSpaceOnUse', x: '55', y: '31', width: '45', height: '38' },
      h('path', { fill: 'black', d: 'M65.4132 60.0921L67.474 62.3095C74.3551 69.7135 85.9796 70.141 93.3862 63.2624C100.793 56.3832 101.221 44.7628 94.3401 37.3588C87.459 29.9548 75.8344 29.5273 68.4272 36.4064L55.0205 48.8574L61.0532 55.3486L74.4599 42.8976C78.2869 39.3435 84.2918 39.5643 87.8466 43.3893C91.4014 47.2143 91.1805 53.2171 87.3535 56.7712C83.5272 60.3248 77.5222 60.104 73.9674 56.2789L71.9067 54.0616L65.4132 60.0921Z' })),
    h('g', { mask: `url(#${uid}-lobe-right)` },
      h('path', { className: 'brand-loader__load', pathLength: '1', d: 'M58.037 52.1029L71.451 39.6449C75.77 35.6339 82.149 34.7829 87.368 37.5209C92.587 40.2599 95.512 45.9919 94.666 51.8259C93.82 57.6589 89.387 62.3239 83.604 63.4659C77.822 64.6089 71.948 61.9799 68.947 56.9069L67.929 55.1859' })),
    h('mask', { id: `${uid}-lobe-bottom`, style: { maskType: 'alpha' }, maskUnits: 'userSpaceOnUse', x: '31', y: '55', width: '37', height: '45' },
      h('path', { fill: 'black', d: 'M39.4001 66.1914L37.1819 68.2515C29.7754 75.1301 29.3477 86.7505 36.2287 94.1545C43.1103 101.559 54.7349 101.987 62.1415 95.108C69.5481 88.2294 69.9757 76.6089 63.0941 69.2043L50.6388 55.8023L44.1453 61.8329L56.6007 75.2349C60.156 79.0605 59.9351 85.0633 56.1088 88.6168C52.2825 92.1704 46.2776 91.9496 42.7222 88.124C39.1674 84.299 39.3883 78.2961 43.2146 74.7426L45.4328 72.6826L39.4001 66.1914Z' })),
    h('g', { mask: `url(#${uid}-lobe-bottom)` },
      h('path', { className: 'brand-loader__load', pathLength: '1', d: 'M47.392 58.818L59.843 72.219C63.855 76.537 64.707 82.916 61.97 88.136C59.232 93.356 53.5 96.282 47.666 95.436C41.833 94.591 37.167 90.158 36.024 84.376C34.881 78.593 37.509 72.718 42.582 69.717L44.303 68.699' })),
    h('mask', { id: `${uid}-lobe-left`, style: { maskType: 'alpha' }, maskUnits: 'userSpaceOnUse', x: '0', y: '29', width: '45', height: '38' },
      h('path', { fill: 'black', d: 'M12.2173 40.7111C15.6027 37.8539 20.4199 37.7945 23.8618 40.2746L9.84844 52.145C7.95973 48.3319 8.82216 43.5765 12.2173 40.7111ZM38.4205 43.3797L24.4378 55.1807C21.4219 57.726 17.2676 58.0561 13.963 56.346L34.6325 38.8335L34.2905 38.4347L32.3374 36.1221C31.8473 35.5419 31.3206 35.0126 30.7772 34.5088L30.7163 34.4555L30.7235 34.4621C24.0317 28.3079 13.6252 27.9272 6.49954 33.9411C-1.22586 40.4611 -2.20468 52.0482 4.31712 59.7703C10.8389 67.4923 22.4301 68.4708 30.1555 61.9507L44.1382 50.1498L38.4205 43.3797Z' })),
    h('g', { mask: `url(#${uid}-lobe-left)` },
      h('path', { className: 'brand-loader__load brand-loader__load--e', pathLength: '1', d: 'M41.279 46.7651L27.297 58.5701C22.959 62.2341 16.828 62.8901 11.813 60.2281C6.79799 57.5651 3.90599 52.1201 4.50899 46.4741C5.11199 40.8281 9.08799 36.1161 14.553 34.5731C20.017 33.0301 25.871 34.9661 29.338 39.4631L23.618 44.3141' }),
      h('mask', { id: `${uid}-inner-edge`, style: { maskType: 'alpha' }, maskUnits: 'userSpaceOnUse', x: '9', y: '38', width: '19', height: '20' },
        h('circle', { cx: '18.3301', cy: '47.9501', r: '9.3003', fill: 'black' })),
      h('g', { mask: `url(#${uid}-inner-edge)` },
        h('path', { className: 'brand-loader__load brand-loader__load--bar', pathLength: '1', d: 'M29.338 39.463L8.927 56.771' })))));

export const NeoBrandLoader = React.forwardRef(function NeoBrandLoader({ messages, className, ...rest }, ref) {
  const warn = (m) => {
    if (process.env.NODE_ENV !== 'production') console.warn(`[Neo] BrandLoader: ${m}`);
  };
  const list = (Array.isArray(messages) ? messages : messages == null ? [] : [messages]).filter((m) => m != null && m !== '');
  if (!list.length) warn('without a message the wait does not say what is being done: pass at least one in `messages`.');
  if (list.length > MAX_MESSAGES) warn('messages: up to 5 — from the sixth on they are not shown, and the wrapper warns.');
  const shown = list.slice(0, MAX_MESSAGES);
  const { style, sx, ...attrs } = rest;
  if (sx !== undefined && process.env.NODE_ENV !== 'production') console.warn('[Neo] BrandLoader: sx does not apply — this component has no MUI base. Use className or style.');
  const uid = `neo-brand-loader-${React.useId().replace(/[^\w-]/g, '')}`;

  return h('div', { className: ['brand-loader-shell', className].filter(Boolean).join(' '), style, ref }, h('div', {
    className: 'brand-loader',
    role: 'status',
    'aria-live': 'polite',
    'aria-busy': 'true',
    ...attrs,
  },
    isotype(uid),
    h('div', { className: ['brand-loader__messages', shown.length > 1 && `brand-loader__messages--${shown.length}`].filter(Boolean).join(' ') },
      ...shown.map((m, i) => h('p', { key: i, className: 'brand-loader__message', 'aria-hidden': i ? 'true' : undefined }, m)))));
});
