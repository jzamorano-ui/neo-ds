# Examples — usage recipes

> Everything comes from the theme or the exported tokens. If you need a hex, something is wrong.

## MUI components (nothing extra)

```jsx
import { Button, Alert, Chip, Tooltip, CircularProgress } from '@mui/material';

<Button variant="contained">Continuar</Button>            {/* primary navy */}
<Button variant="contained" color="brand">Cotizar</Button> {/* coral de marca (augmentation Neo) */}
<Button variant="outlined">Volver</Button>
<Alert severity="success">Guardado.</Alert>
<Chip label="Activo" variant="status" />                   {/* badge de estado */}
```

## Forms — the label is STATIC

It is the only requirement the theme cannot impose on its own. MUI ships the label **floating** (it
shrinks onto the border as you type); Neo wants it **on top and fixed**. It comes from composing
`FormControl + FormLabel + OutlinedInput`, with `notched={false}` so the border does not leave the gap
of the floating label:

```jsx
import { FormControl, FormLabel, OutlinedInput, FormHelperText, Select, MenuItem } from '@mui/material';

const id = useId();

<FormControl fullWidth variant="outlined">
  <FormLabel htmlFor={id}>Name</FormLabel>
  <OutlinedInput id={id} notched={false} aria-describedby={`${id}-helper`} />
  <FormHelperText id={`${id}-helper`}>As it appears on your ID</FormHelperText>
</FormControl>
```

In error, the message goes in the same `FormHelperText`: `error` paints it, and it is what stays
referenced by `aria-describedby`, so the screen reader announces it together with the field.

```jsx
<FormControl fullWidth variant="outlined" error>
  <FormLabel htmlFor={id}>Email</FormLabel>
  <OutlinedInput id={id} notched={false} aria-describedby={`${id}-helper`} />
  <FormHelperText id={`${id}-helper`}>Invalid format</FormHelperText>
</FormControl>
```

`Select` and `Autocomplete` are built the same way: the same `FormControl + FormLabel`, changing the control.

```jsx
<FormControl fullWidth>
  <FormLabel htmlFor={id}>Region</FormLabel>
  <Select id={id} displayEmpty value={v} onChange={onChange}>
    {regiones.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
  </Select>
</FormControl>
```

How this is encapsulated —your own component, a hook, nothing— is up to you. Here is the
requirement, not the shape.

## Spacing and layout — `sx` with the theme

```jsx
// theme.neo.* = the system's named scale (px)
<Stack sx={{ gap: (t) => `${t.neo.space.md}px`, p: (t) => `${t.neo.space.lg}px` }}>

// theme.spacing() = classic MUI factor (8px) — for idiomatic MUI code
<Box sx={{ mt: 2 }} />   {/* 16px */}

// breakpoints Neo (incluye xxl 1536)
<Box sx={{ width: { xs: '100%', lg: 480, xxl: 560 } }} />
```

## Color puntual — tokens, nunca hex

```jsx
import { colorVars } from '@neo/mui';

<Box sx={{ background: colorVars['fill/semantic/info/soft'], borderRadius: 'var(--neo-radius-sm)' }}>
<Typography sx={{ color: colorVars['text/base/secondary'] }}>Texto de apoyo</Typography>
```

## Typography — the system's variants

```jsx
// 13 MUI variants already mapped (h1..caption) + 22 Neo variants
<Typography variant="h1">Title</Typography>
<Typography variant="bodyMdRegular">Standard body</Typography>
<Typography variant="titleSmBold">Encabezado de card</Typography>
```

## styled() — your own component inside the system

```jsx
import { styled } from '@mui/material/styles';

const Panel = styled('section')(({ theme }) => ({
  background: 'var(--surface--base--secondary)',
  border: '1px solid var(--border--base--secondary)',
  borderRadius: theme.neo.radius.md,
  padding: theme.neo.space.xl,
}));
```

## Anti-patrones (no hacer)

```jsx
// ❌ hex suelto                      → usar token
<Box sx={{ background: '#F4F7F9' }} />
// ❌ state token on a static element → the component handles hover/active
<Box sx={{ background: colorVars['fill/primary/hover'] }} />
// ❌ secondary text on a colored background → default or contrast
<Typography sx={{ color: colorVars['text/base/secondary'], background: colorVars['fill/semantic/info/soft'] }} />
```
