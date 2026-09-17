# Alert

> **Figma (source of truth):** [❖ Alert](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=881-18695) — visual validation against the master.

Communicates system messages the user needs to read. Not for decoration or navigation states. If what is communicated is the state of an element and not a message, it is `badge`; if it is promotional or part of a campaign, `banner`.

---

## Properties

| Property | Tipo | Values |
|---|---|---|
| `type` | Variant | info · success · warning · error |
| `title` | Boolean | true · false |
| `title-text` | Text | the title text |
| `description` | Text | the message body |
| `close` | Boolean | true · false |
| `link` | Boolean | true · false |

`link=true` requires `title=true`. `close=true` and `link=true` can coexist.

---

## Props

```typescript
interface NeoAlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'  // the semantic nature of the message — the color, the icon and the ARIA role derive from it (C6) Default: 'info'.
  title?: ReactNode                   // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  onClose?: (...args: unknown[]) => void  // The close handler. Its presence draws the ✕.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Alert
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

---

## Tokens

### Color

The semantic
icon is a four-region vector: the disc takes `icon/semantic/<type>` and the glyph
`icon/base/contrast` — the spec names the disc, which is what gives the alert its color.

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| contenedor | type=info | background | `--fill--semantic--info--soft` |
| contenedor | type=info | border | `--border--semantic--info` |
| contenedor | type=success | background | `--fill--semantic--success--soft` |
| contenedor | type=success | border | `--border--semantic--success` |
| contenedor | type=warning | background | `--fill--semantic--warning--soft` |
| contenedor | type=warning | border | `--border--semantic--warning` |
| contenedor | type=error | background | `--fill--semantic--error--soft` |
| contenedor | type=error | border | `--border--semantic--error-soft` |
| `título` | type=info | color | `--text--semantic--info` |
| `título` | type=success | color | `--text--semantic--success` |
| `título` | type=warning | color | `--text--semantic--warning` |
| `título` | type=error | color | `--text--semantic--error` |
| `link` | — | color | inherits `--text--base--default` (no token of its own) |
| `descripción` | — | color | `--text--base--default` |
| `ícono semántico` | type=info | fill | `--icon--semantic--info` |
| `ícono semántico` | type=success | fill | `--icon--semantic--success` |
| `ícono semántico` | type=warning | fill | `--icon--semantic--warning` |
| `ícono semántico` | type=error | fill | `--icon--semantic--error` |
| `botón cierre` | — | background | `--fill--tertiary--default` |
| `botón cierre` | — | fill | `--icon--base--default` |

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `padding-inline` | `--neo-space-lg` | 16px |
| `padding-block` | `--neo-space-md` | 12px |
| `gap` (icon · content · button) | `--neo-space-sm` | 8px |
| `gap` interno (title ↔ desc) | `--neo-space-xs` | 4px |
| `padding-block` of the text block | `--neo-space-xs` | 4px |
| `gap` text block ↔ link | `--neo-space-xs` | 4px |
| `border-radius` | `--neo-radius-sm` | 8px |
| `border-width` | `--neo-stroke-xs` | 1px |

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `título` | `title/xs-bold` | 14px | 700 | 20px |
| `descripción` | `body/md-regular` | 14px | 400 | 20px |
| `link` | `body/md-medium` | 14px | 500 | 20px |

---

## HTML

```html
<!-- Info alert with title, link and close -->
<!-- Estructura: icon · content[ text(title+desc) · link ] · close -->
<div role="status" aria-live="polite" class="alert alert--info">
  <span class="alert__icon" aria-hidden="true"><!-- icon/semantic/info --></span>
  <div class="alert__body">
    <div class="alert__text">
      <p class="alert__title">Título informativo</p>
      <p class="alert__description">Descripción del mensaje.</p>
    </div>
    <a class="alert__link" href="…">Ver detalle</a>
  </div>
  <!-- The close uses `.alert__close`, not a generic `.btn`: it is a 32px box. -->
  <button type="button" aria-label="Cerrar alerta" class="alert__close">
    <svg aria-hidden="true"><use href="#system-close"></use></svg>
  </button>
</div>

<!-- Error alert without close — the error must be resolved before continuing. -->
```

```html

<div role="alert" aria-live="assertive" class="alert alert--error">
  <span class="alert__icon" aria-hidden="true"><!-- icon/semantic/error --></span>
  <div class="alert__body">
    <p class="alert__title">Error de validación</p>
    <p class="alert__description">Descripción del error.</p>
  </div>
</div>
```

---

## ARIA

| Element | Tag · Role | Required attributes |
|---|---|---|
| Urgent alert (error · warning) | `<div role="alert">` | `aria-live="assertive"` |
| Non-urgent alert (info · success) | `<div role="status">` | `aria-live="polite"` |
| Close button | `<button type="button">` | `aria-label="Cerrar alerta"` |
| Semantic icon | `<svg>` or wrapper | `aria-hidden="true"` |
| Link embebido | `<a>` | descriptive text — "see more" · "click here" are forbidden |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Focus to the link (`link=true`) and/or the close button (`close=true`) in DOM order |
| `Enter` · `Space` | Activates the focused element |
| `Shift + Tab` | Goes back to the previous element |

The alert's container does not receive focus — only its inner actionable elements do.

---

## Rules

- A single alert per context — consolidate messages if there are several.
- The description must not exceed 3 lines of text — a clear, to-the-point message.
- `error` with `close=false` means the error must be resolved before continuing.
- Do not use `error` for warnings → `warning`. Do not use `info` for confirmations → `success`.
- `link=true` must be unique and secondary to the message — it does not replace the main content.
- Place the alert near the affected content, not as a global floating element.
- The alert takes 100% of the parent container's width.
- Do not hide it with `display: none` when closing — use `aria-hidden` or remove it from the DOM.

---

## Accessibility

- **WCAG 1.4.3** — `text/semantic/*` tokens on `fill/semantic/*/soft` meet the 4.5:1 AA minimum in all variants.
- **WCAG 1.4.11** — semantic icons on soft backgrounds meet the 3:1 minimum.
- **WCAG 2.5.8 (AA)** — 24px touch target: the `link` is **inline** (inside the text block) → **exempt** from the minimum. If a 24px clickable area is required, achieve it with `padding: 6px` + `margin: -6px` (the area grows **without pushing the layout**) — never visual padding that enlarges the box. The close button is a Small `button/icon` of 32px (well above it).
- `role="alert"` triggers `aria-live="assertive"` — use it only when attention is immediate. For `info` and `success` use `role="status"`.
