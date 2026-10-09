<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Text Field

> **Figma (source of truth):** [❖ Text Field](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002482-2745) — visual validation against the master.

<!-- prosa:intro -->

Two components, one same system: `input` for short text on one line; `text-area` for long text on several lines. The value is not in a list: a name, a comment, a RUT. For free text only — to choose among options use `select` or `radio-button`; if the set is long and searching helps, `combobox`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `type` | input · text-area — default `input` |
| `state` | default · active · writing · filled · focus · error · read-only · disabled |
| `label` | text |
| `placeholder` | text |
| `prefix-text` | text |
| `suffix-text` | text |
| `helper-text` | true · false — default `true` |
| `feedback` | true · false — default `true` |
| `icon-left` | true · false — default `true` |
| `icon-right` | true · false — default `true` |
| `icon-tooltip` | true · false — default `true` |
| `↪ counter` | true · false — default `true` |

<!-- prosa:properties -->

Icons have a defined role, never ambiguous: `icon-left` is decorative, `icon-right` is functional (clear, show password) and then it is a button with an accessible name. `prefix` and `suffix` are fixed text affixes inside the border (e.g. «+56», «UF»). `icon-tooltip` is the ⓘ next to the label; its `state``hover` keeps the tooltip open in a static mock-up, and its `tooltip` › `label` is the text of that tooltip.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoTextFieldProps {
  label?: ReactNode                   // The visible text of the component.
  required?: boolean                  // The field is required.
  helperText?: ReactNode              // The help text under the field. In `error` this same slot says the error message: they are not two.
  error?: boolean                     // The value does not pass validation. The message goes in the same `helperText` slot.
  readOnly?: boolean                  // It can be read but not edited.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  prefix?: ReactNode                  // Fixed text before the value, inside the border («+56»). It is not part of the value.
  suffix?: ReactNode                  // Fixed text after the value, inside the border («UF»). It is not part of the value.
  tooltip?: ReactNode                 // The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it.
  iconLeft?: string | ReactElement    // The icon before the text: the id of a system icon (`system-search`) or your own element.
  iconRight?: string | ReactElement   // The icon after the text: the id of a system icon (`system-chevron-right`) or your own element.
  counter?: ReactNode                 // The counter text. By default the field counts on its own against `maxLength` (written/limit); pass it only to show a different text.
  tooltipLabel?: string               // The accessible name of the ⓘ button. By default «Ayuda sobre <label>» (end-user text, in Spanish); pass it when that phrase does not name the help well.
  startAdornment?: ReactNode          // The node that goes before the field, inside the border.
  endAdornment?: ReactNode            // The node that goes after the field, inside the border.
  id?: string                         // The control id, to link the label and the descriptions.
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'  // The keyboard a phone opens. It goes to the `<input>`, not to the container.
  maxLength?: number                  // The maximum number of characters the control accepts. It goes to the `<input>`, and the visible counter counts against it: written/limit.
  inputProps?: Record<string, unknown>  // Raw attributes for the `<input>`. They win over `inputMode` and `maxLength`, which are the two shortcuts.
  value?: string | number             // The controlled value.
  defaultValue?: string | number      // The initial, uncontrolled value.
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void  // Notifies the value change.
  inputRef?: Ref<unknown>             // The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's OutlinedInput not listed above
  // required: a name: `label`, `aria-label`, `aria-labelledby` —one of them
}

