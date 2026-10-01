# Bottom Sheet

> **Figma (source of truth):** [❖ Sheet](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004734-27146) — visual validation against the master.

It rises from the bottom edge on mobile with complementary content that can wait, or a short task — selecting an option, filtering, an inline promotion — while the person can see, and return to, the page underneath. Dragging the handle down, touching the scrim, or the ✕ all close it without asking a question.

If the content demands a decision, or reports an error the person must resolve, the case is not a sheet — it is a [Modal Dialog](modal-dialog.md). If it is a long task or dense information, it is a [Modal Full-screen](modal-fullscreen.md). On desktop, the same content moves to a lateral drawer — the sheet is mobile-only.

---

## Properties

| Property | Values |
|---|---|
| `image` | It is not a prop: it is the presence of an `image` header. When a header image is given, the header shows it and drops the title — the accessible name then comes from the content, so the first thing inside the sheet must name it. |
| `scroll` | none · top · mid · bottom — the state of the inner scroll. In code it is not a prop: the DOM draws it when scrolling. |
| `title` (+ `text`) | The title, one line — only when there is no header image. It is the anchor of the sheet and of the screen reader. |
| `handle` | The drag handle. Dragging it down closes the sheet — it is not decoration. |
| `slot` | The swappable content: a list, a form, a short detail. |
| `cta` (+ `primary`, `secondary`) | The actions, fixed at the bottom. At most 2. |

**The dividing lines show where there is hidden content**, the same convention as [Modal Full-screen](modal-fullscreen.md): `none` = no scroll, no lines · `top` = line at the bottom · `mid` = both · `bottom` = line at the top.

---

## Props

