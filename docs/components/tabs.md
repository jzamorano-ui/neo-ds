<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Tabs

> **Figma (source of truth):** [❖ Tabs](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004261-20216) — visual validation against the master.

<!-- prosa:intro -->

A navigation element that organizes content into sections within the same view. To filter or select items use `chips`; to navigate between pages use `link`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `options` | 2–6 — Figma only: it does not reach the API | `tabs/group` |
| `state` | default · active · focus · disabled · hover · active-focus | `_tabs/item` |
| `label` | text | `_tabs/item` |
| `icon` | true · false — default `true` | `_tabs/item` |

<!-- prosa:properties -->

**The `_tabs/item` atom** — a single tab, with `state`, `icon` (true · false) and `label` (text editable via component property). It is not used directly: it is consumed through the group.

**The `tabs/group` group** — the complete row, and the only thing visible to design. Its `options` property is the number of tabs.

Each `options` variant already brings the rounded end on the first and last tab, and the divider
turned off on the last one. That is why the count is a variant and not a list of booleans: with booleans
that geometry has to be fixed by hand every time.

Always exactly one tab in `state=active`.

**`focus` and `active-focus` are two states, not one.** Focus can be on a tab that is not the
active one — that is what happens while the arrows move it without activating. See §Keyboard.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoTabsProps {
  items?: Array<{ value: string; label: ReactNode; icon?: string | ReactElement; disabled?: boolean; content?: ReactNode }>  // The pieces of a composite: each one with its value, its label and its content.
  value?: string                      // The controlled value.
  defaultValue?: string               // The initial, uncontrolled value.
  onChange?: (event: SyntheticEvent, value: string) => void  // Notifies the value change.
  'aria-label'?: string               // The accessible name when there is no visible text that provides it.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Tabs not listed above
}
```

---

## Tokens

### Color

<!-- prosa:color -->

The **rail** —the master's `riel` layer— is the bar at the foot of **each**
tab — not a single line of the group.

**The names are the master's.** The ring and its fill are two
LAYERS of `_tabs/item`'s own —`focus-ring` and `focus-gap`, each inset from the tab— and not properties of the tab. MUI's theme realizes them as `outline` and `box-shadow` of
`tab`, and the plain layer its own way: both stay faithful to the master, as in `toggle`.

**Hover does NOT change the rail** — only fill and text. It stays at the same token as at rest. It is not an oversight: adding a signal there added nothing, and dimming it would leave it
weaker than at rest.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--fill--base--default` |
| `root` | default | border | `--border--base--secondary` |
| `root` | default | box-shadow | `--neo-elevation-md` |
| `tab` | default | background | `--fill--tertiary--default` |
| `tab` | default | color | `--text--base--secondary` |
| `tab` | hover | background | `--fill--tertiary--hover` |
| `tab` | hover | color | `--text--base--default` |
| `tab` | active | background | `--fill--tertiary--active` |
| `tab` | active | color | `--text--base--default` |
| `tab` | focus | background | `--fill--tertiary--default` |
| `tab` | focus | color | `--text--base--secondary` |
| `tab` | active-focus | background | `--fill--tertiary--active` |
| `tab` | active-focus | color | `--text--base--default` |
| `tab` | disabled | color | `--text--base--disabled` |
| `icon` | default | fill | `--icon--base--secondary` |
| `icon` | active | fill | `currentColor` |
| `icon` | disabled | fill | `--icon--base--disabled` |
| `rail` | default | background | `--border--base--default` |
| `rail` | hover | background | `--border--base--default` |
| `rail` | focus | background | `--border--base--default` |
| `rail` | active | background | `--border--base--focus` |
| `rail` | active-focus | background | `--border--base--focus` |
| `rail` | disabled | background | `--border--base--secondary` |
| `divider` | default | background | `--border--base--secondary` |
| `focus-ring` | focus | border | `--focus--ring--default` |
| `focus-ring` | active-focus | border | `--focus--ring--default` |
| `focus-gap` | focus | border | `--focus--gap--default` |
| `focus-gap` | active-focus | border | `--focus--gap--default` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | height | — | 48px |
| `root` | border-width | — | `--neo-stroke-xs` · 1px |
| `root` | border-radius | — | `--neo-radius-sm` · 8px |
| `tab` | padding-block | — | `--neo-space-md` · 12px |
| `tab` | padding-inline | — | `--neo-space-lg` · 16px |
| `tab` | gap | — | `--neo-space-sm` · 8px |
| `icon` | width | — | 20px |
| `icon` | height | — | 20px |
| `rail` | height | — | `--neo-stroke-sm` · 2px |
| `divider` | width | — | `--neo-stroke-xs` · 1px |
| `focus-ring` | border-width | — | `--neo-stroke-sm` · 2px |
| `focus-gap` | border-width | — | `--neo-stroke-sm` · 2px |

