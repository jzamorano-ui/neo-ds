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
