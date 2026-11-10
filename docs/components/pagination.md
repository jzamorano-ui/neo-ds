<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Pagination

> **Figma (source of truth):** [❖ Pagination](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40005067-30341) — visual validation against the master.

<!-- prosa:intro -->

Splits a long list into pages and lets the person move between them. The pages that do not fit collapse into «…»; with a single page it is not shown.

Each number is a button, or a link when the page lives in the URL; the current page is filled navy.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `device` | desktop · mobile — not a prop: the viewport width decides it (breakpoint 576px) | `pagination` |
| `current` | start · mid · end — not a prop: it follows from `page` and `count` | `pagination` |
| `type` | page · previous · next · ellipsis — not a prop: it follows what is composed inside | `_pagination/item` |
| `state` | default · hover · active · focus · selected · disabled · disabled-selected | `_pagination/item` |
| `number` | text | `_pagination/item` |

<!-- prosa:properties -->

- **`device` is not a prop**: the viewport width decides it. From 576 px the list shows one page on each side of the current one; below, the current page alone between the first and the last. Each item is 32 in both: what changes is how many places the list has, not how they look. `siblingCount` overrides it.
- **`current` is not a prop**: where the current page sits follows from `page` and `count`. The master draws `start`, `mid` and `end` as presets so a design shows the right list; in code the list comes from the page and the total.
- **`type` is not a prop**: the hook that builds the list says which place is a page, an arrow or the «…».
- **One size, 32**, at every width. No dark background: it lives at the foot of a list or a table, on `surface/base/default`.
- **The counter and the rows-per-page selector are not part of it**: they are drawn next to the table that needs them.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoPaginationProps {
  'aria-label'?: string               // The accessible name when there is no visible text that provides it.
  boundaryCount?: number              // How many pages stay visible at each end of the list.
  className?: string                  // Extra classes on the root. They add to the system ones; they do not replace them.
  classes?: PaginationProps['classes']  // MUI's class keys for the root and the list.
  color?: PaginationProps['color']    // MUI's. The look comes from the theme: the master draws a single one.
  count?: number                      // The total number of pages. With a single page the component renders nothing.
  defaultPage?: number                // The page shown first when `page` is not passed.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  getItemAriaLabel?: PaginationProps['getItemAriaLabel']  // The accessible name of each item. By default it comes from the theme locale: «Ir a la página 2», and «página 1» for the current one.
  hideNextButton?: boolean            // MUI's. Neo keeps both arrows and disables them at the ends: the master does not draw a list without one.
  hidePrevButton?: boolean            // MUI's. Neo keeps both arrows and disables them at the ends: the master does not draw a list without one.
  onChange?: (event: ChangeEvent<unknown>, page: number) => void  // Notifies the page change, with the event and the new page number. Focus stays on the number that was pressed.
  page?: number                       // The current page, counted from 1. Pass it with `onChange` to control it; without it the component keeps its own, starting at `defaultPage`.
  renderItem?: PaginationProps['renderItem']  // Renders each item. By default a `PaginationItem` with the theme look; replace it to render links instead of buttons.
  shape?: PaginationProps['shape']    // MUI's. The look comes from the theme: the master draws a single one.
  showFirstButton?: boolean           // MUI's. The master does not draw first-page and last-page buttons.
  showLastButton?: boolean            // MUI's. The master does not draw first-page and last-page buttons.
  siblingCount?: number               // How many pages stay visible on each side of the current one. Without it, it follows the width: one from 576 px, none below.
  size?: PaginationProps['size']      // MUI's. The master draws a single size, the same at every width.
  variant?: PaginationProps['variant']  // MUI's. The look comes from the theme: the master draws a single one.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Pagination not listed above
}
```

---

## Tokens

### Color

<!-- prosa:color -->

The pages are `text/base/default` in Body/md-Medium on `fill/tertiary/default`, which is transparent; hover takes `fill/tertiary/hover` and a press `fill/tertiary/active`. The current page is `text/base/contrast` in Body/md-Bold on `fill/primary/active`, the same fill as a selected chip. The arrows are `icon/base/default`. Disabled turns off the whole list: the pages and the «…» take `text/base/disabled` and keep the transparent background, the arrows `icon/base/disabled`, and the current page `text/base/disabled` on `fill/base/disabled`, like a disabled primary button, instead of MUI's opacity over the whole item. In the flat layer the list takes `pagination--disabled` on its root and `disabled` on every button. The «…» is `text/base/secondary`, with no background.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `page` | default | background | `--fill--tertiary--default` |
| `page` | default | color | `--text--base--default` |
| `page` | hover | background | `--fill--tertiary--hover` |
| `page` | hover | color | `--text--base--default` |
| `page` | active | background | `--fill--tertiary--active` |
| `page` | active | color | `--text--base--default` |
| `page` | focus | background | `--fill--tertiary--default` |
| `page` | focus | color | `--text--base--default` |
| `page` | focus | outline | `--focus--ring--default` |
| `page` | focus | box-shadow | `--focus--gap--default` |
| `page` | disabled | color | `--text--base--disabled` |
| `current` | selected | background | `--fill--primary--active` |
| `current` | selected | color | `--text--base--contrast` |
| `current` | disabled | background | `--fill--base--disabled` |
| `current` | disabled | color | `--text--base--disabled` |
| `previous` · `next` | default | background | `--fill--tertiary--default` |
| `previous` · `next` | default | color | `--icon--base--default` |
| `previous` · `next` | hover | background | `--fill--tertiary--hover` |
| `previous` · `next` | hover | color | `--icon--base--default` |
| `previous` · `next` | active | background | `--fill--tertiary--active` |
| `previous` · `next` | active | color | `--icon--base--default` |
| `previous` · `next` | focus | background | `--fill--tertiary--default` |
| `previous` · `next` | focus | color | `--icon--base--default` |
| `previous` · `next` | focus | outline | `--focus--ring--default` |
| `previous` · `next` | focus | box-shadow | `--focus--gap--default` |
| `previous` · `next` | disabled | color | `--icon--base--disabled` |
| `ellipsis` | default | color | `--text--base--secondary` |
| `ellipsis` | disabled | color | `--text--base--disabled` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `list` | gap | — | `--neo-space-xs` · 4px |
| `page` | height | — | `--neo-icon-size-lg` · 32px |
| `page` | min-width | — | `--neo-icon-size-lg` · 32px |
| `page` | padding-inline | — | `--neo-space-sm` · 8px |
| `page` | padding-block | — | `--neo-space-none` · 0px |
| `page` | border-radius | — | `--neo-radius-pill` · 999px |
| `previous` | width | — | `--neo-icon-size-lg` · 32px |
| `previous` | height | — | `--neo-icon-size-lg` · 32px |
| `previous` | padding-inline | — | `--neo-space-none` · 0px |
| `previous` | padding-block | — | `--neo-space-none` · 0px |
| `previous` | border-radius | — | `--neo-radius-pill` · 999px |
| `next` | width | — | `--neo-icon-size-lg` · 32px |
| `next` | height | — | `--neo-icon-size-lg` · 32px |
| `next` | padding-inline | — | `--neo-space-none` · 0px |
| `next` | padding-block | — | `--neo-space-none` · 0px |
| `next` | border-radius | — | `--neo-radius-pill` · 999px |
| `ellipsis` | height | — | `--neo-icon-size-lg` · 32px |
| `ellipsis` | min-width | — | `--neo-icon-size-lg` · 32px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `page` | — | `Body/md-Medium` | 14px | 500 | 20px |
| `current` | — | `Body/md-Bold` | 14px | 700 | 20px |
| `ellipsis` | — | `Body/md-Medium` | 14px | 500 | 20px |

---

## HTML

<!-- prosa:html -->

```html
<!-- Page 1 of 10, from 576 px: one page on each side of the current one, and the «…» before the last. -->
<nav class="pagination" aria-label="Paginador">
  <ul class="pagination__list">
    <li><button type="button" class="pagination__previous" aria-label="Ir a la página anterior" disabled><svg aria-hidden="true"><use href="#system-chevron-left"/></svg></button></li>
    <li><button type="button" class="pagination__current" aria-current="page" aria-label="página 1">1</button></li>
    <li><button type="button" class="pagination__page" aria-label="Ir a la página 2">2</button></li>
    <li><button type="button" class="pagination__page" aria-label="Ir a la página 3">3</button></li>
    <li><button type="button" class="pagination__page" aria-label="Ir a la página 4">4</button></li>
    <li><button type="button" class="pagination__page" aria-label="Ir a la página 5">5</button></li>
    <li><div class="pagination__ellipsis">…</div></li>
    <li><button type="button" class="pagination__page" aria-label="Ir a la página 10">10</button></li>
    <li><button type="button" class="pagination__next" aria-label="Ir a la página siguiente"><svg aria-hidden="true"><use href="#system-chevron-right"/></svg></button></li>
  </ul>
