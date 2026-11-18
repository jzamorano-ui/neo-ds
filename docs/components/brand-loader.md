<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Brand Loader

> **Figma (source of truth):** [❖ Brand Loader](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004869-28696) — visual validation against the master.

<!-- prosa:intro -->

The brand loader accompanies the wait for a relevant action of the person and says what is being resolved. It is used as a **full-screen transition view**, between the action and its result, centered on the screen, on `surface/base/default`. The action is one whose result depends on what the person asked for: searching or quoting plans, sending a request, paying.

It is not the loader of a part of the screen. A card, a section, a table or a drawer that loads is a [`skeleton`](skeleton.md) if the shape of what comes is known, and a [`spinner`](spinner.md) if it is not: each part loads on its own and the rest of the screen stays in view. And it is not common navigation either: changing tab or page shows the page's shape with a skeleton.

## When to use it

| The wait | Use |
|---|---|
| A part of the screen: a card, a section, a table, a drawer | **Skeleton** if the shape of what comes is known; if not, **Spinner**. Each part loads on its own and the rest of the screen stays in view. |
| The whole screen, and its shape is known | **Skeleton** with the shape of the page. |
| The whole screen, and what comes depends on what the person asked for | **Brand loader**, as a transition view, with a message that says what is being done. |
| Under 1 s | No indicator: it appears and disappears at once and only flickers. Show the result when it arrives. |

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `device` | desktop · mobile — not a prop: the available width decides it (breakpoint 720px) |
| `message` | text — in code: `messages` |

<!-- prosa:properties -->

`device` is chosen by the **available width**, not by the device (C9). The `message` is present and concrete, never just "Loading…".

**More than one message.** If the wait has stages, the message is a list. In Figma the first one goes in `message` and the ones that follow go in an **annotation** of the instance, in the order they happen. In code they take turns, one per turn of the isotype, with a 0.2 s fade in the gap, and after the last one they go back to the first. With a single message the text does not move.

**The block reserves the height of the longest message**, so the isotype does not jump when the text changes.

### The animation

One turn lasts 3 s and loops. Each lobe fills along its center line, the four at once: the fill grows from the start of the line to its end, the isotype stays full for a moment, and then the fill withdraws in the same direction, from the start to the end.

**The left lobe, the «e», goes with one front.** Its line has two stretches, the tail and the ring, and the bar inside the ring, and the fill runs them as a single path, so the bar starts where the ring meets it and the withdrawal ends flush with the inner edge of the ring.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoBrandLoaderProps {
  messages: string[]                  // What is being done, in the order it happens. One: it stays still. Two to five: they take turns, one per turn of the isotype. The screen reader hears the first.
  className?: string                  // Extra classes on the root. They add to the system ones; they do not replace them.
  // …and the DOM attributes not listed above
}
```

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `base` | default | fill | `--fill--brand--secondary--default` |
| `fill` | default | stroke | `--fill--brand--primary--default` |
| `message` | default | color | `--text--base--secondary` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-lg` · 16px |
| `root` | max-width | device=desktop | 400px |
| `root` | max-width | device=mobile | 280px |
| `isotype` | width × height | device=desktop | 100×100px |
| `isotype` | width × height | device=mobile | 64×64px |
| `fill` | stroke-width | device=desktop | 10px |
| `fill` | stroke-width | device=mobile | 6.4px |

<!-- prosa:layout -->

The loader has no background of its own: the transition view that hosts it is `surface/base/default`. The isotype and the message are centered. The message fills the width of the block and wraps; it is centered too.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `message` | desktop | `Title/md-Bold` | 20px | Bold | 28px |
| `message` | mobile | `Title/sm-Bold` | 18px | Bold | 26px |

---

## Motion

| Motion | Element | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|---|
| `stroke` | `fill` | loop | 3000 ms | linear | fill 0–1400 ms (cubic-bezier(0.42, 0, 0.58, 1)) · retract 1600–2900 ms (cubic-bezier(0.42, 0, 0.58, 1)) |
| `message` | `message` | loop | 3000 ms | linear | fade-in 0–100 ms · fade-out 2900–3000 ms |

---

## HTML

<!-- prosa:html -->

```html
<div class="brand-loader-shell">
  <div class="brand-loader" role="status" aria-live="polite" aria-busy="true">
    <svg class="brand-loader__isotype" viewBox="0 0 100 100" aria-hidden="true">
      <g class="brand-loader__base"><!-- the four lobes --></g>
      <g class="brand-loader__fill">
        <mask id="neo-brand-loader-1-lobe-top"><!-- the lobe's shape --></mask>
        <g mask="url(#neo-brand-loader-1-lobe-top)">
          <path class="brand-loader__load" pathLength="1" d="…" />
        </g>
        <!-- …the right and bottom lobes, the same -->
        <mask id="neo-brand-loader-1-lobe-left"><!-- the «e» --></mask>
        <g mask="url(#neo-brand-loader-1-lobe-left)">
          <path class="brand-loader__load brand-loader__load--e" pathLength="1" d="…" />
          <mask id="neo-brand-loader-1-inner-edge"><!-- the inner edge of the ring --></mask>
          <g mask="url(#neo-brand-loader-1-inner-edge)">
            <path class="brand-loader__load brand-loader__load--bar" pathLength="1" d="…" />
          </g>
        </g>
      </g>
    </svg>
    <!-- One message: no modifier, and it stays still. Two to five: brand-loader__messages--2,
         brand-loader__messages--3, brand-loader__messages--4 or brand-loader__messages--5, the count. -->
    <div class="brand-loader__messages brand-loader__messages--3">
      <p class="brand-loader__message">Revisando tus datos...</p>
      <p class="brand-loader__message" aria-hidden="true">Buscando planes con tu cobertura...</p>
      <p class="brand-loader__message" aria-hidden="true">Ordenando los resultados...</p>
    </div>
  </div>
</div>
```

