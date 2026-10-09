<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Skeleton

> **Figma (source of truth):** [❖ Skeleton](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004858-26586) — visual validation against the master.

<!-- prosa:intro -->

A loading placeholder with the shape of the content to come. It goes on the first load of a page or a section whose structure is already known — lists, tables, cards, profiles — and only where the content comes from the service: the content takes its place all at once.

If the wait comes from an action of the person — sending, saving, searching — the case is not a skeleton: it is a [Spinner](spinner.md). If the shape of what arrives is not known, it is a spinner too: a silhouette that does not match the content confuses more than it helps.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `variant` | text · circular (40px) · rounded — default `text` |

<!-- prosa:properties -->

`variant` is the **shape** of the piece, not a hierarchy. `text` takes the place of a line of text; `circular` only of a round element, such as an avatar, always square and never stretched; `rounded` of a block, an image or a component, such as a badge or a button.

**It always moves with `wave`**: a band of light sweeps across it. The timing is MUI's, untouched.

**Neo does not use `pulse` or a still piece.** MUI offers them; in Neo every piece moves the same way, and it only stops with `prefers-reduced-motion`.

**Neo does not use `rectangular`.** MUI offers it; in Neo every block has a radius, so a block is `rounded`.

The width is not a property: each piece takes the width of the content it replaces.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoSkeletonProps {
  variant?: 'text' | 'circular' | 'rounded'  // the shape of the piece, not a hierarchy: `text` takes the place of a line of text, `circular` only of a round element — always square, never stretched —, `rounded` of a block, an image or a component. MUI's `rectangular` is not used. Default: 'text'.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Skeleton not listed above
}
```

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--fill--base--medium` |
| `wave` | default | background | `--fill--base--light` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | width × height | variant=circular | 40×40px |
| `root` | height | variant=text | 24px |
| `root` | height | variant=rounded | 60px |
| `root` | border-radius | variant=text · rounded | `--neo-radius-xs` · 4px |
| `root` | border-radius | variant=circular | `--neo-radius-pill` · 999px |

---

## Motion

| Motion | Element | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|---|
| `wave` | `wave` | loop | 2000 ms | linear | after 500 ms |

---

## HTML

```html
<span class="skeleton skeleton--text" aria-hidden="true"></span>
<span class="skeleton skeleton--circular" aria-hidden="true"></span>
<span class="skeleton skeleton--rounded" aria-hidden="true"></span>
```

<!-- prosa:html -->

```html
<!-- The container names the load; the pieces are decorative. The role is what lets the name be exposed. VoiceOver with Safari does not announce it when it appears: see Accessibility -->
<div role="status" aria-busy="true" aria-label="Cargando…">
  <span class="skeleton skeleton--circular" aria-hidden="true"></span>
  <span class="skeleton skeleton--text" aria-hidden="true"></span>
  <span class="skeleton skeleton--text" aria-hidden="true"></span>
  <span class="skeleton skeleton--rounded" aria-hidden="true"></span>
</div>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<span>` | `aria-hidden="true"` |

---

## Keyboard

This component is not interactive — it does not receive focus.

---

## Rules

| Limit | When exceeded |
|---|---|
| **short loads:** not for loads under 1 second | a skeleton that appears and disappears in under a second only flickers — show the content when it arrives; for more than 10 s, a progress indication |

<!-- prosa:rules -->

- **Use it on the first load of a known structure** — a page or a section whose structure is already known: lists, tables, cards, profiles.
- **Use it when the content arrives all at once**, and the wait is long enough to be noticed.
- **One piece per real element** — `text` for each line, `circular` only for what is round and never stretched, `rounded` for blocks, images and components, such as a badge or a button.
- **Not for an action of the person.** Sending, saving, searching: that is a [`spinner`](spinner.md), or the `brand-loader` if the action is relevant and blocks the whole screen.
- **Not when the shape of the content is unknown.** A silhouette that does not match what arrives confuses more than a spinner.
- **Not for what the service does not bring.** Headings, labels, titles, icons and actions are structure: they are shown real from the first moment. The skeleton only takes the place of what arrives in the response.
- **Not for waits that are too long.** The skeleton is for waits of 1 to 10 s; more than 10 s calls for a progress bar, which Neo does not have (see `docs/dev/SUPPORT.md`) ([NN/g](https://www.nngroup.com/articles/skeleton-screens/), [response times](https://www.nngroup.com/articles/response-times-3-important-limits/)).

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`spinner`](spinner.md) | the wait comes from an action of the person — sending, saving, searching — or the shape of the content is not known |
| [`brand-loader`](brand-loader.md) | the whole screen waits for the result of a relevant action of the person — searching or quoting plans, sending a request, paying — and what comes depends on what the person asked for: the brand loader replaces the screen, with a message that says what is being done. |

---

## Accessibility

- It takes no focus and does not appear in the tab order: it is not interactive.
- The loading container is `role="status"` and carries `aria-busy="true"` and an `aria-label` with the state, so the accessibility tree exposes the load once, by its name, and not each piece. On a `div` without a role the name has nowhere to sit: ARIA does not allow a `generic` to be named. VoiceOver with Safari does not announce the container when it appears, because it arrives already filled. When the wait has to be announced, keep a `role="status"` region on the page from the start and set its text (see «A live region has to exist before its message» in `llms.txt`).
- With `prefers-reduced-motion` the animation stops and the piece stays still (WCAG 2.3.3).

<!-- prosa:accessibility -->

- **WCAG 4.1.2** — the container's name and state (not the pieces) are what a screen reader needs.
- **Not color alone** — the skeleton announces nothing by its color: the container's state is what is exposed.

<!-- /prosa:accessibility -->
