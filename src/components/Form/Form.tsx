import { FormikProps } from 'formik';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';

import Button from '../Button';

export type FormField = {
  id: string;
  type?: string;
  label: string;
  renderer?: 'text' | 'textArea' | 'checkbox';
  placeholder?: string;
  errorLabel?: string;
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
          ({ id, renderer = 'text', label, placeholder, errorLabel, type }) => (
            <div key={id} className="flex flex-col gap-y-3">
              {renderer === 'text' &&
                renderTextField({
                  id,
                  type,
                  label,
                  errorLabel,
                  placeholder,
                  formikInstance,
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
      type={type}
      label={label}
      placeholder={placeholder}
      value={formikInstance.values[id]}
      onBlur={formikInstance.handleBlur}
      onChange={formikInstance.handleChange}
      variant="standard"
      multiline
      rows={4}
    />
  );
}

function renderTextField({
  id,
  type,
  errorLabel,
  formikInstance,
  label,
  placeholder,
}: {
  id: string;
  type: string | undefined;
  errorLabel: string | undefined;
  formikInstance: FormikInstanceType;
  label: string;
  placeholder: string | undefined;
}): JSX.Element {
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
