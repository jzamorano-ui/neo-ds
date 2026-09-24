// packages/mui/theme/components.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import React from 'react';
import { Fade, easing } from '@mui/material';
import { alertIconMapping } from './alert-icons.mjs';
import { CheckboxCheckedIcon, CheckboxIndeterminateIcon } from './checkbox-icons.mjs';
import { SelectChevronIcon } from './select-icon.mjs';
import { ChipCloseIcon } from './chip-icon.mjs';
import { iconSize } from '@neo-design/foundations/tokens/iconSize.mjs';

const SNACKBAR_DESPLAZA = 'translateY(16px)';
const conTransform = (t) => (t ? `${t}, ${t.replace(/opacity/g, 'transform')}` : t);
const movimientoReducido = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const _h = React.createElement;

const FILL = {
  primary:   { d: '--fill--primary--default', h: '--fill--primary--hover', a: '--fill--primary--active', on: '--text--base--contrast' },
  secondary: { d: '--fill--secondary--default', h: '--fill--secondary--hover', a: '--fill--secondary--active', on: '--text--base--default' },
};

const withIcon = (textRole) => {
  const iconRole = `var(${textRole.replace('--text--', '--icon--')})`;
  return {
    color: `var(${textRole})`,
    '& .icon, & .MuiCircularProgress-root': { color: iconRole },
  };
};

const statusAlert = (i, theme) => ({
  backgroundColor: `var(--fill--semantic--${i}--soft)`, color: 'var(--text--base--default)',
  border: `var(--neo-stroke-xs) solid var(--border--semantic--${i === 'error' ? 'error-soft' : i})`, borderRadius: 'var(--neo-radius-sm)',
  paddingInline: 'var(--neo-space-lg-rem)', paddingBlock: 'var(--neo-space-md-rem)', gap: 0,
  '& .MuiAlert-icon': { color: `var(--icon--semantic--${i})`, width: 'var(--neo-icon-size-md-rem)', height: 'var(--neo-icon-size-md-rem)', flexShrink: 0, padding: 0, paddingTop: 'var(--neo-space-xs-rem)', marginRight: 'var(--neo-space-sm-rem)' },
  '& .MuiAlertTitle-root': { ...theme.typography.titleXsBold, color: `var(--text--semantic--${i})`, marginTop: 0, marginBottom: 0 },
  '& .MuiAlert-message': { ...theme.typography.bodyMdRegular, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--neo-space-xs-rem)', flex: '1 1 auto', minWidth: 0 },
  '& .MuiAlert-message .NeoAlert-text': { display: 'flex', flexDirection: 'column', gap: 'var(--neo-space-xs-rem)', paddingBlock: 'var(--neo-space-xs-rem)' },
  '& .MuiAlert-action': { color: 'var(--icon--base--default)', paddingTop: 0, paddingLeft: 'var(--neo-space-xs-rem)', marginRight: 0, '& .MuiIconButton-root': { backgroundColor: 'var(--fill--tertiary--default)' } },
});

const focusRing = {
  outline: 'var(--neo-stroke-focus-ring-width) solid var(--focus--ring--default)',
  outlineOffset: '2px',
  boxShadow: '0 0 0 var(--neo-stroke-focus-ring-width) var(--focus--gap--default)',
};

const focusRingField = {
  boxShadow: '0 0 0 var(--neo-stroke-focus-ring-width) var(--focus--gap--default),'
    + ' 0 0 0 calc(var(--neo-stroke-focus-ring-width) * 2) var(--focus--ring--default)',
};
const focusRingInset = {
  boxShadow: 'inset 0 0 0 var(--neo-stroke-focus-ring-width) var(--focus--ring--default),'
    + ' inset 0 0 0 calc(var(--neo-stroke-focus-ring-width) * 2) var(--focus--gap--default)',
  borderRadius: 'calc(var(--neo-radius-sm) - var(--neo-stroke-xs))',
};

const focusRingInverse = {
  '&[data-surface="inverse"]': {
    outline: 'var(--neo-stroke-focus-ring-width) solid var(--focus--ring--inverse)',
    boxShadow: '0 0 0 var(--neo-stroke-focus-ring-width) var(--focus--gap--inverse)',
  },
};

