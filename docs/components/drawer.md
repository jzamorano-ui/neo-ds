<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Drawer

> **Figma (source of truth):** [❖ Drawer](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004734-27249) — visual validation against the master.

<!-- prosa:intro -->

It enters from the right edge on the web with complementary or extensive content that the person opens on demand — the detail of a quote, more information about a product, a summary or a cart — while the page underneath stays in view. It can be purely informative, with no actions. The ✕, `Esc`, or touching the scrim close it without asking a question.

If the content demands a decision, or reports an error the person must resolve, the case is not a drawer — it is a [Modal Dialog](modal-dialog.md). If it is a long task with steps, it is a [Modal Full-screen](modal-fullscreen.md). On mobile, the same content goes in a [Bottom Sheet](bottom-sheet.md) — the drawer is web-only.

<!-- /prosa:intro -->

---

## Properties

| Property | Values | Master |
|---|---|---|
| `scroll` | none · top · mid · bottom — not a prop: the DOM draws it when scrolling | `drawer` |
| `cta` | true · false — default `true` | `drawer` |
| `↪ primary` | true · false — default `true` | `drawer` |
| `↪ secondary` | true · false — default `true` | `drawer` |
| `image` | true · false — default `true` | `drawer` |
| `slot` | instance swap | `drawer` |
| `text` | text | `_drawer/header` |

<!-- prosa:properties -->

`scroll` is the state of the inner scroll; in code it is not a prop, the DOM draws it when scrolling. `image` is an image on top of the content, edge to edge: it scrolls with the content and does not replace the header — the title stays. The `title` (`text`) is one line and always there: it names the drawer for a screen reader. `slot` is the swappable content: a detail, a summary, a list. `cta` (+ `primary`, `secondary`) are the actions, fixed at the bottom; optional.

**The dividing lines show where there is hidden content**, the same convention as [Modal Full-screen](modal-fullscreen.md) and [Bottom Sheet](bottom-sheet.md): `none` = no scroll, no lines · `top` = line at the bottom · `mid` = both · `bottom` = line at the top.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoDrawerProps {
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (...args: unknown[]) => void  // The close handler. Its presence draws the ✕.
  title: ReactNode                    // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  image?: ReactNode                   // The picture at the top, full bleed. It is a node you provide —an `<img>` or a `<picture>`—, so you control its sources and its alt.
  actions?: ReactNode                 // The call to action. One at most (C1).
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Drawer not listed above
}
```

<!-- prosa:props -->

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning.

It is implemented on top of MUI's **`Drawer` with `anchor="right"`**, sharing its base with [Bottom Sheet](bottom-sheet.md). Measured on the installed package (5.18): `Drawer` does not set `role="dialog"`, `aria-modal`, or `aria-labelledby` on its own — the wrapper adds the three, which is the reason it exists (ADR 0011). It is as wide as the Layout table says and **the whole visible height** (`100dvh`); the scroll lives only in the content — header and actions stay fixed.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

> The actions are the `button` component and the ✕ is `button/icon`: their fills and their full states live in [button.md](button.md), not here — this table is what the drawer itself paints.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` · `actions` | default | background | `--surface--base--default` |
| `scrim` | default | background | `--surface--base--overlay` |
| `title` | default | color | `--text--base--default` |
| `close` | default | color | `--icon--base--default` |
| `separator-header` · `separator-actions` | default | background | `--border--base--secondary` |
| `content` | focus | outline | `--focus--ring--default` |
| `content` | focus | box-shadow | `--focus--gap--default` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | width | — | 540px |
| `root` | gap | — | `--neo-space-none` · 0px |
| `root` | padding-block | — | `--neo-space-none` · 0px |
| `root` | padding-inline | — | `--neo-space-none` · 0px |
| `header` | height | — | 80px |
| `header` | padding-block | — | `--neo-space-lg` · 16px |
| `header` | padding-inline | — | `--neo-space-xl` · 24px |
| `header` | gap | — | `--neo-space-md` · 12px |
| `title-row` | height | — | 48px |
| `title-row` | gap | — | `--neo-space-none` · 0px |
| `image` | height | — | 224px |
| `content` | padding-block | — | `--neo-space-none``--neo-space-lg` · 0px 16px |
| `content` | padding-inline | — | `--neo-space-xl` · 24px |
| `actions` | height | — | 140px |
| `actions` | gap | — | `--neo-space-md` · 12px |
| `actions` | padding-block | — | `--neo-space-lg``--neo-space-2xl` · 16px 32px |
| `actions` | padding-inline | — | `--neo-space-xl` · 24px |

