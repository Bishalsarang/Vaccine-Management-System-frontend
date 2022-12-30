import { FormikProps } from 'formik';
import {
  Select,
  Checkbox,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import Button from '../Button';
import AutoComplete from '../AutoComplete';
import UploadButton from '../UploadButton';

export type FormField = {
  id: string;
  type?: string;
  label: string;
  errorLabel?: string | string[];
  placeholder?: string;
  autocompleteOptions?: {
    options: string[];
    setOptions: (options: string[]) => void;
    selectedOptions: string[];
  };
  uploadOptions?: {
    variant?: 'icon';
    acceptedTypes?: string;
    existingImageUrl?: string | null;
  };
  dropDownOptions?: { value: string; label: string }[];
  renderer?:
    | 'text'
    | 'upload'
    | 'textArea'
    | 'checkbox'
    | 'dropdown'
    | 'autocomplete';
};

export type FormikInstanceType = FormikProps<any>;

interface RenderFormProps {
  title?: string;
  formikInstance: FormikInstanceType;
  isLoading?: boolean;
  fields: FormField[];
  hasBorder?: boolean;
  submitButtonLabel?: string;
}

export default function Form({
  title,
  fields = [],
  formikInstance,
  hasBorder = false,
  isLoading = false,
  submitButtonLabel,
}: RenderFormProps) {
  const formClass = hasBorder ? 'w-full rounded-lg p-8 shadow' : 'w-full';

  return (
    <form
      autoComplete="false"
      className={formClass}
      onSubmit={formikInstance.handleSubmit}
    >
      <div className="grid gap-4">
        {title && (
          <h2 className="mb-10 text-center text-3xl font-bold">{title}</h2>
        )}
        {fields.map(
          ({
            id,
            type,
            label,
            errorLabel,
            placeholder,
            renderer = 'text',
            uploadOptions = {},
            autocompleteOptions,
            dropDownOptions = [],
          }) => (
            <div key={id} className="flex flex-col gap-y-3">
              {renderer === 'text' &&
                renderTextField(formikInstance, {
                  id,
                  type,
                  label,
                  errorLabel,
                  placeholder,
                })}
              {renderer === 'textArea' &&
                renderTextArea({
                  id,
                  type,
                  label,
                  placeholder,
                  formikInstance,
                })}
              {renderer === 'checkbox' &&
                renderCheckBox({ formikInstance, id, label })}
              {renderer === 'autocomplete' &&
                renderAutoComplete(formikInstance, {
                  id,
                  type,
                  label,
                  errorLabel,
                  autocompleteOptions,
                  placeholder,
                })}
              {renderer === 'dropdown' &&
                renderDropDown({ id, label, formikInstance, dropDownOptions })}
              {renderer === 'upload' &&
                renderUploadButton(formikInstance, {
                  id,
                  label,
                  uploadOptions,
                })}
            </div>
          ),
        )}

        {submitButtonLabel && (
          <Button
            isLoading={isLoading}
            label={submitButtonLabel}
            isDisabled={!formikInstance.isValid}
            onClick={formikInstance.handleSubmit}
          ></Button>
        )}
      </div>
    </form>
  );
}

function renderUploadButton(
  formikInstance: FormikInstanceType,
  { id, label, uploadOptions = {} }: FormField,
) {
  return (
    <UploadButton
      label={label}
      variant={uploadOptions.variant}
      onBlur={formikInstance.handleBlur}
      imageUrl={formikInstance.values.imageUrl}
      acceptTypes={uploadOptions.acceptedTypes}
      file={formikInstance.values[id]}
      onChange={(event) => {
        formikInstance.setFieldValue(id, event.target.files?.[0]);
      }}
    />
  );
}

function renderAutoComplete(
  formikInstance: FormikInstanceType,
  formfield: FormField,
) {
  const { autocompleteOptions } = formfield;

  return (
    <AutoComplete
      label={formfield.label}
      options={autocompleteOptions?.options}
      selectedOptions={autocompleteOptions?.selectedOptions}
      setOptions={(options) => {
        autocompleteOptions?.setOptions(options);
      }}
      setSelectedOptions={(selectedOptions) => {
        formikInstance.setFieldValue(formfield.id, selectedOptions);
      }}
    />
  );
}

function renderDropDown({
  id,
  label,
  formikInstance,
  dropDownOptions,
}: {
  id: string;
  label: string;
  formikInstance: FormikInstanceType;
  dropDownOptions: { value: string; label: string }[];
}) {
  return (
    <FormControl>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        id={id}
        name={id}
        variant="standard"
        label={label}
        value={formikInstance.values[id]}
        onBlur={formikInstance.handleBlur}
        onChange={formikInstance.handleChange}
      >
        {dropDownOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function renderCheckBox({
  id,
  label,
  formikInstance,
}: {
  formikInstance: FormikInstanceType;
  id: string;
  label: string;
}) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={id}
          onBlur={formikInstance.handleBlur}
          checked={formikInstance.values[id]}
          onChange={formikInstance.handleChange}
        />
      }
      label={label}
    />
  );
}

function renderTextArea({
  id,
  type,
  label,
  placeholder,
  formikInstance,
}: {
  id: string;
  type: string | undefined;
  label: string;
  placeholder: string | undefined;
  formikInstance: FormikInstanceType;
}) {
  return (
    <TextField
      id={id}
      rows={3}
      multiline
      type={type}
      label={label}
      variant="standard"
      placeholder={placeholder}
      value={formikInstance.values[id]}
      onBlur={formikInstance.handleBlur}
      onChange={formikInstance.handleChange}
    />
  );
}

function renderTextField(
  formikInstance: FormikInstanceType,
  { id, type, errorLabel, label, placeholder }: FormField,
): JSX.Element {
  return (
    <TextField
      id={id}
      type={type}
      label={label}
      variant="standard"
      placeholder={placeholder}
      value={formikInstance.values[id]}
      onBlur={formikInstance.handleBlur}
      onChange={formikInstance.handleChange}
      error={Boolean(errorLabel && formikInstance.touched[id])}
      helperText={formikInstance.touched[id] && errorLabel}
    />
  );
}
