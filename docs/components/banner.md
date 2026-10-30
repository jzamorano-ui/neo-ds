<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Banner

> **Figma (source of truth):** [❖ Banner](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003685-37499) — visual validation against the master.

<!-- prosa:intro -->

Highlights a message inside the page — a campaign, a benefit, a notice — with or without an action. It is the system's promotional surface: it draws attention without interrupting navigation.

It is not for system feedback: confirmations and errors belong to **Alert**. The banner promotes, it does not notify.

## When to use it

| Case | Variant |
|---|---|
| Leading campaign or benefit, high hierarchy | `large` — with `full-photo` if the photo carries the message |
| Secondary notice or promotion, medium hierarchy | `medium` |
| Reminder or one-off access, low hierarchy | `small` — compact strip, no title |

Several banners can coexist in one view, but never back to back — separate them with content or they compete with each other.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `size` | small · medium · large — default `large` |
| `full-photo` | false · true — default `false` — in code: `fullPhoto` |
| `device` | mobile · desktop — not a prop: the available width decides it (breakpoint 720px) |
| `title` | text |
| `button` | true · false — default `true` |
| `subtitle` | true · false — default `true` |
| `↪ text` | text |
| `description` | true · false — default `true` |
| `↪ body` | text |
| `image` | instance swap |
| `image-left` | true · false — default `false` |
| `image-right` | true · false — default `true` |
| `icon` | true · false — default `true` |

<!-- prosa:properties -->

`device` is chosen by the **available width**, not the device. `size` defines the height, on MUI's long scale. With `full-photo` the image becomes the background, with an overlay. In `small`, `image-left` · `image-right` choose which side the image goes on.

**Combinations:** `small` carries no title, subtitle or icon — only description, CTA and image. The brand icon only exists in `large`.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoBannerProps {
  size?: 'small' | 'medium' | 'large'  // sets the height. The width is set by the container (C10). Default: 'large'.
  fullPhoto?: boolean                 // the image becomes the background, with an overlay Default: 'false'.
  title?: ReactNode                   // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  subtitle?: ReactNode                // The secondary text, under the title.
  description: ReactNode              // The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node.
  icon?: ReactNode                    // The icon node. Use the system icons (icons/), not loose SVGs.
  media?: ReactNode                   // A node of your own for the banner image (video, picture). The main path is `src`; if both are given, `src` wins.
  src?: string                        // The image: a URL or a data URI. It realizes the image slot of the master; it goes in with `object-fit: cover`.
  alt?: string                        // The alternative text of the image. Empty when it is decorative and the message is already in the text (banner); descriptive when the image IS the content (aspect-ratio).
  mediaPosition?: 'right' | 'left'    // Which side the image goes on. It only applies with `size="small"`: in the other sizes it does not go to the side.
  actions?: ReactNode                 // The call to action. One at most (C1).
  'aria-label'?: string               // The accessible name when there is no visible text that provides it.
  className?: string                  // Extra classes on the root. They add to the system ones; they do not replace them.
  // …and the DOM attributes not listed above
  // required: a name: `title`, `aria-label`, `aria-labelledby` —one of them
}
```

<!-- prosa:props -->

> **`.banner-shell` is not decoration: it is what makes the SPACE choose the version.** The
> sheet queries `@container banner`, and a container query resolves against an
> ancestor — a container does not query itself. The component brings its own, so in React there is
> nothing to do: `NeoBanner` draws it.
>
> **If it is omitted in the plain layer**, no query matches and the banner stays at its base, which is the
> **narrow** version. That is deliberate: with the wide one as base, a banner without its wrapper would be drawn
> wide inside a narrow column, which is the defect this sheet came to fix. Looking mobile
> where there was room for more is visible; looking wide where it does not fit is not.

**The width chooses the variant, not the device, and there is no prop to request it.** The sheet breaks on its own at **720px**: below that it draws the narrow version, from there on the wide one. The two masters overlap between 720 and 735, so the break falls within what the design draws, and it is the same point where `modal-fullscreen` breaks.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

The overlay on `full-photo` is a black gradient from 70% to 0 — a design constant, **not tokenized** (gradients are not tokenized). The CTA is a `system primary` button that inherits its own tokens; over a photo it goes in `surface=inverse`.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--fill--base--default` |
| `title` · `subtitle` · `description` | full-photo=false | color | `--text--base--default` |
| `title` · `subtitle` · `description` | full-photo=true | color | `--text--base--contrast` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | border-radius | — | `--neo-radius-lg` · 16px |
| `root` | height | device=desktop, size=small | 90px |
| `root` | height | device=desktop, size=medium | 230px |
| `root` | height | device=desktop, size=large | 374px |
| `root` | height | device=mobile, size=small | 148px |
| `root` | height | device=mobile, size=medium | 340px |
| `root` | height | device=mobile, size=large | 504px |
| `image` | border-radius | — | `--neo-radius-none` · 0px |
| `image` | width × height | device=desktop, size=small | 280×90px |
| `image` | width × height | device=mobile, size=small | 108×148px |
| `image` | height | size=medium | 127px |
| `image` | height | size=large | 223px |
| `icon` | width | — | 48px |
| `icon` | height | — | 48px |
| `action` | gap | — | `--neo-space-md` · 12px |
| `data` | gap | — | `--neo-space-sm` · 8px |
| `data` | padding-block | size=small, full-photo=undefined | `--neo-space-lg` · 16px |
| `data` | padding-block | size=medium · large, full-photo=undefined · true | `--neo-space-2xl` · 32px |
| `data` | padding-block | size=medium · large, full-photo=false | `--neo-space-2xl``--neo-space-lg` · 32px 16px |
| `data` | padding-inline | device=desktop | `--neo-space-2xl` · 32px |
| `data` | padding-inline | device=mobile | `--neo-space-md` · 12px |
| `data` | padding-inline | device=mobile | `--neo-space-xl` · 24px |
| `data` | gap | device=desktop, size=small | `--neo-space-xl` · 24px |
| `data` | min-height | size=medium, full-photo=false | 217px |
| `data` | min-height | size=large, full-photo=false | 281px |