export const components = {
  MuiContainer: {
    defaultProps: { maxWidth: false },
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: 'var(--neo-space-md-rem)',
        [theme.breakpoints.up('md')]: { paddingInline: 'var(--neo-space-lg-rem)' },
        [theme.breakpoints.up('xl')]: {
          maxWidth: 'var(--neo-container-content)',
          paddingInline: 0,
        },
        [theme.breakpoints.up('xxl')]: { maxWidth: 'var(--neo-container-wide)' },
        '&.neo-wide': {
          [theme.breakpoints.up('xl')]: { maxWidth: 'var(--neo-container-wide)' },
        },
      }),
    },
  },

  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
        subtitle1: 'h6', subtitle2: 'h6', body1: 'p', body2: 'p', inherit: 'p',
        button: 'span', caption: 'span', overline: 'span',
        displayXlBold: 'h1',
        headlineLgBold: 'h2', headlineMdBold: 'h3', headlineSmBold: 'h4',
        titleLgBold: 'h5', titleLgMedium: 'h5',
        titleMdBold: 'h6', titleMdMedium: 'h6',
        titleSmBold: 'h6', titleSmMedium: 'h6',
        titleXsBold: 'p',
        bodyXlBold: 'p', bodyXlMedium: 'p', bodyXlRegular: 'p',
        bodyLgBold: 'p', bodyLgMedium: 'p', bodyLgRegular: 'p',
        bodyMdBold: 'p', bodyMdMedium: 'p', bodyMdRegular: 'p',
        captionSmMedium: 'span', captionSmRegular: 'span',
      },
    },
  },

  MuiButtonBase: {
    defaultProps: { disableRipple: true },
  },
  MuiButton: {
    defaultProps: { disableElevation: true, variant: 'contained', disableFocusRipple: true },
    styleOverrides: {
      root: ({ theme }) => {
        const size = (S, h, padX, padY, typo, iconNode) => ({
          [`&.MuiButton-size${S}`]: { minHeight: `var(--neo-button-height-${h}-rem)`, paddingInline: `var(--neo-space-${padX}-rem)`, paddingBlock: `var(--neo-space-${padY}-rem)`, ...theme.typography[typo],
            '& .MuiButton-startIcon > *, & .MuiButton-endIcon > *': { width: `var(--neo-icon-size-${iconNode}-rem)`, height: `var(--neo-icon-size-${iconNode}-rem)` } },
        });
        const loading = (colors) => ({ '&&[aria-busy="true"]': colors });
        const ghostInverse = { ...withIcon('--text--base--contrast'), ...loading(withIcon('--text--base--contrast')), '&:hover': { backgroundColor: 'var(--fill--tertiary--inverse--hover)' }, '&:active': { backgroundColor: 'var(--fill--tertiary--inverse--active)' } };
        const ghost = { ...withIcon('--text--base--default'), ...loading(withIcon('--text--base--default')), '&:hover': { backgroundColor: 'var(--fill--tertiary--hover)' }, '&:active': { backgroundColor: 'var(--fill--tertiary--active)' } };
        const contained = (f) => ({ backgroundColor: `var(${f.d})`, ...withIcon(f.on), ...loading({ backgroundColor: `var(${f.d})`, ...withIcon(f.on) }), '&:hover': { backgroundColor: `var(${f.h})` }, '&:active': { backgroundColor: `var(${f.a})` } });
        return {
          gap: 'var(--neo-space-sm-rem)', borderRadius: 'var(--neo-radius-pill)', textTransform: 'none',
          whiteSpace: 'nowrap',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': { marginLeft: 0, marginRight: 0 },
          ...theme.typography.bodyLgMedium,
          ...size('Small', 'sm', 'md', 'xs', 'bodyMdMedium', 'xs'), ...size('Medium', 'md', 'lg', 'sm', 'bodyLgMedium', 'sm'), ...size('Large', 'lg', 'xl', 'sm', 'titleSmMedium', 'md'),
          '&.Mui-focusVisible': { ...focusRing, ...focusRingInverse },
          '&&.Mui-disabled:not([aria-busy="true"])': { backgroundColor: 'var(--fill--base--disabled)', ...withIcon('--text--base--disabled') },
          '&&[aria-busy="true"]': { pointerEvents: 'none' },
          variants: [
            { props: { variant: 'text' }, style: { '&[data-surface="inverse"]': ghostInverse } },
            { props: { variant: 'outlined' }, style: { '&[data-surface="inverse"]': ghostInverse } },
            { props: { variant: 'contained' }, style: { '&[data-surface="inverse"]': { backgroundColor: 'var(--fill--primary--inverse--default)', ...withIcon('--text--base--default'), '&:hover': { backgroundColor: 'var(--fill--primary--inverse--hover)' }, '&:active': { backgroundColor: 'var(--fill--primary--inverse--active)' } } } },
            { props: { variant: 'contained', color: 'secondary' }, style: { '&[data-surface="inverse"]': { backgroundColor: 'var(--fill--secondary--inverse--default)', ...withIcon('--text--base--contrast'),   boxShadow: 'inset 0 0 0 var(--neo-stroke-xs) var(--border--base--contrast)', '&:hover': { backgroundColor: 'var(--fill--secondary--inverse--hover)' }, '&:active': { backgroundColor: 'var(--fill--secondary--inverse--active)' } } } },
            { props: { variant: 'contained', color: 'primary' }, style: contained(FILL.primary) },
            { props: { variant: 'contained', color: 'secondary' }, style: contained(FILL.secondary) },
            { props: { variant: 'text', color: 'primary' }, style: ghost },
            { props: { variant: 'text', color: 'secondary' }, style: ghost },
            { props: { variant: 'outlined', color: 'primary' }, style: ghost },
            { props: { variant: 'outlined', color: 'secondary' }, style: ghost },
            ...['primary', 'secondary', 'tertiary'].map((v) => ({
              props: { color: 'brand' },
              style: {
                [`&[data-variant="${v}"]`]: {
                  '&.MuiButton-sizeLarge': theme.typography.titleMdBold,
                  backgroundColor: `var(--fill--brand--${v}--default)`,
                  ...withIcon(v === 'primary' ? '--text--base--contrast' : '--text--base--brand-strong'),
                  '&:hover': { backgroundColor: `var(--fill--brand--${v}--hover)` },
                  '&:active': { backgroundColor: `var(--fill--brand--${v}--active)` },
                },
              },
            })),
          ],
        };
      },
    },
  },

  MuiIconButton: {
    defaultProps: { disableFocusRipple: true },
    styleOverrides: {
      root: {
        color: 'var(--icon--base--default)',
        borderRadius: 'var(--neo-radius-pill)',
        '&.Mui-focusVisible': { ...focusRing, ...focusRingInverse },
        '&.Mui-disabled': { color: 'var(--icon--base--disabled)' },

        '&[data-variant]': {
          padding: 0,
          '&.MuiIconButton-sizeSmall': { width: 'var(--neo-button-height-sm-rem)', height: 'var(--neo-button-height-sm-rem)',
            '& .icon, & svg': { width: 'var(--neo-icon-size-xs-rem)', height: 'var(--neo-icon-size-xs-rem)' } },
          '&.MuiIconButton-sizeMedium': { width: 'var(--neo-button-height-md-rem)', height: 'var(--neo-button-height-md-rem)',
            '& .icon, & svg': { width: 'var(--neo-icon-size-sm-rem)', height: 'var(--neo-icon-size-sm-rem)' } },
          '&.MuiIconButton-sizeLarge': { width: 'var(--neo-button-height-lg-rem)', height: 'var(--neo-button-height-lg-rem)',
            '& .icon, & svg': { width: 'var(--neo-icon-size-md-rem)', height: 'var(--neo-icon-size-md-rem)' } },
          ...Object.fromEntries(Object.keys(iconSize).map((t) => [`&[class*="MuiIconButton-size"] svg.icon--${t}`,
            { width: `var(--neo-icon-size-${t}-rem)`, height: `var(--neo-icon-size-${t}-rem)` }])),
    '& .icon, & svg': { fill: 'currentColor', color: 'inherit', flex: 'none' },
        },
        ...Object.fromEntries([['primary', '--icon--base--contrast'], ['secondary', '--icon--base--default'], ['tertiary', '--icon--base--default']]
          .map(([v, glyph]) => [`&[data-variant="${v}"]`, {
            backgroundColor: `var(--fill--${v}--default)`, color: `var(${glyph})`,
            '&:hover': { backgroundColor: `var(--fill--${v}--hover)` },
            '&:active': { backgroundColor: `var(--fill--${v}--active)` },
          }])),
        ...Object.fromEntries([['primary', '--icon--base--default'], ['secondary', '--icon--base--contrast'], ['tertiary', '--icon--base--contrast']]
          .map(([v, glyph]) => [`&[data-variant="${v}"][data-surface="inverse"]`, {
            backgroundColor: `var(--fill--${v}--inverse--default)`, color: `var(${glyph})`,
            '&:hover': { backgroundColor: `var(--fill--${v}--inverse--hover)` },
            '&:active': { backgroundColor: `var(--fill--${v}--inverse--active)` },
            ...(v === 'secondary' ? { border: 'var(--neo-stroke-xs) solid var(--border--base--contrast)' } : {}),
          }])),
        '&[data-variant].Mui-disabled': {
          backgroundColor: 'var(--fill--base--disabled)', color: 'var(--icon--base--disabled)', border: 'none',
        },
        variants: [
      ...[['primary', '--icon--base--contrast'], ['secondary', '--icon--base--brand-strong'], ['tertiary', '--icon--base--brand-strong']]
        .map(([v, glyph]) => ({
          props: { color: 'brand' },
          style: {
            [`&[data-variant="${v}"]`]: {
              backgroundColor: `var(--fill--brand--${v}--default)`, color: `var(${glyph})`,
              '&:hover': { backgroundColor: `var(--fill--brand--${v}--hover)` },
              '&:active': { backgroundColor: `var(--fill--brand--${v}--active)` },
              '&.Mui-disabled': { backgroundColor: 'var(--fill--base--disabled)', color: 'var(--icon--base--disabled)' },
            },
          },
        })),
        ],
      },
    },
  },

  MuiAlert: {
    defaultProps: { iconMapping: alertIconMapping },
    styleOverrides: {
      standardError: ({ theme }) => statusAlert('error', theme), standardWarning: ({ theme }) => statusAlert('warning', theme),
      standardInfo: ({ theme }) => statusAlert('info', theme), standardSuccess: ({ theme }) => statusAlert('success', theme),
      message: {
        '& .NeoAlert-description': {
          display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden',
        },
        '& .alert__link': {
          color: 'var(--text--base--default)',
          fontSize: 'var(--neo-type-body-md-medium-size-rem)',
          fontWeight: 'var(--neo-type-body-md-medium-weight)',
          lineHeight: 'var(--neo-type-body-md-medium-line-height-rem)',
          textDecoration: 'underline',
          textDecorationColor: 'currentColor',
          textUnderlineOffset: '2px',
          textDecorationThickness: '1px',
          textDecorationSkipInk: 'auto',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          alignSelf: 'flex-start',
          minHeight: '24px',
        },
      },
    },
  },

  MuiBackdrop: {
    styleOverrides: {
      root: { backgroundColor: 'var(--surface--base--overlay)' },
      invisible: { backgroundColor: 'transparent' },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        alignItems: 'flex-start',
        '& > .MuiDialogTitle-root, & > .MuiDialogContent-root, & > .MuiDialogActions-root': { alignSelf: 'stretch' },
        backgroundColor: 'var(--surface--base--default)', borderRadius: 'var(--neo-radius-xl)',
        boxShadow: 'none', backgroundImage: 'none',
        '--neo-dialog-gutter': 'var(--neo-space-xl-rem)',
        '--neo-dialog-actions-dir': 'row',
        '--neo-dialog-actions-justify': 'center',
        '--neo-dialog-actions-align': 'flex-start',
        '--neo-dialog-actions-flex': '1 1 0',
        '--neo-dialog-actions-min': '116px',
        '--neo-dialog-close-gutter': 'var(--neo-space-sm-rem)',
        '--neo-dialog-content-top': 'var(--neo-space-sm-rem)',
        '--neo-dialog-content-bottom': 'var(--neo-space-xl-rem)',
        '&[data-type="default"]': { '--neo-dialog-content-top': 'var(--neo-space-none-rem)' },
        '&.MuiDialog-paperWidthXs': { maxWidth: '343px', maxHeight: '600px', '--neo-dialog-gutter': 'var(--neo-space-lg-rem)', '--neo-dialog-content-bottom': 'var(--neo-space-lg-rem)',
          '--neo-dialog-actions-dir': 'column', '--neo-dialog-actions-justify': 'flex-start',
          '--neo-dialog-actions-align': 'center',
          '--neo-dialog-actions-flex': '0 0 auto',
          '--neo-dialog-actions-width': '100%' },
        '&.MuiDialog-paperWidthSm': { maxWidth: '600px', maxHeight: '700px' },
        '&.MuiDialog-paperWidthMd': { maxWidth: '900px', maxHeight: '740px', '--neo-dialog-close-gutter': 'var(--neo-space-lg-rem)', '--neo-dialog-actions-justify': 'flex-end', '--neo-dialog-actions-flex': '0 0 auto', '--neo-dialog-actions-min': '160px' },
        '&.MuiDialog-paperWidthLg': { maxWidth: '1200px', maxHeight: '840px', '--neo-dialog-gutter': 'var(--neo-space-2xl-rem)', '--neo-dialog-close-gutter': 'var(--neo-space-lg-rem)', '--neo-dialog-actions-justify': 'flex-end', '--neo-dialog-actions-flex': '0 0 auto', '--neo-dialog-actions-min': '160px' },
        position: 'relative',
        '& > .MuiIconButton-root': { position: 'absolute', top: '9px', right: 'var(--neo-space-sm-rem)' },
        '&.MuiDialog-paperFullScreen': { borderRadius: 0 },
        '&.MuiDialog-paperFullScreen .MuiDialogTitle-root': {
          height: '104px', paddingBlock: 'var(--neo-space-xl-rem)', paddingInline: 'var(--neo-space-3xl-rem)',
          justifyContent: 'center', alignItems: 'center',
          borderBottom: 'var(--neo-stroke-xs) solid var(--border--base--secondary)',
          position: 'relative',
          '& > .NeoModalFullscreen-back': { position: 'absolute', left: 'var(--neo-space-3xl-rem)' },
          '& > .NeoModalFullscreen-close': { position: 'absolute', right: 'var(--neo-space-3xl-rem)' },
        },
        '&.MuiDialog-paperFullScreen .MuiDialogContent-root': { paddingInline: 'var(--neo-space-3xl-rem)', paddingTop: 0,
          display: 'grid', gridAutoRows: 'minmax(min-content, 1fr)' },
        '&.MuiDialog-paperFullScreen .MuiDialogActions-root': {
          height: '88px', paddingBlock: 'var(--neo-space-xl-rem)', paddingInline: 'var(--neo-space-3xl-rem)',
          '& .MuiButton-root': { flex: '0 0 auto', width: '240px', minWidth: 0 },
          borderTop: '1px solid transparent',
          '&[data-scroll="top"], &[data-scroll="mid"]': { borderTopColor: 'var(--border--base--secondary)' },
        },
        '&.MuiDialog-paperFullScreen .NeoModalFullscreen-title': { flex: 1, textAlign: 'center' },
        '@media (max-width: 719px)': {
          '&.MuiDialog-paperFullScreen .MuiDialogTitle-root': {
            height: '60px', paddingBlock: 'var(--neo-space-sm-rem)', paddingInline: 'var(--neo-space-sm-rem)',
            borderBottom: 'none',
            justifyContent: 'flex-start', gap: 'var(--neo-space-sm-rem)',
            '& > .NeoModalFullscreen-back, & > .NeoModalFullscreen-close': { position: 'static' },
          },
          '&.MuiDialog-paperFullScreen .MuiDialogContent-root[data-scroll="mid"], &.MuiDialog-paperFullScreen .MuiDialogContent-root[data-scroll="bottom"]':
            { borderTop: 'var(--neo-stroke-xs) solid var(--border--base--secondary)' },
          '&.MuiDialog-paperFullScreen .MuiDialogContent-root[data-scroll="top"], &.MuiDialog-paperFullScreen .MuiDialogContent-root[data-scroll="mid"]':
            { borderBottom: 'var(--neo-stroke-xs) solid var(--border--base--secondary)' },
          '&.MuiDialog-paperFullScreen .MuiDialogContent-root': {
            paddingInline: 'var(--neo-space-lg-rem)', paddingBottom: 'var(--neo-space-lg-rem)',
          },
          '&.MuiDialog-paperFullScreen .NeoModalFullscreen-title': {
            flex: 1, textAlign: 'center', marginInlineEnd: 0,
          },
          '&.MuiDialog-paperFullScreen .NeoModalFullscreen-title:first-child': { textAlign: 'start' },
          '&.MuiDialog-paperFullScreen .MuiDialogActions-root': {
            borderTop: 'none',
            height: '128px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch',
            '& .MuiButton-root': { flex: '0 0 auto', minWidth: 0, width: '100%' },
            paddingTop: 'var(--neo-space-md-rem)', paddingBottom: 'var(--neo-space-xl-rem)', paddingInline: 'var(--neo-space-lg-rem)',
          },
        },
        '&.MuiDialog-paperFullScreen .MuiDialogTitle-root .MuiIconButton-root': {
          '@media (max-width: 719px)': {
            width: 'var(--neo-button-height-md-rem)', height: 'var(--neo-button-height-md-rem)',
            '& .icon, & svg': { width: 'var(--neo-icon-size-sm-rem)', height: 'var(--neo-icon-size-sm-rem)' },
          },
        },
        ...Object.fromEntries(['info', 'success', 'warning', 'error'].map((i) => [
          `&[data-type="${i}"]`, {
            '& .MuiDialogTitle-root': {
              color: `var(--text--semantic--${i})`, backgroundColor: `var(--fill--semantic--${i}--soft)`,
              '& .NeoModalDialog-title': { flex: 'none' },
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 'var(--neo-space-md-rem)',
              paddingTop: 'var(--neo-space-2xl-rem)', paddingBottom: 'var(--neo-space-xl-rem)',
              paddingInline: 'var(--neo-dialog-gutter, var(--neo-space-xl-rem))',
              borderBottomLeftRadius: '50% 14px', borderBottomRightRadius: '50% 14px',
            },
            '& .MuiDialogContent-root': { textAlign: 'center' },
            '& .MuiDialogTitle-root .MuiSvgIcon-root, & .MuiDialogTitle-root .icon': { width: 'var(--neo-icon-size-3xl-rem)', height: 'var(--neo-icon-size-3xl-rem)', flex: 'none' },
          },
        ])),
        '&[data-type="brand"]': {
          '& .MuiDialogTitle-root': {
            color: 'var(--text--base--brand)',
            '& .NeoModalDialog-title': { flex: 'none' },
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 'var(--neo-space-md-rem)',
            paddingTop: 'var(--neo-space-2xl-rem)', paddingBottom: 'var(--neo-space-md-rem)',
            paddingInline: 'var(--neo-dialog-gutter, var(--neo-space-xl-rem))',
          },
          '& .MuiDialogContent-root': { textAlign: 'center' },
          '& .MuiDialogTitle-root .MuiSvgIcon-root, & .MuiDialogTitle-root .icon': { width: 'var(--neo-icon-size-4xl-rem)', height: 'var(--neo-icon-size-4xl-rem)', flex: 'none' },
        },
      }),
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.titleSmBold, color: 'var(--text--base--default)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 'var(--neo-space-md-rem)',
        '& .NeoModalDialog-title': {
          flex: 1,
          minWidth: 0, display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden',
        },
        paddingBlock: 'var(--neo-space-lg-rem)', paddingLeft: 'var(--neo-dialog-gutter, var(--neo-space-xl-rem))',
        paddingRight: 'var(--neo-dialog-close-gutter, var(--neo-space-sm-rem))',
      }),
    },
  },
  MuiDialogContentText: {
    styleOverrides: {
      root: { color: 'var(--text--base--default)' },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.bodyLgRegular, color: 'var(--text--base--default)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--neo-space-lg-rem)',
        '& > *': { alignSelf: 'stretch' },
        paddingTop: 'var(--neo-dialog-content-top, var(--neo-space-sm-rem))', paddingInline: 'var(--neo-dialog-gutter, var(--neo-space-xl-rem))',
        paddingBottom: 'var(--neo-dialog-content-bottom, var(--neo-space-xl-rem))',
        '&:focus-visible': { outline: 'none', boxShadow: focusRingInset.boxShadow },
      }),
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        gap: 'var(--neo-space-md-rem)', paddingTop: 'var(--neo-space-lg-rem)',
        paddingInline: 'var(--neo-dialog-gutter, var(--neo-space-xl-rem))', paddingBottom: 'var(--neo-space-xl-rem)',
        flexDirection: 'var(--neo-dialog-actions-dir, row)',
        justifyContent: 'var(--neo-dialog-actions-justify, center)',
        alignItems: 'var(--neo-dialog-actions-align, flex-start)',
        '& > div': { display: 'contents' },
        '& .MuiButton-root': {
          flex: 'var(--neo-dialog-actions-flex, 1 1 0)',
          minWidth: 'var(--neo-dialog-actions-min, 116px)',
          width: 'var(--neo-dialog-actions-width, auto)',
        },
      },
    },
  },

  MuiCheckbox: {
    defaultProps: { disableRipple: true, checkedIcon: _h(CheckboxCheckedIcon), indeterminateIcon: _h(CheckboxIndeterminateIcon) },
    styleOverrides: {
      root: {
        padding: 'var(--neo-space-sm-rem)',
        minHeight: '44px',
        '& .MuiSvgIcon-root': {
          width: 'var(--neo-icon-size-md-rem)', height: 'var(--neo-icon-size-md-rem)', borderRadius: 'var(--neo-radius-xs)',
          border: 'var(--neo-stroke-xs) solid var(--border--base--default)', backgroundColor: 'var(--fill--base--default)', color: 'transparent', boxSizing: 'border-box',
        },
        '&:hover .MuiSvgIcon-root': { borderColor: 'var(--border--base--focus)' },
        '&.Mui-checked .MuiSvgIcon-root, &.MuiCheckbox-indeterminate .MuiSvgIcon-root': {   backgroundColor: 'var(--icon--base--default)', borderColor: 'var(--icon--base--default)', color: 'var(--text--base--contrast)' },
        '&.Mui-focusVisible .MuiSvgIcon-root': focusRing,
        '&.Mui-disabled .MuiSvgIcon-root': { backgroundColor: 'var(--fill--base--disabled)', borderColor: 'var(--border--base--disabled)' },
        '&.Mui-disabled.Mui-checked .MuiSvgIcon-root, &.Mui-disabled.MuiCheckbox-indeterminate .MuiSvgIcon-root': {   backgroundColor: 'var(--icon--base--disabled)', borderColor: 'var(--icon--base--disabled)', color: 'var(--text--base--contrast)' },
      },
    },
  },

  MuiRadio: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: {
        position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--neo-space-sm-rem)',
        minHeight: '44px',
        '& svg': { display: 'none' },
        '&::before': { content: '""', boxSizing: 'border-box', width: 'var(--neo-icon-size-md-rem)', height: 'var(--neo-icon-size-md-rem)', borderRadius: 'var(--neo-radius-pill)', border: 'var(--neo-stroke-xs) solid var(--border--base--default)', backgroundColor: 'var(--fill--base--default)' },
        '&::after': { content: '""', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'var(--neo-radio-dot)', height: 'var(--neo-radio-dot)', borderRadius: 'var(--neo-radius-pill)', backgroundColor: 'var(--fill--base--default)', opacity: 0 },
        '&:hover::before': { borderColor: 'var(--border--base--focus)' },
        '&.Mui-checked::before': {   backgroundColor: 'var(--icon--base--default)', borderColor: 'var(--icon--base--default)' },
        '&.Mui-checked::after': { opacity: 1 },
        '&.Mui-focusVisible::before': focusRing,
        '&.Mui-disabled::before': { backgroundColor: 'var(--fill--base--disabled)', borderColor: 'var(--border--base--disabled)' },
        '&.Mui-disabled.Mui-checked::before': {   backgroundColor: 'var(--icon--base--disabled)', borderColor: 'var(--icon--base--disabled)' },
      },
    },
  },

  MuiSwitch: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: {
        width: 'var(--neo-switch-width-rem)', height: 'var(--neo-switch-height-rem)', padding: 0,
        display: 'inline-flex', alignItems: 'center',
        overflow: 'visible',
        '.neo-toggle-field &': { marginLeft: 'var(--neo-space-lg-rem)' },
      },
      switchBase: {
        padding: 'var(--neo-space-xs-rem)', top: '50%', transform: 'translateY(-50%)',
        '&.Mui-checked': { transform: 'translateX(var(--neo-switch-thumb-travel-rem)) translateY(-50%)' },
        '&.Mui-checked + .MuiSwitch-track': { backgroundColor: 'var(--fill--semantic--success--solid)', opacity: 1 },
        '&.Mui-disabled + .MuiSwitch-track': { backgroundColor: 'var(--fill--base--disabled)', opacity: 1, border: 'var(--neo-stroke-xs) solid var(--border--base--disabled)' },
        '&.Mui-disabled .MuiSwitch-thumb': { backgroundColor: 'var(--fill--base--medium)' },
        '&.Mui-focusVisible + .MuiSwitch-track': focusRing,
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      },
      thumb: { width: 'var(--neo-icon-size-xs-rem)', height: 'var(--neo-icon-size-xs-rem)', borderRadius: 'var(--neo-radius-pill)', backgroundColor: 'var(--fill--base--default)', boxShadow: 'none' },
      track: { width: 'var(--neo-switch-width-rem)', height: 'var(--neo-switch-track-height-rem)', borderRadius: 'var(--neo-radius-pill)', backgroundColor: 'var(--fill--base--strong)', opacity: 1, '@media (prefers-reduced-motion: reduce)': { transition: 'none' } },
    },
  },

  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        marginLeft: 0, marginRight: 0, gap: 0,
        '&.neo-label-hidden .MuiFormControlLabel-label': { border: 0, clip: 'rect(0 0 0 0)', height: '1px', margin: '-1px', overflow: 'hidden', padding: 0, position: 'absolute', whiteSpace: 'nowrap', width: '1px' },
      },
      label: { margin: 0 },
    },
  },

  MuiFormGroup: {
    styleOverrides: {
      root: { gap: 'var(--neo-space-xs-rem)' },
    },
  },


  MuiChip: {
    defaultProps: { deleteIcon: _h(ChipCloseIcon) },
    styleOverrides: {
      root: ({ theme }) => {
        const label = { '& .MuiChip-label': { padding: 0 } };
        const icons = (c) => ({
          '& .MuiChip-icon, & .MuiChip-deleteIcon': {
            color: `var(--icon--base--${c})`, fill: `var(--icon--base--${c})`,
            margin: 0, width: 'var(--neo-icon-size-xs-rem)', height: 'var(--neo-icon-size-xs-rem)',
          },
        });
        const interactive = {
          ...label,
          ...theme.typography.bodyMdMedium, height: '32px', boxSizing: 'border-box', borderRadius: 'var(--neo-radius-pill)', gap: 'var(--neo-space-xs-rem)',
          paddingInline: 'var(--neo-space-md-rem)', paddingBlock: 'var(--neo-space-sm-rem)',
          backgroundColor: 'var(--fill--base--default)', border: 'var(--neo-stroke-xs) solid var(--border--base--default)', color: 'var(--text--base--default)',
          ...icons('default'),
          '&.Mui-focusVisible': { backgroundColor: 'var(--fill--base--default)' },
          '&:has(input[type="radio"])': {
            cursor: 'pointer', position: 'relative',
            '& input[type="radio"]': { border: 0, clip: 'rect(0 0 0 0)', height: '1px', margin: '-1px', overflow: 'hidden', padding: 0, position: 'absolute', whiteSpace: 'nowrap', width: '1px' },
          },
        };
        const interactiveStates = {
          '&.Mui-focusVisible': focusRing,
          '&:has(input:focus-visible)': focusRing,
          '&.Mui-disabled': { opacity: 1, backgroundColor: 'var(--fill--base--disabled)', borderColor: 'var(--border--base--disabled)', color: 'var(--text--base--disabled)', ...icons('disabled') },
        };
        const lavado = {
          backgroundColor: 'var(--fill--primary--hover)',   borderColor: 'var(--fill--primary--hover)',
          color: 'var(--text--base--contrast)', ...icons('contrast'),
        };
        const hoverWash = { '&.MuiChip-clickable:hover': lavado };
        const radioHover = { '&:has(input[type="radio"]):not(.Mui-disabled):not([data-selected="true"])': { '&:hover': lavado } };
        const selected = { backgroundColor: 'var(--fill--primary--active)',   borderColor: 'var(--fill--primary--active)', color: 'var(--text--base--contrast)', ...icons('contrast'), '&:hover': { backgroundColor: 'var(--fill--primary--active)', borderColor: 'var(--fill--primary--active)' } };
        const statusColor = (c) => ({ border: `var(--neo-stroke-xs) solid var(--border--semantic--${c === 'error' ? 'error-soft' : c})`, backgroundColor: `var(--fill--semantic--${c}--soft)`, color: `var(--text--semantic--${c})` });
        return {
          variants: [
            { props: { variant: 'filled' }, style: interactive },
            { props: { variant: 'outlined' }, style: interactive },
            { props: { variant: 'filled', clickable: true }, style: hoverWash },
            { props: { variant: 'outlined', clickable: true }, style: hoverWash },
            { props: { variant: 'filled' }, style: radioHover },
            { props: { variant: 'outlined' }, style: radioHover },
            { props: { variant: 'filled' }, style: { '&[data-selected="true"]': selected } },
            { props: { variant: 'outlined' }, style: { '&[data-selected="true"]': selected } },
            { props: { variant: 'filled' }, style: interactiveStates },
            { props: { variant: 'outlined' }, style: interactiveStates },
            { props: { variant: 'tag' }, style: {
              ...theme.typography.bodyMdMedium, height: 'auto', borderRadius: 'var(--neo-radius-xs)',
              paddingInline: 'var(--neo-space-sm-rem)', paddingBlock: 'var(--neo-space-xs-rem)', gap: 'var(--neo-space-xs-rem)',
              ...label,
              '& .MuiChip-label': { padding: 0, display: 'flex', alignItems: 'center', gap: 'var(--neo-space-xs-rem)' },
              backgroundColor: 'var(--fill--base--light)', border: 'var(--neo-stroke-xs) solid var(--border--base--default)', color: 'var(--text--base--secondary)',
              '& .MuiChip-icon, & .MuiChip-label .icon': { margin: 0, width: 'var(--neo-icon-size-sm-rem)', height: 'var(--neo-icon-size-sm-rem)', flexShrink: 0 },
              ...withIcon('--text--base--secondary'),
              '&[data-tone="solid"]': {
                backgroundColor: 'var(--fill--base--inverse)', borderColor: 'var(--fill--base--inverse)',
                ...withIcon('--text--base--contrast'),
              },
            } },
            { props: { variant: 'status' }, style: {
              ...theme.typography.bodyMdMedium, height: 'auto', borderRadius: 'var(--neo-radius-pill)',
              paddingInline: 'var(--neo-space-md-rem)', paddingBlock: 'var(--neo-space-xs-rem)', border: 'var(--neo-stroke-xs) solid var(--border--base--secondary)',
              backgroundColor: 'var(--fill--base--light)', color: 'var(--text--base--default)', ...label,
            } },
            { props: { variant: 'status', color: 'success' }, style: statusColor('success') },
            { props: { variant: 'status', color: 'error' }, style: statusColor('error') },
            { props: { variant: 'status', color: 'info' }, style: statusColor('info') },
            { props: { variant: 'status', color: 'warning' }, style: statusColor('warning') },
          ],
        };
      },
    },
  },

  MuiBadge: {
    styleOverrides: {
      root: { justifyContent: 'center', alignItems: 'center' },
      badge: ({ theme }) => ({
        ...theme.typography.captionSmMedium, backgroundColor: 'var(--fill--semantic--error--solid)', color: 'var(--text--base--contrast)',
        minWidth: 'var(--neo-icon-size-sm-rem)', height: 'var(--neo-icon-size-sm-rem)', borderRadius: 'var(--neo-radius-pill)', paddingInline: 'var(--neo-space-xs-rem)',
        top: 'var(--neo-space-xs-rem)', right: 'var(--neo-space-xs-rem)', transform: 'none',
        '&.MuiBadge-invisible': { transform: 'scale(0)' },
      }),
      dot: { minWidth: 'var(--neo-space-sm-rem)', width: 'var(--neo-space-sm-rem)', height: 'var(--neo-space-sm-rem)', padding: 0, borderRadius: 'var(--neo-radius-pill)', backgroundColor: 'var(--fill--semantic--error--solid)' },
    },
  },

  MuiLink: {
    defaultProps: { underline: 'always', color: 'inherit' },
    styleOverrides: {
      root: {
        display: 'inline-flex', alignItems: 'center', gap: 'var(--neo-space-xs-rem)', cursor: 'pointer', position: 'relative',
        borderRadius: 'var(--neo-radius-xs)', textDecoration: 'none', color: 'inherit',
        '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: 'var(--neo-stroke-xs)', background: 'currentColor' },
        '&:focus-visible, &.Mui-focusVisible': { ...focusRing, ...focusRingInverse },
        '&:not([href])': { color: 'var(--text--base--disabled)', pointerEvents: 'none', cursor: 'not-allowed' },
        variants: [
          { props: { underline: 'none' }, style: { '&::after': { display: 'none' } } },
        ],
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: { height: 'var(--neo-stroke-xs)', margin: 0, border: 'none',   backgroundColor: 'var(--border--base--secondary)' },
    },
  },

  MuiTooltip: {
    defaultProps: {
      arrow: true,
      slotProps: { popper: { modifiers: [{ name: 'offset', options: { offset: [0, 4] } }] } },
    },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...theme.typography.bodyMdRegular, backgroundColor: 'var(--fill--semantic--info--solid)', color: 'var(--text--base--contrast)',
        paddingInline: 'var(--neo-space-sm-rem)', paddingBlock: 'var(--neo-space-xs-rem)', borderRadius: 'var(--neo-radius-xs)', maxWidth: '40ch',
        '@media (prefers-reduced-motion: reduce)': { transition: 'none !important' },
      }),
      arrow: {
          color: 'var(--fill--semantic--info--solid)',
        '[data-popper-placement*="top"] &, [data-popper-placement*="bottom"] &': { width: '12px', height: '6px' },
        '&::before': { transform: 'none', width: '100%', height: '100%', margin: 0 },
        '[data-popper-placement*="top"] &::before':    { clipPath: 'polygon(50% 100%, 0 0, 100% 0)' },
        '[data-popper-placement*="bottom"] &::before': { clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' },
        '[data-popper-placement*="left"] &::before':   { clipPath: 'polygon(100% 50%, 0 0, 0 100%)' },
        '[data-popper-placement*="right"] &::before':  { clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' },
      },
      popper: {
        '&[data-popper-placement*="left"] .MuiTooltip-arrow, &[data-popper-placement*="right"] .MuiTooltip-arrow': {
          width: '6px', height: '12px',
        },
        '&[data-popper-placement*="top"] .MuiTooltip-arrow':    { marginBottom: '-6px' },
        '&[data-popper-placement*="bottom"] .MuiTooltip-arrow': { marginTop: '-6px' },
        '&[data-popper-placement*="left"] .MuiTooltip-arrow':   { marginRight: '-6px' },
        '&[data-popper-placement*="right"] .MuiTooltip-arrow':  { marginLeft: '-6px' },
      },
    },
  },

  MuiSnackbar: {
    defaultProps: {
      autoHideDuration: 5000,
      TransitionComponent: Fade,
      transitionDuration: { enter: 250, exit: 200 },
      TransitionProps: {
        easing: { enter: easing.easeOut, exit: easing.easeIn },
        onEnter: (node) => {
          if (movimientoReducido()) return;
          const t = node.style.transition;
          node.style.transition = 'none';
          node.style.transform = SNACKBAR_DESPLAZA;
          node.getBoundingClientRect();
          node.style.transition = conTransform(t);
        },
        onEntering: (node) => { if (!movimientoReducido()) node.style.transform = 'none'; },
        onExit: (node) => {
          if (movimientoReducido()) return;
          node.style.transition = conTransform(node.style.transition);
          node.style.transform = SNACKBAR_DESPLAZA;
        },
      },
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    },
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.up('sm')]: { right: 'var(--neo-space-2xl-rem)', bottom: 'var(--neo-space-2xl-rem)' },
        [theme.breakpoints.down('sm')]: { left: 'var(--neo-space-lg-rem)', right: 'var(--neo-space-lg-rem)', bottom: 'var(--neo-space-2xl-rem)' },
      }),
    },
  },
  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'var(--fill--base--inverse)',
        color: 'var(--text--base--contrast)',
        borderRadius: 'var(--neo-radius-lg)',
        paddingBlock: 'var(--neo-space-md-rem)',
        paddingInline: 'var(--neo-space-lg-rem)',
        gap: 'var(--neo-space-sm-rem)',
        flexWrap: 'nowrap',
        boxShadow: 'none',
        [theme.breakpoints.up('sm')]: { minWidth: 0 },
        [theme.breakpoints.down('sm')]: {
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gridTemplateRows: 'minmax(var(--neo-icon-size-lg-rem), auto)',
        },
      }),
      message: ({ theme }) => ({
        padding: 0,
        flex: 'none',
        minWidth: 0,
        minHeight: 'var(--neo-icon-size-lg-rem)',
        display: 'flex',
        alignItems: 'center',
        fontSize: 'var(--neo-type-body-lg-bold-size-rem)',
        fontWeight: 'var(--neo-type-body-lg-bold-weight)',
        lineHeight: 'var(--neo-type-body-lg-bold-line-height-rem)',
        '& .NeoSnackbar-message': { display: 'flex', alignItems: 'center', gap: 'var(--neo-space-sm-rem)' },
        '& .NeoSnackbar-icon': { display: 'inline-flex', flexShrink: 0, width: 'var(--neo-icon-size-md-rem)', height: 'var(--neo-icon-size-md-rem)' },
        [theme.breakpoints.down('sm')]: {
          gridColumn: 1,
          gridRow: 1,
          alignSelf: 'start',
          alignItems: 'flex-start',
          minHeight: 0,
          paddingTop: 'var(--neo-space-xs-rem)',
          '& .NeoSnackbar-message': { alignItems: 'flex-start' },
          '& .NeoSnackbar-text': { flex: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' },
        },
        '& .NeoSnackbar-text': { minWidth: 0 },
      }),
      action: ({ theme }) => ({
        paddingLeft: 0,
        marginLeft: 0,
        marginRight: 0,
        gap: 'var(--neo-space-sm-rem)',
        color: 'var(--text--base--contrast)',
        '& > .NeoSnackbar-action': { display: 'inline-flex', alignItems: 'center', paddingLeft: 'var(--neo-space-sm-rem)' },
        [theme.breakpoints.down('sm')]: {
          display: 'contents',
          '& > .NeoSnackbar-action': { gridColumn: '1 / -1', gridRow: 2, justifySelf: 'end' },
          '& > .NeoSnackbar-close': { gridColumn: 2, gridRow: 1, alignSelf: 'start' },
        },
      }),
    },
  },

  MuiCircularProgress: {
    defaultProps: { 'aria-hidden': true },
    styleOverrides: {
      root: {
        color: 'var(--icon--base--default)', width: 'var(--neo-icon-size-md-rem) !important', height: 'var(--neo-icon-size-md-rem) !important', flexShrink: 0,
        '& .MuiCircularProgress-circle': { strokeWidth: 3.6667 },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none', '& .MuiCircularProgress-circle': { animation: 'none' } },
        variants: [
          { props: { size: 'sm' }, style: { width: 'var(--neo-icon-size-sm-rem) !important', height: 'var(--neo-icon-size-sm-rem) !important', '& .MuiCircularProgress-circle': { strokeWidth: 4.4 } } },
          { props: { size: 'lg' }, style: { width: 'var(--neo-icon-size-lg-rem) !important', height: 'var(--neo-icon-size-lg-rem) !important', '& .MuiCircularProgress-circle': { strokeWidth: 4.125 } } },
        ],
      },
    },
  },

  MuiTabs: {
    defaultProps: { variant: 'scrollable', scrollButtons: false },
    styleOverrides: {
      root: {
        minHeight: 'auto', position: 'relative', backgroundColor: 'var(--surface--base--default)',
        '&[data-overflow~="end"]': { borderRightColor: 'transparent', borderTopRightRadius: 0 },
        '&[data-overflow~="start"]': { borderLeftColor: 'transparent', borderTopLeftRadius: 0 },
        '&[data-overflow="end"]': { clipPath: 'inset(-100vmax 0 -100vmax -100vmax)' },
        '&[data-overflow="start"]': { clipPath: 'inset(-100vmax -100vmax -100vmax 0)' },
        '&[data-overflow="start end"]': { clipPath: 'inset(-100vmax 0)' },
        alignItems: 'center',
        borderStyle: 'solid', borderWidth: 'var(--neo-stroke-xs)', borderColor: 'var(--border--base--secondary)',
        borderRadius: 'var(--neo-radius-sm) var(--neo-radius-sm) 0 0', boxShadow: 'var(--neo-elevation-md)',
        width: 'fit-content', maxWidth: '100%',
      },
      indicator: { display: 'none' },
    },
  },
  MuiTab: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      iconWrapper: { marginBottom: 0 },
      root: ({ theme }) => ({
        minHeight: 'auto', textTransform: 'none', gap: 'var(--neo-space-sm-rem)', paddingInline: 'var(--neo-space-lg-rem)', paddingBlock: 'var(--neo-space-md-rem)',
        flexDirection: 'row', alignItems: 'center',
        ...theme.typography.bodyLgMedium, color: 'var(--text--base--secondary)',
        backgroundColor: 'var(--fill--tertiary--default)', position: 'relative',
        '&:first-of-type': { borderTopLeftRadius: 'var(--neo-radius-sm)' },
        '&:last-of-type': { borderTopRightRadius: 'var(--neo-radius-sm)' },
        '&::before': { content: '""', position: 'absolute', top: 0, bottom: 0, right: 0, width: 'var(--neo-stroke-xs)',   backgroundColor: 'var(--border--base--secondary)', zIndex: 1 },
        '&:last-of-type::before': { display: 'none' },
        '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: 'var(--neo-stroke-sm)',   backgroundColor: 'var(--border--base--default)' },
        '&:hover': { backgroundColor: 'var(--fill--tertiary--hover)', color: 'var(--text--base--default)' },
        '&.Mui-selected': { backgroundColor: 'var(--fill--tertiary--active)', color: 'var(--text--base--default)', '&::after': {   backgroundColor: 'var(--border--base--focus)' } },
        '&.Mui-focusVisible': { outline: 'var(--neo-stroke-focus-ring-width) solid var(--focus--ring--default)', outlineOffset: 'calc(-1 * var(--neo-stroke-focus-ring-width))', boxShadow: 'inset 0 0 0 calc(var(--neo-stroke-focus-ring-width) * 2) var(--focus--gap--default)',
          isolation: 'isolate', '&::before, &::after': { zIndex: -1 } },
        '&.Mui-disabled': { color: 'var(--text--base--disabled)', '&::after': {   backgroundColor: 'var(--border--base--secondary)' } },
        '& svg': { color: 'var(--icon--base--secondary)', width: 'var(--neo-icon-size-sm-rem)', height: 'var(--neo-icon-size-sm-rem)', margin: 0, flexShrink: 0 },
        '&.Mui-selected svg': { color: 'var(--icon--base--default)' },
        '&.Mui-disabled svg': { color: 'var(--icon--base--disabled)' },
      }),
    },
  },

  MuiFormControl: {
    styleOverrides: {
      root: ({ theme }) => ({
        display: 'flex', flexDirection: 'column', gap: 'var(--neo-space-xs-rem)',
        '& .field__label-row, & .select__label-row, & .combobox__label-row': { display: 'flex', alignItems: 'center', gap: 'var(--neo-space-xs-rem)' },
        '& .field__footer': { display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 'var(--neo-space-sm-rem)' },
        '& .field__footer .MuiFormHelperText-root': { margin: 0, flex: 1 },
        '& .field__footer .field__counter': { marginLeft: 'auto' },
        '& .field__counter': {
          flexShrink: 0, ...theme.typography.bodyMdRegular, color: 'var(--text--base--secondary)',
        },
        '& .field__icon--tooltip, & .select__icon--tooltip, & .combobox__icon--tooltip': {
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 'var(--neo-icon-size-xs-rem)', height: 'var(--neo-icon-size-xs-rem)',
          padding: 0, border: 'none', background: 'none', cursor: 'pointer',
          color: 'var(--icon--base--secondary)',
          position: 'relative',
          '&::after': {
            content: '""', position: 'absolute',
            inset: 'calc((var(--neo-icon-size-md-rem) - var(--neo-icon-size-xs-rem)) / -2)',
          },
        },
        '& .field__icon--tooltip .icon, & .select__icon--tooltip .icon, & .combobox__icon--tooltip .icon': { width: 'var(--neo-icon-size-xs-rem)', height: 'var(--neo-icon-size-xs-rem)' },
        '&:has(.Mui-disabled) .field__counter': { color: 'var(--text--base--disabled)' },
        '& .NeoSelect-placeholder': { color: 'var(--text--base--secondary)' },
        '&:has(.Mui-disabled) .NeoSelect-placeholder': { color: 'var(--text--base--disabled)' },
        '&:has(.MuiInputBase-readOnly) .NeoSelect-placeholder': { color: 'var(--text--base--default)' },
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.bodyLgMedium, color: 'var(--text--base--default)',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0,
        '&.Mui-focused': { color: 'var(--text--base--default)' },
        '&&.Mui-error': { color: 'var(--text--semantic--error)' },
        '&.Mui-disabled': { color: 'var(--text--base--disabled)' },
        '& .MuiFormLabel-asterisk': { color: 'var(--text--semantic--error)' },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        minHeight: 'var(--neo-input-height)',
        borderRadius: 'var(--neo-radius-sm)', backgroundColor: 'var(--fill--base--default)',
        gap: 'var(--neo-space-sm-rem)',
        isolation: 'isolate',
        '& .MuiInputBase-input:not([aria-hidden="true"]), & .MuiInputAdornment-root': { position: 'relative', zIndex: 1 },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--default)', borderWidth: 'var(--neo-stroke-xs)' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--focus)' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--focus)', borderWidth: 'var(--neo-stroke-sm)' },
        '&.Mui-focused:has(.MuiSelect-select[aria-expanded="false"]) .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--border--base--default)', borderWidth: 'var(--neo-stroke-xs)',
        },
        '&.field--focus': focusRingField,
        '&:has(.MuiSelect-select:focus-visible)': focusRingField,
        '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--semantic--error-solid)', borderWidth: 'var(--neo-stroke-sm)' },
        '&.Mui-disabled': {
          backgroundColor: 'var(--fill--base--disabled)',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--disabled)' },
          '& .icon': { color: 'var(--icon--base--disabled)' },
          '& .field__prefix, & .field__suffix': { color: 'var(--text--base--disabled)' },
        },
        '&.MuiInputBase-readOnly': {
          backgroundColor: 'var(--fill--base--medium)',
          borderColor: 'var(--border--base--default)',
          cursor: 'default',
          '& .MuiOutlinedInput-input': { color: 'var(--text--base--default)', cursor: 'default' },
          '& .MuiOutlinedInput-input::placeholder': { color: 'var(--text--base--default)', opacity: 1 },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--default)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--default)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border--base--default)', borderWidth: 'var(--neo-stroke-xs)' },
          '& .MuiSelect-icon': { color: 'var(--icon--base--secondary)' },
          '& .MuiSelect-select': { cursor: 'default' },
        },
        '&.MuiInputBase-adornedStart': { paddingLeft: 'var(--neo-space-md-rem)', '& .MuiOutlinedInput-input': { paddingLeft: 0 } },
        '&.MuiInputBase-adornedEnd': { paddingRight: 'var(--neo-space-md-rem)', '& .MuiOutlinedInput-input': { paddingRight: 0 } },
        '& .MuiInputAdornment-positionStart': { marginRight: 0 },
        '& .MuiInputAdornment-positionEnd': { marginLeft: 0 },
        '&.MuiInputBase-multiline': {
          minHeight: 112, padding: 'var(--neo-space-md-rem)',
          alignItems: 'flex-start',
          '& .MuiInputBase-inputMultiline': { padding: 0 },
        },
      },
      input: ({ theme }) => ({
        ...theme.typography.bodyLgRegular, color: 'var(--text--base--default)', paddingInline: 'var(--neo-space-md-rem)', paddingBlock: 'var(--neo-space-sm-rem)',
        flex: 1,
        '&::placeholder': { color: 'var(--text--base--secondary)', opacity: 1 },
        '&.Mui-disabled': { WebkitTextFillColor: 'var(--text--base--disabled)' },
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.bodyMdRegular, color: 'var(--text--base--secondary)', marginInline: 0,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0,

        '&&.Mui-error': {
          color: 'var(--text--semantic--error)', display: 'flex', alignItems: 'center', gap: 'var(--neo-space-xs-rem)',
          '&::before': {
            content: '""', flex: '0 0 auto', width: 'var(--neo-icon-size-xs-rem)', height: 'var(--neo-icon-size-xs-rem)',   backgroundColor: 'var(--icon--semantic--error)',
            maskImage: `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill-rule='evenodd' d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11 12V8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12ZM12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15Z'/></svg>")}")`,
            WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill-rule='evenodd' d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11 12V8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12ZM12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15Z'/></svg>")}")`,
            maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
          },
        },
        '&.Mui-disabled': { color: 'var(--text--base--disabled)' },
      }),
    },
  },

  MuiMenu: {
    defaultProps: { anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, transformOrigin: { vertical: 'top', horizontal: 'left' } },
    styleOverrides: {
      paper: {
        marginTop: 'var(--neo-space-sm-rem)', minWidth: 'var(--neo-menu-min-width)', backgroundColor: 'var(--surface--base--default)',
        border: 'var(--neo-stroke-xs) solid var(--border--base--secondary)', borderRadius: 'var(--neo-radius-sm)',
        boxShadow: 'var(--neo-elevation-md)', overflowX: 'hidden', overflowY: 'auto',
        '& .MuiMenu-list': { paddingBlock: 0 },
        maxHeight: '260px',
        '@media (prefers-reduced-motion: reduce)': { transition: 'none !important' },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        gap: 'var(--neo-space-md-rem)', minHeight: 'var(--neo-menu-item-min-height)', paddingBlock: 'var(--neo-space-sm-rem)', paddingInline: 'var(--neo-space-lg-rem)',
        ...theme.typography.bodyLgRegular, color: 'var(--text--base--default)', backgroundColor: 'var(--fill--tertiary--default)',
        '& .NeoMenu-label': { minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
        '&:hover': { backgroundColor: 'var(--fill--tertiary--hover)' },
        '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: 'var(--fill--tertiary--active)' },
        '&.Mui-focusVisible': { ...focusRingInset, backgroundColor: 'var(--fill--tertiary--default)' },
        '&.Mui-focusVisible:hover': { backgroundColor: 'var(--fill--tertiary--hover)' },
        '&.Mui-selected.Mui-focusVisible, &.Mui-selected.Mui-focusVisible:hover': { backgroundColor: 'var(--fill--tertiary--active)' },
        '&.Mui-disabled': { opacity: 1, backgroundColor: 'var(--fill--base--disabled)', color: 'var(--text--base--disabled)',
          '& .menu-item__icon': { color: 'var(--icon--base--disabled)', fill: 'var(--icon--base--disabled)' } },
      }),
    },
  },

  MuiSelect: {
    defaultProps: { IconComponent: SelectChevronIcon },
    styleOverrides: {
      select: ({ theme }) => ({ ...theme.typography.bodyLgRegular, color: 'var(--text--base--default)', textAlign: 'left', paddingBlock: 'var(--neo-space-sm-rem)' }),
      icon: {
        width: 'var(--neo-icon-size-md-rem)', height: 'var(--neo-icon-size-md-rem)',
        top: 'calc(50% - (var(--neo-icon-size-md-rem) / 2))', color: 'var(--icon--base--secondary)',
        right: 'var(--neo-space-md-rem)',
        transition: 'transform 150ms ease',
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        '&.Mui-disabled': { color: 'var(--icon--base--disabled)' },
      },
      iconOpen: { transform: 'rotate(180deg)' },
    },
  },

  MuiAutocomplete: {
    defaultProps: { popupIcon: _h(SelectChevronIcon), includeInputInList: true },
    styleOverrides: {
      inputRoot: {
        padding: 0,
        '& .MuiAutocomplete-input': { paddingBlock: 'var(--neo-space-sm-rem)', paddingLeft: 'var(--neo-space-md-rem)', paddingRight: 0 },
        '&.MuiInputBase-adornedStart .MuiAutocomplete-input': { paddingLeft: 0 },
        '.MuiAutocomplete-hasPopupIcon&, .MuiAutocomplete-hasClearIcon&': {
          paddingRight: 'calc(var(--neo-space-md-rem) + var(--neo-icon-size-md-rem) + var(--neo-space-sm-rem))',
        },
        '.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon&': {
          paddingRight: 'calc(var(--neo-space-md-rem) + var(--neo-icon-size-md-rem) + var(--neo-space-sm-rem) + var(--neo-icon-size-lg-rem) + var(--neo-space-sm-rem))',
        },
        '& .MuiAutocomplete-endAdornment': { right: 'var(--neo-space-md-rem)', top: 0, bottom: 0, transform: 'none', display: 'flex', alignItems: 'center', gap: 'var(--neo-space-sm-rem)' },
      },
      paper: {
        backgroundColor: 'var(--surface--base--default)', border: 'var(--neo-stroke-xs) solid var(--border--base--secondary)',
        borderRadius: 'var(--neo-radius-sm)', boxShadow: 'var(--neo-elevation-md)', marginTop: 'var(--neo-space-sm-rem)',
        overflow: 'hidden', maxHeight: '260px',
      },
      listbox: { paddingBlock: 0, maxHeight: '260px',
        '& .MuiAutocomplete-option': {
          backgroundColor: 'var(--fill--tertiary--default)',
          '&:hover': { backgroundColor: 'var(--fill--tertiary--hover)' },
          '&.Mui-focused': { backgroundColor: 'var(--fill--tertiary--hover)' },
          '&.Mui-focusVisible': { backgroundColor: 'var(--fill--tertiary--default)' },
          '&.Mui-focusVisible:hover': { backgroundColor: 'var(--fill--tertiary--hover)' },
          '&[aria-selected="true"]': { backgroundColor: 'var(--fill--tertiary--active)' },
          '&[aria-selected="true"].Mui-focused': { backgroundColor: 'var(--fill--tertiary--active)' },
          '&[aria-selected="true"].Mui-focusVisible': { backgroundColor: 'var(--fill--tertiary--active)' },
        },
      },
      option: ({ theme }) => ({
        gap: 'var(--neo-space-md-rem)', minHeight: 'var(--neo-menu-item-min-height)', paddingBlock: 'var(--neo-space-sm-rem)', paddingInline: 'var(--neo-space-lg-rem)',
        ...theme.typography.bodyLgRegular, color: 'var(--text--base--default)',
        '& .NeoMenu-label': { minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
        '&.Mui-focusVisible': focusRingInset,
        '&.Mui-disabled': { backgroundColor: 'var(--fill--base--disabled)', color: 'var(--text--base--disabled)', opacity: 1 },
        '& .MuiSvgIcon-root': { width: 'var(--neo-icon-size-md-rem)', height: 'var(--neo-icon-size-md-rem)' },
      }),
      clearIndicator: {
        color: 'var(--icon--base--secondary)', padding: 'var(--neo-space-xs-rem)', margin: 0,
        '& svg': { width: 'var(--neo-icon-size-md-rem)', height: 'var(--neo-icon-size-md-rem)' },
        '.Mui-disabled &': { color: 'var(--icon--base--disabled)' },
      },
      popupIndicator: {
        color: 'var(--icon--base--secondary)', padding: 0, margin: 0,
        '& svg': { width: 'var(--neo-icon-size-md-rem)', height: 'var(--neo-icon-size-md-rem)' },
        '.Mui-disabled &': { color: 'var(--icon--base--disabled)' },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      },
    },
  },
};
