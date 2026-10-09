<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Checkbox

> **Figma (source of truth):** [❖ Checkbox](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002312-6388) — visual validation against the master.

<!-- prosa:intro -->

Independent multiple selection. For exclusive selection use `radio-button`; for an immediate on/off use `toggle`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `disabled` | false · true |
| `state` | default · hover · focus · selected |
| `label` | text |
| `text` | true · false — default `true` |

<!-- prosa:properties -->

`text=false` does not remove the label, it hides it. The label is still required (C7): with `hideLabel` it stays in the DOM and still names the control, so a screen reader announces it. Use it where the context already says what the control is —a table row, a list with its own heading—, never to save space in a form.

`focus` is exclusive with `default` and `selected` in the master but not in the DOM: the focus ring adds to the checked state, it does not replace it.

`checkbox/group` is its own master, vertical only in the MVP.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoCheckboxProps {
  label?: ReactNode                   // The visible text of the component.
  checked?: boolean                   // On.
  defaultChecked?: boolean            // The initial, uncontrolled state of `checked`.
  indeterminate?: boolean             // Neither checked nor unchecked: the state of a parent whose children are mixed.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void  // Notifies the value change.
  id?: string                         // The control id, to link the label and the descriptions.
  hideLabel?: boolean                 // Hides the label from view and keeps it for screen readers: the control still has a name. It is `text=false` in the master.
  inputRef?: Ref<unknown>             // The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Checkbox not listed above
  // required: a name: `label`, `aria-label`, `aria-labelledby` —one of them
}
```

---

## Tokens

### Color

<!-- prosa:color -->

The box is an icon: a single vector whose `fill` carries the color, and the ✓ is negative (knocked out, it shows the surface through). The unchecked box uses a **border** token, to match the inputs' border; the checked box uses an **icon** token.

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
| `control-wrapper` | width | — | 40px |
| `control-wrapper` | height | — | 44px |
| `control` | width | — | 24px |
| `control` | height | — | 24px |
| `control` | border-radius | — | `--neo-radius-xs` · 4px |
| `control` | border-width | — | `--neo-stroke-sm` · 2px |
| `group` | gap | — | `--neo-space-xs` · 4px |
| `group` | padding-block | — | `--neo-space-none` · 0px |

<!-- prosa:layout -->

The master declares no gap between control and label: the spacing comes from the 40px wrapper with the 24px box centered inside it, and the wrapper height is the touch target, not the visible box.

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
     immediately before the control (`input:checked + .checkbox__control`). The input is invisible
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

<!-- text=false: the label is HIDDEN, not removed — it stays in the DOM and still names the control.
     In React it is the `hideLabel` prop; in this layer, the `--hidden-label` modifier. -->
<label class="checkbox checkbox--hidden-label">
  <span class="checkbox__wrapper">
    <input type="checkbox">
    <span class="checkbox__control">
      <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#system-check"></use></svg>
    </span>
  </span>
  <span class="checkbox__label">Seleccionar fila</span>
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

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `input` | `<input>` | `type="checkbox"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the checkbox — EACH option is a tab stop |
| `Space` | checks or unchecks the one that has focus |
| `Shift + Tab` | goes back to the previous element |

---

## Rules

| When | Then |
|---|---|
| `disabled=true` | state cannot be focus or hover |

<!-- prosa:rules -->

- Each option works independently: checking one does not affect the others.
- Do not use it for exclusive selection — when only one option is valid, use `radio-button`.
- **The indeterminate state is implemented in both layers.** The mixed glyph is drawn, but without the DOM property `indeterminate` the screen reader announces the control as unchecked (WCAG 4.1.2): one state is seen and another is heard. The glyph and the property go together, always.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`radio-button`](radio-button.md) | the selection is exclusive: one and only one |
| [`toggle`](toggle.md) | the change is immediate and does not wait for a save |

---

## Accessibility

- THE LABEL IS REQUIRED AND VISIBLE (C7): it goes in a <label for> pointing to the control's id. A form control without a visible label can be neither operated nor understood. ONE DECLARED EXCEPTION: when the control is embedded in another component that already renders the text —a card with its own title and description that only needs the action— the host renders the label and the control references it with `aria-labelledby` pointing at a real <label>. The label is not hidden, it moves: what has to be visible still is. `aria-label` and `placeholder` do not replace it.
- The active area includes the label (C8): it activates by tapping the text, not just the box.
- Disabled carries the native `disabled`, and only that: ARIA in HTML asks authors not to write `aria-disabled="true"` on an element that has it.
- The focus ring is triggered only by the keyboard (C4).
- The group goes in a <fieldset> with a descriptive <legend>: without it, the options are announced on their own and nobody knows what they are options of.
- Indeterminate is the DOM property `indeterminate`, which the accessibility API exposes as mixed. `aria-checked` is not an alternative: ARIA in HTML forbids it on a checkbox input.

<!-- prosa:accessibility -->

- Touch area: the wrapper is 40×44px, which comfortably meets the 24×24 minimum of WCAG 2.5.8 AA, the level the system aims for. 44×44 is criterion 2.5.5 (AAA) and is not required here.
- Focus is always visible: do not suppress the outline in any context.
- WCAG 2.5.3: the label text describes the option, not the state.

<!-- /prosa:accessibility -->
