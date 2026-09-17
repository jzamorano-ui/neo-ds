# `packages/` — what gets consumed

**Who it is for:** dev. **Ships**: yes — this folder **is** the packages.

**The goal, in one line:** that what someone installs and uses **is all here and nowhere
else**.

These are the packages: `@neo/foundations` resolves to `foundations/` and `@neo/mui` to `mui/`, and neither to any other folder (the repo is organized by the role each file plays). What ties them together is not
the subject —there is CSS, there is React, there is SVG— but that **everything here leaves the repo for the outside**. What tests it, measures it or generates it lives apart and **does not ship**.

**What decides whether something goes in:** does someone who installed the package consume it? If only we
use it to build or to check, it is machinery.

## The five layers

| capa | what it is | who writes it |
|---|---|---|
| [`foundations/tokens/`](foundations/tokens/) | the source of the values and the CSS it emits | the `.mjs` source **by hand** · the CSS generated. **Frozen** |
| [`mui/theme/`](mui/theme/) | the MUI theme: the `Mui*` overrides. **It is the default** — it dresses MUI's components for everyone | **a mano** |
| [`foundations/css/`](foundations/css/) | one plain sheet per component, usable without React | **a mano** |
| [`foundations/icons/`](foundations/icons/) | the SVGs, the sprite and its index | **generado** desde Figma |
| `ui/` | the React library — only where there is a reason the theme cannot cover | **generated**: no component is written by hand; only the shared `_*.mjs` pieces and the barrel are |

## Two ways to consume it, and both are valid

**With React and MUI** → the theme is mounted once and the `@mui/material` components come out dressed.
The `Neo*` in `ui/` exist where real composition is needed; they are public API, and using them is optional.

**Without React** → the `css/` layer draws the same thing with plain classes.

Both are measured against the same master: `fidelidad` compares **what the browser draws** —in both
layers— against the anatomy measured in Figma.

## The order between the layers

```
tokens/  ──▶  theme/  ──┐
   │                    ├──▶  ui/        (React)
   └──────▶  css/  ─────┘     (uses the theme, does not replace it)
                   icons/  ──▶  all three consume it
```

**Nothing points upward.** `tokens/` does not know the theme exists, and the theme does not know which
components there are. That is why a token can change without touching a component — and why freezing the
bottom layer protects every layer above it.

## What is NOT here

Each component's documentation —its spec— lives in
[`docs/components/`](../docs/components/README.md), because it **mirrors the master** and is measured against
Figma. Here is what runs; there, what is claimed.
