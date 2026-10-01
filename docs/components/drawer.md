# Drawer

> **Figma (source of truth):** [❖ Drawer](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004734-27249) — visual validation against the master.

It enters from the right edge on the web with complementary or extensive content that the person opens on demand — the detail of a quote, more information about a product, a summary or a cart — while the page underneath stays in view. It can be purely informative, with no actions. The ✕, `Esc`, or touching the scrim close it without asking a question.

If the content demands a decision, or reports an error the person must resolve, the case is not a drawer — it is a [Modal Dialog](modal-dialog.md). If it is a long task with steps, it is a [Modal Full-screen](modal-fullscreen.md). On mobile, the same content goes in a [Bottom Sheet](bottom-sheet.md) — the drawer is web-only.

---

## Properties

| Property | Values |
|---|---|
| `scroll` | none · top · mid · bottom — the state of the inner scroll. In code it is not a prop: the DOM draws it when scrolling. |
| `image` | An image on top of the content, edge to edge. It scrolls with the content and does not replace the header: the title stays. |
| `title` (`text`) | The title, one line. It is always there: it names the drawer for a screen reader. |
| `slot` | The swappable content: a detail, a summary, a list. |
| `cta` (+ `primary`, `secondary`) | The actions, fixed at the bottom. Optional, and at most 2. |

**The dividing lines show where there is hidden content**, the same convention as [Modal Full-screen](modal-fullscreen.md) and [Bottom Sheet](bottom-sheet.md): `none` = no scroll, no lines · `top` = line at the bottom · `mid` = both · `bottom` = line at the top.

---

## Props

