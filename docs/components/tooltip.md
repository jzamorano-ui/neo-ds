<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Tooltip

> **Figma (source of truth):** [❖ Tooltip](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002339-1862) — visual validation against the master.

<!-- prosa:intro -->

A contextual informational label. Not interactive, not essential. It does not replace visible labels nor contain actions. If the message is from the system and has to be read, it is `alert`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `placement` | none · right · left · bottom · top · bottom-start · bottom-end · top-start · top-end — default `top` |
| `label` | text |

<!-- prosa:properties -->

`placement` says where the bubble goes relative to the trigger, in MUI's vocabulary: `top` puts it above the trigger, with the arrow pointing down at it. `none` draws no arrow.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoTooltipProps {
  placement?: 'none' | 'right' | 'left' | 'bottom' | 'top' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'  // where the bubble goes relative to the trigger — the vocabulary is MUI's, identical. `none` = no arrow, which in MUI is the default placement. Default: 'top'.
  label: ReactNode                    // The visible text of the component.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Tooltip not listed above
}
```

---

## Tokens

### Color

<!-- prosa:color -->

The master's 9 `placement` variants all say the
same. The arrow is a separate vector in the master and shares the bubble's fill — in CSS it is the `border-color` of `.tooltip::before`.

The tooltip is **info (blue)** — an informational container; white text on `--fill--semantic--info--solid` meets WCAG AA (7.79:1).

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--fill--semantic--info--solid` |
| `label` | default | color | `--text--base--contrast` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | padding-block | — | `--neo-space-xs` · 4px |
| `root` | padding-inline | — | `--neo-space-sm` · 8px |
| `root` | border-radius | — | `--neo-radius-xs` · 4px |
| `root` | distance to the anchor | — | `--neo-space-sm` · 8px |
| `arrow` | width × height | placement=top · bottom · top-start · top-end · bottom-start · bottom-end | 12×6px |
| `arrow` | width × height | placement=left · right | 6×12px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `label` | — | `Body/md-Regular` | 14px | 400 | 20px |

---

## HTML

<!-- prosa:html -->

```html
<!-- `.tooltip` is the BUBBLE, and the modifier carries the `placement` value (`--top` · `--bottom` ·
     `--left` · `--right`, and `-start` · `-end` for the corners). Without the class, the text appears
     as a bare span with no box or color. -->

<!-- Trigger with visible text -->
<button type="button" class="btn btn--tertiary btn--small" aria-describedby="tooltip-1">
  Ver información
</button>
<span role="tooltip" id="tooltip-1" class="tooltip tooltip--top" hidden>Texto explicativo breve</span>
```

```html
<!-- button/icon without visible text -->
<button type="button" class="btn btn--tertiary btn--small btn--icon-only"
        aria-label="Información del producto" aria-describedby="tooltip-2">
  <svg aria-hidden="true"><use href="#system-info"></use></svg>
</button>
<span role="tooltip" id="tooltip-2" class="tooltip tooltip--bottom" hidden>Texto explicativo breve</span>
```

<!-- /prosa:html -->

---

## ARIA

<!-- prosa:aria -->

| Element | Tag · Role | Required attributes |
|---|---|---|
| Tooltip | `<span role="tooltip">` | `id="[tooltip-id]"` · `hidden` when it is not visible |
| Trigger with text | focusable element | `aria-describedby="[tooltip-id]"` |
| Trigger without text | `<button>` | `aria-label="[action]"` · `aria-describedby="[tooltip-id]"` |

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus TO THE TRIGGER — that is why the tooltip appears, and it never takes focus itself |
| `Escape` | closes it without moving focus (WCAG 1.4.13, dismissible) |

<!-- prosa:keyboard -->

| Device | Appears | Closes |
|---|---|---|
| Desktop | hover · focus of the trigger | `Escape` · on leaving the trigger **and** the tooltip itself |
| Mobile | press of the trigger | `Escape` · on interacting outside |

<!-- /prosa:keyboard -->

---

## Rules

| Limit | When exceeded |
|---|---|
| **text:** at most ~80 characters (≈2 lines) | it does not break: it reads worse and covers what it is describing — if it does not fit, the information was not secondary |

<!-- prosa:rules -->

- The text cap is enforced with `max-width: 40ch` (≈312px), NOT with 80ch: an 80-character line measures ~624px and is outside the
  readable range (the typographic optimum is 45–75 per line). With 40ch, 80 characters wrap in two
  comfortable lines. If the text does not fit in two lines, the case is not a tooltip — it is helper text.
- Do not leave the `"My Tooltip"` placeholder in production.
- Use `placement=none` when the layout controls the positioning.
- The chosen `placement` must match the tooltip's real position in the interface.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`alert`](alert.md) | the message comes from the system and has to be read, it is not an optional clarification |

---

## Accessibility

- WCAG 1.4.13 asks for all three, and all three belong to the component. Dismissible: Escape closes it without moving focus. Hoverable: if the pointer moves from the trigger to the bubble, it stays visible — that is why closing watches BOTH, not just the trigger. Persistent: it does not close on its own after a timeout.
- A trigger without visible text is a `<button>` with an `aria-label`: the tooltip describes, it does not name.
- The trigger has to be focusable, or the tooltip does not exist for the keyboard.

<!-- prosa:accessibility -->

- The tooltip appears when the trigger receives `focus` — not only on hover.
- Short text — screen readers read the whole content when focus arrives.

<!-- /prosa:accessibility -->
