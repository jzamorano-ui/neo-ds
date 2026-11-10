# Integration — the Neo theme in a MUI app

> 10 minutes. At the end: your whole MUI app wears Neo, and the four form controls whose
> label is part of the structure use their `Neo*` wrapper.

| | |
|---|---|
| **[Figma · Neo Design System](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/)** | the masters: what each component is and how it looks. When in visual doubt, the master rules |
| **[Storybook](https://jzamorano-ui.github.io/neo-storybook/)** | every component running, story by story, plus the foundations and the icon catalog (labels in Spanish) |
| **[`llms.txt`](../../llms.txt)** | what an AI agent needs to build with Neo |

## 1 · Install

Neo is two packages that go together: `@neo-design/foundations` (tokens, icons, plain CSS layer — no React,
no MUI) and `@neo-design/mui` (the theme and the components, which depends on the first). Both are on
the public npm registry, and the font goes in the same command:

```sh
# npm reads the peers and brings React, Material UI and Emotion in versions that work
npm i @neo-design/foundations @neo-design/mui @fontsource/noto-sans
```

> **Final versions go under `latest`**, so the command above installs the newest one. Release candidates of a
> later version, when there are, go under the `next` tag: `npm i @neo-design/foundations@next @neo-design/mui@next @fontsource/noto-sans`.

> **With pnpm**, which does not let your app import a peer it did not install itself, name the peers:
> `pnpm add @neo-design/foundations @neo-design/mui @fontsource/noto-sans @mui/material@6 @emotion/react @emotion/styled react react-dom`.

> **Already using Material UI?** It has to be in `>=5.18.0 <7`. Do not install `@mui/material`
> unpinned before Neo: npm brings the newest major —measured as broken in the table
> below— and the install stops with `ERESOLVE`.

**Versions that work**, measured by installing the tarballs in an empty project and rendering the
components:

| React | MUI | result |
|---|---|---|
| 17.0.0 | 5.18.0 | all 34 render — the lowest React the peer accepts |
| 17.0.2 | 5.18.0 | all 34 render — the last React 17 |
| 17.0.2 | 6.0.0 | all 34 render |
| 17.0.2 | 6.4.12 | all 34 render |
| 17.0.2 | 6.5.0 | all 34 render |
| 18.0.0 | 5.18.0 | all 34 render |
| 18.3.1 | 5.18.0 | all 34 render — it is the combination the suite runs with |
| 19.2.8 | 5.18.0 | all 34 render |
| 19.2.8 | 6.0.0 | all 34 render — the lowest MUI 6 the peer accepts |
| 19.2.8 | 6.4.12 | all 34 render — the last MUI 6.4 |
| 19.2.8 | 6.5.0 | all 34 render |
| 19.3.1 | 6.5.0 | all 34 render — what an empty project installs today |
| 17.0.2 | 5.0.6 | **NO** — the package imports `version` from Material UI, which exports it only from 5.16.7 on |
| 18.3.1 | 5.16.6 | **NO** — the last Material UI without `version`, so the package does not load |
| 19.2.8 | 7.3.11 | **NO** — the theme's locale entry does not resolve and the material does not bundle |
| 19.2.8 | 9.4.0 | **NO** — the theme's locale entry does not resolve, as in 7.3.11; past it, `inputProps` also moved to `slotProps` |

The peer is `>=5.18.0 <7` for Material UI, and `^17 || ^18 || ^19` for React.

> **On React 17**, mount the app with `ReactDOM.render`, or with `ReactDOM.hydrate` over server-rendered
> HTML: `react-dom/client` starts in React 18. React 17 has no `useId`, so the components take their
> automatic ids from Material UI, as its own components do. Those ids are not in the server HTML, and the
> references that point to them, such as a field's label and helper text, a tab's panel or a dialog's
> title, are set after the first effects. None of them points to a missing element.

Everything is imported through its entry point; no internal path of a package is written by hand:

| import | what it ships |
|---|---|
| `@neo-design/mui` | the theme and every component, as `Neo*` |
| `@neo-design/mui/theme` | the theme only |
| `@neo-design/foundations/tokens.css` · `/foundations.css` | the CSS variables |
| `@neo-design/foundations/icons.css` · `/sprite` | the icon layer: the classes, and the sprite as a string |
| `@neo-design/foundations/icons.json` | the 169 ids, grouped by family |
| `@neo-design/foundations/css/<component>.css` | a single plain stylesheet, if consumed without React |

### The theme dresses every component, with no extra imports

Three components — `NeoAspectRatio`, `NeoBanner` and `NeoEmptyState` — have no Material UI component
underneath: they are compositions of their own. Their rules still reach you through the theme, which
declares them globally under `CssBaseline`. **Mount the theme and they are dressed**, like every other
component. No stylesheet import is needed with React.

The sheets under `@neo-design/foundations/css/` stay published for the other path: consuming the system
without React. They are the same decisions, in plain CSS.

### Font: Noto Sans (mandatory)

The theme asks for `Noto Sans` and does not include it: that is why `@fontsource/noto-sans` goes in the
install command. Without it the app falls back to `system-ui`, with no warning. Three weights:
**400** · **500** · **700**, imported where the theme is mounted (§2).

### Without React

`@neo-design/foundations/css/` works on its own, with no React and no theme, **loaded in this order**: the
two token sheets, then `css/index.css`, then the sheet of each component you use.

**`index.css` is not optional.** Besides importing every component sheet, it carries the box model
(`box-sizing: border-box`, scoped to Neo's own classes). Without it a `min-height` applies to the
content and the boxes come out taller than the master: a text field at 62px where the master says 44,
and a menu item at 56 where it says 40.

The sheets style components, not the document, so the font is declared once on the root:

```css
html { font-family: "Noto Sans", system-ui, sans-serif; }
```

## 2 · Mount the theme (once)

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
      <CssBaseline />                                              {/* required: injects the CSS variables and the typographic base */}
      <div hidden dangerouslySetInnerHTML={{ __html: sprite }} />  {/* the icons, injected once (§3) */}
      {children}
    </ThemeProvider>
  );
}
```

| piece | without it, and nothing warns |
|---|---|
| the three `@fontsource` weights | the text falls back to `system-ui` |
| `ThemeProvider` + `theme` | the components come out in MUI's default blue |
| `CssBaseline` | no CSS variables: the components lose their colors, heights and shapes |
| the sprite | no icon draws |

With that, `<Button>`, `<Alert>`, `<Chip>`, `<Dialog>`… come out in the Neo style.

> **Four exceptions, and they are structural.** In `TextField`, `TextField multiline`, `Select` and
> `Autocomplete`, MUI draws the label **inside** the border and the master wants it **above** the field,
> with its help row and its footer. A theme changes style, not structure, so there you use the wrapper:
> `NeoTextField`, `NeoTextArea`, `NeoSelect`, `NeoCombobox`. Using the raw MUI one is not a styling
> detail: the label lands on top of the control and takes the space of a line.

### Next.js App Router

The theme is a non-serializable object: it goes behind a client boundary, with the same four pieces, and
Neo's components go inside that boundary. Besides, the root layout wraps everything in
`AppRouterCacheProvider` from `@mui/material-nextjs`, which is not optional here:

```sh
npm i @mui/material-nextjs @emotion/cache
```

**Without it the page hydrates with an error.** Measured on a clean Next 16.4.3 project (React 19.3.1,
MUI 6.5.0, `@neo-design/*` 1.2.1 from npm): `next build` passes and the page looks right, but the browser
logs `Hydration failed because the server rendered HTML didn't match the client` (React error #418 in
production). The cause is the `<style>` that `CssBaseline` emits, which the server and the client place in
different spots. With the provider the error is gone, in production and in development, and the server
sends all the styles in the first HTML, so there is no flash of unstyled content.

On Next 15 with MUI 5.18 the error does not show up. Measured on a clean Next 15.5.29 project (React
19.2.8, MUI 5.18.0, `@neo-design/*` 1.4.0 packed from the source), in production and in development, the
page hydrates without errors with the provider and also without it. In both cases the button paints
`#1F3644` in Noto Sans, the field is 44 px high and the icon is 32 px. Keep the provider anyway: it is
what MUI documents for the App Router, and with MUI 6.5.0 the error comes back, as measured above.

```jsx
// app/providers.tsx
'use client';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/500.css';
import '@fontsource/noto-sans/700.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@neo-design/mui';
import { sprite } from '@neo-design/foundations/sprite';

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div hidden dangerouslySetInnerHTML={{ __html: sprite }} />
      {children}
    </ThemeProvider>
  );
}
```

```jsx
// app/layout.tsx  — stays a Server Component
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { Providers } from './providers';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

The entry point carries the Next major: `v16-appRouter` for Next 16, `v15-appRouter` for Next 15, and so on
down to `v13-appRouter`. Use a `@mui/material-nextjs` whose `next` peer includes your Next: measured, 9.x
and 7.3.5 onwards accept Next 16, while 6.x and 7.x before 7.3.5 stop at Next 15. It does not peer on
`@mui/material`, and it was measured with MUI 6.5.0 on Next 16 and with MUI 5.18.0 on Next 15 (7.3.10,
`v15-appRouter`). A page component can import `NeoTextField`, `Button`, `Alert`… directly, with no
`'use client'` of its own: the build passed with all three in a Server Component, on both.

## 3 · The icons (the classes come with the theme; the sprite is mounted once)

The 169 icons are a layer of their own. **The classes — `.icon` and its sizes — reach you through the
theme**, like every other rule: mount it and they are there, with no stylesheet to import. What still
has to be mounted is the **sprite**, the hidden `<div>` of §2: it is **injected** into the document
rather than referenced as a file, because a `<use>` pointing at an external file is blocked by CORS. It goes as
high up the tree as possible, once.

The sprite ships as a string, so this works in any bundler and in Node — there is nothing to
configure.

```jsx
<svg className="icon"><use href="#system-add" /></svg>
```

**The ids are in `@neo-design/foundations/icons.json`**, 169 grouped by family, and the
[Storybook catalog](https://jzamorano-ui.github.io/neo-storybook/?path=/story/%C3%ADconos--catalogo) draws them
all, with the id on hover. The id is
`<family>-<name>`: the file lists `"mail"` under `system`, and the markup uses `#system-mail`. An id
that does not exist breaks nothing and draws nothing: check the list before writing one. Some old ids
keep an alias —`#system-correo` is now `#system-mail`—; inside a `Neo*` the old one still draws and
warns once in the console, and the new one is the one to write.

| familia | color |
|---|---|
| `system` | uses `currentColor` — inherited from the context, or set with the `.icon` class |
| `semantic` | already carries its color bound to its token |
| `brand` | its own multicolor. Only its **size** can be changed |

**Without React** there is no theme to carry the classes: import `@neo-design/foundations/icons.css`
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

## What 1.2.0 does not cover

| not covered | |
|---|---|
| **Screen-reader announcements** | not measured |
| **RTL** | no master is drawn RTL |

Covered and measured: keyboard operation and focus order, `axe` on every harness, and reduced motion.

## Notas

- **ESM**: the packages are ES modules (`.mjs`). **Vitest** runs them as they are. **Jest** transforms them with
  Babel (`babel-jest`, `@babel/preset-env`, `@babel/preset-react`), and `transformIgnorePatterns` alone is not enough:
  its default transform skips `.mjs`, and the theme imports Material UI's locale, which is ES modules too. Measured
  with Jest 30.5, React 19.3 and MUI 6.5:

```js
  // jest.config.cjs
  module.exports = {
    transform: { '^.+\\.(m?js|jsx)$': 'babel-jest' },
    transformIgnorePatterns: ['/node_modules/(?!(@neo-design|@mui/material)/)'],
  };
  ```
- **TypeScript**: the types load on their own (augmentations included: `color="brand"` on Button, Typography variants, the `xxl` breakpoint).
- **No dark mode**: a single mode.
- The **visual source of truth is Figma**: each component spec links its master.
