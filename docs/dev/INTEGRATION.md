# Integration — the Neo theme in a MUI app

> 10 minutes. At the end: your whole MUI app wears Neo without touching a single component.

## 1 · Install

Neo is two packages that go together: `@neo/foundations` (tokens, icons, plain CSS layer — no React,
no MUI) and `@neo/mui` (the theme and the components, which depends on the first). They are not on a
registry: you pack them from this repository.

```sh
# in the clone of this repository
npm pack ./packages/foundations ./packages/mui --pack-destination .
```

```sh
# in your app — this is the whole install: npm reads the peers and brings
# React, Material UI and Emotion in versions that work
npm i <path-to-the-clone>/neo-foundations-<version>.tgz <path-to-the-clone>/neo-mui-<version>.tgz
```

> **Install the tarballs, not the folders.** `npm i <folder>` makes a symlink, and Node then resolves
> `react` from the linked folder instead of from your app: it installs, and the first `Neo*` you
> import fails with `Cannot find package 'react'`. The tarball is a real copy and has no such problem.

> **Already using Material UI?** It has to be in `>=5.18.0 <7`. Do not install `@mui/material`
> unpinned before the tarballs: npm brings the newest major —measured as broken in the table
> below— and the install stops with `ERESOLVE`.

**Versions that work**, measured by installing the tarballs in an empty project and rendering the
components:

| React | MUI | resultado |
|---|---|---|
| 18.3.1 | 5.18.0 | all 22 render — it is the combination the suite runs with |
| 19.2.8 | 5.18.0 | all 22 render |
| 19.2.8 | 6.5.0 | all 22 render |
| 19.2.8 | 7.3.11 | **NO** — the theme's locale entry does not resolve and the material does not bundle |
| 19.2.8 | 9.4.0 | **NO** — `NeoCombobox` does not mount and `inputProps` leaks into the DOM |

The peer is `>=5.18.0 <7`.

Everything is imported through its entry point; no internal path of a package is written by hand:

| import | what it ships |
|---|---|
| `@neo/mui` | the theme and the 23 components, as `Neo*` |
| `@neo/mui/theme` | the theme only |
| `@neo/foundations/tokens.css` · `/foundations.css` | the CSS variables |
| `@neo/foundations/icons.css` · `/sprite` | the icon layer: the classes, and the sprite as a string |
| `@neo/foundations/icons.json` | the 167 ids, grouped by family |
| `@neo/foundations/css/<component>.css` | a single plain stylesheet, if consumed without React |

### The theme dresses every component, with no extra imports

Three components — `NeoAspectRatio`, `NeoBanner` and `NeoEmptyState` — have no Material UI component
underneath: they are compositions of their own. Their rules still reach you through the theme, which
declares them globally under `CssBaseline`. **Mount the theme and they are dressed**, like every other
component. No stylesheet import is needed with React.

The sheets under `@neo/foundations/css/` stay published for the other path: consuming the system
without React. They are the same decisions, in plain CSS.

### Font: Noto Sans (mandatory)

The theme asks for `Noto Sans` and does not include it. Without it the app falls back to `system-ui`.
Three weights: **400** · **500** · **700**.

```sh
npm i @fontsource/noto-sans
```

```jsx
// next to where the theme is mounted (main.tsx / _app.tsx)
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/500.css';
import '@fontsource/noto-sans/700.css';
```

### Without React

`@neo/foundations/css/` works on its own, with no React and no theme. The sheets style components,
not the document, so the font is declared once on the root:

```css
html { font-family: "Noto Sans", system-ui, sans-serif; }
```

## 2 · Mount the theme (once)

```jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@neo/mui';

export default function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />   {/* required: injects the CSS variables and the typographic base */}
      {children}
    </ThemeProvider>
  );
}
```

With that, `<Button>`, `<Alert>`, `<TextField>`, `<Dialog>`… come out in the Neo style.

### Next.js App Router

The theme is a non-serializable object: it goes behind a client boundary, and Neo's components go
inside that boundary.

```jsx
// app/providers.tsx
'use client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@neo/mui';

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

```jsx
// app/layout.tsx  — stays a Server Component
import { Providers } from './providers';
export default function Layout({ children }) {
  return <html><body><Providers>{children}</Providers></body></html>;
}
```

## 3 · The icons (the classes come with the theme; the sprite is mounted once)

The 167 icons are a layer of their own. **The classes — `.icon` and its sizes — reach you through the
theme**, like every other rule: mount it and they are there, with no stylesheet to import. What still
has to be mounted is the **sprite**, which is **injected** into the document rather than referenced as
a file: a `<use>` pointing at an external file is blocked by CORS.

```jsx
import { sprite } from '@neo/foundations/sprite';
```

```jsx
// as high up the tree as possible
<div hidden dangerouslySetInnerHTML={{ __html: sprite }} />
```

The sprite ships as a string, so this works in any bundler and in Node — there is nothing to
configure.

```jsx
<svg className="icon"><use href="#system-add" /></svg>
```

**The ids are in `@neo/foundations/icons.json`** — 167, grouped by family. The id is
`<family>-<name>`: the file lists `"mail"` under `system`, and the markup uses `#system-mail`. An id
that does not exist breaks nothing and draws nothing: check the list before writing one. Some old ids
keep an alias —`#system-correo` is now `#system-mail`—; inside a `Neo*` the old one still draws and
warns once in the console, and the new one is the one to write.

| familia | color |
|---|---|
| `system` | uses `currentColor` — inherited from the context, or set with the `.icon` class |
| `semantic` | already carries its color bound to its token |
| `brand` | its own multicolor. Only its **size** can be changed |

**Without React** there is no theme to carry the classes: import `@neo/foundations/icons.css`
yourself, with both token sheets loaded before it.

## 4 · Check that it came out right

| Chequeo | Esperado |
|---|---|
| `:root` in DevTools | variables `--fill--primary--default`, `--neo-space-md`, … present |
| Typography | `Noto Sans` across the whole tree |
| `<Button variant="contained">` | navy `#1F3644` (not MUI's blue) |
| `<Alert severity="error">` | pink background `#FEF2F2`, crimson icon |
| Keyboard focus (Tab) | blue ring with a halo (gap) |
| A `system` icon with `.icon` | takes the context's color and the token's size |

## Forms

The label is static and on top, not floating as MUI ships it by default: compose
`FormControl + FormLabel + OutlinedInput` with `notched={false}`, wiring `htmlFor`/`id` and
`aria-describedby` to the helper. The full example, with the error case, is in
[EXAMPLES.md](./EXAMPLES.md).

For the rest of the components, MUI is used directly: [COMPONENT-MAP.md](./COMPONENT-MAP.md).

## What 1.0.0 does not cover

| not covered | |
|---|---|
| **Screen-reader announcements** | not measured |
| **RTL** | no master is drawn RTL |

Covered and measured: keyboard operation and focus order, `axe` on every harness, and reduced motion.

## Notas

- **ESM**: the package is ES modules (`type: module`). In Jest use `transformIgnorePatterns`, or Vitest.
- **TypeScript**: the types load on their own (augmentations included: `color="brand"` on Button, Typography variants, the `xxl` breakpoint).
- **No dark mode**: a single mode.
- The **visual source of truth is Figma**: each component spec links its master.
