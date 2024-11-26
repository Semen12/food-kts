import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@context/UseAuthContext';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  authRequired?: boolean;
}

const ProtectedRoute = observer(({ children, authRequired = true }: ProtectedRouteProps) => {
  const authStore = useContext(AuthContext);
  
  if (!authStore) {
    throw new Error('AuthStore не найден в контексте');
  }

  const isAuth = authStore.isAuthenticated;

  if (authRequired && !isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (!authRequired && isAuth) {
    return <Navigate to="/profile" replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
});

export default ProtectedRoute; 