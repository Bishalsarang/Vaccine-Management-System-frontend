import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

interface ProtectedPageProps {
  children: React.ReactElement;
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
  const { userInfo } = useAppSelector((state: any) => state.user);

  if (!userInfo) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
