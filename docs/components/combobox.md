# Combobox

> **Figma (source of truth):** [❖ Combobox](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003354-14160) — visual validation against the master.

Single selection of one option from a list **filterable by text**: the user types and the list narrows to the matches. For selection without search use **Select**; for free text use **Text Field**; to run actions use **Menu**. It consumes the shared primitives **`menu/list`** (panel) and **`_menu/item`** (option) — documented in [`menu.md`](menu.md); in Combobox they take the ARIA role `listbox`/`option`. Closed, strict list: it does not accept values outside the options (v1).

---

## Properties

### Combobox

| Property | Values |
|---|---|
| `state` | default · active · writing · no-results · filled · error · read-only · disabled · focus |
| `label` | visible text — required |
| `placeholder` | visible text in the field before typing/selecting |
| `helper-text` | true · false — contextual instruction under the field |
| `icon-left` | true · false (default: false) — consumer slot, 24px, before the input |
| `icon-right` | true · false (default: false) — consumer slot, 24px, between the input and the chevron. **It is not the clear ⊗**: see note |
| `icon-tooltip` | true · false — help icon next to the label (ⓘ `semantic/info`, 16px — see `text-field.md`) |
| `↪ tooltip` | true · false — tooltip of the help icon |

- **`focus`** = field focused by keyboard, closed (focus ring visible).
- **`active`** = panel open (`menu/list` open), not filtered yet.
- **`writing`** = the user types → the list is filtered (*contains* matching).
- **`no-results`** = something was typed and no option matches → the panel shows the explicit empty message.
- **`filled`** = option selected, field closed; the clear ⊗ stays available. The chevron does NOT change color: it stays in the mid gray, like the ⊗ that lives beside it.

> **The clear ⊗ is in the master**: a 24 `clear` layer, inside
> `combobox-container` and **between the right icon and the chevron**, visible with a value, while typing and with no
> results, and turned off in `disabled`. `icon-right` is not the ⊗:
> it is a generic slot like the left one.
>
> **The glyph is `system-error`, the ✕ inside a circle**. It is the system's only
> circled X glyph; `system-close` is the bare ✕, the one alert, chips, badge, tag and
> the two modals use to dismiss. The cost is knowingly accepted: `error` is also the
> semantic error glyph and this component has a `state=error`.
>
> **The 32 box around the 24 glyph comes from the code**, not the master: the master draws the icon
> alone and a control needs the 24×24 minimum of WCAG 2.5.8 with its touch area.

> **The error message comes with `state=error`** — there is no `feedback` property that turns it on. (In `text-field` there is: they are **two different models for the same thing** — a known debt, not fixed in `1.0.0` because renaming breaks the contract.) The message text is not bound to any property: it is written by entering the instance.

### menu/list (panel) · \_menu/item (option)

Properties, states and behavior (scroll, divider, option icon) → **[`menu.md`](menu.md)**. In Combobox they take the ARIA role `listbox`/`option`.

---

## Props

