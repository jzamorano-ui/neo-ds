<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Text Area

> **Figma (source of truth):** [❖ Text Area](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40005128-73198) — visual validation against the master.

<!-- prosa:intro -->

A text area for a longer text the person types, on several lines: a remark, a reason, more information. It starts at the height the master measures and grows with the text. If the value fits in one line (a name, a RUT) it is `text-field`; if it comes from a closed set, `select`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `label-wrap` | false · true — not a prop: it follows from the text it receives | `_field/label` |
| `description` | false · true — not a prop: it follows what is composed inside | `_field/label` |
| `state` | default · active · writing · filled · focus · error · read-only · disabled | `text-area` |
| `helper-text` | true · false — default `true` | `text-area` |
| `placeholder` | text | `text-area` |
| `label` | text | `_field/label` |
| `description-text` | text | `_field/label` |
| `icon-tooltip` | true · false — default `false` | `_field/label` |
| `mark` | true · false — default `false` | `_field/label` |
| `↪ mark-text` | text | `_field/label` |

<!-- prosa:properties -->

The label row, the description and the mark come from the shared piece `_field/label`, and the help text, the error message and the counter from `_field/helper`: every field of the family exposes them one level, with the same names. `icon-tooltip` is the ⓘ next to the label, and its text is the help it opens. `description` adds a line of context under the label, and `mark` writes «Requerido» or «Opcional» at the end of the label row; both are off by default. The text area carries no icons or affixes.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoTextAreaProps {
  label?: ReactNode                   // The visible text of the component.
  required?: boolean                  // The field is required: it sets the native `required` and `aria-required`. The asterisk it draws next to the label is DEPRECATED and stays until the next major; say it with `mark` instead.
  helperText?: ReactNode              // The help text under the field. In `error` this same slot says the error message: they are not two.
  error?: boolean                     // The value does not pass validation. The message goes in the same `helperText` slot.
  readOnly?: boolean                  // It can be read but not edited.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  tooltip?: ReactNode                 // The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it.
  description?: ReactNode             // The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node.
  mark?: string                       // The text of the mark at the end of the label row: «Requerido» or «Opcional» (end-user text, in Spanish). It replaces the asterisk of `required`; the field does not write it on its own.
  counter?: ReactNode                 // The counter text. By default the field counts on its own against `maxLength` (written/limit); pass it only to show a different text.
  tooltipLabel?: string               // The accessible name of the ⓘ button. By default «Ayuda sobre <label>» (end-user text, in Spanish); pass it when that phrase does not name the help well.
  id?: string                         // The control id, to link the label and the descriptions.
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'  // The keyboard a phone opens. It goes to the `<input>`, not to the container.
  maxLength?: number                  // The maximum number of characters the control accepts. It goes to the `<input>`, and the visible counter counts against it: written/limit.
  inputProps?: Record<string, unknown>  // Raw attributes for the `<input>`. They win over `inputMode` and `maxLength`, which are the two shortcuts.
  value?: string | number             // The controlled value.
  defaultValue?: string | number      // The initial, uncontrolled value.
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void  // Notifies the value change.
  minRows?: number                    // The minimum height, in lines: the area starts there and grows with the text.
  maxRows?: number                    // The maximum height, in lines: there the area stops growing.
  rows?: number                       // A fixed height, in lines: with it the area does not grow, and `minRows` and `maxRows` do not apply.
  inputRef?: Ref<unknown>             // The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's OutlinedInput not listed above
  // required: a name: `label`, `aria-label`, `aria-labelledby` —one of them
}
```

<!-- prosa:props -->

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything**: the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

**The value and the placeholder are the same master layer and different colors**, so they are named separately.

> **In error, the help text gives way to the message.** The footer has ONE text slot: while there is no error it
> instructs, and when there is one it says the correction, with the counter on the right. In React both arrive by
> `helperText`, the only slot MUI exposes, and the theme paints it as an error. The message is always seen in
> `state=error`, even with `helper-text` off (WCAG 3.3.1).

> **The help icon is the semantic ⓘ (`semantic/info`), not a "?".** It is two-colored and self-colored: the SVG
> already brings the disc in `--icon--semantic--info` and the glyph in `--icon--base--contrast`, so the component's
> CSS only sets the size, and it does not turn off in `disabled`.

The description and the mark are `--text--base--secondary`, and `--text--base--disabled` in `disabled`. The focus ring (`state=focus`, keyboard navigation) has two layers: the outer ring `--focus--ring--default` and, inside the `input-container`, the contrast gap `--focus--gap--default`.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `label` | default | color | `--text--base--default` |
| `label` | active | color | `--text--base--default` |
| `label` | focus | color | `--text--base--default` |
| `label` | writing | color | `--text--base--default` |
| `label` | filled | color | `--text--base--default` |
| `label` | read-only | color | `--text--base--default` |
| `label` | error | color | `--text--semantic--error` |
| `label` | disabled | color | `--text--base--disabled` |
| `tooltip` | default | fill | `--icon--semantic--info` |
| `description` · `mark` | default | color | `--text--base--secondary` |
| `description` · `mark` | active | color | `--text--base--secondary` |
| `description` · `mark` | writing | color | `--text--base--secondary` |
| `description` · `mark` | filled | color | `--text--base--secondary` |
| `description` · `mark` | focus | color | `--text--base--secondary` |
| `description` · `mark` | error | color | `--text--base--secondary` |
| `description` · `mark` | read-only | color | `--text--base--secondary` |
| `description` · `mark` | disabled | color | `--text--base--disabled` |
| `input-container` | default | background | `--fill--base--default` |
| `input-container` | default | border | `--border--base--default` |
| `input-container` | active | background | `--fill--base--default` |
| `input-container` | active | border | `--border--base--focus` |
| `input-container` | focus | background | `--fill--base--default` |
| `input-container` | focus | outline | `--focus--ring--default` |
| `input-container` | focus | box-shadow | `--focus--gap--default` |
| `input-container` | writing | background | `--fill--base--default` |
| `input-container` | writing | border | `--border--base--focus` |
| `input-container` | filled | background | `--fill--base--default` |
| `input-container` | filled | border | `--border--base--default` |
| `input-container` | error | background | `--fill--base--default` |
| `input-container` | error | border | `--border--semantic--error-solid` |
| `input-container` | read-only | background | `--fill--base--medium` |
| `input-container` | read-only | border | `--border--base--default` |
| `input-container` | disabled | background | `--fill--base--disabled` |
| `input-container` | disabled | border | `--border--base--disabled` |
| `placeholder` · `counter` | default | color | `--text--base--secondary` |
| `placeholder` · `counter` | disabled | color | `--text--base--disabled` |
| `helper` | default | color | `--text--base--secondary` |
| `helper` | active | color | `--text--base--secondary` |
| `helper` | focus | color | `--text--base--secondary` |
| `helper` | writing | color | `--text--base--secondary` |
| `helper` | filled | color | `--text--base--secondary` |
| `helper` | read-only | color | `--text--base--secondary` |
| `helper` | error | color | `--text--semantic--error` |
| `helper` | disabled | color | `--text--base--disabled` |
| `feedback` | error | color | `--text--semantic--error` |
| `value` | default | color | `--text--base--default` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-xs` · 4px |
| `header` | gap | — | `--neo-space-xs` · 4px |
| `label-row` | gap | — | `--neo-space-xs` · 4px |
| `tooltip` | width | — | 16px |
| `tooltip` | height | — | 16px |
| `input-container` | min-height | — | 112px |
| `input-container` | padding-inline | — | `--neo-space-md` · 12px |
| `input-container` | padding-block | — | `--neo-space-md` · 12px |
| `input-container` | gap | — | `--neo-space-sm` · 8px |
| `input-container` | border-radius | — | `--neo-radius-sm` · 8px |
| `input-container` | border-width | — | `--neo-stroke-xs` · 1px |
| `footer` | gap | — | `--neo-space-sm` · 8px |
| `helper` | gap | — | `--neo-space-sm` · 8px |

