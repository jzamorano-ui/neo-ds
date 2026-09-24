# Chips

> **Figma (source of truth):** [❖ Chips](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002386-4344) — visual validation against the master.

Compact interactive filtering or selection within the same view. To navigate between sections use `tabs`; for system states use `badge`. To classify without it being touchable, `tag`.

---

## Properties

| Property | Values |
|---|---|
| `state` | default · hover · selected · focus · disabled |
| `icon-left` | true · false — reference icon |
| `icon-right` | true · false — the **✕** on removable chips |
| `label` | guide: 1–2 words (~20 characters) |

> **Single `state` axis** — the state defines the look: `default` / `hover` / `focus` look **outline** (available); `selected` looks **filled** (selected); `disabled` = muted, not interactive. In the DOM the selected state is marked with the attribute **`data-selected="true"`** (valid, it is not filtered; a raw `selected` prop did leak into the `<div>`) + `disabled: boolean` (MUI: `<Chip disabled>`). There is no independent `type` axis.

---

## Props

```typescript
interface NeoChipsProps {
  label: ReactNode         // The visible text of the component.
  icon?: ReactNode         // The icon node. Use the system icons (icons/), not loose SVGs.
  selected?: boolean       // Selected (drawn filled). In the DOM it goes as data-selected.
  disabled?: boolean       // Not interactive: it takes neither focus nor clicks.
  className?: string       // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>      // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown  // the rest flows to MUI's Chip
}
```

> It is the **component's real signature**: the types the package publishes, generated from the contract and compiled with TypeScript on every change. **What is not in this list does not reach anything** — the `...rest` hands it to MUI, and MUI discards what it does not recognize without warning. What comes out as `unknown` is what does not have a declared type yet.

> **The group is another component.** A row of chips —several on at once, or one at a time— is `chips-group` (`NeoChipsGroup`), with its own master (`chips/group`) and its own spec: `chips-group`. This spec is ONE chip.

---

## Tokens

### Color

| Element | State | CSS property | CSS custom property |
|---|---|---|---|
| `chip` | default | background | `--fill--base--default` |
| `chip` | default | border | `--border--base--default` |
| `chip` | hover | background | `--fill--primary--hover` |
| `chip` | hover | border | — (matches the fill) |
| `chip` | selected | background | `--fill--primary--active` |
| `chip` | selected | border | — (matches the fill) |
| `chip` | focus | background | `--fill--base--default` (chip available + ring) |
| `chip` | focus | border | `--border--base--default` |
| `chip` | focus | outline | `--focus--ring--default` |
| `chip` | focus | box-shadow | `--focus--gap--default` |
| `chip` | disabled | background | `--fill--base--disabled` |
| `chip` | disabled | border | `--border--base--disabled` |
| `label` | default · focus | color | `--text--base--default` |
| `label` | **hover · selected** | color | `--text--base--contrast` |
| `label` | disabled | color | `--text--base--disabled` |
| `icon` | default · focus | fill | `--icon--base--default` |
| `icon` | **hover · selected** | fill | `--icon--base--contrast` |
| `icon` | disabled | fill | `--icon--base--disabled` |

> **Hover and selected use the `primary` (dark) ramp.** With `primary` they give **16.64:1** and **8.93:1**. The border matches the
> fill in both states because the master puts no stroke on them: what distinguishes the active chip is
> the fill, not the outline.
| focus ring | focus | box-shadow (externo) | `--focus--ring--default` |
| focus gap | focus | box-shadow (fill, between chip and ring) | `--focus--gap--default` |

> **Focus** — same pattern as Button/inputs: `gap` (filled, adjacent to the chip) + `ring` (outer), both outside → the chip grows 4px, with no separation between gap and ring. It is shown on the **available** chip (outline), because the keyboard mostly goes through unselected chips.

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `border-radius` | `--neo-radius-pill` | 999px |
| `padding-inline` | `--neo-space-md` | 12px |
| `padding-block` | `--neo-space-sm` | 8px |
| `gap` (icon · label · trailing) | `--neo-space-xs` | 4px |
| `border-width` (outline) | `--neo-stroke-xs` | 1px |
| `focus-ring-width` | `--neo-stroke-focus-ring-width` | 2px |

### Typography

| Element | Style | font-size | font-weight | line-height |
|---|---|---|---|---|
| `Label chip` | `body/md-medium` | 14px | 500 | 20px |

---

## HTML

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

---

## ARIA

| Context | Element | Tag · Role | Required attributes |
|---|---|---|---|
| Alone, or in a `multiple` group | Chip | `<button>` | `aria-pressed="true/false"` |
| In a `single` group | Chip | `<label>` around a native radio | see `chips-group` |
| Removable | Chip | the same `<button>` | `aria-keyshortcuts="Delete Backspace"` — the ✕ is not its own control |
| Icons | `<svg>` | — | `aria-hidden="true"` |

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | To the next chip: each chip is its own tab stop |
| `Shift + Tab` | Focus to the previous element |
| `Enter` · `Space` | Toggles the chip on or off; on a removable chip, removes it |
| `Delete` · `Backspace` | Removes the chip (if it has a trailing-action) |

> **In a `single` group the arrows are the browser's**: its chips draw native radios, so the group is
> one tab stop and the arrows move and choose. That is `chips-group`; here each
> chip is a toggle and the arrows do not apply.

---

## Rules

- `state=selected` = active chip (looks filled). `state=default` / `hover` = available chip (looks outline). The visual is **derived** from `selected`, it is not a separate axis.
- A row of chips is `chips-group`: several on at once or one at a time, never both in the same row.
- A removable chip is ONE control, and the whole chip removes it: the pointer or Enter/Space, and Delete or Backspace with the keyboard; the ✕ is its sign, and `aria-keyshortcuts` tells the screen reader. There is no second button: a button inside a button is invalid HTML.
- **In the master the trailing is a 16 icon inside the chip**, not a separate control: the touch
  area is the whole chip's (32 high), which meets the 24×24 minimum of WCAG 2.5.8 AA — the
  level the system aims for. If it is implemented as an independent button, it has to be given its
  own box of at least 24.
- **Labels of 1–2 words — it is a copywriting guideline, not a technical cap.** The reason is given by the
  usage guide itself: short labels **make a row of chips easier to scan**. Going over it **does not
  break or truncate**: the chip widens and the row becomes slower to read, so the
  way out is to rewrite it shorter.

---

## Accessibility

- The active state is conveyed via `aria-pressed`; in a `single` group it is the radio's `checked` —see `chips-group`—, never both in the same row.
- Do not rely only on color to convey the selected state.
