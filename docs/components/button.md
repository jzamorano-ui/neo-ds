# Button

> **Figma (source of truth):** [❖ Button](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=557-1953) — visual validation against the master.

Runs actions. To navigate use `link`; for on/off options use `toggle`.

---

## Properties

| Property | Values |
|---|---|
| `type` | system · brand |
| `variant` | primary · secondary · tertiary |
| `surface` | default · inverse |
| `size` | large · medium · small · _(brand: large only)_ |
| `state` | default · hover · active · focus · disabled · loading |
| `label` | the button text — it names the action |
| `icon-left` | true · false |
| `icon-right` | true · false |

> **The system has no outlined button.** MUI offers `variant="outlined"` and here it is NEUTRALIZED:
> the theme treats it the same as `text`, that is, ghost. It is deliberate — `tertiary` is the third hierarchy
> and an outline would compete with it. Writing it breaks nothing; it simply does not draw a border.

**Valid combos:** System/Primary/Default · System/Primary/Inverse · System/Secondary/Default · System/Secondary/Inverse · System/Tertiary/Default · System/Tertiary/Inverse · Brand/Primary/Default (only surface=Default) · Disabled (all) · Loading (System — only `button`) · Focus (all).

> **button/icon** supports all the combos above except `Loading` — including `Brand`. `Brand` is exclusively size `Large` in both components.

### How each combo is invoked

The two axes cross: the **prop** chooses the treatment and the **attribute** chooses the surface. That is
why there is not one variant per combination — there are seven rows, not eighteen.

| Combo | MUI props | Surface |
|---|---|---|
| System / Primary / Default | `variant="contained" color="primary"` | — |
| System / Primary / Inverse | `variant="contained" color="primary"` | `data-surface="inverse"` |
| System / Secondary / Default | `variant="contained" color="secondary"` | — |
| System / Secondary / Inverse | `variant="contained" color="secondary"` | `data-surface="inverse"` · **the only one that also paints a border** |
| System / Tertiary / Default | `variant="text"` | — |
| System / Tertiary / Inverse | `variant="text"` | `data-surface="inverse"` |
| Brand / Primary / Default | `color="brand"` | **has no inverse** |

`Secondary / Inverse` is the row that gets forgotten: it is the only one that, besides the fill, changes the
**border** — the other five only change fill and text. Treating it as "secondary with the surface
set" leaves it without a border on a dark background, which is exactly where it is needed to separate it from the background.

`Disabled` and `Loading` are not another column: they cross with any row above (`Loading` only in
`System`, and only in `button`).

---

## Props