```typescript
interface NeoComboboxProps {
  label: ReactNode                    // The visible text of the component.
  required?: boolean                  // The field is required.
  helperText?: ReactNode              // The help text under the field. In `error` this same slot says the error message: they are not two.
  error?: boolean                     // The value does not pass validation. The message goes in the same `helperText` slot.
  readOnly?: boolean                  // It can be read but not edited.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  tooltip?: ReactNode                 // The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it.
  iconLeft?: string | ReactElement
  iconRight?: string | ReactElement
  tooltipLabel?: string               // The accessible name of the ⓘ button. By default «Ayuda sobre <label>» (end-user text, in Spanish); pass it when that phrase does not name the help well.
  id?: string                         // The control id, to link the label and the descriptions.
  placeholder?: string                // The hint text inside the field. It never replaces the label, which is visible and static.
  options?: ReadonlyArray<string>     // The list options. Closed and strict: values outside it are not accepted.
  onChange?: (...args: unknown[]) => void  // Notifies the value change.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Autocomplete
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

---

## Tokens

### Color

**Combobox — field and label**

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `combobox-field` | default · active · writing · no-results · filled · error · focus | background | `--fill--base--default` |
| `combobox-field` | read-only | background | `--fill--base--medium` |
| `combobox-field` | disabled | background | `--fill--base--disabled` |
| `combobox-field` | default · filled · read-only | border | `--border--base--default` (1px) |
| `combobox-field` | active · writing · no-results | border | `--border--base--focus` (2px) |
| `combobox-field` | error | border | `--border--semantic--error-solid` (2px) |
| `combobox-field` | disabled | border | `--border--base--disabled` (1px) |
| `combobox-field` | focus | border + anillo | see **Focus ring** |
| `label` | default · active · writing · no-results · filled · read-only · focus | color | `--text--base--default` |
| `label` | error | color | `--text--semantic--error` |
| `label` | disabled | color | `--text--base--disabled` |
| `input` (valor) | filled | color | `--text--base--default` |
| `input` (texto tipeado) | writing · no-results | color | `--text--base--default` |
| `input` (placeholder) | default · active | color | `--text--base--secondary` |
| `input` | disabled | color | `--text--base--disabled` |
| `icon-left` · `icon-right` | default · active · writing · no-results · filled · error · read-only · focus | fill | `--icon--base--default` |
| `icon-left` · `icon-right` | disabled | fill | `--icon--base--default` (they are not turned off — see note) |
| `clear` (⊗) | filled · writing · no-results | fill | `--icon--base--secondary` |
| `clear` | disabled | fill | `--icon--base--disabled` |
| `chevron` | default · active · writing · no-results · **filled** · error · read-only · focus | fill | `--icon--base--secondary` |
| `chevron` | disabled | fill | `--icon--base--disabled` |
| `helper-text` | default · active · writing · no-results · filled · read-only · focus | color | `--text--base--secondary` |
| `helper-text` | disabled | color | `--text--base--disabled` |
| `feedback-message` | error | color | `--text--semantic--error` |

> **`icon-left` · `icon-right` in `disabled` are NOT turned off**, and it is not what their sibling
> `text-field` does. The difference is in what they are: text-field's slots are **drawn** and follow
> the field's state; these live **hidden** in the 9 variants, so their color is the starting
> point inherited by whoever turns them on — if an icon is ever needed and enabled, it has to
> come in `default`. The chevron does turn off: it is drawn.

**Focus ring** (keyboard navigation — `state=focus`)

| Layer | CSS property | CSS custom property |
|---|---|---|
| anillo externo | border (outside) | `--focus--ring--default` |
| gap (separator) | border (inside the `combobox-field`) | `--focus--gap--default` |
| grosor (ambos) | border-width | `--neo-stroke-focus-ring-width` (2px) |

**Panel and options** (`menu/list` + `_menu/item`) → color tokens in **[`menu.md`](menu.md)**. Specific to Combobox: `panel-empty` (`no-results` message) → `--text--base--secondary`.

**Also:** the options panel uses `--surface--base--default` as its background (inherited from `menu/list` — see `menu.md`).

### Layout

**Combobox**

| Property | CSS custom property | Value |
|---|---|---|
| `gap` (label-row · field · helper) | `--neo-space-xs` | 4px |
| `padding-block` (field) | `--neo-space-sm` | 8px — **a floor, not the measure**: see note |
| `min-height` (field) | — (layout constant) | 44px — touch target shared with text-field and select |
| `padding-inline` (field) | `--neo-space-md` | 12px |
| `gap` (field: input · icons · chevron) | `--neo-space-sm` | 8px |
| `border-radius` (field) | `--neo-radius-sm` | 8px |
| `border-width` (default · filled · read-only · disabled) | `--neo-stroke-xs` | 1px |
| `border-width` (active · writing · no-results · error) | `--neo-stroke-sm` | 2px |
| `min-width` (field) | — (layout constant) | 160px |

> **The height rules over the vertical padding.** The master fixes the control at **44px** and the content
> measures a 24 line, so vertically the content is **centered** — there is no vertical design padding
> to copy. (In Figma the frame declares 12, but with a fixed height: 12+24+12 would give 48, not 44.)
> In CSS it is achieved with `min-height: 44px` + `align-items: center`; the 8 of `padding-block` is only
> the floor when the content is smaller. **The one that is a design measure is the horizontal one: 12.**

**Panel and options** (`menu/list` + `_menu/item`) → layout in **[`menu.md`](menu.md)**.

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/lg-medium` | 16px | 500 | 24px |
| `input` (placeholder · text · value) | `body/lg-regular` | 16px | 400 | 24px |
| `option-label` · `panel-empty` | `body/lg-regular` | 16px | 400 | 24px |
| `helper-text` · `feedback-message` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- Combobox default (cerrado) -->
<div class="combobox">
  <div class="combobox__label-row">
    <label id="comuna-label" class="combobox__label">Comuna</label>
    <!-- Help icon (ⓘ): 16px, self-colored (the sheet only sets the size). The trigger is a
         BUTTON, not the <svg>: it has to receive focus or the tooltip does not exist for the keyboard.
         The glyph is NOT chosen: the master fixes it at `semantic/info` in its 32 variants. -->
    <button type="button" class="combobox__icon combobox__icon--tooltip"
            aria-label="Qué comunas hay" aria-describedby="comuna-tip">
      <svg class="combobox__icon--tooltip" aria-hidden="true"><use href="#semantic-info"></use></svg>
    </button>
    <div id="comuna-tip" role="tooltip" class="tooltip">Solo las comunas de la región elegida.</div>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label"
           aria-expanded="false"
           aria-controls="comuna-listbox"
           aria-autocomplete="list"
           placeholder="Selecciona tu comuna">
    <svg class="combobox__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </div>
  <span class="combobox__helper">Escribe para filtrar.</span>