</nav>
```

The flat layer leaves the list to whoever writes the markup: from 576 px, one page on each side of the current one; below, the current page alone between the first and the last. The arrows are disabled at the ends, not removed. After a page change, focus stays on the button that was pressed.

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<nav>` | `aria-label="Paginador"` |
| `button[aria-label="página 1"]` | `<button>` | `aria-label="página 1"` · `aria-current="page"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus through the arrows and the pages, in order; the «…» and a disabled arrow do not take focus |
| `Enter · Space` | goes to the focused page, or to the previous or next one on an arrow. Focus stays on the button pressed |

---

## Rules

| When | Then |
|---|---|
| `type=previous\|next` | state cannot be selected or disabled-selected |
| `type=ellipsis` | state can only be default or disabled |

<!-- prosa:rules -->

- **Below the list it pages**, centered on the width of the list. One per list.
- **With a single page it is not shown**: there is nowhere to go.
- **The arrows are disabled at the ends, not hidden**, so the list does not jump.
- **The «…» never stands for a single page**: if only one is missing, its number shows. That is why the first page reads `1 2 3 4 5 … 10` and not `1 … 3 4 5 … 10`.
- **The look is not changed**: the current page stays in `fill/primary/active` and the items at 32.
- **Taking the scroll to the top of the list** after a page change is the screen's job, not the component's.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`tabs`](tabs.md) | the person moves between sections of the same level, not between pages of one list |
| [`breadcrumbs`](breadcrumbs.md) | the person needs to see where the page sits in the site and go back up |

---

## Accessibility

- A `<nav>` with a list inside, named «Paginador»: a screen reader tells it from the other navigation landmarks of the page.
- Each page is named «Ir a la página N», the current one «página N», and the arrows «Ir a la página anterior» and «Ir a la página siguiente».
- The current page carries `aria-current="page"`.
- After a page change, focus stays on the button that was pressed: each place of the list keeps its page, not its position.
- The «…» does not take focus.
- The focus ring is triggered only by the keyboard (C4).

<!-- prosa:accessibility -->

A `<nav>` named «Paginador» with a list inside. Each page is a button named «Ir a la página N»; the current one is «página N» and carries `aria-current="page"`. The «…» does not take focus, and after a page change focus stays on the button that was pressed.

<!-- /prosa:accessibility -->
