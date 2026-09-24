# Text Field

> **Figma (source of truth):** [❖ Text Field](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002482-2745) — visual validation against the master.

Two components, one same system: `input` for short text on one line; `text-area` for long text on several lines.

---

## Properties

| Property | Values | Applies to |
|---|---|---|
| `type` | input · text-area | — |
| `state` | default · active · focus · writing · filled · error · read-only · disabled | input · text-area |
| `label` | visible text (mandatory) | input · text-area |
| `placeholder` | example of the expected format | input · text-area |
| `helper-text` | instructions or help message | input · text-area |
| `feedback` | error message — required if `state=error` | input · text-area |
| `icon-left` | visible · hidden — decorative | input only |
| `icon-right` | visible · hidden — functional (clear, show password) | input only |
| `prefix` | visible · hidden — shows the fixed text affix (leading) | input only |
| `prefix-text` | content of the prefix (e.g. "+56") | input only |
| `suffix` | visible · hidden — shows the fixed text affix (trailing) | input only |
| `suffix-text` | content of the suffix (e.g. "UF") | input only |
| `↪ counter` | visible · hidden — character count | text-area only |
| `icon-tooltip` | visible · hidden — help icon next to the label | input · text-area |
| `↪ tooltip` | visible · hidden — the tooltip that icon shows | input · text-area |

---

## Props