**The `.brand-loader-shell` wrapper is not optional and does not belong to the consumer.** It is the transition view: at least the height of the screen, with the loader centered in it. The available width chooses the version with a container query, same as `empty-state`, and a container does not query itself.

**The isotype is inline, not an image.** The fill is a stroke the stylesheet animates, and its color comes from tokens: an `<img>` could do neither. Its masks carry ids that are unique per instance.

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<div>` | never `role="status"` |
| `div[aria-live]` | `<div>` | `role="status"` · `aria-live="polite"` · `aria-busy="true"` |
| `svg[class="brand-loader__isotype"]` | `<svg>` | `aria-hidden="true"` |
| `p[aria-hidden="true"]` | `<p>` | `aria-hidden="true"` · `class="brand-loader__message"` (2 messages) |

<!-- prosa:aria -->

**Only the first message is exposed to the screen reader.** The ones that follow change every 3 s: announcing each would talk over the person for the whole wait. VoiceOver with Safari does not announce even the first one when the loader appears: see Accessibility.

<!-- /prosa:aria -->

---

## Keyboard

This component is not interactive — it does not receive focus.

---

## Rules

| Limit | When exceeded |
|---|---|
| **messages:** up to 5 | from the sixth on they are not shown, and the wrapper warns. |
| **message:** never just «Loading…» | it does not say what is being resolved: name the action and what the person asked for. |
| **short waits:** not for waits under 1 s | it appears and disappears at once and only flickers: show the result when it arrives. |

| When | Then |
|---|---|
| always | message must be declared |

<!-- prosa:rules -->

### The usage rules, mirrored from Figma

They live on the `Brand-loader / Use` sheet.

- **Use it between an action that matters and its result.** The person asked for something that takes time to resolve, and what comes depends on what they asked for. While it resolves, the whole screen is the wait and the message says what is being done.
- **What loads in parts, with skeleton.** Each card loads on its own and shows the shape of what comes. The page stays in view and the person can keep reading.
- **What loads inside a drawer, loads in the drawer.** The drawer opens right away and its content arrives with skeleton. The person knows where they are and can close it.
- **With a message that says what is being done.** In the person's words and with what they asked for. That way the wait is understood and better tolerated.
- **With several messages, one per turn.** If the wait has stages, the messages take turns, one per turn of the isotype. In Figma the first goes in the `message` prop and the ones that follow, in an annotation.
- **When navigating, skeleton with the shape of the page.** Changing tab or page is a common wait: the page shows its shape while the content arrives.
- **Do not use it on every card that loads.** Two isotypes at once compete with each other and with the page, and the brand stops saying something. What loads in parts, loads with skeleton.
- **Do not use it inside a drawer.** The brand loader is a transition view of its own: inside a panel it competes with the page behind and does not say where the person is.
- **Do not use it with just "Loading…".** A generic message does not say what is being resolved, and the brand is left talking without saying anything.
- **Do not use it over the page, with a scrim.** The brand loader replaces the screen; it is not a layer on top. With the page behind, the person does not know if it is still alive or if they can touch it.
- **Do not use it in common navigation.** If the brand appears on every click, it stops meaning something. It is kept for the wait of what the person asked for.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`skeleton`](skeleton.md) | a part of the screen loads and the shape of what comes is known — a card, a section, a table, a drawer — or the page loads in common navigation: each part loads on its own and the rest of the screen stays in view. |
| [`spinner`](spinner.md) | a part of the screen loads and the shape of what comes is not known: the spinner waits in its place and the rest of the screen stays in view. |

---

## Accessibility

- It takes no focus and does not appear in the tab order: it is not interactive.
- The isotype is `aria-hidden="true"`: it is the brand, not information. The message is what says what is happening.
- Only the first message is exposed: the ones that follow are `aria-hidden="true"`. They change every 3 s, and announcing each would talk over the person for the whole wait.
- With `prefers-reduced-motion` nothing moves: the isotype stays full and still, and only the first message is shown (WCAG 2.3.3).
- WCAG 1.4.3 — `text/base/secondary` (#5C5C5C) on `surface/base/default` (#FFFFFF) gives 7.0:1, which passes AA.

<!-- prosa:accessibility -->

- **WCAG 4.1.3** — the region inside the root is `role="status"` with `aria-busy="true"`, and only its first message is exposed: it never announces each change. VoiceOver with Safari does not announce a region that arrives already filled: when the wait has to be announced, keep a `role="status"` region on the page from the start and set its text (see «A live region has to exist before its message» in `llms.txt`).

<!-- /prosa:accessibility -->
