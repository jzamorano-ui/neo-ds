# Neo — Icons

167 icons in 3 families —`system`, `semantic` and `brand`, all three compared against the library—, generated from the Figma **Icons** library, which is the source of truth.
They are not edited by hand: they are regenerated from there.

**The set defines no colors of its own: it consumes the color variables of the token system.**

| Family | How many | What it is | Color |
|---|---|---|---|
| `system` | 125 | **interface** icons: actions, navigation, neutral states | `icon/base/default` by default — **can vary** within the `icon/base/*` base |
| `semantic` | 10 (5 + 5 `-inverse`) | **feedback** icons: info, alert, success, warning, error | already defined, `icon/semantic/*`. **Not modified** |
| `brand` | 32 | **brand identity** icons | its own duality, already defined. **Not modified** |

> `danger` ("✕") and `alert` ("!") are **two versions of the error state** — both use `icon/semantic/error`.

## Usage

It needs the CSS vars on `:root` — the theme's `<CssBaseline/>` injects them, or the two CSS files in `tokens/` are loaded.

The sprite is injected once into the document, and each icon is then requested by its id
(`<family>-<name>`):

```html
<svg class="icon"><use href="#system-close"/></svg>
<svg class="icon icon--lg"><use href="#brand-health"/></svg>
```

```css
/* icons.css brings the base class and the sizes */
.icon          /* 24px · color icon/base/default */
.icon--xs|sm|md|lg|xl
.icon--secondary|disabled|inverse
```

### Which can change color and which cannot

**Only the `system` ones.** They come in `icon/base/default` and can take another token **from the same
base family** as the context requires — `secondary` for lower hierarchy, `disabled` in a
disabled control, `contrast` on a dark background. The handoff says which one goes on each screen.

Since they are exported with `fill="currentColor"`, it is applied by setting `color` on the container:

```css
.mi-componente__icono { color: var(--icon--base--secondary); }
```

The `.icon--secondary|disabled|inverse` classes cover those cases.

> **`semantic` and `brand` are not recolored.** They carry their color inside on purpose: an error icon
> is red wherever it is, and the brand ones keep their duality. Neither `color` nor `currentColor`
> affects them — and changing them would break the meaning the icon conveys.

> A `system` icon **does not take semantic colors**: if something has to convey error or success, the
> right icon is the one from the `semantic` family, not a `system` painted red.

`index.json` lists the 167 icons by family, with their `viewBox` and their color type — useful to
populate a picker or validate names at build time.

## How they are consumed from the package

```js
import '@neo/foundations/icons.css';
import { sprite } from '@neo/foundations/sprite';
```

**The sprite is injected into the document and each icon is requested by id:**

```html
<svg class="icon"><use href="#system-add" /></svg>
```

**It is not referenced as a file** —`<use href="icons.svg#id">`— because the browser blocks it by
CORS. Injecting the sprite once, as high up the tree as possible, avoids the whole case. That is why
it ships as a string module and not as a file: `import { sprite }` resolves in any bundler and in
Node, with nothing to configure.

And the three families behave differently: **`system`** inherits the context's color (or the
`.icon` class sets it), **`semantic`** already carries it bound to its token and needs no class, and **`brand`** is
its own multicolor — it only accepts a size change. The integration guide repeats it with examples.

> **Only `icons.css`, `sprite` and `icons.json` are exported**, not the loose SVG files nor the
> sprite as a file: an `exports` map is an allowlist, and consumption is by sprite, not by file.
