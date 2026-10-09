<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Modal Dialog

> **Figma (source of truth):** [❖ Modal Dialog](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003650-15191) — visual validation against the master.

<!-- prosa:intro -->

Interrupts the flow to ask for a decision or an answer. When it is closed, the person goes back to where they were. It is a single component: `type` defines what it is about and `size` how big it is.

If the content needs scroll or several steps, the case is not a dialog — it is `modal-fullscreen`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `type` | default · brand · info · success · warning · error — default `default` |
| `size` | xs · sm · md · lg — default `xs` |
| `title` | text |
| `description` | true · false — default `true` |
| `content` | true · false — default `true` |
| `cta` | true · false — default `true` |
| `↪ primary` | true · false — default `true` |
| `↪ secondary` | true · false — default `true` |
| `close` | true · false — default `true` |

<!-- prosa:properties -->

`description` (+ `text`) is the description; `content` (+ `slot`) is the swappable content: a field, a list, a table; `cta` (+ `primary`, `secondary`) are the actions, at most 2. The colored types (`brand` · `info` · `success` · `warning` · `error`) only exist in `xs` and `sm`: in `md` and `lg` the header is neutral.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoModalDialogProps {
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (event: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void  // The close handler. Its presence draws the ✕.
  description?: ReactNode             // The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node.
  title: ReactNode                    // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  type?: 'default' | 'brand' | 'info' | 'success' | 'warning' | 'error'  // what the dialog is about — the header background, the title color and the icon come from it, and the icon is NOT a prop but is derived (C6) Default: 'default'.
  size?: 'xs' | 'sm' | 'md' | 'lg'    // how large the dialog is: 343 · 600 · 900 · 1200 of maximum width, constants from the master and not the breakpoint scale. It also scales the horizontal gutter (16 · 24 · 24 · 32). Default: 'xs'.
  closable?: boolean                  // Draws the ✕. It needs `onClose` to do anything.
  actions?: ReactNode                 // The call to action. One at most (C1).
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Dialog not listed above
}
```

<!-- prosa:props -->

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

It is implemented on top of MUI's **`Dialog`** with `scroll="paper"`. **The widths are fixed design constants
(343 · 600 · 900 · 1200), not the system's breakpoint scale** — and the theme already applies them in
px, hung from the class MUI generates from `maxWidth` (`.MuiDialog-paperWidthXs`…). The wrapper passes
`maxWidth: size` **as is**.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

> **`brand` paints no background, and neither does `default`.** Only the four semantic types bind a background in the header.

> **The icon is not a prop: it comes from `type`** (C6). It is not recolored from any sheet — the sprite's
> `semantic-*` and `brand-sparkles` icons are *self-colored*, with each region's token set
> inline, and their regions match the master's. `type=error` instantiates
> `semantic-error`, painted with `--icon--semantic--error`.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--surface--base--default` |
| `header` | type=info | background | `--fill--semantic--info--soft` |
| `header` | type=success | background | `--fill--semantic--success--soft` |
| `header` | type=warning | background | `--fill--semantic--warning--soft` |
| `header` | type=error | background | `--fill--semantic--error--soft` |
| `icon` | type=info | fill | `--icon--semantic--info` |
| `icon` | type=success | fill | `--icon--semantic--success` |
| `icon` | type=warning | fill | `--icon--semantic--warning` |
| `icon` | type=error | fill | `--icon--semantic--error` |
| `icon` | type=brand | fill | `--icon--base--brand-solid` |
| `title` | default | color | `--text--base--default` |
| `title` | type=brand | color | `--text--base--brand` |
| `title` | type=info | color | `--text--semantic--info` |
| `title` | type=success | color | `--text--semantic--success` |
| `title` | type=warning | color | `--text--semantic--warning` |
| `title` | type=error | color | `--text--semantic--error` |
| `description` | default | color | `--text--base--default` |
| `close` | default | fill | `--icon--base--default` |
| `close` | focus | outline | `--focus--ring--default` |
| `scrim` | default | background | `--surface--base--overlay` |
| `content` | focus | outline | `--focus--ring--default` |
| `content` | focus | box-shadow | `--focus--gap--default` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | border-radius | — | `--neo-radius-xl` · 24px |
| `root` | max-width | size=xs | 343px |
| `root` | max-width | size=sm | 600px |
| `root` | max-width | size=md | 900px |
| `root` | max-width | size=lg | 1200px |
| `header` | gap | — | `--neo-space-md` · 12px |
| `header` | height | type=default | 58px |
| `header` | height | type=info · success · warning · error | 150px |
| `header` | height | type=brand | 146px |
| `header` | padding-block | type=default | `--neo-space-lg` · 16px |
| `header` | padding-block | type=info · success · warning · error | `--neo-space-2xl``--neo-space-xl` · 32px 24px |
| `header` | padding-block | type=brand | `--neo-space-2xl``--neo-space-md` · 32px 12px |
| `header` | padding-inline | type=default, size=xs | `--neo-space-lg``--neo-space-sm` · 16px 8px |
| `header` | padding-inline | type=default, size=sm | `--neo-space-xl``--neo-space-sm` · 24px 8px |
| `header` | padding-inline | type=default, size=md | `--neo-space-xl``--neo-space-lg` · 24px 16px |
| `header` | padding-inline | type=default, size=lg | `--neo-space-2xl``--neo-space-lg` · 32px 16px |
| `header` | padding-inline | type=info · success · warning · error · brand, size=xs | `--neo-space-lg` · 16px |
| `header` | padding-inline | type=info · success · warning · error · brand, size=sm | `--neo-space-xl` · 24px |
| `icon` | width × height | type=info · success · warning · error | `--neo-icon-size-3xl` · 56px |
| `icon` | width × height | type=brand | `--neo-icon-size-4xl` · 64px |
| `close` | width | — | `--neo-icon-size-xl` · 40px |
| `close` | height | — | `--neo-icon-size-xl` · 40px |
| `close` | border-radius | — | `--neo-radius-pill` · 999px |
| `actions` | gap | — | `--neo-space-md` · 12px |
| `actions` | padding-block | every size | `--neo-space-lg``--neo-space-xl` · 16px 24px |
| `actions` | padding-inline | size=xs | `--neo-space-lg` · 16px |
| `actions` | padding-inline | size=sm · md | `--neo-space-xl` · 24px |
| `actions` | padding-inline | size=lg | `--neo-space-2xl` · 32px |
| `content` | gap | — | `--neo-space-lg` · 16px |
| `content` | padding-block | type=default, size=xs | `--neo-space-none``--neo-space-lg` · 0px 16px |
| `content` | padding-block | type=default, size=sm · md · lg | `--neo-space-none``--neo-space-xl` · 0px 24px |
| `content` | padding-block | type=info · success · warning · error · brand, size=xs | `--neo-space-sm``--neo-space-lg` · 8px 16px |
| `content` | padding-block | type=info · success · warning · error · brand, size=sm | `--neo-space-sm``--neo-space-xl` · 8px 24px |
| `content` | padding-inline | size=xs | `--neo-space-lg` · 16px |
| `content` | padding-inline | size=sm · md | `--neo-space-xl` · 24px |
| `content` | padding-inline | size=lg | `--neo-space-2xl` · 32px |

<!-- prosa:layout -->

> **The arc.** Under the colored header the master subtracts a 504×70 ellipse from a 16 rectangle,
> and the net result is a bottom edge that dips in the center and rises 14 px at the edges. The two layers
> draw it with elliptical radii (`border-bottom-*-radius: 50% 14px`). `brand` does not carry it: it has no
> background to curve.

> **The ✕ is a [button-icon](button-icon.md)** —`system · tertiary · medium`—: its box, its glyph
> and its `--fill--tertiary--default` background come from there. The only thing the dialog decides is
> where it stands: absolute, top right.

`size` defines the **maximum width** (the contract with the code). The minimum is a design rule: if you need less, use the previous size. In the browser, the real width is `min(viewport − margins, max-width)`: the designer respects the minimum in Figma; the viewport always wins.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `title` | — | `Title/sm-Bold` | 18px | 700 | 26px | 2 lines |
| `description` | — | `Body/lg-Regular` | 16px | 400 | 24px | — |

<!-- prosa:typography -->

> **The title does NOT scale with `size`:** it is `title/sm-bold` in the 4 sizes. What does scale by size is the horizontal **gutter** (xs 16 · sm/md 24 · lg 32).

<!-- /prosa:typography -->

---

## HTML

<!-- prosa:html -->

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

  <!-- WHEN THE CONTENT OVERFLOWS IT HAS TO BE REACHABLE BY KEYBOARD (WCAG 2.1.1): `tabindex="0"` so it
       takes focus and the arrow keys move it, and `role="region"` named by the title. The `Neo*` component
       adds the three by itself, and only while the content actually overflows; a hand-written one does the
       same, and removes them when the content fits. -->
  <div class="modal-dialog__content" tabindex="0" role="region" aria-labelledby="dialog-title">
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

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `div[aria-labelledby]` | `<div>` | `role="dialog"` · `aria-modal="true"` |
| `button[type="button"]` | `<button>` | `type="button"` · `aria-label="Cerrar"` |
| `svg` | `<svg>` | `aria-hidden="true"` |

<!-- prosa:aria -->

- **`aria-labelledby` points to the title**, a `<h2>` whose `id` the wrapper generates.
- **`aria-describedby` points to the description, not to the slot.** That is why the description is a property of the component and not a loose paragraph inside the content: it is the stable node the screen reader anchors to.
- The scrim is `aria-hidden="true"`: it is visual, and closing by click is handled by the modal's script.
- The rest of the page stays `inert` while the dialog is open: no focus, no clicks, no scroll.

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Esc` | CLOSES the dialog — always, whether or not there is a ✕ |
| `Tab` | cycles only through the dialog's elements (focus trap) |
| `Shift + Tab` | cycles backwards, without leaving |
| `Enter · Space` | activates the focused button |

<!-- prosa:keyboard -->

When opening, focus enters the dialog (the first interactive element or the container). **When closing, focus returns to the element that opened it.**

<!-- /prosa:keyboard -->

---

## Rules

| Limit | When exceeded |
|---|---|
| **actions:** at most 2 | a dialog asks for a decision, not a menu — with more actions, another pattern (C1) |

| When | Then |
|---|---|
| `size=md\|lg` | type must be default |

<!-- prosa:rules -->

- **The title truncates to max 2 lines**, in the 14 variants. A
  title that does not fit is cut, it does not push the dialog.
- **The component arrives complete. Turn off what you do not use.** The master shows everything that exists.
- **The content is short.** If it needs scroll or several steps, use a Modal full-screen.
- **The scrim keeps the context.** The page stays visible, dimmed with `--surface--base--overlay` — the person knows where they are and where they return. A click on the scrim closes, same as `Esc`. A single scrim at a time: overlays do not stack.
- **It always carries a description or content.** At least one of the two.
- **The ✕ goes only if no action allows leaving.** If there is already a "Cancel", the ✕ duplicates it.
- **The button names the action.** "Delete account", never "OK" — the label is the last thing read before the click.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`modal-fullscreen`](modal-fullscreen.md) | the content needs scrolling or there are several steps |

---

## Accessibility

- ON OPEN, focus moves into the dialog; ON CLOSE, it returns to the element that opened it. If it gets lost, the person ends up at the top of the page without knowing why.
- Focus trap: Tab only cycles through what is inside. A modal you can Tab out of is not modal.
- The rest of the page stays `inert` while it is open: no focus, no clicks, no scroll.
- The ✕ is just an icon: it carries `aria-label="Cerrar"`, which is the only name it has.
- Icons are `aria-hidden="true"`.
- Esc ALWAYS closes, whether or not there is a ✕: it is the way out that does not depend on finding a button.
- `aria-describedby` points to the description, not to the content: that is why the description is a prop and not just any paragraph inside.
- When the content overflows, its scrolling region takes keyboard focus and is named by the title (WCAG 2.1.1).

<!-- prosa:accessibility -->

- The commitments above answer WCAG 2.1.1 (Keyboard), 2.1.2 (No keyboard trap), 2.4.3 (Focus order) and 1.3.1 (Info and relationships).
- **WCAG 1.4.3 (Contrast)** — the four semantic titles on their color band pass AA for normal text (info 11.3 · success 8.7 · error 7.8 · warning 5.7).
- **WCAG 2.5.8 (Target Size, AA)** — the ✕ is a **40×40** `button/icon` with the glyph at 20, and the action buttons measure 40 high. Both comfortably exceed the 24×24 AA minimum. *(They do not reach 2.5.5's 44×44, which is level AAA — the system aims for AA.)*
- **Not color alone** — each semantic type carries an icon besides color: the state is not conveyed by the background alone.
- The system **has no destructive button**. The risk is conveyed by `type=error`, a description that says what is lost, and an explicit label.

<!-- /prosa:accessibility -->
