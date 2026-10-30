<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Input File

> **Figma (source of truth):** [❖ Input File](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40005238-86591) — visual validation against the master.

<!-- prosa:intro -->

A field to attach one file from the device: the person chooses it, or drops it on the field, and sees its name and size before sending the form. It shares the skeleton of the field family, with the label above, the box and the help text below. For a text the person types it is `text-field`; for several files at once Neo has no component yet.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `error-type` | none · max-size · invalid-file — Figma only: it does not reach the API |
| `label-wrap` | false · true — Figma only: it does not reach the API |
| `state` | default · focus · loading · filled · read-only · disabled · error |
| `placeholder` | text |
| `file-name` | text |
| `file-size` | text |
| `helper-text` | true · false — default `true` |

<!-- prosa:properties -->

The label row, the description and the mark come from the shared piece `_field/label`, and the help text and the error message from `_field/helper`, as in every field of the family. `placeholder` is the text of the empty box, and `file-name` and `file-size` are what the box shows once there is a file. `error-type` only changes the message of the error: in code the message is the `helperText` the product writes, so it does not reach the API as a prop.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoInputFileProps {
  label?: ReactNode                   // The visible text of the component.
  required?: boolean                  // The field is required: it sets the native `required` and `aria-required`. The asterisk it draws next to the label is DEPRECATED and stays until the next major; say it with `mark` instead.
  helperText?: ReactNode              // The help text under the field. In `error` this same slot says the error message: they are not two.
  loading?: boolean                   // While the file uploads or is checked: the box says «Cargando archivo» with a spinner, the input carries `aria-busy`, and the field cannot be changed until it ends.
  readOnly?: boolean                  // It can be read but not edited.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  error?: boolean                     // The value does not pass validation. The message goes in the same `helperText` slot.
  tooltip?: ReactNode                 // The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it.
  description?: ReactNode             // The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node.
  mark?: string                       // The text of the mark at the end of the label row: «Requerido» or «Opcional» (end-user text, in Spanish). It replaces the asterisk of `required`; the field does not write it on its own.
  tooltipLabel?: string               // The accessible name of the ⓘ button. By default «Ayuda sobre <label>» (end-user text, in Spanish); pass it when that phrase does not name the help well.
  id?: string                         // The control id, to link the label and the descriptions.
  accept?: string                     // The file types the picker offers, as in the native `accept` (".pdf,.jpg,.png"). It only filters the picker: the person can still choose another type, so the product checks the file in `onChange`.
  fileName?: string | null            // The name of a file that is already there: the one already sent, in `readOnly`, or the one the product keeps between steps. Without it the field shows the file the person chooses or drops.
  fileSize?: number | string          // The size of that file. A number, in bytes, is written as the master draws it («2,4 MB»); a text is shown as is.
  loadingText?: ReactNode             // The text of the box while `loading`. By default «Cargando archivo» (end-user text, in Spanish).
  removeLabel?: string                // The accessible name of the button that removes the file. By default «Quitar» and the file name.
  onRemove?: () => void               // Called when the person removes the file with the trash button. The field empties its input and returns the focus to it; a controlled field also clears `fileName`.
  inputProps?: Record<string, unknown>  // Raw attributes for the `<input>`. They win over `inputMode` and `maxLength`, which are the two shortcuts.
  inputRef?: Ref<unknown>             // The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's OutlinedInput not listed above
  // required: a name: `label`, `aria-label`, `aria-labelledby` —one of them
}
```

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `label` | default | color | `--text--base--default` |
| `label` | focus | color | `--text--base--default` |
| `label` | loading | color | `--text--base--default` |
| `label` | filled | color | `--text--base--default` |
| `label` | read-only | color | `--text--base--default` |
| `label` | disabled | color | `--text--base--disabled` |
| `label` | error | color | `--text--semantic--error` |
| `tooltip` | default | fill | `--icon--semantic--info` |
| `tooltip` | loading | fill | `--icon--semantic--info` |
| `description` · `mark` | default | color | `--text--base--secondary` |
| `description` · `mark` | focus | color | `--text--base--secondary` |
| `description` · `mark` | loading | color | `--text--base--secondary` |
| `description` · `mark` | filled | color | `--text--base--secondary` |
| `description` · `mark` | read-only | color | `--text--base--secondary` |
| `description` · `mark` | disabled | color | `--text--base--disabled` |
| `description` · `mark` | error | color | `--text--base--secondary` |
| `input-container` | default | background | `--fill--base--default` |
| `input-container` | default | border | `--border--base--default` |
| `input-container` | focus | background | `--fill--base--default` |
| `input-container` | focus | outline | `--focus--ring--default` |
| `input-container` | focus | box-shadow | `--focus--gap--default` |
| `input-container` | loading | background | `--fill--base--default` |
| `input-container` | loading | border | `--border--base--default` |
| `input-container` | filled | background | `--fill--base--default` |
| `input-container` | filled | border | `--border--base--default` |
| `input-container` | read-only | background | `--fill--base--medium` |
| `input-container` | read-only | border | `--border--base--default` |
| `input-container` | disabled | background | `--fill--base--disabled` |
| `input-container` | disabled | border | `--border--base--disabled` |
| `input-container` | error | background | `--fill--base--default` |
| `input-container` | error | border | `--border--semantic--error-solid` |
| `icon` | default | fill | `--icon--base--default` |
| `icon` | disabled | fill | `--icon--base--disabled` |
| `placeholder` | default | color | `--text--base--secondary` |
| `placeholder` | disabled | color | `--text--base--disabled` |
| `loading-text` | loading | color | `--text--base--secondary` |
| `file-name` | default | color | `--text--base--default` |
| `file-size` | default | color | `--text--base--secondary` |
| `remove` | default | background | `--fill--tertiary--default` |
| `remove` | default | fill | `--icon--base--default` |
| `helper` | default | color | `--text--base--secondary` |
| `helper` | focus | color | `--text--base--secondary` |
| `helper` | loading | color | `--text--base--secondary` |
| `helper` | filled | color | `--text--base--secondary` |
| `helper` | read-only | color | `--text--base--secondary` |
| `helper` | disabled | color | `--text--base--disabled` |
| `helper` | error | color | `--text--semantic--error` |
| `feedback` | error | color | `--text--semantic--error` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-xs` · 4px |
| `header` | gap | — | `--neo-space-xs` · 4px |
| `label-row` | gap | — | `--neo-space-xs` · 4px |
| `tooltip` | width | — | 16px |
| `tooltip` | height | — | 16px |
| `input-container` | height | — | 44px |
| `input-container` | padding-inline | — | `--neo-space-md` · 12px |
| `input-container` | padding-block | — | `--neo-space-sm` · 8px |
| `input-container` | gap | — | `--neo-space-sm` · 8px |
| `input-container` | border-radius | — | `--neo-radius-sm` · 8px |
| `input-container` | border-width | — | `--neo-stroke-xs` · 1px |
| `icon` | width | — | 24px |
| `icon` | height | — | 24px |
| `spinner` | width | — | 32px |
| `spinner` | height | — | 32px |
| `file-end` | gap | — | `--neo-space-xs` · 4px |
| `remove` | width | — | 32px |
| `remove` | height | — | 32px |
| `helper` | gap | — | `--neo-space-sm` · 8px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `label` | — | `Body/lg-Medium` | 16px | 500 | 24px | — |
| `description` | — | `Body/md-Regular` | 14px | 400 | 20px | — |
| `mark` | — | `Caption/sm-Regular` | 12px | 400 | 16px | — |
| `placeholder` | — | `Body/lg-Regular` | 16px | 400 | 24px | 1 line |
| `loading-text` | — | `Body/lg-Regular` | 16px | 400 | 24px | 1 line |
| `file-name` | — | `Body/lg-Regular` | 16px | 400 | 24px | 1 line |
| `file-size` | — | `Body/md-Regular` | 14px | 400 | 20px | — |
| `helper` | — | `Body/md-Regular` | 14px | 400 | 20px | — |

