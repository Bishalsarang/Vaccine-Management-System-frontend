import Label from '../../components/Label';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

type FormField = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  errorLabel?: string;
};

interface RenderFormProps {
  title: string;
  formikInstance: any;
  isLoading?: boolean;
  fields: FormField[];
  submitButtonLabel: string;
}

export default function Form({
  title,
  fields = [],
  formikInstance,
  isLoading = false,
  submitButtonLabel = 'Submit',
}: RenderFormProps) {
  return (
    <form
      autoComplete="false"
      onSubmit={formikInstance.handleSubmit}
      className="w-full rounded-lg p-8 shadow"
    >
      <h2 className="mb-10 text-center text-3xl font-bold">{title}</h2>
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
            <TextInput
              id={id}
              type={type}
              onBlur={formikInstance.handleBlur}
              onChange={formikInstance.handleChange}
              value={formikInstance.values[id]}
              placeholder={placeholder}
            ></TextInput>
          </div>
        ))}
      </div>

      <Button type="submit" isLoading={isLoading} label={submitButtonLabel} />
    </form>
  );
}
