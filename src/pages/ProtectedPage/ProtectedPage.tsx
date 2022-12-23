import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedPageProps {
  children: React.ReactElement;
  isAuthenticated?: boolean;
}

export default function ProtectedPage({
  isAuthenticated = false,
  children,
}: ProtectedPageProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
