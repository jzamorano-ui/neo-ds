# `@neo-design/foundations`

**Who it is for:** dev, with React or without it. **Ships**: yes — these are the system's foundations.

Neo's semantic tokens in JS and in CSS, the icons and the plain CSS layer. It does not depend on React or
on Material UI: `@neo-design/mui` uses it underneath, and an app in another framework can use it on its own.

| import | what it ships |
|---|---|
| `@neo-design/foundations/tokens.css` · `/foundations.css` | the tokens as CSS variables — [`tokens/neo-color.css`](tokens/neo-color.css) and [`tokens/neo-foundations.css`](tokens/neo-foundations.css) |
| `@neo-design/foundations/icons.css` · `/sprite` · `/icons.json` | the icon layer: the classes, the sprite as a string and the index — see [`icons/README.md`](icons/README.md) |
| `@neo-design/foundations/css/<component>.css` | one plain sheet per component, to consume without React — [`css/index.css`](css/index.css) loads them all |

The `css/` sheets resolve their variables against the two token sheets, so those load first.

**How to mount it, and the full reference, are in [the Neo repository](https://github.com/jzamorano-ui/neo-ds)** —
[Integration](https://github.com/jzamorano-ui/neo-ds/blob/main/docs/dev/INTEGRATION.md) covers installation and mounting, and `docs/dev/` covers the token dictionary, the layout
recipe and the composition examples. Install it with `npm i @neo-design/foundations`.
