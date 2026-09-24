# Neo — Design System

Version **1.0.0-rc.5**. Two packages that go together: `@neo-design/foundations` —the tokens, the icons and the
plain CSS layer, with no React and no MUI— and `@neo-design/mui` —the Material UI theme and the `Neo*`
components—, which depends on the first.

> **Figma is the source of truth.** When in visual doubt, the Figma master rules; every spec links
> to its own.

---

## Install

Both packages are on the public npm registry. From your app:

```sh
npm i @neo-design/foundations@next @neo-design/mui@next
```

That is the whole install: npm reads the peers and brings React, Material UI and Emotion in versions
that work.

> **Already using Material UI?** It has to be in `>=5.18.0 <7`. Do not install `@mui/material`
> unpinned before Neo: npm brings the newest major, which is measured as broken here, and the
> install stops with `ERESOLVE`.

**React 18 or 19 · Material UI `>=5.18.0 <7`.** The measured combinations, and the ones that do not
work, are in [`docs/dev/INTEGRATION.md`](docs/dev/INTEGRATION.md).

## Mount the theme, once

```jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@neo-design/mui';

export default function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

With that, `<Button>`, `<Alert>`, `<Chip>`, `<Dialog>`… come out in the Neo style without touching a
single component — **except 4 of them, and the difference is structural, not cosmetic:**
`TextField` → use `NeoTextField`, `TextField` → use `NeoTextArea`, `Select` → use `NeoSelect`, `Autocomplete` → use `NeoCombobox`. There, MUI draws the label inside the
border and the master wants it above the field, with its help row and its footer; a theme changes
style, not structure. The other `Neo*` components are optional: they compose what a MUI prop cannot
express, and they carry the system's defaults.

**The font is not included.** Install `@fontsource/noto-sans` and import weights 400, 500 and 700,
or the app silently falls back to `system-ui`.

**The icons are a layer of their own**, mounted once — the recipe is in
[`docs/dev/INTEGRATION.md`](docs/dev/INTEGRATION.md).

**`NeoAspectRatio`, `NeoBanner` and `NeoEmptyState` need no stylesheet import.** They have no Material UI
component underneath, so all of their style lives in a sheet — and the theme ships that sheet inside
`CssBaseline`: mount the theme and they are dressed, like every other component. The sheets under
`@neo-design/foundations/css/` stay published for the other path: consuming the system without React.

**Without React:** `packages/foundations/css/` works on its own, in this order: the two token sheets
—`packages/foundations/tokens/neo-color.css` and `neo-foundations.css`— then
`packages/foundations/css/index.css`, and then the sheet of each component you use.
**`index.css` is not optional**: besides importing every component sheet, it carries the box model
(`box-sizing: border-box` scoped to Neo's own classes). Without it a `min-height` applies to the
content and the boxes come out taller than the master: a text field at 62px where the master says 44,
and a menu item at 56 where it says 40. <!-- cifra-ok -->

## What is here

| | |
|---|---|
| `packages/foundations/` | the tokens as CSS variables and as JS, the 167 icons with their sprite and stylesheet, and 24 plain CSS sheets — one per component, plus `css/index.css`, which imports them all and carries the box model |
| `packages/mui/` | the MUI theme that applies all of the above, and the `Neo*` React components |
| `docs/components/` | 24 specs, one per component: anatomy, measurements, tokens per state, ARIA and keyboard |
| `docs/dev/` | [integration](docs/dev/INTEGRATION.md) · [Figma↔MUI props map](docs/dev/COMPONENT-MAP.md) · [which token to use when](docs/dev/TOKENS-GUIDE.md) · [token dictionary](docs/dev/TOKENS-DICTIONARY.md) · [layout and breakpoints](docs/dev/LAYOUT.md) · [composition examples](docs/dev/EXAMPLES.md) |
| `docs/MODEL.md` | the token grammar: role + variant |

A spec and its CSS are the **same** component described twice: the spec says *what*, the CSS shows
*one way* to do it. The values are not approximations — they come from measuring the Figma master
layer by layer.

## Do not edit this repository

Every file is generated and is replaced by the next release. If something does not match the Figma
master or does not behave as documented, it is fixed at the source.
