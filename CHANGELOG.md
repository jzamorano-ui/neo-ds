# CHANGELOG — `@neo/foundations` and `@neo/mui`

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
