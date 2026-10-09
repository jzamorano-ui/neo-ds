<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Select

> **Figma (source of truth):** [❖ Select](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003102-19653) — visual validation against the master.

<!-- prosa:intro -->

Single selection of one option from a predefined set; it does not accept text input. For actions use **Menu**; for 2 options, **radio button**. If there are so many that searching by typing is better, **Combobox**. It consumes the shared primitives **`menu/list`** (panel) and **`_menu/item`** (option) — documented in [`menu.md`](menu.md); in Select they take the ARIA role `listbox`/`option`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `state` | default · focus · active · filled · error · read-only · disabled |
| `label` | text |
| `placeholder` | text |
| `helper-text` | true · false — default `false` |
| `icon-tooltip` | true · false — default `true` |
| `feedback` | true · false — default `true` |

<!-- prosa:properties -->

- **`focus`** = field focused by keyboard, closed (focus ring visible).
- **`active`** = panel open (`menu/list` open).

Properties, states and behavior (scroll, divider, option icon) → **[`menu.md`](menu.md)**. In Select they take the ARIA role `listbox`/`option`.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoSelectProps {
  label?: ReactNode                   // The visible text of the component.
  required?: boolean                  // The field is required.
  helperText?: ReactNode              // The help text under the field. In `error` this same slot says the error message: they are not two.
  error?: boolean                     // The value does not pass validation. The message goes in the same `helperText` slot.
  readOnly?: boolean                  // It can be read but not edited.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  tooltip?: ReactNode                 // The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it.
  tooltipLabel?: string               // The accessible name of the ⓘ button. By default «Ayuda sobre <label>» (end-user text, in Spanish); pass it when that phrase does not name the help well.
  id?: string                         // The control id, to link the label and the descriptions.
  placeholder?: string                // The hint text inside the field. It never replaces the label, which is visible and static.
  renderValue?: (valor: unknown) => ReactNode  // How the chosen value is drawn in the trigger.
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Select not listed above
  // required: a name: `label`, `aria-label`, `aria-labelledby` —one of them
}
```

---

## Tokens

### Color

<!-- prosa:color -->

**Panel and options** (`menu/list` + `_menu/item`) → color tokens in **[`menu.md`](menu.md)**.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `label` | default | color | `--text--base--default` |
| `label` | active | color | `--text--base--default` |
| `label` | filled | color | `--text--base--default` |
| `label` | error | color | `--text--semantic--error` |
| `label` | read-only | color | `--text--base--default` |
| `label` | disabled | color | `--text--base--disabled` |
| `label` | focus | color | `--text--base--default` |
| `placeholder` | default | color | `--text--base--secondary` |
| `placeholder` | active | color | `--text--base--secondary` |
| `placeholder` | filled | color | `--text--base--default` |
| `placeholder` | error | color | `--text--base--secondary` |
| `placeholder` | read-only | color | `--text--base--default` |
| `placeholder` | disabled | color | `--text--base--disabled` |
| `placeholder` | focus | color | `--text--base--secondary` |
| `trigger-box` | default | background | `--fill--base--default` |
| `trigger-box` | default | border | `--border--base--default` |
| `trigger-box` | active | background | `--fill--base--default` |
| `trigger-box` | active | border | `--border--base--focus` |
| `trigger-box` | filled | background | `--fill--base--default` |
| `trigger-box` | filled | border | `--border--base--default` |
| `trigger-box` | error | background | `--fill--base--default` |
| `trigger-box` | error | border | `--border--semantic--error-solid` |
| `trigger-box` | read-only | background | `--fill--base--medium` |
| `trigger-box` | read-only | border | `--border--base--default` |
| `trigger-box` | disabled | background | `--fill--base--disabled` |
| `trigger-box` | disabled | border | `--border--base--disabled` |
| `trigger-box` | focus | background | `--fill--base--default` |
| `trigger-box` | focus | border/box-shadow | `--focus--gap--default` |
| `trigger-box` | focus | outline | `--focus--ring--default` |
| `chevron` | default | fill | `--icon--base--secondary` |
| `chevron` | active | fill | `--icon--base--secondary` |
| `chevron` | filled | fill | `--icon--base--secondary` |
| `chevron` | error | fill | `--icon--base--secondary` |
| `chevron` | read-only | fill | `--icon--base--secondary` |
| `chevron` | disabled | fill | `--icon--base--disabled` |
| `chevron` | focus | fill | `--icon--base--secondary` |
| `helper` | default | color | `--text--base--secondary` |
| `helper` | active | color | `--text--base--secondary` |
| `helper` | filled | color | `--text--base--secondary` |
| `helper` | error | color | `--text--semantic--error` |
| `helper` | read-only | color | `--text--base--secondary` |
| `helper` | disabled | color | `--text--base--disabled` |
| `helper` | focus | color | `--text--base--secondary` |
| `feedback` | error | color | `--text--semantic--error` |
| `panel` | default | background | `--surface--base--default` |
| `panel` | default | border | `--border--base--secondary` |
| `tooltip` | default | fill | `--icon--semantic--info` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-xs` · 4px |
| `trigger-box` | height | — | 44px |
| `trigger-box` | padding-inline | — | `--neo-space-md` · 12px |
| `trigger-box` | padding-block | — | `--neo-space-sm` · 8px |
| `trigger-box` | gap | — | `--neo-space-sm` · 8px |
| `trigger-box` | border-radius | — | `--neo-radius-sm` · 8px |
| `trigger-box` | border-width | — | `--neo-stroke-xs` · 1px |
| `label-row` | gap | — | `--neo-space-xs` · 4px |
| `chevron` | width | — | 24px |
| `chevron` | height | — | 24px |
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

