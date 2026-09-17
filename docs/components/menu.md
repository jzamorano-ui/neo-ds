# Menu

> **Figma (source of truth):** [❖ Menu](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003104-25695) — visual validation against the master.

Public **floating list** primitive: `menu/list` is the reusable panel (options + divider + scroll) that is composed with **any trigger** (button, icon-button, avatar, card…). It is consumed by **Select** and **Combobox** (ARIA role `listbox`/`option`) and by action menus (native role `menu`/`menuitem`).

`menu/list` is the **public** component. `_menu/item` (the option) is an **internal building block**: it is not instantiated alone. The line between groups of options belongs to the panel —the `divider` property of `menu/list`, and `{ divider: true }` in `items` in React—. The library also has a standalone `divider` master, and it is outside the system: it has no spec, no CSS and no component.

> The full usage patterns of an action menu (DO/DON'T, action menu, user menu, destructive grouping) are documented separately.

---

## Properties

### menu/list (panel — public)

| Property | Values |
|---|---|
| `scroll` | none · top · mid · bottom |
| `divider` | true · false — separator before the terminal action(s) |
| `option-1` … `option-10` | true · false — shows or hides each option slot |

- **`scroll=none`** — hug, up to 6 options, no scrollbar. **`top · mid · bottom`** — with 7+ options: a fixed height of **260px** (6 rows of 40 + 50% of the next) with inner scroll; `top/mid/bottom` = the scroll position.
- **`divider`** separates the last action (hug: 1 terminal) or the last two (scroll: 2 terminals) — for destructive/terminal actions (e.g. *Delete*, *Log out*).

### \_menu/item (option — internal)

| Property | Values |
|---|---|
| `state` | default · hover · active · focus · disabled |
| `icon` | true · false — shows or hides the icon |
| `label-text` | option text — required |

- The icon is changed by a **native swap** of `option-icon` (there is no exposed prop).
- `active` = selected/highlighted option. If one option has an icon, all of them must have it.

### divider (separator — part of the panel)

A 1px line that separates groups of options. It only exists inside `menu/list`: the `divider` property turns it on in Figma, and `{ divider: true }` in `items` draws it in React.

---

## Props

```typescript
interface NeoMenuProps {
  trigger: ReactElement               // The trigger that opens the panel. It is EXTERNAL: any element works.
  items?: Array<{ value?: string; label?: ReactNode; icon?: string | ReactElement; disabled?: boolean; divider?: boolean; onSelect?: (value: string) => void }>  // The pieces of a composite: each one with its value, its label and its content.
  'aria-label'?: string               // The accessible name when there is no visible text that provides it.
  defaultOpen?: boolean               // The panel starts open and the component handles it afterwards. It is the UNCONTROLLED version of `open`: useful to document or capture the open panel without holding the state from outside.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Menu
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

---

## Tokens

### Color

**menu/list (panel)**

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `panel` | — | background | `--surface--base--default` |
| `panel` | — | border | `--border--base--secondary` (subtle on purpose — **the panel's edge is conveyed by the `--neo-elevation-md` shadow, not the border**, that is why it does not need 3:1: it is a conscious, recorded exception) |
| `panel` | — | box-shadow | `--neo-elevation-md` |
| `scrollbar-track` | — | background | `--fill--base--default` |
| `scrollbar-thumb` | — | background | `--fill--base--medium` |
| `divider` | — | background | `--border--base--secondary` |

**\_menu/item (option)**

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `option` | default | background | `--fill--tertiary--default` |
| `option` | hover | background | `--fill--tertiary--hover` |
| `option` | active | background | `--fill--tertiary--active` |
| `option` | focus | background | `--fill--tertiary--default` |
| `option` | focus | outline (ring; in CSS it is an inset `box-shadow` because the panel clips) | `--focus--ring--default` |
| `option` | focus | box-shadow (gap) | `--focus--gap--default` |
| `option` | disabled | background | `--fill--base--disabled` |
| `option-label` | — | color | `--text--base--default` (it does not change with hover, active or focus) |
| `option-label` | disabled | color | `--text--base--disabled` |
| `option-icon` | — | fill | `--icon--base--default` (same: it does not change with the state) |
| `option-icon` | disabled | fill | `--icon--base--disabled` |

> **Focus does not touch the background.** In the DOM an option can be
> **selected and focused at the same time** —in Figma `active` and `focus` are mutually exclusive variants— and with
> the hover background the selected one would stop being visible under the ring.

**Focus ring** (the item's `state=focus` — keyboard navigation)

| Layer | CSS property | CSS custom property |
|---|---|---|
| anillo | box-shadow (inset, the panel clips) | `--focus--ring--default` |
| gap | box-shadow (inset) | `--focus--gap--default` |
| grosor | border-width | `--neo-stroke-focus-ring-width` (2px) |

### Layout

**menu/list (panel)**

| Property | CSS custom property | Value |
|---|---|---|
| `padding-block` | — | **0** — the panel carries no padding: the rows reach the edge |
| `border-radius` | `--neo-radius-sm` | 8px |
| `border-width` | `--neo-stroke-xs` | 1px |
| `max-height` (scroll) | — | 260px (6 rows of 40 + 50% of the 7th) |
| `min-width` | — (layout constant) | 200px |
| `scrollbar` (width) | — | 4px |
| `scrollbar` (radius) | `--neo-radius-pill` | — |

**\_menu/item (option)**

| Property | CSS custom property | Value |
|---|---|---|
| `height` (fila) | — | 40px (control-height, min-height) |
| `padding-block` | `--neo-space-sm` | 8px |
| `padding-inline` | `--neo-space-lg` | 16px |
| `gap` (icon · label) | `--neo-space-md` | 12px |
| `icon` (size) | `--neo-icon-size-md` | 24px |

> The two paddings come from measuring the master: the panel goes at **0** and the row at **8**, not 8 and 12.
> With 12 the row would measure 48 (12+24+12) and the scrolling panel —260px— would show 5.4 rows instead
> of six and a half.

**divider**

| Property | CSS custom property | Value |
|---|---|---|
| `height` | `--neo-stroke-xs` | 1px |

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `option-label` | `body/lg-regular` | 16px | 400 | 24px |

---

## HTML

```html
<!-- menu/list as an action menu (native role menu/menuitem) -->
<!-- `.menu-anchor` is NOT decoration: the panel is positioned with `absolute` and without an ancestor
     that is positioned it is placed relative to the page, far from the button that opened it. It wraps the
     trigger and the panel. Select and Combobox do not need it: their own root already plays that role. -->
<div class="menu-anchor">
  <!-- The trigger is external: any Button / Button-icon -->
  <button id="acciones-trigger" class="btn btn--tertiary btn--medium btn--icon-only"
          aria-haspopup="menu" aria-expanded="true" aria-controls="acciones-menu"
          aria-label="Más acciones">⋮</button>

  <ul class="menu-list" id="acciones-menu" role="menu" aria-labelledby="acciones-trigger">
  <li class="menu-item" role="menuitem" tabindex="-1">
    <svg class="menu-item__icon" aria-hidden="true"><use href="#system-edit"></use></svg>
    <span class="menu-item__label">Editar</span>
  </li>
  <li class="menu-item" role="menuitem" tabindex="-1">
    <svg class="menu-item__icon" aria-hidden="true"><use href="#system-copy"></use></svg>
    <span class="menu-item__label">Duplicar</span>
  </li>
  <li class="menu-item" role="menuitem" tabindex="-1">
    <svg class="menu-item__icon" aria-hidden="true"><use href="#system-cloud-share"></use></svg>
    <span class="menu-item__label">Compartir</span>
  </li>
  <li class="menu-divider" role="separator"></li>
  <li class="menu-item" role="menuitem" tabindex="-1">
    <svg class="menu-item__icon" aria-hidden="true"><use href="#system-trash"></use></svg>
    <span class="menu-item__label">Eliminar</span>
  </li>
  </ul>
</div>
```

```html
<!-- menu/list with scroll (7+ options). Same anchor: the panel floats, it always needs one. -->
<div class="menu-anchor">
  <ul class="menu-list menu-list--scroll" role="menu">
  <li class="menu-item" role="menuitem" tabindex="-1"><span class="menu-item__label">Acción 1</span></li>
  <!-- … 7+ options → internal scroll, 260px -->
</ul>
</div>
```

> In **Select**/**Combobox** the same `menu/list` takes `role="listbox"` and the items `role="option"` + `aria-selected` — see `select.md` / `combobox.md`.

---

## ARIA

`menu/list` is **dual-role** depending on the consumer:

| Consumidor | Panel | Item | Item attributes |
|---|---|---|---|
| **Action menu** | `role="menu"` | `role="menuitem"` | `tabindex="-1"` (focus managed by the menu) |
| **Select / Combobox** | `role="listbox"` | `role="option"` | `aria-selected="true\|false"` |

| Element | Tag · Role | Required attributes |
|---|---|---|
| Trigger (externo) | `<button>` | `aria-haspopup="menu"` · `aria-expanded` · `aria-controls="[panel-id]"` |
| Panel (menu/list) | `<ul role="menu">` | `id` · `aria-labelledby="[trigger-id]"` |
| Option (\_menu/item) | `<li role="menuitem">` | `tabindex="-1"` |
| Disabled option | `<li role="menuitem">` | `aria-disabled="true"` |
| Separador (divider) | `<li role="separator">` | — |
| Decorative icons | `<svg>` | `aria-hidden="true"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Enter` · `Space` (on the trigger) | Opens the menu and moves focus to the first option |
| `↓` | Moves focus to the next option |
| `↑` | Moves focus to the previous option |
| `Home` | First option |
| `End` | Last option |
| `Enter` · `Space` (on an option) | Runs the action and closes the menu |
| Escribir (letras) | Type-ahead: moves focus to the first matching option |
| `Escape` | Closes the menu and returns focus to the trigger |
| `Tab` | Closes the menu and moves focus to the next element |

---

## Rules

- **`menu/list` is public** — `_menu/item` and the `divider` separator are parts of it: neither is instantiated alone.
- **The trigger is external:** `menu/list` is composed with any Button/Button-icon/avatar. It does not bundle a fixed trigger.
- The panel **floats** (`position: absolute`) — it never pushes the layout. **It must render in a portal (or with a high `z-index`)** so it is not covered by the following content.
- **Scroll:** up to 6 options → `scroll=none` (hug). With 7+ → `scroll` with a fixed height of **260px**.
- **How many options:** **up to 10**. With more, the list stops being scannable and a search (`combobox`) is better than a list.
- **Divider:** to separate the terminal/destructive action(s) from the rest. Hug = 1 terminal at the bottom; scroll = 2.
- The option label **truncates to 1 line with an ellipsis** — it never wraps.
- If one option has an icon, all of them must have it — mixed icons create a false hierarchy.
- **Role by use:** actions → `menu`/`menuitem`; value selection → `listbox`/`option` (Select/Combobox).

---

## Accessibility

- **WCAG 4.1.2** — panel with the right `role` (`menu` or `listbox`), trigger with `aria-haspopup` + `aria-expanded` + `aria-controls`.
- **WCAG 2.1.1** — full keyboard: arrows to navigate, Enter/Space to run/select, Escape to close, type-ahead.
- **WCAG 2.4.3 (Focus Order)** — when opening, focus enters the menu; when closing, it returns to the trigger.
- **WCAG 2.4.7 / 2.4.11 / 2.4.13 (Focus Appearance)** — the item's `state=focus` uses a ring + gap with thickness `--neo-stroke-focus-ring-width`, visible on any background.
- **WCAG 1.4.13** — the menu does not disappear when the pointer moves toward it; it closes with Escape or focus outside.