<!-- prosa:layout -->

The width is governed by each context's container, not the component; the height is dictated by `size`. In marketing the width is bounded by the grid's container (1180 / 1320). In product (layout with a sidebar) the banner fills the content area.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `title` | device=mobile,size=large | `Title/md-Bold` | 20px | Bold | 28px | 2 lines |
| `title` | device=mobile,size=medium | `Title/md-Bold` | 20px | Bold | 28px | 2 lines |
| `title` | device=desktop,size=medium | `Title/md-Bold` | 20px | Bold | 28px | 2 lines |
| `title` | device=desktop,size=large | `Title/lg-Bold` | 24px | Bold | 32px | 2 lines |
| `subtitle` | device=mobile,size=large | `Title/sm-Bold` | 18px | Bold | 26px | 1 line |
| `subtitle` | device=mobile,size=medium | `Title/sm-Bold` | 18px | Bold | 26px | 1 line |
| `subtitle` | device=desktop,size=medium | `Title/sm-Bold` | 18px | Bold | 26px | 1 line |
| `subtitle` | device=desktop,size=large | `Title/md-Bold` | 20px | Bold | 28px | 1 line |
| `description` | mobile | `Body/md-Regular` | 14px | Regular | 20px | 3 lines |
| `description` | desktop | `Body/lg-Regular` | 16px | Regular | 24px | 3 lines |

<!-- prosa:typography -->

The banner does not grow with the text: it truncates it. Summarize the message.

The table gives the description of `large` and `medium`. In `size=small` it is capped otherwise: **2 lines** on desktop, and on mobile it fills what the card leaves —the card has a **fixed height of 148 px**, which leaves the description 76 px— instead of a number of lines.

<!-- /prosa:typography -->

---

## HTML

<!-- prosa:html -->

```html
<div class="banner-shell">
  <section class="banner banner--large" aria-labelledby="banner-title">
    <div class="banner__content">
      <svg class="banner__icon" aria-hidden="true">…</svg>
      <h2 id="banner-title" class="banner__title">Vive tranquilo con la mejor cobertura</h2>
      <p class="banner__subtitle">Contrata el plan Esencial en línea</p>
      <p class="banner__description">Atención preferente y coberturas ampliadas.</p>
      <div class="banner__actions">
        <!-- The CTA's size follows the banner's: large → 48 (`btn--large`), medium → 40, small → 32. -->
        <button type="button" class="btn btn--primary btn--large">Conocer más</button>
      </div>
    </div>
    <div class="banner__media">
      <!-- the image is background: it fills the box and is cropped -->
      <img src="…" alt="" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
  </section>
</div>
```