<!-- prosa:layout -->

**The radius goes on the first and last tab, not on the container with `overflow: hidden`.** With
clipping, the ends' focus ring gets cut; with the radius on the tab, the ring follows the curve. Only the top corners of the group are rounded; the bottom ones are square.

**The divider has to CUT the rail**, not pass under it: without a cut, two adjacent tabs are left
with their rails touching. In CSS that is achieved by painting it on top (a pseudo with `z-index`); in Figma it lives
as a child of the group's auto-layout, so the rail simply does not reach there. Different
construction, same anatomy — just like the rail, which is a rectangle in Figma and an `::after` here.

**The divider belongs to the GROUP, not to the tab.** A lone tab carries no line on its right: that line only
means something *between* two tabs. That is why there are N−1 dividers for N tabs, and there is no need to turn off the
last one's.

**The focus ring is INNER**: the ring on the outer band and the gap right inside it, both inward (same pattern as
`menu-item`). It covers the rail's band on purpose — if focus is on a tab that is not the active one,
the active one keeps its rail elsewhere; if it is on the active one, focus and selection coincide.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `tab` | — | `Body/lg-Medium` | 16px | 500 | 24px |

---

## HTML

<!-- prosa:html -->

```html
<!-- TWO elements, not one: `.tabs` is the column wrapper that groups the row with its panels,
     and `[role="tablist"]` is the ROW — which is what the master measures (with a 1px divider
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

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `div[role="tablist"]` | `<div>` | `role="tablist"` · `aria-label="Secciones"` |
| `div[role="tabpanel"]` | `<div>` | `role="tabpanel"` · `tabindex="0"` |

<!-- prosa:aria -->

Each tab is a `<button role="tab">`: the active one has `aria-selected="true"` and `tabindex="0"`, the rest `aria-selected="false"` and `tabindex="-1"`. A disabled tab takes `aria-disabled="true"`. A hidden panel carries `hidden`; the active one is `tabindex="0"`.

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus TO THE ACTIVE TAB — the tablist is a single tab stop |
| `→` | focus to the next tab, wrapping around to the first |
| `←` | focus to the previous tab, wrapping around to the last |
| `Home · End` | first and last tab |
| `Enter · Space` | activates the tab that has focus |

Deviations from the APG pattern:

| Key | The APG pattern | Neo, and why |
|---|---|---|
| `→` | The APG states it as the convention its examples follow for disabled elements that must stay discoverable: they carry aria-disabled and remain in the arrow path. | Disabled tabs stay out of the arrow path. Keeping them focusable, as the APG convention asks, would mean writing it by hand instead of dressing the base component, and the system does not rewrite components (rule 7). |

<!-- prosa:keyboard -->

The Arrow Keys move focus without activating ("manual activation" model). `Enter` or `Space` activate the tab and show its panel. `↓` and `↑` are left to the page: a horizontal tab list does not listen for them, so they keep scrolling.

<!-- /prosa:keyboard -->

---

## Rules

| Limit | When exceeded |
|---|---|
| **tabs per group:** at least 2 tabs, at most 6 | the master offers no more than 6 — with more sections, another navigation pattern. And with just one, there is nothing to choose. |

| When | Then |
|---|---|
| always | aria-label must be declared |
| always | there must be at least two sections |

<!-- prosa:rules -->

- Always exactly one `active` tab — zero or more than one is an error.
- If they do not fit across, **horizontal scroll**: never arrows, never two rows, never a
  "more" menu. The next tab stays cut on purpose — the cut is the signal that there is more.
- `Text` mandatory on each tab — do not use icons alone.
- If one tab has an icon, all the group's tabs must have it.
- Do not use tabs to navigate between pages → `link`.
- Do not nest tabs inside tabs.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`chips`](chips.md) | what you do is filter or select, not change section |
| [`link`](link.md) | the navigation leaves this view |

---

## Accessibility

- The tablist is ONE single tab stop: the active tab carries `tabindex="0"` and the rest `-1`. Movement is by arrow keys.
- The tablist needs an `aria-label`: without it, a screen reader announces «lista de pestañas» without saying of what.
- Each tab points to its panel with `aria-controls`, and each panel points back with `aria-labelledby`. Without that pair, the panel is not announced as the content of anything.
- Icons are `aria-hidden="true"`.

<!-- prosa:accessibility -->

- **WCAG 1.3.1** — correct `tablist` / `tab` / `tabpanel` roles for screen readers.
- **WCAG 2.1.1** — full keyboard navigation with Arrow Keys + Enter/Space.
- **WCAG 2.4.7** — focus always visible on the tab with active focus.
- **WCAG 1.4.3** — `--text--base--default` and `--text--base--secondary` meet ≥ 4.5:1 on the background.

<!-- /prosa:accessibility -->
