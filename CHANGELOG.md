# CHANGELOG — `@neo-design/foundations` and `@neo-design/mui`

> **This changelog is the DELIVERABLE's, not the one of the repository that produces it.** They are two
> different numbers and they move for different reasons: only what changes for whoever consumes the
> system appears here. The number at the top is compared against the content of
> this tree, so it cannot stay describing something else.
>
> Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · versioning [SemVer](https://semver.org/).
> **What each level means here:**
> **MAJOR** = breaks your code (a token, a class, a prop or an icon you could name is gone).
> **MINOR** = adds without breaking (a new token, component or icon).
> **PATCH** = fixes without changing anything you can name.

---

## Unreleased

> Empty.

---

## 1.0.0 — 2026-10-01

> The first stable version: what `1.0.0-rc.7` delivered, plus a guide for what the screen owns. From here on, renaming or removing anything you can name is a MAJOR version.

**Added — what accessibility belongs to the screen, in `llms.txt`.** Each component is accessible on its own,
and the guide now says what the screen that combines them still owns: focus that follows reading order, one
`h1` and no skipped heading levels, landmarks, a `<title>` per route, moving focus on a client-side route
change, and a live region that exists before its message. It also says what not to do around the three
overlays —`NeoModalDialog`, `NeoModalFullscreen` and `NeoBottomSheet`—: they move focus in when they open,
keep it inside, and return it to what opened them when they close.

**Added — `NeoDrawer`, the side panel for the web.** It enters from the right edge with complementary or extensive
content opened on demand —the detail of a quote, a summary, a cart— while the page behind stays in view. It
measures 540px wide and the whole visible height (`100dvh`); the title always names it, an optional `image` goes on
top of the content, and up to two `actions` stack with the primary on top —or none, for a purely informative
drawer—. The ✕, `Esc` and the scrim close it, and each one calls `onClose`. On mobile the same content belongs in
`NeoBottomSheet`. The plain CSS layer has it as `.drawer`.

**Added — the `notification` master can turn its bubble off.** In Figma it has a `badge` property; in code it is
`invisible` on the MUI `Badge`, which hides the bubble and keeps the button. The component map lists it.

**Changed — install without a tag.** This version goes under `latest`, so `npm i @neo-design/foundations
@neo-design/mui` installs it. Release candidates of later versions go under `next`.

What is delivered, re-measured on this release:

- **26 components** with their `Neo*` wrappers, generated from their contract.
- **The Material UI theme** (v5 and v6), which dresses 36 MUI components.
- **The plain CSS layer**, for those who do not use React: 27 sheets with 913 uses of `var()` and no
  unresolved variable.
- **167 icons** as a sprite module —`import { sprite } from '@neo-design/foundations/sprite'`—, with
  their index.

---

## 1.0.0-rc.7 — 2026-10-01

> The candidate that adds the bottom sheet before the 1.0.0 is cut.

**Added — `NeoBottomSheet`, the bottom sheet for mobile.** It rises from the bottom edge with complementary
content that can wait, or a short task, while the page behind stays visible. Dragging its handle down, pressing
Esc, touching the scrim or the ✕ close it, and each one calls `onClose`. It takes `title` or `image` for its
header —with an image there is no title slot, so name it with `aria-label`, or point `aria-labelledby` at the
heading of your content—, up to two `actions` stacked with the primary on top, and your content as `children`.
Its height grows with the content up to 90% of the visible viewport (`90dvh`), and the content scrolls under a
fixed header and fixed actions. It is mobile only: on desktop the same content belongs in a side drawer. The
plain CSS layer has it as `.bottom-sheet`.

**Fixed — stacked actions put the primary on top when you wrap them in a `<div>`.** `NeoModalDialog` at `xs`
and `NeoModalFullscreen` below 720px stack their two actions with the primary on top, and reverse them in the DOM
so focus visits them in the order they are seen. Passing them inside a `<div>` —the way the examples do— skipped
that reversal: the secondary was drawn on top and focused first. A plain `<div>` wrapper is now treated like a
fragment.

What is delivered, re-measured on this release:

- **25 components** with their `Neo*` wrappers, generated from their contract.
- **The Material UI theme** (v5 and v6), which dresses 36 MUI components.
- **The plain CSS layer**, for those who do not use React: 26 sheets with 884 uses of `var()` and no
  unresolved variable.
- **167 icons** as a sprite module —`import { sprite } from '@neo-design/foundations/sprite'`—, with
  their index.

---

## 1.0.0-rc.6 — 2026-09-26

> The candidate that closes the two independent audits of the 1.0.0: what a 1.0.0 freezes (the types, where
> your props land) and what makes a component behave worse than the MUI one it dresses.

**Fixed — reading a token from `@neo-design/mui` in a React Server Component returned `undefined`.** The
package's entry point declared `'use client'`, which turned everything it re-exports into client references,
data included: `colorVars['fill/primary/default']` came out empty on the server and `cssVar()` broke
`next build`. The directive now lives only in each component module, where it belongs; `color`, `colorVars`,
`cssVar`, `scale` and `theme` can be read on the server from `@neo-design/mui`.

**Fixed — the theme no longer ships its internal comments.** The CSS it injects through `CssBaseline` carried
the prose of the source sheets, about three quarters of that string, and it reached the production bundle
of every app that mounts the theme. Nothing it draws changed.

**Changed — the deprecation warnings now say when the old names go.** The props and icon ids renamed in the
move to English keep working throughout 1.x and are removed in 2.0.0. The previous warning said «in the
next one», which a 1.0.0 cannot promise.

**Fixed — the icon warnings point to what you have installed.** A missing id now points to
`@neo-design/foundations/icons.json`, and a missing sprite to section 3 of the integration guide, instead of
two paths of the repository that produces the package and a count that was out of date.

**Fixed — `NeoButton` with `loading` stays disabled even if you pass `disabled={false}`.** Your `disabled` won
over the one `loading` implies, so the common pattern `loading={saving} disabled={!valid}` let the form be sent
twice from the keyboard. What an active state implies —`disabled` and `aria-busy` while loading— now always
reaches MUI, as `disabled || loading` does in MUI, Mantine and Base UI.

**Fixed — props you pass nested no longer erase what the component guarantees.** A `MenuListProps` of yours
kept only your keys and dropped the menu's role and name; a `PaperProps` or `slotProps.paper` dropped the
dialog's type, which is what colors its header; your own `aria-describedby` on a field replaced the link to its
help or error message. They are merged now: your keys stay, and the component's guarantees are not overwritten.
On a field, your `aria-describedby` is added to the message's.

**Added — `NeoMenu` can be opened by your app.** It takes `open` and `onClose` (controlled), and the panel is
anchored to its trigger; with your own `open`, the trigger says `aria-expanded`. The trigger keeps the `id` you
give it, and the menu is named by its `aria-label`: with both an `aria-label` and the link to the trigger, the
trigger's text took precedence.

**Fixed — `NeoMenu` no longer reads `element.ref` under React 19**, which logged an error on every mount and is
going away: the ref you put on the trigger is read the way each React version passes it.

**Changed — `className`, `style` and `sx` go to the component's root, with its `ref`, as in MUI.** In the fields
(`NeoTextField`, `NeoTextArea`, `NeoSelect`, `NeoCombobox`), in `NeoCheckbox`, `NeoRadioButton` and `NeoToggle`, and
in `NeoRadioGroup` they reached the inner control: `sx={{ mt: 4 }}` moved the box and left its label behind, and a
`maxWidth` narrowed the box but not its label or its help. Everything else —`value`, `name`, `aria-*`, your
handlers— still goes to the control. In `NeoBanner` and `NeoEmptyState` they move to the outer wrapper, where the
`ref` already was: it is the node the layout is measured on, so a `maxWidth` there also picks the right layout. If
your class styled the block itself, target it inside: `.your-class > .banner`.

**Fixed — `sx` on `NeoBanner`, `NeoEmptyState` and `NeoAspectRatio` reached the page as `sx="[object Object]"`.**
They have no MUI base, so nothing resolves `sx`: the types no longer offer it, and passing it warns in development
and suggests `className` or `style`.

**Changed — each component's types inherit the props of the MUI component it dresses, and no longer accept any
prop.** Every `Neo*Props` extends the props of the MUI component that receives the rest —`ButtonProps`,
`OutlinedInputProps`, `AutocompleteProps`…—, or the DOM attributes where there is no MUI base, instead of ending in
`[prop: string]: unknown`. A typo like `<NeoButton labl="…">` or `onclick` no longer compiles, and
`onClick={(e) => …}` does, with `e` typed. The MUI props that a Neo prop already decides are not offered: the
`color` of a button (its `variant` decides it), the `severity` of an alert (its `type`), the `maxWidth` of a dialog
(its `size`), `multiline` on a text field. If your code passed one of them, TypeScript now says so; at runtime
nothing changed.

**Changed — what a component asks for, its types ask for the same way.** The name can be the visible text, an
`aria-label` or an `aria-labelledby` —`<NeoToggle aria-label="Wi-Fi" />` compiles—, and `NeoBadge` asks for a
`label` in its status types and for an `aria-label` and the element it anchors to in its indicators.

**Fixed — the close handlers and the combobox value are typed.** `onClose` in `NeoAlert`, `NeoMenu`, `NeoSnackbar`
and both dialogs has its real signature —`NeoSnackbar` adds the `'closeButton'` reason; in the dialogs the reason
does not come when the ✕ closes them—, and a handler typed with MUI's own type fits. `NeoCombobox` is generic like
`Autocomplete`: with `options={['a', 'b']}`, `onChange` gives you a `string | null`. `NeoSelect` is generic in its
value, and `NeoTabs` takes its `defaultValue` as a string.

**Fixed — the tokens and `@neo-design/foundations` have types.** Importing `color`, `colorVars`, `cssVar` or
`scale` from `@neo-design/mui` failed to compile (TS2305), and no entry of `@neo-design/foundations` —the sprite of
step 3 of the integration guide, each `tokens/*.mjs`— had a declaration, so a strict project stopped at TS7016.
Each entry now ships its `.d.mts`, with the token names as literal keys: your editor offers them, and a misspelled
role does not compile. The props pages of `NeoRadioButton` and `NeoToggle` now list `inputRef`, which they always
accepted.

**Fixed — a MUI `<Button variant="outlined">` drew a border the design does not have.** The theme draws `outlined`
as the ghost button, like `tertiary`, but kept MUI's 1px border at rest, on hover and disabled —and the examples
guide teaches that button—. It has no border now, the same as every button in the design.

**Fixed — `icon` takes a sprite id in every component.** In `NeoBanner` and `NeoEmptyState`,
`icon="system-add"` printed the text; now it draws the icon, as `NeoChips` and `NeoTag` already did. An element
you pass still goes in as it is.

**Fixed — `required` makes the field required, not just the asterisk.** In `NeoTextField`, `NeoTextArea`,
`NeoSelect` and `NeoCombobox` it drew the asterisk and nothing else: an empty form was sent, and a screen reader
did not say the field was mandatory. The input now carries `required` —the select's combobox, `aria-required`—,
as in MUI. The plain CSS recipe of the text field puts it on the `<input>` too.

**Fixed — Enter in `NeoTextField` submits the form again.** It confirmed what was typed and released focus on the
key press itself, and with focus gone the browser skipped the form's implicit submission: Enter did nothing. Focus
is now released when the key comes up, after the form has been submitted —once—. If your own `onKeyDown` calls
`preventDefault`, focus stays, as before.

**Fixed — opening `NeoModalDialog` or `NeoModalFullscreen` puts focus inside the dialog.** MUI focused the wrapper
around it, outside the element with `role="dialog"`, so a screen reader did not announce the dialog. Focus now goes
to the dialog itself, which is announced with its title and description, and Tab continues to its first control. An
element of yours with `autoFocus` inside the dialog keeps it.

**Changed — choosing an option in `NeoCombobox` keeps focus on the field.** It released focus, which landed on the
page, and a screen reader did not announce the chosen value. It now stays, as in MUI and the combobox pattern of
the APG; the field shows as filled when you leave it, like the other three fields.

**Fixed — `NeoTooltip` describes its trigger instead of renaming it.** Like MUI's Tooltip by default, it gave the
trigger an `aria-label` with the bubble's text: a «Save» button was announced as «Saves the changes to the cloud»,
and a voice command for «Save» did not find it. The trigger keeps its visible name, and the bubble's text is its
description (`aria-describedby`).

**Fixed — the theme no longer hides your loading indicators.** It set `aria-hidden` on every `CircularProgress`, so
one of yours with its own `aria-label` disappeared from the accessibility tree. Only `NeoSpinner` is hidden now, as
its contract says: the container announces the loading state with `aria-busy` and an `aria-label`.

**Changed — `NeoButton` asks for a name.** With no `label`, no children and no `aria-label` it drew a button that a
screen reader announces only as «button», and said nothing. It now warns in development, and its type asks for one
of the four. While loading, the visible label stays the name: the button is `disabled` and `aria-busy`, and it does
not take an `aria-label` for the state, which would replace the label you see.

**Fixed — the snackbar page promised stacking the component does not do.** «Up to 3 at a time, 8px apart» is the
design's rule, and your layout applies it: `NeoSnackbar` has no queue, and a second one covers the first unless you
stack them. The page says so now.

**Fixed — `NeoModalDialog` warns when a size has no colored type.** The design draws the colored types
(`brand`, `info`, `success`, `warning`, `error`) only in `xs` and `sm`; in `md` and `lg` the header is neutral.
Asking for one there now warns in development, as the other design limits already did.

**Changed — a long field label wraps, and the ⓘ goes right after its last word.** In `NeoTextField`, `NeoTextArea`,
`NeoSelect` and `NeoCombobox` the label was cut to one line with «…», and on a narrow screen the cut took the
required asterisk with it. It now wraps to as many lines as it needs. With a `tooltip`, the label's last word, the
asterisk and the ⓘ stay together on the same line, so the ⓘ never ends up alone. The label is drawn as two `<label>`
elements for the same field, and the ⓘ stays out of both: the field's name is still the label's text. The plain CSS
recipes show the markup: the last word and the ⓘ go in `.field__label-tail` —`.select__label-tail`,
`.combobox__label-tail`—.

**Fixed — from npm you reach the guide.** Both packages declare their `repository` and a `homepage` that opens the
integration guide, so npmjs.com links to them. The `@neo-design/mui` page shows the whole mount —install with
`next` while it is a candidate, `CssBaseline`, the font and the sprite, plus a line for pnpm—; the one it showed
left the app in the browser's font and some components without style. The guide stops saying that `latest` only
moves with a final version, gives a Jest configuration that works, and its table of versions adds the pair an
empty project installs today —React 19.3 with MUI 6.5—: all 24 components render in each supported pair. The
examples guide stops teaching two ways of building a form: it leads with the `Neo*` fields, and composing your own
is shown as what the wrapper does.

**Fixed — the ⓘ beside a field label is centered on its line.** In `NeoTextField`, `NeoTextArea`, `NeoSelect` and
`NeoCombobox`, and in their plain CSS sheets, it sat about two pixels low; it is now centered on the label's line, as
the design draws it. Its size and its click area do not change.

**Added — a page on versions, deprecation and support.** `docs/dev/SUPPORT.md` says what counts as MAJOR, MINOR and
PATCH, how long a deprecated name keeps working, which React and Material UI versions are supported, who to tell
when something fails, and what to do when Neo does not have what a screen needs: if no design delivered it, the
Material UI component with the theme mounted; if a design delivered it and the library does not have it yet, build
it with the semantic tokens its design names. `llms.txt` carries the same rule for agents.

**Fixed — the combobox page says its icon slots turn off when it is disabled.** The component already drew them in
`--icon--base--disabled`, like the text field's; the page said they stayed in the default color.

**Kept on purpose — the ✕ of `NeoSnackbar` closes with the reason `'closeButton'`.** MUI has no reason for it, and
reusing one of its own (`'clickaway'`, `'timeout'`) would tell your handler something that did not happen. Its type
says so.

What is delivered, re-measured on this release:

- **24 components** with their `Neo*` wrappers, generated from their contract.
- **The Material UI theme** (v5 and v6), which dresses 35 MUI components.
- **The plain CSS layer**, for those who do not use React: 25 sheets with 850 uses of `var()` and no
  unresolved variable.
- **167 icons** as a sprite module —`import { sprite } from '@neo-design/foundations/sprite'`—, with
  their index.

---

## 1.0.0-rc.5 — 2026-09-24

**Changed — the guide said the raw MUI components all come out in the Neo style, and in four of them
that is false.** `TextField`, `TextField multiline`, `Select` and `Autocomplete` draw their label
**inside** the border; the master wants it above the field, and that is structure, not style — a theme
cannot move it. Use `NeoTextField`, `NeoTextArea`, `NeoSelect` and `NeoCombobox`. The list is no longer
written by hand in the guide, the README and `llms.txt`: it is derived from the system's own table, and
a gate renders both paths and compares them.

**Fixed — the `Select` recipe in `EXAMPLES.md` left the control with no accessible name.** Its control
is a `div role="combobox"`, so `<label for>` does not name it: the recipe now passes `labelId`, like
`NeoSelect` does. Measured with the browser's accessibility tree: before it was announced with the
chosen value —or with nothing while empty—, now «Region RM». The same section no longer says
`Autocomplete` is built the same way: its `renderInput` is mandatory and the idiomatic recipe puts the
label back inside the border.

**Fixed — the recipe for consuming without React was missing `css/index.css`.** Besides importing every
component sheet it carries the box model, and without it a `min-height` applies to the content: a text
field came out at 62px where the master says 44, and a menu item at 56 where it says 40.

**Fixed — `NeoBanner` and `NeoEmptyState` no longer ask you to import their stylesheet.** The theme has
shipped those sheets inside `CssBaseline` since `1.0.0-rc.3`; the README had not been updated.

**Fixed — `modal-dialog size="xs"` says 343 everywhere.** The prop's description and the plain CSS
sheet said 440 while the theme, the contract and the master said 343, so the same size gave a different
dialog in React and without React.

**Fixed — the tokens guide said Neo has no width or height tokens.** It has nine that travel: the three
button heights, the shared control height (`--neo-input-height`, 44), the switch, the menu and the radio
dot. Use them instead of writing the number.

**Fixed — the specs show the hidden-label modifier**, and thirteen table cells that had stayed in
Spanish are now in English.

No component, token or icon changed in this release: what changed is what the documentation says about
them, plus the `xs` width of `modal-dialog` in the plain CSS layer. What is delivered, re-measured on
this release:

- **24 components** with their `Neo*` wrappers, generated from their contract.
- **The Material UI v5 theme**, which dresses 35 MUI components.
- **The plain CSS layer**, for those who do not use React: 25 sheets with 844 uses of `var()` and no
  unresolved variable.
- **167 icons** as a sprite module —`import { sprite } from '@neo-design/foundations/sprite'`—, with
  their index.

---

## 1.0.0-rc.4 — 2026-09-22

**Changed — the packages are renamed and live on npm.** `@neo/foundations` and `@neo/mui` are now
`@neo-design/foundations` and `@neo-design/mui`, published on the public npm registry: the install is
`npm i @neo-design/foundations@next @neo-design/mui@next` —release candidates go under `next`—, with no
clone and no tarballs. Nothing inside changes; **every import changes its scope**: replace `@neo/` with
`@neo-design/` in your code. The old scope was never on a registry, and on npm it belongs to someone
else.

**Changed — the license is MIT.** Until this release the packages said `UNLICENSED`, which on a public
registry means no one may use them. Each package now carries its `LICENSE` file.

**Added — `NeoSnackbar`, the component 24.** It communicates, for a moment, the result of an action
without interrupting the task: `import { NeoSnackbar } from '@neo-design/mui'`, with `message`, one
`actions` and the ✕ by default (`closable`). It enters with its master redrawn in the library, its
plain sheet (`snackbar.css`) and its spec. Below 576px it changes shape: the action drops to its own
row and the message is cut at two lines. It enters fading in while it rises 16px (250 ms) and leaves
fading out while it drops (200 ms); with reduced motion, only the fade. Until this release the theme already dressed MUI's
`Snackbar`, so whoever mounted it directly sees it with the new shape too.

**Added — `hideLabel` on `NeoCheckbox` and `NeoRadioButton`.** It is `text=false` in the master: the
control is drawn alone. The label is not removed, it is hidden —it stays in the DOM and still names the
input—, so the label remains required. In the plain CSS layer it is the `--hidden-label` modifier
(`.checkbox--hidden-label`, `.radio--hidden-label`).

**Changed — `llms.txt` now names the React prop where an axis is called differently in code.** The
line sits right next to `import { NeoButton }` and said `Axes: type`, so an agent reading it wrote
`type="brand"` — which on a `<button>` is the HTML attribute. The axis keeps its Figma name, and the
three axes that are renamed in React now say so: `type (prop \`family\`)` on `NeoButton` and
`NeoButtonIcon`, and `full-photo (prop \`fullPhoto\`)` on `NeoBanner`. No other component, token or
prop changed. What is delivered, re-measured on this release:

- **24 components** with their `Neo*` wrappers, generated from their contract.
- **The Material UI v5 theme**, which dresses 35 MUI components.
- **The plain CSS layer**, for those who do not use React: 25 sheets with 844 uses of `var()` and no
  unresolved variable.
- **167 icons** as a sprite module —`import { sprite } from '@neo/foundations/sprite'`—, with their
  index.

---

## 1.0.0-rc.3 — 2026-09-17

**Fixed — two components needed a stylesheet and nothing said so.** `NeoBanner` and `NeoEmptyState`
have no Material UI component underneath, so the theme has nothing to dress and all of their style
lives in a sheet. The sheets ship, but the guide presented that layer as the path *without* React, so
a React app rendered both of them with no style of their own — no background, no radius, no spacing.
Measured on the installed package: 208 and 222 bytes with no theme rule, against 15.496 for a button.

**The theme now delivers their style, so nothing has to be imported.** Mount the theme and the three
components with no Material UI base underneath —`NeoAspectRatio`, `NeoBanner` and `NeoEmptyState`— are
dressed like every other one. Measured on a harness that renders the way you do, theme and nothing
else, on both sides of the `@container` breakpoint: without the sheet, 132 differences per width;
with the theme, **zero**, across 15 elements and 32 computed properties.

The sheets under `@neo/foundations/css/` stay published for the other path — consuming the system
without React. They are the same decisions, in plain CSS.

**Fixed — an icon lost its size, and only one did.** An icon passed to `NeoTextField` was drawn with no
dimensions at all, while the same ids inside `NeoButton` and `NeoButtonIcon` came out right: the theme
gave `.icon` a size inside each of those slots, and no base rule existed. So skipping the icon
stylesheet did not break the icons — it broke **one**, and it read like a mistake in the field you had
just written.

**The theme now delivers the icon layer too**, by the same mechanism that delivers the two sheets
above: mount it and the classes are there, so `@neo/foundations/icons.css` no longer has to be imported
with React. The sprite still does — it is injected, not a stylesheet. The guide now says this where it
is read first, instead of three sections down.

**So the material did move** with respect to `1.0.0-rc.2`: the theme carries those rules now. What is
delivered, re-measured on this release:

- **23 components** with their `Neo*` wrappers, generated from their contract.
- **The Material UI v5 theme**, which dresses 33 MUI components.
- **The plain CSS layer**, for those who do not use React: 24 sheets with 822 uses of `var()` and no
  unresolved variable.
- **167 icons** as a sprite module —`import { sprite } from '@neo/foundations/sprite'`—, with their
  index.

---

## 1.0.0-rc.2 — 2026-09-16

**Fixed — the install command, in the two guides.** They told you to run `npm i @mui/material`
without pinning it. npm brings the newest major, which the table in `docs/dev/INTEGRATION.md`
measures as broken, and installing the tarballs then stopped with `ERESOLVE`: following the guide to
the letter, the system did not install.

Now the tarballs are the whole install —npm reads the peers and brings React, Material UI and
Emotion in versions that work— and there is a line for an app that already carries MUI.

**The material itself did not move** — it is byte for byte that of `1.0.0-rc.1`. What is delivered,
re-measured on this release:

- **23 components** with their `Neo*` wrappers, generated from their contract.
- **The Material UI v5 theme**, which dresses 33 MUI components.
- **The plain CSS layer**, for those who do not use React: 24 sheets with 822 uses of `var()` and no
  unresolved variable.
- **167 icons** as a sprite module —`import { sprite } from '@neo/foundations/sprite'`—, with their
  index. It is a string, so it resolves in any bundler and in Node with nothing to configure.

The tokens, their three forms and what is not covered are unchanged from `1.0.0-rc.1`, below.

---

## 1.0.0-rc.1 — 2026-09-16

**First release candidate.** The system, packaged so it can be installed and used.

What is delivered, measured on this release:

- **Two packages that go together**: `@neo/foundations` —the tokens, the icons and the plain CSS layer,
  without React or MUI— and `@neo/mui` —the theme and the components—, which depends on the first one.
- **The semantic tokens**, in the three forms the system publishes: **94 color roles**, **239 dimensional tokens**
  and **22 text styles**. Only the semantic layer crosses — the ramp steps, the grid and the type
  primitives do not arrive. When a color is missing, what is missing is a **role**.
- **The Material UI v5 theme**, which dresses 33 MUI components.
- **The plain CSS layer**, for those who do not use React: 24 sheets with 822 uses of `var()` and no unresolved variable.
- **167 icons** as a sprite module —`import { sprite } from '@neo/foundations/sprite'`—, with their index.
  It is a string, so it resolves in any bundler and in Node with nothing to configure.
- **23 components** with their `Neo*` wrappers, and **25 exported** from the barrel —`NeoTextArea` and `NeoRadioGroup` included—.
- **The documentation**: one spec per component, the token model and the integration guides.

**Not covered, and it is written rather than implied:** screen-reader announcements and RTL. Neither is
measured today, and claiming coverage that was never measured is worse than naming the gap.
