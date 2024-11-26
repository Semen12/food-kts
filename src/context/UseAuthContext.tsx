import React, { createContext, useContext } from 'react';
import AuthStore from '@store/AuthStore';


export const AuthContext = createContext<AuthStore | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = new AuthStore();

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