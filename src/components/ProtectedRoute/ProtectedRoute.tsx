import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@context/UseAuthContext';
import { Meta } from '@store/types';
import LoaderContainer from '../../App/pages/components/LoaderContainer';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();

  // Показываем лоадер только при начальной загрузке
  if (auth.meta === Meta.loading && !auth.isAuthenticated) {
    return <LoaderContainer />;
  }

  // Если не авторизован - редирект на логин
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();

  // Показываем лоадер только при начальной загрузке
  if (auth.meta === Meta.loading && !auth.isAuthenticated) {
    return <LoaderContainer />;
  }

  // Если авторизован - редирект на профиль или предыдущую страницу
  if (auth.isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || '/profile'} replace />;
  }

  return <>{children}</>;
};

export default { ProtectedRoute, PublicOnlyRoute };