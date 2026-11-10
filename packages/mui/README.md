# `@neo-design/mui`

**Who it is for:** dev. **Ships**: yes — it is the package installed to build with Neo on top of
Material UI.

Neo's Material UI theme and the React `Neo*` components. It depends on `@neo-design/foundations`, which
ships the tokens, the icons and the plain CSS layer: both are installed, and each is imported through its
entry point.

- **[Figma · Neo Design System](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/)**: the masters, the source of truth.
- **[Storybook](https://jzamorano-ui.github.io/neo-storybook/)**: every component running, story by story.
- **[Integration guide](https://github.com/jzamorano-ui/neo-ds/blob/main/docs/dev/INTEGRATION.md)**: install, mount and check.

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

**There is no stylesheet to import with React.** The theme, mounted under `CssBaseline`, injects the CSS variables
(`--surface--*`, `--fill--*`, `--text--*`, `--neo-space-*`…) and the icon classes (`.icon`, `.icon--xs` to `.icon--4xl`,
`.icon--secondary`…), so `style={{ background: 'var(--surface--base--secondary)' }}` and
`<svg className="icon icon--lg">` work with nothing else (measured on a clean Next.js project with only the
four pieces above). The sheets `@neo-design/foundations/tokens.css` and `/foundations.css` (the variables) and
`/icons.css` (the icon classes) are for the other path, an app **without** the theme or without React:
load the two token sheets first, then `icons.css`. They live in `@neo-design/foundations`, not in this package.
There are no `surface--*` or `fill--*` classes: those names are variables, used with `var(--surface--base--default)`.

**The `Neo*` wrappers are optional**, with four exceptions: an app that already uses MUI is dressed by mounting the
theme, except `TextField`, `TextField multiline`, `Select` and `Autocomplete`, where MUI draws the label inside the
border. There you use `NeoTextField`, `NeoTextArea`, `NeoSelect` and `NeoCombobox`.

<!-- screen-criteria:start — the same list as in llms.txt; edits here are overwritten -->
## Building a screen

- **Color is mostly neutral: 80 / 20 / 10.** About 80 % is neutral: the page background is always `surface/base/default` (white), except a full-page state screen (success, error), and `surface/base/secondary` is for a band or a panel. About 20 % is the dark navy, mostly as text. `surface/base/inverse` goes only on the dark footer and on pieces whose component already draws it inverted (a selected state, a banner over a photo): never to give a section or a label contrast. About 10 % is the coral brand color, as the accent in the details. Never a large dark or coral panel competing with another strong color.
- **One thing at a time.** The hero holds at most one brand icon, the title, one sentence, the image and at most one action, with no panel of cards in it. In the rest of the page a brand icon or a tag marks what is different, not every card, item or section: if removing it loses no information, remove it. An icon must name what it sits beside; if none fits, use none. A form sits directly on the page, without a card around it.
- **A page for people shows people.** Choose the image by context: the hero of a page that sells or welcomes carries a photo of real people in an everyday situation; a promotional banner, an illustration of a person or a photo; a network of providers, their real logos; forms, task and state screens, no image. An icon does not replace an image. If you were not given the image, do not draw a substitute: leave a sized, visible slot that says which image goes there, and list it in your answer.
- **A shadow means something floats or reacts.** At rest a card, panel, form or section has no shadow: separate with space, a border or a neutral surface. `--neo-elevation-*` goes on what floats over the page (menu, dialog, sheet) and on the hover of something clickable.
- **`family="brand"` is for a marketing call to action**: hero, landing or campaign, size large. Forms, payments and any functional flow use the system primary, the default family, also inside a landing. One main action per screen.
- **Buttons that go together.** At most three visible actions, at least `--neo-space-md` (12 px) apart, always a way out, and the primary is never destructive. On desktop they sit in a row: the primary first when it starts or advances, last when it confirms an action with real impact. On a phone they stack and fill the width of the container, in the order primary, secondary, tertiary.
- **A link is always underlined and takes the color of the text around it.** In navigation and footers too: there is no link without underline. Do not color it: on a dark footer the surrounding text is already light, and the link inherits it.
- **A link that stands alone takes its size and weight from `variant`**: `bodyMdBold` at 14 px, `bodyLgBold` at 16, `titleSmBold` at 18, `captionSmMedium` at 12. Bold, because a link is not told apart by color. Inside a sentence it takes nothing and inherits the paragraph. Do not hang a class with `font-*` on a link: in the usual stylesheet order the theme wins and the class does nothing.
- **Titles take their size and weight from a type style** (`display-*`, `headline-*`, `title-*`). A hand-written `font-size` or `font-weight` is an error, like a hand-written hex: if no style fits, the hierarchy is missing a level, not a size.
- **The info icon that opens help is `semantic-info`, filled** (`semantic-info-inverse` on a dark background), never the outlined `system` one and never recolored: the color and the fill say it can be pressed and opens help.

## Implementing a Figma node

- **When the node does not say it, ask: do not invent it.** The options of a select, what an action does, the error and empty texts: if neither the node nor the brief gives them, write the question down (in `QUESTIONS.md` or in your answer) and leave a visible placeholder. Invented content looks finished and nobody reviews it.
- **Reuse what the project already built.** Before writing a layout piece —a section, a row of actions, a card— look at the screens next to it: if one already exports it, import it. Two copies of the same layout drift apart.
- **From a Figma node to code: one instance, one `Neo*`.** Each instance of a Neo Design System master becomes its `Neo*` component with the properties the instance sets; when the node carries a Code Connect snippet, that snippet is the code: copy it as is. A `…` in the snippet marks what design cannot say —the destination of a link, the handler of an action—: complete it from the task or ask; never leave it empty nor invent it. A property left at its default is not written. Frames become layout with the `--neo-space-*` tokens; sizes and colors of the node are never copied by hand.
<!-- screen-criteria:end -->
