'use client';
// packages/mui/ui/_select-value.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
const h = React.createElement;

export const selectValueProps = ({ placeholder, renderValue, children, value, defaultValue }) => ({
  displayEmpty: !!placeholder,
  ...(value === undefined && defaultValue === undefined ? { defaultValue: '' } : {}),
  renderValue: placeholder
    ? (val) => {
      if (val === '' || val == null) return h('span', { className: 'NeoSelect-placeholder' }, placeholder);
      if (renderValue) return renderValue(val);
      const selectedOption = React.Children.toArray(children)
        .find((c) => React.isValidElement(c) && c.props.value === val);
      return selectedOption ? selectedOption.props.children : val;
    }
    : renderValue,
});
