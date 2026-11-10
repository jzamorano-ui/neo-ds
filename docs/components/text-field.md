<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Text Field

> **Figma (source of truth):** [❖ Text Field](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002482-2745) — visual validation against the master.

<!-- prosa:intro -->

Short text on one line: a name, an email, a RUT. The value is not in a list. For free text only: to choose among options use `select` or `radio-button`; if the set is long and searching helps, `combobox`. For long text on several lines, `text-area`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `label-wrap` | false · true — not a prop: it follows from the text it receives | `_field/label` |
| `description` | false · true — not a prop: it follows what is composed inside | `_field/label` |
| `state` | default · active · writing · filled · focus · error · read-only · disabled | `text-field` |
| `helper-text` | true · false — default `true` | `text-field` |
| `icon-right` | true · false — default `true` | `text-field` |
| `icon-left` | true · false — default `true` | `text-field` |
| `placeholder` | text | `text-field` |
| `↪ prefix-text` | text | `text-field` |
| `↪ suffix-text` | text | `text-field` |
| `label` | text | `_field/label` |
| `description-text` | text | `_field/label` |
| `icon-tooltip` | true · false — default `false` | `_field/label` |
| `mark` | true · false — default `false` | `_field/label` |
| `↪ mark-text` | text | `_field/label` |

<!-- prosa:properties -->

