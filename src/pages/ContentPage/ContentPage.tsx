import Button from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { logoutUser } from '../../slices/userSlice';

export default function ContentPage() {
  const { userInfo } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  function logout() {
    dispatch(logoutUser());
  }
  return (
    <div className="container p-4">
      ContentPage: Welcome {JSON.stringify(userInfo)}
      <Button label="LogOut" onClick={logout}></Button>
    </div>
  );
}
