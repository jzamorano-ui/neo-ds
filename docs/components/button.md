<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Button

> **Figma (source of truth):** [❖ Button](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=557-1953) — visual validation against the master.

<!-- prosa:intro -->

Runs actions. To navigate use `link`; for on/off options use `toggle`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `type` | system · brand — default `system` — in code: `family` |
| `size` | small · medium · large — default `large` |
| `variant` | primary · secondary · tertiary — default `primary` |
| `surface` | default · inverse — default `default` |
| `state` | default · hover · active · focus · disabled · loading |
| `label` | text |
| `icon-left` | true · false — default `true` |
| `icon-right` | true · false — default `true` |

<!-- prosa:properties -->

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

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoButtonProps {
  family?: 'system' | 'brand'         // semantic family Default: 'system'.
  size?: 'small' | 'medium' | 'large'  // size adjustment Default: 'large'.
  variant?: 'primary' | 'secondary' | 'tertiary'  // visual hierarchy Default: 'primary'.
  surface?: 'default' | 'inverse'     // the surface it sits on Default: 'default'.
  label?: ReactNode                   // The visible text of the component.
  iconLeft?: string | ReactElement    // The icon before the text: the id of a system icon (`system-search`) or your own element.
  iconRight?: string | ReactElement   // The icon after the text: the id of a system icon (`system-chevron-right`) or your own element.
  loading?: boolean                   // loading
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  children?: ReactNode                // The visible text, as MUI `children` —the same as `label`. One of the two is required: without either the control has no name.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Button not listed above
  // required: a name: `label`, `children`, `aria-label`, `aria-labelledby` —one of them
}
```

<!-- prosa:props -->

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

The size does not change the color. Nine families: three `variant` × two `surface` in `system`, and three
`variant` in `brand`, which only exists in `large` and on `surface=default`. The state cell is
written the way the master names the variant (`variant=secondary,surface=inverse`) plus the state; without a
state it is `default`. A state that takes the same token in every family is written once. `color` is the
label's, which the `<button>` inherits.

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

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | variant=primary | background | `--fill--primary--default` |
| `root` | variant=primary | color | `--text--base--contrast` |
| `root` | variant=primary hover | background | `--fill--primary--hover` |
| `root` | variant=primary active | background | `--fill--primary--active` |
| `root` | variant=primary focus | outline | `--focus--ring--default` |
| `root` | variant=primary focus | box-shadow | `--focus--gap--default` |
| `root` | variant=secondary | background | `--fill--secondary--default` |
| `root` | variant=secondary | color | `--text--base--default` |
| `root` | variant=secondary hover | background | `--fill--secondary--hover` |
| `root` | variant=secondary active | background | `--fill--secondary--active` |
| `root` | variant=secondary focus | outline | `--focus--ring--default` |
| `root` | variant=secondary focus | box-shadow | `--focus--gap--default` |
| `root` | variant=tertiary | background | `--fill--tertiary--default` |
| `root` | variant=tertiary | color | `--text--base--default` |
| `root` | variant=tertiary hover | background | `--fill--tertiary--hover` |
| `root` | variant=tertiary active | background | `--fill--tertiary--active` |
| `root` | variant=tertiary focus | outline | `--focus--ring--default` |
| `root` | variant=tertiary focus | box-shadow | `--focus--gap--default` |
| `root` | variant=primary,surface=inverse | background | `--fill--primary--inverse--default` |
| `root` | variant=primary,surface=inverse | color | `--text--base--default` |
| `root` | variant=primary,surface=inverse hover | background | `--fill--primary--inverse--hover` |
| `root` | variant=primary,surface=inverse active | background | `--fill--primary--inverse--active` |
| `root` | variant=primary,surface=inverse focus | outline | `--focus--ring--inverse` |
| `root` | variant=primary,surface=inverse focus | box-shadow | `--focus--gap--inverse` |
| `root` | variant=secondary,surface=inverse | background | `--fill--secondary--inverse--default` |
| `root` | variant=secondary,surface=inverse | color | `--text--base--contrast` |
| `root` | variant=secondary,surface=inverse | border | `--border--base--contrast` |
| `root` | variant=secondary,surface=inverse hover | background | `--fill--secondary--inverse--hover` |
| `root` | variant=secondary,surface=inverse active | background | `--fill--secondary--inverse--active` |
| `root` | variant=secondary,surface=inverse focus | outline | `--focus--ring--inverse` |
| `root` | variant=secondary,surface=inverse focus | box-shadow | `--focus--gap--inverse` |
| `root` | variant=tertiary,surface=inverse | background | `--fill--tertiary--inverse--default` |
| `root` | variant=tertiary,surface=inverse | color | `--text--base--contrast` |
| `root` | variant=tertiary,surface=inverse hover | background | `--fill--tertiary--inverse--hover` |
| `root` | variant=tertiary,surface=inverse active | background | `--fill--tertiary--inverse--active` |
| `root` | variant=tertiary,surface=inverse focus | outline | `--focus--ring--inverse` |
| `root` | variant=tertiary,surface=inverse focus | box-shadow | `--focus--gap--inverse` |
| `root` | type=brand,variant=primary | background | `--fill--brand--primary--default` |
| `root` | type=brand,variant=primary | color | `--text--base--contrast` |
| `root` | type=brand,variant=primary hover | background | `--fill--brand--primary--hover` |
| `root` | type=brand,variant=primary active | background | `--fill--brand--primary--active` |
| `root` | type=brand,variant=primary focus | outline | `--focus--ring--default` |
| `root` | type=brand,variant=primary focus | box-shadow | `--focus--gap--default` |
| `root` | type=brand,variant=secondary | background | `--fill--brand--secondary--default` |
| `root` | type=brand,variant=secondary | color | `--text--base--brand-strong` |
| `root` | type=brand,variant=secondary hover | background | `--fill--brand--secondary--hover` |
| `root` | type=brand,variant=secondary active | background | `--fill--brand--secondary--active` |
| `root` | type=brand,variant=secondary focus | outline | `--focus--ring--default` |
| `root` | type=brand,variant=secondary focus | box-shadow | `--focus--gap--default` |
| `root` | type=brand,variant=tertiary | background | `--fill--brand--tertiary--default` |
| `root` | type=brand,variant=tertiary | color | `--text--base--brand-strong` |
| `root` | type=brand,variant=tertiary hover | background | `--fill--brand--tertiary--hover` |
| `root` | type=brand,variant=tertiary active | background | `--fill--brand--tertiary--active` |
| `root` | type=brand,variant=tertiary focus | outline | `--focus--ring--default` |
| `root` | type=brand,variant=tertiary focus | box-shadow | `--focus--gap--default` |
| `root` | disabled — every combination | background | `--fill--base--disabled` |
| `root` | disabled — every combination | color | `--text--base--disabled` |
| `icon-left` · `icon-right` | variant=primary | fill | `--icon--base--contrast` |
| `icon-left` · `icon-right` | variant=secondary | fill | `--icon--base--default` |
| `icon-left` · `icon-right` | variant=tertiary | fill | `--icon--base--default` |
| `icon-left` · `icon-right` | variant=primary,surface=inverse | fill | `--icon--base--default` |
| `icon-left` · `icon-right` | variant=secondary,surface=inverse | fill | `--icon--base--contrast` |
| `icon-left` · `icon-right` | variant=tertiary,surface=inverse | fill | `--icon--base--contrast` |
| `icon-left` · `icon-right` | type=brand,variant=primary | fill | `--icon--base--contrast` |
| `icon-left` · `icon-right` | type=brand,variant=secondary | fill | `--icon--base--brand-strong` |
| `icon-left` · `icon-right` | type=brand,variant=tertiary | fill | `--icon--base--brand-strong` |
| `icon-left` · `icon-right` | disabled — every combination | fill | `--icon--base--disabled` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | border-radius | — | `--neo-radius-pill` · 999px |
| `root` | gap | — | `--neo-space-sm` · 8px |
| `root` | border-width | — | `--neo-stroke-xs` · 1px |
| `root` | min-height | size=small | `--neo-button-height-sm` · 32px |
| `root` | min-height | size=medium | `--neo-button-height-md` · 40px |
| `root` | min-height | size=large | `--neo-button-height-lg` · 48px |
| `root` | padding-block | size=small | `--neo-space-xs` · 4px |
| `root` | padding-block | size=medium · large | `--neo-space-sm` · 8px |
| `root` | padding-inline | size=small | `--neo-space-md` · 12px |
| `root` | padding-inline | size=medium | `--neo-space-lg` · 16px |
| `root` | padding-inline | size=large | `--neo-space-xl` · 24px |
| `icon-left` | width × height | size=small | 16×16px |
| `icon-left` | width × height | size=medium | 20×20px |
| `icon-left` | width × height | size=large | 24×24px |
| `icon-right` | width × height | size=small | 16×16px |
| `icon-right` | width × height | size=medium | 20×20px |
| `icon-right` | width × height | size=large | 24×24px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `label` | type=brand,size=large | `Title/md-Bold` | 20px | 700 | 28px |
| `label` | type=system,size=large | `Title/sm-Medium` | 18px | 500 | 26px |
| `label` | type=system,size=medium | `Body/lg-Medium` | 16px | 500 | 24px |
| `label` | type=system,size=small | `Body/md-Medium` | 14px | 500 | 20px |

---

## Motion

| Motion | Element | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|---|
| `hover` | `root` | state | 250 ms | cubic-bezier(0.4, 0, 0.2, 1) | — |

---

## HTML

```html
<button class="btn btn--small btn--primary">Label</button>
<button class="btn btn--medium btn--primary">Label</button>
<button class="btn btn--large btn--primary">Label</button>
```

<!-- prosa:html -->

```html
<!-- The `.btn` class is the one that brings EVERYTHING: box, typography, focus and states. Without it the example
     is a browser button, not a Neo button. The modifiers add up:
     hierarchy (`--primary` · `--secondary` · `--tertiary`), size (`--large` · `--medium` · `--small`),
     `--brand` for the brand family, and `--inverse` when it goes on a dark background. -->

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
<!-- Loading — only in `button`, not in `button/icon`. The visible label stays its name: no `aria-label` -->
<button type="button" class="btn btn--primary btn--medium" disabled aria-busy="true">
  <span class="spinner spinner--medium" aria-hidden="true"></span>
  Guardar
