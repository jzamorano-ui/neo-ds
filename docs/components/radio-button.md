# Radio Button

> **Figma (source of truth):** [❖ Radio button](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002291-3851) — visual validation against the master.

Exclusive selection among mutually exclusive options. Always inside a `radio-button/group`. For multiple selection use `checkbox`. If there are so many options that showing them all takes up too much space, `select`.

---

## Properties

### radio-button

| Property | Values |
|---|---|
| `state` | default · selected · focus |
| `disabled` | true · false |
| `label` | visible text (mandatory) |
| `text` | true · false — `false` hides the label from view; in code it is `hideLabel`, and the label stays for screen readers |

**Valid combinations (5):** default/false · selected/false · focus/false · default/true · selected/true.
`focus + disabled` does not exist.

**`text=false` does not remove the label, it hides it.** The label is still required (C7): with `hideLabel` it stays in the DOM and still names the radio, so a screen reader announces it. Use it where the context already says what the option is, never to save space in a form.

### radio-button/group

| Property | Values |
|---|---|
| `direction` | vertical · horizontal |
| `option-1` … `option-5` | true · false |

---

## Props

```typescript
interface NeoRadioButtonProps {
  label: ReactNode                    // The visible text of the component.
  checked?: boolean                   // On.
  defaultChecked?: boolean
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void  // Notifies the value change.
  id?: string                         // The control id, to link the label and the descriptions.
  hideLabel?: boolean                 // Hides the label from view and keeps it for screen readers: the control still has a name. It is `text=false` in the master.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Radio
}

interface NeoRadioGroupProps {
  name: string                        // The group name: all the controls that exclude each other share it. REQUIRED.
  legend: ReactNode                   // The text of the group <legend>. REQUIRED: without it the set has no accessible name.
  value?: string                      // The controlled value.
  defaultValue?: string               // The initial, uncontrolled value.
  direction?: 'vertical' | 'horizontal'  // how the GROUP's options are laid out. It lives in the group's master, not in the atom. Default: 'vertical'.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void  // Notifies the value change.
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's RadioGroup
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

> **Two exports, composed the way MUI composes them.** `NeoRadioButton` is the single radio with its required `label`; `NeoRadioGroup` is the `<fieldset>` with its required `legend`, and it takes the radios as children, like MUI's `RadioGroup`. The selection travels in the group's `value` (or `defaultValue`), and `disabled` on the group disables every radio. The master draws the radio and its group separately, and so does the code; a radio is never used alone.
>
> ```jsx
> <NeoRadioGroup name="plan" legend="Payment frequency" defaultValue="monthly">
>   <NeoRadioButton value="monthly" label="Monthly" />
>   <NeoRadioButton value="yearly" label="Yearly" />
> </NeoRadioGroup>
> ```

---

## Tokens

### Color

> **Model: the radio is an icon** (a single vector: ring + dot). The color goes in the vector's `fill`. Unchecked ring = **border** token (matches the inputs' border); checked ring+dot = **icon** token. It maps to MUI `Radio` (SVG icons `RadioButtonUnchecked` / `RadioButtonChecked`).

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `radio` (ícono) | default (unchecked) | fill | `--border--base--default` |
| `radio` (ícono) | selected · focus (marcado) | fill | `--icon--base--default` |
| `radio` (ícono) | disabled (unchecked) | fill | `--border--base--disabled` |
| `radio` (ícono) | disabled-selected (off and checked) | fill | `--icon--base--disabled` |
| `label` | default · selected · focus | color | `--text--base--default` |
| `label` | disabled | color | `--text--base--disabled` |
| focus ring | focus | box-shadow (externo) | `--focus--ring--default` |
| focus gap | focus | box-shadow (fill, between ring and ring) | `--focus--gap--default` |

> **Hover** (CSS state, not a Figma variant): the unchecked ring's border switches to `--border--base--focus` on hover.

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `gap` (control · label) | — | 0 — the master declares no gap; the spacing comes from the 40px wrapper with the box centered |
| Touch area (control-wrapper) | — | 40×44px |
| Control visual (radio-control) | — | 24×24px |
| `border-radius` (radio-control) | `--neo-radius-pill` | 999px (circle — effective radius 12px on a 24px control) |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/lg-regular` | 16px | 400 | 24px |

