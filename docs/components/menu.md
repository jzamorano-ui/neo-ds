<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Menu

> **Figma (source of truth):** [❖ Menu](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003104-25695) — visual validation against the master.

<!-- prosa:intro -->

Public **floating list** primitive: `menu/list` is the reusable panel (options + divider + scroll) that is composed with **any trigger** (button, icon-button, avatar, card…). It is consumed by **Select** and **Combobox** (ARIA role `listbox`/`option`) and by action menus (native role `menu`/`menuitem`).

`menu/list` is the **public** component. `_menu/item` (the option) is an **internal building block**: it is not instantiated alone. The line between groups of options belongs to the panel —the `divider` property of `menu/list`, and `{ divider: true }` in `items` in React—. The library also has a standalone `divider` master, and it is outside the system: it has no spec, no CSS and no component.

> The full usage patterns of an action menu (DO/DON'T, action menu, user menu, destructive grouping) are documented separately.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `scroll` | none · top · mid · bottom — not a prop: the DOM draws it when scrolling | `menu/list` |
| `state` | default · hover · focus · disabled · active | `_menu/item` |
| `label-text` | text | `_menu/item` |
| `icon` | true · false — default `true` | `_menu/item` |

<!-- prosa:properties -->

The panel (`menu/list`) has the `scroll` property. In the master each option is a slot (`option-1` … `option-10`) that is shown or hidden, and `divider` turns on the separator before the terminal action(s).

- **`scroll=none`** — hug, up to 6 options, no scrollbar. **`top · mid · bottom`** — with 7+ options: a fixed height with inner scroll; `top/mid/bottom` = the scroll position.
- **`divider`** separates the last action (hug: 1 terminal) or the last two (scroll: 2 terminals) — for destructive/terminal actions (e.g. *Delete*, *Log out*).

The option (`_menu/item`) has `state` (default · hover · active · focus · disabled), `icon` (shows or hides the icon) and `label-text` (the option text — required).

- The icon is changed by a **native swap** of `option-icon` (there is no exposed prop).
- `active` = selected/highlighted option. If one option has an icon, all of them must have it.

The separator (`divider`) is a line that separates groups of options. It only exists inside `menu/list`: the `divider` property turns it on in Figma, and `{ divider: true }` in `items` draws it in React.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoMenuProps {
  trigger: ReactElement               // The trigger that opens the panel. It is EXTERNAL: any element works.
  items?: Array<{ value?: string; label?: ReactNode; icon?: string | ReactElement; disabled?: boolean; divider?: boolean; onSelect?: (value: string) => void }>  // The pieces of a composite: each one with its value, its label and its content.
  'aria-label'?: string               // The accessible name when there is no visible text that provides it.
  defaultOpen?: boolean               // The panel starts open and the component handles it afterwards. It is the UNCONTROLLED version of `open`: useful to document or capture the open panel without holding the state from outside.
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'tabKeyDown') => void  // The close handler. Its presence draws the ✕.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Menu not listed above
}
```

---

## Tokens

### Color

<!-- prosa:color -->

The panel's border is subtle on purpose — **its edge is conveyed by the `--neo-elevation-md` shadow, not the border**, so it does not need 3:1: it is a conscious, recorded exception.

The panel's scrollbar (`scrollbar-track`, `scrollbar-thumb`) exists as a layer in the master only because Figma has no scroll; in code the browser draws it.

> **Focus does not touch the background.** In the DOM an option can be
> **selected and focused at the same time** —in Figma `active` and `focus` are mutually exclusive variants— and with
> the hover background the selected one would stop being visible under the ring.

The option's focus ring is drawn as an inset `box-shadow` (ring and gap, two layers), because the panel clips anything outside it. The label and the icon do not change with hover, active or focus.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--surface--base--default` |
| `root` | default | border | `--border--base--secondary` |
| `root` | default | box-shadow | `--neo-elevation-md` |
| `item` | default | background | `--fill--tertiary--default` |
| `item` | default | color | `--text--base--default` |
| `item` | hover | background | `--fill--tertiary--hover` |
| `item` | active | background | `--fill--tertiary--active` |
| `item` | focus | background | `--fill--tertiary--default` |
| `item` | focus | outline | `--focus--ring--default` |
| `item` | focus | box-shadow | `--focus--gap--default` |
| `item` | disabled | background | `--fill--base--disabled` |
| `item` | disabled | color | `--text--base--disabled` |
| `item-icon` | default | fill | `--icon--base--default` |
| `item-icon` | disabled | fill | `--icon--base--disabled` |
| `divider` | default | background | `--border--base--secondary` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | border-radius | — | `--neo-radius-sm` · 8px |
| `root` | border-width | — | `--neo-stroke-xs` · 1px |
| `root` | min-width | — | 200px |
| `item` | height | — | 40px |
| `item` | padding-block | — | `--neo-space-sm` · 8px |
| `item` | padding-inline | — | `--neo-space-lg` · 16px |
| `item` | gap | — | `--neo-space-md` · 12px |
| `item-icon` | width | — | `--neo-icon-size-md` · 24px |
| `item-icon` | height | — | `--neo-icon-size-md` · 24px |