## Motion

| Motion | Element | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|---|
| `open` | `chevron` | state | 150 ms | cubic-bezier(0.25, 0.1, 0.25, 1) | — |

---

## HTML

<!-- prosa:html -->

```html
<!-- Select default (cerrado) -->
<div class="select">
  <div class="select__label-row">
    <!-- C5 · The label wraps, and its LAST WORD, the asterisk and the ⓘ go together in `select__label-tail`, which
         never breaks: the ⓘ never ends up alone on a line. The label is split in two <label> for the same control
         so the ⓘ stays out of both, and the control's name is the text of the two, without the ⓘ's. -->
    <label id="region-label" class="select__label">Región de</label>
    <span class="select__label-tail"><label id="region-label-tail" class="select__label">despacho</label>
    <!-- Help icon (ⓘ): 16px, self-colored (the sheet only sets the size). The trigger is a
         BUTTON, not the <svg>: it has to receive focus or the tooltip does not exist for the keyboard.
         The glyph is NOT chosen: the master fixes it at `semantic/info` in its 32 variants. -->
    <button type="button" class="select__icon--tooltip"
            aria-label="Qué regiones hay" aria-describedby="region-tip">
      <svg class="select__icon--tooltip" aria-hidden="true"><use href="#semantic-info"></use></svg>
    </button></span>
    <div id="region-tip" role="tooltip" class="tooltip">Solo las regiones con cobertura.</div>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="region-label region-label-tail"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-controls="region-listbox">
    <span class="select__value select__value--placeholder">Selecciona una región</span>
    <svg class="select__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </button>
  <span class="select__helper">Texto de ayuda.</span>
</div>
```

```html
<!-- Select focus (focused by keyboard, closed — focus ring) -->
<div class="select select--focus">
  <div class="select__label-row">
    <label id="plan-label-f" class="select__label">Plan</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="plan-label-f"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-controls="plan-listbox-f">
    <span class="select__value select__value--placeholder">Seleccionar</span>
    <svg class="select__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </button>
</div>
```

```html
<!-- Select active (panel desplegado) -->
<div class="select select--active">
  <div class="select__label-row">
    <label id="plan-label" class="select__label">Plan</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="plan-label"
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-controls="plan-listbox"
          aria-activedescendant="plan-opt-2">
    <span class="select__value">Plan 2</span>
    <svg class="select__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </button>
  <ul class="menu-list" id="plan-listbox" role="listbox" aria-labelledby="plan-label">
    <li class="menu-item" id="plan-opt-1" role="option" aria-selected="false">
      <span class="menu-item__label">Plan 1</span>
    </li>
    <li class="menu-item menu-item--active" id="plan-opt-2" role="option" aria-selected="true">
      <span class="menu-item__label">Plan 2</span>
    </li>
    <li class="menu-item" id="plan-opt-3" role="option" aria-selected="false">
      <span class="menu-item__label">Plan 3</span>
    </li>
  </ul>
</div>
```

```html
<!-- Select active with icons on options (≥6 distinct options) -->
<div class="select select--active">
  <div class="select__label-row">
    <label id="tramite-label" class="select__label">¿Qué necesitas?</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="tramite-label"
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-controls="tramite-listbox">
    <span class="select__value select__value--placeholder">Selecciona una opción</span>
    <svg class="select__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </button>
  <ul class="menu-list" id="tramite-listbox" role="listbox" aria-labelledby="tramite-label">
    <li class="menu-item" role="option" aria-selected="false">
      <svg class="menu-item__icon" aria-hidden="true">…</svg>
      <span class="menu-item__label">Reembolso</span>
    </li>
    <li class="menu-item" role="option" aria-selected="false">
      <svg class="menu-item__icon" aria-hidden="true">…</svg>
      <span class="menu-item__label">Licencia médica</span>
    </li>
    <!-- … Medical appointment · My plan · Care voucher · Support -->
  </ul>
</div>
```

