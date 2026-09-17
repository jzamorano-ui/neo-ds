# Neo — Design System

Version **1.0.0-rc.3**. Two packages that go together: `@neo/foundations` —the tokens, the icons and the
plain CSS layer, with no React and no MUI— and `@neo/mui` —the Material UI theme and the `Neo*`
components—, which depends on the first.

> **Figma is the source of truth.** When in visual doubt, the Figma master rules; every spec links
> to its own.

---

## Install

Clone this repository and pack the two packages:

```sh
npm pack ./packages/foundations ./packages/mui --pack-destination .
```

Then, from your app:

```sh
npm i <path-to-this-repo>/neo-foundations-1.0.0-rc.3.tgz <path-to-this-repo>/neo-mui-1.0.0-rc.3.tgz
```

That is the whole install: npm reads the peers and brings React, Material UI and Emotion in versions
that work.

> **Install the tarballs, not the folders.** `npm i <folder>` makes a symlink, and Node then resolves
> `react` from the linked folder instead of from your app: it installs, and the first `Neo*` you
> import fails with `Cannot find package 'react'`. The tarball is a real copy and has no such problem.

> **Already using Material UI?** It has to be in `>=5.18.0 <7`. Do not install `@mui/material`
> unpinned before the tarballs: npm brings the newest major, which is measured as broken here, and
> the install stops with `ERESOLVE`.

**React 18 or 19 · Material UI `>=5.18.0 <7`.** The measured combinations, and the ones that do not
work, are in [`docs/dev/INTEGRATION.md`](docs/dev/INTEGRATION.md).

## Mount the theme, once

```jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@neo/mui';

export default function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

With that, `<Button>`, `<Alert>`, `<TextField>`, `<Dialog>`… come out in the Neo style without
touching a single component. The `Neo*` components are imported from `@neo/mui` and using them is
optional: they compose what a MUI prop cannot express.

**The font is not included.** Install `@fontsource/noto-sans` and import weights 400, 500 and 700,
or the app silently falls back to `system-ui`.

**The icons are a layer of their own**, mounted once — the recipe is in
[`docs/dev/INTEGRATION.md`](docs/dev/INTEGRATION.md).

**`NeoBanner` and `NeoEmptyState` need their stylesheet, also with React.** They have no Material UI
component underneath, so the theme has nothing to dress and all of their style lives in a sheet:
import `@neo/foundations/css/banner.css` and `@neo/foundations/css/empty-state.css` where you mount
the theme. Without it they render with no style of their own.

**Without React:** `packages/foundations/css/` works on its own. Load
`packages/foundations/tokens/neo-color.css` and `packages/foundations/tokens/neo-foundations.css`
first, and any sheet in `packages/foundations/css/` works as it is.

## What is here

| | |
|---|---|
| `packages/foundations/` | the tokens as CSS variables and as JS, the 167 icons with their sprite and stylesheet, and 24 plain CSS sheets — one per component |
| `packages/mui/` | the MUI theme that applies all of the above, and the `Neo*` React components |
| `docs/components/` | 23 specs, one per component: anatomy, measurements, tokens per state, ARIA and keyboard |
| `docs/dev/` | [integration](docs/dev/INTEGRATION.md) · [Figma↔MUI props map](docs/dev/COMPONENT-MAP.md) · [which token to use when](docs/dev/TOKENS-GUIDE.md) · [token dictionary](docs/dev/TOKENS-DICTIONARY.md) · [layout and breakpoints](docs/dev/LAYOUT.md) · [composition examples](docs/dev/EXAMPLES.md) |
| `docs/MODEL.md` | the token grammar: role + variant |

A spec and its CSS are the **same** component described twice: the spec says *what*, the CSS shows
*one way* to do it. The values are not approximations — they come from measuring the Figma master
layer by layer.

## Do not edit this repository

Every file is generated and is replaced by the next release. If something does not match the Figma
master or does not behave as documented, it is fixed at the source.
