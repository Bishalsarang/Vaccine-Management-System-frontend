import { Chip, ChipProps } from '@mui/material';

export function ChipWrapper({ label, ...rest }: ChipProps) {
  return <Chip label={label} {...rest} />;
}
