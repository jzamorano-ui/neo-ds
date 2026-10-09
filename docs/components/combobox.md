<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Combobox

> **Figma (source of truth):** [❖ Combobox](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003354-14160) — visual validation against the master.

<!-- prosa:intro -->

Single selection of one option from a list **filterable by text**: the user types and the list narrows to the matches. For selection without search use **Select**; for free text use **Text Field**; to run actions use **Menu**. It consumes the shared primitives **`menu/list`** (panel) and **`_menu/item`** (option) — documented in [`menu.md`](menu.md); in Combobox they take the ARIA role `listbox`/`option`. Closed, strict list: it does not accept values outside the options (v1).

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `state` | default · active · writing · no-results · filled · focus · error · read-only · disabled |
| `label` | text |
| `placeholder` | text |
| `helper-text` | true · false — default `false` |
| `icon-left` | true · false — default `false` |
| `icon-right` | true · false — default `false` |
| `icon-tooltip` | true · false — default `true` |
| `feedback` | true · false — default `true` |

<!-- prosa:properties -->

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

> **The error message comes with `state=error`.** The message text is not bound to any property: it is written by entering the instance.

Properties, states and behavior (scroll, divider, option icon) → **[`menu.md`](menu.md)**. In Combobox they take the ARIA role `listbox`/`option`.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoComboboxProps {
  label?: ReactNode                   // The visible text of the component.
  required?: boolean                  // The field is required.
  helperText?: ReactNode              // The help text under the field. In `error` this same slot says the error message: they are not two.
  error?: boolean                     // The value does not pass validation. The message goes in the same `helperText` slot.
  readOnly?: boolean                  // It can be read but not edited.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  tooltip?: ReactNode                 // The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it.
  iconLeft?: string | ReactElement    // The icon before the text: the id of a system icon (`system-search`) or your own element.
  iconRight?: string | ReactElement   // The icon after the text: the id of a system icon (`system-chevron-right`) or your own element.
  tooltipLabel?: string               // The accessible name of the ⓘ button. By default «Ayuda sobre <label>» (end-user text, in Spanish); pass it when that phrase does not name the help well.
  id?: string                         // The control id, to link the label and the descriptions.
  placeholder?: string                // The hint text inside the field. It never replaces the label, which is visible and static.
  options?: AutocompleteProps['options']  // The list options. Closed and strict: values outside it are not accepted.
  onChange?: AutocompleteProps['onChange']  // Notifies the value change.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Autocomplete not listed above
  // required: a name: `label`, `aria-label`, `aria-labelledby` —one of them
}
```

---

## Tokens

### Color

<!-- prosa:color -->

> **`icon-left` · `icon-right` turn off in `disabled`**, like their sibling `text-field` and like the
> chevron: a disabled field turns off everything it draws. They live hidden in the 9 variants and belong
> to the consumer; whoever turns them on in a disabled field gets them in `--icon--base--disabled`.

**Panel and options** (`menu/list` + `_menu/item`) → color tokens in **[`menu.md`](menu.md)**.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `label` | default | color | `--text--base--default` |
| `label` | active | color | `--text--base--default` |
| `label` | writing | color | `--text--base--default` |
| `label` | no-results | color | `--text--base--default` |
| `label` | filled | color | `--text--base--default` |
| `label` | error | color | `--text--semantic--error` |
| `label` | read-only | color | `--text--base--default` |
| `label` | disabled | color | `--text--base--disabled` |
| `label` | focus | color | `--text--base--default` |
| `placeholder` | default | color | `--text--base--secondary` |
| `placeholder` | active | color | `--text--base--secondary` |
| `placeholder` | writing | color | `--text--base--default` |
| `placeholder` | no-results | color | `--text--base--default` |
| `placeholder` | filled | color | `--text--base--default` |
| `placeholder` | error | color | `--text--base--default` |
| `placeholder` | read-only | color | `--text--base--default` |
| `placeholder` | disabled | color | `--text--base--disabled` |
| `placeholder` | focus | color | `--text--base--secondary` |
| `value` | default | color | `--text--base--default` |
| `field` | default | background | `--fill--base--default` |
| `field` | default | border | `--border--base--default` |
| `field` | active | background | `--fill--base--default` |
| `field` | active | border | `--border--base--focus` |
| `field` | writing | background | `--fill--base--default` |
| `field` | writing | border | `--border--base--focus` |
| `field` | no-results | background | `--fill--base--default` |
| `field` | no-results | border | `--border--base--focus` |
| `field` | filled | background | `--fill--base--default` |
| `field` | filled | border | `--border--base--default` |
| `field` | error | background | `--fill--base--default` |
| `field` | error | border | `--border--semantic--error-solid` |
| `field` | read-only | background | `--fill--base--medium` |
| `field` | read-only | border | `--border--base--default` |
| `field` | disabled | background | `--fill--base--disabled` |
| `field` | disabled | border | `--border--base--disabled` |
| `field` | focus | background | `--fill--base--default` |
| `field` | focus | border/box-shadow | `--focus--gap--default` |
| `field` | focus | outline | `--focus--ring--default` |
| `helper` | default | color | `--text--base--secondary` |
| `helper` | active | color | `--text--base--secondary` |
| `helper` | writing | color | `--text--base--secondary` |
| `helper` | no-results | color | `--text--base--secondary` |
| `helper` | filled | color | `--text--base--secondary` |
| `helper` | error | color | `--text--semantic--error` |
| `helper` | read-only | color | `--text--base--secondary` |
| `helper` | disabled | color | `--text--base--disabled` |
| `helper` | focus | color | `--text--base--secondary` |
| `feedback` | error | color | `--text--semantic--error` |
| `icon` | default | fill | `--icon--base--default` |
| `icon` | active | fill | `--icon--base--default` |
| `icon` | writing | fill | `--icon--base--default` |
| `icon` | no-results | fill | `--icon--base--default` |
| `icon` | filled | fill | `--icon--base--default` |
| `icon` | error | fill | `--icon--base--default` |
| `icon` | read-only | fill | `--icon--base--default` |
| `icon` | disabled | fill | `--icon--base--disabled` |
| `icon` | focus | fill | `--icon--base--default` |
| `chevron` | default | fill | `--icon--base--secondary` |
| `chevron` | active | fill | `--icon--base--secondary` |
| `chevron` | writing | fill | `--icon--base--secondary` |
| `chevron` | no-results | fill | `--icon--base--secondary` |
| `chevron` | filled | fill | `--icon--base--secondary` |
| `chevron` | error | fill | `--icon--base--secondary` |
| `chevron` | read-only | fill | `--icon--base--secondary` |
| `chevron` | disabled | fill | `--icon--base--disabled` |
| `chevron` | focus | fill | `--icon--base--secondary` |
| `clear` | filled | fill | `--icon--base--secondary` |
| `clear` | writing | fill | `--icon--base--secondary` |
| `clear` | no-results | fill | `--icon--base--secondary` |
| `clear` | disabled | fill | `--icon--base--disabled` |
| `panel` | default | background | `--surface--base--default` |
| `panel` | default | border | `--border--base--secondary` |
| `tooltip` | default | fill | `--icon--semantic--info` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-xs` · 4px |
| `field` | height | — | 44px |
| `field` | padding-inline | — | `--neo-space-md` · 12px |
| `field` | padding-block | — | `--neo-space-sm` · 8px |
| `field` | gap | — | `--neo-space-sm` · 8px |
| `field` | border-radius | — | `--neo-radius-sm` · 8px |
| `field` | border-width | — | `--neo-stroke-xs` · 1px |
| `label-row` | gap | — | `--neo-space-xs` · 4px |
| `icon` | width | — | 24px |
| `icon` | height | — | 24px |
| `chevron` | width | — | 24px |
| `chevron` | height | — | 24px |
| `clear` | width | — | 24px |
| `clear` | height | — | 24px |
| `panel` | distance to the anchor | — | `--neo-space-sm` · 8px |
| `tooltip` | width | — | 16px |
| `tooltip` | height | — | 16px |

