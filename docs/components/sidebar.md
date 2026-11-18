<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Sidebar

> **Figma (source of truth):** [❖ Sidebar](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40005371-42226) — visual validation against the master.

<!-- prosa:intro -->

The main navigation of a product: a column on the left with the sections of the product, grouped, and the profile of the person at the foot. On desktop it is always there and folds to a rail of icons; on tablet and mobile it is a bar with a ☰ that opens the menu over a scrim.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `type` | group · list — default `group` | `sidebar` |
| `device` | desktop · mobile · tablet — not a prop: the viewport width decides it (breakpoint 992px) | `sidebar` |
| `expanded` | true · false — not a variant prop: the person changes it, and States says whether the consumer can set it | `sidebar` |
| `rail` | false · true — not a prop: it follows what is composed inside | `_sidebar/item` |
| `submenu` | none · closed · open — not a prop: it follows what is composed inside | `_sidebar/item` |
| `open` | true · false — not a variant prop: the person changes it, and States says whether the consumer can set it | `_sidebar/group` |
| `size` | medium · large — not a prop: the viewport width decides it (breakpoint 992px) | `_sidebar/item` |
| `profile` | true · false — default `true` | `sidebar` |
| `state` | default · hover · active · disabled · active-hover · disabled-hover · focus · active-focus | `_sidebar/item` |
| `label` | text | `_sidebar/item` |
| `sub-item-1` … `sub-item-2` | true · false — default `true` | `_sidebar/item` |
| `sub-item-3` … `sub-item-6` | true · false — default `false` | `_sidebar/item` |
| `state` | default · hover · active · disabled · focus · active-focus | `_sidebar/sub-item` |
| `label` | text | `_sidebar/sub-item` |
| `state` | default · hover · focus | `_sidebar/header` |
| `state` | default · hover · focus · open | `_sidebar/profile` |
| `initials` | text | `_sidebar/profile` |
| `name` | text | `_sidebar/profile` |
| `role` | text | `_sidebar/profile` |
| `chevron` | true · false — default `true` | `_sidebar/profile` |
| `title` | text | `_sidebar/group` |
| `item-1` … `item-3` | true · false — default `true` | `_sidebar/group` |
| `item-4` … `item-8` | true · false — default `false` | `_sidebar/group` |
| `item-1` … `item-3` | true · false — default `true` | `_sidebar/list` |
| `item-4` … `item-8` | true · false — default `false` | `_sidebar/list` |

---

## Props

