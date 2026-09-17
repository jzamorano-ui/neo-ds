# `@neo/mui`

**Who it is for:** dev. **Ships**: yes — it is the package installed to build with Neo on top of
Material UI.

Neo's Material UI theme and the React `Neo*` components. It depends on `@neo/foundations`, which
ships the tokens, the icons and the plain CSS layer: both are installed, and each is imported through its
entry point.

| import | what it ships |
|---|---|
| `@neo/mui` | the theme and the `Neo*` components — [`ui/index.mjs`](ui/index.mjs), with its types in [`ui/index.d.ts`](ui/index.d.ts) |
| `@neo/mui/theme` | the theme only — [`theme/index.mjs`](theme/index.mjs), with its types in [`theme/index.d.ts`](theme/index.d.ts) |

```js
import { ThemeProvider } from '@mui/material/styles';
import { theme, NeoButton } from '@neo/mui';
import '@neo/foundations/tokens.css';
import '@neo/foundations/foundations.css';
```

The React, Material UI and Emotion versions it works with are in
[`package.json`](package.json), as `peerDependencies`.

**The `Neo*` wrappers are optional**: an app that already uses MUI is dressed just by mounting the theme.