```typescript
interface NeoButtonProps {
  family?: 'system' | 'brand'         // semantic family Default: 'system'.
  variant?: 'primary' | 'secondary' | 'tertiary'  // visual hierarchy Default: 'primary'.
  surface?: 'default' | 'inverse'     // the surface it sits on Default: 'default'.
  size?: 'small' | 'medium' | 'large'  // size adjustment Default: 'large'.
  label?: ReactNode                   // The visible text of the component.
  iconLeft?: string | ReactElement
  iconRight?: string | ReactElement
  loading?: boolean                   // loading
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  children?: ReactNode                // The visible text, as MUI `children` —the same as `label`. One of the two is required: without either the control has no name.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's Button
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

---

## Tokens

### Color

The size does not change the color. Nine families: three `variant` × two `surface` in `system`, and three
`variant` in `brand`, which only exists in `large` and on `surface=default`. The state cell is
written the way the master names the variant (`variant=secondary,surface=inverse`) plus the state; without a
state it is `default`. `color` is the label's, which the `<button>` inherits.

#### System on a light background (`type=system`, `surface=default`)

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `button` | variant=primary | background | `--fill--primary--default` |
| `button` | variant=primary | color (label) | `--text--base--contrast` |
| `button` | variant=primary hover | background | `--fill--primary--hover` |
| `button` | variant=primary active | background | `--fill--primary--active` |
| `button` | variant=secondary | background | `--fill--secondary--default` |
| `button` | variant=secondary | color (label) | `--text--base--default` |
| `button` | variant=secondary hover | background | `--fill--secondary--hover` |
| `button` | variant=secondary active | background | `--fill--secondary--active` |
| `button` | variant=tertiary | background | `--fill--tertiary--default` |
| `button` | variant=tertiary | color (label) | `--text--base--default` |
| `button` | variant=tertiary hover | background | `--fill--tertiary--hover` |
| `button` | variant=tertiary active | background | `--fill--tertiary--active` |

#### System on an inverse background (`surface=inverse`)

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `button` | variant=primary,surface=inverse | background | `--fill--primary--inverse--default` |
| `button` | variant=primary,surface=inverse | color (label) | `--text--base--default` |
| `button` | variant=primary,surface=inverse hover | background | `--fill--primary--inverse--hover` |
| `button` | variant=primary,surface=inverse active | background | `--fill--primary--inverse--active` |
| `button` | variant=secondary,surface=inverse | background | `--fill--secondary--inverse--default` |
| `button` | variant=secondary,surface=inverse | color (label) | `--text--base--contrast` |
| `button` | variant=secondary,surface=inverse | border | `--border--base--contrast` |
| `button` | variant=secondary,surface=inverse hover | background | `--fill--secondary--inverse--hover` |
| `button` | variant=secondary,surface=inverse active | background | `--fill--secondary--inverse--active` |
| `button` | variant=tertiary,surface=inverse | background | `--fill--tertiary--inverse--default` |
| `button` | variant=tertiary,surface=inverse | color (label) | `--text--base--contrast` |
| `button` | variant=tertiary,surface=inverse hover | background | `--fill--tertiary--inverse--hover` |
| `button` | variant=tertiary,surface=inverse active | background | `--fill--tertiary--inverse--active` |

#### Brand (`type=brand` — only `size=large` and `surface=default`)

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `button` | type=brand,variant=primary | background | `--fill--brand--primary--default` |
| `button` | type=brand,variant=primary | color (label) | `--text--base--contrast` |
| `button` | type=brand,variant=primary hover | background | `--fill--brand--primary--hover` |
| `button` | type=brand,variant=primary active | background | `--fill--brand--primary--active` |
| `button` | type=brand,variant=secondary | background | `--fill--brand--secondary--default` |
| `button` | type=brand,variant=secondary | color (label) | `--text--base--brand-strong` |
| `button` | type=brand,variant=secondary hover | background | `--fill--brand--secondary--hover` |
| `button` | type=brand,variant=secondary active | background | `--fill--brand--secondary--active` |
| `button` | type=brand,variant=tertiary | background | `--fill--brand--tertiary--default` |
| `button` | type=brand,variant=tertiary | color (label) | `--text--base--brand-strong` |
| `button` | type=brand,variant=tertiary hover | background | `--fill--brand--tertiary--hover` |
| `button` | type=brand,variant=tertiary active | background | `--fill--brand--tertiary--active` |

#### Focus and disabled — the same in the nine families

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `button` | focus (on surface=default, system and brand) | outline | `--focus--ring--default` |
| `button` | focus (on surface=default, system and brand) | box-shadow (gap) | `--focus--gap--default` |
| `button` | surface=inverse focus (the three variants) | outline | `--focus--ring--inverse` |
| `button` | surface=inverse focus (the three variants) | box-shadow (gap) | `--focus--gap--inverse` |
| `button` | disabled (all the families) | background | `--fill--base--disabled` |
| `button` | disabled (all the families) | color (label) | `--text--base--disabled` |

#### Icons — the glyph takes the ICON role that goes with the label's

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `icon-left` · `icon-right` | variant=primary | fill | `--icon--base--contrast` |
| `icon-left` · `icon-right` | variant=secondary | fill | `--icon--base--default` |
| `icon-left` · `icon-right` | variant=tertiary | fill | `--icon--base--default` |
| `icon-left` · `icon-right` | variant=primary,surface=inverse | fill | `--icon--base--default` |
| `icon-left` · `icon-right` | variant=secondary,surface=inverse | fill | `--icon--base--contrast` |
| `icon-left` · `icon-right` | variant=tertiary,surface=inverse | fill | `--icon--base--contrast` |
| `icon-left` · `icon-right` | type=brand,variant=primary | fill | `--icon--base--contrast` |
| `icon-left` · `icon-right` | type=brand,variant=secondary | fill | `--icon--base--brand-strong` |
| `icon-left` · `icon-right` | type=brand,variant=tertiary | fill | `--icon--base--brand-strong` |
| `icon-left` · `icon-right` | disabled (all the families) | fill | `--icon--base--disabled` |

**Icon**: the glyph is bound directly to `--icon--base--*` with the icon role that goes with the
label's — `contrast` where the text is contrast, `default` where it is default, **`brand-strong` in Brand
Secondary and Tertiary**. In `loading` the
spinner's arc takes this same role.

**Focus ring** (Figma): 2 stroke layers — `focus/ring/*` on the outer layer, `focus/gap/*` on the inner layer. Secondary adds a third layer with the button's border preserved.

```css
/* Default surface */
outline: var(--neo-stroke-focus-ring-width) solid var(--focus--ring--default);
outline-offset: 2px;
box-shadow: 0 0 0 2px var(--focus--gap--default);

