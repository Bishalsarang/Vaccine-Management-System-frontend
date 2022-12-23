import { useSelector } from 'react-redux';

export default function ContentPage() {
  const { userInfo } = useSelector((state: any) => state.user);

  return (
    <div className="container p-4">
      ContentPage: Welcome {userInfo.username}
    </div>
  );
}
