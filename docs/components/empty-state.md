<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Empty State

> **Figma (source of truth):** [❖ Empty State](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004417-25762) — visual validation against the master.

<!-- prosa:intro -->

It takes the place of content that does not exist yet — a list with no data, a search with no results — and says what can be done about it.

It is not system feedback: confirmations and errors belong to **Alert**. And it is not waiting: while the data loads, **Spinner** goes there. Empty and loading look alike and mean the opposite — one says "there is nothing", the other "I do not know yet" —, and confusing them leaves the person waiting for something that will not come.

## When to use it

| Case | What changes |
|---|---|
| **Initial empty** — there is no data yet because nobody created it | The action **creates** what is missing: "Create request", "Add beneficiaries" |
| **Filtered empty** — there is data, but the search left it out | The action **undoes**: "Clear filters". It can be the only one, and be secondary |
| **Third-party empty** — the record exists but has no content | It usually carries no action: there is nothing the person can do |

The component **does not tell these cases apart on its own**: it has no `type` axis. What changes between them is the icon, the text and which action is turned on, and that is decided by whoever uses it.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `device` | desktop · mobile — not a prop: the available width decides it (breakpoint 720px) |
| `actions` | true · false — default `true` |
| `↪ primary` | true · false — default `true` |
| `↪ secondary` | true · false — default `true` |
| `title` | text |
| `description` | text |
| `icon` | true · false — default `true` |

<!-- prosa:properties -->

`device` is chosen by the **available width**, not the device (C9). The icon, and the text of each button, are managed from the panel's **exposed instances** — same as in `modal-dialog`. The icon always comes from `icon/system`: never `icon/semantic` nor `icon/brand`, and always outline.

**Combinations:** the two buttons are independent. The block can keep both, either one, or none.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoEmptyStateProps {
  icon: ReactNode                     // The icon node. Use the system icons (icons/), not loose SVGs.
  title: ReactNode                    // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  description: ReactNode              // The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node.
  actions?: ReactNode                 // The call to action. One at most (C1).
  headingLevel?: 'h2' | 'h3' | 'h4'   // The heading level of the title. The screen decides it: `h2` on a page, `h3` inside a section that already has its own title. Skipping levels breaks navigation by headings. Default: 'h2'.
  className?: string                  // Extra classes on the root. They add to the system ones; they do not replace them.
  // …and the DOM attributes not listed above
}
```

<!-- prosa:props -->

**The buttons are passed assembled, not described.** `button-primary` and `button-secondary` are a `button` instance the
consumer provides **with its label and its handler**. A prop that only accepts a label and a click takes away from the
consumer what the contract gives them: a `type`, an icon, an `href`, a button disabled while
loading. It is the same slot as `banner` and `modal-dialog`, and the two-action cap is still stated by
the contract, not by the prop's shape.

**Two slots are CAPACITY, not a recommendation: ONE is shown.** The master exposes `↪ primary` and
`↪ secondary`, and its usage documentation declares three cases —initial empty, filtered empty, third-party
empty— and **in none of them are there two buttons at once**: one creates, another undoes, the third carries no
action. Which one is turned on and whether it is primary or secondary is decided by **that action's hierarchy on the
screen**, not by the component. The minimal example shows a single one. "Clear filters" next to an initial-empty text is the DON'T the
master itself names: "the action that does not solve the case".

**It has no `device` prop.** The version is decided by a **container query** on the available width, not a prop and not the device (C9). It is the same criterion as `banner`, and for the same reason: an `@media` measures the viewport, and this block is FILL horizontally — it lives inside panels and columns of arbitrary width, so the viewport does not say how much space it has. The break is 720px and the base is the narrow one.

**It has no MUI base.** The wrapper **is not generated**: it is written by hand, like `banner` and `aspect-ratio`.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

The root is a `surface`; the pill is a `fill`.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--surface--base--default` |
| `icon-box` | default | background | `--fill--base--light` |
| `icon` | default | fill/color | `--icon--base--default` |
| `title` | default | color | `--text--base--default` |
| `description` | default | color | `--text--base--secondary` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | border-radius | — | `--neo-radius-md` · 12px |
| `root` | padding-block | device=desktop | `--neo-space-3xl` · 48px |
| `root` | padding-block | device=mobile | `--neo-space-xl` · 24px |
| `root` | padding-inline | device=desktop | `--neo-space-2xl` · 32px |
| `root` | padding-inline | device=mobile | `--neo-space-xl` · 24px |
| `root` | gap | device=desktop | `--neo-space-xl` · 24px |
| `root` | gap | device=mobile | `--neo-space-lg` · 16px |
| `body` | max-width | — | 480px |
| `body` | gap | device=desktop | `--neo-space-lg` · 16px |
| `body` | gap | device=mobile | `--neo-space-md` · 12px |
| `icon-box` | gap | — | `--neo-space-none` · 0px |
| `icon-box` | width × height | device=desktop | 64×64px |
| `icon-box` | width × height | device=mobile | 48×48px |
| `icon-box` | padding-block | device=desktop | `--neo-space-lg` · 16px |
| `icon-box` | padding-block | device=mobile | `--neo-space-md` · 12px |
| `icon-box` | padding-inline | device=desktop | `--neo-space-lg` · 16px |
| `icon-box` | padding-inline | device=mobile | `--neo-space-md` · 12px |
| `icon-box` | border-radius | device=desktop | `--neo-radius-lg` · 16px |
| `icon-box` | border-radius | device=mobile | `--neo-radius-md` · 12px |
| `icon` | width × height | device=desktop | `--neo-icon-size-lg` · 32px |
| `icon` | width × height | device=mobile | `--neo-icon-size-md` · 24px |
| `content` | gap | — | `--neo-space-none` · 0px |
| `actions` | gap | — | `--neo-space-sm` · 8px |

