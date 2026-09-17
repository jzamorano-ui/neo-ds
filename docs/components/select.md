# Select

> **Figma (source of truth):** [❖ Select](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003102-19653) — visual validation against the master.

Single selection of one option from a predefined set; it does not accept text input. For actions use **Menu**; for 2 options, **radio button**. If there are so many that searching by typing is better, **Combobox**. It consumes the shared primitives **`menu/list`** (panel) and **`_menu/item`** (option) — documented in [`menu.md`](menu.md); in Select they take the ARIA role `listbox`/`option`.

---

## Properties

### Select

| Property | Values |
|---|---|
| `state` | default · focus · active · filled · error · read-only · disabled |
| `label` | visible text — required |
| `placeholder` | visible text in the trigger before selecting — it disappears on interaction |
| `helper-text` | true · false — contextual instruction under the trigger |
| `icon-tooltip` | true · false — help icon next to the label (ⓘ `semantic/info`, 16px — see `text-field.md`) |
| `↪ tooltip` | true · false — tooltip of the help icon |

- **`focus`** = field focused by keyboard, closed (focus ring visible).
- **`active`** = panel open (`menu/list` open).

### menu/list (panel) · \_menu/item (option)

Properties, states and behavior (scroll, divider, option icon) → **[`menu.md`](menu.md)**. In Select they take the ARIA role `listbox`/`option`.

---

## Props

```typescript
interface NeoSelectProps {
  label: ReactNode                    // The visible text of the component.
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
  [prop: string]: unknown             // the rest flows to MUI's Select
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

---

## Tokens

### Color

**Select — Trigger and label**

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `select-container` | default · focus · active · filled · error | background | `--fill--base--default` |
| `select-container` | read-only | background | `--fill--base--medium` |
| `select-container` | disabled | background | `--fill--base--disabled` |
| `select-container` | default · filled · read-only | border | `--border--base--default` |
| `select-container` | active | border | `--border--base--focus` |
| `select-container` | error | border | `--border--semantic--error-solid` |
| `select-container` | disabled | border | `--border--base--disabled` |
| `select-container` | focus | border + anillo | see **Focus ring** |
| `label` | default · focus · active · filled · read-only | color | `--text--base--default` |
| `label` | error | color | `--text--semantic--error` |
| `label` | disabled | color | `--text--base--disabled` |
| `select-value` (placeholder) | default · focus · active · error | color | `--text--base--secondary` |
| `select-value` (valor) | filled · read-only | color | `--text--base--default` |
| `select-value` | disabled | color | `--text--base--disabled` |
| `chevron` | default · **filled** · focus · active · error · read-only | fill | `--icon--base--secondary` |
| `chevron` | disabled | fill | `--icon--base--disabled` |
| `helper-text` | default · focus · active · filled · read-only | color | `--text--base--secondary` |
| `helper-text` | disabled | color | `--text--base--disabled` |
| `feedback-message` | error | color | `--text--semantic--error` |

**Focus ring** (keyboard navigation — `state=focus`)

| Layer | CSS property | CSS custom property |
|---|---|---|
| anillo externo | border (outside) | `--focus--ring--default` |
| gap (separador) | border (inside the `select-container`) | `--focus--gap--default` |
| grosor (ambos) | border-width | `--neo-stroke-focus-ring-width` (2px) |

**Panel and options** (`menu/list` + `_menu/item`) → color tokens in **[`menu.md`](menu.md)**.

**Also:** the options panel uses `--surface--base--default` as its background (inherited from `menu/list` — see `menu.md`).

### Layout

**Select**

| Property | CSS custom property | Value |
|---|---|---|
| `gap` (label-row · trigger · helper) | `--neo-space-xs` | 4px |
| `padding-block` (trigger) | `--neo-space-sm` | 8px — **a floor, not the measure**: see note |
| `min-height` (trigger) | — (layout constant) | 44px — touch target shared with text-field and combobox |
| `padding-inline` (trigger) | `--neo-space-md` | 12px |
| `gap` (trigger: valor · chevron) | `--neo-space-sm` | 8px |
| `border-radius` (trigger) | `--neo-radius-sm` | 8px |
| `border-width` (trigger) | `--neo-stroke-xs` | 1px |
| `min-width` (trigger) | — (layout constant) | 160px |

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
| `select-value` (placeholder · valor) | `body/lg-regular` | 16px | 400 | 24px |
| `option-label` | `body/lg-regular` | 16px | 400 | 24px |
| `helper-text` · `feedback-message` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- Select default (cerrado) -->
<div class="select">
  <div class="select__label-row">
    <label id="region-label" class="select__label">Región</label>
    <!-- Help icon (ⓘ): 16px, self-colored (the sheet only sets the size). The trigger is a
         BUTTON, not the <svg>: it has to receive focus or the tooltip does not exist for the keyboard.
         The glyph is NOT chosen: the master fixes it at `semantic/info` in its 32 variants. -->
    <button type="button" class="select__icon--tooltip"
            aria-label="Qué regiones hay" aria-describedby="region-tip">
      <svg class="select__icon--tooltip" aria-hidden="true"><use href="#semantic-info"></use></svg>
    </button>
    <div id="region-tip" role="tooltip" class="tooltip">Solo las regiones con cobertura.</div>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="region-label"
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

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Select trigger | `<button role="combobox">` | `aria-expanded` · `aria-haspopup="listbox"` · `aria-controls="[panel-id]"` · `aria-labelledby="[label-id]"` |
| Select in error | `<button role="combobox">` | `aria-invalid="true"` · `aria-describedby="[feedback-id]"` |
| Label | `<label>` | `id` — referenced in the trigger's `aria-labelledby` |
| Panel (menu/list) | `<ul role="listbox">` | `id` · `aria-labelledby="[label-id]"` |
| Option (\_menu/item) | `<li role="option">` | `id` · `aria-selected="true\|false"` |
| Disabled option | `<li role="option">` | `aria-disabled="true"` |
| Option active by keyboard | trigger | `aria-activedescendant="[option-id]"` |
| Error feedback | `<span>` | `role="alert"` · `id` referenced in `aria-describedby` |
| Decorative icons | `<svg>` | `aria-hidden="true"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Moves focus to the trigger → `state=focus` (focus ring visible) |
| `Shift + Tab` | Focus to the previous element |
| `Enter` · `Space` | Opens the panel (`state=active`) · Selects the active option (panel open) |
| `↓` | Opens the panel · Moves focus to the next option |
| `↑` | Moves focus to the previous option |
| `Home` | Moves focus to the first option |
| `End` | Moves focus to the last option |
| Escribir (letras) | Type-ahead: moves focus to the first matching option |
| `Escape` | Closes the panel without selecting |
| `Tab` (inside the panel) | Closes the panel and moves focus to the next element |

