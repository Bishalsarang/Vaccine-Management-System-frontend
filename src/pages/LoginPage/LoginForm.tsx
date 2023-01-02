import { useFormik, FormikProps } from 'formik';

import Form from '../../components/Form';

import { userLoginSchema } from '../../schemas/userSchema';

import { LOGIN_FORM } from '../../constants/lang.constants';
import { LoginPayload } from '../../interfaces/auth.interface';

interface Props {
  isLoading: boolean;
  handleSubmit: (payload: LoginPayload) => void;
}

export default function LoginForm({ isLoading, handleSubmit }: Props) {
  const formik: FormikProps<LoginPayload> = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: userLoginSchema,
    onSubmit: () => {
      handleSubmit({
        username: formik.values.username,
        password: formik.values.password,
      });
    },
  });

  const FIELDS = [
    {
      type: 'text',
      id: 'username',
      label: LOGIN_FORM.FIELDS.USERNAME.label,
      placeholder: `Enter ${
        formik.errors.username || LOGIN_FORM.FIELDS.USERNAME.label
      }`,
      errorLabel: formik.errors.username,
    },
    {
      id: 'password',
      type: 'password',
      label: LOGIN_FORM.FIELDS.PASSWORD.label,
      placeholder: `Enter ${
        formik.errors.password || LOGIN_FORM.FIELDS.PASSWORD.label
      }`,
      errorLabel: formik.errors.password,
    },
  ];

  return (
    <Form
      hasBorder
      fields={FIELDS}
      isLoading={isLoading}
      formikInstance={formik}
      submitButtonLabel={LOGIN_FORM.BUTTONS.LOGIN.label}
      title="Login to Your Account"
    ></Form>
  );
}
