# Button / Icon

> **Figma (source of truth):** [❖ Button/Icon](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=561-10356) — visual validation against the master.

Runs an action that is understood by its icon: close, back, add, more options. It is square,
carries no text, and that is why its `aria-label` is not optional — it is the only name it has.

It shares the palette of [button](button.md) and **shares nothing else**: another box, other parts, and no
loading state. In the master it is another component, with its own 135 variants.

---

## Properties

| Property | Values |
|---|---|
| `type` | system · brand (default: system) |
| `variant` | primary · secondary · tertiary (default: primary) |
| `size` | small · medium · large (default: large) |
| `surface` | default · inverse (default: default) |
| `state` | default · hover · active · focus · disabled |

**Combinations:** `brand` **only exists on `surface=default`**. There are 135 variants: 90 of the system
(two surfaces) and 45 of brand (a single one). There is no `loading` — that belongs to `button`.

**The glyph is not a property of the master.** It is swapped by entering the instance, so it is chosen
by whoever uses it: in React it goes in as a child, in the plain layer as an `<svg>` inside the button.

**Its size is the button's by default, and the icon can say its own.** In an instance its size is chosen in the panel. In code, an icon
with a size class from the icon scale keeps it, in the theme and in the plain layer. Use it to go one
step up —a notification bell in a desktop header, `lg` inside `large`— without changing the box.

---

## Props

```typescript
interface NeoButtonIconProps {
  family?: 'system' | 'brand'         // semantic family — the same as `button` Default: 'system'.
  variant?: 'primary' | 'secondary' | 'tertiary'  // visual hierarchy Default: 'primary'.
  size?: 'small' | 'medium' | 'large'  // size adjustment — the button is SQUARE: 32 · 40 · 48, and the glyph scales with it (16 · 20 · 24) Default: 'large'.
  surface?: 'default' | 'inverse'     // the surface it sits on Default: 'default'.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's IconButton
}
```

The wrapper is `NeoButtonIcon`, on top of MUI's **`IconButton`**. `IconButton` has no `variant` —that belongs to `Button`—
so the hierarchy travels as `data-variant` and the theme paints it, the same mechanism `button`
already used for the three brand ones.

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| root | variant=primary | background | `--fill--primary--default` |
| root | variant=primary hover | background | `--fill--primary--hover` |
| root | variant=primary active | background | `--fill--primary--active` |
| root | variant=secondary | background | `--fill--secondary--default` |
| root | variant=secondary hover | background | `--fill--secondary--hover` |
| root | variant=secondary active | background | `--fill--secondary--active` |
| root | variant=tertiary | background | `--fill--tertiary--default` |
| root | variant=tertiary hover | background | `--fill--tertiary--hover` |
| root | variant=tertiary active | background | `--fill--tertiary--active` |
| root | variant=primary surface=inverse | background | `--fill--primary--inverse--default` |
| root | variant=secondary surface=inverse | background | `--fill--secondary--inverse--default` |
| root | variant=secondary surface=inverse | border | `--border--base--contrast` |
| root | variant=tertiary surface=inverse | background | `--fill--tertiary--inverse--default` |
| root | type=brand variant=primary | background | `--fill--brand--primary--default` |
| root | type=brand variant=secondary | background | `--fill--brand--secondary--default` |
| root | type=brand variant=tertiary | background | `--fill--brand--tertiary--default` |
| root | disabled | background | `--fill--base--disabled` |
| root | focus | outline | `--focus--ring--default` |
| root | focus | box-shadow | `--focus--gap--default` |
| root | surface=inverse focus | outline | `--focus--ring--inverse` |
| root | surface=inverse focus | box-shadow | `--focus--gap--inverse` |
| `icono` | variant=primary | fill | `--icon--base--contrast` |
| `icono` | variant=secondary | fill | `--icon--base--default` |
| `icono` | variant=tertiary | fill | `--icon--base--default` |
| `icono` | variant=primary surface=inverse | fill | `--icon--base--default` |
| `icono` | variant=secondary surface=inverse | fill | `--icon--base--contrast` |
| `icono` | variant=tertiary surface=inverse | fill | `--icon--base--contrast` |
| `icono` | type=brand variant=primary | fill | `--icon--base--contrast` |
| `icono` | type=brand variant=secondary | fill | `--icon--base--brand-strong` |
| `icono` | type=brand variant=tertiary | fill | `--icon--base--brand-strong` |
| `icono` | disabled | fill | `--icon--base--disabled` |

