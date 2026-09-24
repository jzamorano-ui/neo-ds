# Snackbar

> **Figma (source of truth):** [❖ Snackbar](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004642-25408) — visual validation against the master.

Communicates, for a moment, the result of an action or a change in the system, without interrupting the task. It floats over the page and leaves on its own.

**What separates it from `alert`, and it is the only thing:** the alert **takes layout and stays**; the snackbar **takes no layout and passes**. If the message has to stay until someone reads it, it is `alert`. If it promotes something, it is `banner`. If it demands a decision, it is `modal-dialog`.

---

## Properties

| Property | Tipo | Values |
|---|---|---|
| `Label` | Text | the message |
| `Button` | Boolean | true · false — draws the action |
| `Close` | Boolean | true · false — draws the ✕ |
| `device` | Variant | desktop · mobile |

**`device` does not reach the API.** The screen width decides the version through a media query at 576px — the `sm` breakpoint, the same one that already decides where it appears. Figma draws both because a master has no media queries.

**And two props are not in the master**, because they do not change a single pixel of the drawing:

| prop | why it is not in the master |
|---|---|
| `anchorOrigin` | where it anchors in the window. By default bottom right; the layout decides it |
| `autoHideDuration` | how many milliseconds it stays before leaving. 5000 by default. **It is half of what separates it from `alert`**, and time has no geometry |

---

## Props

```typescript
interface NeoSnackbarProps {
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (...args: unknown[]) => void  // The close handler. Its presence draws the ✕.
  message: ReactNode
  actions?: ReactNode                 // The call to action. One at most (C1).
  closable?: boolean                  // Draws the ✕. It needs `onClose` to do anything.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Snackbar
}
```

---

## Behavior

| What | How |
|---|---|
| Appearance | Automatic, when the action that caused it finishes |
| Duration | 5 seconds, configurable with `autoHideDuration` |
| Entry | Fades in while rising 16px, 250 ms, `easeOut` |
| Exit | Fades out while dropping 16px, 200 ms, `easeIn` |
| Reduced motion | Only the fade: no movement |
| Stacking | Up to 3 at a time, 8px apart |
| Placement | Bottom right, 32px from the edge. On mobile, full width with 16px on each side and 32px from the bottom |

### On mobile

Below 576px the snackbar takes the full width and changes its shape:

- The message and the ✕ stay on the first row; **the action drops to its own row**, aligned to the end.
- The message —the master's `decripción mensaje` layer— is cut at **two lines** with an ellipsis. The writing limit is **45 characters (2 lines on mobile)**: past it, the master cuts it, so rewrite it shorter — the snackbar says what happened, the detail belongs on the screen.
- With a single line, the message is centered on its row; with two, the icon goes with the first line and the ✕ is centered on the block.

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | — | background | `--fill--base--inverse` |
| `root` | — | color | `--text--base--contrast` |
| `message` | — | color | `--text--base--contrast` |
| `icon` | — | fill | `--surface--base--default` |

The `icon` is `semantic/info` in its inverse version, and its color comes in the path: neither the sheet nor the theme paints it. The rest are not painted by the snackbar either: the `action` is a `button` in `variant=secondary` · `size=small` · `surface=inverse`; and the `close` is a `button/icon` in `variant=tertiary` · `size=small` · `surface=inverse`.

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `padding-inline` | `--neo-space-lg` | 16px |
| `padding-block` | `--neo-space-md` | 12px |
| `gap` | `--neo-space-sm` | 8px |
| `padding-inline-start` of the action | `--neo-space-sm` | 8px |
| `border-radius` | `--neo-radius-lg` | 16px |
| icon | `--neo-icon-size-md` | 24px |
| ✕ | `--neo-icon-size-lg` | 32px |
| `min-height` of the message row | `--neo-icon-size-lg` | 32px |

The distances that come out of those numbers: message → action 16, action → ✕ 8, message → ✕ 8. With only the message, 16 on each side. Minimum height 56: the component does not shrink when the ✕ is not there. **No minimum width**: it hugs its content.

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `message` | `body/lg-bold` | 16px | 700 | 24px |

---

## HTML

```html
<div class="snackbar" role="status" aria-live="polite">
  <p class="snackbar__message">
    <span class="snackbar__icon" aria-hidden="true"><!-- semantic-info-inverse, from the sprite --></span>
    <span class="snackbar__text">No pudimos enviar la solicitud</span>
  </p>
  <div class="snackbar__action">
    <button type="button" class="btn btn--secondary btn--inverse btn--small">Reintentar</button>
  </div>
  <button type="button" class="btn btn--tertiary btn--inverse btn--small btn--icon-only snackbar__close" aria-label="Cerrar aviso">
    <svg aria-hidden="true"><use href="#system-close"></use></svg>
  </button>
</div>
```

The icon goes **inside** the message — it is the master's `icon + label` frame — and the text in its own node, because it is what gets cut on mobile. The action and the ✕ are `button` and `button/icon` with their own classes: the snackbar only gives them their place.

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Snackbar | `<div role="status">` | `aria-live="polite"` |
| Close button | `<button type="button">` | `aria-label="Cerrar aviso"` |
| Semantic icon | `<svg>` or wrapper | `aria-hidden="true"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Focus to the action and then to the ✕, in DOM order |
| `Enter` · `Space` | Activates the focused element |
| `Escape` | Closes the snackbar |

**It does not take the focus when it appears.** Stealing the focus for a confirmation interrupts, and the snackbar exists precisely not to interrupt.

---

## Rules

- A single message: brief, with no title or paragraph — one line on desktop and up to two on mobile.
- A single action, related to what just happened: «Deshacer» or «Reintentar». The ✕ does not count: closing is not an action.
- The icon is always `semantic/info`: the snackbar does not classify severity — that is `alert`.
- The ✕ is optional: it shows when it is worth being able to dismiss it before the 5 seconds.
- Do not use it for something that has to stay visible, for a confirmation that needs a decision, or when the problem prevents continuing.

---

## Accessibility

- `role="status"` with `aria-live="polite"`: the screen reader reads it without taking the person out of what they are doing.
- A snackbar without text communicates nothing: the message is required.
- The action is a `button`, **not a part of its own** — the same rule as `banner.action`: the container is a part, the control put inside it is not.
- **WCAG 2.2.1** — if it carries an action, give enough time to reach it: 5 seconds is the default, and it can be extended with `autoHideDuration`.
