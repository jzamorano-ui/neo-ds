<!-- Generated file. Do NOT edit by hand: it is rewritten when it is regenerated from the source. -->
# Neo · Token dictionary

> 94 semantic tokens. Each one **consumes a primitive** (never a loose hex): the **primitive** column is the ramp it aliases.
> **name** (source of truth) · **CSS var** · **primitive** · **value** · **use**.
> In CSS: `var(--fill--primary--default)`. In JS: `import { color } from '@neo-design/mui'` → `color['fill/primary/default']`.

## surface · 4 tokens

| token | CSS var | primitive | value | use |
|--------------------------|------------------------------|--------------------|-----------|--------------------------------------------|
| `surface/base/default`   | `--surface--base--default`   | `--global-white`   | #FFFFFF | Page / section background |
| `surface/base/secondary` | `--surface--base--secondary` | `--slate-50`       | #F4F7F9 | Alternate section background (subtle gray) |
| `surface/base/inverse`   | `--surface--base--inverse`   | `--slate-900`      | #0F202B | Dark band / hero background |
| `surface/base/overlay`   | `--surface--base--overlay`   | `--global-overlay` | #00000099 | Modal / drawer / popover scrim |

## fill · 54 tokens

| token | CSS var | primitive | value | use |
|----------------------------------|---------------------------------------|---------------------------|-----------|--------------------------------------------|
| `fill/base/default`              | `--fill--base--default`               | `--global-white`          | #FFFFFF | Component fill |
| `fill/base/light`                | `--fill--base--light`                 | `--gray-50`               | #F7F7F7 | Subtle neutral fill |
| `fill/base/medium`               | `--fill--base--medium`                | `--gray-100`              | #E7E7E7 | Medium neutral fill |
| `fill/base/strong`               | `--fill--base--strong`                | `--gray-500`              | #737373 | Strong neutral fill |
| `fill/base/disabled`             | `--fill--base--disabled`              | `--gray-50`               | #F7F7F7 | Disabled control fill |
| `fill/base/transparent`          | `--fill--base--transparent`           | `--global-transparent`    | #FFFFFF00 | Transparent fill |
| `fill/base/inverse`              | `--fill--base--inverse`               | `--slate-900`             | #0F202B | Dark / inverse fill (on light) |
| `fill/primary/default`           | `--fill--primary--default`            | `--slate-800`             | #1F3644 | Primary action — rest (navy) |
| `fill/primary/hover`             | `--fill--primary--hover`              | `--slate-700`             | #304D5F | Primary action — hover |
| `fill/primary/active`            | `--fill--primary--active`             | `--slate-900`             | #0F202B | Primary action — pressed |
| `fill/primary/inverse/default`   | `--fill--primary--inverse--default`   | `--global-white`          | #FFFFFF | Primary action on dark — rest |
| `fill/primary/inverse/hover`     | `--fill--primary--inverse--hover`     | `--slate-50`              | #F4F7F9 | Primary action on dark — hover |
| `fill/primary/inverse/active`    | `--fill--primary--inverse--active`    | `--slate-100`             | #E2E9EE | Primary action on dark — pressed |
| `fill/secondary/default`         | `--fill--secondary--default`          | `--slate-100`             | #E2E9EE | Secondary action — rest (slate) |
| `fill/secondary/hover`           | `--fill--secondary--hover`            | `--slate-200`             | #BECDD8 | Secondary action — hover |
| `fill/secondary/active`          | `--fill--secondary--active`           | `--slate-300`             | #9BB3C3 | Secondary action — pressed |
| `fill/secondary/inverse/default` | `--fill--secondary--inverse--default` | `--global-transparent`    | #FFFFFF00 | Secondary action on dark — rest |
| `fill/secondary/inverse/hover`   | `--fill--secondary--inverse--hover`   | `--global-white-alpha-8`  | #FFFFFF14 | Secondary action on dark — hover |
| `fill/secondary/inverse/active`  | `--fill--secondary--inverse--active`  | `--global-white-alpha-16` | #FFFFFF29 | Secondary action on dark — pressed |
| `fill/tertiary/default`          | `--fill--tertiary--default`           | `--global-transparent`    | #FFFFFF00 | Tertiary action — rest (transparent) |
| `fill/tertiary/hover`            | `--fill--tertiary--hover`             | `--slate-50`              | #F4F7F9 | Tertiary action — hover (neutral wash) |
| `fill/tertiary/active`           | `--fill--tertiary--active`            | `--slate-100`             | #E2E9EE | Tertiary action — pressed |
| `fill/tertiary/inverse/default`  | `--fill--tertiary--inverse--default`  | `--global-transparent`    | #FFFFFF00 | Tertiary action on dark — rest |
| `fill/tertiary/inverse/hover`    | `--fill--tertiary--inverse--hover`    | `--global-white-alpha-8`  | #FFFFFF14 | Tertiary action on dark — hover |
| `fill/tertiary/inverse/active`   | `--fill--tertiary--inverse--active`   | `--global-white-alpha-16` | #FFFFFF29 | Tertiary action on dark — pressed |
| `fill/brand/primary/default`     | `--fill--brand--primary--default`     | `--brand-500`             | #FF585C | Brand action — rest (coral) |
| `fill/brand/primary/hover`       | `--fill--brand--primary--hover`       | `--brand-600`             | #D2353F | Brand action — hover |
| `fill/brand/primary/active`      | `--fill--brand--primary--active`      | `--brand-700`             | #9B1020 | Brand action — pressed |
| `fill/brand/secondary/default`   | `--fill--brand--secondary--default`   | `--brand-100`             | #FFE5E3 | Tonal brand action — rest (soft coral) |
| `fill/brand/secondary/hover`     | `--fill--brand--secondary--hover`     | `--brand-200`             | #FFC7C3 | Tonal brand action — hover |
| `fill/brand/secondary/active`    | `--fill--brand--secondary--active`    | `--brand-300`             | #FFA7A3 | Tonal brand action — pressed |
| `fill/brand/tertiary/default`    | `--fill--brand--tertiary--default`    | `--global-transparent`    | #FFFFFF00 | Tertiary brand action — rest (transparent) |
| `fill/brand/tertiary/hover`      | `--fill--brand--tertiary--hover`      | `--brand-50`              | #FFF4F3 | Tertiary brand action — hover |
| `fill/brand/tertiary/active`     | `--fill--brand--tertiary--active`     | `--brand-100`             | #FFE5E3 | Tertiary brand action — pressed |
| `fill/semantic/info/soft`        | `--fill--semantic--info--soft`        | `--blue-50`               | #F3F7FF | Informational status fill |
| `fill/semantic/info/solid`       | `--fill--semantic--info--solid`       | `--blue-500`              | #0043CE | Informational marker (solid) |
| `fill/semantic/success/soft`     | `--fill--semantic--success--soft`     | `--green-50`              | #F3F9F3 | Success status fill |
| `fill/semantic/success/solid`    | `--fill--semantic--success--solid`    | `--green-500`             | #1E833A | Success marker (solid) |
| `fill/semantic/warning/soft`     | `--fill--semantic--warning--soft`     | `--yellow-50`             | #FCF6EF | Warning status fill |
| `fill/semantic/warning/solid`    | `--fill--semantic--warning--solid`    | `--yellow-600`            | #BF7900 | Warning marker (solid) |
| `fill/semantic/error/soft`       | `--fill--semantic--error--soft`       | `--red-50`                | #FEF2F2 | Error status fill |
| `fill/semantic/error/solid`      | `--fill--semantic--error--solid`      | `--red-500`               | #D62839 | Error marker (solid) |
| `fill/deco/1/soft`               | `--fill--deco--1--soft`               | `--aqua-100`              | #DBF0ED | Subtle decorative fill |
| `fill/deco/1/solid`              | `--fill--deco--1--solid`              | `--aqua-600`              | #008178 | Strong decorative fill |
| `fill/deco/2/soft`               | `--fill--deco--2--soft`               | `--purple-100`            | #ECE4FF | Subtle decorative fill |
| `fill/deco/2/solid`              | `--fill--deco--2--solid`              | `--purple-600`            | #7B38C9 | Strong decorative fill |
| `fill/deco/3/soft`               | `--fill--deco--3--soft`               | `--slate-100`             | #E2E9EE | Subtle decorative fill |
| `fill/deco/3/solid`              | `--fill--deco--3--solid`              | `--slate-600`             | #45667A | Strong decorative fill |
| `fill/deco/4/soft`               | `--fill--deco--4--soft`               | `--pink-100`              | #F8D3EB | Subtle decorative fill |
| `fill/deco/4/solid`              | `--fill--deco--4--solid`              | `--pink-500`              | #C44197 | Strong decorative fill |
| `fill/deco/5/soft`               | `--fill--deco--5--soft`               | `--sky-100`               | #D1E3FA | Subtle decorative fill |
| `fill/deco/5/solid`              | `--fill--deco--5--solid`              | `--sky-500`               | #3077CF | Strong decorative fill |
| `fill/deco/6/soft`               | `--fill--deco--6--soft`               | `--brand-100`             | #FFE5E3 | Subtle decorative fill |
| `fill/deco/6/solid`              | `--fill--deco--6--solid`              | `--brand-500`             | #FF585C | Strong decorative fill |