<!-- prosa:layout -->

> **The height rules over the vertical padding.** The master fixes the control at **44px** and the content
> measures a 24 line, so vertically the content is **centered** — there is no vertical design padding
> to copy. (In Figma the frame declares 12, but with a fixed height: 12+24+12 would give 48, not 44.)
> In CSS it is achieved with `min-height: 44px` + `align-items: center`; the 8 of `padding-block` is only
> the floor when the content is smaller. **The one that is a design measure is the horizontal one: 12.**

**Panel and options** (`menu/list` + `_menu/item`) → layout in **[`menu.md`](menu.md)**.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `label` | — | `Body/lg-Medium` | 16px | 500 | 24px | — |
| `placeholder` | — | `Body/lg-Regular` | 16px | 400 | 24px | 1 line |
| `value` | — | `Body/lg-Regular` | 16px | 400 | 24px | — |
| `helper` | — | `Body/md-Regular` | 14px | 400 | 20px | — |

---

## HTML

<!-- prosa:html -->

```html
<!-- Combobox default (cerrado) -->
<div class="combobox">
  <div class="combobox__label-row">
    <!-- C5 · The label wraps, and its LAST WORD, the asterisk and the ⓘ go together in `combobox__label-tail`, which
         never breaks: the ⓘ never ends up alone on a line. The label is split in two <label> for the same control
         so the ⓘ stays out of both, and the control's name is the text of the two, without the ⓘ's. -->
    <label id="comuna-label" class="combobox__label">Comuna de</label>
    <span class="combobox__label-tail"><label id="comuna-label-tail" class="combobox__label">despacho</label>
    <!-- Help icon (ⓘ): 16px, self-colored (the sheet only sets the size). The trigger is a
         BUTTON, not the <svg>: it has to receive focus or the tooltip does not exist for the keyboard.
         The glyph is NOT chosen: the master fixes it at `semantic/info` in its 32 variants. -->
    <button type="button" class="combobox__icon combobox__icon--tooltip"
            aria-label="Qué comunas hay" aria-describedby="comuna-tip">
      <svg class="combobox__icon--tooltip" aria-hidden="true"><use href="#semantic-info"></use></svg>
    </button></span>
    <div id="comuna-tip" role="tooltip" class="tooltip">Solo las comunas de la región elegida.</div>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label comuna-label-tail"
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
    <button class="combobox__clear" aria-label="Limpiar"><svg aria-hidden="true"><use href="#system-error"></use></svg></button>
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
    <button class="combobox__clear" aria-label="Limpiar selección"><svg aria-hidden="true"><use href="#system-error"></use></svg></button>
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

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `input` | `<input>` | `role="combobox"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the field |
| `typing` | filters the list down to the matches |
| `↑ ↓` | moves between the remaining options |
| `Enter` | picks the focused option; focus stays on the field |
| `Escape` | clears the filter or closes; returns focus to the field |

