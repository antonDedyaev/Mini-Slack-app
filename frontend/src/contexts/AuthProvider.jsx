/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (newUser) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser({ username: newUser.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = { user, logIn, logOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
