# `@neo-design/mui`

**Who it is for:** dev. **Ships**: yes — it is the package installed to build with Neo on top of
Material UI.

Neo's Material UI theme and the React `Neo*` components. It depends on `@neo-design/foundations`, which
ships the tokens, the icons and the plain CSS layer: both are installed, and each is imported through its
entry point.

| import | what it ships |
|---|---|
| `@neo-design/mui` | the theme and the `Neo*` components — [`ui/index.mjs`](ui/index.mjs), with its types in [`ui/index.d.ts`](ui/index.d.ts) |
| `@neo-design/mui/theme` | the theme only — [`theme/index.mjs`](theme/index.mjs), with its types in [`theme/index.d.ts`](theme/index.d.ts) |

## Install

Install it together with the font:

```sh
npm i @neo-design/foundations @neo-design/mui @fontsource/noto-sans
```

npm brings React, Material UI and Emotion as peers, in the versions this package supports —the `peerDependencies`
of [`package.json`](package.json)—. **With pnpm**, which does not let your app import a peer it did not install
itself, name them:

```sh
pnpm add @neo-design/foundations @neo-design/mui @fontsource/noto-sans \
  @mui/material@6 @emotion/react @emotion/styled react react-dom
```

## Mount it once

```jsx
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/500.css';
import '@fontsource/noto-sans/700.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@neo-design/mui';
import { sprite } from '@neo-design/foundations/sprite';

export function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />                                              {/* required: the CSS variables and the base type */}
      <div hidden dangerouslySetInnerHTML={{ __html: sprite }} />  {/* the icons, injected once */}
      {children}
    </ThemeProvider>
  );
}
```

Without `CssBaseline` the components lose their colors, heights and shapes, and without the font the app falls back
to the browser's. **The whole guide** —what to check once it is mounted, Next.js, the plain CSS layer and the
component pages— is in [Integration](https://github.com/jzamorano-ui/neo-ds/blob/main/docs/dev/INTEGRATION.md), and what an
AI agent needs to build with Neo, in [`llms.txt`](https://github.com/jzamorano-ui/neo-ds/blob/main/llms.txt).

**The `Neo*` wrappers are optional**, with four exceptions: an app that already uses MUI is dressed by mounting the
theme, except `TextField`, `TextField multiline`, `Select` and `Autocomplete`, where MUI draws the label inside the
border. There you use `NeoTextField`, `NeoTextArea`, `NeoSelect` and `NeoCombobox`.