<!-- prosa:layout -->

> All the spacings are on the DS's `space/*` scale — no constants outside the scale. The four variants share one height: the panel always fills the visible viewport (`100dvh`), and the content takes what is left between the header and the actions. It has no corners: the panel rests on the right edge.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `title` | — | `Title/sm-Bold` | 18px | 700 | 26px | 1 line |

<!-- prosa:typography -->

> The title is always **1 line**: the master cuts the `title` layer with an ellipsis (`maxLines: 1`) in its four variants, so the header measures the same whatever the title says.

<!-- /prosa:typography -->

---

## HTML

<!-- prosa:html -->

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
      <button type="button" class="btn btn--tertiary btn--large btn--icon-only drawer__close" aria-label="Cerrar">
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
- The image carries `alt=""` when it is decorative: the title names the drawer.
- The dividing lines are decorative CSS: the scroll state does not depend on them for assistive technology.
- The rest of the page stays `inert` while the drawer is open: no focus, no clicks, no scroll.

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Esc` | closes the drawer |
| `Tab` | cycles only through the drawer's elements (focus trap) |
| `Shift + Tab` | cycles backwards, without leaving |
| `Enter · Space` | activates the focused button |

<!-- prosa:keyboard -->

When opening, focus enters the drawer. When closing (✕, `Esc` or the scrim), focus returns to the element that opened it.

<!-- /prosa:keyboard -->

---

## Rules

| Limit | When exceeded |
|---|---|
| **actions:** at most 2 | the master only exposes the primary and secondary slots: a third one cannot be expressed — change the secondary's variant instead |

| When | Then |
|---|---|
| always | `title` names the drawer: it is always there |
| always | onClose must be declared: the drawer always offers a way out |

<!-- prosa:rules -->

- **The component arrives complete. Turn off what you do not use.** The master shows everything that exists.
- **The title is always there, and always one line.** It names the drawer — with an image too — and the header measures the same whether it is short or long.
- **Actions are optional.** A drawer can be purely informative.
- **Header and actions stay fixed; only the content scrolls.** The actions never get lost below the fold.
- **It is for complementary content.** A decision or an error the person must resolve is a [`modal-dialog`](modal-dialog.md) — it is not dismissed by touching the background —, and a long task with steps is a [`modal-fullscreen`](modal-fullscreen.md).
- **It is web-only.** On mobile, the same content goes in a [`bottom-sheet`](bottom-sheet.md).

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`modal-dialog`](modal-dialog.md) | the content demands a decision, or reports an error the person has to resolve |
| [`modal-fullscreen`](modal-fullscreen.md) | it is a long task with steps that needs the whole screen |
| [`bottom-sheet`](bottom-sheet.md) | the same complementary content on mobile |

---

## Accessibility

- ON OPEN, focus moves into the drawer; ON CLOSE —✕, Esc or the scrim— it returns to the element that opened it.
- Focus trap: Tab only cycles through what is inside. A drawer you can Tab out of is not modal.
- The rest of the page stays `inert` while it is open: no focus, no clicks, no scroll.
- `role="dialog"`, `aria-modal="true"` and `aria-labelledby` are added by the wrapper: MUI's `Drawer` does not set any of the three (measured on @mui/material 5.18).
- The title always names the drawer, with or without an image.
- The ✕ is just an icon: it carries `aria-label="Cerrar"`, which is the only name it has.
- The image is decorative unless the consumer says otherwise: the title is what names the drawer.
- Icons are `aria-hidden="true"`.
- The scroll divider lines are decorative: the scroll state is not conveyed through them to assistive technology.
- When the content overflows, its scrolling region takes keyboard focus and is named by the title (WCAG 2.1.1).

<!-- prosa:accessibility -->

- The commitments above answer WCAG 2.1.1 (Keyboard; every way to close has a keyboard-reachable equivalent), 2.1.2 (No keyboard trap), 2.4.3 (Focus order) and 1.3.1 (Info and relationships; `aria-labelledby` points at the title).
- **WCAG 2.5.8 (Target size, AA)** — the ✕ is large and the action buttons are 40px high, both above the 24×24 minimum.
- **WCAG 1.4.10 (Reflow)** — the scroll lives in the content; header and actions are not lost when zooming.
- **Not color or decoration alone** — the dividing lines are a visual reinforcement of the scroll state.

<!-- /prosa:accessibility -->
