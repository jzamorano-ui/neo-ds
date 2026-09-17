# `docs/dev/` — what you read to implement

**Who it is for:** dev, when implementing. **Ships**: yes.

**INTEGRATION first**, the rest as needed.

| document | answers | when it is opened |
|---|---|---|
| [`INTEGRATION.md`](INTEGRATION.md) | how the theme is mounted in a MUI app | **first, once** |
| [`COMPONENT-MAP.md`](COMPONENT-MAP.md) | which MUI component each one wears, and where its spec, its CSS and its master are | when looking for «what do I use for this?» |
| [`TOKENS-GUIDE.md`](TOKENS-GUIDE.md) | which token matches each intention, and which ones do not exist | when choosing a color, a spacing or a radius |
| [`TOKENS-DICTIONARY.md`](TOKENS-DICTIONARY.md) | every semantic token with its CSS var, its primitive and its value | when looking up one token |
| [`LAYOUT.md`](LAYOUT.md) | breakpoints, container and the grid recipe | when building a screen |
| [`EXAMPLES.md`](EXAMPLES.md) | composition recipes: what the theme cannot impose on its own | when composing something MUI does not solve out of the box |

`COMPONENT-MAP.md` and `TOKENS-DICTIONARY.md` are generated and carry their banner.

The system has no table, sidebar, progress bar or avatar. What exists and what does not comes out of
[`COMPONENT-MAP.md`](COMPONENT-MAP.md).
