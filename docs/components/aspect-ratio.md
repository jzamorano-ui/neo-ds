<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Aspect Ratio

> **Figma (source of truth):** [❖ Aspect Ratio](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003644-9939) — visual validation against the master.

<!-- prosa:intro -->

A container that fixes the content's proportion (width: height) and keeps it when the size changes. The width adapts to the available space and the height follows the proportion. It reserves the space before the image loads, so the page does not jump. It is not interactive.

It has two knobs, and they are independent: **`ratio` says how much space it takes** · **the slot says what is shown there** (photo, illustration or video). Changing the `ratio` does not lose the content, and changing the content does not alter the proportion.

## When to use it

Ask yourself one single question: **who decides the height?**

| Who decides | What you use |
|---|---|
| **The content** — the height is free and the proportion defines it | **`aspect-ratio`**, with the content in the slot. It is the case of a card's media. |
| **The container** — the height is already fixed from outside | **Do not use it.** The content does `cover` and gets cropped. It is the case of a banner, where the height is fixed by the banner's size. |

And there is a case that decides by itself: **if the slot carries video, `aspect-ratio` is mandatory.** A video brings its proportion set and cannot be cropped. A photo can.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `ratio` | 1/1 · 16/9 · 4/3 · 3/4 · 21/9 — default `16/9` — in Figma: 16:9 · 1:1 · 21:9 · 3:4 · 4:3 |
| `↪ media` | instance swap |

<!-- prosa:properties -->

`16/9` is the default: standard, video and featured image (aligned with MUI Joy `AspectRatio`). `1/1` is square, for grids and thumbnails. `4/3` is horizontal, for content photos. `3/4` is portrait, for vertical images. `21/9` is panoramic, for wide strips.

Figma writes the same five values with a colon —`1:1` · `16:9` · `4:3` · `3:4` · `21:9`—; the code writes them with a slash, which is the notation of CSS's `aspect-ratio`.

In Figma the content enters through the system's `_slot`, the same one `modal-dialog` uses. It brings three pieces ready to swap: `_media/photo`, `_media/illustration` and `_media/video`. The slot accepts any content, the three DS pieces or your own; there is nothing to wrap.

**When using it in Figma, set it to `Fill` width.** The height is recalculated from the ratio on its own, but only if the width is `Fill`. With `Fixed` the height stays frozen and the proportion does not respond.

<!-- /prosa:properties -->

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
  // …and the DOM attributes not listed above
}
```

---

## HTML

```html
<div class="aspect-ratio aspect-ratio--1-1"></div>
<div class="aspect-ratio aspect-ratio--16-9"></div>
<div class="aspect-ratio aspect-ratio--4-3"></div>
<div class="aspect-ratio aspect-ratio--3-4"></div>
<div class="aspect-ratio aspect-ratio--21-9"></div>
```

<!-- prosa:html -->

```html
<!-- The proportion is set by the CLASS, not an inline `style`: `.aspect-ratio` alone is already 16:9, and
     each of the other four has its own. The cropping, the size and the centering of the content
     are also set by the CSS — there is no need to repeat them in the markup. -->
<div class="aspect-ratio">
  <img src="…" alt="Image description">
</div>
```

```html
<!-- Alternative framing: the image enters complete and free space is left at the sides.
     Use it only when cropping loses essential information. -->
<div class="aspect-ratio aspect-ratio--4-3 aspect-ratio--contain">
  <img src="…" alt="…">
</div>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<div>` | never `role` |

---

## Keyboard

This component is not interactive — it does not receive focus.

---

## Rules

| Limit | When exceeded |
|---|---|
| **ratios:** the five of the axis: 1/1, 16/9, 4/3, 3/4 and 21/9 | the master offers no other, and a ratio outside the set breaks consistency between screens and between products. When the space changes, switch to another of the five. |

<!-- prosa:rules -->

- The width is fluid; the height ALWAYS derives from the `ratio`. Do not set a manual height.
- The image fills the space without distorting; center the subject so it is not cut off.
- A panoramic ratio (21/9) gets squashed on narrow screens: there a taller one (4/3 or 3/4) works better than forcing the same.
- Always wrap the image, even while it loads: that is what reserves the space and keeps the page from jumping.

<!-- /prosa:rules -->

---

## Accessibility

- The container carries NO role: it is a box that reserves space, not an element with meaning.
- The image inside needs a descriptive `alt`, or `alt=""` if it is decorative. The container cannot describe it on its behalf.
- A video needs captions or an `aria-label`.
- It takes no focus: it is not interactive.

<!-- prosa:accessibility -->

- The crop (`cover`) must not hide essential information, such as key faces or embedded text.
- **WCAG 1.4.3**: text overlaid on the image must keep AA contrast; use an overlay if the background does not guarantee it.

<!-- /prosa:accessibility -->
