import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, redirectTo }) => {
  const isAuth = localStorage.getItem('accessTkn');
  return isAuth ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
