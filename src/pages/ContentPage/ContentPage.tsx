import { useAppSelector } from '../../hooks/hooks';

export default function ContentPage() {
  const { userInfo } = useAppSelector((state) => state.user);

  return (
    <div className="container p-4">
      ContentPage: Welcome {JSON.stringify(userInfo)}
    </div>
  );
}