<!-- prosa:layout -->

The panel carries no padding: the rows reach the edge. It has a minimum width and, with scroll, a fixed height of 260px (6 rows of 40 + 50% of the 7th).

> The two paddings come from measuring the master: the panel goes at **0** and the row at **8**, not 8 and 12.
> With 12 the row would measure 48 (12+24+12) and the scrolling panel —260px— would show 5.4 rows instead
> of six and a half.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `item` | — | `Body/lg-Regular` | 16px | 400 | 24px | 1 line |

---

## HTML

<!-- prosa:html -->

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
  <!-- … 7+ options → internal scroll -->
</ul>
</div>
```

> In **Select**/**Combobox** the same `menu/list` takes `role="listbox"` and the items `role="option"` + `aria-selected` — see `select.md` / `combobox.md`.

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `button` | `<button>` | `aria-haspopup="menu"` · `aria-expanded="true"` |
| `ul` | `<ul>` | `role="menu"` |
| `li` | `<li>` | `role="menuitem"` |

<!-- prosa:aria -->

`menu/list` is **dual-role** depending on the consumer: an action menu uses `role="menu"` with `role="menuitem"` items (`tabindex="-1"`, focus managed by the menu); Select and Combobox use `role="listbox"` with `role="option"` items and `aria-selected`.

The trigger is external and carries `aria-haspopup`, `aria-expanded` and `aria-controls`; the panel points back to it with `aria-labelledby`. A disabled option takes `aria-disabled="true"`, the separator is `role="separator"` and the decorative icons are `aria-hidden="true"`.

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Enter · Space` | opens the panel from the trigger |
| `↑ ↓` | moves between options |
| `Escape` | closes and returns focus to the trigger |
| `Enter` | picks the focused option |

---

## Rules

| Limit | When exceeded |
|---|---|
| **options without scrolling:** up to 6 | with 7 or more it switches to a fixed 260px height with internal scroll — it does not break, it changes behavior |
| **total options:** up to 10 | with more, the list can no longer be scanned — a search field (`combobox`) works better than a list |

| When | Then |
|---|---|
| always | trigger must be declared |
| always | aria-label must be declared |

<!-- prosa:rules -->

- **`menu/list` is public** — `_menu/item` and the `divider` separator are parts of it: neither is instantiated alone.
- **The trigger is external:** `menu/list` is composed with any Button/Button-icon/avatar. It does not bundle a fixed trigger.
- The panel **floats** (`position: absolute`) — it never pushes the layout. **It must render in a portal (or with a high `z-index`)** so it is not covered by the following content.
- **Divider:** to separate the terminal/destructive action(s) from the rest. Hug = 1 terminal at the bottom; scroll = 2.
- The option label **truncates to 1 line with an ellipsis** — it never wraps.
- If one option has an icon, all of them must have it — mixed icons create a false hierarchy.
- **Role by use:** actions → `menu`/`menuitem`; value selection → `listbox`/`option` (Select/Combobox).

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`combobox`](combobox.md) | there are so many options that you need to search instead of looking |
| [`select`](select.md) | a form value is picked, no action is run |

---

## Accessibility

- On close, focus RETURNS to the trigger: if it gets lost, the person ends up at the top of the page.
- The role is neither optional nor interchangeable: `menu` is for running actions and `listbox` is for picking a value. Using the wrong one makes a screen reader announce something it is not.

<!-- prosa:accessibility -->

- **WCAG 4.1.2** — panel with the right `role` (`menu` or `listbox`), trigger with `aria-haspopup` + `aria-expanded` + `aria-controls`.
- **WCAG 2.1.1** — full keyboard: arrows to navigate, Enter/Space to run/select, Escape to close, type-ahead.
- **WCAG 2.4.3 (Focus Order)** — when opening, focus enters the menu; when closing, it returns to the trigger.
- **WCAG 2.4.7 / 2.4.11 / 2.4.13 (Focus Appearance)** — the item's `state=focus` uses a ring + gap whose thickness comes from the focus token, visible on any background.
- **WCAG 1.4.13** — the menu does not disappear when the pointer moves toward it; it closes with Escape or focus outside.

<!-- /prosa:accessibility -->
