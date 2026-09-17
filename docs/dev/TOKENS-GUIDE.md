# Token guide — when to use which

> The system names color **by intent**, not by component: `{role}/{group}/{variant}`.
> Golden rule: if you are writing a hex, it is wrong — there is always a token.

## The 6 roles

**The table lives in [`../MODEL.md`](../MODEL.md)** —`surface` · `fill` · `text` · `icon` · `border` ·
`focus`—, and there it is gated against the published CSS: if the system gains a role, that table fails
until it says so. It lives only once, and it is the checked one.

**This page answers the other question.** `MODEL.md` says **how a name is written**; here is
**which one to pick** when you hesitate between two that seem to serve the same. And the
[dictionary](TOKENS-DICTIONARY.md) says **which ones exist**: the 94 roles de color, with their var, their primitive, their value
and their use — that one is generated, this one is written.

## Typical decisions

**`surface` or `fill`?** — If it is the background *where the components live* → `surface`. If it is the fill *of* a component → `fill`.

**`base` or `semantic`?** — `base` = neutral/structural (90% of the UI). `semantic` = conveys state: `info` · `success` · `warning` · `error` (1:1 with MUI's `severity`).

**`soft` or `solid`?** — `soft` = faint background (an alert's fill). `solid` = emphatic marker (badge, status dot). Text on `soft` uses `text/semantic/{i}`; on `solid` it uses `text/base/contrast` (except warning: dark text).

**`contrast` or `inverse`?** — `contrast` = an element **on** a dark background (`text/base/contrast` = white). `inverse` = a component's variant **for** a dark background (`fill/base/inverse` = dark fill on light).

**`deco`?** — A categorical series for illustration and charts (`deco/1..5`, each one `soft`/`solid`). The number decouples order from color: if the palette changes tomorrow, consumption is not touched.

**States (`hover`/`active`)** — the **component** applies them (they already come in the theme). Do not use them to paint static elements.

**`disabled`** — a ready trio: `fill/base/disabled` + `text/base/disabled` + `border/base/disabled` (exempt from contrast under WCAG).

**Width and height** — Neo has no width or height tokens for components: the only tokenized size dimension is `icon/size/*`. The width of a card, a panel or a column is **layout**, not drift — it is solved with the grid and the container, never by looking for a token that does not exist.

## Accessibility rules already settled (do not break)

- `text/base/secondary` passes AA on white and subtle grays — for colored backgrounds use `text/base/default` or `contrast`.
- `text/base/brand` (coral) **only from 18 px bold** (`title/sm-bold` or larger) —WCAG's large-text threshold is 18.66 px bold, and the 0.66 px difference is a conscious exception—; for brand text of any size → `text/base/brand-strong` (maroon, always AA).
- Functional borders (`border/base/default`) on `fill/base/medium` give **2.615:1**, below the
  3:1 for non-text. **It is deliberate**: that combination *is* the
`read-only` state, where the low contrast conveys "not editable". It is declared as exception **E4**. It is not an error
  to fix nor a pattern to avoid: it is the only place where it is used, and on purpose.
- Focus is always **ring + gap** (`focus/*`) — never just a color change.

## How to consume them

```js
// JS — from the package
import { color, colorVars, scale } from '@neo/mui';
color['fill/primary/default']      // '#1F3644' (hex)
colorVars['fill/primary/default']  // 'var(--fill--primary--default)' → for sx/styled
scale.space.md                     // 12

// MUI theme — inside sx/styled
theme.neo.space.lg                 // 16
theme.neo.radius.sm                // 8

// CSS plano
color: var(--text--base--secondary);
padding: var(--neo-space-lg);
```

Full reference (token → var → primitive → value → use): [`TOKENS-DICTIONARY.md`](TOKENS-DICTIONARY.md).
