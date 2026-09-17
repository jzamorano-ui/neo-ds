# Banner

> **Figma (source of truth):** [❖ Banner](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40003685-37499) — visual validation against the master.

Highlights a message inside the page — a campaign, a benefit, a notice — with or without an action. It is the system's promotional surface: it draws attention without interrupting navigation.

It is not for system feedback: confirmations and errors belong to **Alert**. The banner promotes, it does not notify.

## When to use it

| Case | Variant |
|---|---|
| Leading campaign or benefit, high hierarchy | `large` — with `full-photo` if the photo carries the message |
| Secondary notice or promotion, medium hierarchy | `medium` |
| Reminder or one-off access, low hierarchy | `small` — compact strip, no title |

Several banners can coexist in one view, but never back to back — separate them with content or they compete with each other.

---

## Properties

| Property | Values |
|---|---|
| `device` | mobile · desktop — chosen by the **available width**, not the device |
| `size` | large · medium · small — defines the height, on MUI's long scale |
| `full-photo` | false · true — the image becomes the background, with an overlay |
| `title` | The title. It does not exist in `small`. |
| `subtitle` (+ `↪ text`) | The subtitle. Optional; it does not exist in `small`. |
| `description` (+ `↪ body`) | The description. |
| `image` | The image slot: whatever goes in fills the box and is cropped. |
| `image left` · `image right` | In `small`, which side the image goes on. |
| `icon` | The brand icon. Only in `large`. |
| `button` | The CTA. Optional — at most one. |

**Combinations:** `small` carries no title, subtitle or icon — only description, CTA and image. The brand icon only exists in `large`.

---

> **`.banner-shell` is not decoration: it is what makes the SPACE choose the version.** The
> sheet queries `@container banner`, and a container query resolves against an
> ancestor — a container does not query itself. The component brings its own, so in React there is
> nothing to do: `NeoBanner` draws it.
>
> **If it is omitted in the plain layer**, no query matches and the banner stays at its base, which is the
> **narrow** version. That is deliberate: with the wide one as base, a banner without its wrapper would be drawn
> wide inside a narrow column, which is the defect this sheet came to fix. Looking mobile
> where there was room for more is visible; looking wide where it does not fit is not.

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
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to the root node
}
```

**The width chooses the variant, not the device, and there is no prop to request it.** The sheet breaks on its own at **720px**: below that it draws the narrow version, from there on the wide one. The two masters overlap between 720 and 735, so the break falls within what the design draws, and it is the same point where `modal-fullscreen` breaks.

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| contenedor | default | background | `--fill--base--default` |
| `title` · `subtitle` · `description` | default | color | `--text--base--default` |
| `title` · `subtitle` · `description` | full-photo=true | color | `--text--base--contrast` |
| overlay (full photo) | — | background | black gradient 70% → 0 — **design constant, not tokenized** (gradients are not tokenized) |
| CTA | default | — | `system primary` button — inherits its tokens |
| CTA | full-photo=true | — | `system primary` button with `surface=inverse` |

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `border-radius` (container) | `--neo-radius-lg` | 16px |
| `padding-top` (content area) | `--neo-space-2xl` | 32px |
| `padding-inline` (content area) | `--neo-space-xl` | 24px |
| `padding-bottom` (content area) | `--neo-space-lg` | 16px |
| `gap` (content blocks) | `--neo-space-sm` | 8px |
| `gap` (title ↔ subtitle) | `--neo-space-xs` | 4px |
| `gap` (actions) | `--neo-space-md` | 12px |
| `padding-top` (actions) | `--neo-space-sm` | 8px |
| `icon-size` (brand) | `--neo-icon-size-2xl` | 48px |

**Measures** — the width is governed by each context's container, not the component. The height is dictated by `size`.

| device | drawn at | min width | max width | height large · medium · small |
|---|---|---|---|---|
| `desktop` | 1180 | 720 | — (fills its container) | 374 · 230 · 90 |
| `mobile` | 343 | 343 | 735 | 504 · 340 · 148 |

> In marketing the width is bounded by the grid's container (1180 / 1320). In product (layout with a sidebar) the banner fills the content area.

### Typography

| Element | desktop `large` | other variants |
|---|---|---|
| `title` | `title/lg-bold` — 24px · 700 · 32px | `title/md-bold` — 20px · 700 · 28px |
| `subtitle` | `title/md-bold` — 20px · 700 · 28px | `title/sm-bold` — 18px · 700 · 26px |
| `description` | `body/lg-regular` — 16px · 400 · 24px | `body/md-regular` — 14px · 400 · 20px |

**Text length** — the banner does not grow with the text: it truncates it. Summarize the message.

Three details the table does not say on its own: `medium`'s headline
does not depend on there being a subtitle, the description is 3 lines and not 2, and `mobile · small` does not truncate by
lines but by **height**.

| Variant | `title` | `subtitle` | `text` | `description` |
|---|---|---|---|---|
| desktop · large | max 2 lines | max 1 line | max 3 lines | — |
| desktop · medium | max 2 lines | max 1 line | max 3 lines | — |
| desktop · small | — | — | — | max 2 lines |
| mobile · large | max 2 lines | max 1 line | max 3 lines | — |
| mobile · medium | max 2 lines | max 1 line | max 3 lines | — |
| mobile · small | — | — | — | fixed height of 76 px |

The columns name **the master's layer**, not a copywriting role: the old table separated "description
with CTA" from "without CTA", and the master **does not have that axis** — its axes are `device`, `size` and
`full-photo`. Whether the CTA is there or not changes the available height, not the layer's cap.

---

## HTML

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

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Container | `<section>` | `aria-labelledby` (the title) · `aria-label` in `small` (there is no title) |
| Title | `<h2>` | `id` referenced by `aria-labelledby` — level according to the page's hierarchy |
| Imagen | `<img>` | `alt=""` — it is a decorative background; the message lives in the text |
| CTA | `<button>` · `<a>` | the label names the action — "Learn more", never "Click here" |

> **Never `role="banner"`.** That ARIA landmark is the site header — it has nothing to do with this component. Use `<section>`.

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Reaches the CTA (the only interactive element) |
| `Enter` · `Space` | Activates the CTA |

The banner itself is not interactive — only the CTA receives focus. Do not make the whole surface clickable.

---

## Rules

- **The image is background, not content.** It fills the box and is cropped (`object-fit: cover`); the height is dictated by `size`, never by the image.
- **The container sets the width.** The component sets no maximums — each context's grid bounds it.
- **The available width chooses the variant**, not the device: up to 735px → `mobile` · from 720px → `desktop`.
- **`full photo` always with an overlay.** Dark on the text side; the photo's focus, on the opposite side. Never remove it.
- **Respect the text length.** The banner does not grow: it truncates. See the table.
- **Optional CTA — at most one.** The banner informs or asks for one action, never a menu.
- **It is not for system feedback.** Confirmations and errors belong to Alert.
- **Never back to back.** Several banners per view, yes; stacked, no — separate them with content.

---

## Accessibility

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
