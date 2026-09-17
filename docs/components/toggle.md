# Toggle

> **Figma (source of truth):** [❖ Toggle](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002351-6594) — visual validation against the master.

An on/off control with immediate effect. It has no label of its own — visible text is mandatory in the consuming layout.

---

## Properties

| Property | Values |
|---|---|
| `state` | default · selected · focus |
| `disabled` | true · false |

**Valid combinations (5):** default/false · selected/false · focus/false · default/true · selected/true.
`focus + disabled` does not exist.

---

## Props

```typescript
interface NeoToggleProps {
  label: ReactNode                    // The visible text of the component.
  checked?: boolean                   // On.
  defaultChecked?: boolean
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void  // Notifies the value change.
  id?: string                         // The control id, to link the label and the descriptions.
  'aria-label'?: string               // The accessible name when there is no visible text that provides it.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Switch
}
```

---

## Tokens

### Color

> **Note:** "on" uses `fill/semantic/success/solid` (green, iOS style — a confirmed design decision). On/off **does not depend on color alone**: the thumb's position (left/right) also conveys it. It maps to MUI `Switch` (the theme paints the track green by default).

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `track` | default (off) | background | `--fill--base--strong` |
| `track` | selected · focus (on) | background | `--fill--semantic--success--solid` |
| `track` | disabled | background | `--fill--base--disabled` |
| `track` | disabled | border | `--border--base--disabled` |
| `track` | focus | border | `--focus--gap--default` |
| `thumb` | default · selected · focus | background | `--fill--base--default` |
| `thumb` | disabled | background | `--fill--base--medium` |
| `focus-ring` | focus | border | `--focus--ring--default` |

`disabled` applies equally to `state=default` and `state=selected`.

**The names are the master's.** The focus ring is a LAYER
of its own —`focus-ring`, 48×24 with a 2px stroke— that wraps the track; the "fill" between the two is
the stroke of the **track itself** in that variant. MUI's theme realizes them as `box-shadow` and the plain layer its own way:
both are faithful to the master.

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| Touch area (component) | — | 48×44px |
| Track | — | 48×24px |
| `border-radius` (track) | `--neo-radius-pill` | 999px |
| Thumb | — | 16×16px |
| `border-radius` (thumb) | `--neo-radius-pill` | 999px |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |

---

## HTML

```html
<!-- `.toggle` IS THE CONTROL, not a wrapper: the 48×44 touch area and the
     button resets (no border, no background, no padding). Put on a wrapping <div>,
     the box goes to the wrapper, the button is left unstyled and `.toggle:disabled` can never
     match — a <div> cannot be disabled.
     The wrapper carries no class: the label and its layout belong to the consuming layout,
     because the toggle includes no text of its own. -->
<div>
  <span id="notif-label">Activar notificaciones</span>
  <button class="toggle" role="switch" aria-checked="false" aria-labelledby="notif-label">
    <span class="toggle__track" aria-hidden="true">
      <span class="toggle__thumb"></span>
    </span>
  </button>
</div>
```

```html
<!-- Disabled -->
<button class="toggle" role="switch" aria-checked="false" aria-labelledby="notif-label"
        disabled>
  <span class="toggle__track" aria-hidden="true">
    <span class="toggle__thumb"></span>
  </span>
</button>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Toggle | `<button role="switch">` | `aria-checked="true/false"` · `aria-labelledby="[id]"` or `aria-label` |
| External label | `<label>` or `<span>` | `id` — referenced by `aria-labelledby` |
| Disabled | `<button role="switch">` | the native `disabled` — not `aria-disabled` next to it |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Moves focus to the toggle |
| `Shift + Tab` | Focus to the previous element |
| `Space` | Turns the toggle on or off |

---

## Rules

- It is a binary control — it turns a single option on or off.
- The change applies immediately, without confirmation — do not use it for destructive or irreversible actions.
- `label` mandatory in the consuming layout — the component has no text of its own.
- The control brings its own touch area of **48×44**, larger than the WCAG 2.5.8 minimum.
- **The click on the label is forwarded by the consumer.** Unlike `checkbox` and
`radio-button` —where a `<label>` wraps the control and the browser forwards the click on its own—, here
  the control is a `<button role="switch">` and **there is no native association that delivers it**:
`aria-labelledby` gives the accessible name, not the click area. Whoever implements it decides whether to forward
  the click from the label; the component cannot do it by itself.
- Do not use it to select among more than two options → `radio-button`.

---

## Accessibility

- Touch area: 48×44, well above the **24×24 minimum of WCAG 2.5.8 AA**, which is the level
  the system aims for (44×44 is 2.5.5, level AAA).
- Focus always visible.
- **WCAG 4.1.2** — `aria-checked` reflects the real state (`true` on / `false` off).
- **WCAG 1.3.1** — label associated programmatically via `aria-labelledby` or `aria-label`.
