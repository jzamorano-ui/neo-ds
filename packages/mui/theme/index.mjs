// packages/mui/theme/index.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { createTheme } from '@mui/material';
import { themeOptions } from './slices.mjs';

export { themeOptions };
export const theme = createTheme(themeOptions);
export default theme;