```typescript
interface NeoDrawerProps {
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (...args: unknown[]) => void  // The close handler. Its presence draws the ✕.
  title: ReactNode                    // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  image?: ReactNode
  actions?: ReactNode                 // The call to action. One at most (C1).
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Drawer not listed above
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning.

It is implemented on top of MUI's **`Drawer` with `anchor="right"`**, sharing its base with [Bottom Sheet](bottom-sheet.md). Measured on the installed package (5.18): `Drawer` does not set `role="dialog"`, `aria-modal`, or `aria-labelledby` on its own — the wrapper adds the three, which is the reason it exists (ADR 0011). It measures **540px wide and the whole visible height** (`100dvh`); the scroll lives only in the content — header and actions stay fixed.

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
| `actions` | — | background | `--surface--base--default` |
| `content` (when it overflows) | focus | outline (ring; in CSS it is an inset `box-shadow` because the panel clips) | `--focus--ring--default` |
| `content` (when it overflows) | focus | box-shadow (gap) | `--focus--gap--default` |

> The actions are the `button` component and the ✕ is `button/icon`: their fills and their full states live in [button.md](button.md), not here — this table is what the drawer itself paints.

### Layout

| Property | Value |
|---|---|
| width | 540px |
| height | the whole visible viewport (`100dvh`) |
| header height | 80px |
| header padding | `--neo-space-lg` 16px block · `--neo-space-xl` 24px inline |
| image height | 224px, edge to edge |
| content gutter | `--neo-space-xl` 24px |
| actions height | 140px (2 stacked actions) |
| gap between actions | `--neo-space-md` 12px |
| corners | none — the panel rests on the right edge |
| ✕ (`button/icon`) | **48×48px** — `size=large` |

> All the spacings are on the DS's `space/*` scale — no constants outside the scale. The four variants share one height: the panel always fills the visible viewport, and the content takes what is left between the header and the actions.

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `title` | `Title/sm-Bold` | 18px | 700 | 26px |
| button label | `body/lg-medium` | 16px | 500 | 24px |

> The title is always **1 line**: the master cuts the `title` layer with an ellipsis (`maxLines: 1`) in its four variants, so the header measures the same whatever the title says.

---

## HTML

```html
<!-- `data-scroll` carries the reading point of the scrolling region — `none · top · mid · bottom`.
     The browser has no pseudo-class for «there is more content below», so the two divider lines are
     drawn from this attribute. The component sets it; a hand-written drawer sets it too. -->
<div role="dialog"
     aria-modal="true"
     aria-labelledby="drawer-title"
     data-scroll="top"
     class="drawer">

  <header class="drawer__header">
    <div class="drawer__title-row">
      <h2 id="drawer-title" class="drawer__title">Resumen</h2>
      <button type="button" class="drawer__close" aria-label="Cerrar">
        <svg aria-hidden="true"><use href="#system-close"></use></svg>
      </button>
    </div>
  </header>

  <!-- WHEN THE REGION OVERFLOWS IT HAS TO BE REACHABLE BY KEYBOARD (WCAG 2.1.1): `tabindex="0"`
       and `role="region"` with the title as its name. `NeoDrawer` adds them only while the content
       actually overflows. -->
  <div class="drawer__content"
       data-scroll="top"
       tabindex="0"
       role="region"
       aria-labelledby="drawer-title">
    <!-- optional: the image, edge to edge, scrolls with the content -->
    <img class="drawer__image" src="…" alt="" />
    <!-- the slot: a detail, a summary, a list… -->
  </div>

  <!-- Optional: an informative drawer has no actions. THE PRIMARY ACTION COMES FIRST IN THE DOM
       because it is the one drawn on top (WCAG 1.3.2 and 2.4.3). -->
  <footer class="drawer__actions" data-scroll="top">
    <button type="button" class="btn btn--primary btn--medium">Contratar online</button>
    <button type="button" class="btn btn--secondary btn--medium">Seguir cotizando</button>
  </footer>
</div>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Drawer | `<div role="dialog">` | `aria-modal="true"` · `aria-labelledby` (the title) |
| Title | `<h2>` | `id` referenced by `aria-labelledby` |
| ✕ | `<button>` | **`aria-label="Cerrar"`** — it is an icon alone |
| Image | `<img>` | `alt=""` when it is decorative — the title names the drawer |
| Icons | `<svg>` | `aria-hidden="true"` |
| Dividing lines | — | Decorative (CSS) — the scroll state does not depend on them for assistive technology |
| Background | — | The rest of the page stays `inert` while the drawer is open |

---

## Keyboard

| Key | Action |
|---|---|
| `Esc` | Closes the drawer |
| `Tab` | Goes through only the drawer's elements (focus trap) |
| `Shift + Tab` | Goes backwards, without leaving the drawer |
| `Enter` · `Space` | Activates the focused button |

When opening, focus enters the drawer. When closing (✕, `Esc` or the scrim), focus returns to the element that opened it.

---

## Rules

- **The component arrives complete. Turn off what you do not use.** The master shows everything that exists.
- **The title is always there, and always one line.** It names the drawer — with an image too — and the header measures the same whether it is short or long.
- **Actions are optional, at most 2, fixed at the bottom.** A drawer can be purely informative. For a third action, change the secondary's variant: the master exposes only `primary` and `secondary`.
- **Header and actions stay fixed; only the content scrolls.** The actions never get lost below the fold.
- **It is for complementary content.** A decision or an error the person must resolve is a [`modal-dialog`](modal-dialog.md) — it is not dismissed by touching the background —, and a long task with steps is a [`modal-fullscreen`](modal-fullscreen.md).
- **It is web-only.** On mobile, the same content goes in a [`bottom-sheet`](bottom-sheet.md).

---

## Accessibility

- **WCAG 2.1.1 (Keyboard)** — every way to close (✕, `Esc`, scrim) has a keyboard-reachable equivalent.
- **WCAG 2.1.2 (No keyboard trap)** — focus stays trapped inside the drawer while it is open, and `Esc` always offers the way out.
- **WCAG 2.4.3 (Focus order)** — when opening, focus enters the drawer; when closing, it returns to the element that triggered it.
- **WCAG 1.3.1 (Info and relationships)** — the drawer is connected to its name with `aria-labelledby`, which points at the title.
- **WCAG 2.5.8 (Target size, AA)** — the ✕ measures 48×48px; the action buttons, 40px high.
- **WCAG 1.4.10 (Reflow)** — the scroll lives in the content; header and actions are not lost when zooming.
- **Not color or decoration alone** — the dividing lines are a visual reinforcement of the scroll state.
