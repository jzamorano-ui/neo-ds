# `@neo/foundations`

**Who it is for:** dev, with React or without it. **Ships**: yes — these are the system's foundations.

Neo's semantic tokens in JS and in CSS, the icons and the plain CSS layer. It does not depend on React or
on Material UI: `@neo/mui` uses it underneath, and an app in another framework can use it on its own.

| import | what it ships |
|---|---|
| `@neo/foundations/tokens.css` · `/foundations.css` | the tokens as CSS variables — [`tokens/neo-color.css`](tokens/neo-color.css) and [`tokens/neo-foundations.css`](tokens/neo-foundations.css) |
| `@neo/foundations/icons.css` · `/sprite` · `/icons.json` | the icon layer: the classes, the sprite as a string and the index — see [`icons/README.md`](icons/README.md) |
| `@neo/foundations/css/<component>.css` | one plain sheet per component, to consume without React — [`css/index.css`](css/index.css) loads them all |

The `css/` sheets resolve their variables against the two token sheets, so those load first.

**How to mount it, and the full reference, are in the repository this package is published from** —
its README covers installation, and `docs/dev/` covers the token dictionary, the layout recipe and
the composition examples.
