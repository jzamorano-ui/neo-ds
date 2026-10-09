<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Modal Fullscreen

> **Figma (source of truth):** [❖ Modal Fullscreen](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003720-5194) — visual validation against the master.

<!-- prosa:intro -->

It takes the whole screen for dense information or a long task, and closing it (✕) returns the person to where they were. It works both for a flow with steps and for a single view without steps — a complete form, an extensive detail, a large table.

If the content is short and asks for a decision, the case is not a full-screen — it is a [Modal Dialog](modal-dialog.md).

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `device` | desktop · mobile — not a prop: the viewport width decides it (breakpoint 720px) |
| `scroll` | none · top · mid · bottom — not a prop: the DOM draws it when scrolling |
| `title` | true · false — default `true` |
| `↪ text` | text |
| `back` | true · false — default `true` |
| `slot` | instance swap |
| `cta` | true · false — default `true` |
| `↪ primary` | true · false — default `true` |
| `↪ secondary` | true · false — default `true` |

<!-- prosa:properties -->

`device` is the version per device; `scroll` is the state of the inner scroll. In code neither is a prop: the viewport solves `device`, and the DOM draws the lines when it scrolls. `back` is the ← and it comes turned off — it is turned on only inside a flow with steps. `cta` are the actions, fixed at the bottom.

