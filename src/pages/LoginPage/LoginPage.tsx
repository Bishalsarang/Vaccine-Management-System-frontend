import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import Label from '../../components/Label';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

import userSchema from '../../schemas/userSchema';

import { useAppDispatch } from '../../store';
import { userLogin } from '../../slices/slice';

import { LOGIN_FORM } from '../../constants/lang.constants';

export function LoginPage() {
  const { loading: isLoading, userInfo } = useSelector(
    (state: any) => state.user,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formkik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: userSchema,
    validateOnBlur: true,
    onSubmit: async () => {
      await dispatch(
        userLogin({
          username: formkik.values.username,
          password: formkik.values.password,
        }),
      );
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const passwordlabel = formkik.errors.password
    ? formkik.errors.password
    : LOGIN_FORM.FIELDS.PASSWORD.label;
  const usernameLabel = formkik.errors.username
    ? formkik.errors.username
    : LOGIN_FORM.FIELDS.USERNAME.label;

  return (
    <div className="m-auto grid w-1/2 gap-10">
      <div>
        <form
          onSubmit={formkik.handleSubmit}
          className="w-full rounded-lg p-10 shadow"
        >
          <h2 className="mb-10 text-center text-3xl font-bold">
            Login to Your Account
          </h2>
          <div className="mb-5 flex flex-col items-start gap-y-3">
            <Label htmlFor="username" value={usernameLabel} />

            <TextInput
              type="text"
              id="username"
              onChange={formkik.handleChange}
              value={formkik.values.username}
              placeholder={'Enter ' + usernameLabel}
            ></TextInput>
          </div>
          <div className="mb-5 flex flex-col items-start gap-y-3">
            <Label htmlFor="password" value={passwordlabel} />
            <TextInput
              id="password"
              type="password"
              onChange={formkik.handleChange}
              value={formkik.values.password}
              placeholder={'Enter ' + passwordlabel}
            ></TextInput>
          </div>
          <div className="mb-5 flex items-center justify-end text-slate-400">
            <p>Don't have an account?</p>
            <a href="#" className="text-blue-500 underline">
              Signup
            </a>
          </div>
          <Button
            type="submit"
            isLoading={isLoading}
            label={LOGIN_FORM.BUTTONS.LOGIN.label}
          />
        </form>
      </div>
    </div>
  );
}
