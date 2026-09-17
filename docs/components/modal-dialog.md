# Modal Dialog

> **Figma (source of truth):** [❖ Modal-Dialog](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003650-15191) — visual validation against the master.

Interrupts the flow to ask for a decision or an answer. When it is closed, the person goes back to where they were. It is a single component: `type` defines what it is about and `size` how big it is.

If the content needs scroll or several steps, the case is not a dialog — it is `modal-fullscreen`.

---

## Properties

| Property | Values |
|---|---|
| `size` | xs · sm · md · lg |
| `type` | default · brand · info · success · warning · error |
| `title` | The title. |
| `close` | The ✕. It comes turned on. |
| `description` (+ `text`) | The description. |
| `content` (+ `slot`) | The swappable content: a field, a list, a table. |
| `cta` (+ `primary`, `secondary`) | The actions. At most 2. |

**Combinations:** the colored types (`brand` · `info` · `success` · `warning` · `error`) **only exist in `xs` and `sm`**. In `md` and `lg` the header is neutral.

---

## Props

```typescript
interface NeoModalDialogProps {
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (...args: unknown[]) => void  // The close handler. Its presence draws the ✕.
  title: ReactNode                    // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  description?: ReactNode             // The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node.
  size?: 'xs' | 'sm' | 'md' | 'lg'    // how large the dialog is: 440 · 600 · 900 · 1200 of maximum width, constants from the master and not the breakpoint scale. It also scales the horizontal gutter (16 · 24 · 24 · 32). Default: 'xs'.
  type?: 'default' | 'brand' | 'info' | 'success' | 'warning' | 'error'  // what the dialog is about — the header background, the title color and the icon come from it, and the icon is NOT a prop but is derived (C6) Default: 'default'.
  closable?: boolean                  // Draws the ✕. It needs `onClose` to do anything.
  actions?: ReactNode                 // The call to action. One at most (C1).
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Dialog
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

It is implemented on top of MUI's **`Dialog`** with `scroll="paper"`. **The widths are fixed design constants
(440 · 600 · 900 · 1200), not the system's breakpoint scale** — and the theme already applies them in
px, hung from the class MUI generates from `maxWidth` (`.MuiDialog-paperWidthXs`…). The wrapper passes
`maxWidth: size` **as is**.

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `dialog` | — | background | `--surface--base--default` |
| scrim (overlay) | — | background | `--surface--base--overlay` |
| `title` | default | color | `--text--base--default` |
| `title` | type=brand | color | `--text--base--brand` |
| `title` | type=info | color | `--text--semantic--info` |
| `title` | type=success | color | `--text--semantic--success` |
| `title` | type=warning | color | `--text--semantic--warning` |
| `title` | type=error | color | `--text--semantic--error` |
| `header` | type=info | background | `--fill--semantic--info--soft` |
| `header` | type=success | background | `--fill--semantic--success--soft` |
| `header` | type=warning | background | `--fill--semantic--warning--soft` |
| `header` | type=error | background | `--fill--semantic--error--soft` |
| `description` | — | color | `--text--base--default` |
| `icono` | type=info | fill | `--icon--semantic--info` |
| `icono` | type=success | fill | `--icon--semantic--success` |
| `icono` | type=warning | fill | `--icon--semantic--warning` |
| `icono` | type=error | fill | `--icon--semantic--error` |
| `icono` | type=brand | fill | `--icon--base--brand-solid` (plus `--icon--base--brand-soft` and `--icon--base--contrast` in its other regions) |
| botón primario | default | background | `--fill--primary--default` |
| botón secundario | default | background | `--fill--secondary--default` |
| botón terciario | default | background | `--fill--tertiary--default` |
| label del botón primario | — | color | `--text--base--contrast` |
| ✕ (focus) | focus | outline | `--neo-stroke-focus-ring-width` |
| `content` (when it overflows) | focus | outline (ring; in CSS it is an inset `box-shadow` because the panel clips) | `--focus--ring--default` |
| `content` (when it overflows) | focus | box-shadow (gap) | `--focus--gap--default` |

> **`brand` paints no background, and neither does `default`.** Only the four semantic types bind a background in the header.

> **The icon is not a prop: it comes from `type`** (C6). It is not recolored from any sheet — the sprite's
> `semantic-*` and `brand-sparkles` icons are *self-colored*, with each region's token set
> inline, and their regions match the master's. `type=error` instantiates
> `semantic-error`, painted with `--icon--semantic--error`.

> **The arc.** Under the colored header the master subtracts a 504×70 ellipse from a 16 rectangle,
> and the net result is a bottom edge that dips in the center and rises 14 px at the edges. The two layers
> draw it with elliptical radii (`border-bottom-*-radius: 50% 14px`). `brand` does not carry it: it has no
> background to curve.

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `border-radius` (dialog) | `--neo-radius-xl` | 24px |
| `border-radius` (contenido) | `--neo-radius-xs` | 4px |
| `border-radius` (✕) | `--neo-radius-pill` | 999px |
| `padding` (gutter) — xs | `--neo-space-lg` | 16px |
| `padding` (gutter) — sm · md | `--neo-space-xl` | 24px |
| `padding` (gutter) — lg | `--neo-space-2xl` | 32px |
| `gap` (bajada ↔ contenido) | `--neo-space-lg` | 16px |
| `gap` (between actions) | `--neo-space-md` | 12px |
| `icon-size` (semantic) | `--neo-icon-size-3xl` | — |
| `icon-size` (brand) | `--neo-icon-size-4xl` | — |
| `icon-size` (✕ · glifo) | `--neo-icon-size-sm` | 20px |
| `size` (✕ · box) | `--neo-icon-size-xl` | 40px |

> **The ✕ is a [button-icon](button-icon.md)** —`system · tertiary · medium`—: its 40 box, its 20 glyph
> and its `--fill--tertiary--default` background come from there. The only thing the dialog decides is
> where it stands: absolute, top right.

**Measures** — `size` defines the **maximum width** (the contract with the code). The minimum is a design rule: if you need less, use the previous size.

| size | width (min – max) | maximum height |
|---|---|---|
| `xs` | 343 – 440 | 600 |
| `sm` | 440 – 600 | 700 |
| `md` | 600 – 900 | 740 |
| `lg` | 900 – 1200 | 840 |

> In the browser, the real width is `min(viewport − margins, max-width)`. The designer respects the minimum in Figma; the viewport always wins.

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `title` (xs · sm · md · lg) | `title/sm-bold` | 18px | 700 | 26px |
| `description` | `body/lg-regular` | 16px | 400 | 24px |

> **The title does NOT scale with `size`:** it is `title/sm-bold` in the 4 sizes. What does scale by size is the horizontal **gutter** (xs 16 · sm/md 24 · lg 32).

---

## HTML

The default type: title on the left, ✕ top right, no icon.

```html
<!-- the scrim: dims the page without hiding it — keeps the context; click = close -->
<div class="modal-overlay" aria-hidden="true"></div>

