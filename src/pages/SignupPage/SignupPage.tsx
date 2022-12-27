import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import Form, { FormField } from '../../components/Form';

import { userSignupSchema } from '../../schemas/userSchema';

import { SIGNUP_FORM } from '../../constants/lang.constants';

import { signupUser } from '../../slices/userSlice';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Banner from '../../components/Banner';

export function SignupPage() {
  const { loading: isLoading, userInfo } = useAppSelector(
    (state: any) => state.user,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      lastname: '',
      username: '',
      password: '',
      firstname: '',
      confirmPassword: '',
    },
    validationSchema: userSignupSchema,
    onSubmit: async () => {
      const { username, password, firstname, lastname, email } = formik.values;
      await dispatch(
        signupUser({
          email,
          username,
          lastname,
          password,
          firstname,
        }),
      );
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate('/signin');
    }
  }, [navigate, userInfo]);

  const FIELDS: FormField[] = [
    {
      type: 'text',
      id: 'username',
      errorLabel: formik.errors.username,
      label: SIGNUP_FORM.FIELDS.USERNAME.label,
      placeholder: `Enter ` + SIGNUP_FORM.FIELDS.USERNAME.label,
    },
    {
      type: 'email',
      id: 'email',
      label: SIGNUP_FORM.FIELDS.EMAIL.label,
      placeholder: `Enter Email`,
      errorLabel: formik.errors.email,
    },
    {
      type: 'text',
      id: 'firstname',
      label: SIGNUP_FORM.FIELDS.FIRSTNAME.label,
      placeholder: `Enter Firstname`,
      errorLabel: formik.errors.firstname,
    },
    {
      type: 'text',
      id: 'lastname',
      label: SIGNUP_FORM.FIELDS.LASTNAME.label,
      placeholder: `Enter Lastname`,
      errorLabel: formik.errors.lastname,
    },
    {
      id: 'password',
      type: 'password',
      label: SIGNUP_FORM.FIELDS.PASSWORD.label,
      placeholder: `Enter password`,
      errorLabel: formik.errors.password,
    },
    {
      type: 'password',
      id: 'confirmPassword',
      placeholder: `Confirm password`,
      errorLabel: formik.errors.confirmPassword,
      label: SIGNUP_FORM.FIELDS.CONFIRM_PASSSWORD.label,
    },
  ];

  return (
    <div className="m-auto grid h-screen grid-cols-2">
      <Banner />
      <Form
        hasBorder
        fields={FIELDS}
        isLoading={isLoading}
        formikInstance={formik}
        title={SIGNUP_FORM.TITLE}
        submitButtonLabel={SIGNUP_FORM.BUTTONS.SIGNUP.label}
      ></Form>
    </div>
  );
}