Icons have a defined role, never ambiguous: `icon-left` is decorative, `icon-right` is functional (clear, show password) and then it is a button with an accessible name. `prefix` and `suffix` are fixed text affixes inside the border (e.g. «+56», «UF»). The label row, the description and the mark come from the shared piece `_field/label`, and the help text, the error message and the counter from `_field/helper`: every field of the family exposes them one level, with the same names. `icon-tooltip` is the ⓘ next to the label, and its text is the help it opens. `description` adds a line of context under the label, and `mark` writes «Requerido» or «Opcional» at the end of the label row; both are off by default.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoTextFieldProps {
  label?: ReactNode                   // The visible text of the component.
  required?: boolean                  // The field is required: it sets the native `required` and `aria-required`. The asterisk it draws next to the label is DEPRECATED and stays until the next major; say it with `mark` instead.
  helperText?: ReactNode              // The help text under the field. In `error` this same slot says the error message: they are not two.
  error?: boolean                     // The value does not pass validation. The message goes in the same `helperText` slot.
  readOnly?: boolean                  // It can be read but not edited.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  prefix?: ReactNode                  // Fixed text before the value, inside the border («+56»). It is not part of the value.
  suffix?: ReactNode                  // Fixed text after the value, inside the border («UF»). It is not part of the value.
  tooltip?: ReactNode                 // The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it.
  description?: ReactNode             // The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node.
  mark?: string                       // The text of the mark at the end of the label row: «Requerido» or «Opcional» (end-user text, in Spanish). It replaces the asterisk of `required`; the field does not write it on its own.
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
> should be read is the correction.
>
> **And that is why MUI is enough as is.** `TextField` exposes a single `helperText`: in error that slot
> carries the message and the theme paints it as such: red, with the alert icon. **There is no need for a
> second `FormHelperText`**. The plain CSS layer still brings the two elements separately
> (`.field__helper` and `.field__feedback`) because they are two different things: in error the
> second is drawn, not both.

> **The help icon is the semantic ⓘ (`semantic/info`), not a "?".** It is the same in every field of the
> family. It is **two-colored and self-colored**: the SVG already brings the
> disc in `--icon--semantic--info` and the glyph in `--icon--base--contrast` (see `packages/foundations/icons/icons.css`),
> so the component's CSS **only sets the size**; a `fill:` there does not apply. For the same reason
> **it does not turn off in `disabled`**: the color lives inside the icon. The rest of the field's icons
> (leading/trailing) do follow the state, because they use `currentColor`.

The description and the mark are secondary text, and turn to the disabled color with the field.

The focus ring (`state=focus`, keyboard navigation) has two layers: the outer ring `--focus--ring--default` and, inside the `input-container`, the contrast gap `--focus--gap--default`.

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

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-xs` · 4px |
| `header` | gap | — | `--neo-space-xs` · 4px |
| `label-row` | gap | — | `--neo-space-xs` · 4px |
| `tooltip` | width | — | 16px |
| `tooltip` | height | — | 16px |
| `input-container` | min-height | — | 44px |
| `input-container` | padding-inline | — | `--neo-space-md` · 12px |
| `input-container` | padding-block | — | `--neo-space-sm` · 8px |
| `input-container` | gap | — | `--neo-space-sm` · 8px |
| `input-container` | border-radius | — | `--neo-radius-sm` · 8px |
| `input-container` | border-width | — | `--neo-stroke-xs` · 1px |
| `footer` | gap | — | `--neo-space-sm` · 8px |
| `helper` | gap | — | `--neo-space-sm` · 8px |
| `icon` | width | — | 24px |
| `icon` | height | — | 24px |
| `icon-right` | width | — | 24px |
| `icon-right` | height | — | 24px |

<!-- prosa:layout -->

> **The one-line field is a box of 8 + 24 + 8 = 40**, which expands to **44** for the touch target
> (`min-height`, content centered). The 44 is shared with `select` and `combobox`; `text-area` carries 12 of
> vertical air and starts at 112.

Between the label and the description there are 4. The mark goes at the end of the label row, aligned to the bottom: 8 from the label, or 16 from the description when there is one.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `label` | — | `Body/lg-Medium` | 16px | 500 | 24px | — |
| `description` | — | `Body/md-Regular` | 14px | 400 | 20px | — |
| `mark` | — | `Caption/sm-Regular` | 12px | 400 | 16px | — |
| `placeholder` | — | `Body/lg-Regular` | 16px | 400 | 24px | 1 line |
| `prefix-text` | — | `Body/lg-Regular` | 16px | 400 | 24px | — |
| `suffix-text` | — | `Body/lg-Regular` | 16px | 400 | 24px | — |
| `helper` | — | `Body/md-Regular` | 14px | 400 | 20px | — |
| `counter` | — | `Body/md-Regular` | 14px | 400 | 20px | — |
| `value` | — | `Body/lg-Regular` | 16px | 400 | 24px | — |

---

## HTML

<!-- prosa:html -->

```html
<!-- The BOX is `.field__input-wrapper`, not the <input>: border, padding, height and radius live there.
     A bare <input> inside `.field` receives NO styling: it is the structure the CSS
     and the master expect, and the same one select and combobox use. -->

<!-- Input -->
<div class="field">
  <label class="field__label" for="email">Correo electrónico</label>
  <div class="field__input-wrapper">
    <!-- Prefix and suffix: fixed text inside the box, on the sides of the input. They go INSIDE the
         wrapper: a prefix outside the box loses the border and the height that define it. -->
    <span class="field__prefix">@</span>
    <input class="field__input" type="email" id="email"
           placeholder="nombre@ejemplo.com" aria-describedby="email-helper">
    <span class="field__suffix">.cl</span>
  </div>
  <div class="field__footer">
    <span class="field__helper" id="email-helper">Usaremos este correo para confirmaciones.</span>
  </div>
</div>
```

```html
<!-- With a description and the mark. The header is a grid: the label on the first row, the description
     under it, and the mark at the end of the row of the description. Without a description the header
     drops the modifier and the mark goes next to the label. The description joins `aria-describedby`,
     before the help text. The mark is what is seen; `required` on the <input> is what makes the form
     ask for it and the screen reader say so. -->
<div class="field">
  <div class="field__header field__header--description">
    <label class="field__label" for="rut-titular">RUT del titular</label>
    <span class="field__description" id="rut-titular-description">Es el RUT de quien firma el contrato.</span>
    <span class="field__mark">Requerido</span>
  </div>
  <div class="field__input-wrapper">
    <input class="field__input" type="text" id="rut-titular" required
           aria-describedby="rut-titular-description rut-titular-helper">
  </div>
  <div class="field__footer">
    <span class="field__helper" id="rut-titular-helper">Sin puntos y con guion.</span>
  </div>
</div>
```

```html
<!-- DEPRECATED: the asterisk. `field__label--required` still draws it, so a page that already uses it does not
     break, and it leaves with the next MAJOR. New forms say it in words with `field__mark`, as in the example
     above. -->
<div class="field">
  <label class="field__label field__label--required" for="correo">Correo electrónico</label>
  <div class="field__input-wrapper">
    <input class="field__input" type="email" id="correo" required>
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
    <!-- The label wraps, and its LAST WORD and the ⓘ go together in `field__label-tail`, which never
         breaks: the ⓘ never ends up alone on a line. The label is split in two <label> for the same control
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

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `input` | `<input>` | `type="text"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the field, and then to the ⓘ if there is one |
| `Enter` | confirms what was typed and releases focus, so the field shows as filled. It does not stop a form from being submitted. |
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
- **The label keeps to 1 to 3 words.**
- **The help text wraps too**, it is not cut with an ellipsis. The `Input Placeholder` truncates to 1 line: what does not grow is the scaffolding around the value.
- **The mark replaces the asterisk.** Write «Requerido» or «Opcional» with `mark`. `required` still makes the form ask for the value and the screen reader say so; the asterisk it draws is deprecated and stays until the next major.
- `label` always visible: the placeholder does not replace it.
- **`active` vs `focus`:** when selecting the field it becomes active for typing (`active`, 2px focus border); **keyboard navigation** also shows the **focus ring** (`focus`, ring+gap). `writing` = typing in progress. Unlike `select`, the input does not need to open anything.
- **Ring = keyboard only.** The focus ring appears **only** when focus arrives by keyboard (`Tab`); **with a mouse it is not shown** (there the 2px `active` border communicates). Do not rely on `:focus-visible` for this: on a text `<input>` it also fires with a mouse (see Accessibility).
- **`writing` is illustrative, not a dev state.** It is **visually identical to `active`** (same 2px focus border): it exists to illustrate "the user is typing" in design. The consumer **does not implement a separate class**: it comes on its own from the value entered in the input.
- **State combinations:** `filled` (data entered) is **orthogonal** to the interaction (`active`/`focus`/`writing`) and to `error`: they coexist (e.g. `filled` + `focus`, `error` + `focus`). `disabled` and `read-only` **cancel** the interaction.
- `read-only` ≠ `disabled`: read-only allows reading and copying; disabled excludes the field from the form.
- In `state=error` always include a text message: do not rely only on the border color.
- Icons with a defined role: decorative (`aria-hidden`) or functional (`<button>` with `aria-label`). Never ambiguous.
- For free text only: to choose among options use `select` or `radio-button`.

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
- The helper text and the error message are ONE slot: in error the slot says the error message, and `aria-describedby` points to it, alongside `aria-labelledby`. The description, when there is one, is referenced from `aria-describedby` too.
- With an error, the field carries `aria-invalid="true"` AND `aria-describedby` pointing to the message. Verified by rendering, not by reading — that check caught the combobox regression when it migrated to TextField.
- The error message carries `role="alert"`: it appears after the person has already moved past the field, so it has to be announced.
- Read-only carries the native `readonly`, and only that: ARIA in HTML asks authors not to write `aria-readonly` on an element that has it.
- The ⓘ help icon is a `<button type="button">` with an `aria-label` that names the help («Qué es el RUT», not «ayuda»); its `<svg>` is `aria-hidden`.

<!-- prosa:accessibility -->

- **WCAG 2.4.7 (Focus Visible)** — `state=focus` shows the focus ring in keyboard navigation, and **only** there. **Implementation contract:** the ring is governed by the `.field--focus` class, **not** by `:focus-visible` — on a text `<input>``:focus-visible` also activates with a mouse and would break "keyboard only". In React, `NeoTextField`, `NeoTextArea` and `NeoCombobox` turn it on by detecting the input modality (`keydown` → keyboard · `pointerdown` → pointer); with the plain CSS layer, whoever uses it does the same.
- **WCAG 2.4.11 / 2.4.13 (Focus Appearance)** — the ring uses two layers (ring + contrast gap) with thickness `--neo-stroke-focus-ring-width`, visible on any background.
- **The help icon and its tooltip are ONE pattern, not two loose properties.** In Figma the ⓘ is one piece with its tooltip: in a prototype it shows the tooltip on mouse over, or on tap, and its text is written from the field. In the implementation they go together the same way: the button triggers the tooltip on `hover` and on `focus`, and `Escape` closes it. Turning on the icon without connecting the tooltip leaves a control that does nothing.
- **WCAG 2.5.8 (Target Size, AA) — the ⓘ help icon measures 16px, so the trigger provides the click area.** The glyph is 16 (`--neo-icon-size-xs`, what the master says); the element that wraps it and triggers the tooltip must reach **24×24 minimum** via padding, without enlarging the icon. Same criterion in `select` and `combobox`.
- **WCAG 1.4.11 (Non-text contrast)** — the ⓘ resolves a single pair, `--icon--semantic--info` (#0036AF) ↔ white: **9.78:1** both for the disc on `--surface--base--default` and for the glyph on the disc. Well above the required 3:1.

<!-- /prosa:accessibility -->
