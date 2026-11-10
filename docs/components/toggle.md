<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Toggle

> **Figma (source of truth):** [❖ Toggle](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002351-6594) — visual validation against the master.

<!-- prosa:intro -->

An on/off control with immediate effect. It has no label of its own — visible text is mandatory in the consuming layout.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `disabled` | true · false |
| `state` | default · selected · focus |

<!-- prosa:properties -->

`disabled` applies equally to `state=default` and `state=selected`.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoToggleProps {
  label?: ReactNode                   // The visible text of the component.
  checked?: boolean                   // On.
  defaultChecked?: boolean            // The initial, uncontrolled state of `checked`.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void  // Notifies the value change.
  id?: string                         // The control id, to link the label and the descriptions.
  'aria-label'?: string               // The accessible name when there is no visible text that provides it.
  inputRef?: Ref<unknown>             // The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Switch not listed above
  // required: a name: `label`, `aria-label`, `aria-labelledby` —one of them
}
```

---

## Tokens

### Color

<!-- prosa:color -->

"On" uses the success solid fill (green, iOS style — a confirmed design decision). On/off does not depend on color alone: the thumb's position (left/right) also conveys it. It maps to MUI `Switch`, whose theme paints the track green by default.

The names are the master's. The focus ring is a layer of its own that wraps the track; the "fill" between the two is the stroke of the track itself in that variant. MUI's theme realizes both as `box-shadow` and the plain layer its own way: both are faithful to the master.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `track` | default | background | `--fill--base--strong` |
| `track` | selected | background | `--fill--semantic--success--solid` |
| `track` | focus | border | `--focus--gap--default` |
| `track` | disabled | background | `--fill--base--disabled` |
| `track` | disabled | border | `--border--base--disabled` |
| `thumb` | default | background | `--fill--base--default` |
| `thumb` | selected | background | `--fill--base--default` |
| `thumb` | focus | background | `--fill--base--default` |
| `thumb` | disabled | background | `--fill--base--medium` |
| `focus-ring` | focus | border | `--focus--ring--default` |
| `focus-ring` | focus | box-shadow | `--focus--gap--default` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | width | — | 48px |
| `root` | height | — | 44px |
| `track` | width | — | 48px |
| `track` | height | — | 24px |
| `track` | border-radius | — | `--neo-radius-pill` · 999px |
| `track` | border-width | — | `--neo-stroke-xs` · 1px |
| `track` | padding-block | — | `--neo-space-xs` · 4px |
| `thumb` | width | — | 16px |
| `thumb` | height | — | 16px |
| `thumb` | border-radius | — | `--neo-radius-pill` · 999px |
| `focus-ring` | width | — | 48px |
| `focus-ring` | height | — | 24px |
| `focus-ring` | border-radius | — | `--neo-radius-pill` · 999px |
| `focus-ring` | border-width | — | `--neo-stroke-sm` · 2px |

---

## Motion

| Motion | Element | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|---|
| `switch` | `track` | state | 150 ms | cubic-bezier(0.4, 0, 0.2, 1) | — |
| `slide` | `thumb` | state | 150 ms | cubic-bezier(0.4, 0, 0.2, 1) | — |

---

## HTML

<!-- prosa:html -->

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

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `input` | `<input>` | `role="switch"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the toggle |
| `Space` | turns it on or off |
| `Shift + Tab` | goes back to the previous element |

---

## Rules

| When | Then |
|---|---|
| `disabled=true` | state cannot be focus |

<!-- prosa:rules -->

- It is a binary control: it turns a single option on or off.
- The change applies immediately, without confirmation — do not use it for destructive or irreversible actions.
- **The click on the label is forwarded by the consumer.** Unlike `checkbox` and `radio-button` —where a `<label>` wraps the control and the browser forwards the click on its own—, here the control is a `switch` and there is no native association that delivers it: `aria-labelledby` gives the accessible name, not the click area. Whoever implements it decides whether to forward the click from the label; the component cannot do it by itself.
- Do not use it to select among more than two options → `radio-button`.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`checkbox`](checkbox.md) | the change needs an explicit save, it is not immediate |
| [`radio-button`](radio-button.md) | one has to be chosen among several mutually exclusive options |

---

## Accessibility

- THE TOGGLE HAS NO LABEL OF ITS OWN. The visible text is required and the consuming layout provides it, with an `id` the toggle references through `aria-labelledby` (or an `aria-label` if there is no text).
- Disabled carries the native `disabled`, and only that: ARIA in HTML asks authors not to write `aria-disabled="true"` on an element that has it.
- The focus ring is triggered only by the keyboard (C4).

<!-- prosa:accessibility -->

- The on state is the native `checked` of the checkbox input in the MUI layer, and `aria-checked` on the `<button>` of the plain layer: it must always reflect the real state (WCAG 4.1.2).
- Touch area: 48×44, well above the 24×24 minimum of WCAG 2.5.8 AA, which is the level the system aims for (44×44 is 2.5.5, level AAA).
- Focus is always visible.

<!-- /prosa:accessibility -->
