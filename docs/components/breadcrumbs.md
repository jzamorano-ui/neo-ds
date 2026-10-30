<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Breadcrumbs

> **Figma (source of truth):** [❖ Breadcrumbs](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40005030-27950) — visual validation against the master.

<!-- prosa:intro -->

Shows where the page sits within the site and lets the person go back to any level above it. With more than four levels it collapses the middle ones into a «…».

Each level is a `link`; the last item is the current page, as plain text.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `type` | link · current · collapsed — not a prop: it follows what is composed inside | `_breadcrumbs/item` |
| `surface` | default · inverse — not a prop: on inverse the root carries `data-surface="inverse"` | `breadcrumbs` |
| `state` | default · collapsed | `breadcrumbs` |
| `state` | default · focus · hover | `_breadcrumbs/item` |
| `label` | text | `_breadcrumbs/item` |

<!-- prosa:properties -->

- **`state=collapsed` is not a prop**: with more than four levels the route collapses on its own and keeps the first level and the last two, that is Home, «…», the parent and the current page. The «…» expands the route in place and it does not collapse again. The same rule holds at every width.
- **`surface` is not a prop**: on a dark background the root carries `data-surface="inverse"`, as in `button`. Unlike `link`, the color is not inherited.
- **The levels are children.** Figma draws up to six places with `item-2` to `item-5`, each one hiding its level and its separator; in code the route has as many levels as it gets.
- **One size, 14/20**, at every width. If the route does not fit, it wraps: the text is never truncated.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoBreadcrumbsProps {
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Extra classes on the root. They add to the system ones; they do not replace them.
  onClick?: (event: MouseEvent<HTMLElement>) => void  // The click handler, with the event, as in MUI. The wrapper runs its own handling first and then calls it.
  'aria-label'?: string               // The accessible name when there is no visible text that provides it.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Breadcrumbs not listed above
}
```

---

## Tokens

### Color

<!-- prosa:color -->

The levels are `text/base/secondary` in Body/md-Regular and the current page is `text/base/default` in Body/md-Medium. The levels keep the underline of `link` but not its bold: the master draws them in Regular. The «…» is transparent at rest and takes `fill/base/medium` on hover; on a dark background the text and the glyphs go to contrast and the «…» uses the inverse tertiary fills.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `level` | surface=default | color | `--text--base--secondary` |
| `level` | surface=default focus | color | `--text--base--secondary` |
| `level` | surface=default focus | outline | `--focus--ring--default` |
| `level` | surface=default focus | box-shadow | `--focus--gap--default` |
| `level` | surface=inverse | color | `--text--base--contrast` |
| `level` | surface=inverse focus | color | `--text--base--contrast` |
| `level` | surface=inverse focus | outline | `--focus--ring--inverse` |
| `level` | surface=inverse focus | box-shadow | `--focus--gap--inverse` |
| `separator` | surface=default | color | `--icon--base--default` |
| `separator` | surface=inverse | color | `--icon--base--contrast` |
| `collapsed` | surface=default | background | `--fill--base--transparent` |
| `collapsed` | surface=default | color | `--icon--base--default` |
| `collapsed` | surface=default hover | background | `--fill--base--medium` |
| `collapsed` | surface=default hover | color | `--icon--base--default` |
| `collapsed` | surface=default focus | background | `--fill--base--transparent` |
| `collapsed` | surface=default focus | outline | `--focus--ring--default` |
| `collapsed` | surface=default focus | box-shadow | `--focus--gap--default` |
| `collapsed` | surface=inverse | background | `--fill--tertiary--inverse--default` |
| `collapsed` | surface=inverse | color | `--icon--base--contrast` |
| `collapsed` | surface=inverse hover | background | `--fill--tertiary--inverse--hover` |
| `collapsed` | surface=inverse hover | color | `--icon--base--contrast` |
| `collapsed` | surface=inverse focus | background | `--fill--tertiary--inverse--default` |
| `collapsed` | surface=inverse focus | outline | `--focus--ring--inverse` |
| `collapsed` | surface=inverse focus | box-shadow | `--focus--gap--inverse` |
| `current` | surface=default | color | `--text--base--default` |
| `current` | surface=inverse | color | `--text--base--contrast` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-xs` · 4px |
| `separator` | width | — | `--neo-icon-size-sm` · 20px |
| `separator` | height | — | `--neo-icon-size-sm` · 20px |
| `collapsed` | width | — | 24px |
| `collapsed` | height | — | 24px |
| `collapsed` | padding-inline | — | `--neo-space-xs` · 4px |
| `collapsed` | padding-block | — | `--neo-space-xs` · 4px |
| `collapsed` | border-radius | — | `--neo-radius-xs` · 4px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `level` | — | `Body/md-Regular` | 14px | 400 | 20px |
| `current` | — | `Body/md-Medium` | 14px | 500 | 20px |

---

## HTML

<!-- prosa:html -->

```html
<!-- Collapsed route: more than four places, so Home, «…», the parent and the current page. -->
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol class="breadcrumbs__list">
    <li><a class="link breadcrumbs__level" href="/">Inicio</a></li>
    <li class="breadcrumbs__separator" aria-hidden="true"><svg><use href="#system-chevron-right"/></svg></li>
    <li><button type="button" class="breadcrumbs__collapsed" aria-label="Mostrar ruta"><svg aria-hidden="true"><use href="#system-ellipsis"/></svg></button></li>
    <li class="breadcrumbs__separator" aria-hidden="true"><svg><use href="#system-chevron-right"/></svg></li>
    <li><a class="link breadcrumbs__level" href="/reembolsos">Reembolsos</a></li>
    <li class="breadcrumbs__separator" aria-hidden="true"><svg><use href="#system-chevron-right"/></svg></li>
    <li><span class="breadcrumbs__current" aria-current="page">Nuevo reembolso</span></li>
  </ol>
</nav>
```

The flat layer leaves the collapse to whoever writes the markup: the «…» stands for the middle levels and, when pressed, the whole list is rendered and focus goes to the first level that appeared. On a dark background, `data-surface="inverse"` goes on the root, as in `button`.

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<nav>` | `aria-label="Breadcrumb"` |
| `span` | `<span>` | `aria-current="page"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus through the levels and the «…», in order; the current page does not take focus |
| `Enter` | follows the focused level, or expands the route on the «…» |
| `Space` | expands the route on the «…», which is a button; a level is a link and Space does not follow it |

---

## Rules

| When | Then |
|---|---|
| `type=link` | state cannot be hover |
| `type=current` | state cannot be focus or hover |

<!-- prosa:rules -->

- **The current page is the last item.** It is not a link and it does not take focus.
- **The levels are `link` as it is**: underlined, with no exception to its spec.
- **On a phone** it goes above the page title, in the content, not in the top bar.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`tabs`](tabs.md) | the person moves between sections of the same level |
| [`link`](link.md) | there is a single way back to one page |

---

## Accessibility

- A `<nav>` with an ordered list inside: the screen reader announces a landmark and a list with its length.
- The current page carries `aria-current="page"`.
- The separators are decorative and hidden from the screen reader.
- The «…» is a button with an accessible name in Spanish, «Mostrar ruta». After it expands the route, focus goes to the first level that appeared, not back to the first one.
- The focus ring is triggered only by the keyboard (C4).

<!-- prosa:accessibility -->

A `<nav>` with an ordered list inside. The current page carries `aria-current="page"` and the separators are hidden from the screen reader. The «…» is a button named «Mostrar ruta»; after it expands the route, focus goes to the first level that appeared.

<!-- /prosa:accessibility -->
