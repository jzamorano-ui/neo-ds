// packages/mui/theme/locale.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { esES } from '@mui/material/locale/index.js';

const { MuiAutocomplete, ...resto } = esES.components;

export const themeSlice = {
  components: {
    ...resto,
    MuiAutocomplete: { ...MuiAutocomplete, defaultProps: { ...MuiAutocomplete.defaultProps, openText: 'Abrir' } },
  },
};