```typescript
interface NeoTextFieldProps {
  label: ReactNode                    // The visible text of the component.
  required?: boolean                  // The field is required.
  helperText?: ReactNode              // The help text under the field. In `error` this same slot says the error message: they are not two.
  error?: boolean                     // The value does not pass validation. The message goes in the same `helperText` slot.
  readOnly?: boolean                  // It can be read but not edited.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  prefix?: ReactNode
  suffix?: ReactNode
  tooltip?: ReactNode                 // The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it.
  iconLeft?: string | ReactElement
  iconRight?: string | ReactElement
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
  [prop: string]: unknown             // the rest flows to MUI's TextField
}

interface NeoTextAreaProps {
  label: ReactNode                    // The visible text of the component.
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
  [prop: string]: unknown             // the rest flows to MUI's TextField
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `input-container` | default · active · focus · writing · filled · error | background | `--fill--base--default` |
| `input-container` | read-only | background | `--fill--base--medium` |
| `input-container` | disabled | background | `--fill--base--disabled` |
| `input-container` | default · filled · read-only | border | `--border--base--default` (1px) |
| `input-container` | active · writing | border | `--border--base--focus` (2px) |
| `input-container` | error | border | `--border--semantic--error-solid` (2px) |
| `input-container` | disabled | border | `--border--base--disabled` (1px) |
| `input-container` | focus | border + anillo | see **Focus ring** |
| `label` | default · active · focus · writing · filled · read-only | color | `--text--base--default` |
| `label` | error | color | `--text--semantic--error` |
| `label` | disabled | color | `--text--base--disabled` |
| `input-value` | default | color | `--text--base--default` |
| `input-placeholder` | — | color | `--text--base--secondary` |
| `input-placeholder` | disabled | color | `--text--base--disabled` |

**The value and the placeholder are the same master layer —`Input Field` contains the cursor and
`Input Placeholder`— and different colors**, so they are named separately.
| `helper-text` | default · active · focus · writing · filled · read-only | color | `--text--base--secondary` |
| `helper-text` | disabled | color | `--text--base--disabled` |
| `feedback-message` | error | color | `--text--semantic--error` |

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
| `left-slot` · `right-slot` | default | fill | `--icon--base--default` |
| `left-slot` · `right-slot` | disabled | fill | `--icon--base--disabled` |
| `icon-tooltip` (ⓘ) | **all states, disabled included** | fill (disco) | `--icon--semantic--info` |
| `icon-tooltip` (ⓘ) | **all states, disabled included** | fill (glifo) | `--icon--base--contrast` |
| `tooltip` (body · arrow) | — | background/fill | `--fill--semantic--info--solid` · label `--text--base--contrast` (see `tooltip.md`) |
| `counter` | default | color | `--text--base--secondary` |
| `counter` | disabled | color | `--text--base--disabled` |

> **The help icon is the semantic ⓘ (`semantic/info`), not a "?".** It is the same in the 32 variants
> of `text-field · select · combobox`. It is **two-colored and self-colored**: the SVG already brings the
> disc in `--icon--semantic--info` and the glyph in `--icon--base--contrast` (see `packages/foundations/icons/icons.css`),
> so the component's CSS **only sets the size** — a `fill:` there does not apply. For the same reason
> **it does not turn off in `disabled`**: the color lives inside the icon. The rest of the field's icons
> (leading/trailing) do follow the state, because they use `currentColor`.

**Focus ring** (`state=focus` — keyboard navigation)

| Layer | CSS property | CSS custom property |
|---|---|---|
| anillo externo | border (outside) | `--focus--ring--default` |
| gap (separator) | border (inside the `input-container`) | `--focus--gap--default` |
| grosor (ambos) | border-width | `--neo-stroke-focus-ring-width` (2px) |

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `padding-inline` (container) | `--neo-space-md` | 12px |
| `padding-block` (container · **input**) | `--neo-space-sm` | 8px |
| `padding-block` (container · **text-area**) | `--neo-space-md` | 12px |
| `gap` (label · container · helper) | `--neo-space-xs` | 4px |
| `border-radius` | `--neo-radius-sm` | 8px |
| `border-width` (default · filled · read-only · disabled) | `--neo-stroke-xs` | 1px |
| `border-width` (active · writing · error) | `--neo-stroke-sm` | 2px |
| `border-width` (focus ring) | `--neo-stroke-focus-ring-width` | 2px |
| `min-height` (container) | — (layout constant) | 44px — touch target shared with select and combobox |
| `icon-size` (leading · trailing) | `--neo-icon-size-md` | 24px |
| `icon-size` (help ⓘ) | `--neo-icon-size-xs` | 16px |

> **`input` and `text-area` do not carry the same vertical air.** The one-line one is a box of
> **8 + 24 + 8 = 40**, which expands to **44** for the touch target (`min-height`, content centered).
> The `text-area` carries **12** and its height is defined by the content, with no touch target involved.

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/lg-medium` | 16px | 500 | 24px |
| `input-text` (valor · prefix · suffix) | `body/lg-regular` | 16px | 400 | 24px |
| `input-text` (placeholder) | `body/lg-regular` | 16px | 400 | 24px |
| `helper-text` · `feedback-message` | `body/md-regular` | 14px | 400 | 20px |
| `counter` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- The BOX is `.field__input-wrapper`, not the <input>: border, padding, height and radius live there.
     A bare <input> inside `.field` receives NO styling — it is the structure the CSS
     and the master expect, and the same one select and combobox use. -->

<!-- Input -->
<div class="field">
  <!-- Mandatory: the CSS puts the asterisk (`::after`), it is not written in the text. -->
  <label class="field__label field__label--required" for="email">Correo electrónico</label>
  <div class="field__input-wrapper">
    <!-- Prefix and suffix: fixed text inside the box, on the sides of the input. They go INSIDE the
         wrapper — a prefix outside the box loses the border and the height that define it. -->
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
    <label class="field__label" for="rut">RUT</label>
    <!-- The trigger is a BUTTON, not the <svg>: it has to be focusable by keyboard.
         The glyph measures 16px; the click area comes from the button, at least 24×24 (WCAG 2.5.8). -->
    <button type="button" class="field__icon--tooltip"
            aria-label="Qué es el RUT" aria-describedby="rut-tip">
      <svg class="field__icon--tooltip" aria-hidden="true"><use href="#semantic-info"></use></svg>
    </button>
    <div id="rut-tip" role="tooltip" class="tooltip">Sin puntos y con guion.</div>
  </div>
  <div class="field__input-wrapper">
    <input class="field__input" type="text" id="rut">
  </div>
