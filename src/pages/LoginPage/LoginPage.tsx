import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import Form from '../../components/Form';

import { userLoginSchema } from '../../schemas/userSchema';

import { loginUser } from '../../slices/userSlice';

import { LOGIN_FORM } from '../../constants/lang.constants';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Banner from '../../components/Banner';

import { showErrorMessage, showSuccessMessage } from '../../utils/toast';

export function LoginPage() {
  const { isLoading, accessToken } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: userLoginSchema,
    onSubmit: async () => {
      const data = await dispatch(
        loginUser({
          username: formik.values.username,
          password: formik.values.password,
        }),
      );

      if ('error' in data) {
        showErrorMessage(LOGIN_FORM.MESSAGES.FAIL);
        return;
      }

      showSuccessMessage(LOGIN_FORM.MESSAGES.SUCESS);
    },
  });

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [navigate, accessToken]);

  const passwordLabel = formik.errors.password
    ? formik.errors.password
    : LOGIN_FORM.FIELDS.PASSWORD.label;
  const usernameLabel = formik.errors.username
    ? formik.errors.username
    : LOGIN_FORM.FIELDS.USERNAME.label;

  const FIELDS = [
    {
      type: 'text',
      id: 'username',
      label: LOGIN_FORM.FIELDS.USERNAME.label,
      placeholder: `Enter ${usernameLabel}`,
      errorLabel: formik.errors.username,
    },
    {
      id: 'password',
      type: 'password',
      label: LOGIN_FORM.FIELDS.PASSWORD.label,
      placeholder: `Enter ${passwordLabel}`,
      errorLabel: formik.errors.password,
    },
  ];

  return (
    <div className="m-auto grid h-screen grid-cols-2">
      <Banner isLoginPage />
      <div className="flex items-center justify-center">
        <Form
          hasBorder
          fields={FIELDS}
          isLoading={isLoading}
          formikInstance={formik}
          submitButtonLabel={LOGIN_FORM.BUTTONS.LOGIN.label}
          title="Login to Your Account"
        ></Form>
      </div>
    </div>
  );
}
