import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  return (
    auth.user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
