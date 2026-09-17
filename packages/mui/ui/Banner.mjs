'use client';
// packages/mui/ui/Banner.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
const h = React.createElement;

const SIZES = ['small', 'medium', 'large'];

export const NeoBanner = React.forwardRef(function NeoBanner({
  size = 'large', fullPhoto = false,
  title, subtitle, description, icon, media, src, alt, mediaPosition = 'right', actions,
  'aria-label': ariaLabel, className, ...rest
}, ref) {
  const warn = (m) => {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') console.warn(`[Neo] Banner: ${m}`);
  };
  if (!SIZES.includes(size)) warn(`size '${size}' is not in the system: ${SIZES.join(', ')}`);
  if (!description) warn('the description is the only text present in all three sizes — without it the banner says nothing.');

  const auto = React.useId();
  const titleId = title ? `neo-banner-${auto}` : undefined;
  if (!title && !ariaLabel) warn('without a title, an accessible name is required: an unnamed region is not a landmark.');
  if (mediaPosition === 'left' && size !== 'small') warn(`\`mediaPosition="left"\` only applies with size="small" — with "${size}" the image does not go to the side.`);

  const ACTION_SIZE = { small: 'small', medium: 'medium', large: 'large' };
  const styleAction = (node) => {
    if (Array.isArray(node)) return React.Children.map(node, styleAction);
    if (!React.isValidElement(node)) return node;
    if (typeof node.type !== 'string') {
      const extra = { size: ACTION_SIZE[size] || 'large' };
      if (fullPhoto) extra.surface = 'inverse';
      if (node.props.size !== undefined) delete extra.size;
      if (node.props.surface !== undefined) delete extra.surface;
      return React.cloneElement(node, extra);
    }
    return React.cloneElement(node, undefined, React.Children.map(node.props.children, styleAction));
  };
  const styledActions = styleAction(actions);

  return h('div', { className: 'banner-shell', ref }, h('section', {
    className: ['banner', `banner--${size}`, fullPhoto && 'banner--full-photo',
      mediaPosition === 'left' && 'banner--image-left', className]
      .filter(Boolean).join(' '),
    'aria-labelledby': titleId,
    'aria-label': titleId ? undefined : ariaLabel,
    ...rest,
  },
    (src || media) ? h('div', { className: 'banner__media', key: 'm' }, src ? h('img', { src: src, alt: alt ?? '' }) : media) : null,
    h('div', { className: 'banner__content', key: 'c' },
      icon ? h('div', { className: 'banner__icon', 'aria-hidden': 'true', key: 'i' }, icon) : null,
      title ? h('h2', { className: 'banner__title', id: titleId, key: 't' }, title) : null,
      subtitle ? h('p', { className: 'banner__subtitle', key: 's' }, subtitle) : null,
      description ? h('p', { className: 'banner__description', key: 'd' }, description) : null,
      actions ? h('div', { className: 'banner__actions', key: 'a' }, styledActions) : null,
    ),
  ));
});
