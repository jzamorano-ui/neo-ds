// theme/neo.d.ts — Neo's TypeScript types. Two things:
//  1) AUGMENTATIONS over MUI (palette/custom props): without this `<Button color="brand">` would be a type error.
//  2) The API of the `@neo/mui` package (theme, tokens and the accessible fields) — at the end of the file.
// Note: `data-surface="inverse"` on Button does NOT need an augmentation (data-* attributes are always accepted).
import '@mui/material/styles';
import '@mui/material/Button';
import '@mui/material/Chip';
import '@mui/material/CircularProgress';
import '@mui/material/Typography';
import type { Theme, ThemeOptions } from '@mui/material/styles';

type ColorSet = { main: string; light?: string; dark?: string; contrastText?: string };

declare module '@mui/material/styles' {
  // Breakpoints: a scale shared by Bootstrap+MUI. `xxl` (1536) requires
  // this augmentation — without it, `sx={{ xxl: … }}` and `theme.breakpoints.up('xxl')` are type errors.
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
  interface Palette {
    brand: ColorSet & { hover?: string; active?: string; subtle?: string };
    status: Record<'error' | 'info' | 'success' | 'warning', { bg: string; text: string; icon: string; border: string; solid: string }>;
    deco: Record<1 | 2 | 3 | 4 | 5, { soft: string; solid: string }>;
    focus: { ring: string; gap: string; inverse: string; gapInverse: string };
    border: { default: string; focus: string; disabled: string; secondary: string; brand: string; inverse: string; errorSolid: string };
    icon: { default: string; secondary: string; disabled: string; inverse: string; brand: string };
  }
  interface PaletteOptions {
    brand?: Palette['brand'];
    status?: Palette['status'];
    deco?: Palette['deco'];
    focus?: Palette['focus'];
    border?: Palette['border'];
    icon?: Palette['icon'];
  }
  interface TypeText { inverse: string; brand: string }
  interface TypeBackground { inverse: string }
  // theme.neo.* — the system's named scales (JS/sx/styled access). E.g.: theme.neo.space.md, theme.neo.radius.pill.
  // Record<string,…> on purpose: the keys are NOT duplicated (they live in the .mjs source), so the .d.ts and the source cannot drift.
  interface Theme {
    neo: {
      space: Record<string, number>;
      radius: Record<string, number>;
      stroke: Record<string, number>;
      iconSize: Record<string, number>;
      // `type` — the 22 text styles by their FIGMA NAME (kebab), to give a system style to an element
      // that is not a `<Typography>`. The camelCase door lives in `theme.typography`.
      type: Record<string, { fontFamily: string; fontWeight: number; fontSize: string; lineHeight: string; letterSpacing: number }>;
      elevation: Record<string, string>;
      container: Record<string, number>;          // content 1180 · wide 1320 (tokens/container.mjs)
      component: {
        button: { height: Record<string, number> };
        input: { height: number };                // 44 — touch target shared by text-field/select/combobox
        switch: { width: number; height: number; trackHeight: number; thumbTravel: number };
        radio: { dot: number };
        menu: { minWidth: number };
        menuItem: { minHeight: number };
      };
    };
  }
  interface ThemeOptions {
    neo?: Theme['neo'];
  }
}

// Button: color="brand"
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides { brand: true }
}
// Chip: variant="tag" | "status"
declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides { tag: true; status: true }
}
// CircularProgress: size="sm" | "md" | "lg"
declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsSizeOverrides { sm: true; md: true; lg: true }
}
// Typography: the 22 Neo variants are public API — <Typography variant="bodyMdBold"> type-checks.
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayXlBold: true; headlineLgBold: true; headlineMdBold: true; headlineSmBold: true;
    titleLgBold: true; titleLgMedium: true; titleMdBold: true; titleMdMedium: true;
    titleSmBold: true; titleSmMedium: true; titleXsBold: true;
    bodyXlBold: true; bodyXlMedium: true; bodyXlRegular: true;
    bodyLgBold: true; bodyLgMedium: true; bodyLgRegular: true;
    bodyMdBold: true; bodyMdMedium: true; bodyMdRegular: true;
    captionSmMedium: true; captionSmRegular: true;
  }
}

// ─────────────────────────────────────────────────────────────
// The `@neo/mui` package API (what is imported from index.mjs)
// ─────────────────────────────────────────────────────────────
export declare const theme: Theme;                    // <ThemeProvider theme={theme}>
export declare const themeOptions: ThemeOptions;       // for createTheme(themeOptions) if you want to compose it
export declare const color: Record<string, string>;    // color['fill/primary/default'] → hex
export declare const colorVars: Record<string, string>;// colorVars['fill/primary/default'] → 'var(--fill--primary--default)'
export declare const scale: Record<string, Record<string, number>>; // scale.space.md, scale.radius.pill, …
export declare function cssVar(name: string): string;  // 'fill/primary/default' → '--fill--primary--default'