```typescript
interface NeoSidebarProps {
  type?: 'group' | 'list'             // How the options are arranged: `group` sorts them under titled groups that open and close; `list` is one flat list without titles. Default: 'group'.
  items?: Array<{ title: ReactNode; defaultOpen?: boolean; key?: string; items: Array<{ label: ReactNode; icon?: string | ReactElement; href?: string; onClick?: (event: MouseEvent) => void; disabled?: boolean; key?: string; items?: Array<{ label: ReactNode; href?: string; onClick?: (event: MouseEvent) => void; disabled?: boolean; key?: string }> }> }> | Array<{ label: ReactNode; icon?: string | ReactElement; href?: string; onClick?: (event: MouseEvent) => void; disabled?: boolean; key?: string; items?: Array<{ label: ReactNode; href?: string; onClick?: (event: MouseEvent) => void; disabled?: boolean; key?: string }> }>  // The places of the product. With `group`, a list of groups, each with its title and its options; with `list`, the options directly. Each option has its label, icon and destination (`href`) or `onClick`, and may carry its own sub-options in `items`.
  currentPath?: string                // The current route. The option whose `href` matches it is marked with `aria-current="page"`, and its group and parent open.
  expanded?: boolean                  // Wide or folded. On desktop, `false` is the rail with only the icons; below 992 px, `true` is the menu open over the page. Pass it with `onExpandedChange` to control it.
  defaultExpanded?: boolean           // Whether it starts wide on desktop when `expanded` is not passed. Below 992 px the menu always starts closed.
  onExpandedChange?: (expanded: boolean) => void  // Notifies the change between wide and folded, or open and closed, with the new value. The product may keep it to restore it in the next visit.
  profile?: { name: string; role?: string; initials: string; menu?: Array<{ value?: string; label?: ReactNode; icon?: string | ReactElement; disabled?: boolean; divider?: boolean; onSelect?: (value: string) => void }> }  // The person who is signed in, at the foot on desktop: name, role, initials for the avatar, and the options of the menu it opens.
  logo: ReactNode | { full: ReactNode; compact: ReactNode }  // The brand at the top. A single node, or `{ full, compact }`: the compact one is shown in the rail.
  notifications?: ReactNode           // What goes at the right of the bar below 992 px, such as the notifications bell: a `NeoButtonIcon` inside a `NeoBadge` with the count. Without it the space stays empty so the logo keeps its place.
  actions?: Array<{ label: ReactNode; icon?: string | ReactElement; href?: string; onClick?: (event: MouseEvent) => void; disabled?: boolean; key?: string; items?: Array<{ label: ReactNode; href?: string; onClick?: (event: MouseEvent) => void; disabled?: boolean; key?: string }> }>  // The options at the foot of the menu below 992 px, such as help and sign out. They take the shape of an option of `items`.
  linkComponent?: ElementType         // The component that renders each option with a destination, such as the router link. It receives `href`. Without it, a native `a`.
  'aria-label'?: string               // The accessible name of the navigation. By default «Navegación principal».
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Drawer not listed above
}
```

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` · `bar` · `card` | default | background | `--fill--base--default` |
| `root` · `bar` · `card` | default | border | `--border--base--secondary` |
| `divider` | default | background | `--border--base--secondary` |
| `group-title` · `role` | default | color | `--text--base--secondary` |
| `item` | default | background | `--fill--primary--inverse--default` |
| `item` | default | color | `--text--base--secondary` |
| `item` | hover | background | `--fill--primary--inverse--hover` |
| `item` | hover | color | `--text--base--secondary` |
| `item` | active | background | `--fill--primary--inverse--active` |
| `item` | active | color | `--text--base--default` |
| `item` | disabled | background | `--fill--base--disabled` |
| `item` | disabled | color | `--text--base--disabled` |
| `item` | focus | background | `--fill--primary--inverse--default` |
| `item` | focus | color | `--text--base--secondary` |
| `item` | focus | outline | `--focus--ring--default` |
| `item` | focus | box-shadow | `--focus--gap--default` |
| `item-icon` | default | fill | `--icon--base--secondary` |
| `item-icon` | active | fill | `--icon--base--default` |
| `item-icon` | disabled | fill | `--icon--base--disabled` |
| `item-arrow` | default | fill | `--icon--base--default` |
| `sub-item` | default | background | `--fill--base--default` |
| `sub-item` | default | border | `--border--base--default` |
| `sub-item` | default | color | `--text--base--secondary` |
| `sub-item` | hover | border | `--border--base--focus` |
| `sub-item` | hover | color | `--text--base--default` |
| `sub-item` | active | border | `--border--base--focus` |
| `sub-item` | active | color | `--text--base--default` |
| `sub-item` | disabled | background | `--fill--base--disabled` |
| `sub-item` | disabled | color | `--text--base--disabled` |
| `sub-item` | focus | outline | `--focus--ring--default` |
| `sub-item` | focus | box-shadow | `--focus--gap--default` |
| `profile` | default | background | `--fill--base--default` |
| `profile` | default | border | `--border--base--secondary` |
| `profile` | hover | background | `--fill--primary--inverse--hover` |
| `profile` | hover | border | `--border--base--secondary` |
| `profile` | open | background | `--fill--primary--inverse--hover` |
| `profile` | open | border | `--border--base--secondary` |
| `profile` | focus | background | `--fill--base--default` |
| `profile` | focus | outline | `--focus--ring--default` |
| `profile` | focus | box-shadow | `--focus--gap--default` |
| `avatar` | default | background | `--fill--deco--1--solid` |
| `avatar` | default | color | `--text--base--contrast` |
| `name` | default | color | `--text--base--default` |
| `scrim` | default | background | `--surface--base--overlay` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | padding-block | — | `--neo-space-2xl` · 32px |
| `root` | padding-inline | — | `--neo-space-lg` · 16px |
| `root` | gap | — | `--neo-space-lg` · 16px |
| `root` | border-radius | — | `--neo-radius-lg` · 16px |
| `root` | border-width | — | `--neo-stroke-xs` · 1px |
| `root` | width | device=desktop, expanded=false | 92px |
| `root` | width | device=desktop, expanded=undefined | 256px |
| `root` | width | device=tablet, expanded=undefined | 360px |
| `root` | padding-inline | expanded=false | `--neo-space-xl` · 24px |
| `root` | padding-block | device=tablet · mobile | `--neo-space-lg` · 16px |
| `root` | max-width | device=mobile | 360px |
| `header` | padding-block | — | `--neo-space-none` · 0px |
| `header` | gap | — | `--neo-space-lg` · 16px |
| `header` | padding-inline | every combination | `--neo-space-none` · 0px |
| `brand` | height | — | 40px |
| `brand` | padding-block | — | `--neo-space-none``--neo-space-md` · 0px 12px |
| `brand` | gap | — | `--neo-space-lg` · 16px |
| `divider` | height | — | 1px |
| `navigation` | padding-block | — | `--neo-space-none` · 0px |
| `navigation` | gap | — | `--neo-space-xs` · 4px |
| `navigation` | padding-inline | every combination | `--neo-space-none` · 0px |
| `group` | gap | — | `--neo-space-xs` · 4px |
| `group-title` | min-height | — | `--neo-space-2xl` · 32px |
| `group-title` | gap | — | `--neo-space-lg` · 16px |
| `group-title` | padding-inline | — | 0px `--neo-space-xs` · 0px 4px |
| `list` | gap | — | `--neo-space-xs` · 4px |
| `item` | padding-inline | — | `--neo-space-md` · 12px |
| `item` | gap | — | `--neo-space-md` · 12px |
| `item` | border-radius | — | `--neo-radius-sm` · 8px |
| `item` | padding-block | every size | `--neo-space-md` · 12px |
| `item` | min-height | every size | `--neo-space-3xl` · 48px |
| `item-icon` | width | — | `--neo-icon-size-sm` · 20px |
| `item-icon` | height | — | `--neo-icon-size-sm` · 20px |
| `item-arrow` | width | — | `--neo-icon-size-xs` · 16px |
| `item-arrow` | height | — | `--neo-icon-size-xs` · 16px |
| `sub-items` | padding-inline | — | `--neo-space-xl``--neo-space-none` · 24px 0px |
| `sub-items` | gap | — | `--neo-space-none` · 0px |
| `sub-item` | padding-block | — | `--neo-space-sm` · 8px |
| `sub-item` | padding-inline | — | `--neo-space-md` · 12px |
| `sub-item` | gap | — | `--neo-space-md` · 12px |
| `sub-item` | border-radius | — | `--neo-radius-none` · 0px |
| `footer` | gap | — | `--neo-space-sm` · 8px |
| `profile` | height | — | 60px |
| `profile` | padding-block | — | `--neo-space-md` · 12px |
| `profile` | gap | — | `--neo-space-sm` · 8px |
| `profile` | border-radius | — | `--neo-radius-sm` · 8px |
| `profile` | border-width | — | `--neo-stroke-xs` · 1px |
| `profile` | padding-inline | every combination | `--neo-space-none` · 0px |
| `avatar` | width | — | `--neo-space-2xl` · 32px |
| `avatar` | height | — | `--neo-space-2xl` · 32px |
| `avatar` | border-radius | — | `--neo-radius-pill` · 999px |
| `bar` | height | — | 56px |
| `bar` | padding-inline | — | `--neo-space-xs` · 4px |
| `bar` | padding-block | — | `--neo-space-none` · 0px |
| `menu-toggle` | width | — | 56px |
| `menu-toggle` | height | — | 56px |
| `card` | padding-block | — | `--neo-space-lg` · 16px |
| `card` | padding-inline | — | `--neo-space-lg` · 16px |
| `card` | gap | — | `--neo-space-lg` · 16px |
| `card` | border-radius | — | `--neo-radius-lg` · 16px |
| `card` | border-width | — | `--neo-stroke-xs` · 1px |
| `card` | width | device=tablet | 360px |
| `card` | max-width | device=mobile | 360px |
| `actions` | gap | — | `--neo-space-xs` · 4px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `group-title` | — | `Caption/sm-Medium` | 12px | 500 | 16px | 1 line |
| `item` | — | `Body/md-Regular` | 14px | 400 | 20px | 1 line |
| `item` | `active` (state) | `Body/md-Medium` | 14px | 500 | 20px | 1 line |
| `item` | `active-hover` (state) | `Body/md-Medium` | 14px | 500 | 20px | 1 line |
| `item` | `active-focus` (state) | `Body/md-Medium` | 14px | 500 | 20px | 1 line |
| `sub-item` | — | `Body/md-Regular` | 14px | 400 | 20px | 1 line |
| `sub-item` | `active` (state) | `Body/md-Medium` | 14px | 500 | 20px | 1 line |
| `sub-item` | `active-focus` (state) | `Body/md-Medium` | 14px | 500 | 20px | 1 line |
| `avatar` | — | `Caption/sm-Medium` | 12px | 500 | 16px | — |
| `name` | — | `Body/md-Regular` | 14px | 400 | 20px | 1 line |
| `role` | — | `Caption/sm-Regular` | 12px | 400 | 16px | 1 line |

---

## Motion

| Motion | Element | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|---|
| `expanded` | `root` | state | 350 ms | cubic-bezier(0, 0, 0.58, 1) | — |

---

## HTML

<!-- prosa:html -->

```html
<!-- From 992 px: the column, wide, with the current place marked and one option open. -->
<nav class="sidebar" aria-label="Navegación principal">
  <div class="sidebar__header">
    <div class="sidebar__brand">
      <span class="sidebar__logo"><!-- the logo --></span>
      <button type="button" class="sidebar__toggle" aria-label="Contraer menú" aria-expanded="true"><svg aria-hidden="true"><use href="#system-sidebar-close"/></svg></button>
    </div>
    <hr class="sidebar__divider">
  </div>
  <div class="sidebar__navigation">
    <div class="sidebar__group">
      <div class="sidebar__group-title"><span id="g1">Grupo</span><button type="button" class="btn btn--tertiary btn--small btn--icon-only sidebar__group-toggle" aria-labelledby="g1" aria-expanded="true"><svg aria-hidden="true"><use href="#system-chevron-down"/></svg></button></div>
      <ul class="sidebar__list">
        <li><a class="sidebar__item" href="/opcion-1" aria-current="page"><svg class="sidebar__item-icon" aria-hidden="true"><use href="#system-home"/></svg><span>Opción</span></a></li>
        <li><button type="button" class="sidebar__item" aria-expanded="true" aria-controls="s1"><svg class="sidebar__item-icon" aria-hidden="true"><use href="#system-home"/></svg><span>Opción</span><svg class="sidebar__item-arrow" aria-hidden="true"><use href="#system-chevron-down"/></svg></button>
          <ul id="s1" class="sidebar__sub-items"><li><a class="sidebar__sub-item" href="/opcion-2-1"><span>Opción</span></a></li></ul></li>
        <li><a class="sidebar__item" aria-disabled="true"><svg class="sidebar__item-icon" aria-hidden="true"><use href="#system-home"/></svg><span>Opción</span></a></li>
      </ul>
    </div>
  </div>
  <div class="sidebar__footer">
    <button type="button" class="sidebar__profile" aria-haspopup="menu" aria-expanded="false"><span class="sidebar__avatar" aria-hidden="true">NA</span><span><span class="sidebar__name">Nombre Apellido</span><span class="sidebar__role">Rol</span></span><svg aria-hidden="true"><use href="#system-chevron-right"/></svg></button>
  </div>
