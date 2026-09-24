# Link

> **Figma (source of truth):** [❖ Link](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=564-2268) — visual validation against the master.

Navigates to a URL, route or anchor. To run actions use `button`; if it visually looks like a link but triggers logic, use `button variant=Tertiary`.

**Two ways of use — they are not confused:**

| Use | What it is | When |
|---|---|---|
| **Standalone** | The Link **component** (with states and a touch target) | The link goes on its own line: a CTA, "See more", a footer link |
| **Inline** | A **styled text range** inside a paragraph — **not** the component | The link goes inside a sentence |

The component documented below is the **standalone** one. The inline one has its own section.

---

## Properties (standalone)

| Property | Values |
|---|---|
| `label` | the link text |
| `size` | xs (12px) · sm (14px) · md (16px) · lg (18px) |
| `surface` | default · **inverse** |
| `state` | default · focus · disabled |

- `size` must match the type of text where it is placed. Bold in `sm`/`md`/`lg`, medium in `xs`.
- **There is no `hover` or `active`**: they could not be told apart from the default. In code they are browser states, not variants.
- **`surface=inverse`** = link on a dark background (headers, banners, dark `tag`).
- **Always underlined** — there is no mode without underline (WCAG 1.4.1: color alone does not distinguish the link).

---

## Props

```typescript
interface NeoLinkProps {
  label?: ReactNode        // The visible text of the component.
  disabled?: boolean       // Not interactive: it takes neither focus nor clicks.
  children?: ReactNode     // The visible text, as MUI `children` —the same as `label`. One of the two is required: without either the control has no name.
  className?: string       // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>      // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown  // the rest flows to MUI's Link
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

> The standalone carries a **24px touch target** (WCAG 2.5.8 AA) — see Accessibility.

---

## Tokens

### Color (label + underline)

**The link has no color token of its own — it inherits the color of the surrounding text** (`color: inherit`, same as MUI). It is distinguished by the **underline**, not by color.

Across the master's 24 variants (4 sizes × 3 states × 2
surfaces), the color does not change with the size. The master does not draw `hover` or `active` —the text
color **does not change** in either of them, and neither does the underline—.

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `label` | — · focus | color | `--text--base--default` (inherited from the surrounding text) |
| `label` | surface=inverse · surface=inverse focus | color | `--text--base--contrast` (heredado) |
| `label` | disabled · surface=inverse disabled | color | `--text--base--disabled` |
| `link` (contenedor) | focus | outline | `--focus--ring--default` |
| `link` (contenedor) | focus | box-shadow (gap) | `--focus--gap--default` |
| `link` (contenedor) | surface=inverse focus | outline | `--focus--ring--inverse` |
| `link` (contenedor) | surface=inverse focus | box-shadow (gap) | `--focus--gap--inverse` |

The focus ring is **two layers** —ring and gap—, both of `--neo-stroke-focus-ring-width`,
as in `button`: in the master the ring is the container's stroke and the gap the content frame's.

The underline uses `currentColor` (= the inherited text color) — it carries no token of its own.

### Underline (`::after`, MUI-literal)

The underline is an `::after` pseudo-element (a `currentColor` bar), **always solid and without states**. The text color **does not change**.

| Property | Value |
|---|---|
| color | `currentColor` (= the inherited text color) |
| grosor | `--neo-stroke-xs` (1px) |
| opacidad | **1.0** in all states |
| offset | 2px (`bottom`) |

> **Why solid and not dimmed:** MUI dims the underline to `alpha(color,.4)` **only in the `color !== 'inherit'` branch** (`Link.js` v5.18); with `color: 'inherit'` —our config, since `text/link` was removed— it leaves the underline solid and hover changes nothing. Dimmed, the underline would be **2.47:1** on white, and since the link is not distinguished by color, the underline is its only identifier and WCAG 1.4.11 asks for 3:1. Solid gives **16.64:1**.

> **Figma ↔ dev note:** in **code** the underline is an `::after`. In **Figma**, the standalone draws it with a **line** (a separate rectangle) — because the label is tied to the editable text property and a text mutation is re-synced to the default variant. They look the same; it is only the representation. The **inline** one in Figma uses native underline (it is a range, not a component with a property).

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| Touch target (standalone) | — | **24px min** (WCAG 2.5.8 AA) |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |
| `border-radius` (focus ring) | `--neo-radius-xs` | 4px |

### Typography

**The link goes in BOLD**: medium went unnoticed, and since the link is not distinguished by color, weight adds affordance next to the underline. **`xs` is the exception and stays medium** — at 12px the scale has no bold (`captionSmBold` does not exist) and creating it would be a new token for the least used size.

| Size | Style | MUI variant (code) | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `xs` | `caption/sm-medium` | `captionSmMedium` | 12px | **500** | 16px |
| `sm` | `body/md-bold` | `bodyMdBold` | 14px | **700** | 20px |
| `md` | `body/lg-bold` | `bodyLgBold` | 16px | **700** | 24px |
| `lg` | `title/sm-bold` | `titleSmBold` | 18px | **700** | 26px |

> **How it is applied in code:** MUI's `<Link>` **has no `size` prop** — it inherits the context's typography (design decision: the size is not a prop of the component). The size and weight are chosen with the typography variant: `<Link variant="bodyLgBold">` for `size=md`, and so on per the table. In **inline** no variant is passed: it inherits the paragraph, including its weight.

---

## Inline link (inside a paragraph)

**It does not use the component.** It is paragraph text with link treatment — like bold or italics.

- **Size:** inherited from the paragraph — it is not chosen.
- **Accessibility:** exempt from the touch target (WCAG 2.5.8, inline exception: its size is limited by the line-height of the surrounding text).
- **Behavior** (hover, focus, click): handled by the browser — it is a real `<a>`.

### In code

```html
<p>Al registrarte, aceptas nuestra <a href="/privacy" class="link">política de privacidad</a> para continuar.</p>

