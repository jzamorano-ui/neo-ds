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

<!-- screen-criteria:start — the same list as in llms.txt; edits here are overwritten -->
## Building a screen

- **Color is mostly neutral: 80 / 20 / 10.** About 80 % is neutral: the page, panels and cards sit on `surface/base/default` and `surface/base/secondary`. About 20 % is the dark navy, mostly as text, with `surface/base/inverse` kept to a few pieces. About 10 % is the coral brand color, as the accent in the details: brand icons, icon containers, the brand action. Never a large dark or coral panel competing with another strong color.
- **A link is always underlined and takes the color of the text around it.** In navigation and footers too: there is no link without underline. Do not color it: on a dark footer the surrounding text is already light, and the link inherits it.
- **A link that stands alone takes its size and weight from `variant`**: `bodyMdBold` at 14 px, `bodyLgBold` at 16, `titleSmBold` at 18, `captionSmMedium` at 12. Bold, because a link is not told apart by color. Inside a sentence it takes nothing and inherits the paragraph. Do not hang a class with `font-*` on a link: in the usual stylesheet order the theme wins and the class does nothing.
- **Titles take their size and weight from a type style** (`display-*`, `headline-*`, `title-*`). A hand-written `font-size` or `font-weight` is an error, like a hand-written hex: if no style fits, the hierarchy is missing a level, not a size.
- **The info icon that opens help is `semantic-info`, filled** (`semantic-info-inverse` on a dark background), never the outlined `system` one and never recolored: the color and the fill say it can be pressed and opens help.

## Implementing a Figma node

- **When the node does not say it, ask: do not invent it.** The options of a select, what an action does, the error and empty texts: if neither the node nor the brief gives them, write the question down (in `QUESTIONS.md` or in your answer) and leave a visible placeholder. Invented content looks finished and nobody reviews it.
- **Reuse what the project already built.** Before writing a layout piece —a section, a row of actions, a card— look at the screens next to it: if one already exports it, import it. Two copies of the same layout drift apart.
- **From a Figma node to code: one instance, one `Neo*`.** Each instance of a Neo Design System master becomes its `Neo*` component with the properties the instance sets; when the node carries a Code Connect snippet, that snippet is the code: copy it as is. A `…` in the snippet marks what design cannot say —the destination of a link, the handler of an action—: complete it from the task or ask; never leave it empty nor invent it. A property left at its default is not written. Frames become layout with the `--neo-space-*` tokens; sizes and colors of the node are never copied by hand.
<!-- screen-criteria:end -->
