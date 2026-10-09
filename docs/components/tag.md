<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Tag

> **Figma (source of truth):** [❖ Tag](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003601-163) — visual validation against the master.

<!-- prosa:intro -->

An informational classification label. It conveys which category an element belongs to. It does not convey system state (`badge`) or active selection (`chip`).

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `tone` | soft · solid — default `soft` |
| `label` | text |
| `icon-left` | true · false — default `true` |
| `icon-right` | true · false — default `false` |

<!-- prosa:properties -->

`tone` is **the weight of the fill, not semantics and not the background it lives on** — the tag does not convey state (that is what `badge/state` is for). On a light surface both values are valid, chosen by the contrast wanted; on a dark surface, if one appears, use the lighter one.

> **It is not `surface`, and the confusion is understandable.** The dark variant binds the same tokens
> something on a dark background is dressed with, so reading only the tokens it looks like `button`'s `surface`
> axis. It is not: here they describe **the tag's own fill**. A dark tag is used on a light
> background just like a light one. The difference from `button` can be checked — `button` has a **ramp**
> for inverse surfaces (`fill/primary/inverse/*`) and the tag only uses the dark neutral.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoTagProps {
  tone?: 'soft' | 'solid'             // how heavy the tag's fill is: `soft` is the light gray with a stroke, `solid` the dark neutral without a stroke. It is NOT the surface it sits on Default: 'soft'.
  label: ReactNode                    // The visible text of the component.
  icon?: ReactNode                    // The icon node. Use the system icons (icons/), not loose SVGs.
  iconRight?: string | ReactElement   // The icon after the text: the id of a system icon (`system-chevron-right`) or your own element.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Chip not listed above
}
```

---

## Tokens

### Color

<!-- prosa:color -->

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | tone=soft | background | `--fill--base--light` |
| `root` | tone=soft | border | `--border--base--default` |
| `root` | tone=solid | background | `--fill--base--inverse` |
| `label` | tone=soft | color | `--text--base--secondary` |
| `label` | tone=solid | color | `--text--base--contrast` |
| `icon-left` · `icon-right` | tone=soft | fill | `--icon--base--secondary` |
| `icon-left` · `icon-right` | tone=solid | fill | `--icon--base--contrast` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | height | — | 28px |
| `root` | padding-block | — | `--neo-space-xs` · 4px |
| `root` | padding-inline | — | `--neo-space-sm` · 8px |
| `root` | gap | — | `--neo-space-xs` · 4px |
| `root` | border-radius | — | `--neo-radius-xs` · 4px |
| `root` | border-width | — | `--neo-stroke-xs` · 1px |
| `icon-left` | width | — | `--neo-icon-size-sm` · 20px |
| `icon-left` | height | — | `--neo-icon-size-sm` · 20px |
| `icon-right` | width | — | `--neo-icon-size-sm` · 20px |
| `icon-right` | height | — | `--neo-icon-size-sm` · 20px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `label` | — | `Body/md-Medium` | 14px | 500 | 20px |

---

## HTML

```html
<span class="tag">Label content</span>
<span class="tag tag--solid">Label content</span>
```

<!-- prosa:html -->

```html
<!-- With a leading icon: the icon is decorative -->
<span class="tag">
  <svg aria-hidden="true">…</svg>
  Dental
</span>
```

<!-- /prosa:html -->

---

## Keyboard

This component is not interactive — it does not receive focus.

---

## Rules

| Limit | When exceeded |
|---|---|
| **label:** 1–2 words (~15 characters) | it neither breaks nor truncates: the tag widens and is harder to scan — rewrite it shorter |

<!-- prosa:rules -->

- No punctuation at the end of the label.
- Icons only when they add semantic clarity to the label.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`badge`](badge.md) | the element communicates system state |
| [`chip`](chips.md) | the element represents an active selection and can be touched |

---

## Accessibility

- It takes no focus and is not in the tab order: it is not interactive.
- Icons are `aria-hidden="true"`.
- If the tag is the ONLY indication of category, the parent element needs an `aria-label` or adjacent text that gives it context — a lone tag does not say what it is a category of.

<!-- prosa:accessibility -->

- The label is mandatory — do not rely only on the border to convey the category.

<!-- /prosa:accessibility -->