```typescript
interface NeoBottomSheetProps {
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (...args: unknown[]) => void  // The close handler. Its presence draws the ✕.
  title?: ReactNode                   // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  image?: ReactNode
  actions?: ReactNode                 // The call to action. One at most (C1).
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's SwipeableDrawer not listed above
  // required: a name: `title`, `aria-label`, `aria-labelledby` —one of them
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning.

It is implemented on top of MUI's **`SwipeableDrawer` with `anchor="bottom"`**. Measured on the installed package (5.18): `Drawer` does not set `role="dialog"`, `aria-modal`, or `aria-labelledby` on its own — the wrapper adds the three, which is the reason it exists (ADR 0011). The height is **at most 90% of the visible viewport** (`90dvh`, minus the height a mobile browser's own chrome takes); the scroll lives only in the content — header and cta stay fixed. `scroll` does not reach the API: the content's own scroll handles the lines' state.

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | — | background | `--surface--base--default` |
| scrim | — | background | `--surface--base--overlay` |
| `title` | — | color | `--text--base--default` |
| `separator-header` (the line under the header) | — | background | `--border--base--secondary` |
| `separator-actions` (the line above the actions) | — | background | `--border--base--secondary` |
| `close` (the ✕ glyph) | — | color | `--icon--base--default` |
| `handle` | — | background | `--fill--base--medium` |
| `handle` | `image=true` | background | `--fill--base--default` |
| `content` (when it overflows) | focus | outline (ring; in CSS it is an inset `box-shadow` because the panel clips) | `--focus--ring--default` |
| `content` (when it overflows) | focus | box-shadow (gap) | `--focus--gap--default` |

> The actions are the `button` component and the ✕ is `button/icon`: their fills and their full states live in [button.md](button.md), not here — this table is what the sheet itself paints. The ✕ is `variant=tertiary, surface=default` without an image and `variant=primary, surface=inverse` over one —a white circle with the same dark glyph—, which is the rule any control over a photo follows. The top corners are a measure, not a color: they are in the Layout table (`--neo-radius-xl`).

### Layout

| Property | Value |
|---|---|
| max height | 90% of the visible viewport (`90dvh`) |
| header height (no image) | 64px |
| header height (with image) | 160px |
| cta height | 136px (2 stacked actions) |
| content gutter | `--neo-space-lg` 16px |
| gap between actions | `--neo-space-sm` 8px |
| content minimum height | 200px |
| top corners radius | `--neo-radius-xl` 24px |
| handle | 40×4px, `--neo-radius-pill` |
| ✕ (`button/icon`) | **40×40px** — `size=medium` |

> All the spacings are on the DS's `space/*` scale — no constants outside the scale. **The sheet always measures 375 of reference width in the master** — it fills the screen, and the eight variants share one height: the `scroll` ones sit at the maximum and the content fills what is left; `scroll=none` hugs its content up to that same maximum.

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `title` | `Body/lg-Bold` | 16px | 700 | 24px |
| button label | `body/lg-medium` | 16px | 500 | 24px |

> The title is always **1 line**: the master cuts the `sheet-title` layer with an ellipsis (`maxLines: 1`) in its eight variants, so the header measures the same whatever the title says. Rewrite it shorter rather than letting it cut: the title names what is being chosen.

---

## HTML

```html
<!-- `data-scroll` carries the reading point of the scrolling region — `none · top · mid · bottom`.
     The browser has no pseudo-class for «there is more content below», so the two divider lines are
     drawn from this attribute. The component sets it; a hand-written sheet sets it too, or the
     dividers never appear. `none` is the short sheet: nothing to scroll, no lines at all.

     THIS EXAMPLE SHOWS `top` on purpose — the state where the master draws BOTH lines: one under the
     header, because the region scrolls, and one above the actions, because there is more content
     below. With `none` the markup is the same and neither line is painted. -->
<div role="dialog"
     aria-modal="true"
     aria-labelledby="sheet-title"
     data-scroll="top"
     class="bottom-sheet">

  <header class="bottom-sheet__header">
    <!-- INSIDE the header, not beside it: in the master the handle is a layer of
         `_bottom-sheet/header`, and with an image it travels with it. -->
    <div class="bottom-sheet__handle" aria-hidden="true"></div>
    <div class="bottom-sheet__title-row">
      <h2 id="sheet-title" class="bottom-sheet__title">Selecciona tu región</h2>
      <button type="button" class="bottom-sheet__close" aria-label="Cerrar">
        <svg aria-hidden="true"><use href="#system-close"></use></svg>
      </button>
    </div>
  </header>

  <!-- WHEN THE REGION OVERFLOWS IT HAS TO BE REACHABLE BY KEYBOARD (WCAG 2.1.1): `tabindex="0"` so it
       takes focus and the arrow keys move it, and `role="region"` with the title as its name so the
       stop is announced. `NeoBottomSheet` adds the three by itself, and only while the content
       actually overflows — a focus stop with nothing to scroll is a dead end. A hand-written sheet
       adds them, and removes them when the content fits. -->
  <div class="bottom-sheet__content"
       data-scroll="top"
       tabindex="0"
       role="region"
       aria-labelledby="sheet-title">
    <!-- the slot: a list, a form, a short detail… -->
  </div>

  <!-- THE PRIMARY ACTION COMES FIRST IN THE DOM because it is the one drawn on top, and reading
       order has to match reading order (WCAG 1.3.2 and 2.4.3). `NeoBottomSheet` reverses the pair
       for you: its example passes `[secondary, primary]`, the in-line order. -->
  <footer class="bottom-sheet__actions" data-scroll="top">
    <button type="button" class="btn btn--primary btn--medium">Confirmar</button>
    <button type="button" class="btn btn--secondary btn--medium">Cancelar</button>
  </footer>
</div>
```

With an image header, the title slot is replaced and the first heading inside `children` names the sheet (`aria-labelledby` points there instead):

```html
<div role="dialog" aria-modal="true" aria-labelledby="sheet-content-title" data-scroll="none" class="bottom-sheet">
  <div class="bottom-sheet__header-image">
    <img src="…" alt="" />
    <div class="bottom-sheet__handle" aria-hidden="true"></div>
    <button type="button" class="bottom-sheet__close" aria-label="Cerrar">…</button>
  </div>
  <div class="bottom-sheet__content" data-scroll="none">
    <h2 id="sheet-content-title">Programa Mamá Esencial</h2>
    <!-- … -->
  </div>
</div>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Sheet | `<div role="dialog">` | `aria-modal="true"` · `aria-labelledby` (the title, or the first heading of the content when there is an image) |
| Title | `<h2>` | `id` referenced by `aria-labelledby` |
| ✕ | `<button>` | **`aria-label="Cerrar"`** — it is an icon alone |
| Handle | — | Decorative (`aria-hidden="true"`) — dragging it is a pointer gesture, not a control a keyboard or screen reader user has another way to reach: the ✕ is the keyboard equivalent |
| Icons | `<svg>` | `aria-hidden="true"` |
| Dividing lines | — | Decorative (CSS) — the scroll state does not depend on them for assistive technology |
| Background | — | The rest of the page stays `inert` while the sheet is open |

---

## Keyboard

| Key | Action |
|---|---|
| `Esc` | Closes the sheet |
| `Tab` | Goes through only the sheet's elements (focus trap) |
| `Shift + Tab` | Goes backwards, without leaving the sheet |
| `Enter` · `Space` | Activates the focused button |

When opening, focus enters the sheet. When closing (✕, `Esc`, scrim, or a completed swipe), focus returns to the element that opened it.

---

## Rules

- **The component arrives complete. Turn off what you do not use.** The master shows everything that exists.
- **Either `title` or `image` names the sheet — never neither.** With an image, the header carries no title slot, so the accessible name has to come from the content: the first heading inside `children` takes over `aria-labelledby`.
- **The title is always one line.** The header measures the same whether it is short or long.
- **At most 2 actions, fixed at the bottom.** The master exposes `primary` and `secondary` and there is no third slot — the same cap [`modal-dialog`](modal-dialog.md) and [`modal-fullscreen`](modal-fullscreen.md) declare.
- **Header and actions stay fixed; only the content scrolls.** The actions never get lost below the fold.
- **The height grows with the content up to 90% of the visible viewport.** Past that, the content scrolls and the dividing lines appear.
- **Dragging the handle down closes the sheet — it is not decoration.** Turning off `onClose` also turns off the ✕ and the swipe gesture: the master shows a sheet with no way out only when it is not meant to close on its own.
- **It is for content that can wait.** A decision or an error the person must resolve is a [Modal Dialog](modal-dialog.md) — it is not dismissed by tapping the background.
- **It is mobile-only.** On desktop, the same content moves to a lateral drawer; the sheet does not adapt by breakpoint the way `modal-fullscreen` does.

---

## Accessibility

- **WCAG 2.1.1 (Keyboard)** — every way to close (✕, `Esc`, scrim) has a keyboard-reachable equivalent; the drag gesture is the one exception with a substitute, not a requirement.
- **WCAG 2.1.2 (No keyboard trap)** — focus stays trapped inside the sheet while it is open, and `Esc` always offers the way out.
- **WCAG 2.4.3 (Focus order)** — when opening, focus enters the sheet; when closing, it returns to the element that triggered it.
- **WCAG 1.3.1 (Info and relationships)** — the sheet is connected to its name with `aria-labelledby`, which points at the title or, with an image, at the content's own heading.
- **WCAG 2.5.8 (Target size, AA)** — the ✕ measures 40×40px; the cta buttons, 40px high. Both above the 24×24 minimum.
- **WCAG 1.4.10 (Reflow)** — the scroll lives in the content; header and cta are not lost when zooming.
- **Not color or decoration alone** — the dividing lines are a visual reinforcement of the scroll state: all the content stays reachable by keyboard and screen reader without depending on them.
