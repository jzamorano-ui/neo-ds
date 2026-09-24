# Tabs

> **Figma (source of truth):** [❖ Tabs](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004261-20216) — visual validation against the master.

A navigation element that organizes content into sections within the same view. To filter or select items use `chips`; to navigate between pages use `link`.

---

## Properties

| Property | Values |
|---|---|
**The `_tabs/item` atom** — a single tab. It is not used directly: it is consumed through the group.

| Property | Values |
|---|---|
| `state` | default · hover · active · focus · active-focus · disabled |
| `icon` | true · false |
| `label` | text editable via component property |

**The `tabs/group` group** — the complete row, and the only thing visible to design.

| Property | Values |
|---|---|
| `options` | 2 · 3 · 4 · 5 · 6 |

Each `options` variant already brings the rounded end on the first and last tab, and the divider
turned off on the last one. That is why the count is a variant and not a list of booleans: with booleans
that geometry has to be fixed by hand every time.

Always exactly one tab in `state=active`. At least 2 tabs per group.

**`focus` and `active-focus` are two states, not one.** Focus can be on a tab that is not the
active one — that is what happens while the arrows move it without activating. See §Keyboard.

---

## Props

```typescript
interface NeoTabsProps {
  items?: Array<{ value: string; label: ReactNode; icon?: string | ReactElement; disabled?: boolean; content?: ReactNode }>  // The pieces of a composite: each one with its value, its label and its content.
  value?: string                      // The controlled value.
  defaultValue?: unknown              // The initial, uncontrolled value.
  onChange?: (event: SyntheticEvent, value: string) => void  // Notifies the value change.
  'aria-label'?: string               // The accessible name when there is no visible text that provides it.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Tabs
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

---

## Tokens

### Color

The **rail** —the master's `riel` layer— is the 2px bar at the foot of **each**
tab — not a single line of the group.

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `tab` (fondo) | default · focus | background | `--fill--tertiary--default` |
| `tab` (fondo) | hover | background | `--fill--tertiary--hover` |
| `tab` (fondo) | active · active-focus | background | `--fill--tertiary--active` |
| `label` | default · focus | color | `--text--base--secondary` |
| `label` | hover · active · active-focus | color | `--text--base--default` |
| `label` | disabled | color | `--text--base--disabled` |
| `icon` | default | fill | `--icon--base--secondary` |
| `icon` | active | fill | `currentColor` (hereda `--text--base--default`) |
| `icon` | disabled | fill | `--icon--base--disabled` |
| `riel` | default · hover · focus | background | `--border--base--default` |
| `riel` | active · active-focus | background | `--border--base--focus` |
| `riel` | disabled | background | `--border--base--secondary` |
| `divisor` | — | background | `--border--base--secondary` |
| `tab-group` (borde) | — | border-color | `--border--base--secondary` |
| `tab-group` (fondo) | — | background | `--fill--base--default` |
| `focus-ring` | focus · active-focus | border | `--focus--ring--default` |
| `focus-gap` | focus · active-focus | border | `--focus--gap--default` |

**The names are the master's.** The ring and its fill are two
LAYERS of `_tabs/item`'s own —`focus-ring` of 115×48 and `focus-gap` of 111×44, four pixels less
per side— and not properties of the tab. MUI's theme realizes them as `outline` and `box-shadow` of
`tab`, and the plain layer its own way: both stay faithful to the master, as in `toggle`.

**Hover does NOT change the rail** — only fill and text. It stays at `--border--base--default`, same
as at rest. It is not an oversight: adding a signal there added nothing, and dimming it would leave it
weaker than at rest.

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `padding-inline` (tab) | `--neo-space-lg` | 16px |
| `padding-block` (tab) | `--neo-space-md` | 12px |
| `gap` (icon · label) | `--neo-space-sm` | 8px |
| Row height | — | 48px (12 + 24 + 12) |
| Height of the `riel` | `--neo-stroke-sm` | 2px |
| Width of the `divisor` | `--neo-stroke-xs` | 1px |
| Group border | `--neo-stroke-xs` | 1px |
| Group `border-radius` (top) | `--neo-radius-sm` | 8px |
| Group `border-radius` (bottom) | — | 0 |
| Group shadow | `--neo-elevation-md` | 0 4px 12px rgba(49,49,49,.10) |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |

**The radius goes on the first and last tab, not on the container with `overflow: hidden`.** With
clipping, the ends' focus ring gets cut; with the radius on the tab, the ring follows the curve.

**The divider has to CUT the rail**, not pass under it: without a cut, two adjacent tabs are left
with their rails touching. In CSS that is achieved by painting it on top (a pseudo with `z-index`); in Figma it lives
as a child of the group's auto-layout, so the rail simply does not reach there. Different
construction, same anatomy — just like the rail, which is a rectangle in Figma and an `::after` here.

**The divider belongs to the GROUP, not to the tab.** A lone tab carries no line on its right: that line only
means something *between* two tabs. That is why there are N−1 dividers for N tabs, and there is no need to turn off the
last one's.

**The focus ring is INNER**: the ring from 0 to 2 and the gap from 2 to 4, inward (same pattern as
`menu-item`). It covers the rail's band on purpose — if focus is on a tab that is not the active one,
the active one keeps its rail elsewhere; if it is on the active one, focus and selection coincide.

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` default | `body/lg-medium` | 16px | 500 | 24px |
| `label` active | `body/lg-medium` | 16px | 500 | 24px |