> **The glyph does not inherit the text color, and it is not a detail.** `--icon--base--disabled` (#C9C9C9) and
> `--text--base--disabled` (#ABABAB) are not the same color: a disabled button that inherits paints the
> icon a similar and wrong gray. That is why each family declares its own.

> **Focus is TWO rings.** The outer one is painted by the root (`focus/ring`, 4) and the inner one by the master's
> `main_button` layer (`focus/gap`, 2). It is the system's focus convention, the same as
> `button` and `link`, and on an inverse surface both tokens switch to their `inverse` branch.

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `width` · `height` — small | `--neo-button-height-sm` | 32px |
| `width` · `height` — medium | `--neo-button-height-md` | 40px |
| `width` · `height` — large | `--neo-button-height-lg` | 48px |
| `border-radius` | `--neo-radius-pill` | 999px |
| `border-width` (only secondary on inverse) | `--neo-stroke-xs` | 1px |
| glyph size — small | `--neo-icon-size-xs` | 16px |
| glyph size — medium | `--neo-icon-size-sm` | 20px |
| glyph size — large | `--neo-icon-size-md` | 24px |
| glyph size — one step up, the icon's own class (`.icon--lg`) | `--neo-icon-size-lg` | 32px |
| `padding` | — | 0 — the button is square and the glyph is centered |

The three sides are the **same heights as `button`**: that is what keeps an icon button and one
with a label aligned in the same row.

---

## HTML

The plain layer draws it as a `button` with the `--icon-only` modifier: it shares background, focus and
states with [button](button.md), and this sheet gives it the square box.

```html
<button type="button" class="btn btn--tertiary btn--medium btn--icon-only" aria-label="Cerrar">
  <svg aria-hidden="true"><use href="#system-close"></use></svg>
</button>
```

```html
<!-- brand, size large: solid coral -->
<button type="button" class="btn btn--brand btn--primary btn--large btn--icon-only" aria-label="Agregar">
  <svg aria-hidden="true"><use href="#system-add"></use></svg>
</button>
```

```html
<!-- large with the icon one step up: the box stays 48 and the glyph takes its own size, 32 -->
<button type="button" class="btn btn--tertiary btn--large btn--icon-only" aria-label="Notificaciones">
  <svg class="icon--lg" aria-hidden="true"><use href="#system-bell"></use></svg>
</button>
```

```html
<!-- small, on a dark background: the only variant that draws a stroke. The dark container is YOURS, not
     the system's; what the system provides is the pair of tokens that go together —the inverse surface
     and the contrast glyph—. Without it, `fill/secondary/inverse/default` is transparent white and the
     white glyph disappears: measured in the guide, 1.00:1. -->
<div style="background: var(--surface--base--inverse); padding: var(--neo-space-lg)">
  <button type="button" class="btn btn--secondary btn--inverse btn--small btn--icon-only" aria-label="Volver">
    <svg aria-hidden="true"><use href="#system-arrow-left"></use></svg>
  </button>
</div>
```

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| Button | `<button type="button">` | `aria-label` with the action |
| Icon | `<svg>` | `aria-hidden="true"` |

The `aria-label` names **the action, not the drawing**: "Close", not "X". If the button opens something that
stays open, also `aria-expanded`.

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the button |
| `Enter` · `Space` | runs the action |

---

## Rules

- **Only for actions that are recognized without text.** If it needs explaining, it is `button` with a label.
- **Exactly 1 icon, not two.** Two glyphs in an icon button do not read as one action: if
  two things are needed, they are two buttons (C1).
- **The minimum touch box is `small`'s 32.** Below that the component is not offered.
- **The icon can go one step up** —`lg` inside `large`— when the glyph alone does not read, for example a
  notification bell in a desktop header. The box does not change; one action per button, always with `aria-label`.
- A `tooltip` on top is welcome to show the label on hover — but the `aria-label` is still
  mandatory: the tooltip is seen, it is not read aloud.

---

## Accessibility

- Without an `aria-label` the button is **mute** to a screen reader: it is the most expensive defect of this
  component and the easiest to make.
- The focus ring is triggered only by the keyboard (C4) and its thickness comes from the token.
- The icon is decorative: `aria-hidden="true"`.