<div role="dialog"
     aria-modal="true"
     aria-labelledby="confirmar-title"
     aria-describedby="confirmar-description"
     class="modal-dialog modal-dialog--sm">

  <header class="modal-dialog__header">
    <h2 id="confirmar-title" class="modal-dialog__title">¿Eliminar el documento?</h2>
    <button type="button" class="modal-dialog__close" aria-label="Cerrar">
      <svg aria-hidden="true"><use href="#system-close"></use></svg>
    </button>
  </header>

  <div class="modal-dialog__content">
    <p id="confirmar-description" class="modal-dialog__description">
      Se va a eliminar de tu historial y no se puede recuperar.
    </p>
  </div>

  <footer class="modal-dialog__actions">
    <button type="button" class="btn btn--secondary btn--medium">Cancelar</button>
    <button type="button" class="btn btn--primary btn--medium">Eliminar</button>
  </footer>
</div>
```

A colored type: the header becomes a column, the icon goes above the title and the faint background
ends in the arc. The icon is decided by `type` — it is not a decision of whoever writes it.

```html

<div role="dialog"
     aria-modal="true"
     aria-labelledby="dialog-title"
     aria-describedby="dialog-description"
     class="modal-dialog modal-dialog--sm modal-dialog--info">

  <header class="modal-dialog__header">
    <!-- Type icon: 56px in the semantic ones (info/success/warning/error), 64 in brand. -->
    <svg class="modal-dialog__icon" aria-hidden="true"><use href="#semantic-info"></use></svg>
    <h2 id="dialog-title" class="modal-dialog__title">Ten a mano tu cédula</h2>
    <button type="button" class="modal-dialog__close" aria-label="Cerrar">
      <svg aria-hidden="true"><use href="#system-close"></use></svg>
    </button>
  </header>

  <div class="modal-dialog__content">
    <p id="dialog-description" class="modal-dialog__description">
      En el siguiente paso te pediremos una foto de tu cédula.
    </p>
    <!-- the slot: form, list, table… -->
    <div class="modal-dialog__slot"><!-- the form, the list or the table go here --></div>
  </div>

  <footer class="modal-dialog__actions">
    <!-- 40 high = `btn--medium`. -->
    <button type="button" class="btn btn--secondary btn--medium">Cancelar</button>
    <button type="button" class="btn btn--primary btn--medium">Continuar</button>
  </footer>
