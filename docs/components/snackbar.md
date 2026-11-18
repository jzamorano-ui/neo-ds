<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Snackbar

> **Figma (source of truth):** [❖ Snackbar](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40004642-25408) — visual validation against the master.

<!-- prosa:intro -->

Communicates, for a moment, the result of an action or a change in the system, without interrupting the task. It floats over the page and is brief: after a few seconds it asks to be closed, and the screen that opened it closes it.

**What separates it from `alert`, and it is the only thing:** the alert **takes layout and stays**; the snackbar **takes no layout and passes**. If the message has to stay until someone reads it, it is `alert`. If it promotes something, it is `banner`. If it demands a decision, it is `modal-dialog`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `device` | desktop · mobile — not a prop: the viewport width decides it (breakpoint 576px) |
| `Button` | true · false — default `true` |
| `Label` | text |
| `Close` | true · false — default `true` |

<!-- prosa:properties -->

**`device` does not reach the API.** The screen width decides the version through a media query at 576px — the `sm` breakpoint, the same one that already decides where it appears. Figma draws both because a master has no media queries.

**Two props are not in the master**, because they do not change a single pixel of the drawing: `anchorOrigin` (where it anchors in the window — the layout decides it) and `autoHideDuration` (how long it stays before asking to be closed). The second is half of what separates it from `alert`, and time has no geometry.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoSnackbarProps {
  open?: boolean                      // The panel or the bubble, open (controlled).
  onClose?: (event: SyntheticEvent | Event, reason: 'timeout' | 'clickaway' | 'escapeKeyDown' | 'closeButton') => void  // Called when the snackbar asks to close: when `autoHideDuration` runs out (`'timeout'`), with Esc, with a click outside and with the ✕ (`'closeButton'`). The snackbar does not close itself: set `open` to false here. Without it the timer does not start. The ✕ is drawn by `closable`, with or without this handler.
  message: ReactNode                  // The text of the notice. REQUIRED: without it there is nothing to say. Keep it short — about 45 characters, two lines on mobile.
  actions?: ReactNode                 // The call to action, a `NeoButton`. One at most (C1).
  closable?: boolean                  // Draws the ✕. It needs `onClose` to do anything.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Snackbar not listed above
}
```

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--fill--base--inverse` |
| `root` | default | color | `--text--base--contrast` |
| `icon` | default | fill | `--icon--base--contrast` |
| `message` | default | color | `--text--base--contrast` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | padding-block | — | `--neo-space-md` · 12px |
| `root` | padding-inline | — | `--neo-space-lg` · 16px |
| `root` | gap | — | `--neo-space-sm` · 8px |
| `root` | border-radius | — | `--neo-radius-lg` · 16px |
| `root` | min-height | — | 56px |
| `content` | gap | — | `--neo-space-sm` · 8px |
| `content` | padding-block | every device | `--neo-space-xs` 0px · 4px 0px |
| `icon` | width | — | `--neo-icon-size-md` · 24px |
| `icon` | height | — | `--neo-icon-size-md` · 24px |
| `action` | padding-inline | — | `--neo-space-sm` 0px · 8px 0px |
| `close` | width | — | `--neo-icon-size-lg` · 32px |
| `close` | height | — | `--neo-icon-size-lg` · 32px |
| `close` | border-radius | — | `--neo-radius-pill` · 999px |

<!-- prosa:layout -->

Below 576px the snackbar takes the full width and changes its shape:

- The message and the ✕ stay on the first row; **the action drops to its own row**, aligned to the end.
- The message —the master's `decripción mensaje` layer— is cut at **two lines** with an ellipsis, so write it short: the snackbar says what happened, the detail belongs on the screen.
- With a single line, the message is centered on its row; with two, the icon goes with the first line and the ✕ is centered on the block.

The icon is `semantic/info` in its inverse version, and its color comes in the path: neither the sheet nor the theme paints it. The `action` is a `button` in `variant=secondary` · `size=small` · `surface=inverse`; the `close` is a `button/icon` in `variant=tertiary` · `size=small` · `surface=inverse`. The snackbar only gives them their place.

<!-- /prosa:layout -->

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `message` | — | `Body/lg-Bold` | 16px | 700 | 24px |

---

## Motion

| Motion | Element | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|---|
| `enter` | `root` | enter | 250 ms | cubic-bezier(0, 0, 0.2, 1) | — |
| `exit` | `root` | exit | 200 ms | cubic-bezier(0.4, 0, 1, 1) | — |
| `dwell` | `root` | dwell | 5000 ms | — | pauses on hover · focus-within · after a pause it stays 2500 ms more |