</nav>

<!-- Below 992 px: the bar is the navigation, and the menu opens inside it as a card over the scrim. -->
<nav class="sidebar__bar" aria-label="Navegación principal">
  <button type="button" class="sidebar__menu-toggle" aria-label="Cerrar menú" aria-expanded="true" aria-controls="menu"><svg aria-hidden="true"><use href="#system-close"/></svg></button>
  <span class="sidebar__logo"><!-- the logo --></span>
  <span class="sidebar__notifications"><!-- the bell --></span>
  <div class="modal-overlay sidebar__scrim" aria-hidden="true"></div>
  <div id="menu" class="sidebar sidebar__card">
    <button type="button" class="sidebar__menu-close" aria-label="Cerrar menú"></button>
    <div class="sidebar__navigation"><!-- the same groups --></div>
    <div class="sidebar__footer"><hr class="sidebar__divider"><!-- the profile; on a phone, Ayuda and Cerrar sesión in .sidebar__actions --></div>
  </div>
</nav>```

The flat layer leaves the form to whoever writes the markup: the column from 992 px, and below it the bar with the card. The rail is `sidebar--rail` on the root: the options show only their icon and keep their label as the accessible name. With the menu open, everything outside the card is out of reach of a screen reader and of the keyboard, ☰ included: the card starts with its own ✕, `sidebar__menu-close`, unpainted over the one in the bar, and it is the first Tab stop. A disabled option carries `aria-disabled="true"` and no `href`.

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<nav>` | `aria-label="Navegación principal"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus through the toggle, the group titles, the options and the profile, in order; a closed group or submenu keeps its options out of the order; below 992, with the menu open, the first stop is the ✕ inside the menu, named «Cerrar menú» |
| `Enter · Space` | goes to the focused option, or opens and closes the focused group, submenu or profile menu |
| `Escape` | below 992, closes the menu and returns focus to ☰ |

---

## Rules

| Limit | When exceeded |
|---|---|
| **groups:** at most 5 | the master offers five groups: with more places, the navigation is reorganized, not stretched. |
| **options per group:** at most 8 | a group with more options no longer scans: it is split in two groups. |
| **sub-options per option:** at most 6 | with more than 6, turn that option into a group, and its sub-options into the options of that group. |
| **option label:** 1 line | it is cut with an ellipsis; the full label stays as the accessible name. |

---

## See also

| Use instead | When |
|---|---|
| [`tabs`](tabs.md) | the person changes the view inside a page, not the place in the product |
| [`menu`](menu.md) | the options are actions, not places |
| [`drawer`](drawer.md) | it is a panel of content on the right, not the navigation |
| [`breadcrumbs`](breadcrumbs.md) | the person needs to see the route to the current page; it goes over the content, never inside the sidebar |

---

## Accessibility

- A `<nav>` named «Navegación principal»: a screen reader tells it from the other navigation landmarks of the page.
- The current option carries `aria-current="page"`, and clicking it again keeps it current.
- The button of a group, an option with sub-options and the profile carry `aria-expanded`; the profile also `aria-haspopup="menu"`.
- Below 992 the menu behaves as a modal: focus stays inside, and its first Tab stop is a ✕ named «Cerrar menú», exposed inside the menu; Escape, that ✕ and the scrim close it, and focus returns to ☰.
- On the rail each option keeps its label as its accessible name.
- The focus ring is triggered only by the keyboard (C4).
