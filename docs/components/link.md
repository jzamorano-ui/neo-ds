<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Link

> **Figma (source of truth):** [❖ Link](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=564-2268) — visual validation against the master.

<!-- prosa:intro -->

Navigates to a URL, route or anchor. To run actions use `button`; if it visually looks like a link but triggers logic, use `button variant=Tertiary`.

**Two ways of use — they are not confused:**

| Use | What it is | When |
|---|---|---|
| **Standalone** | The Link **component** (with states and a touch target) | The link goes on its own line: a CTA, "See more", a footer link |
| **Inline** | A **styled text range** inside a paragraph — **not** the component | The link goes inside a sentence |

The component documented below is the **standalone** one. The inline one has its own section.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `size` | xs · sm · md · lg — not a prop: inherited from the typography |
| `surface` | default · inverse — not a prop: inherited from the surface |
| `state` | default · focus · disabled |
| `label` | text |

<!-- prosa:properties -->

- `size` must match the type of text where it is placed. Bold in `sm`/`md`/`lg`, medium in `xs`.
- **There is no `hover` or `active`**: they could not be told apart from the default. In code they are browser states, not variants.
- **`surface=inverse`** = link on a dark background (headers, banners, dark `tag`).
- **Always underlined** — there is no mode without underline (WCAG 1.4.1: color alone does not distinguish the link).

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoLinkProps {
  label?: ReactNode                   // The visible text of the component.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  children?: ReactNode                // The visible text, as MUI `children` —the same as `label`. One of the two is required: without either the control has no name.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Link not listed above
}
```

---

## Tokens

### Color

<!-- prosa:color -->

**The link has no color token of its own — it inherits the color of the surrounding text** (`color: inherit`, same as MUI). It is distinguished by the **underline**, not by color.

Across the master's 24 variants, the color does not change with the size. The master does not draw `hover` or `active` —the text
color **does not change** in either of them, and neither does the underline—.

The focus ring is **two layers** —ring and gap—, as in `button`: in the master the ring is the container's stroke and the gap the content frame's.

The underline is an `::after` pseudo-element (a `currentColor` bar), **always solid and without states**: it carries no token of its own.

> **Why solid and not dimmed:** MUI dims the underline to `alpha(color,.4)` **only in the `color !== 'inherit'` branch** (`Link.js` v5.18); with `color: 'inherit'` —our config, since `text/link` was removed— it leaves the underline solid and hover changes nothing. Dimmed, the underline would be **2.47:1** on white, and since the link is not distinguished by color, the underline is its only identifier and WCAG 1.4.11 asks for 3:1. Solid gives **16.64:1**.

> **Figma ↔ dev note:** in **code** the underline is an `::after`. In **Figma**, the standalone draws it with a **line** (a separate rectangle) — because the label is tied to the editable text property and a text mutation is re-synced to the default variant. They look the same; it is only the representation. The **inline** one in Figma uses native underline (it is a range, not a component with a property).

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | surface=default focus | outline | `--focus--ring--default` |
| `root` | surface=default focus | box-shadow | `--focus--gap--default` |
| `root` | surface=inverse focus | outline | `--focus--ring--inverse` |
| `root` | surface=inverse focus | box-shadow | `--focus--gap--inverse` |
| `label` | surface=default | color | `--text--base--default` |
| `label` | surface=default focus | color | `--text--base--default` |
| `label` | surface=inverse | color | `--text--base--contrast` |
| `label` | surface=inverse focus | color | `--text--base--contrast` |
| `label` | disabled — every combination | color | `--text--base--disabled` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | 1px |
| `root` | border-radius | — | 4px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `label` | xs | `Caption/sm-Medium` | 12px | 500 | 16px |
| `label` | sm | `Body/md-Bold` | 14px | 700 | 20px |
| `label` | md | `Body/lg-Bold` | 16px | 700 | 24px |
| `label` | lg | `Title/sm-Bold` | 18px | 700 | 26px |

<!-- prosa:typography -->

**The link goes in BOLD**: medium went unnoticed, and since the link is not distinguished by color, weight adds affordance next to the underline. **`xs` is the exception and stays medium** — at 12px the scale has no bold (`captionSmBold` does not exist) and creating it would be a new token for the least used size.

> **How it is applied in code:** MUI's `<Link>` **has no `size` prop** — it inherits the context's typography (design decision: the size is not a prop of the component). The size and weight are chosen with the typography variant, which is the text style in camelCase: `<Link variant="bodyLgBold">` for `Body/lg-Bold` (`size=md`). In **inline** no variant is passed: it inherits the paragraph, including its weight.

<!-- /prosa:typography -->

---

## HTML

<!-- prosa:html -->

```html
<!-- Standalone with touch target -->
<a href="/terms" class="link link--standalone">Ver términos y condiciones</a>
```

```html
<!-- Standalone on a dark background: the link INHERITS the context's color (color: inherit), so
     it carries no class of its own. The container is YOURS, not the system's; what the system provides are the
     two tokens that go together: the inverse surface and the contrast text. -->