interface NeoTextAreaProps {
  label?: ReactNode                   // The visible text of the component.
  required?: boolean                  // The field is required.
  helperText?: ReactNode              // The help text under the field. In `error` this same slot says the error message: they are not two.
  error?: boolean                     // The value does not pass validation. The message goes in the same `helperText` slot.
  readOnly?: boolean                  // It can be read but not edited.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  tooltip?: ReactNode                 // The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it.
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

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

**The value and the placeholder are the same master layer —`Input Field` contains the cursor and `Input Placeholder`— and different colors**, so they are named separately.

> **In error, the helper is NOT shown.** The footer has ONE text slot, and when the field has an
> error that slot says the error: a single row with the `feedback-message` on the left and the
> counter on the right. The `helper-text` instructs while there is no error; when there is one, what
> should be read is the correction. The master draws it in the two `error` variants.
>
> **And that is why MUI is enough as is.** `TextField` exposes a single `helperText`: in error that slot
> carries the message and the theme paints it as such —red, with the alert icon—. **There is no need for a
> second `FormHelperText`**. The plain CSS layer still brings the two elements separately
> (`.field__helper` and `.field__feedback`) because they are two different things: in error the
> second is drawn, not both.

> **The help icon is the semantic ⓘ (`semantic/info`), not a "?".** It is the same in the 32 variants
> of `text-field · select · combobox`. It is **two-colored and self-colored**: the SVG already brings the
> disc in `--icon--semantic--info` and the glyph in `--icon--base--contrast` (see `packages/foundations/icons/icons.css`),
> so the component's CSS **only sets the size** — a `fill:` there does not apply. For the same reason
> **it does not turn off in `disabled`**: the color lives inside the icon. The rest of the field's icons
> (leading/trailing) do follow the state, because they use `currentColor`.

The focus ring (`state=focus`, keyboard navigation) has two layers: the outer ring `--focus--ring--default` and, inside the `input-container`, the contrast gap `--focus--gap--default`.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
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
| `label` | default | color | `--text--base--default` |
| `label` | active | color | `--text--base--default` |
| `label` | focus | color | `--text--base--default` |
| `label` | writing | color | `--text--base--default` |
| `label` | filled | color | `--text--base--default` |
| `label` | read-only | color | `--text--base--default` |
| `label` | error | color | `--text--semantic--error` |
| `label` | disabled | color | `--text--base--disabled` |
| `placeholder` · `counter` | default | color | `--text--base--secondary` |
| `placeholder` · `counter` | disabled | color | `--text--base--disabled` |
| `prefix-text` · `suffix-text` · `value` | default | color | `--text--base--default` |
| `helper` | default | color | `--text--base--secondary` |
| `helper` | active | color | `--text--base--secondary` |
| `helper` | focus | color | `--text--base--secondary` |
| `helper` | writing | color | `--text--base--secondary` |
| `helper` | filled | color | `--text--base--secondary` |
| `helper` | read-only | color | `--text--base--secondary` |
| `helper` | error | color | `--text--semantic--error` |
| `helper` | disabled | color | `--text--base--disabled` |
| `feedback` | error | color | `--text--semantic--error` |
| `tooltip` | default | fill | `--icon--semantic--info` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-xs` · 4px |
| `label-row` | gap | — | `--neo-space-xs` · 4px |
| `input-container` | padding-inline | — | `--neo-space-md` · 12px |
| `input-container` | gap | — | `--neo-space-sm` · 8px |
| `input-container` | border-radius | — | `--neo-radius-sm` · 8px |
| `input-container` | border-width | — | `--neo-stroke-xs` · 1px |
| `input-container` | min-height | type=input | 44px |
| `input-container` | min-height | type=text-area | 112px |
| `input-container` | padding-block | type=input | `--neo-space-sm` · 8px |
| `input-container` | padding-block | type=text-area | `--neo-space-md` · 12px |
| `footer` | gap | — | `--neo-space-sm` · 8px |
| `helper` | gap | — | `--neo-space-sm` · 8px |
| `icon` | width | — | 24px |
| `icon` | height | — | 24px |
| `icon-right` | width | — | 24px |
| `icon-right` | height | — | 24px |
| `tooltip` | width | — | 16px |
| `tooltip` | height | — | 16px |

<!-- prosa:layout -->

> **`input` and `text-area` do not carry the same vertical air.** The one-line one is a box of
> **8 + 24 + 8 = 40**, which expands to **44** for the touch target (`min-height`, content centered).
> The `text-area` carries **12** and starts at the height the master measures (112, about four lines) and grows with the content: that is a minimum, not a cap. The 44 of the one-line field is shared with `select` and `combobox`.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `label` | — | `Body/lg-Medium` | 16px | 500 | 24px | — |
| `placeholder` | — | `Body/lg-Regular` | 16px | 400 | 24px | — |
| `prefix-text` | — | `Body/lg-Regular` | 16px | 400 | 24px | — |
| `suffix-text` | — | `Body/lg-Regular` | 16px | 400 | 24px | — |
| `helper` | — | `Body/md-Regular` | 14px | 400 | 20px | 1 line |
| `counter` | — | `Body/md-Regular` | 14px | 400 | 20px | — |
| `value` | — | `Body/lg-Regular` | 16px | 400 | 24px | — |

---

## HTML

<!-- prosa:html -->

```html
<!-- The BOX is `.field__input-wrapper`, not the <input>: border, padding, height and radius live there.
     A bare <input> inside `.field` receives NO styling — it is the structure the CSS
     and the master expect, and the same one select and combobox use. -->

<!-- Input -->
<div class="field">
  <!-- Mandatory: the CSS puts the asterisk (`::after`), it is not written in the text. The asterisk is only
       what is seen: `required` on the <input> is what makes the form ask for it and the screen reader say so. -->
  <label class="field__label field__label--required" for="email">Correo electrónico</label>
  <div class="field__input-wrapper">
    <!-- Prefix and suffix: fixed text inside the box, on the sides of the input. They go INSIDE the
         wrapper — a prefix outside the box loses the border and the height that define it. -->
    <span class="field__prefix">@</span>
    <input class="field__input" type="email" id="email" required
           placeholder="nombre@ejemplo.com" aria-describedby="email-helper">
    <span class="field__suffix">.cl</span>
  </div>
  <div class="field__footer">
    <span class="field__helper" id="email-helper">Usaremos este correo para confirmaciones.</span>
  </div>
</div>
```

```html
<!-- Input with an icon on the left (icon-left · decorative) -->
<div class="field">
  <label class="field__label" for="buscar">Buscar</label>
  <div class="field__input-wrapper">
    <!-- 24px and `icon--base--default`, measured in the master. It goes INSIDE the wrapper, before the input.
         Decorative: `aria-hidden`, because the label already names the field. -->
    <svg class="field__icon" aria-hidden="true"><use href="#system-search"></use></svg>
    <input class="field__input" type="search" id="buscar" placeholder="Nombre o RUT">
  </div>
</div>
```

```html
<!-- Input with an icon on the right (icon-right · functional: clear) -->
<div class="field">
  <label class="field__label" for="filtro">Filtro</label>
  <div class="field__input-wrapper">
    <input class="field__input" type="text" id="filtro" value="Providencia">
    <!-- Functional, not decorative: it is a BUTTON with an accessible name, not a loose <svg>. -->
    <button type="button" class="field__icon" aria-label="Limpiar el filtro">
      <svg aria-hidden="true"><use href="#system-close"></use></svg>
    </button>
  </div>
</div>
```

```html
<!-- Input with a help icon + tooltip -->
<div class="field">
  <div class="field__label-row">
    <!-- C5 · The label wraps, and its LAST WORD, the asterisk and the ⓘ go together in `field__label-tail`, which
         never breaks: the ⓘ never ends up alone on a line. The label is split in two <label> for the same control
         so the ⓘ stays out of both, and the control's name is the text of the two, without the ⓘ's. -->
    <label class="field__label" for="rut">Tu</label>
    <span class="field__label-tail"><label class="field__label" for="rut">RUT</label><!--
      The trigger is a BUTTON, not the <svg>: it has to be focusable by keyboard.
      The glyph measures 16px; the click area comes from the button, at least 24×24 (WCAG 2.5.8).
      --><button type="button" class="field__icon--tooltip"
            aria-label="Qué es el RUT" aria-describedby="rut-tip">
      <svg class="field__icon--tooltip" aria-hidden="true"><use href="#semantic-info"></use></svg>
    </button></span>
    <div id="rut-tip" role="tooltip" class="tooltip">Sin puntos y con guion.</div>
  </div>
  <div class="field__input-wrapper">
    <input class="field__input" type="text" id="rut">
  </div>
</div>
```

```html
<!-- Input in error -->
<div class="field field--error">
  <label class="field__label" for="email-err">Correo electrónico</label>
  <div class="field__input-wrapper">
    <input class="field__input" type="email" id="email-err"
           aria-invalid="true" aria-describedby="email-error">
  </div>
  <div class="field__footer">
    <span class="field__feedback" id="email-error" role="alert">Ingresa un correo válido.</span>
  </div>
</div>
```

```html
<!-- Text area with a counter. The wrapper carries its modifier: the text-area does NOT share the padding
     of the input (12 versus 8) and starts at 112 high, which is what the control measures in the master
     (about four lines). It grows with the content: 112 is the minimum, not a cap. -->
<div class="field">
  <label class="field__label" for="desc">Descripción</label>
  <div class="field__input-wrapper field__input-wrapper--textarea">
    <textarea class="field__input" id="desc" aria-describedby="desc-counter"></textarea>
  </div>
  <div class="field__footer">
    <span class="field__counter" id="desc-counter">0 / 200</span>
  </div>
</div>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `input` | `<input>` | `type="text"` (type=input) |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the field, and then to the ⓘ if there is one |
| `Enter` | in the one-line field (type=input), confirms what was typed and releases focus, so the field shows as filled. It does not stop a form from being submitted. In the text area, it inserts a line break |
| `Escape` | closes the ⓘ tooltip, if it is open |

---

## Rules

| Limit | When exceeded |
|---|---|
| **label:** 1–3 words | in the master it wraps to at most two lines, with the ⓘ beside it; the code wraps it as far as the text needs, so the required asterisk is never lost. Rewrite it shorter. |
| **helper text:** 1 line | the master and the code cut it with an ellipsis. Rewrite it shorter. |

| When | Then |
|---|---|
| `state=error` | feedbackMessage must be declared |
| `type=text-area` | the text-area carries no icons or affixes: no icon-left, no icon-right, no prefix, no suffix |

<!-- prosa:rules -->

- **`Input Label` wraps: it is never cut.** A long label goes on as many lines as it needs, so the required
  asterisk is always seen; with the ⓘ, its last word, the asterisk and the ⓘ stay together on the same line.
- **The label keeps to 1 to 3 words, and in Figma the master caps `Input Label` at 2 lines.** A label that does not fit
  in one line is set to Fill in the design and wraps up to 2 lines, with the ⓘ beside it. The component never cuts it:
  the code wraps as far as the text needs, so the required asterisk is never lost if a label breaks the rule.
- **`Helper Text` truncates to 1 line**, and the `Input Placeholder` **only in
`type=input`**: in the 8 `type=text-area` variants the placeholder has no cap, because a
  text-area wraps the text — that is what it exists for. What does not grow is
  the scaffolding around it.
  **And a clarification, because the count is misleading**: `Helper Text` exists in 15 of the 16 variants. The
  missing one is `type=text-area, state=error`, and **it is not missing the cap: it does not have the layer** — in error
  the text-area shows `Feedback Message` and `Character Count` in its place.
- `label` always visible — the placeholder does not replace it.
- **`active` vs `focus`:** when selecting the field it becomes active for typing (`active`, 2px focus border); **keyboard navigation** also shows the **focus ring** (`focus`, ring+gap). `writing` = typing in progress. Unlike `select`, the input does not need to open anything.
- **Ring = keyboard only.** The focus ring appears **only** when focus arrives by keyboard (`Tab`) — **with a mouse it is not shown** (there the 2px `active` border communicates). Do not rely on `:focus-visible` for this: on a text `<input>` it also fires with a mouse (see Accessibility).
- **`writing` is illustrative, not a dev state.** It is **visually identical to `active`** (same 2px focus border) — it exists to illustrate "the user is typing" in design. The consumer **does not implement a separate class**: it comes on its own from the value entered in the input.
- **State combinations:** `filled` (data entered) is **orthogonal** to the interaction (`active`/`focus`/`writing`) and to `error` — they coexist (e.g. `filled` + `focus`, `error` + `focus`). `disabled` and `read-only` **cancel** the interaction.
- `read-only` ≠ `disabled`: read-only allows reading and copying; disabled excludes the field from the form.
- In `state=error` always include a text message — do not rely only on the border color.
- Icons with a defined role — decorative (`aria-hidden`) or functional (`<button>` with `aria-label`). Never ambiguous.
- For free text only — to choose among options use `select` or `radio-button`.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`select`](select.md) | the value comes from a short, closed set |
| [`combobox`](combobox.md) | the set is long and it helps to search by typing |

