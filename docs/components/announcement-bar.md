<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Announcement Bar

> **Figma (source of truth):** [❖ Announcement Bar](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004932-1176) — visual validation against the master.

<!-- prosa:intro -->

Gives an operational notice —hours, care, services— above everything, over the header. It is not a semantic message: it says how the institution works today, and it is already on the page when the page loads.

**What separates it from its relatives:** if it reports the result of an action or a state that persists in the flow, it is `alert`. If it promotes something, it is `banner`. If it floats and goes away on its own, it is `snackbar`. If it demands a decision, it is `modal-dialog`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `device` | desktop · mobile — not a prop: the viewport width decides it (breakpoint 720px) |
| `link` | true · false — default `true` |
| `close` | true · false — default `true` |
| `description` | text |

<!-- prosa:properties -->

**`device` does not reach the API.** The viewport width decides the version through a media query: the bar sits at the top of the screen, so the viewport is its width. Figma draws both because a master has no media queries.

**`link` and `button` are not props**: they are the presence of the action, which arrives through `actions`. One at a time — a link OR a button —; the master does not enforce it, two actions compete for attention. **`icon`** takes one of the five semantic icons and defaults to `warning`. **`onClose`** draws the ✕; whether closing persists across screens is the consumer's decision.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoAnnouncementBarProps {
  icon?: ReactNode                    // The icon node. Use the system icons (icons/), not loose SVGs.
  actions?: ReactNode                 // The call to action. One at most (C1).
  onClose?: (...args: unknown[]) => void  // The close handler. Its presence draws the ✕.
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  className?: string                  // Extra classes on the root. They add to the system ones; they do not replace them.
  'aria-label'?: string               // The accessible name when there is no visible text that provides it.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Alert not listed above
}
```

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--fill--deco--2--solid` |
| `root` | default | color | `--text--base--contrast` |
| `description` | default | color | `--text--base--contrast` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | padding-block | — | `--neo-space-lg` · 16px |
| `root` | padding-inline | every device | `--neo-space-lg` · 16px |
| `root` | gap | every device | `--neo-space-md` · 12px |
| `icon` | width | — | `--neo-icon-size-md` · 24px |
| `icon` | height | — | `--neo-icon-size-md` · 24px |
| `content` | gap | every device | `--neo-space-none` · 0px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `description` | — | `Body/lg-Medium` | 16px | 500 | 24px |

---

## HTML

<!-- prosa:html -->

```html
<div class="announcement-bar" role="region" aria-label="Aviso">
  <div class="announcement-bar__content">
    <span class="announcement-bar__icon" aria-hidden="true"><!-- semantic-warning-inverse, from the sprite --></span>
    <span class="announcement-bar__text">Este sábado la atención presencial es hasta las 13:00.</span>
    <a class="link link--standalone announcement-bar__link" href="/horarios">Ver más</a>
  </div>
  <button type="button" class="btn btn--tertiary btn--inverse btn--medium btn--icon-only announcement-bar__close" aria-label="Cerrar aviso">
    <svg aria-hidden="true"><use href="#system-close"></use></svg>
  </button>
</div>
```

With a button instead of the link, the action keeps its place after the text:

```html
<button type="button" class="btn btn--secondary btn--small btn--inverse announcement-bar__button">Actualizar</button>
```

The action is a link **or** a button, never both. The text goes in its own node, because it is what gets cut at 2 lines on desktop and 4 lines on mobile.

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<div>` | `role="region"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the link or button and then to the ✕, in DOM order |
| `Enter · Space` | activates the focused element |

---

## Rules

| Limit | When exceeded |
|---|---|
| **description:** 2 lines on desktop, 4 on mobile | the master cuts it with an ellipsis. Rewrite it shorter. |
| **on screen at once:** one | two bars stack above the header and push the page down; one per screen. |
| **actions:** one at a time (link or button) | the master does not enforce it; two actions compete for attention. |

| When | Then |
|---|---|
| always | description must be declared |

<!-- prosa:rules -->

- **One per screen**, at the top, over the header. It scrolls away with the page.
- **Write it to fit**: about 130 characters fit whole from 360 to 1440. The text is cut at two lines on desktop and four on mobile, with an ellipsis.
- **Turn the ✕ off** when the notice must not be lost from sight.
- The background is `fill/deco/2/solid`, a declared exception: `deco` is not a semantic role, and this notice is not a semantic message.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`alert`](alert.md) | it is a system message, or it carries a severity |
| [`banner`](banner.md) | it is a campaign or a benefit |

---

## Accessibility

- The container carries `role="region"` with an `aria-label`: it is a notice that is ALREADY present when the page loads, not an event. MuiAlert brings `role="alert"` by default (Alert.js:164, used at:196), which would interrupt the screen reader on every load, so the wrapper overrides it (Alert.d.ts:105 exposes `role`).
- It does not take focus and does not announce itself: it is read in page order, first.
- The icon is decorative (`aria-hidden`); the text carries the meaning.
- Text and glyphs on the purple background reach 6.46:1, above the 4.5:1 minimum.
- The ✕ has an accessible name in Spanish.

<!-- prosa:accessibility -->

The container is a named `region` (`aria-label`, «Aviso» by default), not an `alert`: MUI's Alert brings `role="alert"`, which would interrupt the screen reader on every load of a notice that is already there. It does not take focus and does not announce itself; it is read first, in page order.

<!-- /prosa:accessibility -->
