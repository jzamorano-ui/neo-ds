# Modal Full-screen

> **Figma (source of truth):** [❖ Modal-Full](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003720-5194) — visual validation against the master.

It takes the whole screen for dense information or a long task, and closing it (✕) returns the person to where they were. It works both for a flow with steps and for a single view without steps — a complete form, an extensive detail, a large table.

If the content is short and asks for a decision, the case is not a full-screen — it is a [Modal Dialog](modal-dialog.md).

---

## Properties

| Property | Values |
|---|---|
| `device` | desktop · mobile — the version per device. In code it is not a prop: the viewport solves it. |
| `scroll` | none · top · mid · bottom — the state of the inner scroll. In code it is not a prop: the DOM draws it when scrolling. |
| `title` (+ `text`) | The title. Always visible — it is the view's anchor. |
| `back` | The ← (`system/nav-left`). It comes turned off — it is turned on only inside a flow with steps. |
| `slot` | The swappable content: a form, a table, a detail. |
| `cta` (+ `primary`, `secondary`) | The actions, fixed at the bottom. At most 2. |

**The dividing lines show where there is hidden content** (mobile): `none` = no scroll, no lines · `top` = line at the bottom · `mid` = both · `bottom` = line at the top. On web the separators are structural and the scrollbar shows the scroll state.

---

## Props

