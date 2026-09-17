# Checkbox

> **Figma (source of truth):** [❖ Check box](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002312-6388) — visual validation against the master.

Independent multiple selection. For exclusive selection use `radio-button`; for an immediate on/off use `toggle`.

---

## Properties

| Property | Values |
|---|---|
| `state` | default · selected · focus |
| `disabled` | true · false |
| `label` | string (required) |

**Valid combinations (5):** default/false · selected/false · focus/false · default/true · selected/true.
`focus + disabled` does not exist — a disabled field does not receive focus.

### checkbox/group

| Property | Values |
|---|---|
| `option-1` … `option-5` | true · false — visibility of each option |

It only supports a vertical layout in the MVP.

---

## Props

```typescript
interface NeoCheckboxProps {
  label: ReactNode                    // The visible text of the component.
  checked?: boolean                   // On.
  defaultChecked?: boolean
  indeterminate?: boolean             // Neither checked nor unchecked: the state of a parent whose children are mixed.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void  // Notifies the value change.
  id?: string                         // The control id, to link the label and the descriptions.
  inputRef?: Ref<unknown>             // The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Checkbox
}
```

---

## Tokens

### Color

> **Model: the box is an icon** (a single vector). The color goes in the vector's `fill`; the ✓ is **negative** (knocked out — it shows the surface through). Unchecked box = **border** token (matches the inputs' border); checked box = **icon** token. It maps to MUI `Checkbox` (SVG icons `CheckBoxOutlineBlank` / `CheckBox`).

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `checkbox` (ícono) | default (unchecked) | fill | `--border--base--default` |
| `checkbox` (ícono) | selected · focus (marcada) | fill | `--icon--base--default` |
| `checkbox` (ícono) | disabled (unchecked) | fill | `--border--base--disabled` |
| `checkbox` (ícono) | disabled-selected (off and checked) | fill | `--icon--base--disabled` |
| `checkmark` (✓) | selected | — | negative (knocked out, shows the surface) |
| `label` | default · selected · focus | color | `--text--base--default` |
| `label` | disabled | color | `--text--base--disabled` |
| focus ring | focus | box-shadow (externo) | `--focus--ring--default` |
| focus gap | focus | box-shadow (fill, between box and ring) | `--focus--gap--default` |

> **Hover** (CSS state, not a Figma variant): the unchecked box's border switches to `--border--base--focus` on hover.

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `gap` (control · label) | — | 0 — the master declares no gap; the spacing comes from the 40px wrapper with the box centered |
| Touch area (`checkbox-wrapper`) | — | 40×44px |
| Control visual (`checkbox-control`) | — | 24×24px |
| `border-radius` (`checkbox-control`) | `--neo-radius-xs` | 4px |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/lg-regular` | 16px | 400 | 24px |

---

## HTML

```html
<!-- The anatomy is dictated by the CSS: the input goes INSIDE the wrapper and as a sibling
     immediately before the control (`input:checked +.checkbox__control`). The input is invisible
     but it is the one that receives focus and the one the screen reader announces. -->
<label class="checkbox">
  <span class="checkbox__wrapper">
    <input type="checkbox">
    <span class="checkbox__control">
      <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#system-check"></use></svg>
    </span>
  </span>
  <span class="checkbox__label">Acepto los términos</span>
</label>

<label class="checkbox checkbox--disabled">
  <span class="checkbox__wrapper">
    <input type="checkbox" disabled>
    <span class="checkbox__control">
      <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#system-check"></use></svg>
    </span>
  </span>
  <span class="checkbox__label">Opción no disponible</span>
</label>

<fieldset class="checkbox-group">
  <legend>Coberturas adicionales</legend>
  <label class="checkbox">
    <span class="checkbox__wrapper">
      <input type="checkbox" name="coberturas" value="dental" checked>
      <span class="checkbox__control">
        <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#system-check"></use></svg>
      </span>
    </span>
    <span class="checkbox__label">Dental</span>
  </label>
</fieldset>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Checkbox | `<input type="checkbox">` | `id` · the native `checked` — never `aria-checked` on a checkbox input (ARIA in HTML) |
| Label | `<label>` | `for="[checkbox-id]"` |
| Group container | `<fieldset>` | — |
| Group legend | `<legend>` | descriptive text of the group |
| Disabled | `<input type="checkbox">` | the native `disabled` — not `aria-disabled` next to it |
| Indeterminate | `<input type="checkbox">` | DOM property `indeterminate = true`, and only that |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Moves focus to the checkbox (each option is a tab stop) |
| `Shift + Tab` | Focus to the previous element |
| `Space` | Checks or unchecks the focused checkbox |

---

## Rules

- `label` mandatory — do not hide it to simulate a checkbox without text.
- Each option works independently — checking one does not affect the others.
- The clickable area includes the control and the text — both toggle the checkbox.
- Do not use it for exclusive selection — when only one option is valid, use `radio-button`.
- Group related options with `<fieldset>` + `<legend>` to give the group context.
- `checkbox/group` only has a vertical layout in the MVP.
- **The indeterminate state is implemented in both layers** (`.checkbox--indeterminate` and the
  theme's icon). The mixed glyph is drawn, but without the DOM property `indeterminate` the screen
  reader announces it as **unchecked** (WCAG 4.1.2): one state is seen and another is heard. The
  glyph and the property go together, always — and `aria-checked="mixed"` is not a substitute: ARIA
  in HTML forbids `aria-checked` on a checkbox input.

---

## Accessibility

- Touch area: `checkbox-wrapper` measures **40×44px** (a 24 control + 10 of padding-block). It comfortably
  meets the **24×24 minimum of WCAG 2.5.8 AA**, which is the level the system aims for.
  (44×44 is criterion 2.5.5, which is AAA and not required here — calling it the "minimum" while
  declaring 40×44 as compliance was a contradiction.)
- Focus always visible — do not suppress the outline in any context.
- **WCAG 1.3.1** — use `<fieldset>` + `<legend>` for groups; the `<label>` associates text with each control.
- **WCAG 2.5.3** — the label text describes the option, not the state.
- **WCAG 4.1.2** — `aria-checked` must reflect the real state at all times.