</div>
```

```html
<!-- Combobox with the master's two icon slots: `icon-left` BEFORE the input and `icon-right`
     between the input and the chevron. Both belong to the consumer, 24px, `icon--base--default`; the order
     comes from the DOM and the gap of 8 is set by `.combobox__field`. -->
<div class="combobox">
  <div class="combobox__label-row">
    <label id="comuna-label-ic" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <svg class="combobox__icon" aria-hidden="true"><use href="#system-search"></use></svg>
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label-ic"
           aria-expanded="false"
           aria-controls="comuna-listbox-ic"
           aria-autocomplete="list"
           placeholder="Selecciona tu comuna">
    <svg class="combobox__icon" aria-hidden="true"><use href="#system-location"></use></svg>
    <svg class="combobox__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </div>
</div>
```

```html
<!-- Combobox writing (escribiendo → lista filtrada) -->
<div class="combobox combobox--writing">
  <div class="combobox__label-row">
    <label id="comuna-label-w" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label-w"
           aria-expanded="true"
           aria-controls="comuna-listbox-w"
           aria-autocomplete="list"
           aria-activedescendant="comuna-opt-1"
           value="ma">
    <button class="combobox__clear" aria-label="Limpiar">
      <svg aria-hidden="true"><use href="#system-error"></use></svg>
    </button>
    <svg class="combobox__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </div>
  <ul class="menu-list" id="comuna-listbox-w" role="listbox" aria-labelledby="comuna-label-w">
    <li class="menu-item" id="comuna-opt-1" role="option" aria-selected="false">
      <span class="menu-item__label">Maipú</span>
    </li>
    <li class="menu-item" id="comuna-opt-2" role="option" aria-selected="false">
      <span class="menu-item__label">Macul</span>
    </li>
  </ul>
</div>
```

```html
<!-- Combobox no-results (no matches) -->
<div class="combobox combobox--no-results">
  <div class="combobox__label-row">
    <label id="comuna-label-nr" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label-nr"
           aria-expanded="true"
           aria-controls="comuna-listbox-nr"
           aria-autocomplete="list"
           value="zzz">
    <button class="combobox__clear" aria-label="Limpiar"><svg aria-hidden="true"><use href="#system-close"></use></svg></button>
    <svg class="combobox__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </div>
  <ul class="menu-list" id="comuna-listbox-nr" role="listbox" aria-labelledby="comuna-label-nr">
    <li class="menu-list__empty" role="presentation">Sin coincidencias, intenta con otras palabras claves.</li>
  </ul>