---

## HTML

<!-- prosa:html -->

```html
<!-- Empty. The real <input type="file"> lives inside the box, visually hidden and reachable with Tab;
     the label points to it with `for`. It goes right after the icon, so focus reaches it before the
     button to remove. A click anywhere on the box opens the file picker: with the plain
     layer, whoever uses it forwards the click to the input. input-file.css loads after text-field.css. -->
<div class="field">
  <label class="field__label" for="cert">Certificado de alta</label>
  <div class="field__input-wrapper field__input-wrapper--file">
    <span class="field__icon"><svg aria-hidden="true"><use href="#system-paperclip"></use></svg></span>
    <input type="file" class="field__file-native" id="cert" accept=".pdf,.jpg,.jpeg,.png" aria-describedby="cert-helper">
    <span class="field__file-text">Selecciona un archivo</span>
  </div>
  <span class="field__helper" id="cert-helper">PDF, JPG o PNG, hasta 5 MB</span>
</div>
```

```html
<!-- With a file. The name truncates at the end and joins `aria-describedby`, so the screen reader says
     which file is attached. The button to remove it is outside any label and says which file it removes. -->
<div class="field field--filled">
  <label class="field__label" for="cert2">Certificado de alta</label>
  <div class="field__input-wrapper field__input-wrapper--file">
    <span class="field__icon"><svg aria-hidden="true"><use href="#system-paperclip"></use></svg></span>
    <input type="file" class="field__file-native" id="cert2" aria-describedby="cert2-name cert2-helper">
    <span class="field__file-name" id="cert2-name">certificado-alta.pdf</span>
    <span class="field__file-end">
      <span class="field__file-size">2,4 MB</span>
      <button type="button" class="btn btn--tertiary btn--small btn--icon-only field__file-remove" aria-label="Quitar certificado-alta.pdf">
        <svg class="icon--sm" aria-hidden="true"><use href="#system-trash"></use></svg>
      </button>
    </span>
  </div>
  <span class="field__helper" id="cert2-helper">PDF, JPG o PNG, hasta 5 MB</span>
</div>
```

