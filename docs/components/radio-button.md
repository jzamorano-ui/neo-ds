<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Radio Button

> **Figma (source of truth):** [❖ Radio Button](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002291-3851) — visual validation against the master.

<!-- prosa:intro -->

Exclusive selection among mutually exclusive options. Always inside a `radio-button/group`. For multiple selection use `checkbox`. If there are so many options that showing them all takes up too much space, `select`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `direction` | vertical · horizontal — default `vertical` | `radio-button/group` |
| `disabled` | false · true | `radio-button` |
| `state` | default · hover · focus · selected | `radio-button` |
| `label` | text | `radio-button` |
| `text` | true · false — default `true` | `radio-button` |
| `option-1` … `option-5` | true · false — default `true` | `radio-button/group` |

<!-- prosa:properties -->

`direction` belongs to `radio-button/group`, the master that draws the set of options; `state`, `label` and `text` belong to the single `radio-button`.

`text=false` does not remove the label, it hides it. The label is still required (C7): with `hideLabel` it stays in the DOM and still names the radio, so a screen reader announces it. Use it where the context already says what the option is, never to save space in a form.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoRadioButtonProps {
  label?: ReactNode                   // The visible text of the component.
  checked?: boolean                   // On.
  defaultChecked?: boolean            // The initial, uncontrolled state of `checked`.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void  // Notifies the value change.
  id?: string                         // The control id, to link the label and the descriptions.
  hideLabel?: boolean                 // Hides the label from view and keeps it for screen readers: the control still has a name. It is `text=false` in the master.
  inputRef?: Ref<unknown>             // The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Radio not listed above
  // required: a name: `label`, `aria-label`, `aria-labelledby` —one of them
}

interface NeoRadioGroupProps {
  name: string                        // The group name: all the controls that exclude each other share it. REQUIRED.
  legend?: ReactNode                  // The text of the group <legend>. REQUIRED: without it the set has no accessible name.
  value?: string                      // The controlled value.
  defaultValue?: string               // The initial, uncontrolled value.
  direction?: 'vertical' | 'horizontal'  // how the GROUP's options are laid out. It lives in the group's master, not in the atom. Default: 'vertical'.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void  // Notifies the value change.
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  inputRef?: Ref<unknown>             // The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's RadioGroup not listed above
  // required: a name: `legend`, `aria-label`, `aria-labelledby` —one of them
}
```

<!-- prosa:props -->

**Two exports, composed the way MUI composes them.** `NeoRadioButton` is the single radio with its required `label`; `NeoRadioGroup` is the `<fieldset>` with its required `legend`, and it takes the radios as children, like MUI's `RadioGroup`. The selection travels in the group's `value` (or `defaultValue`), and `disabled` on the group disables every radio. The master draws the radio and its group separately, and so does the code; a radio is never used alone.

```jsx
<NeoRadioGroup name="plan" legend="Payment frequency" defaultValue="monthly">
  <NeoRadioButton value="monthly" label="Monthly" />
  <NeoRadioButton value="yearly" label="Yearly" />
</NeoRadioGroup>
```

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

The radio is an icon: a single vector (ring + dot) whose `fill` carries the color. The unchecked ring uses a **border** token, to match the inputs' border; the checked ring and dot use an **icon** token.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `control` | default | fill | `--border--base--default` |
| `control` | selected | fill | `--icon--base--default` |
| `control` | hover | fill | `--border--base--focus` |
| `control` | focus | outline | `--focus--ring--default` |
| `control` | focus | box-shadow | `--focus--gap--default` |
| `control` | disabled | fill | `--border--base--disabled` |
| `control` | disabled-selected | fill | `--icon--base--disabled` |
| `label` | default | color | `--text--base--default` |
| `label` | disabled | color | `--text--base--disabled` |
| `label` | selected | color | `--text--base--default` |
| `label` | focus | color | `--text--base--default` |
| `label` | hover | color | `--text--base--default` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-none` · 0px |
| `root` | height | — | 44px |
| `control-wrapper` | width | — | 40px |
| `control-wrapper` | height | — | 44px |
| `control` | width | — | 24px |
| `control` | height | — | 24px |
| `control` | border-radius | — | `--neo-radius-pill` · 999px |
| `control` | border-width | — | `--neo-stroke-sm` · 2px |
| `group` | gap | — | `--neo-space-xs` · 4px |
| `group` | padding-block | — | `--neo-space-none` · 0px |