<!-- prosa:layout -->

> **The text area carries 12 of vertical air, not the 8 of the one-line field.** It starts at 112, the height the
> master measures, and grows with the content: that is a minimum, not a cap. In React `rows` fixes the height and
> `maxRows` stops the growth.

Between the label and the description there are 4. The mark goes at the end of the label row, aligned to the bottom: 8 from the label, or 16 from the description when there is one.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `label` | — | `Body/lg-Medium` | 16px | 500 | 24px |
| `description` | — | `Body/md-Regular` | 14px | 400 | 20px |
| `mark` | — | `Caption/sm-Regular` | 12px | 400 | 16px |
| `placeholder` | — | `Body/lg-Regular` | 16px | 400 | 24px |
| `helper` | — | `Body/md-Regular` | 14px | 400 | 20px |
| `counter` | — | `Body/md-Regular` | 14px | 400 | 20px |
| `value` | — | `Body/lg-Regular` | 16px | 400 | 24px |

---

## HTML

<!-- prosa:html -->

```html
<!-- Text area with a counter. The wrapper carries its modifier: the text area does NOT share the padding
     of the input (12 versus 8) and starts at 112 high, which is what the control measures in the master.
     It grows with the content: 112 is the minimum, not a cap. text-area.css loads after text-field.css. -->
<div class="field">
  <label class="field__label" for="motivo">Motivo</label>
  <div class="field__input-wrapper field__input-wrapper--textarea">
    <textarea class="field__input" id="motivo" maxlength="200" aria-describedby="motivo-counter"></textarea>
  </div>
  <div class="field__footer">
    <span class="field__counter" id="motivo-counter">0 / 200</span>
  </div>
</div>
```