</div>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Dialog | `<div role="dialog">` | `aria-modal="true"` · `aria-labelledby` (the title) · `aria-describedby` (the description) |
| Title | `<h2>` | `id` referenced by `aria-labelledby` |
| Bajada | `<p>` | `id` referenced by `aria-describedby` |
| ✕ | `<button>` | **`aria-label="Cerrar"`** — it is an icon alone |
| Icons | `<svg>` | `aria-hidden="true"` |
| Scrim | `<div class="modal-overlay">` | `aria-hidden="true"` — it is visual; closing by click is handled by the modal's script |
| Background | — | The rest of the page stays `inert` under the scrim: no focus, no clicks, no scroll |

> **`aria-describedby` points to the description, not to the slot.** That is why the description is a property of the component and not a loose paragraph inside the content: it is the stable node the screen reader anchors to.

---

## Keyboard

| Key | Action |
|---|---|
| `Esc` | **Closes the dialog — always, whether there is a ✕ or not.** |
| `Tab` | Goes through only the dialog's elements (focus trap) |
| `Shift + Tab` | Goes backwards, without leaving the dialog |
| `Enter` · `Space` | Activates the focused button |

When opening, focus enters the dialog (the first interactive element or the container). **When closing, focus returns to the element that opened it.**

---

## Rules

- **The title truncates to max 2 lines**, in the 14 variants. A
  title that does not fit is cut, it does not push the dialog.
- **The component arrives complete. Turn off what you do not use.** The master shows everything that exists.
- **At most 2 actions.**
- **The content is short.** If it needs scroll or several steps, use a Modal full-screen.
- **The scrim keeps the context.** The page stays visible, dimmed with `--surface--base--overlay` — the person knows where they are and where they return. A click on the scrim closes, same as `Esc`. A single scrim at a time: overlays do not stack.
- **The semantic one goes in `xs` or `sm`.** It does not exist in `md` or `lg`.
- **It always carries a description or content.** At least one of the two.
- **The ✕ goes only if no action allows leaving.** If there is already a "Cancel", the ✕ duplicates it.
- **The button names the action.** "Delete account", never "OK" — the label is the last thing read before the click.

---

## Accessibility

- **WCAG 2.1.1 (Keyboard)** — when the content overflows, its scrolling region takes keyboard focus, with the inner ring, and is named by the title: the arrow keys scroll it.
- **WCAG 2.1.2 (No keyboard trap)** — focus stays trapped inside the dialog while it is open, and `Esc` always offers the way out.
- **WCAG 2.4.3 (Focus order)** — when opening, focus enters the dialog; when closing, it returns to the element that triggered it.
- **WCAG 1.3.1 (Info and relationships)** — the title and the description are connected to the dialog with `aria-labelledby` and `aria-describedby`.
- **WCAG 1.4.3 (Contrast)** — the four semantic titles on their color band pass AA for normal text (info 11.3 · success 8.7 · error 7.8 · warning 5.7).
- **WCAG 2.5.8 (Target Size, AA)** — the ✕ is a **40×40** `button/icon` with the glyph at 20, and the action buttons measure 40 high. Both comfortably exceed the 24×24 AA minimum. *(They do not reach 2.5.5's 44×44, which is level AAA — the system aims for AA.)*
- **Not color alone** — each semantic type carries an icon besides color: the state is not conveyed by the background alone.
- The system **has no destructive button**. The risk is conveyed by `type=error`, a description that says what is lost, and an explicit label.