<!-- prosa:layout -->

**The container sets the width (C10).** The root is `FILL` and declares no maximum of its own. The body's `max-width` is a **line measure**, not a component width: without it, on a wide screen the text stretches until it can no longer be read.

**Below ~360px the actions stack.** The group is horizontal and does not wrap; with two real labels ("Clear filters" + "Create request") plus the padding it goes past 360. The master cannot draw it —it has no media queries— so the plain layer solves it, like `modal-dialog`'s `cta`, which is vertical.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `title` | desktop | `Title/sm-Bold` | 18px | Bold | 26px | 1 line |
| `title` | mobile | `Body/lg-Bold` | 16px | Bold | 24px | 1 line |
| `description` | desktop | `Body/lg-Regular` | 16px | 400 | 24px | 2 lines |
| `description` | mobile | `Body/md-Regular` | 14px | 400 | 20px | 2 lines |

---

## HTML

<!-- prosa:html -->

```html
<div class="empty-state-shell">
  <div role="status" aria-live="polite" class="empty-state">
    <div class="empty-state__body">
      <div class="empty-state__icon-box">
        <svg class="empty-state__icon" aria-hidden="true"><!-- from icon/system --></svg>
      </div>
      <div class="empty-state__content">
        <h2 class="empty-state__title">Aún no tienes solicitudes</h2>
        <p class="empty-state__description">Cuando envíes una, podrás ver su estado aquí.</p>
      </div>
    </div>
    <div class="empty-state__actions">
      <button type="button" class="btn btn--secondary btn--medium">Limpiar filtros</button>
      <button type="button" class="btn btn--primary btn--medium">Crear solicitud</button>
    </div>
  </div>
</div>
```

The heading level is set by the screen. `h2` is the default; inside a section that already has its own title, it is `h3`.

**The `.empty-state-shell` wrapper is not optional and does not belong to the consumer.** The AVAILABLE width chooses the version with a container query, and a container does not query itself: without the wrapper no query matches and the block stays at its base, which is the mobile one.

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<div>` | never `role="status"` |
| `div[aria-live]` | `<div>` | `role="status"` · `aria-live="polite"` |
| `div[class="empty-state__icon"]` | `<div>` | `aria-hidden="true"` |

<!-- prosa:aria -->

**`role="status"` always**, in the three cases. The live region is the block itself, not the `.empty-state-shell` wrapper.

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the first visible button, in DOM order. The block takes NO focus. |
| `Enter · Space` | activates the button that has focus |
| `Shift + Tab` | goes back to the previous element |

---

## Rules

| Limit | When exceeded |
|---|---|
| **title:** 1 line | the master cuts it with an ellipsis (`maxLines: 1`). Rewrite it shorter: the title says WHAT is missing, not why. |
| **description:** 2 lines | the master cuts it (`maxLines: 2`). If it does not fit, the detail goes on the screen and not here. |
| **actions:** 1 action | two actions are two ways out, and the screen already made the choice. The master has two slots, but none of its three use cases has two buttons. |

| When | Then |
|---|---|
| always | title must be declared |
| always | description must be declared |

<!-- prosa:rules -->

### The usage rules, mirrored from Figma

They live on the `Empty State / Use` sheet.

- **Initial empty: the action creates.** There is no data because nobody created it yet. The main action creates what is missing.
- **Filtered empty: the action undoes.** There is data, but the search left it out. The way out is removing the filter, and it can be the only action and be secondary.
- **Third-party empty: no action.** The record exists but has no content. There is nothing the person can do.
- **The icon accompanies, it does not replace.** It comes from the icon library, always outline, and reinforces the message without telling it alone.
- **Do not use it while the data loads.** Empty and loading look alike and mean the opposite: one says "there is nothing", the other "I do not know yet". While loading, **Spinner** goes there.
- **Do not use it to communicate an error.** A system failure is communicated with **Alert**, above the content. The empty block says there is no data, not that something broke.
- **Do not offer the action that does not solve the case.** "Create" does not fix a filter that is too narrow: the data exists, it was just left out.
- **Do not write a description that does not stop.** The master cuts the text at two lines. If more explanation is needed, the detail goes on the screen.

The first two caps **are applied in the master**, not just written: they are `maxLines` with truncation, so a long text looks cut in Figma before reaching code.

### The exception to C1

**C1** asks that exactly one action be dominant. This component allows keeping **only the secondary**, and it is on purpose: when the empty was caused by the person themselves —a filter with no results— the right way out is to **undo** ("Clear filters"), not to move forward. There is nothing to compete with there, so the dominant action is not missing: it does not apply.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`alert`](alert.md) | the system has something to say about what just happened — a confirmation, an error. The empty state does not communicate an event: it describes an absence. |
| [`spinner`](spinner.md) | the data is loading. Empty and loading look alike and mean the opposite: one says «there is nothing», the other «I do not know yet». |

---

## Accessibility

- The title is a heading, and its LEVEL is set by the screen: the same block is `h2` on a page and `h3` inside a section. Skipping levels breaks navigation by headings.
- The icon is `aria-hidden="true"`: it complements the message and contributes no accessible name.
- Each button's text says what it does. «ver más» and «clic aquí» are forbidden.
- When the icon or the actions are turned off, they are NOT hidden with `display: none` inside a `status`: they are removed from the DOM.
- WCAG 1.4.3 — `text/base/secondary` (#5C5C5C) on `surface/base/default` (#FFFFFF) gives 7.0:1, and the icon `icon/base/default` on `fill/base/light` gives 16.4:1. Both pass AA.

<!-- prosa:accessibility -->

- **The description is mandatory.** A title alone says what is missing; the description says what to do. Without it the block informs and does not help.

<!-- /prosa:accessibility -->