---

## Accessibility

- THE LABEL IS VISIBLE AND STATIC, above the field (C7). It does not float like MUI's: that is why the field is composed with its own label.
- The helper text and the error message COEXIST: both are referenced from `aria-describedby`, alongside `aria-labelledby`. One does not replace the other.
- With an error, the field carries `aria-invalid="true"` AND `aria-describedby` pointing to the message. Verified by rendering, not by reading — that check caught the combobox regression when it migrated to TextField.
- The error message carries `role="alert"`: it appears after the person has already moved past the field, so it has to be announced.
- Read-only carries the native `readonly`, and only that: ARIA in HTML asks authors not to write `aria-readonly` on an element that has it.
- The ⓘ help icon is a `<button type="button">` with an `aria-label` that names the help («Qué es el RUT», not «ayuda»); its `<svg>` is `aria-hidden`.

<!-- prosa:accessibility -->

- **WCAG 2.4.7 (Focus Visible)** — `state=focus` shows the focus ring in keyboard navigation, and **only** there. **Implementation contract:** the ring is governed by the `.field--focus` class, **not** by `:focus-visible` — on a text `<input>``:focus-visible` also activates with a mouse and would break "keyboard only". In React, `NeoTextField` and `NeoTextArea` turn it on by detecting the input modality (`keydown` → keyboard · `pointerdown` → pointer); with the plain CSS layer, whoever uses it does the same.
- **WCAG 2.4.11 / 2.4.13 (Focus Appearance)** — the ring uses two layers (ring + contrast gap) with thickness `--neo-stroke-focus-ring-width`, visible on any background.
- **The help icon and its tooltip are ONE pattern, not two loose properties.** In Figma the ⓘ is one piece with its tooltip: in a prototype it shows the tooltip on mouse over, or on tap, and its text is written from the field. In the implementation they go together the same way: the button triggers the tooltip on `hover` and on `focus`, and `Escape` closes it. Turning on the icon without connecting the tooltip leaves a control that does nothing.
- **WCAG 2.5.8 (Target Size, AA) — the ⓘ help icon measures 16px, so the trigger provides the click area.** The glyph is 16 (`--neo-icon-size-xs`, what the master says); the element that wraps it and triggers the tooltip must reach **24×24 minimum** via padding, without enlarging the icon. Same criterion in `select` and `combobox`.
- **WCAG 1.4.11 (Non-text contrast)** — the ⓘ resolves a single pair, `--icon--semantic--info` (#0036AF) ↔ white: **9.78:1** both for the disc on `--surface--base--default` and for the glyph on the disc. Well above the required 3:1.

<!-- /prosa:accessibility -->