<div style="background: var(--surface--base--inverse); color: var(--text--base--contrast); padding: var(--neo-space-lg)">
  <a href="/more" class="link link--standalone">Ver más</a>
</div>
```

```html
<!-- Disabled: without href it neither navigates nor takes focus, and role + aria-disabled say it is a link that is off -->
<a class="link link--standalone link--disabled" role="link" aria-disabled="true">Ver más</a>
```

### Inline link (inside a paragraph)

**It does not use the component.** It is paragraph text with link treatment — like bold or italics.

- **Size:** inherited from the paragraph — it is not chosen.
- **Accessibility:** exempt from the touch target (WCAG 2.5.8, inline exception: its size is limited by the line-height of the surrounding text).
- **Behavior** (hover, focus, click): handled by the browser — it is a real `<a>`.

```html
<p>Al registrarte, aceptas nuestra <a href="/privacy" class="link">política de privacidad</a> para continuar.</p>
```

```css
/* the inline inherits the <p>'s font-size/line-height/baseline — do NOT touch the flow */
/* ❌ never on the inline: display:inline-flex · min-height · padding · a font-size of its own */
```

In Figma: a **single text node** for the whole paragraph, with a uniform line-height. The link's range gets: **underline + Medium** (it inherits the text color — no color of its own). The size stays the text's. (Never change the line-height of the range alone — it gets misaligned.)

<!-- /prosa:html -->

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the link |
| `Enter` | navigates — a link is NOT activated with Space, unlike a button |

---

## Rules

<!-- prosa:rules -->

- The link **is always underlined** (WCAG 1.4.1). There is no mode without underline.
- **Inline vs standalone:** inside a sentence → inline (a text range); isolated on its line → the component.
- `size` (standalone) must match the surrounding text. **The inline one inherits the size** of the paragraph.
- **`hover` and `active` are not variants** of the component: the link has no color or underline states, so they could not be told apart from the default. The affordance comes from the cursor and the permanent underline.
- `surface=inverse` for links on a dark background; on a light surface use the default.
- Use disabled sparingly — prefer removing the link if it is not navigable.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`button`](button.md) | the action makes something happen instead of navigating |

---

## Accessibility

- The text describes the destination. «ver más» and «clic aquí» are forbidden: out of context they say nothing, and a screen reader can list links on their own.
- Without an `href` it is not a link: if it does not navigate, it is a `button`. The one exception is the disabled link, which loses its `href` on purpose —ARIA in HTML asks for it, and advises against `aria-disabled` on a link with a destination—: it leaves the tab order and stops navigating, and it keeps saying what it is with `role="link"` and `aria-disabled="true"`, which ARIA in HTML allows on an anchor without `href`.
- The focus ring is triggered only by the keyboard (C4).

<!-- prosa:accessibility -->

- **WCAG 1.4.1** — always underlined; color alone does not distinguish the link.
- **WCAG 2.4.4** — link text descriptive on its own.
- **WCAG 2.4.7** — focus always visible. Do not suppress `state=focus`.
- **WCAG 2.5.8 (AA)** — **standalone:** 24×24px minimum touch target. **Inline:** exempt (its size is limited by the line-height of the surrounding text).

<!-- /prosa:accessibility -->