</div>
```

```html
<!-- Input en error -->
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

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| Input | `<input type="text">` | `id` · `aria-labelledby` or `aria-label` |
| Text area | `<textarea>` | `id` · `aria-labelledby` or `aria-label` |
| Label | `<label>` | `for="[input-id]"` |
| Help icon ⓘ | **`<button type="button">`** | `aria-label` that names the help ("What is the RUT") · `aria-describedby` to the tooltip when it is visible · the inner `<svg>` goes `aria-hidden="true"` |
| Tooltip | `<div role="tooltip">` | `id` referenced by the button's `aria-describedby` · shown on `hover`, `focus` and `Escape` closes it |
| Helper text | `<span>` | `id` · referenced in the input's `aria-describedby` (coexists with `aria-labelledby`) |
| Error message | `<span>` | `role="alert"` · referenced in `aria-describedby` (coexists with `aria-labelledby`) |
| Field with an error | `<input>` | `aria-invalid="true"` · `aria-describedby="[error-id]"` |
| Disabled | `<input>` | `disabled` |
| Read-only | `<input>` | the native `readonly` — not `aria-readonly` next to it (ARIA in HTML) |
| Functional right icon | `<button>` | `aria-label="[action]"` |
| Decorative icons | `<svg>` | `aria-hidden="true"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Moves focus to the field → `state=focus` (focus ring, keyboard navigation) |
| `Shift + Tab` | Focus to the previous element |
| Characters | Enter text |
| `Backspace` · `Delete` | Deletes characters |
| `Enter` | In input: confirms what was typed and releases focus, so the field shows as `filled`; it does not stop a form from being submitted · In text-area: it inserts a line break |

---

## Rules

- **`Input Label` and `Helper Text` truncate to 1 line**, and the `Input Placeholder` **only in
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

---

## Accessibility

- **WCAG 1.3.1** — label associated programmatically via `<label for>` or `aria-labelledby`.
- **WCAG 2.4.6** — the label text identifies the purpose; do not use a placeholder alone.
- **WCAG 2.4.7 (Focus Visible)** — `state=focus` shows the focus ring in keyboard navigation, and **only** there. **Implementation contract:** the ring is governed by the `.field--focus` class, **not** by `:focus-visible` — on a text `<input>``:focus-visible` also activates with a mouse and would break "keyboard only". In React, `NeoTextField` and `NeoTextArea` turn it on by detecting the input modality (`keydown` → keyboard · `pointerdown` → pointer); with the plain CSS layer, whoever uses it does the same.
- **WCAG 2.4.11 / 2.4.13 (Focus Appearance)** — the ring uses two layers (ring + contrast gap) with thickness `--neo-stroke-focus-ring-width`, visible on any background.
- **WCAG 3.3.1** — on error: `aria-invalid="true"` + visible message referenced with `aria-describedby`.
- **WCAG 3.3.2** — labels or instructions always visible when user data is required.
- **The help icon and its tooltip are ONE pattern, not two loose properties.** In Figma they are two independent booleans (`icon-tooltip` and `↪ tooltip`) because the master does not prototype the interaction; in the implementation they go together: the button triggers the tooltip on `hover` and on `focus`, and `Escape` closes it. Turning on the icon without connecting the tooltip leaves a control that does nothing.
- **WCAG 2.5.8 (Target Size, AA) — the ⓘ help icon measures 16px, so the trigger provides the click area.** The glyph is 16 (`--neo-icon-size-xs`, what the master says); the element that wraps it and triggers the tooltip must reach **24×24 minimum** via padding, without enlarging the icon. Same criterion in `select` and `combobox`.
- **WCAG 1.4.11 (Non-text contrast)** — the ⓘ resolves a single pair, `--icon--semantic--info` (#0036AF) ↔ white: **9.78:1** both for the disc on `--surface--base--default` and for the glyph on the disc. Well above the required 3:1.
