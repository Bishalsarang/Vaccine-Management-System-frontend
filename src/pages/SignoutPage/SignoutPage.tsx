import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutUser } from '../../slices/userSlice';

/**
 *
 * A dumb component that clears the jwt token and then redirect '/signin'
 */
export default function SignoutPage() {
  const { accessToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [navigate, accessToken]);

  return <></>;
}
