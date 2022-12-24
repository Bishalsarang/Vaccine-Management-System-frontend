import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import Form from '../../components/Form';

import { userLoginSchema } from '../../schemas/userSchema';

import { loginUser } from '../../slices/userSlice';

import { LOGIN_FORM } from '../../constants/lang.constants';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Banner from '../../components/Banner';

export function LoginPage() {
  const { loading: isLoading, accessToken } = useAppSelector(
    (state) => state.user,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: userLoginSchema,
    validateOnChange: false,
    onSubmit: async () => {
      await dispatch(
        loginUser({
          username: formik.values.username,
          password: formik.values.password,
        }),
      );
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
      label: usernameLabel,
      placeholder: `Enter ${usernameLabel}`,
    },
    {
      id: 'password',
      type: 'password',
      label: passwordLabel,
      placeholder: `Enter ${passwordLabel}`,
    },
  ];

  return (
    <div className="m-auto grid h-screen grid-cols-2">
      <Banner isLoginPage />
      <div className="flex items-center justify-center">
        <Form
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