**The dividing lines show where there is hidden content** (mobile): `none` = no scroll, no lines · `top` = line at the bottom · `mid` = both · `bottom` = line at the top. On web the separators are structural and the scrollbar shows the scroll state.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoModalFullscreenProps {
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (event: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void  // The close handler. Its presence draws the ✕.
  onBack?: (event: MouseEvent<HTMLButtonElement>) => void  // The back-step handler.
  title: ReactNode                    // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  actions?: ReactNode                 // The call to action. One at most (C1).
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Dialog not listed above
}
```

<!-- prosa:props -->

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

It is implemented on top of MUI's **`Dialog` with `fullScreen`**. The height is the viewport (`100dvh`); the scroll lives **only in the content** — header and cta stay fixed. `device` and `scroll` do not reach the API: the viewport decides the version (media query) and the content's own scroll handles the lines' state.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

> The buttons in the actions are the `button` component — their states live in [button.md](button.md).

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--surface--base--default` |
| `title` | default | color | `--text--base--default` |
| `separator` | default | background | `--border--base--secondary` |
| `close` · `back` | default | color | `--icon--base--default` |
| `content` | focus | outline | `--focus--ring--default` |
| `content` | focus | box-shadow | `--focus--gap--default` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `header` | height | device=desktop | 104px |
| `header` | height | device=mobile | 60px |
| `header` | padding-block | device=desktop | `--neo-space-xl` · 24px |
| `header` | padding-block | device=mobile | `--neo-space-sm` · 8px |
| `header` | padding-inline | device=desktop | `--neo-space-3xl` · 48px |
| `header` | padding-inline | device=mobile | `--neo-space-sm` · 8px |
| `header` | gap | device=desktop | `--neo-space-none` · 0px |
| `header` | gap | device=mobile | `--neo-space-sm` · 8px |
| `actions` | gap | — | `--neo-space-md` · 12px |
| `actions` | height | device=desktop | 88px |
| `actions` | height | device=mobile | 128px |
| `actions` | padding-block | device=desktop | `--neo-space-xl` · 24px |
| `actions` | padding-block | device=mobile | `--neo-space-md``--neo-space-xl` · 12px 24px |
| `actions` | padding-inline | device=desktop | `--neo-space-3xl` · 48px |
| `actions` | padding-inline | device=mobile | `--neo-space-lg` · 16px |
| `content` | padding-block | device=desktop | `--neo-space-none``--neo-space-xl` · 0px 24px |
| `content` | padding-block | device=mobile | `--neo-space-none``--neo-space-lg` · 0px 16px |
| `content` | padding-inline | device=desktop | `--neo-space-3xl` · 48px |
| `content` | padding-inline | device=mobile | `--neo-space-lg` · 16px |

<!-- prosa:layout -->

The **← is optional and comes hidden** in the master, in both widths: the ✕ is the only control that appears by default. The ✕ and ← are `button/icon`, one step larger on web than on mobile.

> All the spacings are on the DS's `space/*` scale — no constants outside the scale.

**The component covers the whole viewport**, so its height is not a measure of its own: in the browser the real height is the viewport (`100dvh`). The designer respects the range the master draws in Figma; the screen always wins.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `title` | desktop | `Title/md-Bold` | 20px | 700 | 28px |
| `title` | mobile | `Body/lg-Bold` | 16px | 700 | 24px |

<!-- prosa:typography -->

> The title changes style per device: `title/md-bold` on web, compact on mobile. It is what Figma draws — the CSS applies it with the theme's typography variants.

<!-- /prosa:typography -->

---

## HTML

<!-- prosa:html -->

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

  <!-- WHEN THE CONTENT OVERFLOWS IT HAS TO BE REACHABLE BY KEYBOARD (WCAG 2.1.1): `tabindex="0"` so it
       takes focus and the arrow keys move it, and `role="region"` named by the title. The `Neo*` component
       adds the three by itself, and only while the content actually overflows; a hand-written one does the
       same, and removes them when the content fits. -->
  <div class="modal-full__content" tabindex="0" role="region" aria-labelledby="modal-full-title">
    <!-- the slot: form, table, detail… -->
  </div>

  <footer class="modal-full__actions">
    <!-- 40 high = `btn--medium`, measured in the master (`modalFull.ctaBotonAlto`). -->
    <button type="button" class="btn btn--secondary btn--medium">Cancelar</button>
    <button type="button" class="btn btn--primary btn--medium">Enviar solicitud</button>
  </footer>
</div>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `div[aria-labelledby]` | `<div>` | `role="dialog"` · `aria-modal="true"` |
| `button[type="button"]` | `<button>` | `type="button"` · `aria-label="Volver"` |
| `svg` | `<svg>` | `aria-hidden="true"` |

<!-- prosa:aria -->

- **`aria-labelledby` points to the title**, a `<h2>` whose `id` the wrapper generates.
- The ✕ carries `aria-label="Cerrar"` and the ← `aria-label="Volver"`: each is an icon alone, and that is the only name it has. The table checks the ← because it comes first when it is drawn.
- The dividing lines are decorative CSS: the scroll state does not depend on them for assistive technology.
- The rest of the page stays `inert` while the modal is open: no focus, no clicks, no scroll.

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Esc` | closes the modal |
| `Tab` | cycles only through the modal's elements (focus trap) |
| `Shift + Tab` | cycles backwards, without leaving |
| `Enter · Space` | activates the focused button |

<!-- prosa:keyboard -->

`Esc` never goes back: going back belongs to the ←. When opening, focus enters the modal. **When closing (✕ or Esc), focus returns to the element that opened it** — that is the contract of "not losing the point of origin". When going back with ←, focus goes to the start of the previous step, inside the modal.

<!-- /prosa:keyboard -->

---

## Rules

| Limit | When exceeded |
|---|---|
| **actions:** at most 2 | the master only exposes the primary and secondary slots: a third one cannot be expressed |

| When | Then |
|---|---|
| `back=true` | onBack must be declared |

<!-- prosa:rules -->

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

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`modal-dialog`](modal-dialog.md) | the content is short and asks for a decision |

---

## Accessibility

- ON OPEN, focus moves into the dialog; ON CLOSE, it returns to the element that opened it. If it gets lost, the person ends up at the top of the page without knowing why.
- Focus trap: Tab only cycles through what is inside. A modal you can Tab out of is not modal.
- The rest of the page stays `inert` while it is open: no focus, no clicks, no scroll.
- The ✕ is just an icon: it carries `aria-label="Cerrar"`, which is the only name it has.
- Icons are `aria-hidden="true"`.
- The ← carries `aria-label="Volver"` and GOES BACK one step: it does not close. A button that says back and closes loses the work already done.
- The scroll divider lines are decorative: the scroll state is not conveyed through them to assistive technology.
- When the content overflows, its scrolling region takes keyboard focus and is named by the title (WCAG 2.1.1).

<!-- prosa:accessibility -->

- The commitments above answer WCAG 2.1.1 (Keyboard), 2.1.2 (No keyboard trap), 2.4.3 (Focus order; going back with ← lands on the previous step) and 1.3.1 (Info and relationships).
- **WCAG 2.5.8 (Target size, AA)** — ✕ and ← measure 48×48px on web and 40×40px on mobile; the cta buttons, 40px high. All above the 24×24 minimum.
- **WCAG 1.4.10 (Reflow)** — the scroll lives in the content; header and cta are not lost when zooming.
- **Not color or decoration alone** — the lines and the scrollbar are a visual reinforcement of the scroll: all the content stays reachable by keyboard and screen reader without depending on them.

<!-- /prosa:accessibility -->
