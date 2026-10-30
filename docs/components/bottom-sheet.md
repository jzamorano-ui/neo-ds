<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Bottom Sheet

> **Figma (source of truth):** [❖ Bottom Sheet](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004734-27146) — visual validation against the master.

<!-- prosa:intro -->

It rises from the bottom edge on mobile with complementary content that can wait, or a short task — selecting an option, filtering, an inline promotion — while the person can see, and return to, the page underneath. Dragging the handle down, touching the scrim, or the ✕ all close it without asking a question.

If the content demands a decision, or reports an error the person must resolve, the case is not a sheet — it is a [`modal-dialog`](modal-dialog.md). If it is a long task or dense information, it is a [Modal Full-screen](modal-fullscreen.md). On desktop, the same content moves to a lateral drawer — the sheet is mobile-only.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `image` | false · true — not a prop: it follows what is composed inside | `bottom-sheet` |
| `scroll` | none · top · mid · bottom — not a prop: the DOM draws it when scrolling | `bottom-sheet` |
| `surface` | default · inverse — not a prop: it follows what is composed inside | `_bottom-sheet/handle` |
| `cta` | true · false — default `true` | `bottom-sheet` |
| `↪ secondary` | true · false — default `true` | `bottom-sheet` |
| `↪ primary` | true · false — default `true` | `bottom-sheet` |
| `slot` | instance swap | `bottom-sheet` |
| `title` | true · false — default `true` | `_bottom-sheet/header` |
| `↪ text` | text | `_bottom-sheet/header` |

<!-- prosa:properties -->

`image` is not a prop: it is the presence of an `image` header. When a header image is given, the header shows it and drops the title — the accessible name then comes from the content, so the first thing inside the sheet must name it. `scroll` is the state of the inner scroll; in code it is not a prop, the DOM draws it when scrolling. `title` (+ `text`) is the title, one line, only when there is no header image: it is the anchor of the sheet and of the screen reader. `handle` is the drag handle: dragging it down closes the sheet — it is not decoration. `slot` is the swappable content: a list, a form, a short detail. `cta` (+ `primary`, `secondary`) are the actions, fixed at the bottom.

**The dividing lines show where there is hidden content**, the same convention as [Modal Full-screen](modal-fullscreen.md): `none` = no scroll, no lines · `top` = line at the bottom · `mid` = both · `bottom` = line at the top.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoBottomSheetProps {
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (...args: unknown[]) => void  // The close handler. Its presence draws the ✕.
  title?: ReactNode                   // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  image?: ReactNode                   // The picture at the top, full bleed. It is a node you provide —an `<img>` or a `<picture>`—, so you control its sources and its alt.
  actions?: ReactNode                 // The call to action. One at most (C1).
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's SwipeableDrawer not listed above
  // required: a name: `title`, `aria-label`, `aria-labelledby` —one of them
}
```

<!-- prosa:props -->

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning.

It is implemented on top of MUI's **`SwipeableDrawer` with `anchor="bottom"`**. Measured on the installed package (5.18): `Drawer` does not set `role="dialog"`, `aria-modal`, or `aria-labelledby` on its own — the wrapper adds the three, which is the reason it exists (ADR 0011). The height is **at most 90% of the visible viewport** (`90dvh`, minus the height a mobile browser's own chrome takes); the scroll lives only in the content — header and cta stay fixed. `scroll` does not reach the API: the content's own scroll handles the lines' state.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

> The actions are the `button` component and the ✕ is `button/icon`: their fills and their full states live in [button.md](button.md), not here — this table is what the sheet itself paints. The ✕ is `variant=tertiary, surface=default` without an image and `variant=primary, surface=inverse` over one —a white circle with the same dark glyph—, which is the rule any control over a photo follows. The top corners are a measure, not a color: they are in the Layout table (`--neo-radius-xl`).

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--surface--base--default` |
| `scrim` | default | background | `--surface--base--overlay` |
| `handle` | default | background | `--fill--base--medium` |
| `handle` | image=false | background | `--fill--base--medium` |
| `handle` | image=true | background | `--fill--base--default` |
| `title` | default | color | `--text--base--default` |
| `close` | default | color | `--icon--base--default` |
| `separator-header` · `separator-actions` | default | background | `--border--base--secondary` |
| `content` | focus | outline | `--focus--ring--default` |
| `content` | focus | box-shadow | `--focus--gap--default` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | max-height | — | 616px |
| `root` | gap | — | `--neo-space-none` · 0px |
| `root` | padding-block | — | `--neo-space-none` · 0px |
| `root` | padding-inline | — | `--neo-space-none` · 0px |
| `root` | border-radius | — | `--neo-radius-xl` · 24px |
| `handle` | width | — | 40px |
| `handle` | height | — | 4px |
| `handle` | border-radius | — | `--neo-radius-pill` · 999px |
| `header` | height | — | 64px |
| `header` | padding-block | — | `--neo-space-none``--neo-space-xs` · 0px 4px |
| `header` | padding-inline | — | `--neo-space-lg` · 16px |
| `header` | gap | — | `--neo-space-none` · 0px |
| `title-row` | height | — | 40px |
| `title-row` | gap | — | `--neo-space-none` · 0px |
| `image` | height | — | 160px |
| `content` | min-height | — | 200px |
| `content` | padding-block | — | `--neo-space-none``--neo-space-lg` · 0px 16px |
| `content` | padding-inline | — | `--neo-space-lg` · 16px |
| `content` | max-height | image=false | 487px |
| `content` | max-height | image=true | 395px |
| `actions` | height | — | 136px |
| `actions` | gap | — | `--neo-space-sm` · 8px |
| `actions` | padding-block | — | `--neo-space-lg``--neo-space-2xl` · 16px 32px |
| `actions` | padding-inline | — | `--neo-space-lg` · 16px |