```

```css
/* the inline inherits the <p>'s font-size/line-height/baseline — do NOT touch the flow */
/* ❌ nunca en inline: display:inline-flex · min-height · padding · font-size propio */
```

### In Figma

A **single text node** for the whole paragraph, with a uniform line-height. The link's range gets: **underline + Medium** (it inherits the text color — no color of its own). The size stays the text's. (Never change the line-height of the range alone — it gets misaligned.)

---

## HTML (standalone)

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

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| Link | `<a href="…">` | descriptive text — "click here" · "see" · "more info" are forbidden |
| Link disabled | `<a>` | no `href`, and no `aria-disabled`: without `href` the anchor has no role that takes it. It leaves the tab order, stops navigating and is read as text (ARIA in HTML) |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Moves focus to the link |
| `Shift + Tab` | Focus to the previous element |
| `Enter` | Navigates to the destination |

---

## Rules

- The link **is always underlined** (WCAG 1.4.1). There is no mode without underline.
- **Inline vs standalone:** inside a sentence → inline (a text range); isolated on its line → the component.
- `size` (standalone) must match the surrounding text. **The inline one inherits the size** of the paragraph.
- The label goes **bold** in `sm`, `md` and `lg`; **`xs` stays medium** (there is no bold at 12px in the scale).
- **`hover` and `active` are not variants** of the component: the link has no color or underline states, so they could not be told apart from the default. The affordance comes from the cursor and the permanent underline. `default`, `focus` and `disabled` remain — measured in the master: **24 variants** = 4 sizes × 3 states × 2 surfaces.
- The underline is **solid in all states** — the text color **does not change** (it inherits `text/base`). Always visible (WCAG 1.4.1) and with enough contrast to identify the link (WCAG 1.4.11).
- `surface=inverse` for links on a dark background; on a light surface use the default.
- Use disabled sparingly — prefer removing the link if it is not navigable.

---

## Accessibility

- **WCAG 1.4.1** — always underlined; color alone does not distinguish the link.
- **WCAG 2.4.4** — link text descriptive on its own.
- **WCAG 2.4.7** — focus always visible. Do not suppress `state=focus`.
- **WCAG 2.5.8 (AA)** — **standalone:** 24×24px minimum touch target. **Inline:** exempt (its size is limited by the line-height of the surrounding text).
