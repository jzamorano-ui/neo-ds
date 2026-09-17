# Tag

> **Figma (source of truth):** [❖ Tag](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003601-163) — visual validation against the master.

An informational classification label. It conveys which category an element belongs to. It does not convey system state (`badge`) or active selection (`chip`).

---

## Properties

| Property | Values |
|---|---|
| `type` | light · dark — **in code it is the `tone` axis: soft · solid** |
| `icon-left` | true · false (default: true) |
| `icon-right` | true · false (default: true) |
| `label` | short text — guide: 1–2 words (~15 characters) |

`tone` is **the weight of the fill, not semantics and not the background it lives on** — the tag does not convey
state (that is what `badge/state` is for):

| master | code | Background | Trazo | Text and icons |
|---|---|---|---|---|
| `tone=soft` | `tone="soft"` | `--fill--base--light` | `--border--base--default` (1px INSIDE) | `--text--base--secondary` · `--icon--base--secondary` |
| `tone=solid` | `tone="solid"` | `--fill--base--inverse` | no stroke | `--text--base--contrast` · `--icon--base--contrast` |

> **It is not `surface`, and the confusion is understandable.** The dark variant binds the same tokens
> something on a dark background is dressed with, so reading only the tokens it looks like `button`'s `surface`
> axis. It is not: here they describe **the tag's own fill**. A dark tag is used on a light
> background just like a light one. The difference from `button` can be checked — `button` has a **ramp**
> for inverse surfaces (`fill/primary/inverse/*`) and the tag only uses the dark neutral.

> **A gap worth knowing:** the master has **exactly two variants** and neither is meant
> to live on a dark background. A tag on an inverse banner has no variant of its own today — the
> `soft` one holds up by contrast, but it is luck, not design.

---

## Props

```typescript
interface NeoTagProps {
  tone?: 'soft' | 'solid'            // how heavy the tag's fill is: `soft` is the light gray with a stroke, `solid` the dark neutral without a stroke. It is NOT the surface it sits on Default: 'soft'.
  label: ReactNode                   // The visible text of the component.
  icon?: ReactNode                   // The icon node. Use the system icons (icons/), not loose SVGs.
  iconRight?: string | ReactElement
  className?: string                 // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown            // the rest flows to MUI's Chip
}
```

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| root | default | background | `--fill--base--light` |
| root | default | border | `--border--base--default` |
| root | tone=solid | background | `--fill--base--inverse` |
| label | default | color | `--text--base--secondary` |
| label | tone=solid | color | `--text--base--contrast` |
| `icon-left` · `icon-right` | default | fill | `--icon--base--secondary` |
| `icon-left` · `icon-right` | tone=solid | fill | `--icon--base--contrast` |

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `padding-inline` | `--neo-space-sm` | 8px |
| `padding-block` | `--neo-space-xs` | 4px |
| `gap` (icon · label) | `--neo-space-xs` | 4px |
| `border-radius` | `--neo-radius-xs` | 4px |
| `border-width` | `--neo-stroke-xs` | 1px |

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `Label content` | `body/md-medium` | 14px | 500 | 20px |

---

## HTML

```html
<!-- No icons -->
<span class="tag">Dental</span>
```

```html
<!-- With a leading icon -->
<span class="tag">
  <svg aria-hidden="true">…</svg>
  Dental
</span>
```

```html
<!-- The solid tag: it is its fill, not the background it goes on. The master calls it `tone=solid`,
     and this class follows it:
     the solid variant is `tag--solid`. -->
<span class="tag tag--solid">Dental</span>
```

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| Tag | `<span>` | visible text as content |
| Icons | `<svg>` | `aria-hidden="true"` |

If the tag is the only indication of category, the parent element must have an `aria-label` or adjacent text that gives it context.

---

## Keyboard

This component is not interactive — it does not receive focus.

---

## Rules

- **Text of 1–2 words — it is a copywriting guideline, not a technical cap.** It exists so the
  category reads at a glance. Going over it **does not break or truncate**: the tag widens and stops
  being quick to scan, so the way out is to rewrite it shorter — not another component. No
  punctuation at the end.
- Icons only when they add semantic clarity to the label.

---

## Accessibility

- The label is mandatory — do not rely only on the border to convey the category.
- Icons are decorative: `aria-hidden="true"`.
- The tag does not receive focus nor require an action role.
