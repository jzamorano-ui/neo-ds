// packages/mui/ui/_inner-input.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.
import { version as muiVersion } from '@mui/material';


export const inputDoorFor = (version) => {
  const [major, minor] = String(version).split('.').map((n) => Number(n) || 0);
  const m = major || 5;
  return m > 6 || (m === 6 && minor >= 5) ? 'slotProps' : 'inputProps';
};

const DOOR = inputDoorFor(muiVersion);

export const innerInputProps = (attrs) =>
  DOOR === 'slotProps' ? { slotProps: { input: attrs } } : { inputProps: attrs };
