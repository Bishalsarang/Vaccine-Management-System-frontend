import Label from '../../components/Label';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

export type FormField = {
  id: string;
  type?: string;
  label: string;
  renderer?: 'text' | 'textArea' | 'checkbox';
  placeholder?: string;
  errorLabel?: string;
};

interface RenderFormProps {
  title?: string;
  formikInstance: any;
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
      {title && (
        <h2 className="mb-10 text-center text-3xl font-bold">{title}</h2>
      )}
      <div className="mb-5 flex flex-col gap-y-3">
        {fields.map(({ id, placeholder, type, label, errorLabel }) => (
          <div key={id} className="flex flex-col  gap-y-3">
            <Label
              htmlFor={id}
              value={
                errorLabel && formikInstance.touched[id] ? errorLabel : label
              }
              type={
                errorLabel && formikInstance.touched[id] ? 'error' : 'default'
              }
            />

            {type && placeholder && (
              <TextInput
                id={id}
                type={type}
                placeholder={placeholder}
                value={formikInstance.values[id]}
                onBlur={formikInstance.handleBlur}
                onChange={formikInstance.handleChange}
              ></TextInput>
            )}
          </div>
        ))}
      </div>

      {submitButtonLabel && (
        <Button type="submit" isLoading={isLoading} label={submitButtonLabel} />
      )}
    </form>
  );
}