```typescript
interface NeoModalFullscreenProps {
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (...args: unknown[]) => void  // The close handler. Its presence draws the ✕.
  onBack?: (...args: unknown[]) => void  // The back-step handler.
  title: ReactNode                    // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  actions?: ReactNode                 // The call to action. One at most (C1).
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Dialog
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

It is implemented on top of MUI's **`Dialog` with `fullScreen`**. The height is the viewport (`100dvh`); the scroll lives **only in the content** — header and cta stay fixed. `device` and `scroll` do not reach the API: the viewport decides the version (media query) and the content's own scroll handles the lines' state.

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| contenedor · `header` · `cta` | — | background | `--surface--base--default` |
| `title` | — | color | `--text--base--default` |
| separadores (líneas) | — | background | `--border--base--secondary` |
| ✕ · ← (glifo) | — | color | `--icon--base--default` |
| botón primario | default | background | `--fill--primary--default` |
| botón secundario | default | background | `--fill--secondary--default` |
| botón terciario | default | background | `--fill--tertiary--default` |
| label del botón primario | — | color | `--text--base--contrast` |
| scrollbar — riel (web) | — | background | `--fill--base--default` |
| scrollbar — pulgar (web) | — | background | `--fill--base--medium` |
| `content` (when it overflows) | focus | outline (ring; in CSS it is an inset `box-shadow` because the panel clips) | `--focus--ring--default` |
| `content` (when it overflows) | focus | box-shadow (gap) | `--focus--gap--default` |

> The buttons are the `button` component — their full states live in [button.md](button.md).

### Layout

| Property | web | mobile |
|---|---|---|
| height of the `header` | 104px | 60px |
| padding of the `header` | `--neo-space-xl` 24px · `--neo-space-3xl` 48px | `--neo-space-sm` 8px |
| height of the `cta` | 88px | 128px (2 stacked actions) |
| padding of the `cta` | `--neo-space-xl` 24px · `--neo-space-3xl` 48px | `--neo-space-md` 12px · `--neo-space-lg` 16px · `--neo-space-xl` 24px |
| content gutter | `--neo-space-3xl` 48px | `--neo-space-lg` 16px |
| gap between actions | `--neo-space-md` 12px | `--neo-space-md` 12px |
| ✕ and ← (`button/icon`) | **48×48px** — `size=large` | **40×40px** — `size=medium` |
| ✕ and ← glyph | **24×24px** | 20×20px |

The **← is optional and comes hidden** in the master, in both widths: the ✕ is the only control that
appears by default. The icons are `system/close` and `system/nav-left`.

> All the spacings are on the DS's `space/*` scale — no constants outside the scale.

**Measures** — the component covers the whole viewport; these are the ranges the design considers:

| device | height (design) | height range | width |
|---|---|---|---|
| web | 720px | min 720px – max 1080px | fluid (design at 1440px) |
| mobile | 688px | min 688px – max 812px | 375px (design) |

> In the browser the real height is the viewport (`100dvh`) — the designer respects the range in Figma; the screen always wins.

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `title` (web) | `title/md-bold` | 20px | 700 | 28px |
| `title` (mobile) | `body/lg-bold` | 16px | 700 | 24px |
| button label | `body/lg-medium` | 16px | 500 | 24px |

> The title changes style per device: `title/md-bold` on web, compact on mobile. It is what Figma draws — the CSS applies it with the theme's typography variants.

---

## HTML

```html
<div role="dialog"
     aria-modal="true"
     aria-labelledby="modal-full-title"
     class="modal-full">

  <header class="modal-full__header">
    <button type="button" class="modal-full__back" aria-label="Volver">
      <svg aria-hidden="true"><use href="#system-nav-left"></use></svg>
    </button>
    <h2 id="modal-full-title" class="modal-full__title">Confirma tus datos</h2>
    <button type="button" class="modal-full__close" aria-label="Cerrar">
      <svg aria-hidden="true"><use href="#system-close"></use></svg>
    </button>
  </header>

  <div class="modal-full__content">
    <!-- the slot: form, table, detail… -->
  </div>

  <footer class="modal-full__actions">
    <!-- 40 high = `btn--medium`, measured in the master (`modalFull.ctaBotonAlto`). -->
    <button type="button" class="btn btn--secondary btn--medium">Cancelar</button>
    <button type="button" class="btn btn--primary btn--medium">Enviar solicitud</button>
  </footer>
</div>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Modal | `<div role="dialog">` | `aria-modal="true"` · `aria-labelledby` (the title) |
| Title | `<h2>` | `id` referenced by `aria-labelledby` |
| ✕ | `<button>` | **`aria-label="Cerrar"`** — it is an icon alone |
| ← | `<button>` | **`aria-label="Volver"`** — it is an icon alone |
| Icons | `<svg>` | `aria-hidden="true"` |
| Dividing lines | — | Decorative (CSS) — the scroll state does not depend on them for assistive technology |
| Background | — | The rest of the page stays `inert` while the modal is open |

---

## Keyboard

| Key | Action |
|---|---|
| `Esc` | **Closes the modal — always.** It never goes back: going back belongs to the ← |
| `Tab` | Goes through only the modal's elements (focus trap) |
| `Shift + Tab` | Goes backwards, without leaving the modal |
| `Enter` · `Space` | Activates the focused button |

When opening, focus enters the modal. **When closing (✕ or Esc), focus returns to the element that opened it** — that is the contract of "not losing the point of origin". When going back with ←, focus goes to the start of the previous step, inside the modal.

---

## Rules

- **The component arrives complete. Turn off what you do not use.** The master shows everything that exists.
- **It always carries a title.** It is the anchor of the view and of the screen reader.
- **At most 2 actions, fixed at the bottom.** The primary on the right on web; on top on mobile. The cap
  is **structural, not a guideline**: the master exposes `primary` and `secondary` and there is no third
  slot, so a third action cannot be expressed. If more are needed, the pattern is a different one — it is the
  same reason [`modal-dialog`](modal-dialog.md) declares: it asks for a decision, not a menu.
- **The ← goes only inside a flow with steps.** If the view is single, the only way out is the ✕.
- **The lines mark where there is hidden content.** Depending on the content and its length, inner scroll can appear — on web the scrollbar shows it and on mobile the edge lines. They are not fixed decoration.
- **It carries no scrim (overlay).** It covers the whole viewport, so there is no background to dim — here the context is not kept by seeing it, but by the guaranteed way back: ✕ and `Esc` return to the point of origin. The `--surface--base--overlay` scrim belongs to partial overlays (Dialog · Drawer · Sheet).
- **If the content is short and asks for a decision, use a Modal Dialog.** The full-screen is for dense information or long tasks.

---

## Accessibility

- **WCAG 2.1.1 (Keyboard)** — when the content overflows, its scrolling region takes keyboard focus, with the inner ring, and is named by the title: the arrow keys scroll it.
- **WCAG 2.1.2 (No keyboard trap)** — focus stays trapped inside the modal while it is open, and `Esc` always offers the way out.
- **WCAG 2.4.3 (Focus order)** — when opening, focus enters the modal; when closing, it returns to the element that triggered it; when going back with ←, it goes to the previous step.
- **WCAG 1.3.1 (Info and relationships)** — the title is connected to the modal with `aria-labelledby`.
- **WCAG 2.5.8 (Target size, AA)** — ✕ and ← measure 48×48px on web and 40×40px on mobile; the
  cta buttons, 40px high. All above the 24×24 minimum.
- **WCAG 1.4.10 (Reflow)** — the scroll lives in the content; header and cta are not lost when zooming.
- **Not color or decoration alone** — the lines and the scrollbar are a visual reinforcement of the scroll: all the content stays reachable by keyboard and screen reader without depending on them.