<!-- prosa:layout -->

The master declares no gap between control and label: the spacing comes from the 40px wrapper with the 24px control centered inside it. The control is a circle, so its radius is the pill token (effective radius 12px on a 24px control).

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `label` | — | `Body/lg-Regular` | 16px | 400 | 24px |

---

## Motion

| Motion | Element | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|---|
| `hover` | `control` | state | 200 ms | cubic-bezier(0.4, 0, 0.2, 1) | — |

---

## HTML

<!-- prosa:html -->

```html
<!-- The anatomy is dictated by the CSS: the input goes INSIDE the wrapper and as a sibling
     immediately before the control (`input:checked + .radio__control`). The input is invisible
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
      <span class="radio__control"><span class="radio__dot"></span></span>
    </span>
    <span class="radio__label">Mensual</span>
  </label>

  <label class="radio">
    <span class="radio__wrapper">
      <input type="radio" name="frecuencia-h" value="anual" checked>
      <span class="radio__control"><span class="radio__dot"></span></span>
    </span>
    <span class="radio__label">Anual</span>
  </label>
</fieldset>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `input` | `<input>` | `type="radio"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | ENTERS THE GROUP, with focus on the selected one (or the first if none is). The whole group is ONE tab stop. |
| `Shift + Tab` | leaves the group |
| `→ ↓` | moves focus AND selects the next one |
| `← ↑` | moves focus AND selects the previous one |

---

## Rules

| Limit | When exceeded |
|---|---|
| **options per group:** at most ~6 options per group | more options are harder to scan in an open list — with more, a <select> |

| When | Then |
|---|---|
| `disabled=true` | state cannot be focus or hover |
| always | the group must be named |

<!-- prosa:rules -->

- Only one option can be selected per group: selecting one deselects the others.
- Do not use it in isolation: a radio button without a group loses its exclusivity semantics.
- The selection is shown with the inner dot, not only with color: do not rely only on the fill.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`checkbox`](checkbox.md) | the selection is multiple and not exclusive |
| [`select`](select.md) | there are so many options that showing them all takes up too much space |

---

## Accessibility

- THE LABEL IS REQUIRED AND VISIBLE (C7): it goes in a <label for> pointing to the control's id. A form control without a visible label can be neither operated nor understood. ONE DECLARED EXCEPTION: when the control is embedded in another component that already renders the text —a card with its own title and description that only needs the action— the host renders the label and the control references it with `aria-labelledby` pointing at a real <label>. The label is not hidden, it moves: what has to be visible still is. `aria-label` and `placeholder` do not replace it.
- The active area includes the label (C8): it activates by tapping the text, not just the box.
- Disabled carries the native `disabled`, and only that: ARIA in HTML asks authors not to write `aria-disabled="true"` on an element that has it.
- The focus ring is triggered only by the keyboard (C4).
- The whole group is ONE tab stop and the arrows SELECT as they move — they do not just move focus. That is the difference from checkbox, where each option is its own tab stop.
- The shared `name` is what makes them exclusive: without it, two radios do not exclude each other even if they look grouped.
- The group needs a <legend> or `aria-labelledby`: without it the options are announced on their own.

<!-- prosa:accessibility -->

- Touch area: the row measures 44 high, well above the 24×24 minimum of WCAG 2.5.8 AA, which is the level the system aims for (44×44 is 2.5.5, level AAA).
- Focus is always visible.

<!-- /prosa:accessibility -->
