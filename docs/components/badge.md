<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Badge

> **Figma (source of truth):** [❖ Badge](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002369-4082) — visual validation against the master.

<!-- prosa:intro -->

Communicates system state or an activity count compactly. It is not interactive. If it classifies instead of reporting a state, it is `tag`; if the message has to be read in full and not glanced at, `alert`.

`badge/indicator` → activity or quantity · `badge/state` → semantic system state · `notification` → a badge composed over button/icon.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `type` | dot (8px) · number (20px) · neutral · info · success · warning · error — default `dot` | `badge` |
| `label` | text | `badge/state` |

<!-- prosa:properties -->

`dot` and `number` are the indicator (the `badge` master); the other five are `badge/state`. The `notification` composition adds a `badge` boolean: `false` hides the bubble and keeps the button — in code it is `invisible` on the MUI `Badge`.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoBadgeProps {
  type?: 'dot' | 'number' | 'neutral' | 'info' | 'success' | 'warning' | 'error'  // what kind of badge it is. The first TWO are indicators (MUI Badge) and the next five are semantic states (Chip variant=status) — the axis picks the base, not a variant. Default: 'dot'.
  label?: ReactNode                   // The visible text of the component.
  count?: number                      // The number shown. It needs an `aria-label` that says it in words.
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Badge not listed above
  // required: with `type` dot | number: `aria-label`, `children` · with `type` neutral | info | success | warning | error: `label`
}
```

---

## Tokens

### Color

<!-- prosa:color -->

`dot` and `number` are the indicator; the other five are `badge/state`.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | type=dot | background | `--fill--semantic--error--solid` |
| `root` | type=number | background | `--fill--semantic--error--solid` |
| `root` | type=neutral | background | `--fill--base--light` |
| `root` | type=neutral | border | `--border--base--default` |
| `root` | type=info | background | `--fill--semantic--info--soft` |
| `root` | type=info | border | `--border--semantic--info` |
| `root` | type=success | background | `--fill--semantic--success--soft` |
| `root` | type=success | border | `--border--semantic--success` |
| `root` | type=warning | background | `--fill--semantic--warning--soft` |
| `root` | type=warning | border | `--border--semantic--warning` |
| `root` | type=error | background | `--fill--semantic--error--soft` |
| `root` | type=error | border | `--border--semantic--error-soft` |
| `label` | type=number | color | `--text--base--contrast` |
| `label` | type=neutral | color | `--text--base--default` |
| `label` | type=info | color | `--text--semantic--info` |
| `label` | type=success | color | `--text--semantic--success` |
| `label` | type=warning | color | `--text--semantic--warning` |
| `label` | type=error | color | `--text--semantic--error` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | border-radius | — | 999px |
| `root` | border-width | — | 1px |
| `root` | width × height | type=dot | 8×8px |
| `root` | width × height | type=number | 20×20px |
| `root` | padding-block | type=dot | `--neo-space-none` · 0px |
| `root` | padding-block | type=number | `--neo-space-xs` · 4px |
| `root` | padding-inline | type=dot | `--neo-space-none` · 0px |
| `root` | padding-inline | type=number | `--neo-space-xs` · 4px |

<!-- prosa:layout -->

Inside `notification` the badge sits at `top` / `right``--neo-space-xs` (4px) from the corner of the button.

**The size of `notification` is not indifferent.** Its button is `lg` because the master measures 48, and in
`button/icon` **each size brings its own icon size** — large 24 · medium 20 · small 16.
Changing the button's size without changing the icon's leaves the glyph **cropped** inside a
smaller box: the icon keeps its size and the slot cuts it.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `label` | number | `Caption/sm-Medium` | 12px | 500 | 16px |
| `label` | neutral | `Body/md-Medium` | 14px | 500 | 20px |
| `label` | info | `Body/md-Medium` | 14px | 500 | 20px |
| `label` | success | `Body/md-Medium` | 14px | 500 | 20px |
| `label` | warning | `Body/md-Medium` | 14px | 500 | 20px |
| `label` | error | `Body/md-Medium` | 14px | 500 | 20px |

---

## HTML

<!-- prosa:html -->

```html
<!-- badge/state -->
<span class="badge badge--error">Rechazada</span>
<span class="badge badge--success">Aprobada</span>
```

```html
<!-- badge indicator dot -->
<span class="badge badge--dot" role="status" aria-label="Nuevo contenido disponible"></span>
```

```html
<!-- badge indicator number -->
<span class="badge badge--number" role="status" aria-label="3 notificaciones pendientes">3</span>
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

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `span[aria-label]` | `<span>` | `role="status"` |

<!-- prosa:aria -->

| Element | Tag | Required attributes |
|---|---|---|
| `badge/state` | `<span>` | visible text as content |
| `badge` indicator dot | `<span role="status">` | `aria-label="[state description]"` |
| `badge` indicator number | `<span role="status">` | `aria-label="[n] [contexto]"` ej: `"3 notificaciones pendientes"` |
| Badge in notification | `<span>` | `aria-hidden="true"` — the button/icon already has its `aria-label` |

<!-- /prosa:aria -->

---

## Keyboard

This component is not interactive — it does not receive focus.

---

## Rules

| Limit | When exceeded |
|---|---|
| **label:** 1–2 words | it does not break: it can no longer be read at a glance, which is the only thing a badge has to achieve |
| **visible count:** 99+ | above 99 it shows 99+ |

| When | Then |
|---|---|
| `type=number` | count must be declared |
| `type=neutral\|info\|success\|warning\|error` | label must be declared |
| `type=dot\|number` | aria-label must be declared |
| `type=dot\|number` | an indicator must anchor to an element |

<!-- prosa:rules -->

- Do not use the semantic color for another purpose — each variant conveys a fixed meaning.
- Do not replace buttons with a badge — the badge does not run actions.
- Do not use a badge for selection or filters → use `chip`.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`tag`](tag.md) | it classifies instead of reporting a system state |
| [`alert`](alert.md) | the message has to be read in full, not glanced at |

---

## Accessibility

- THE ROLE IS NOT OPTIONAL ON INDICATORS. A `<span>` without a role is `role=generic`, and the ARIA specification FORBIDS naming a generic element: the `aria-label` is not exposed and the indicator goes mute. With `role="status"` the name is announced, and a change in the count is conveyed on its own. An equivalent alternative: visually hidden text inside the span.
- The `aria-label` of a number says the number AND the context: «3 notificaciones pendientes», not «3».
- A badge INSIDE a button/icon is `aria-hidden="true"`: the button already has its own `aria-label`, and announcing both duplicates it.
- It takes no focus: it is not interactive.

<!-- prosa:accessibility -->

- Do not rely only on color to convey the state — always include text in `badge/state`.

<!-- /prosa:accessibility -->