<!-- prosa:layout -->

> The 616 max height above is how the master reads it — 90% of its reference frame (812 minus the two mobile-browser bars); in the browser the cap is `90dvh`, so the number is a reading and not a constant of the code.

> All the spacings are on the DS's `space/*` scale — no constants outside the scale. **The sheet always measures 375 of reference width in the master** — it fills the screen, and the eight variants share one height: the `scroll` ones sit at the maximum and the content fills what is left; `scroll=none` hugs its content up to that same maximum.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `title` | — | `Body/lg-Bold` | 16px | 700 | 24px | 1 line |

<!-- prosa:typography -->

> The title is always **1 line**: the master cuts the `sheet-title` layer with an ellipsis (`maxLines: 1`) in its eight variants, so the header measures the same whatever the title says. Rewrite it shorter rather than letting it cut: the title names what is being chosen.

<!-- /prosa:typography -->

---

## HTML

<!-- prosa:html -->

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
      <button type="button" class="btn btn--tertiary btn--medium btn--icon-only bottom-sheet__close" aria-label="Cerrar">
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
    <button type="button" class="btn btn--primary btn--inverse btn--medium btn--icon-only bottom-sheet__close" aria-label="Cerrar">…</button>
  </div>
  <div class="bottom-sheet__content" data-scroll="none">
    <h2 id="sheet-content-title">Programa Mamá Esencial</h2>
    <!-- … -->
  </div>
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

- **`aria-labelledby` points to the title**, a `<h2>` whose `id` the wrapper generates — or, when there is an image, the first heading of the content.
- The handle is decorative (`aria-hidden="true"`): dragging it is a pointer gesture, and the ✕ is its keyboard equivalent.
- The dividing lines are decorative CSS: the scroll state does not depend on them for assistive technology.
- The rest of the page stays `inert` while the sheet is open: no focus, no clicks, no scroll.

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Esc` | closes the sheet |
| `Tab` | cycles only through the sheet's elements (focus trap) |
| `Shift + Tab` | cycles backwards, without leaving |
| `Enter · Space` | activates the focused button |

<!-- prosa:keyboard -->

When opening, focus enters the sheet. When closing (✕, `Esc`, scrim, or a completed swipe), focus returns to the element that opened it.

<!-- /prosa:keyboard -->

---

## Rules

| Limit | When exceeded |
|---|---|
| **actions:** at most 2 | the master only exposes the primary and secondary slots: a third one cannot be expressed |

| When | Then |
|---|---|
| always | either `title` or `image` names the sheet — never neither |
| always | onClose must be declared: the sheet always offers a way out |

<!-- prosa:rules -->

- **The component arrives complete. Turn off what you do not use.** The master shows everything that exists.
- **Either `title` or `image` names the sheet — never neither.** With an image, the header carries no title slot, so the accessible name has to come from the content: the first heading inside `children` takes over `aria-labelledby`.
- **The title is always one line.** The header measures the same whether it is short or long.
- **Header and actions stay fixed; only the content scrolls.** The actions never get lost below the fold.
- **The height grows with the content up to 90% of the visible viewport.** Past that, the content scrolls and the dividing lines appear.
- **Dragging the handle down closes the sheet — it is not decoration.** Turning off `onClose` also turns off the ✕ and the swipe gesture: the master shows a sheet with no way out only when it is not meant to close on its own.
- **It is for content that can wait.** A decision or an error the person must resolve is a [Modal Dialog](modal-dialog.md) — it is not dismissed by tapping the background.
- **It is mobile-only.** On desktop, the same content moves to a lateral drawer; the sheet does not adapt by breakpoint the way `modal-fullscreen` does.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`modal-dialog`](modal-dialog.md) | the content demands a decision, or reports an error the person has to resolve |
| [`modal-fullscreen`](modal-fullscreen.md) | it is a long task or dense information that needs the whole screen |

---

## Accessibility

- ON OPEN, focus moves into the sheet; ON CLOSE —✕, Esc, scrim, or a completed swipe— it returns to the element that opened it.
- Focus trap: Tab only cycles through what is inside. A sheet you can Tab out of is not modal.
- The rest of the page stays `inert` while it is open: no focus, no clicks, no scroll.
- `role="dialog"`, `aria-modal="true"` and `aria-labelledby` are added by the wrapper: MUI's `Drawer` does not set any of the three (measured on @mui/material 5.18).
- Either `title` or the content's heading names the sheet. With an image there is no title slot, so the name comes from the content.
- The ✕ is just an icon: it carries `aria-label="Cerrar"`, which is the only name it has.
- The handle is `aria-hidden`: dragging it is a pointer gesture, and its keyboard equivalent is the ✕.
- Icons are `aria-hidden="true"`.
- The scroll divider lines are decorative: the scroll state is not conveyed through them to assistive technology.
- When the content overflows, its scrolling region takes keyboard focus and is named by the title (WCAG 2.1.1).

<!-- prosa:accessibility -->

- The commitments above answer WCAG 2.1.1 (Keyboard; the drag gesture is the one way to close with a substitute, the ✕, not a requirement), 2.1.2 (No keyboard trap), 2.4.3 (Focus order) and 1.3.1 (Info and relationships; `aria-labelledby` points at the title or, with an image, at the content's own heading).
- **WCAG 2.5.8 (Target size, AA)** — the ✕ measures 40×40px; the cta buttons, 40px high. Both above the 24×24 minimum.
- **WCAG 1.4.10 (Reflow)** — the scroll lives in the content; header and cta are not lost when zooming.
- **Not color or decoration alone** — the dividing lines are a visual reinforcement of the scroll state: all the content stays reachable by keyboard and screen reader without depending on them.

<!-- /prosa:accessibility -->
