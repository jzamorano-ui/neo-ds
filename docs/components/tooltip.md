# Tooltip

> **Figma (source of truth):** [❖ Tooltip](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002339-1862) — visual validation against the master.

A contextual informational label. Not interactive, not essential. It does not replace visible labels nor contain actions. If the message is from the system and has to be read, it is `alert`.

---

## Properties

| Property | Values |
|---|---|
| `type` | none · left · right · up · down · up-left · up-right · down-left · down-right |
| `label` | short text, **at most ~80 characters** (≈2 lines) |

> **In Figma the values carry an arrow emoji** (`⬅️ left`, `⬆️ up`…). It is **a visual aid of the panel**, not part of the contract: in code the value is **`left`**, without the emoji.

`type` indicates the side where the arrow appears — the tooltip's position is the opposite:
`type=down` → arrow at the bottom → the tooltip appears above the trigger.

| type | Arrow at... | Tooltip appears... |
|---|---|---|
| `none` | — | any position |
| `left` | left | to the right of the trigger |
| `right` | right | to the left of the trigger |
| `up` | top | below the trigger |
| `down` | bottom | above the trigger |
| `up-left` · `up-right` | top corner | below, diagonally |
| `down-left` · `down-right` | bottom corner | above, diagonally |

---

## Props

```typescript
interface NeoTooltipProps {
  placement?: 'none' | 'right' | 'left' | 'bottom' | 'top' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'  // where the bubble goes relative to the trigger — the vocabulary is MUI's, identical. `none` = no arrow, which in MUI is the default placement. Default: 'top'.
  label: ReactNode                    // The visible text of the component.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Tooltip
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

---

## Tokens

### Color

The master's 9 `placement` variants all say the
same. The arrow is a separate vector in the master and shares the bubble's fill.

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `tooltip-body` · `arrow` | — | background (the arrow, in CSS: the `border-color` of its `::before`) | `--fill--semantic--info--solid` |
| `label` | — | color | `--text--base--contrast` |

The same tokens in all `placement` variants. The tooltip is **info (blue)** — an informational container; white text on `--fill--semantic--info--solid` meets WCAG AA (7.79:1).

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `padding-inline` | `--neo-space-sm` | 8px |
| `padding-block` | `--neo-space-xs` | 4px |
| `border-radius` | `--neo-radius-xs` | 4px |
| Arrow size | — | 12×6px |
| Margen trigger → tooltip | `--neo-space-sm` | 8px |

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- `.tooltip` is the BUBBLE, and the modifier says which side it comes out of relative to the trigger
     (`--up` · `--down` · `--left` · `--right`, with their corner variants). Without the class, the
     text appears as a bare span with no box or color. -->

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

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Tooltip | `<span role="tooltip">` | `id="[tooltip-id]"` · `hidden` when it is not visible |
| Trigger with text | elemento focusable | `aria-describedby="[tooltip-id]"` |
| Trigger without text | `<button>` | `aria-label="[action]"` · `aria-describedby="[tooltip-id]"` |

---

## Keyboard

This component does not receive focus — focus belongs to the trigger. The tooltip appears when the trigger receives focus.

| Device | Appears | Closes |
|---|---|---|
| Desktop | hover · focus of the trigger | `Escape` · on leaving the trigger **and** the tooltip itself |
| Mobile | press of the trigger | `Escape` · on interacting outside |

> **WCAG 1.4.13 asks for all three.** *Dismissible*: `Escape` closes it without moving focus. *Hoverable*: if
> the cursor moves from the trigger to the tooltip, it stays visible — that is why the close looks at both, not only the
> trigger. *Persistent*: it does not close on its own over time.

---

## Rules

- **Text at most ~80 characters**, which fit in **1–2 lines**. The cap is enforced with
`max-width: 40ch` (≈312px), NOT with 80ch: an 80-character line measures ~624px and is outside the
  readable range (the typographic optimum is 45–75 per line). With 40ch, 80 characters wrap in two
  comfortable lines. If the text does not fit in two lines, the case is not a tooltip — it is helper text.
- Do not leave the `"My Tooltip"` placeholder in production.
- Use `Type=none` when the layout controls the positioning.
- The chosen `Type` must match the tooltip's real position in the interface.

---

## Accessibility

- The tooltip appears when the trigger receives `focus` — not only on hover.
- **WCAG 1.4.13** — the tooltip stays visible if the user moves the cursor from the trigger toward the tooltip.
- It does not replace `aria-label` — the trigger must have its own accessible label.
- Short text — screen readers read the whole content when focus arrives.