---

## HTML

<!-- prosa:html -->

```html
<!-- Always on the page, empty: write the text of the message here when the snackbar appears, clear it when it leaves. -->
<span class="snackbar__status" role="status" aria-live="polite"></span>

<div class="snackbar" role="status" aria-live="off">
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

The icon goes **inside** the message — it is the master's `icon + label` frame — and the text in its own node, because it is what gets cut on mobile.

**Who announces is `snackbar__status`, not the pill.** A screen reader announces text that reaches a live region that was already on the page; a region that shows up already written — a snackbar that stops being `hidden`, or one that is mounted with its text — is not announced by every screen reader. So the region stays on the page from the start, out of sight and empty; write the text of the message into it when the snackbar appears and clear it when it leaves. The pill keeps `role="status"` and carries `aria-live="off"`, so the message is not said twice.

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `span[aria-live="polite"]` | `<span>` | `role="status"` · `aria-live="polite"` |
| `div[role="status"]` | `<div>` | `role="status"` · `aria-live="off"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the action and then to the ✕, in DOM order |
| `Enter · Space` | activates the focused element |
| `Escape` | closes the snackbar |

---

## Rules

| Limit | When exceeded |
|---|---|
| **message:** 45 characters (2 lines on mobile) | on mobile the master cuts it at two lines with an ellipsis (`maxLines: 2`). Rewrite it shorter: the snackbar says what happened, the detail belongs on the screen. |
| **on screen at once:** one | a second one covers the first: the component has no queue and every instance anchors to the same corner, so stacking them is the layout's job. |

| When | Then |
|---|---|
| always | message must be declared |
| `Close=true` | onClose must be declared |

<!-- prosa:rules -->

- A single message: brief, with no title or paragraph — one line on desktop and up to two on mobile.
- A single action, related to what just happened: «Deshacer» or «Reintentar». The ✕ does not count: closing is not an action.
- The icon is always `semantic/info`: the snackbar does not classify severity — that is `alert`.
- The ✕ is optional: it shows when it is worth being able to dismiss it before its time runs out.
- Do not use it for something that has to stay visible, for a confirmation that needs a decision, or when the problem prevents continuing.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`alert`](alert.md) | it reports inconsistent data |
| [`modal-dialog`](modal-dialog.md) | it asks for a confirmation |

---

## Accessibility

- The announcement is made by a status region (`role="status"`, `aria-live="polite"`) that is on the page before the message exists, out of sight and empty: the text of the message reaches it when the snackbar opens and leaves it when it closes. A live region that arrives already written is not announced by every screen reader; text that reaches a region that was already there is. It announces without interrupting what the user is doing, which is the very definition of the component.
- The visible container keeps `role="status"` and carries `aria-live="off"`: the message is announced once, by the region, and not a second time by a screen reader that does announce a region that arrives written.
- It does NOT take focus when it appears: stealing focus for a confirmation interrupts, and the snackbar exists precisely so as not to interrupt.
- If it has an action, that action is keyboard-reachable and the snackbar can NOT disappear on its own while focus is inside it.
- A snackbar without text communicates nothing: the message is required.

<!-- prosa:accessibility -->

- The action is a `button`, **not a part of its own** — the same rule as `banner.action`: the container is a part, the control put inside it is not.
- **WCAG 2.2.1** — if it carries an action, give enough time to reach it: 5 seconds is the default, and it can be extended with `autoHideDuration`.
- **`NeoSnackbar` brings the region that announces**: a visually hidden `<span role="status" aria-live="polite">` with the class `NeoSnackbar-status`, rendered next to the `Snackbar`, open or closed. It receives the drawn text of `message` after the snackbar opens and is emptied when it closes. Keep `NeoSnackbar` mounted and drive it with `open`: mounted already open, the region and its text arrive together (measured in Chrome), which is the case a screen reader may not announce. The region is one more child of whatever contains the snackbar, there even when it is closed: as the first child of a `Stack` with `spacing`, the element that follows takes the spacing (not with `useFlexGap`), so render the snackbar outside a container that spaces its children. While the snackbar is open a query for `role="status"` finds two elements, the region and the pill.
- **Not measured with a screen reader yet**: the pattern follows what was measured with VoiceOver and Safari on the loading indicators and their control regions: a region that is already there and receives text is announced, one that arrives written is not. The snackbar itself has not been listened to.

<!-- /prosa:accessibility -->