```html
<!-- In error: the message takes the slot of the help text, with the alert icon before it. The file stays,
     with its button to remove it, so the person can take it out and choose another. -->
<div class="field field--error">
  <label class="field__label" for="cert3">Certificado de alta</label>
  <div class="field__input-wrapper field__input-wrapper--file">
    <span class="field__icon"><svg aria-hidden="true"><use href="#system-paperclip"></use></svg></span>
    <input type="file" class="field__file-native" id="cert3" aria-invalid="true" aria-describedby="cert3-name cert3-msg">
    <span class="field__file-name" id="cert3-name">escaneo-completo.pdf</span>
    <span class="field__file-end">
      <span class="field__file-size">6,8 MB</span>
      <button type="button" class="btn btn--tertiary btn--small btn--icon-only field__file-remove" aria-label="Quitar escaneo-completo.pdf">
        <svg class="icon--sm" aria-hidden="true"><use href="#system-trash"></use></svg>
      </button>
    </span>
  </div>
  <span class="field__feedback" id="cert3-msg" role="alert">El archivo supera el máximo de 5 MB</span>
</div>
```

```html
<!-- Loading, while the file uploads or is checked. The text carries `role="status"`, so the screen reader
     announces it without moving the focus, and the input carries `aria-busy`. The spinner is small and
     decorative. With the plain layer, whoever uses it blocks the click and the drop until it ends. -->
<div class="field field--loading">
  <label class="field__label" for="cert4">Certificado de alta</label>
  <div class="field__input-wrapper field__input-wrapper--file">
    <span class="field__icon"><svg aria-hidden="true"><use href="#system-paperclip"></use></svg></span>
    <input type="file" class="field__file-native" id="cert4" aria-busy="true" aria-describedby="cert4-helper">
    <span class="field__file-loading" role="status">Cargando archivo</span>
    <span class="spinner spinner--small field__file-spinner" aria-hidden="true"></span>
  </div>
  <span class="field__helper" id="cert4-helper">PDF, JPG o PNG, hasta 5 MB</span>
</div>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `input` | `<input>` | `aria-invalid="false"` · `aria-invalid="true"` (error=true) · `type="file"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the field, then to the button to remove the file if there is one, and to the ⓘ if there is one |
| `Enter` | opens the file picker |
| `Space` | opens the file picker |
| `Escape` | closes the ⓘ tooltip, if it is open |