## text · 10 tokens

| token | CSS var | primitive | value | use |
|--------------------------|------------------------------|------------------|---------|---------------------------------------------------|
| `text/base/default`      | `--text--base--default`      | `--slate-900`    | #0F202B | Primary text (headings, body) |
| `text/base/secondary`    | `--text--base--secondary`    | `--gray-600`     | #5C5C5C | Secondary text (descriptions, help) |
| `text/base/disabled`     | `--text--base--disabled`     | `--gray-300`     | #ABABAB | Disabled text |
| `text/base/contrast`     | `--text--base--contrast`     | `--global-white` | #FFFFFF | Text on a dark background (white) |
| `text/base/brand`        | `--text--base--brand`        | `--brand-500`    | #FF585C | Brand text (coral, large / bold only) |
| `text/base/brand-strong` | `--text--base--brand-strong` | `--brand-700`    | #9B1020 | Emphatic brand text (accessible maroon, any size) |
| `text/semantic/info`     | `--text--semantic--info`     | `--blue-700`     | #002A90 | Informational text |
| `text/semantic/success`  | `--text--semantic--success`  | `--green-700`    | #00531D | Success text |
| `text/semantic/warning`  | `--text--semantic--warning`  | `--yellow-700`   | #8B5700 | Warning text |
| `text/semantic/error`    | `--text--semantic--error`    | `--red-700`      | #8F1421 | Error / validation text |

