import Button from '../../components/Button';
import { useAppDispatch } from '../../hooks/hooks';

import { logoutUser } from '../../slices/userSlice';
import VaccinePage from '../VaccinePage';

export default function ContentPage() {
  const dispatch = useAppDispatch();

  function logout() {
    dispatch(logoutUser());
  }

  return (
    <div className="container p-4">
      <Button label="LogOut" onClick={logout}></Button>
      <VaccinePage />
    </div>
  );
}