---

## HTML

```html
<!-- TWO elements, not one: `.tabs` is the column wrapper that groups the row with its panels,
     and `[role="tablist"]` is the ROW — which is what the master measures (231×48, with a 1px divider
     between items). Merging them leaves the tabs stacked vertically.
     Each item is styled by its `role="tab"` and its `aria-selected`, not by a class: that way the visual
     state cannot diverge from the one the screen reader announces.
     The icon is optional (the master's `icon` property) and ALWAYS goes with text: an icon-only
     tab is not understood. If one in the group carries it, all of them do. -->
<div class="tabs">
  <div role="tablist" aria-label="Secciones de cuenta">
    <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1" tabindex="0">
      <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#system-user-profile"></use></svg>
      Datos personales
    </button>
    <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">
      <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#system-lock"></use></svg>
      Seguridad
    </button>
  </div>

  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">
    <!-- content of the active panel -->
  </div>
  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    <!-- contenido oculto -->
  </div>
</div>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Tab list | `<div role="tablist">` | `aria-label="[group name]"` |
| Active tab | `<button role="tab">` | `aria-selected="true"` · `aria-controls="[panel-id]"` · `tabindex="0"` |
| Tab inactivo | `<button role="tab">` | `aria-selected="false"` · `aria-controls="[panel-id]"` · `tabindex="-1"` |
| Tab disabled | `<button role="tab">` | `aria-disabled="true"` · `tabindex="-1"` |
| Active panel | `<div role="tabpanel">` | `id` · `aria-labelledby="[tab-id]"` · `tabindex="0"` |
| Hidden panel | `<div role="tabpanel">` | `hidden` |
| Icons | `<svg>` | `aria-hidden="true"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Focus to the active tab |
| `→` | Focus to the next tab (with wrap) |
| `←` | Focus to the previous tab (with wrap) |
| `Home` | Focus to the first tab |
| `End` | Focus to the last tab |
| `Enter` · `Space` | Activates the focused tab |

The Arrow Keys move focus without activating ("manual activation" model). `Enter` or `Space` activate the tab and show its panel. `↓` and `↑` are left to the page: a horizontal tab list does not listen for them, so they keep scrolling.

---

## Rules

- Always exactly one `active` tab — zero or more than one is an error.
- At least 2 tabs, **at most 6** — the component offers no more. With more options, another pattern.
- If they do not fit across, **horizontal scroll**: never arrows, never two rows, never a
  "more" menu. The next tab stays cut on purpose — the cut is the signal that there is more.
- `Text` mandatory on each tab — do not use icons alone.
- If one tab has an icon, all the group's tabs must have it.
- Do not use tabs to navigate between pages → `link`.
- Do not nest tabs inside tabs.

---

## Accessibility

- **WCAG 1.3.1** — correct `tablist` / `tab` / `tabpanel` roles for screen readers.
- **WCAG 2.1.1** — full keyboard navigation with Arrow Keys + Enter/Space.
- **WCAG 2.4.7** — focus always visible on the tab with active focus.
- **WCAG 1.4.3** — `--text--base--default` and `--text--base--secondary` meet ≥ 4.5:1 on the background.
