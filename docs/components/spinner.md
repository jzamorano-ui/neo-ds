# Spinner

> **Figma (source of truth):** [❖ Spinner](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=774-29702) — visual validation against the master.

A brief, localized loading indicator. It does not replace the Loading Indicator in full-page transitions.

---

## Properties

| Property | Values |
|---|---|
| `size` | small (20px) · medium (24px) · large (32px) — MUI Button's scale |
| `step` | 1–8 (animation frames — Figma only) |

The spinner has no `variant` property — the arc's color is always `--icon--base--default`. The `step` exists only in Figma's component set to represent the animation frames; it is not a code prop.

---

## Props

```typescript
interface NeoSpinnerProps {
  size?: 'small' | 'medium' | 'large'  // the diameter of the arc, on MUI's long scale. Inside a `button` it is ALWAYS medium. Default: 'small'.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's CircularProgress
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

---

## Tokens

### Color

Across the master's 24 variants (3 sizes × 8 animation
steps), the arc is `icon/base/default` in all of them — neither the size nor the step changes the color.

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `spinner` (arco) | — | fill (in CSS it is `border-top-color`: the arc is drawn with the border) | `--icon--base--default` |

### Layout

| Property | Size | CSS custom property | Value |
|---|---|---|---|
| Dimension | sm | — | 20×20px |
| Dimension | md | — | 24×24px |
| Dimension | lg | — | 32×32px |
| `border-width` | sm · md | — | 2px |
| `border-width` | lg | — | 3px |
| `border-radius` | — | `--neo-radius-pill` | 999px |

---

## HTML

```html
<!-- Standalone -->
<div aria-busy="true" aria-label="Cargando…">
  <span class="spinner spinner--medium" aria-hidden="true"></span>
</div>
```

```html
<!-- Dentro de button en estado loading -->
<button type="button" disabled aria-busy="true" aria-label="Guardando…">
  <span class="spinner spinner--medium" aria-hidden="true"></span>
  Guardando…
</button>
```

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| Loading container | any element | `aria-busy="true"` · `aria-label="[state]"` |
| Spinner | `<span>` | `aria-hidden="true"` |

---

## Keyboard

This component is not interactive — it does not receive focus.

---

## Rules

- In `button` always use `size=medium` — regardless of the button's size.
- Only for brief, local loads — it does not substitute the Loading Indicator in main flow transitions.
- Place it near the content that is loading.
- Do not use several simultaneous spinners in the same view.
- `button/icon` does not support loading.

---

## Accessibility

- **WCAG 2.3.3** — respect `prefers-reduced-motion`: the animation stops with `animation: none`.
- **WCAG 1.4.11** — `--icon--base--default` on light backgrounds meets ≥ 3:1.
- The container must have `aria-busy="true"` and an accessible status `aria-label`.