---

## Rules

- `label` always visible — the placeholder disappears on interaction.
- **`focus` vs `active`:** `focus` = focused by keyboard and closed (focus ring); `active` = panel open. Keyboard navigation **always** shows the focus ring.
- **State combinations:** `filled` · `error` · `read-only` (state of the data) are **orthogonal** to `focus` · `active` (interaction) and coexist — e.g. `filled` + `focus` + `error`. `disabled` and `read-only` **cancel** the interaction.
- **Scroll:** up to 6 options → `scroll=none` (hug, no scrollbar). With 7 or more → `scroll` with a fixed height of **260px** showing 50% of the next option as a hint.
- **Width:** the `trigger` has a min-width of **160px**. The panel matches the input's width; if the input goes below 200px, the panel stays at **200px aligned to the left** (it is not centered).
- The panel **floats** (`position: absolute`) — it never pushes the layout, it only overlaps. **It must render in a portal (or with a high `z-index`)** so it is not covered by the form's following fields.
- The option label **truncates to 1 line with an ellipsis** — it never wraps.
- In `state=error` always include `feedbackMessage` — do not rely only on the border color.
- `read-only` ≠ `disabled`: read-only shows the value and lets it be read; disabled excludes the field from the form and from the keyboard order.
- Only for value selection — if the action runs something use **Menu**; if there are only 2 options use **Radio button**.
- If one option has an icon, all of them must have it — mixed icons create a false hierarchy.

---

## Accessibility

- **WCAG 1.3.1** — label associated programmatically via `aria-labelledby` on the trigger.
- **WCAG 4.1.2** — trigger with `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"` and `aria-controls` pointing to the panel.
- **WCAG 2.1.1** — full keyboard: arrows to navigate, Enter to select, Escape to close.
- **WCAG 2.4.7 (Focus Visible)** — `state=focus` always shows the focus ring in keyboard navigation.
- **WCAG 2.4.11 / 2.4.13 (Focus Appearance)** — the ring uses two layers (ring + contrast gap) with thickness `--neo-stroke-focus-ring-width`, guaranteeing visibility on any background.
- **WCAG 3.3.1** — on error: `aria-invalid="true"` on the trigger + visible message referenced with `aria-describedby`.
- **WCAG 2.4.6** — the label identifies the purpose; do not use a placeholder alone.
