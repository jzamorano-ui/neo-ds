# Neo — the model on 1 page

> One language for **design** and **dev**. Every color in the system is described as **role + variant**.

---

## The rule

**One thing = a ROLE + a GROUP + a VARIANT.**

| Pregunta | Eje | Valores |
|---|---|---|
| what *part* is it? | **role** | `surface` · `fill` · `text` · `icon` · `border` · `focus` |
| which *family*? | **group** | `base` · `primary` · `secondary` · `tertiary` · `brand` · `semantic` · `deco` — and `ring`/`gap`, which are the focus ones |
| which *variant or state*? | suffix | `default`·`hover`·`active` · `inverse` · `soft`·`solid`·`strong` *(where it applies)* |

Naming: `--{role}--{group}--{variant|state}`. Nothing else to memorize.

**There are SIX roles, and `deco` is not one.** It is a group, and it lives inside `fill`: `--fill--deco--1--soft`.
Mixing it up leads to writing `--deco--…`, which does not exist — and a `var()` that does not resolve gives no error.
This table **is checked against the published CSS**: if the system gains a role or a group and the
table does not say so, it fails.

**The brackets belong to the pattern, they are not a permission.** Where the state exists, the suffix is
**required**: an interactive component's `fill` is declared per state
—`--fill--primary--default`, `--fill--primary--hover`, `--fill--primary--active`— and the
`inverse` side is declared the same way, with its three (`--fill--primary--inverse--default` and its `hover`
and `active` pairs). Writing the bare root —`--fill--primary--inverse`— is not a short form of the name:
it is a `var()` that **does not resolve**, and the browser replaces it with the inherited value without warning. The
full list is in `packages/foundations/tokens/neo-color.css`.

---

## The roles, in one sentence

| Role | It is… | Example |
|---|---|---|
| **surface** | **neutral** canvas background (page·card·panel·modal). Neutral ONLY. | `--surface--base--default` · `--surface--base--secondary` |
| **fill** | **component** background (button·badge·chip·alert). Intent + intensity. | `--fill--primary--default` · `--fill--semantic--error--soft` |
| **text** | color as **text**. The link inherits the color of the surrounding text (`color: inherit`), with no token of its own. | `--text--base--default` · `--text--base--secondary` |
| **icon** | the **icon**'s color. | `--icon--base--default` · `--icon--semantic--error` |
| **border** | the **border**. | `--border--base--default` · `--border--semantic--error-solid` |
| **focus** | a11y ring (ring + gap). | `--focus--ring--default` |

And the group most often mistaken for a role:

| Group | It is… | Example |
|---|---|---|
| **deco** | **decorative** palette (marketing), with no semantics. Numbered, not by color. It lives inside `fill` | `--fill--deco--1--soft` |

**The golden rule (recognizable):** **EVERY component background is `fill/*`** — intent (`fill/primary`, `fill/brand`) or neutral (`fill/base/{default,light,medium}` = white · gray50 · gray100, for controls and ghost/chip/menu washes). **`surface/*` is ONLY the canvas:** page · card · modal · floating paper (menu/tooltip/select). No component takes `surface/*`. → is it the background of something you click or fill? `fill`. is it the sheet behind the content? `surface`.

---

## How the same thing is said on both sides

| Designer says… | Dev writes… |
|---|---|
| **primary** button | `<Button color="primary">` → `--fill--primary--default` |
| **brand** button | `<Button color="brand">` → `--fill--brand--primary--default` |
| the same one, **tonal/secondary** | `color="secondary"` → `--fill--secondary--default` |
| **peligro** | `<Button color="error">` → `--fill--semantic--error--soft` (alert) / `--text--semantic--error` |
| **page** background | `--surface--base--secondary` |
| color en CSS plano | `var(--fill--brand--primary--default)` |

→ **The name design sees in the panel is the one dev writes.** Same source (`color-semantic.mjs`), two views (Figma / CSS · MUI).

---

## Golden rules

- **The role says which part; the variant says intent + intensity; the state is automatic.**
- **surface = neutral, always.** Everything with an intent color is `fill` (soft or solid), `text`, `icon` or `border`.
- To scale: a new intent takes `fill/{intent}`, `text/{intent}`, etc. — the same roles. Nothing is reinvented.

Value details: there is a single source, and the token sheets and the theme are generated from it. No value is written twice.
