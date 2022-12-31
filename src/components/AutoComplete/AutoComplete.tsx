import { useState, useCallback } from 'react';
import { TextField, Autocomplete, TextFieldProps } from '@mui/material';

import Chip from '../Chip';

/**
 * Represents the properties of the AutoCompleteWrapper component.
 *
 * @interface AutoCompleteWrapperProps
 */
interface AutoCompleteWrapperProps {
  /**
   * The label of the autocomplete field.
   *
   * @type {string}
   */
  label: string;

  /**
   * The options for the autocomplete field.
   *
   * @type {(string[] | undefined)}
   */
  options?: string[];

  /**
   * The text displayed when there are no options available.
   *
   * @type {(string | undefined)}
   */
  noOptionsText?: string;

  /**
   * The selected options for the autocomplete field.
   *
   * @type {(string[] | undefined)}
   */
  selectedOptions?: string[];

  /**
   * The options for the text field component used in the autocomplete field.
   *
   * @type {(TextFieldProps | undefined)}
   */
  textFieldOptions?: TextFieldProps;

  /**
   * The setOptions handler for the autocomplete field.
   *
   * @type {((options: string[]) => void)}
   */
  setOptions: (options: string[]) => void;

  /**
   * The setSelectedOptions handler for the autocomplete field.
   *
   * @type {((options: string[]) => void)}
   */
  setSelectedOptions: (options: string[]) => void;
}

export function AutoCOmpleteWrapper({
  label,
  setOptions,
  options = [],
  noOptionsText,
  textFieldOptions,
  setSelectedOptions,
  selectedOptions = [],
}: AutoCompleteWrapperProps) {
  const [text, setText] = useState('');

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        if (!text) {
          return;
        }

        event.preventDefault();
        setSelectedOptions(Array.from(new Set([...selectedOptions, text])));
        setOptions(Array.from(new Set([...options, text])));

        setText('');
      }
    },
    [text, selectedOptions, options, setOptions, setSelectedOptions],
  );

  const handleDelete = useCallback(
    (value: string) => {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    },
    [selectedOptions, setSelectedOptions],
  );

  const tagRenderer = useCallback(
    (values: string[]) => {
      return values.map((value) => (
        <Chip key={value} label={value} onDelete={() => handleDelete(value)} />
      ));
    },
    [handleDelete],
  );

  const inputRenderer = useCallback(
    (params: any) => {
      return (
        <TextField
          {...params}
          value={text}
          label={label}
          variant="standard"
          onKeyDown={handleKeyDown}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setText(event.target.value)
          }
          {...textFieldOptions}
        />
      );
    },
    [handleKeyDown, label, text, textFieldOptions],
  );

  const handleChange = useCallback(
    (_event: any, values: string[]) => {
      setSelectedOptions(values);
    },
    [setSelectedOptions],
  );

  return (
    <Autocomplete
      multiple
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      renderTags={tagRenderer}
      renderInput={inputRenderer}
      noOptionsText={noOptionsText}
    />
  );
}
