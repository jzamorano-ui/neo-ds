# Aspect Ratio

> **Figma (source of truth):** [❖ Aspect Ratio](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003644-9939) — visual validation against the master.

A container that fixes the content's proportion (width: height) and keeps it when the size changes. The width adapts to the available space and the height follows the proportion. It reserves the space before the image loads, so the page does not jump. It is not interactive.

It has two knobs, and they are independent: **`ratio` says how much space it takes** · **the slot says what is shown there** (photo, illustration or video).

## When to use it

Ask yourself one single question: **who decides the height?**

| Who decides | What you use |
|---|---|
| **The content** — the height is free and the proportion defines it | **`aspect-ratio`**, with the content in the slot. It is the case of a card's media. |
| **The container** — the height is already fixed from outside | **Do not use it.** The content does `cover` and gets cropped. It is the case of a banner, where the height is fixed by the banner's size. |

And there is a case that decides by itself: **if the slot carries video, `aspect-ratio` is mandatory.** A video brings its proportion set and cannot be cropped. A photo can.

---

## Properties

| Property | Values |
|---|---|
| `ratio` | **16:9** (default) · 1:1 · 4:3 · 3:4 · 21:9 |
| `↪ media` | The content: photo, illustration or video. In code it is `children`. |

| Ratio | Use |
|---|---|
| `16:9` | **Default** — standard, video and featured image (aligned with MUI Joy `AspectRatio`) |
| `1:1` | Cuadrado — grillas, miniaturas, avatares |
| `4:3` | Horizontal — content photos |
| `3:4` | Portrait — vertical image |
| `21:9` | Panoramic — wide strips |

In Figma the content enters through the system's `_slot` — the same one `modal-dialog` uses. It brings three pieces ready to swap: **`_media/photo` · `_media/illustration` · `_media/video`**.

The two knobs are independent: changing the `ratio` does not lose the content, and changing the content does not alter the proportion.

### When using it in Figma

**Set it to `Fill` width.** The height is recalculated from the ratio on its own, but **only if the width is `Fill`**. With `Fixed` the height stays frozen and the proportion does not respond.

The slot accepts **any content** — the three DS pieces or your own, just like a modal's slot. There is nothing to wrap.

---

## Props

```typescript
interface NeoAspectRatioProps {
  ratio?: '1/1' | '16/9' | '4/3' | '3/4' | '21/9'  // how much space it takes. The width adapts to what is available and the height comes from here. Default: '16/9'.
  contain?: boolean                   // The image fits whole instead of being cropped. Only when cropping loses information.
  src?: string                        // The image: a URL or a data URI. It realizes the image slot of the master; it goes in with `object-fit: cover`.
  alt?: string                        // The alternative text of the image. Empty when it is decorative and the message is already in the text (banner); descriptive when the image IS the content (aspect-ratio).
  className?: string                  // Extra classes on the root. They add to the system ones; they do not replace them.
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to the root node
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

---

## Tokens

### Layout

| Property | Value | Note |
|---|---|---|
| `aspect-ratio` | 1/1 · 16/9 · 4/3 · 3/4 · 21/9 | layout constant — not tokenized |
| `width` | fluido (100%) | adapts to the container |
| `object-fit` | `cover` | the image fills without distorting |

The slot placeholder uses `--surface--base--default` as its background.

It carries no color or typography tokens — it is a container. The style comes from the content (image) or from the component that consumes it (card, hero).

---

## HTML

```html
<!-- The proportion is set by the CLASS, not an inline `style`: `.aspect-ratio` alone is already 16:9, and
     each of the other four has its own. The cropping, the size and the centering of the content
     are also set by the CSS — there is no need to repeat them in the markup. -->
<div class="aspect-ratio">
  <img src="…" alt="Descripción de la imagen">
</div>
```

```html
<!-- The five proportions. Outside these there are no others (see Rules). -->
<div class="aspect-ratio aspect-ratio--16-9"><img src="…" alt="…"></div>
<div class="aspect-ratio aspect-ratio--1-1"><img src="…" alt="…"></div>
<div class="aspect-ratio aspect-ratio--4-3"><img src="…" alt="…"></div>
<div class="aspect-ratio aspect-ratio--3-4"><img src="…" alt="…"></div>
<div class="aspect-ratio aspect-ratio--21-9"><img src="…" alt="…"></div>
```

```html
<!-- Alternative framing: the image enters complete and free space is left at the sides.
     Use it only when cropping loses essential information. -->
<div class="aspect-ratio aspect-ratio--4-3 aspect-ratio--contain">
  <img src="…" alt="…">
</div>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Container | `<div>` | presentational — no `role` |
| Image | `<img>` | `alt="[description]"` · `alt=""` if decorative |
| Video | `<video>` | captions / `aria-label` |

---

## Keyboard

This component is not interactive — it does not receive focus.

---

## Rules

- The width is fluid; the height ALWAYS derives from the `ratio`. Do not set a manual height.
- Only the 5 ratios: 1:1, 16:9, 4:3, 3:4, 21:9. Do not use other values. They are the ones of the contract's `ratio`
  axis, compared against the master.
- The image fills the space without distorting; center the subject so it is not cut off.
- A panoramic ratio (21:9) gets squashed on narrow screens: there a taller one (4:3 or 3:4) works better than forcing the same.
- Always wrap the image, even while it loads — that is what reserves the space and keeps the page from jumping.

---

## Accessibility

- Every image with informative content carries a descriptive `alt`; a decorative one carries `alt=""`.
- The crop (`cover`) must not hide essential information — key faces, embedded text.
- **WCAG 1.4.3** — text overlaid on the image must keep AA contrast; use an overlay if the background does not guarantee it.
