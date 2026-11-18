<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Chips

> **Figma (source of truth):** [❖ Chips](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002386-4344) — visual validation against the master.

<!-- prosa:intro -->

Compact interactive filtering or selection within the same view. To navigate between sections use `tabs`; for system states use `badge`. To classify without it being touchable, `tag`.

<!-- /prosa:intro -->

---

## Properties

| Property | Values |
|---|---|
| `state` | default · hover · focus · selected · disabled |
| `label` | text |
| `icon-left` | true · false — default `true` |
| `icon-right` | true · false — default `true` |

<!-- prosa:properties -->

**Single `state` axis** — the state defines the look: `default`, `hover` and `focus` look outline (available); `selected` looks filled; `disabled` is muted and not interactive. There is no independent `type` axis: the visual is derived from `selected`. `icon-right` is the **✕** of removable chips.

<!-- /prosa:properties -->

---

## Props

```typescript
interface NeoChipsProps {
  label: ReactNode                    // The visible text of the component.
  icon?: ReactNode                    // The icon node. Use the system icons (icons/), not loose SVGs.
  selected?: boolean                  // Selected (drawn filled). In the DOM it goes as data-selected.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  // …and the props of MUI's Chip not listed above
}
```

<!-- prosa:props -->

**The group is another component.** A row of chips —several on at once, or one at a time— is `chips-group` (`NeoChipsGroup`), with its own master (`chips/group`) and its own spec: `chips-group`. This spec is ONE chip.

<!-- /prosa:props -->

---

## Tokens

### Color

<!-- prosa:color -->

**Hover and selected use the `primary` (dark) ramp**. With `primary` they give 16.64:1 and 8.93:1. The border has no token in those two states because the master puts no stroke on them: what distinguishes the active chip is the fill, not the outline.

**Focus** follows the same pattern as Button and the inputs: gap (filled, adjacent to the chip) plus ring (outer), both outside, so the chip grows 4px with no separation between gap and ring. It is shown on the available chip (outline), because the keyboard mostly goes through unselected chips.

<!-- /prosa:color -->

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `root` | default | background | `--fill--base--default` |
| `root` | default | border | `--border--base--default` |
| `root` | hover | background | `--fill--primary--hover` |
| `root` | selected | background | `--fill--primary--active` |
| `root` | focus | background | `--fill--base--default` |
| `root` | focus | border | `--border--base--default` |
| `root` | focus | outline | `--focus--ring--default` |
| `root` | focus | box-shadow | `--focus--gap--default` |
| `root` | disabled | background | `--fill--base--disabled` |
| `root` | disabled | border | `--border--base--disabled` |
| `label` | default | color | `--text--base--default` |
| `label` | hover | color | `--text--base--contrast` |
| `label` | selected | color | `--text--base--contrast` |
| `label` | focus | color | `--text--base--default` |
| `label` | disabled | color | `--text--base--disabled` |
| `icon` | default | fill | `--icon--base--default` |
| `icon` | hover | fill | `--icon--base--contrast` |
| `icon` | selected | fill | `--icon--base--contrast` |
| `icon` | focus | fill | `--icon--base--default` |
| `icon` | disabled | fill | `--icon--base--disabled` |

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | height | — | 32px |
| `root` | padding-block | — | `--neo-space-sm` · 8px |
| `root` | padding-inline | — | `--neo-space-md` · 12px |
| `root` | gap | — | `--neo-space-xs` · 4px |
| `root` | border-radius | — | `--neo-radius-pill` · 999px |
| `root` | border-width | — | `--neo-stroke-xs` · 1px |
| `icon` | width | — | `--neo-icon-size-xs` · 16px |
| `icon` | height | — | `--neo-icon-size-xs` · 16px |

### Typography

| Element | Value of the axis | Text style | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| `label` | — | `Body/md-Medium` | 14px | 500 | 20px |

---

## Motion

| Motion | Element | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|---|
| `hover` | `root` | state | 300 ms | cubic-bezier(0.4, 0, 0.2, 1) | — |

