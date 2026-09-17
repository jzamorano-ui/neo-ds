# Empty State

> **Figma (source of truth):** [❖ Empty State](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/OPS-Library-Neo-Design-System?node-id=40004417-25762) — visual validation against the master.

It takes the place of content that does not exist yet — a list with no data, a search with no results — and says what can be done about it.

It is not system feedback: confirmations and errors belong to **Alert**. And it is not waiting: while the data loads, **Spinner** goes there. Empty and loading look alike and mean the opposite — one says "there is nothing", the other "I do not know yet" —, and confusing them leaves the person waiting for something that will not come.

## When to use it

| Caso | What changes |
|---|---|
| **Initial empty** — there is no data yet because nobody created it | The action **creates** what is missing: "Create request", "Add beneficiaries" |
| **Filtered empty** — there is data, but the search left it out | The action **undoes**: "Clear filters". It can be the only one, and be secondary |
| **Third-party empty** — the record exists but has no content | It usually carries no action: there is nothing the person can do |

The component **does not tell these cases apart on its own**: it has no `type` axis. What changes between them is the icon, the text and which action is turned on, and that is decided by whoever uses it.

---

## Properties

| Property | Values |
|---|---|
| `device` | desktop · mobile — chosen by the **available width**, not the device (C9) |
| `title` | The title. Mandatory. |
| `description` | The description. Mandatory. |
| `icon` | The pill with the icon. Optional — it comes turned on. |
| `actions` | The button group. Optional — it comes turned on. |
| `↪ primary` | The primary button. Optional. |
| `↪ secondary` | The secondary button. Optional. |

The icon, and the text of each button, are managed from the panel's **exposed instances** — same as in `modal-dialog`. The icon always comes from `icon/system`: never `icon/semantic` nor `icon/brand`, and always outline.

**Combinations:** the two buttons are independent. The block can keep both, either one, or none.

---

## Props

```typescript
interface NeoEmptyStateProps {
  icon: ReactNode                    // The icon node. Use the system icons (icons/), not loose SVGs.
  title: ReactNode                   // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  description: ReactNode             // The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node.
  actions?: ReactNode                // The call to action. One at most (C1).
  headingLevel?: 'h2' | 'h3' | 'h4'  // The heading level of the title. The screen decides it: `h2` on a page, `h3` inside a section that already has its own title. Skipping levels breaks navigation by headings. Default: 'h2'.
  className?: string                 // Extra classes on the root. They add to the system ones; they do not replace them.
  sx?: SxProps<Theme>                // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown            // the rest flows to the root node
}
```

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

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | `background` | `--surface--base--default` |
| `icon-box` | default | `background` | `--fill--base--light` |
| `icon` | default | `fill` | `--icon--base--default` |
| `title` | default | `color` | `--text--base--default` |
| `description` | default | `color` | `--text--base--secondary` |

The root is a `surface`; the pill is a `fill`.

### Layout

| Element | Property | desktop | mobile |
|---|---|---|---|
| `root` | `padding` (block) | `--neo-space-3xl` | `--neo-space-xl` |
| `root` | `padding` (line) | `--neo-space-2xl` | `--neo-space-xl` |
| `root` | `gap` | `--neo-space-xl` | `--neo-space-lg` |
| `root` | `border-radius` | `--neo-radius-md` | `--neo-radius-md` |
| Body | `gap` | `--neo-space-lg` | `--neo-space-md` |
| Body | `max-width` | 480 | 480 |
| Pill | box | 64 × 64 | 48 × 48 |
| Pill | `padding` | `--neo-space-lg` | `--neo-space-md` |
| Pill | `border-radius` | `--neo-radius-lg` | `--neo-radius-lg` |
| `icon` | box | `--neo-icon-size-lg` | `--neo-icon-size-md` |
| Texts | `gap` | `--neo-space-none` | `--neo-space-none` |
| Actions | `gap` | `--neo-space-sm` | `--neo-space-sm` |

**The container sets the width (C10).** The root is `FILL` and declares no maximum of its own. The body's `max-width: 480` is a **line measure**, not a component width: without it, on the 1528px screen the text stretches until it can no longer be read.

**Below ~360px the actions stack.** The group is horizontal and does not wrap; with two real labels ("Clear filters" + "Create request") plus the padding it goes past 360. The master cannot draw it —it has no media queries— so the plain layer solves it, like `modal-dialog`'s `cta`, which is vertical.

### Typography

| Element | Figma style | desktop | mobile |
|---|---|---|---|
| `title` | `Title/sm-Bold` · `Body/lg-Bold` | 18 / 26 · 700 | 16 / 24 · 700 |
| `description` | `Body/lg-Regular` · `Body/md-Regular` | 16 / 24 · 400 | 14 / 20 · 400 |

---

## HTML

```html
<div class="empty-state-shell">
  <div role="status" aria-live="polite" class="empty-state">
    <div class="empty-state__body">
      <div class="empty-state__icon-box">
        <svg class="empty-state__icon" aria-hidden="true"><!-- de icon/system --></svg>
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

---

## ARIA

| Element | Attribute | Value |
|---|---|---|
| `root` | `role` | `status` |
| `root` | `aria-live` | `polite` |
| `icon` | `aria-hidden` | `true` |

**`role="status"` always**, in the three cases.

**When turning off the icon or the actions, they are removed from the DOM.** Inside a `status`, hiding with `display: none` leaves the node and it can be announced anyway.

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Moves focus to the first visible button, in DOM order. The block does **not** receive focus. |
| `Enter` · `Space` | Activates the button that has focus. |
| `Shift + Tab` | Goes back to the previous element. |

---

## Rules

| Tope | When going over |
|---|---|
| Title: **1 line** | The master cuts it with an ellipsis. Rewrite it shorter: the title says **what** is missing, not why. |
| Description: **2 lines** | The master cuts it. If it does not fit, the detail goes on the screen and not here. |
| **1 action** | Two actions are two exits, and the screen already did the choosing. The master has two slots, but none of its three use cases carries two buttons. |

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

---

## Accessibility

- **The title goes as a heading, and the screen sets the level.** The same block is `h2` on one page and `h3` inside a section. Skipping levels breaks navigation by headings, which is how many people navigate.
- **The icon goes `aria-hidden="true"`.** It complements the message and does not replace it, so it adds no accessible name.
- **Each button's text says what it does.** "See more" and "click here" are forbidden: out of context they mean nothing.
- **Measured contrast.** `text/base/secondary` (#5C5C5C) on `surface/base/default` (#FFFFFF) gives **7.0:1**. The `icon/base/default` icon (#0F202B) on `fill/base/light` (#F7F7F7) gives **16.4:1**. Both pass AA (WCAG 1.4.3).
- **The description is mandatory.** A title alone says what is missing; the description says what to do. Without it the block informs and does not help.
