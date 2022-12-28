import { useState, useCallback } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import Chip from '../Chip';

export function AutoCOmpleteWrapper() {
  const [chips, setChips] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>(['Option 1', 'Option 2']);
  const [text, setText] = useState('');

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        setChips(Array.from(new Set([...chips, text])));
        setOptions(Array.from(new Set([...options, text])));
        setText('');
      }
    },
    [chips, options, text],
  );

  const handleDelete = useCallback(
    (value: string) => {
      setChips(chips.filter((chip) => chip !== value));
    },
    [chips],
  );

  return (
    <Autocomplete
      multiple
      options={options}
      value={chips}
      onChange={(_event: any, values: string[]) => setChips(values)}
      renderTags={(values: string[]) =>
        values.map((value, index) => (
          <Chip
            key={index}
            label={value}
            onDelete={() => handleDelete(value)}
          />
        ))
      }
      renderInput={(params: any) => (
        <TextField
          {...params}
          variant="outlined"
          value={text}
          label="Enter text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setText(event.target.value)
          }
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
}
