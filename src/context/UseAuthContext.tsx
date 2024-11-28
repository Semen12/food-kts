import React, { createContext, useContext } from 'react';
import AuthStore from '@store/AuthStore/AuthStore';
import LoaderContainer from '../App/pages/components/LoaderContainer/LoaderContainer';


export const AuthContext = createContext<AuthStore | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store] = React.useState(() => new AuthStore());
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const initialize = async () => {
      await store.initializeAuth();
      setIsInitialized(true);
    };
    initialize();
  }, [store]);

  if (!isInitialized) {
    return <LoaderContainer />;
  }

  return (
    <AuthContext.Provider value={store}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return store;
}; 