```html
<div class="banner-shell">
  <!-- full photo: the image is the background, the overlay goes on top and the text over the dark zone.
       The CTA goes in `surface=inverse` (.btn--inverse): over a photo, the light button loses its outline. -->
  <section class="banner banner--large banner--full-photo" aria-labelledby="promo-title">
    <div class="banner__media">
      <img src="…" alt="" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="banner__content">
      <h2 id="promo-title" class="banner__title">Cobertura completa desde hoy</h2>
      <p class="banner__description">Contrata en línea en cinco minutos.</p>
      <div class="banner__actions">
        <button type="button" class="btn btn--primary btn--inverse btn--large">Cotizar</button>
      </div>
    </div>
  </section>
</div>
```

In `full photo` the image takes the whole banner, the overlay goes on top and the content on top of the overlay — the text always over the dark zone.

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<section>` | never `role="banner"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the CTA, if there is one. The banner itself takes no focus. |

<!-- prosa:keyboard -->

The banner itself is not interactive — only the CTA receives focus. Do not make the whole surface clickable.

<!-- /prosa:keyboard -->

---

## Rules

| Limit | When exceeded |
|---|---|
| **actions:** at most one | two CTAs compete to be the important one and leave the person choosing what to look at before what to do (C1) |

| When | Then |
|---|---|
| `size=small` | title must be omitted |
| `size=small` | subtitle must be omitted |
| `size=small` | icon must be omitted |
| `size=small` | aria-label must be declared |
| always | description must be declared |
| `size=large\|medium` | mediaPosition must be omitted |
| always | the banner must have a name |
| `size=large\|medium` | an image must be declared |

<!-- prosa:rules -->

- **The image is background, not content.** It fills the box and is cropped (`object-fit: cover`); the height is dictated by `size`, never by the image.
- **The container sets the width.** The component sets no maximums — each context's grid bounds it.
- **The available width chooses the variant**, not the device: up to 735px → `mobile` · from 720px → `desktop`.
- **`full photo` always with an overlay.** Dark on the text side; the photo's focus, on the opposite side. Never remove it.
- **Respect the text length.** The banner does not grow: it truncates.
- **It is not for system feedback.** Confirmations and errors belong to Alert.
- **Never back to back.** Several banners per view, yes; stacked, no — separate them with content.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`alert`](alert.md) | it is system feedback: a confirmation or an error, not a promotion |

---

## Accessibility

- NEVER `role="banner"`. That landmark is the site header; using it here lies to the screen reader about which part of the page it is reading.
- The `<section>` needs a name: `aria-labelledby` pointing to the title, or `aria-label` when it is sm and has no title. A section without a name is not a landmark, it is an expensive div.
- The image is `alt=""`: it is a decorative background and the message is in the text. Describing it would duplicate it.
- The CTA label names the action — «Conocer más», never «Click aquí».

<!-- prosa:accessibility -->

- **WCAG 1.4.3 (Contrast)** — on `full photo` the overlay is what holds the white text, and
  **only while the text stays in the dark third**: at opacity 0.7 it gives 8.45:1 on a light
  photo, at half width it already drops to 2.43:1 and at the right edge to 1.00:1. The gradient fades on
  purpose —that is how the photo shows—, so the rule is not "the overlay guarantees AA" but **the text does not
  go past the middle**. It matters above all in `device=mobile`, where the grid is a single column and
  the content can cross the whole width. Never remove the overlay nor lower its opacity.
- **WCAG 1.1.1 (Non-text content)** — the image is decorative: `alt=""`. The full message lives in the real text, never inside the image.
- **WCAG 1.3.1 (Info and relationships)** — the title is a real heading (`<h2>` or the level that applies) and names the region via `aria-labelledby`.
- **WCAG 2.5.8 (Target size, AA)** — the CTA inherits the button's box: 32/40/48 high depending on
  the size, all above the 24×24 minimum.
- **Not color alone** — the message does not depend on the photo or the background color: text + CTA convey it fully.

<!-- /prosa:accessibility -->
