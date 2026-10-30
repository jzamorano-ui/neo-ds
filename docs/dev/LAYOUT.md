# Layout — breakpoints, container and the grid recipe

## Breakpoints

They are the theme's, and they are the contract: the whole responsive code (`sx`, `useMediaQuery`,
`Container`) hangs from these six keys.

| key | value |
|---|---|
| `xs` | `0` |
| `sm` | `576px` |
| `md` | `768px` |
| `lg` | `992px` |
| `xl` | `1200px` |
| `xxl` | `1536px` |

In CSS they are `--neo-breakpoint-{key}` (and its `-rem` pair). **Reference by key, never by the
number.**

## Container

| from | content width | var |
|---|---|---|
| `xs`–`lg` | fluid | — |
| `xl` | `1180px` | `--neo-container-content` |
| `xxl` | `1320px` | `--neo-container-wide` |

The theme ships the `MuiContainer` override with these widths per key — there is nothing to
configure.

For edge-to-edge bands: background at 100% and the band's content at `1320`.

## The grid recipe

| | `xs` | `md` | `lg` and up |
|---|---|---|---|
| columns | 4 | 8 | 12 |
| gutter | `16px` | `24px` | `24px` |

```tsx
<Grid container columns={{ xs: 4, md: 8, lg: 12 }} spacing={{ xs: 2, md: 3 }}>
```

The `768`–`991` range is covered by this recipe.

## Layout margins

Layout margins are not tokens. In Figma they are literal values.
