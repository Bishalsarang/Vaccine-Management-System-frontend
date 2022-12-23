import { useSelector } from 'react-redux';

export default function DashboardPage() {
  const { userInfo } = useSelector((state: any) => state.user);

  return <div>Welcome {userInfo.username}</div>;
}