Deviations from the APG pattern:

| Key | The APG pattern | Neo, and why |
|---|---|---|
| `↓` | Down Arrow: Moves focus to and selects the next option. | Moving through the options marks the active one without selecting it: the value is what the person commits with Enter or a click. Selecting on every move, as the APG describes for the listbox popup, would mean writing it by hand instead of dressing the base component, and the system does not rewrite components (rule 7). |
| `↑` | Up Arrow: Moves focus to and selects the previous option. | Same as moving down: the arrows mark the active option and the selection waits for Enter or a click. Selecting on every move would mean writing it by hand instead of dressing the base component, and the system does not rewrite components (rule 7). |

---

## Rules

| Limit | When exceeded |
|---|---|
| **options without scrolling:** up to 6 options | with 7 or more it switches to scrolling with a fixed 260px height |

| When | Then |
|---|---|
| `state=error` | feedbackMessage must be declared |
| `iconTooltip=true` | tooltipText must be declared |

<!-- prosa:rules -->

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
- The panel **floats** (`position: absolute`) — it never pushes the layout. **It must render in a portal (or with a high `z-index`)** so it is not covered by the form's following fields.
- **The label keeps to 1 to 3 words, and in Figma the master caps `Input Label` at 2 lines.** A label that does not fit
  in one line is set to Fill in the design and wraps up to 2 lines, with the ⓘ beside it. The component never cuts it:
  the code wraps as far as the text needs, so the required asterisk is never lost if a label breaks the rule.
- In `state=error` always include the `feedback-message` — do not rely only on the border color. In React it travels in MUI's single slot, `helperText`, and the theme paints it as an error: the master has two text elements (`helper-text` and `feedback-message`) and Material UI exposes one.
- `read-only` ≠ `disabled`: read-only shows the value and lets it be read; disabled excludes the field from the form and from the keyboard order.
- If one option has an icon, all of them must have it — mixed icons create a false hierarchy.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`select`](select.md) | the list is short and there is no need to search |
| [`text-field`](text-field.md) | the value is free text and does not come from a list |
| [`menu`](menu.md) | what you do is run an action |

---

## Accessibility

- THE LABEL IS VISIBLE AND STATIC, above the field (C7). It does not float like MUI's: that is why the field is composed with its own label.
- The helper text and the error message COEXIST: both are referenced from `aria-describedby`, alongside `aria-labelledby`. One does not replace the other.
- With an error, the field carries `aria-invalid="true"` AND `aria-describedby` pointing to the message. Verified by rendering, not by reading — that check caught the combobox regression when it migrated to TextField.
- The error message carries `role="alert"`: it appears after the person has already moved past the field, so it has to be announced.
- Read-only carries the native `readonly`, and only that: ARIA in HTML asks authors not to write `aria-readonly` on an element that has it.
- The ⓘ help icon is a `<button type="button">` with an `aria-label` that names the help («Qué es el RUT», not «ayuda»); its `<svg>` is `aria-hidden`.
- «Sin resultados» is NOT an error: it carries neither `aria-invalid` nor `role=alert`. It is the normal state of a filter that found nothing.
- The ⊗ clear button needs an accessible name: it is a control, not decoration.

<!-- prosa:accessibility -->

- **WCAG 2.4.7 (Focus Visible)** — `state=focus` always shows the focus ring in keyboard navigation, and **only** there. **Implementation contract:** the ring is governed by the `.combobox--focus` class, **not** by `:focus-visible` — on a text `<input>``:focus-visible` also activates with a mouse and would break "keyboard only". In React, `NeoCombobox` turns its focus class on by detecting the input modality (`keydown` → keyboard · `pointerdown` → pointer); with the plain CSS layer, whoever uses it turns on `.combobox--focus` the same way.
- **WCAG 2.4.11 / 2.4.13 (Focus Appearance)** — the ring uses two layers (ring + contrast gap) with thickness `--neo-stroke-focus-ring-width`, guaranteeing visibility on any background.

<!-- /prosa:accessibility -->