/* Inverse surface */
outline: var(--neo-stroke-focus-ring-width) solid var(--focus--ring--inverse);
outline-offset: 2px;
box-shadow: 0 0 0 2px var(--focus--gap--inverse);
```

**Also:** `Secondary` on `surface=Inverse` is the only one with a border —`--border--base--contrast`,
in default, hover, active and focus— and in `disabled` the border **disappears** (measured).

### Layout

| Property | Size | CSS custom property | Value |
|---|---|---|---|
| the component's height | Large | — | 48px |
| the component's height | Medium | — | 40px |
| the component's height | Small | — | 32px |
| `padding-inline` | Large | `--neo-space-xl` | 24px |
| `padding-inline` | Medium | `--neo-space-lg` | 16px |
| `padding-inline` | Small | `--neo-space-md` | 12px |
| `gap` (icon · label) | all | `--neo-space-sm` | 8px |
| `border-radius` | all | `--neo-radius-pill` | 999px |
| `border-width` (Secondary/Inverse) | all | `--neo-stroke-xs` | 1px |
| `focus-ring-width` | all | `--neo-stroke-focus-ring-width` | 2px |

### Typography

| Size | Tipo | Style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| Large | System | `title/sm-medium` | 18px | 500 | 26px |
| Large | **Brand** | `title/md-bold` | **20px** | **700** | **28px** |
| Medium | System | `body/lg-medium` | 16px | 500 | 24px |
| Small | System | `body/md-medium` | 14px | 500 | 20px |

---

## HTML

```html
<!-- The `.btn` class is the one that brings EVERYTHING: box, typography, focus and states. Without it the example
     is a browser button, not a Neo button. The modifiers add up:
     hierarchy (`--primary` · `--secondary` · `--tertiary`), size (`--lg` · `--md` · `--sm`),
     and `--inverse` when it goes on a dark background. -->

<!-- Primary, the default size -->
<button type="button" class="btn btn--primary btn--large">Guardar</button>
```

```html
<!-- The complete hierarchy: a single primary per context -->
<button type="button" class="btn btn--primary btn--medium">Guardar</button>
<button type="button" class="btn btn--secondary btn--medium">Cancelar</button>
<button type="button" class="btn btn--tertiary btn--medium">Ver detalle</button>
```

```html
<!-- button/icon — `aria-label` mandatory: with no visible text, it is the only name it has -->
<button type="button" class="btn btn--tertiary btn--small btn--icon-only" aria-label="Cerrar">
  <svg aria-hidden="true"><use href="#system-close"></use></svg>
</button>
```

```html
<!-- Loading — only in `button`, not in `button/icon` -->
<button type="button" class="btn btn--primary btn--medium" disabled aria-busy="true" aria-label="Guardando…">
  <span class="spinner spinner--medium" aria-hidden="true"></span>
</button>
```

```html
<!-- Disabled -->
<button type="button" class="btn btn--primary btn--medium" disabled>Guardar</button>
```

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| button with a label | `<button type="button">` | — |
| button/icon | `<button type="button">` | `aria-label="[action]"` |
| Disabled | `<button>` | the native `disabled` — not `aria-disabled` next to it (ARIA in HTML) |
| Loading | `<button>` | `disabled` · `aria-busy="true"` · `aria-label="[action in progress]"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | Moves focus to the button |
| `Enter` · `Space` | Runs the action |

---

## Rules

- A single `Primary` per view — several cancel out the hierarchy.
- `surface=Inverse` applies to `Primary`, `Secondary` and `Tertiary` — use it when the button sits on a dark or colored background. `Brand` has no surface=Inverse.
- Irreversible actions (delete, cancel a process in progress) → use `Primary` in a confirmation modal — the context does the work of signaling the risk.
- `Loading` only in `button` — `button/icon` does not support loading.
- **In `Loading` the button shows spinner + label, and nothing else.** The right icon is neither drawn nor
  reserves space: a gap on the right would leave the label centered and the button unbalanced —
  the spinner counts as content and the gap does not.
- **Measured on the master** (system/primary/default), `default → loading`:
`large` 159 → **127** · `medium` 130 → **116** · `small` 116 → **116**.
  The button narrows when entering loading if it had icons; that is the price of not leaving the gap, and
  it was accepted knowingly.
- **The master has a minimum width of 116.** That is why `small` does not change —it was already at the floor— and
  why in `medium` the content stays centered inside a width larger than the sum of its parts.
- `button/icon` without an `aria-label` is an error, not a warning.

### Brand — restricted use

The `Brand` button is an expressive, high-visual-impact variant. **It is not a general functional button.**

| | |
|---|---|
| ✔ Use in | Hero · Landing pages · Campaigns |
| ✗ Do not use in | Forms · Payments · Contracting · High-stakes actions · Navigation |
| Size | Only `Large` — not configurable in `sm`/`md` · does not accept `surface=Inverse` |
| Minimum typography | 20px Bold (`title/md-bold`) — required to meet WCAG AA |
| Hierarchy | It does not replace `Primary` — if it is a functional action → use `Primary` |

---

## Accessibility

- **WCAG 2.5.8 (AA)** — 24×24px minimum touch target. All sizes exceed it by the size of their own box (the smallest, `Small`, measures 32px).
- Focus always visible — do not suppress it in any context.
- Minimum 3:1 contrast of text on the button's background.
- **WCAG 2.5.3** — the `aria-label` of `button/icon` must describe the action, not the icon.
- **Brand** — the `--fill--brand--primary--default` background passes WCAG AA for large text: 3.09:1 contrast over the required 3:1. Mandatory condition: minimum 14pt bold (19px) · minimum 18pt regular (24px). Do not reduce the label's size or weight — below that threshold the contrast is insufficient.