</button>
```

```html
<!-- Disabled -->
<button type="button" class="btn btn--primary btn--medium" disabled>Guardar</button>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `root` · loading | `<button>` | `disabled` · `aria-busy="true"` |

<!-- prosa:aria -->

- `button/icon` has no visible text: `aria-label="[action]"` is the only name it has.
- Disabled uses the native `disabled` — not `aria-disabled` next to it (ARIA in HTML).

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
| **primary action:** one per screen | several primary buttons cancel out the hierarchy and the screen loses its main action. The alternatives, such as going back or cancelling, go as `secondary` or `tertiary`. |

| When | Then |
|---|---|
| `type=brand` | size must be large |
| `type=brand` | surface must be default |
| always | a name is required |

<!-- prosa:rules -->

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

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`link`](link.md) | the action is to navigate |
| [`toggle`](toggle.md) | it is an on/off option |

---

## Accessibility

- Without visible text (button/icon), `aria-label` is required: it is the only name it has.
- While loading: `disabled` + `aria-busy=true`, and the visible label stays its name. It does not take an `aria-label` that says the state: that label would replace the visible one as the name (WCAG 2.5.3), the same defect a tooltip has when it names instead of describing. If the wait has to be announced, the screen does it in a live region.
- The focus ring is triggered ONLY by the keyboard (C4), and its thickness comes from the token (gated).

<!-- prosa:accessibility -->

- **WCAG 2.5.8 (AA)** — 24×24px minimum touch target. All sizes exceed it by the size of their own box (the smallest, `Small`, measures 32px).
- Focus always visible — do not suppress it in any context.
- Minimum 3:1 contrast of text on the button's background.
- **WCAG 2.5.3** — the `aria-label` of `button/icon` must describe the action, not the icon.
- **Brand** — the `--fill--brand--primary--default` background passes WCAG AA for large text: 3.09:1 contrast over the required 3:1. Mandatory condition: minimum 14pt bold (19px) · minimum 18pt regular (24px). Do not reduce the label's size or weight — below that threshold the contrast is insufficient.

<!-- /prosa:accessibility -->
