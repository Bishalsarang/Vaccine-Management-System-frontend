import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedPageProps {
  children: React.ReactElement;
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
  const { loading: isLoading, userInfo } = useSelector(
    (state: any) => state.user,
  );

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
