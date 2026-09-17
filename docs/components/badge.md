# Badge

> **Figma (source of truth):** [❖ Badge](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002369-4082) — visual validation against the master.

Communicates system state or an activity count compactly. It is not interactive. If it classifies instead of reporting a state, it is `tag`; if the message has to be read in full and not glanced at, `alert`.

`badge/indicator` → activity or quantity · `badge/state` → semantic system state · `notification` → a badge composed over button/icon.

---

## Properties

| Property | Values |
|---|---|
| `type` (badge) | dot · number |
| `type` (badge/state) | neutral · info · success · warning · error |
| `label` (badge/state) | the badge text |

---

## Props

```typescript
interface NeoBadgeProps {
  type?: 'dot' | 'number' | 'neutral' | 'info' | 'success' | 'warning' | 'error'  // what kind of badge it is. The first TWO are indicators (MUI Badge) and the next five are semantic states (Chip variant=status) — the axis picks the base, not a variant. Default: 'dot'.
  label: ReactNode                    // The visible text of the component.
  count?: number                      // The number shown. It needs an `aria-label` that says it in words.
  children: ReactNode                 // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Badge
}
```

---

## Tokens

### Color

`dot` and `number`
are the indicator (plain `badge`); the other five are `badge/state`.

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `badge` | type=dot · type=number | background | `--fill--semantic--error--solid` |
| `label` | type=number | color | `--text--base--contrast` |
| `badge` | type=neutral | background | `--fill--base--light` |
| `badge` | type=neutral | border | `--border--base--default` |
| `label` | type=neutral | color | `--text--base--default` |
| `badge` | type=info | background | `--fill--semantic--info--soft` |
| `badge` | type=info | border | `--border--semantic--info` |
| `label` | type=info | color | `--text--semantic--info` |
| `badge` | type=success | background | `--fill--semantic--success--soft` |
| `badge` | type=success | border | `--border--semantic--success` |
| `label` | type=success | color | `--text--semantic--success` |
| `badge` | type=warning | background | `--fill--semantic--warning--soft` |
| `badge` | type=warning | border | `--border--semantic--warning` |
| `label` | type=warning | color | `--text--semantic--warning` |
| `badge` | type=error | background | `--fill--semantic--error--soft` |
| `badge` | type=error | border | `--border--semantic--error-soft` |
| `label` | type=error | color | `--text--semantic--error` |

### Layout

| Property | Element | CSS custom property | Value |
|---|---|---|---|
| `border-radius` | badge/state · indicator number | `--neo-radius-pill` | 999px |
| `padding-inline` | badge/state | `--neo-space-md` | 12px |
| `padding-block` | badge/state · indicator number | `--neo-space-xs` | 4px |
| `border-width` | badge/state | `--neo-stroke-xs` | 1px |
| `top` / `right` | badge inside notification | `--neo-space-xs` | 4px |

**The size of `notification` is not indifferent.** Its button is `lg` because the master measures 48, and in
`button/icon` **each size brings its own icon size** — large 24 · medium 20 · small 16.
Changing the button's size without changing the icon's leaves the glyph **cropped** inside a
smaller box: the icon keeps its size and the slot cuts it.
| Indicator dot size | — | — | 8×8px |
| Indicator number size | — | — | 20×20px |

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `badge/state` label | `body/md-medium` | 14px | 500 | 20px |
| `indicator` number | `caption/sm-medium` | 12px | 500 | 16px |

---

## HTML

```html
<!-- badge/state -->
<span class="badge badge--error">Rechazada</span>
<span class="badge badge--success">Aprobada</span>
```

```html
<!-- badge indicator dot -->
<span class="badge badge--dot" aria-label="Nuevo contenido disponible"></span>
```

```html
<!-- badge indicator number -->
<span class="badge badge--number" aria-label="3 notificaciones pendientes">3</span>
```

```html
<!-- notification: badge over button/icon -->
<div class="notification">
  <!-- It is a system button/icon, size `lg`: the master measures 48. -->
  <button type="button" class="btn btn--tertiary btn--large btn--icon-only"
          aria-label="Ver notificaciones (3 pendientes)">
    <svg aria-hidden="true"><use href="#system-bell"></use></svg>
  </button>
  <span class="badge badge--number" aria-hidden="true">3</span>
</div>
```

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `badge/state` | `<span>` | visible text as content |
| `badge` indicator dot | `<span role="status">` | `aria-label="[state description]"` |
| `badge` indicator number | `<span role="status">` | `aria-label="[n] [contexto]"` ej: `"3 notificaciones pendientes"` |
| Badge in notification | `<span>` | `aria-hidden="true"` — the button/icon already has its `aria-label` |

> **The `role` is not optional on indicators.** A `<span>` without a role is `role=generic`, and the
> ARIA specification **forbids naming a generic element**: the `aria-label` is not exposed and the
> indicator stays mute. With `role="status"` the name is announced and, besides, the count change is
> communicated on its own. Equivalent alternative: visually hidden text inside the span.

---

## Keyboard

This component is not interactive — it does not receive focus.

---

## Rules

- Do not use the semantic color for another purpose — each variant conveys a fixed meaning.
- `badge/state` at most 1–2 words. `badge/indicator number` at most "99+".
- Do not replace buttons with a badge — the badge does not run actions.
- Do not use a badge for selection or filters → use `chip`.

---

## Accessibility

- Do not rely only on color to convey the state — always include text in `badge/state`.
- `badge/indicator dot` must have an `aria-label` if it is the only signal of activity.
- The badge does not receive focus nor require an action role.
