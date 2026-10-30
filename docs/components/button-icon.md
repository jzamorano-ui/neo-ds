<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Button Icon

> **Figma (source of truth):** [❖ Button Icon](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=561-10356) — visual validation against the master.

<!-- prosa:intro -->

Runs an action that is understood by its icon: close, back, add, more options. It is square,
carries no text, and that is why its `aria-label` is not optional — it is the only name it has.

It shares the palette of [button](button.md) and **shares nothing else**: another box, other parts, and no
loading state. In the master it is another component, with its own 135 variants.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `type` | system · brand — default `system` — in code: `family` |
| `size` | small (`--neo-button-height-sm` · 32px) · medium (`--neo-button-height-md` · 40px) · large (`--neo-button-height-lg` · 48px) — default `large` |
| `variant` | primary · secondary · tertiary — default `primary` |
| `surface` | default · inverse — default `default` |
| `state` | default · hover · active · focus · disabled |

<!-- prosa:properties -->

**Combinations:** `brand` **only exists on `surface=default`**. There are 135 variants: 90 of the system
(two surfaces) and 45 of brand (a single one). There is no `loading` — that belongs to `button`.

**The glyph is not a property of the master.** It is swapped by entering the instance, so it is chosen
by whoever uses it: in React it goes in as a child, in the plain layer as an `<svg>` inside the button.

