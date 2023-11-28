import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const isAuth = localStorage.getItem('accessTkn');
  return isAuth ? (
    <Route {...props} element={Component} />
  ) : (
    <Route element={<Navigate to='/login' />} />
  );
};

export default ProtectedRoute;
