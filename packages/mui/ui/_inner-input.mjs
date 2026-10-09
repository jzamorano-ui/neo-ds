// packages/mui/ui/_inner-input.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { version as muiVersion } from '@mui/material';

const MAJOR = Number(String(muiVersion).split('.')[0]) || 5;

export const innerInputProps = (attrs) =>
  MAJOR >= 6 ? { slotProps: { input: attrs } } : { inputProps: attrs };