</div>
```

```html
<!-- Combobox filled (selected value) -->
<div class="combobox combobox--filled">
  <div class="combobox__label-row">
    <label id="comuna-label-f" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label-f"
           aria-expanded="false"
           aria-controls="comuna-listbox-f"
           aria-autocomplete="list"
           value="Maipú">
    <button class="combobox__clear" aria-label="Limpiar selección"><svg aria-hidden="true"><use href="#system-close"></use></svg></button>
    <svg class="combobox__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </div>
</div>
```

```html
<!-- Combobox error -->
<div class="combobox combobox--error">
  <div class="combobox__label-row">
    <label id="comuna-label-err" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label-err"
           aria-expanded="false"
           aria-controls="comuna-listbox-err"
           aria-autocomplete="list"
           aria-invalid="true"
           aria-describedby="comuna-feedback"
           placeholder="Selecciona tu comuna">
    <svg class="combobox__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </div>
  <span id="comuna-feedback" class="combobox__feedback" role="alert">Selecciona una comuna para avanzar.</span>
</div>
```

```html
<!-- Combobox disabled -->
<div class="combobox combobox--disabled">
  <div class="combobox__label-row">
    <label id="comuna-label-dis" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input" role="combobox" aria-expanded="false"
           aria-labelledby="comuna-label-dis"
           aria-controls="comuna-listbox-dis" placeholder="Selecciona tu comuna" disabled>
    <svg class="combobox__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </div>
  <span class="combobox__helper">Texto de ayuda explicando por qué está deshabilitado.</span>
