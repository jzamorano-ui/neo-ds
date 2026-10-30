<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Spinner

> **Figma (source of truth):** [❖ Spinner](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=774-29702) — visual validation against the master.

<!-- prosa:intro -->

A brief, localized loading indicator. When the whole page is loading, show the page's structure while the data arrives instead. And when the whole screen waits for a relevant action of the person — searching or quoting plans, sending a request, paying —, it is the `brand-loader`: it replaces the screen, with a message that says what is being done.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `size` | small (20px) · medium (24px) · large (32px) — default `small` |
| `step` | 1–8 — Figma only: it does not reach the API |

---

## Props

```typescript
interface NeoSpinnerProps {
  size?: 'small' | 'medium' | 'large'  // the diameter of the arc, on MUI's long scale. Inside a `button` it is ALWAYS medium. Default: 'small'.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's CircularProgress not listed above
}
```

---

## Tokens

### Color

<!-- prosa:color -->

Across the master's 24 variants (3 sizes × 8 animation
steps), the arc is `icon/base/default` in all of them — neither the size nor the step changes the color.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` · `arc` | default | fill | `--icon--base--default` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | width × height | size=small | 20×20px |
| `root` | width × height | size=medium | 24×24px |
| `root` | width × height | size=large | 32×32px |
| `arc` | width × height | size=small | 20×20px |
| `arc` | width × height | size=medium | 24×24px |
| `arc` | width × height | size=large | 32×32px |
| `arc` | stroke-width | size=small | 1.64px |
| `arc` | stroke-width | size=medium | 1.96px |
| `arc` | stroke-width | size=large | 2.62px |

<!-- prosa:layout -->

The arc is MUI's `CircularProgress` ring: it fills the box and its stroke is 3.6 of 44, with a round end. Both layers draw it as an SVG stroke with MUI's animation: the box rotates in 1.4s while the stroke grows and shrinks. In CSS it is the `::before` of `.spinner`, painted with the arc's color and clipped by an SVG mask, so the markup stays an empty `<span>`. With `prefers-reduced-motion: reduce` both layers stop, and the arc stays still.

<!-- /prosa:layout -->

---

## Motion

| Motion | Element | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|---|
| `rotate` | `root` | loop | 1400 ms | linear | — |
| `dash` | `arc` | loop | 1400 ms | cubic-bezier(0.42, 0, 0.58, 1) | — |

---

## HTML

```html
<span class="spinner spinner--small" aria-hidden="true"></span>
<span class="spinner spinner--medium" aria-hidden="true"></span>
<span class="spinner spinner--large" aria-hidden="true"></span>
```

<!-- prosa:html -->

```html
<!-- Standalone. The role is what lets the name be exposed -->
<div role="status" aria-busy="true" aria-label="Cargando…">
  <span class="spinner spinner--medium" aria-hidden="true"></span>
</div>
```

```html
<!-- Inside a button in its loading state -->
<button type="button" disabled aria-busy="true" aria-label="Guardando…">
  <span class="spinner spinner--medium" aria-hidden="true"></span>
  Guardando…
</button>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<span>` | `aria-hidden="true"` |

---

## Keyboard

This component is not interactive — it does not receive focus.

---

## Rules

| Limit | When exceeded |
|---|---|
| **simultaneous spinners:** do not use several simultaneous spinners | several spinners at once do not say what is being waited for — merge them into one near the content that is loading (C1) |

<!-- prosa:rules -->

- In `button` always use `size=medium` — regardless of the button's size.
- Only for brief, local loads — not for a whole page loading.
- Place it near the content that is loading.
- Do not use several simultaneous spinners in the same view.
- `button/icon` does not support loading.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`brand-loader`](brand-loader.md) | the whole screen waits for the result of a relevant action of the person — searching or quoting plans, sending a request, paying — and what comes depends on what the person asked for: the brand loader replaces the screen, with a message that says what is being done. |

---

## Accessibility

- It takes no focus and does not appear in the tab order: it is not interactive.
- The loading container is `role="status"` and carries `aria-busy="true"` and an `aria-label` with the state — without them, as far as a screen reader is concerned nothing is happening. On a `div` without a role the name has nowhere to sit: ARIA does not allow a `generic` to be named. VoiceOver with Safari does not announce the container when it appears, because it arrives already filled. When the wait has to be announced, keep a `role="status"` region on the page from the start and set its text (see «A live region has to exist before its message» in `llms.txt`).
- The container's default text is «Cargando…».

<!-- prosa:accessibility -->

- **WCAG 2.3.3** — respect `prefers-reduced-motion`: the animation stops with `animation: none`.
- **WCAG 1.4.11** — `--icon--base--default` on light backgrounds meets ≥ 3:1.

<!-- /prosa:accessibility -->
