import { useEffect } from 'react';
import Button from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { logoutUser } from '../../slices/userSlice';
import { createVaccineThunk, getVaccineThunk } from '../../slices/vaccineSlice';

export default function ContentPage() {
  const { vaccines } = useAppSelector((state) => state.vaccine);

  const { userInfo } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVaccineThunk());
  }, []);

  function logout() {
    dispatch(logoutUser());
  }

  return (
    <div className="container p-4">
      {vaccines.map((vaccine) => (
        <div key={vaccine.id}>
          {vaccine.name} {vaccine.id}
        </div>
      ))}
      ContentPage: Welcome {JSON.stringify(userInfo)}
      <Button label="LogOut" onClick={logout}></Button>
    </div>
  );
}