</div>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Combobox input | `<input role="combobox">` | `aria-expanded` · `aria-controls="[panel-id]"` · `aria-autocomplete="list"` · `aria-labelledby="[label-id]"` |
| Highlighted option (keyboard) | input | `aria-activedescendant="[option-id]"` |
| Combobox in error | `<input role="combobox">` | `aria-invalid="true"` · `aria-describedby="[feedback-id]"` |
| Label | `<label>` | `id` — referenced in the input's `aria-labelledby` |
| Panel (menu/list) | `<ul role="listbox">` | `id` · `aria-labelledby="[label-id]"` |
| Option (\_menu/item) | `<li role="option">` | `id` · `aria-selected="true\|false"` |
| Disabled option | `<li role="option">` | `aria-disabled="true"` |
| No-results message | `<li>` | `role="presentation"` — informational text, not selectable |
| Clear button (⊗ — a usage rule, not a part of the master) | `<button>` | `aria-label="Limpiar"` |
| Error feedback | `<span>` | `role="alert"` · `id` referenced in `aria-describedby` |
| Decorative icons | `<svg>` | `aria-hidden="true"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Moves focus to the field → `state=focus` (focus ring visible) |
| `Shift + Tab` | Focus to the previous element |
| Escribir (letras) | Opens the panel and **filters** the list (`state=writing`) — *contains* matching |
| `↓` | Opens the panel · Moves focus to the next option |
| `↑` | Moves focus to the previous option |
| `Home` | Moves focus to the first option |
| `End` | Moves focus to the last option |
| `Enter` | Selects the highlighted option (`state=filled`) |
| `Escape` | Closes the panel; if there is filter text, it clears it |
| `Backspace` · `Delete` | Deletes filter characters · Widens the list again |
| `Tab` (inside the panel) | Closes the panel and moves focus to the next element |

---

## Rules

- **The `Option Label` truncates to 1 line in the two variants that draw the panel** —`active` and
`writing`—. The third, `no-results`, **has no cap and it is not an oversight**: it measures 48 px because it is not
  an option but the "no results" message.
- `label` always visible — the placeholder disappears on interaction.
- **`focus` vs `active` vs `writing`:** `focus` = focused by keyboard and closed (focus ring); `active` = panel open without filtering; `writing` = typing → filtered list. Keyboard navigation **always** shows the focus ring.
- **`writing` is illustrative, not a dev state.** In the `field` it is **visually identical to `active`** (same border) — it exists to illustrate "the user is typing" in design. The consumer **does not implement a separate class**: the filtered list comes on its own from the input's value + the filtering.
- **Ring = keyboard only.** The focus ring appears **only** when focus arrives by keyboard (`Tab`) or keyboard navigation is used (arrows). **With a mouse it is not shown** — there the `active`/`writing`/`filled` states communicate. Do not rely on `:focus-visible` for this: on a text `<input>` it also fires with a mouse (see Accessibility).
- **The theme is not enough on its own: there is a composition layer on top, and `NeoCombobox` is it.** Dressing MUI's `Autocomplete` solves the color and the box, but three things in this spec live **above** the theme: the **static `label`** (it goes inside `renderInput` — MUI's floating label does not work here), the **`focus` / `active` / `writing` distinction**, and the **ring by modality** of the previous rule. In React the wrapper already assembles the three, so composing `Autocomplete` by hand means rebuilding them; with the plain CSS layer, whoever uses it assembles them. That the three **are there** is not optional.
- **State combinations:** `filled` · `error` · `read-only` (state of the data) are **orthogonal** to `focus` · `active` · `writing` (interaction) and coexist. `disabled` and `read-only` **cancel** the interaction.
- **When clearing, the field keeps focus and the panel stays as it was.** The ⊗ changes the DATA and does not touch the interaction: it does not close the panel if it was open nor open it if it was closed, and focus returns to the field. In practice it looks open, because the ⊗ is reached with the field focused and focusing it opens it. **It is the base's behavior and it is kept on purpose** — forcing the close would be an override fighting `Autocomplete` to restore a state nobody asked to change. It is the corollary of the previous rule for ACTIONS.
- **Filtering:** *contains* matching on the option's label. **Closed, strict list** — it does not accept values outside the options (v1). If there are no matches, always show `no-results` with a message — **never** an empty panel in silence.
- **Scroll:** up to 6 options → `scroll=none` (hug, no scrollbar). With 7 or more → `scroll` with a fixed height of **260px** showing 50% of the next option as a hint.
- **Width:** the `field` has a min-width of **160px**. The panel matches the field's width; if it goes below 200px, the panel stays at **200px aligned to the left** (it is not centered).
- The panel **floats** (`position: absolute`) — it never pushes the layout. **It must render in a portal (or with a high `z-index`)** so it is not covered by the form's following fields.
- The option label **truncates to 1 line with an ellipsis** — it never wraps.
- In `state=error` always include the `feedback-message` — do not rely only on the border color. In React it travels in MUI's single slot, `helperText`, and the theme paints it as an error: the master has two text elements (`helper-text` and `feedback-message`) and Material UI exposes one.
- `read-only` ≠ `disabled`: read-only shows the value and lets it be read; disabled excludes the field from the form and from the keyboard order.
- **When to use Combobox vs alternatives:** a **long** list where searching speeds things up → Combobox. A short, stable list (≤6) → **Select**. Free text / values outside the list → **Text Field**. Only 2 options → **Radio button**. Running actions → **Menu**.
- If one option has an icon, all of them must have it — mixed icons create a false hierarchy.

---

## Accessibility

- **WCAG 1.3.1** — label associated programmatically via `aria-labelledby` on the input.
- **WCAG 4.1.2** — input with `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"` and `aria-controls` pointing to the panel; highlighted option via `aria-activedescendant`.
- **WCAG 2.1.1** — full keyboard: type to filter, arrows to navigate, Enter to select, Escape to close/clear.
- **WCAG 2.4.7 (Focus Visible)** — `state=focus` always shows the focus ring in keyboard navigation, and **only** there. **Implementation contract:** the ring is governed by the `.combobox--focus` class, **not** by `:focus-visible` — on a text `<input>``:focus-visible` also activates with a mouse and would break "keyboard only". In React, `NeoCombobox` turns its focus class on by detecting the input modality (`keydown` → keyboard · `pointerdown` → pointer); with the plain CSS layer, whoever uses it turns on `.combobox--focus` the same way.
- **WCAG 2.4.11 / 2.4.13 (Focus Appearance)** — the ring uses two layers (ring + contrast gap) with thickness `--neo-stroke-focus-ring-width`, guaranteeing visibility on any background.
- **WCAG 3.3.1** — on error: `aria-invalid="true"` on the input + visible message referenced with `aria-describedby`.
- **WCAG 2.4.6** — the label identifies the purpose; do not use a placeholder alone.
