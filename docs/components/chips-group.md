# Chips group

> **Figma (source of truth):** [❖ Chips group](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002386-6113) — visual validation against the master.

A row of related chips that filter the same view: several at once (`multiple`) or one at a time (`single`). A single filter is `chips`; to move between sections use `tabs`; an exclusive choice that does not filter the view is `radio-button`.

---

## Properties

| Property | Values |
|---|---|
| — | the `chips/group` master has no properties and no variants |

> **The mode is behaviour, not drawing.** The master draws the same row for both modes, so `selection` —`multiple` · `single`, `multiple` by default— is a prop without a master, declared as such in the contract. Figma's usage page names the two modes and forbids mixing them in one group.

---

## Props

```typescript
interface NeoChipsGroupProps {
  selection?: 'multiple' | 'single'   // Whether several chips can be on at once (`multiple`) or only one (`single`). It is behaviour: the master draws the same row for both. Default: 'single'.
  options?: ReadonlyArray<{ label: string; value: string; disabled?: boolean }>  // The list options. Closed and strict: values outside it are not accepted.
  value?: string | ReadonlyArray<string>  // The controlled value.
  defaultValue?: string | ReadonlyArray<string>  // The initial, uncontrolled value.
  disabled?: boolean                  // Not interactive: it takes neither focus nor clicks.
  onChange?: (event: SyntheticEvent, value: string | string[]) => void  // Notifies the value change.
  className?: string                  // Classes from the consumer. They merge with the component ones; they do not replace them.
  sx?: SxProps<Theme>                 // The MUI `sx`: per-instance styles, with access to the theme.
  [prop: string]: unknown             // the rest flows to MUI's RadioGroup
}
```

> **`value` and `onChange` follow the mode.** In `single` they carry one value, a `string`; in `multiple`, the list of the chips that are on. A list given to `single` keeps its first value, and one value given to `multiple` becomes a list of one — so switching `selection` keeps what was chosen. The group needs an accessible name: `aria-label` or `aria-labelledby` travel with the rest to the root node.

---

## Tokens

### Layout

| Property | CSS custom property | Value |
|---|---|---|
| `gap` (chip · chip) | `--neo-space-xs` | 4px |
| `padding-block` | `--neo-space-none` | 0px |
| `padding-inline` | `--neo-space-none` | 0px |

> **The row paints nothing.** Each chip keeps the colors, the type and the states of `chips`, and they are not repeated here. It is a horizontal row, gap 4, padding 0, hugging its content on both axes, with no wrap and no fill. It holds ten `chips` and shows eight, so its 668 of width is what it hugs with eight chips of that label — not a measure of the component.

> **When the chips do not fit, the row scrolls horizontally** — it does not wrap and it does not shrink them. It works like `tabs`: the master draws the chips at their natural width and does not draw what happens when they do not fit. The scrollbar is not drawn; the keyboard and the wheel still scroll.

---

## HTML

```html
<!-- multiple: a group of independent toggles -->
<div role="group" aria-label="Especialidad" class="chips-group">
  <button type="button" aria-pressed="true" class="chip chip--selected">Dental</button>
  <button type="button" aria-pressed="false" class="chip">Farmacia</button>
  <button type="button" aria-pressed="false" class="chip">Óptica</button>
</div>
```

```html
<!-- single: a radio group; each chip draws its native radio -->
<div role="radiogroup" aria-label="Especialidad" class="chips-group">
  <label class="chip"><input type="radio" name="especialidad" value="dental" checked>Dental</label>
  <label class="chip"><input type="radio" name="especialidad" value="farmacia">Farmacia</label>
  <label class="chip"><input type="radio" name="especialidad" value="optica">Óptica</label>
</div>
```

> **In `single` the radio paints the chip**, with no class to keep in sync: `:checked` draws it chosen, `:focus-visible` puts the ring on the chip, `:disabled` turns it off. The radio stays in the tab order and in the accessibility tree; it only takes no space.

---

## ARIA

| Mode | Element | Tag · Role | Required attributes |
|---|---|---|---|
| multiple | Group | `<div role="group">` | `aria-label` or `aria-labelledby` |
| multiple | Chip | `<button>` | `aria-pressed="true/false"` |
| single | Group | `<div role="radiogroup">` | `aria-label` or `aria-labelledby` |
| single | Chip | `<label>` around a native `<input type="radio">` | the radio's `name` and `value`; `checked` on the chosen one |

> **Why two roles and not one.** In `multiple` each chip is on or off by itself, and that is a toggle button. In `single` choosing one turns the other off, and that is a radio group: a native one gives the arrows, the single tab stop and the wrap for free, so nothing is rebuilt by hand.

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | **multiple**: to the next chip — each chip is a tab stop · **single**: to the group, landing on the chosen chip or on the first |
| `←``→``↑``↓` | **single**: to the next or previous chip, choosing it; past the last one it goes back to the first |
| `Space` | **multiple**: toggles the focused chip · **single**: chooses the focused chip, if it is not chosen yet |
| `Enter` | **multiple**: toggles the focused chip · **single**: nothing — a native radio does not answer to it |

---

## Rules

- `multiple` and `single` do not mix in the same group.
- The group always has an accessible name: without it a screen reader announces a group and not what it groups.
- The chips follow the `chips` label guideline: 1–2 words, so the row stays easy to scan.
- When the row does not fit it scrolls; it never wraps into a second line.

---

## Accessibility

- **WCAG 1.3.1** — the mode is in the markup: `role="group"` with `aria-pressed`, or `role="radiogroup"` with native radios — never both in the same group.
- **WCAG 4.1.2** — each chip exposes its name and its state: `aria-pressed` in `multiple`, the radio's `checked` in `single`.
- **WCAG 2.1.1** — every chip can be reached and operated with the keyboard.