**Its size is the button's by default, and the icon can say its own.** In an instance its size is chosen in the panel. In code, an icon
with a size class from the icon scale keeps it, in the theme and in the plain layer. Use it to go one
step up —a notification bell in a desktop header, `lg` inside `large`— without changing the box.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoButtonIconProps {
  family?: 'system' | 'brand'         // semantic family — the same as `button` Default: 'system'.
  size?: 'small' | 'medium' | 'large'  // size adjustment — the button is SQUARE: 32 · 40 · 48, and the glyph scales with it (16 · 20 · 24) Default: 'large'.
  variant?: 'primary' | 'secondary' | 'tertiary'  // visual hierarchy Default: 'primary'.
  surface?: 'default' | 'inverse'     // the surface it sits on Default: 'default'.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's IconButton not listed above
  // required: a name: `aria-label`, `aria-labelledby` —one of them
}
```

<!-- prosa:props -->

The wrapper is `NeoButtonIcon`, on top of MUI's **`IconButton`**. `IconButton` has no `variant` —that belongs to `Button`—
so the hierarchy travels as `data-variant` and the theme paints it, the same mechanism `button`
already used for the three brand ones.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

> **The glyph does not inherit the text color, and it is not a detail.** `--icon--base--disabled` and
> `--text--base--disabled` are not the same color: a disabled button that inherits paints the
> icon a similar and wrong gray. That is why each family declares its own.

> **Focus is TWO rings.** The outer one is painted by the root (`focus/ring`, 4) and the inner one by the master's
> `main_button` layer (`focus/gap`, 2). It is the system's focus convention, the same as
> `button` and `link`, and on an inverse surface both tokens switch to their `inverse` branch.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | variant=primary | background | `--fill--primary--default` |
| `root` | variant=primary hover | background | `--fill--primary--hover` |
| `root` | variant=primary active | background | `--fill--primary--active` |
| `root` | variant=primary focus | outline | `--focus--ring--default` |
| `root` | variant=primary focus | box-shadow | `--focus--gap--default` |
| `root` | variant=secondary | background | `--fill--secondary--default` |
| `root` | variant=secondary hover | background | `--fill--secondary--hover` |
| `root` | variant=secondary active | background | `--fill--secondary--active` |
| `root` | variant=secondary focus | outline | `--focus--ring--default` |
| `root` | variant=secondary focus | box-shadow | `--focus--gap--default` |
| `root` | variant=tertiary | background | `--fill--tertiary--default` |
| `root` | variant=tertiary hover | background | `--fill--tertiary--hover` |
| `root` | variant=tertiary active | background | `--fill--tertiary--active` |
| `root` | variant=tertiary focus | outline | `--focus--ring--default` |
| `root` | variant=tertiary focus | box-shadow | `--focus--gap--default` |
| `root` | variant=primary,surface=inverse | background | `--fill--primary--inverse--default` |
| `root` | variant=primary,surface=inverse hover | background | `--fill--primary--inverse--hover` |
| `root` | variant=primary,surface=inverse active | background | `--fill--primary--inverse--active` |
| `root` | variant=primary,surface=inverse focus | outline | `--focus--ring--inverse` |
| `root` | variant=primary,surface=inverse focus | box-shadow | `--focus--gap--inverse` |
| `root` | variant=secondary,surface=inverse | background | `--fill--secondary--inverse--default` |
| `root` | variant=secondary,surface=inverse | border | `--border--base--contrast` |
| `root` | variant=secondary,surface=inverse hover | background | `--fill--secondary--inverse--hover` |
| `root` | variant=secondary,surface=inverse active | background | `--fill--secondary--inverse--active` |
| `root` | variant=secondary,surface=inverse focus | outline | `--focus--ring--inverse` |
| `root` | variant=secondary,surface=inverse focus | box-shadow | `--focus--gap--inverse` |
| `root` | variant=tertiary,surface=inverse | background | `--fill--tertiary--inverse--default` |
| `root` | variant=tertiary,surface=inverse hover | background | `--fill--tertiary--inverse--hover` |
| `root` | variant=tertiary,surface=inverse active | background | `--fill--tertiary--inverse--active` |
| `root` | variant=tertiary,surface=inverse focus | outline | `--focus--ring--inverse` |
| `root` | variant=tertiary,surface=inverse focus | box-shadow | `--focus--gap--inverse` |
| `root` | type=brand,variant=primary | background | `--fill--brand--primary--default` |
| `root` | type=brand,variant=primary hover | background | `--fill--brand--primary--hover` |
| `root` | type=brand,variant=primary active | background | `--fill--brand--primary--active` |
| `root` | type=brand,variant=primary focus | outline | `--focus--ring--default` |
| `root` | type=brand,variant=primary focus | box-shadow | `--focus--gap--default` |
| `root` | type=brand,variant=secondary | background | `--fill--brand--secondary--default` |
| `root` | type=brand,variant=secondary hover | background | `--fill--brand--secondary--hover` |
| `root` | type=brand,variant=secondary active | background | `--fill--brand--secondary--active` |
| `root` | type=brand,variant=secondary focus | outline | `--focus--ring--default` |
| `root` | type=brand,variant=secondary focus | box-shadow | `--focus--gap--default` |
| `root` | type=brand,variant=tertiary | background | `--fill--brand--tertiary--default` |
| `root` | type=brand,variant=tertiary hover | background | `--fill--brand--tertiary--hover` |
| `root` | type=brand,variant=tertiary active | background | `--fill--brand--tertiary--active` |
| `root` | type=brand,variant=tertiary focus | outline | `--focus--ring--default` |
| `root` | type=brand,variant=tertiary focus | box-shadow | `--focus--gap--default` |
| `root` | disabled — every combination | background | `--fill--base--disabled` |
| `icon` | variant=primary | fill | `--icon--base--contrast` |
| `icon` | variant=secondary | fill | `--icon--base--default` |
| `icon` | variant=tertiary | fill | `--icon--base--default` |
| `icon` | variant=primary,surface=inverse | fill | `--icon--base--default` |
| `icon` | variant=secondary,surface=inverse | fill | `--icon--base--contrast` |
| `icon` | variant=tertiary,surface=inverse | fill | `--icon--base--contrast` |
| `icon` | type=brand,variant=primary | fill | `--icon--base--contrast` |
| `icon` | type=brand,variant=secondary | fill | `--icon--base--brand-strong` |
| `icon` | type=brand,variant=tertiary | fill | `--icon--base--brand-strong` |
| `icon` | disabled — every combination | fill | `--icon--base--disabled` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | border-radius | — | `--neo-radius-pill` · 999px |
| `root` | width × height | size=small | `--neo-button-height-sm` · 32px |
| `root` | width × height | size=medium | `--neo-button-height-md` · 40px |
| `root` | width × height | size=large | `--neo-button-height-lg` · 48px |
| `icon` | width × height | size=small | `--neo-icon-size-xs` · 16px |
| `icon` | width × height | size=medium | `--neo-icon-size-sm` · 20px |
| `icon` | width × height | size=large | `--neo-icon-size-md` · 24px |

<!-- prosa:layout -->

The three sides are the **same heights as `button`**: that is what keeps an icon button and one
with a label aligned in the same row. The button is square and the glyph is centered, so there is no padding.
The only variant that draws a stroke is `secondary` on `surface=inverse`.

When the icon says its own size —the `.icon--lg` class, `--neo-icon-size-lg`— the glyph is bigger than the one
its box brings by default; the box does not change.

<!-- /prosa:layout -->

---

## HTML

<!-- prosa:html -->

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

<!-- /prosa:html -->

---

## ARIA

<!-- prosa:aria -->

The `aria-label` names **the action, not the drawing**: "Close", not "X". If the button opens something that
stays open, also `aria-expanded`.

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | moves focus to the button |
| `Enter · Space` | runs the action |

---

## Rules

| Limit | When exceeded |
|---|---|
| **icon:** exactly 1 icon | two glyphs in an icon button do not read as one action: if two things are needed, they are two buttons (C1) |

| When | Then |
|---|---|
| `type=brand` | surface must be default |
| always | an accessible name is required |

<!-- prosa:rules -->

- **Only for actions that are recognized without text.** If it needs explaining, it is `button` with a label.
- **The icon can go one step up** —`lg` inside `large`— when the glyph alone does not read, for example a
  notification bell in a desktop header. The box does not change; one action per button, always with `aria-label`.
- A `tooltip` on top is welcome to show the label on hover — but the `aria-label` is still
  mandatory: the tooltip is seen, it is not read aloud.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`button`](button.md) | the action needs a label to be understood |
| [`link`](link.md) | the action is to navigate |
| [`tooltip`](tooltip.md) | the icon needs a visible label on hover — the tooltip shows it, the `aria-label` says it |

---

## Accessibility

- WITHOUT VISIBLE TEXT, `aria-label` is the only name it has: it is required, and it describes the ACTION («Cerrar»), not the drawing («equis»).
- The icon is `aria-hidden="true"`: the `aria-label` already says what it means, and announcing it would duplicate it.
- The focus ring is triggered ONLY by the keyboard (C4), and its thickness comes from the token.
- The minimum touch box is the 32 of `small`; below that the component is not offered.
