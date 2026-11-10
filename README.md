# Neo — Design System

Version **1.4.0**. Two packages that go together: `@neo-design/foundations` —the tokens, the icons and the
plain CSS layer, with no React and no MUI— and `@neo-design/mui` —the Material UI theme and the `Neo*`
components—, which depends on the first.

| | |
|---|---|
| **[Figma · Neo Design System](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/)** | the masters: what each component is and how it looks. **It is the source of truth**: when in visual doubt, the master rules, and every spec links to its own |
| **[Storybook](https://jzamorano-ui.github.io/neo-storybook/)** | every component running, story by story, plus the foundations and the icon catalog, with each icon's id on hover. Labels in Spanish |
| **[Integration guide](docs/dev/INTEGRATION.md)** | install, mount, Next.js, icons, and what to check once it is mounted |
| **[`llms.txt`](llms.txt)** | what an AI agent needs to build with Neo |

---

## Install

Both packages are on the public npm registry, and the font goes in the same command. From your app:

```sh
npm i @neo-design/foundations @neo-design/mui @fontsource/noto-sans
```

npm reads the peers and brings React, Material UI and Emotion in versions that work. **The font is not
bundled**: without `@fontsource/noto-sans` the app silently falls back to `system-ui`.

> **Already using Material UI?** It has to be in `>=5.18.0 <7`. Do not install `@mui/material`
> unpinned before Neo: npm brings the newest major, which is measured as broken here, and the
> install stops with `ERESOLVE`.

**React 17, 18 or 19 · Material UI `>=5.18.0 <7`.** The measured combinations, and the ones that do not
work, are in [`docs/dev/INTEGRATION.md`](docs/dev/INTEGRATION.md).

## Mount the theme, once

At the root of the app (`App.jsx`, `main.tsx`, `_app.tsx`), with its four pieces:

```jsx
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/500.css';
import '@fontsource/noto-sans/700.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@neo-design/mui';
import { sprite } from '@neo-design/foundations/sprite';

export default function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />                                              {/* required: the CSS variables and the base type */}
      <div hidden dangerouslySetInnerHTML={{ __html: sprite }} />  {/* the icons, injected once */}
      {children}
    </ThemeProvider>
  );
}
```

None of the four warns when it is missing: without the theme the components come out in MUI's default
blue; without `CssBaseline` they lose their colors, heights and shapes; without the three weights the
text falls back to `system-ui`; without the sprite no icon draws. For Next.js App Router, the same
pieces behind a client boundary are in [`docs/dev/INTEGRATION.md`](docs/dev/INTEGRATION.md).

With that, `<Button>`, `<Alert>`, `<Chip>`, `<Dialog>`… come out in the Neo style without touching a
single component — **except 4 of them, and the difference is structural, not cosmetic:**
`TextField` → use `NeoTextField`, `TextField multiline` → use `NeoTextArea`, `Select` → use `NeoSelect`, `Autocomplete` → use `NeoCombobox`. There, MUI draws the label inside the
border and the master wants it above the field, with its help row and its footer; a theme changes
style, not structure. The other `Neo*` components are optional: they compose what a MUI prop cannot
express, and they carry the system's defaults.

**The icons** are drawn by id against that sprite, as in `<svg className="icon"><use href="#system-add" /></svg>`,
and the ids are in `@neo-design/foundations/icons.json`: the rules are in
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
and a menu item at 56 where it says 40.

## What is here

| | |
|---|---|
| `packages/foundations/` | the tokens as CSS variables and as JS, the 169 icons with their sprite and stylesheet, and 33 plain CSS sheets — one per component, plus `css/index.css`, which imports them all and carries the box model |
| `packages/mui/` | the MUI theme that applies all of the above, and the `Neo*` React components |
| `docs/components/` | 33 specs, one per component: anatomy, measurements, tokens per state, ARIA and keyboard |
| `docs/dev/` | [integration](docs/dev/INTEGRATION.md) · [Figma↔MUI props map](docs/dev/COMPONENT-MAP.md) · [which token to use when](docs/dev/TOKENS-GUIDE.md) · [token dictionary](docs/dev/TOKENS-DICTIONARY.md) · [layout and breakpoints](docs/dev/LAYOUT.md) · [composition examples](docs/dev/EXAMPLES.md) · [versions, deprecation and support](docs/dev/SUPPORT.md) |
| `docs/MODEL.md` | the token grammar: role + variant |

A spec and its CSS are the **same** component described twice: the spec says *what*, the CSS shows
*one way* to do it. The values are not approximations — they come from measuring the Figma master
layer by layer.

## Do not edit this repository

Every file is generated and is replaced by the next release. If something does not match the Figma
master or does not behave as documented, it is fixed at the source.
