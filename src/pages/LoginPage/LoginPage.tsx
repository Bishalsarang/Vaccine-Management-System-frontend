import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOGIN_FORM } from '../../constants/lang.constants';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Banner from '../../components/Banner';

import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import { LoginPayload } from '../../interfaces/auth.interface';
import LoginForm from './LoginForm';
import { loginUser } from '../../slices/userSlice';

export function LoginPage() {
  const { isLoading, accessToken } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [navigate, accessToken]);

  const handleSubmit = useCallback(
    async function (loginUserPaylod: LoginPayload) {
      const response = await dispatch(loginUser(loginUserPaylod));

      if ('error' in response) {
        showErrorMessage('' + response.payload || LOGIN_FORM.MESSAGES.FAIL);
        return;
      }

      showSuccessMessage(LOGIN_FORM.MESSAGES.SUCESS);
    },
    [dispatch],
  );

  return (
    <div className="m-auto grid h-screen grid-cols-2">
      <Banner isLoginPage />
      <div className="flex items-center justify-center">
        <LoginForm isLoading={isLoading} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