```html
<!-- Select error -->
<div class="select select--error">
  <div class="select__label-row">
    <label id="region-label-err" class="select__label">Región</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="region-label-err"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-controls="region-listbox-err"
          aria-invalid="true"
          aria-describedby="region-feedback">
    <span class="select__value select__value--placeholder">Selecciona una región</span>
    <svg class="select__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </button>
  <span id="region-feedback" class="select__feedback" role="alert">Selecciona una opción para avanzar.</span>
</div>
```

```html
<!-- Select active with a scrollable panel (7+ options) -->
<div class="select select--active">
  <button class="select__trigger" role="combobox" aria-expanded="true"
          aria-haspopup="listbox" aria-controls="region-scroll-listbox">
    <span class="select__value select__value--placeholder">Selecciona una región</span>
    <svg class="select__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </button>
  <ul class="menu-list menu-list--scroll" id="region-scroll-listbox" role="listbox">
    <li class="menu-item" role="option" aria-selected="false"><span class="menu-item__label">Región 1</span></li>
    <li class="menu-item" role="option" aria-selected="false"><span class="menu-item__label">Región 2</span></li>
    <!-- … 7+ options → internal scroll, 260px -->
  </ul>
</div>
```

```html
<!-- Select disabled -->
<div class="select select--disabled">
  <div class="select__label-row">
    <label id="region-label-dis" class="select__label">Región</label>
  </div>
  <button class="select__trigger" role="combobox" aria-expanded="false"
          aria-haspopup="listbox" disabled>
    <span class="select__value select__value--placeholder">Seleccionar</span>
    <svg class="select__chevron" aria-hidden="true"><use href="#system-chevron-down"></use></svg>
  </button>
  <span class="select__helper">Texto de ayuda explicando por qué está deshabilitado.</span>
</div>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `div[aria-haspopup]` | `<div>` | `role="combobox"` · `aria-haspopup="listbox"` · `aria-expanded="false"` |
| `svg` | `<svg>` | `aria-hidden="true"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the trigger |
| `Enter · Space · ↓` | opens the panel |
| `↑ ↓` | moves between options |
| `Enter` | picks the focused option |
| `Escape` | closes and returns focus to the trigger |

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

- `label` always visible — the placeholder disappears on interaction.
- **`focus` vs `active`:** `focus` = focused by keyboard and closed (focus ring); `active` = panel open. Keyboard navigation **always** shows the focus ring.
- **State combinations:** `filled` · `error` · `read-only` (state of the data) are **orthogonal** to `focus` · `active` (interaction) and coexist — e.g. `filled` + `focus` + `error`. `disabled` and `read-only` **cancel** the interaction.
- The panel **floats** (`position: absolute`) — it never pushes the layout, it only overlaps. **It must render in a portal (or with a high `z-index`)** so it is not covered by the form's following fields.
- **The label keeps to 1 to 3 words, and in Figma the master caps `Input Label` at 2 lines.** A label that does not fit
  in one line is set to Fill in the design and wraps up to 2 lines, with the ⓘ beside it. The component never cuts it:
  the code wraps as far as the text needs, so the required asterisk is never lost if a label breaks the rule.
- In `state=error` always include the `feedback-message` — do not rely only on the border color. In React it travels in MUI's single slot, `helperText`, and the theme paints it as an error: the master has two text elements (`helper-text` and `feedback-message`) and Material UI exposes one.
- `read-only` ≠ `disabled`: read-only shows the value and lets it be read; disabled excludes the field from the form and from the keyboard order.
- Only for value selection — if the action runs something use **Menu**; if there are only 2 options use **Radio button**.
- If one option has an icon, all of them must have it — mixed icons create a false hierarchy.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`radio-button`](radio-button.md) | there are 2 options and both fit shown at once |
| [`combobox`](combobox.md) | there are so many that it helps to search by typing |
| [`menu`](menu.md) | what you do is run an action, not pick a value |

---

## Accessibility

- THE LABEL IS VISIBLE AND STATIC, above the field (C7). It does not float like MUI's: that is why the field is composed with its own label.
- The helper text and the error message COEXIST: both are referenced from `aria-describedby`, alongside `aria-labelledby`. One does not replace the other.
- With an error, the field carries `aria-invalid="true"` AND `aria-describedby` pointing to the message. Verified by rendering, not by reading — that check caught the combobox regression when it migrated to TextField.
- The error message carries `role="alert"`: it appears after the person has already moved past the field, so it has to be announced.
- Read-only carries `aria-readonly="true"` on the combobox: its element is a `div`, which has no `readonly` to carry it.
- The ⓘ help icon is a `<button type="button">` with an `aria-label` that names the help («Qué es el RUT», not «ayuda»); its `<svg>` is `aria-hidden`.
- The panel's role is `listbox`, not `menu`: using the wrong one makes a screen reader announce something it is not.
- On close, focus RETURNS to the trigger.