```html
<!-- With a description and the mark. The header is a grid: the label on the first row, the description
     under it, and the mark at the end of the row of the description. The description joins
     `aria-describedby`, before the help text. The mark is what is seen; `required` on the <textarea>
     is what makes the form ask for it and the screen reader say so. -->
<div class="field">
  <div class="field__header field__header--description">
    <label class="field__label" for="obs">Observaciones</label>
    <span class="field__description" id="obs-description">Cuéntanos lo que no alcanzaste a decir en el formulario.</span>
    <span class="field__mark">Requerido</span>
  </div>
  <div class="field__input-wrapper field__input-wrapper--textarea">
    <textarea class="field__input" id="obs" required aria-describedby="obs-description obs-helper"></textarea>
  </div>
  <div class="field__footer">
    <span class="field__helper" id="obs-helper">Escribe con tus palabras; no hace falta un formato.</span>
  </div>
</div>
```

```html
<!-- Text area in error: the message takes the slot of the help text, and the counter stays. -->
<div class="field field--error">
  <label class="field__label" for="obs-err">Observaciones</label>
  <div class="field__input-wrapper field__input-wrapper--textarea">
    <textarea class="field__input" id="obs-err" maxlength="200"
              aria-invalid="true" aria-describedby="obs-err-msg"></textarea>
  </div>
  <div class="field__footer">
    <span class="field__feedback" id="obs-err-msg" role="alert">Escribe al menos 20 caracteres.</span>
    <span class="field__counter">8 / 200</span>
  </div>
</div>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `textarea` | `<textarea>` | `aria-invalid="false"` · `aria-invalid="true"` (error=true) · never `aria-readonly` (readOnly=true) |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the field, and then to the ⓘ if there is one |
| `Enter` | inserts a line break. It does not confirm the value or release focus. |
| `Escape` | closes the ⓘ tooltip, if it is open |

---

## Rules

| Limit | When exceeded |
|---|---|
| **label:** Keep it short: 1–3 words | If it is longer and does not fit on one line, it wraps to the next; it is never cut (`label-wrap`). |

| When | Then |
|---|---|
| `state=error` | feedbackMessage must be declared |

<!-- prosa:rules -->

- **The label wraps: it is never cut.** A long label goes on as many lines as it needs, and with the ⓘ, its last word and the ⓘ stay together on the same line. In Figma the master wraps it with `label-wrap`, off by default and with no cap of lines; the code always wraps it.
- **The help text wraps too**, it is not cut with an ellipsis.
- **The placeholder has no cap**: a text area wraps the text, that is what it exists for.
- **The mark replaces the asterisk.** Write «Requerido» or «Opcional» with `mark`. `required` still makes the form ask for the value and the screen reader say so; the asterisk it draws is deprecated and stays until the next major.
- `label` always visible: the placeholder does not replace it.
- **`active` vs `focus`:** when selecting the field it becomes active for typing (`active`, 2px focus border); **keyboard navigation** also shows the **focus ring** (`focus`, ring+gap). `writing` = typing in progress.
- **Ring = keyboard only.** The focus ring appears **only** when focus arrives by keyboard (`Tab`); **with a mouse it is not shown** (there the 2px `active` border communicates).
- **`writing` is illustrative, not a dev state.** It is visually identical to `active`; it comes on its own from the value typed.
- **State combinations:** `filled` is orthogonal to the interaction (`active`/`focus`/`writing`) and to `error`: they coexist. `disabled` and `read-only` cancel the interaction.
- `read-only` ≠ `disabled`: read-only allows reading and copying; disabled excludes the field from the form.
- In `state=error` always include a text message: do not rely only on the border color.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`text-field`](text-field.md) | the value fits in one line |
| [`select`](select.md) | the value comes from a short, closed set |

---

## Accessibility

- THE LABEL IS VISIBLE AND STATIC, above the field (C7). It does not float like MUI's: that is why the field is composed with its own label.
- The helper text and the error message are ONE slot: in error the slot says the error message, and `aria-describedby` points to it, alongside `aria-labelledby`. The description, when there is one, is referenced from `aria-describedby` too.
- With an error, the field carries `aria-invalid="true"` AND `aria-describedby` pointing to the message. Verified by rendering, not by reading — that check caught the combobox regression when it migrated to TextField.
- The error message carries `role="alert"`: it appears after the person has already moved past the field, so it has to be announced.
- Read-only carries the native `readonly`, and only that: ARIA in HTML asks authors not to write `aria-readonly` on an element that has it.
- The ⓘ help icon is a `<button type="button">` with an `aria-label` that names the help («Qué es el RUT», not «ayuda»); its `<svg>` is `aria-hidden`.

<!-- prosa:accessibility -->

- **WCAG 2.4.7 (Focus Visible)**: `state=focus` shows the focus ring in keyboard navigation, and **only** there. The ring is governed by the `.field--focus` class, **not** by `:focus-visible`, which on a `<textarea>` also activates with a mouse. In React, `NeoTextArea` turns it on by detecting the input modality (`keydown` → keyboard · `pointerdown` → pointer); with the plain CSS layer, whoever uses it does the same.
- **WCAG 2.4.11 / 2.4.13 (Focus Appearance)**: the ring uses two layers (ring + contrast gap) with thickness `--neo-stroke-focus-ring-width`, visible on any background.
- **The description is part of what the field says.** It joins `aria-describedby` before the help text, so the screen reader reads it after the name. The mark is visible text outside the label: it does not change the accessible name, and `required` is what announces the requirement.
- **WCAG 2.5.8 (Target Size, AA)**: the ⓘ measures 16px, so the button that wraps it provides a click area of at least 24×24, without enlarging the icon.

<!-- /prosa:accessibility -->