---

## HTML

```html
<div class="chip">Label chip</div>
```

<!-- prosa:html -->

The line above is only the root class. A chip is always interactive, so in the plain layer it is a `<button>` with `aria-pressed`, never a bare `<div>`:

```html
<!-- multi-select: each chip is an independent toggle -->
<button type="button" aria-pressed="true" class="chip chip--selected">Dental</button>
<button type="button" aria-pressed="false" class="chip">Farmacia</button>
```

```html
<!-- removable chip: ONE control. A button inside a button is invalid HTML, so the ✕ is part of the
     chip and hidden from the screen reader, and `aria-keyshortcuts` tells it how the chip is removed.
     The script that uses it removes the chip when the pointer or Enter/Space hit THE CHIP —the whole
     chip, not only the ✕, which is its sign— and on Delete or Backspace. -->
<button type="button" aria-pressed="true" aria-keyshortcuts="Delete Backspace" class="chip chip--selected">
  Dental
  <svg aria-hidden="true"><use href="#system-close"></use></svg>
</button>

<!-- And the same chip AVAILABLE. It goes here because removing is independent of being chosen, and because without
     an unselected chip with an icon there is no way to see —or to measure— the icon's hover: the
     hover rules deliberately exclude the selected instances. -->
<button type="button" aria-pressed="false" aria-keyshortcuts="Delete Backspace" class="chip">
  Farmacia
  <svg aria-hidden="true"><use href="#system-close"></use></svg>
</button>
```

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `div` | `<div>` | `role="button"` · `aria-pressed="false"` · `aria-keyshortcuts="Delete Backspace"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | each chip is its own tab stop |
| `Enter · Space` | toggles the chip on or off; a removable chip is removed |
| `Delete · Backspace` | removes the chip, if it has a trailing action |

<!-- prosa:keyboard -->

**In a `single` group the arrows are the browser's**: its chips draw native radios, so the group is one tab stop and the arrows move and choose. That is `chips-group`; here each chip is a toggle and the arrows do not apply.

<!-- /prosa:keyboard -->

---

## Rules

| Limit | When exceeded |
|---|---|
| **label:** 1–2 words | it neither breaks nor truncates: the chip widens and the row reads worse — rewrite it shorter |

<!-- prosa:rules -->

- `state=selected` is the active chip (looks filled); `state=default` and `hover` are the available chip (looks outline).
- A row of chips is `chips-group`: several on at once or one at a time, never both in the same row.
- **In the master the trailing is a 16 icon inside the chip**, not a separate control: the touch area is the whole chip's (32 high), which meets the 24×24 minimum of WCAG 2.5.8 AA, the level the system aims for. If it is implemented as an independent button, it has to be given its own box of at least 24.
- **Labels of 1–2 words are a copywriting guideline, not a technical cap.** Short labels make a row of chips easier to scan; going over does not break or truncate, so the way out is to rewrite it shorter.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`tabs`](tabs.md) | what you do is navigate between sections, not filter |
| [`badge`](badge.md) | it communicates a system state and nobody touches it |
| [`tag`](tag.md) | it classifies and is not interactive |

---

## Accessibility

- `aria-pressed` says whether the chip is on: `true` when selected, `false` otherwise. Without the `false`, a chip that is off is announced as a plain button and not as a toggle.
- A removable chip is ONE control, and its whole body removes it —a button inside a button is invalid HTML, and the ✕ alone measures 16×16, under the 24×24 that WCAG 2.5.8 asks of a target of its own—: the pointer or Enter/Space remove it, and so do Delete or Backspace; the ✕ is its sign and is `aria-hidden`, and `aria-keyshortcuts="Delete Backspace"` tells the screen reader that it can be removed.
- Icons are `aria-hidden="true"`.

<!-- prosa:accessibility -->

- In a `single` group the active state is the radio's `checked` —see `chips-group`—, never `aria-pressed` and `checked` in the same row.
- Do not rely only on color to convey the selected state.

<!-- /prosa:accessibility -->