## icon · 11 tokens

| token | CSS var | primitive | value | use |
|--------------------------|------------------------------|------------------|---------|-----------------------------------------|
| `icon/base/default`      | `--icon--base--default`      | `--slate-900`    | #0F202B | Primary icon |
| `icon/base/secondary`    | `--icon--base--secondary`    | `--gray-500`     | #737373 | Secondary / muted icon |
| `icon/base/disabled`     | `--icon--base--disabled`     | `--gray-200`     | #C9C9C9 | Disabled icon |
| `icon/base/contrast`     | `--icon--base--contrast`     | `--global-white` | #FFFFFF | Icon on a dark background |
| `icon/base/brand-solid`  | `--icon--base--brand-solid`  | `--brand-500`    | #FF585C | Brand icon — stroke and accent (coral) |
| `icon/base/brand-soft`   | `--icon--base--brand-soft`   | `--brand-200`    | #FFC7C3 | Brand icon — tinted areas (duotone) |
| `icon/base/brand-strong` | `--icon--base--brand-strong` | `--brand-700`    | #9B1020 | Emphatic brand icon (accessible stroke) |
| `icon/semantic/info`     | `--icon--semantic--info`     | `--blue-600`     | #0036AF | Informational icon |
| `icon/semantic/success`  | `--icon--semantic--success`  | `--green-600`    | #006B27 | Success icon |
| `icon/semantic/warning`  | `--icon--semantic--warning`  | `--yellow-600`   | #BF7900 | Warning icon |
| `icon/semantic/error`    | `--icon--semantic--error`    | `--red-600`      | #B71C2C | Error icon |

## border · 11 tokens

| token | CSS var | primitive | value | use |
|-------------------------------|-----------------------------------|------------------|---------|----------------------------------------------------|
| `border/base/default`         | `--border--base--default`         | `--gray-400`     | #8F8F8F | Input / control border |
| `border/base/secondary`       | `--border--base--secondary`       | `--gray-100`     | #E7E7E7 | Soft decorative border (containers; not a control) |
| `border/base/disabled`        | `--border--base--disabled`        | `--gray-100`     | #E7E7E7 | Disabled border |
| `border/base/contrast`        | `--border--base--contrast`        | `--global-white` | #FFFFFF | Border on a dark background |
| `border/base/focus`           | `--border--base--focus`           | `--slate-900`    | #0F202B | Focus border (active input) |
| `border/base/brand`           | `--border--base--brand`           | `--brand-500`    | #FF585C | Brand border |
| `border/semantic/info`        | `--border--semantic--info`        | `--blue-200`     | #9EBEFB | Informational border |
| `border/semantic/success`     | `--border--semantic--success`     | `--green-200`    | #AED2B2 | Success border |
| `border/semantic/warning`     | `--border--semantic--warning`     | `--yellow-200`   | #FED9AF | Warning border |
| `border/semantic/error-soft`  | `--border--semantic--error-soft`  | `--red-200`      | #F6B4B8 | Error border (soft) |
| `border/semantic/error-solid` | `--border--semantic--error-solid` | `--red-700`      | #8F1421 | Emphatic error border (validation) |

## focus · 4 tokens

| token | CSS var | primitive | value | use |
|----------------------|--------------------------|------------------|---------|---------------------------------------------|
| `focus/ring/default` | `--focus--ring--default` | `--blue-500`     | #0043CE | Focus ring (keyboard) |
| `focus/ring/inverse` | `--focus--ring--inverse` | `--global-white` | #FFFFFF | Focus ring on a dark background |
| `focus/gap/default`  | `--focus--gap--default`  | `--blue-50`      | #F3F7FF | Halo between the control and the focus ring |
| `focus/gap/inverse`  | `--focus--gap--inverse`  | `--slate-800`    | #1F3644 | Focus halo on a dark background |
