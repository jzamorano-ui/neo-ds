<!-- GENERATED — edit only inside the prose blocks; everything else is rebuilt on every build -->

# Chips Group

> **Figma (source of truth):** [❖ Chips Group](https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/?node-id=40002386-6113) — visual validation against the master.

<!-- prosa:intro -->

A row of related chips that filter the same view: several at once (`multiple`) or one at a time (`single`). A single filter is `chips`; to move between sections use `tabs`; an exclusive choice that does not filter the view is `radio-button`.

<!-- /prosa:intro -->

---

## Properties

<!-- prosa:properties -->

The `chips/group` master has no properties and no variants.

**The mode is behaviour, not drawing.** The master draws the same row for both modes, so `selection` (`multiple` · `single`) is a prop without a master, declared as such in the contract. Figma's usage page names the two modes and forbids mixing them in one group.

<!-- /prosa:properties -->

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
  // …and the props of MUI's RadioGroup not listed above
  // required: a name: `aria-label`, `aria-labelledby` —one of them
}
```

<!-- prosa:props -->

**`value` and `onChange` follow the mode.** In `single` they carry one value, a `string`; in `multiple`, the list of the chips that are on. A list given to `single` keeps its first value, and one value given to `multiple` becomes a list of one — so switching `selection` keeps what was chosen. The group needs an accessible name: `aria-label` or `aria-labelledby` travel with the rest to the root node.

<!-- /prosa:props -->

---

## Tokens

### Layout

| Element | Property | Value of the axis | Value |
|---|---|---|---|
| `root` | gap | — | `--neo-space-xs` · 4px |
| `root` | padding-block | — | `--neo-space-none` · 0px |
| `root` | padding-inline | — | `--neo-space-none` · 0px |

<!-- prosa:layout -->

**The row paints nothing.** Each chip keeps the colors, the type and the states of `chips`, and they are not repeated here. It is a horizontal row hugging its content on both axes, with no wrap and no fill. 

**When the chips do not fit, the row scrolls horizontally** — it does not wrap and it does not shrink them. It works like `tabs`: the master draws the chips at their natural width and does not draw what happens when they do not fit. The scrollbar is not drawn; the keyboard and the wheel still scroll.

<!-- /prosa:layout -->

---

## HTML

<!-- prosa:html -->

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

**In `single` the radio paints the chip**, with no class to keep in sync: `:checked` draws it chosen, `:focus-visible` puts the ring on the chip, `:disabled` turns it off. The radio stays in the tab order and in the accessibility tree; it only takes no space.

<!-- /prosa:html -->

---

## ARIA

| Element | Tag | Required attributes |
|---|---|---|
| `div` | `<div>` | `role="group"` (selection=multiple) · `role="radiogroup"` (selection=single) |

<!-- prosa:aria -->

**Why two roles and not one.** In `multiple` each chip is on or off by itself, and that is a toggle button (`aria-pressed`) inside a `role="group"`. In `single` choosing one turns the other off, and that is a radio group (`role="radiogroup"`, each chip a `<label>` around a native radio): a native one gives the arrows, the single tab stop and the wrap for free, so nothing is rebuilt by hand.

<!-- /prosa:aria -->

---

## Keyboard

| Key | Action |
|---|---|
| `Tab` | multiple: each chip is its own tab stop · single: the group is ONE tab stop, landing on the chosen chip or on the first |
| `← → ↑ ↓` | single only: moves to the next or previous chip and chooses it, wrapping around |
| `Space` | multiple: toggles the focused chip · single: chooses the focused chip, if it is not chosen yet |
| `Enter` | multiple: toggles the focused chip · single: nothing — a native radio does not answer to it |

---

## Rules

| Limit | When exceeded |
|---|---|
| **selection mode:** one per group: `multiple` or `single` | the component does not allow it: `selection` takes one value for the whole group, and both patterns together are ambiguous. |

| When | Then |
|---|---|
| always | every option must carry its label |

<!-- prosa:rules -->

- The chips follow the `chips` label guideline: 1–2 words, so the row stays easy to scan.
- When the row does not fit it scrolls; it never wraps into a second line.

<!-- /prosa:rules -->

---

## See also

| Use instead | When |
|---|---|
| [`chips`](chips.md) | there is a single filter |
| [`radio-button`](radio-button.md) | the exclusive choice is not a filter of the view |
| [`tabs`](tabs.md) | choosing changes the section, not the content |

---

## Accessibility

- The group has an accessible name, with `aria-label` or `aria-labelledby`: without it a screen reader announces a group and not what it groups.
- In single the chips are native radios inside the radiogroup: the browser gives the arrows, the single tab stop and the wrap.
- In multiple each chip keeps its toggle semantics: `aria-pressed` says whether it is on.

<!-- prosa:accessibility -->

- The mode is in the markup: `role="group"` with `aria-pressed`, or `role="radiogroup"` with native radios — never both in the same group (WCAG 1.3.1). Each chip exposes its name and its state: `aria-pressed` in `multiple`, the radio's `checked` in `single` (WCAG 4.1.2).

<!-- /prosa:accessibility -->