---

## Rules

| Limit | When exceeded |
|---|---|
| **label:** Keep it short: 1–3 words | If it is longer and does not fit on one line, it wraps to the next; it is never cut (`label-wrap`). |
| **file-name:** 1 line | it truncates at the end with «…»; the full name shows on hover, as the native title of the input, and the screen reader reads it whole because the name joins `aria-describedby`. |

| When | Then |
|---|---|
| `state=default\|focus\|loading\|filled\|read-only\|disabled` | error-type is none |
| `state=error` | error-type cannot be none |
| `state=error` | feedbackMessage must be declared |

<!-- prosa:rules -->

- **One file per field.** Dropping several files takes the first one. For several files at once, `file-upload` (pending in Neo).
- **Dragging a file over the box looks like the hover**, and dropping it is the same as choosing it.
- **The name truncates at the end**, in one line. The full name shows on hover, as the native `title` of the input, and the screen reader reads it whole, because the name joins `aria-describedby`.
- **The error always carries a message**, and the message says what to do: «Formato no permitido. Usa PDF, JPG o PNG». A required field sent empty is an `invalid-file` error too.
- **The component does not validate the file.** The type and size it accepts are product rules: the product checks them in `onChange` and passes `error` and `helperText`. `accept` only filters the picker, and the person can still choose another type.
- **`loading` is while the file uploads or is checked.** The box says «Cargando archivo» and shows the spinner; the field cannot be changed until it ends.
- **The mark replaces the asterisk**, as in every field: «Requerido» or «Opcional» with `mark`.
- **The label wraps: it is never cut.** A long label goes on as many lines as it needs, and with the ⓘ, its last word and the ⓘ stay together on the same line. In Figma the master wraps it with `label-wrap`, off by default and with no cap of lines; the code always wraps it.
- `read-only` shows the file already sent, with its name and size and no button to remove it; `disabled` excludes the field from the form.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`text-field`](text-field.md) | the person types the value |

---

## Accessibility

- THE LABEL IS VISIBLE AND STATIC, above the field (C7), as in every field of the family.
- The control is the native `<input type="file">`, visually hidden and not `display: none`: Tab reaches it and the form sends it. It goes right after the icon, before what the box shows: it covers the whole box, so focus reaches it before the button to remove (WCAG 2.4.3).
- With a file, its name joins `aria-describedby`, so the screen reader says which file is attached.
- The help text and the error message are ONE slot: in error the slot says the message, with `role="alert"`, and `aria-describedby` points to it.
- With an error, the input carries `aria-invalid="true"`.
- «Cargando archivo» carries `role="status"`, so it is announced without moving the focus.
- The button to remove says which file it removes («Quitar certificado-alta.pdf»), and after removing, focus goes back to the input.
- Read-only and loading do not open the picker, by click or by keyboard. Loading carries `aria-busy="true"`. Read-only carries `aria-disabled="true"`: a file input has no `readonly` in HTML and ARIA in HTML does not allow `aria-readonly` on it, so the field stays focusable, reads its file and says it cannot be changed.

<!-- prosa:accessibility -->

- **The control is the native `<input type="file">`**: Tab reaches it, and Enter or Space opens the picker. It is visually hidden, not `display: none`, so it keeps its place in the tab order and in the form.
- **WCAG 2.4.7 (Focus Visible)**: the focus ring shows only when focus arrives by keyboard, with the `.field--focus` class, as in the other fields.
- **«Cargando archivo» carries `role="status"`**, so the screen reader announces it without moving the focus.
- **The button to remove says which file it removes** («Quitar certificado-alta.pdf»), and after removing, focus goes back to the input.
- **WCAG 2.5.8 (Target Size, AA)**: the button to remove measures 32×32.

<!-- /prosa:accessibility -->
