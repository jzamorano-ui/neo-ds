<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Alert

> **Figma (source of truth):** [❖ Alert](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=881-18695) — visual validation against the master.

<!-- prosa:intro -->

Communicates system messages the user needs to read. Not for decoration or navigation states. If what is communicated is the state of an element and not a message, it is `badge`; if it is promotional or part of a campaign, `banner`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `type` | info · success · warning · error — default `info` |
| `title-text` | text |
| `description` | text |
| `title` | true · false — default `true` |
| `link` | true · false — default `true` |
| `close` | true · false — default `true` |

<!-- prosa:properties -->

`link=true` requires `title=true`. `close=true` and `link=true` can coexist.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoAlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'  // the semantic nature of the message — the color, the icon and the ARIA role derive from it (C6) Default: 'info'.
  title?: ReactNode                   // The title. It is a prop and not content because `aria-labelledby` anchors to it.
  children?: ReactNode                // The content. Whoever uses the component provides it; in the stories it comes from the minimal example.
  onClose?: (event: SyntheticEvent) => void  // The close handler. Its presence draws the ✕.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Alert not listed above
}
```

---

## Tokens

### Color

<!-- prosa:color -->

The semantic icon is a four-region vector: the disc takes the semantic icon color of the `type` and the glyph `--icon--base--contrast` — the spec names the disc, which is what gives the alert its color.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | type=info | background | `--fill--semantic--info--soft` |
| `root` | type=info | border | `--border--semantic--info` |
| `root` | type=success | background | `--fill--semantic--success--soft` |
| `root` | type=success | border | `--border--semantic--success` |
| `root` | type=warning | background | `--fill--semantic--warning--soft` |
| `root` | type=warning | border | `--border--semantic--warning` |
| `root` | type=error | background | `--fill--semantic--error--soft` |
| `root` | type=error | border | `--border--semantic--error-soft` |
| `icon` | type=info | fill | `--icon--semantic--info` |
| `icon` | type=success | fill | `--icon--semantic--success` |
| `icon` | type=warning | fill | `--icon--semantic--warning` |
| `icon` | type=error | fill | `--icon--semantic--error` |
| `title` | type=info | color | `--text--semantic--info` |
| `title` | type=success | color | `--text--semantic--success` |
| `title` | type=warning | color | `--text--semantic--warning` |
| `title` | type=error | color | `--text--semantic--error` |
| `close` | default | background | `--fill--tertiary--default` |
| `close` | default | fill | `--icon--base--default` |
| `link` · `description` | default | color | `--text--base--default` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-xs` · 4px |
| `root` | padding-inline | — | `--neo-space-lg` · 16px |
| `root` | padding-block | — | `--neo-space-md` · 12px |
| `root` | border-radius | — | `--neo-radius-sm` · 8px |
| `root` | border-width | — | `--neo-stroke-xs` · 1px |
| `icon` | width | — | `--neo-icon-size-md` · 24px |
| `icon` | height | — | `--neo-icon-size-md` · 24px |
| `icon` | padding-block | — | `--neo-space-xs` 0px · 4px 0px |
| `body` | gap | — | `--neo-space-xs` · 4px |
| `text` | gap | — | `--neo-space-xs` · 4px |
| `text` | padding-block | — | `--neo-space-xs` · 4px |
| `close` | width | — | `--neo-icon-size-lg` · 32px |
| `close` | height | — | `--neo-icon-size-lg` · 32px |
| `close` | border-radius | — | `--neo-radius-pill` · 999px |
| `close` | padding-block | — | 0px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height | Max lines |
|---|---|---|---|---|---|---|
| `title-text` | — | `Title/xs-Bold` | 14px | 700 | 20px | — |
| `description` | — | `Body/md-Regular` | 14px | 400 | 20px | 3 lines |

---

## HTML

<!-- prosa:html -->

```html
<!-- Info alert with title, link and close -->
<!-- Structure: icon · content[ text(title+desc) · link ] · close -->
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

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` | `<div>` | `role="alert"` (type=error · warning) · `role="status"` (type=info · success) · `aria-live="polite"` (type=info · success) · `aria-live="assertive"` (type=error · warning) |

<!-- prosa:aria -->

`error` and `warning` interrupt the reader, so they also carry `aria-live="assertive"`; `info` and `success` inform without cutting in.

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the link and/or the close button, in DOM order. The container takes NO focus. |
| `Enter · Space` | activates the element that has focus |
| `Shift + Tab` | goes back to the previous element |

---

## Rules

| Limit | When exceeded |
|---|---|
| **alerts per context:** a single alert per context | merge the messages into one — two alerts compete to be the important one (C1) |
| **description:** must not exceed 3 lines | it does not break: it reads worse. Rewrite it shorter. |

| When | Then |
|---|---|
| `type=error` | role must be alert |
| `type=warning` | role must be alert |
| `link=true` | title must be true |
| always | description must be declared |

<!-- prosa:rules -->

- `error` with `close=false` means the error must be resolved before continuing.
- Do not use `error` for warnings → `warning`. Do not use `info` for confirmations → `success`.
- `link=true` must be unique and secondary to the message — it does not replace the main content.
- Place the alert near the affected content, not as a global floating element.
- The alert takes 100% of the parent container's width.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`badge`](badge.md) | what is communicated is the state of an element, not a system message |
| [`banner`](banner.md) | the message is promotional or part of a campaign, not from the system |

---

## Accessibility

- The close button carries `aria-label="Cerrar alerta"`: an icon is not a name.
- The semantic icon is `aria-hidden="true"` — the role and the text already say what it means.
- The link text is descriptive. «ver más» and «clic aquí» are forbidden.
- On close it is NOT hidden with `display: none`: use `aria-hidden` or remove it from the DOM.
- WCAG 1.4.3 — `text/semantic/*` on `fill/semantic/*/soft` meets 4.5:1 AA in all four types.

<!-- prosa:accessibility -->

- **WCAG 1.4.11** — semantic icons on soft backgrounds meet the 3:1 minimum.
- **WCAG 2.5.8 (AA)** — 24px touch target: the `link` is **inline** (inside the text block) → **exempt** from the minimum. If a 24px clickable area is required, achieve it with `padding: 6px` + `margin: -6px` (the area grows **without pushing the layout**) — never visual padding that enlarges the box. The close button is a Small `button/icon` of 32px (well above it).
- `role="alert"` interrupts: use it only when attention is immediate.

<!-- /prosa:accessibility -->
