import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSharedState } from 'auth_app/useSharedState';

export const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const [{ isAuthenticated }] = useSharedState();

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };
  
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return AuthenticatedComponent;
};

export const withGuest = (WrappedComponent) => {
  const GuestComponent = (props) => {
    const [{ isAuthenticated }] = useSharedState();

    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  GuestComponent.displayName = `withGuest(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return GuestComponent;
};