---

## HTML

```html
<!-- The anatomy is dictated by the CSS: the input goes INSIDE the wrapper and as a sibling
     immediately before the control (`input:checked +.radio__control`). The input is invisible
     but it is the one that receives focus and the one the screen reader announces. -->
<fieldset class="radio-group">
  <legend class="radio-group__legend">Frecuencia de pago</legend>

  <label class="radio">
    <span class="radio__wrapper">
      <input type="radio" name="freq" value="mensual">
      <span class="radio__control"><span class="radio__dot"></span></span>
    </span>
    <span class="radio__label">Mensual</span>
  </label>

  <label class="radio">
    <span class="radio__wrapper">
      <input type="radio" name="freq" value="anual" checked>
      <span class="radio__control"><span class="radio__dot"></span></span>
    </span>
    <span class="radio__label">Anual</span>
  </label>

  <!-- text=false: the label is HIDDEN, not removed (`hideLabel` in React, `--hidden-label` here). -->
  <label class="radio radio--hidden-label">
    <span class="radio__wrapper">
      <input type="radio" name="freq" value="semanal">
      <span class="radio__control"><span class="radio__dot"></span></span>
    </span>
    <span class="radio__label">Semanal</span>
  </label>

  <label class="radio radio--disabled">
    <span class="radio__wrapper">
      <input type="radio" name="freq" value="semestral" disabled>
      <span class="radio__control"><span class="radio__dot"></span></span>
    </span>
    <span class="radio__label">Semestral</span>
  </label>
</fieldset>
```

```html
<!-- Group in a row — for two or three short options. With long labels or more than three options
     it goes in a column: in a row they break and read worse. -->
<fieldset class="radio-group radio-group--horizontal">
  <legend class="radio-group__legend">Frecuencia de pago</legend>

  <label class="radio">
    <span class="radio__wrapper">
      <input type="radio" name="frecuencia-h" value="mensual">
      <span class="radio__control" aria-hidden="true"></span>
    </span>
    <span class="radio__label">Mensual</span>
  </label>

  <label class="radio">
    <span class="radio__wrapper">
      <input type="radio" name="frecuencia-h" value="anual" checked>
      <span class="radio__control" aria-hidden="true"></span>
    </span>
    <span class="radio__label">Anual</span>
  </label>
</fieldset>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Radio group | `<fieldset>` or `<div role="radiogroup">` | `aria-labelledby="[legend-id]"` |
| Group legend | `<legend>` | descriptive text of the group |
| Radio individual | `<input type="radio">` | `id` · `name="[grupo]"` · the native `checked` — never `aria-checked` on a radio input (ARIA in HTML) |
| Label | `<label>` | `for="[radio-id]"` |
| Disabled | `<input type="radio">` | the native `disabled` — not `aria-disabled` next to it |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Enters the group; focus on the selected radio (or the first if none) |
| `Shift + Tab` | Leaves the group |
| `→` · `↓` | Moves focus to the next radio and selects it |
| `←` · `↑` | Moves focus to the previous radio and selects it |

The group is a single tab stop. The arrows navigate and select inside the group.

---

## Rules

- Only one option can be `selected` per group — selecting one deselects the others.
- Do not use it in isolation — a radio button without a group loses its exclusivity semantics.
- `label` mandatory on each option — do not hide it to simulate a radio without text.
- The clickable area includes the control and the text — both activate the selection.
- The selection is shown with the inner dot, not only with color — do not rely only on the fill.
- At most ~6 options per group — more options suggest a `<select>`.

---

## Accessibility

- Touch area: the row measures 44 high, well above the **24×24 minimum of WCAG 2.5.8 AA**,
  which is the level the system aims for (44×44 is 2.5.5, level AAA).
- Focus always visible.
- **WCAG 1.3.1** — use `<fieldset>` + `<legend>` to group related radios.
- **WCAG 4.1.2** — `aria-checked` reflects the real state; only one radio per group can have `aria-checked="true"`.
